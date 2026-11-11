import {
  LifeRPGState,
  Quest,
  Achievement,
  CompletedLogEntry,
  DayRecord,
  QuestTemplate,
} from '../types';
import {
  INITIAL_DEFAULT_QUESTS,
  DEFAULT_TEMPLATES,
  INITIAL_ACHIEVEMENTS,
  getPlayerTitle,
} from './constants';

const STORAGE_KEY = 'life_rpg_state_v2';
const LEGACY_STORAGE_KEY = 'life_rpg_state_v1';

export function getTodayDateString(date: Date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getCurrentWeekString(d: Date = new Date()): string {
  const target = new Date(d.valueOf());
  const dayNr = (d.getDay() + 6) % 7;
  target.setDate(target.getDate() - dayNr + 3);
  const firstThursday = target.valueOf();
  target.setMonth(0, 1);
  if (target.getDay() !== 4) {
    target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7);
  }
  const weekNo = 1 + Math.ceil((firstThursday - target.valueOf()) / 604800000);
  return `${d.getFullYear()}-W${String(weekNo).padStart(2, '0')}`;
}

export function getCurrentMonthString(d: Date = new Date()): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  return `${year}-${month}`;
}

export function getInitialState(): LifeRPGState {
  const today = getTodayDateString();
  const week = getCurrentWeekString();
  const month = getCurrentMonthString();

  return {
    version: 2,
    playerName: 'Player One',
    playerTitle: getPlayerTitle(1),
    lifetimeXP: 0,
    dailyXPEarned: 0,
    currentStreak: 0,
    longestStreak: 0,
    lastActiveDate: today,
    lastActiveWeek: week,
    lastActiveMonth: month,
    quests: INITIAL_DEFAULT_QUESTS.map(q => ({ ...q })),
    templates: DEFAULT_TEMPLATES.map(t => ({ ...t })),
    history: {},
    completedLogs: [],
    achievements: INITIAL_ACHIEVEMENTS.map(a => ({ ...a })),
    settings: {
      soundEffects: true,
      hapticFeedback: true,
      dailyReminder: false,
      reminderTime: '20:00',
      playerName: 'Player One',
    },
  };
}

export function loadStoredState(): LifeRPGState {
  if (typeof window === 'undefined') return getInitialState();
  try {
    let raw = localStorage.getItem(STORAGE_KEY);
    // Fallback to legacy v1 if v2 not yet saved
    if (!raw) {
      raw = localStorage.getItem(LEGACY_STORAGE_KEY);
    }

    if (!raw) {
      const initial = getInitialState();
      saveStoredState(initial);
      return initial;
    }

    const parsed = JSON.parse(raw);
    const today = getTodayDateString();
    const week = getCurrentWeekString();
    const month = getCurrentMonthString();

    // Migrate quests if needed
    let quests: Quest[] = [];
    if (Array.isArray(parsed.quests) && parsed.quests.length > 0) {
      quests = parsed.quests.map((q: any) => {
        // Convert old category (study/fitness/reading) into discipline if not already converted
        const validCategories = ['daily', 'weekly', 'monthly', 'main', 'side'];
        const isOldCategory = !validCategories.includes(q.category);
        return {
          ...q,
          category: isOldCategory ? 'daily' : q.category,
          discipline: q.discipline || (isOldCategory ? q.category : 'study'),
        };
      });
    } else {
      quests = INITIAL_DEFAULT_QUESTS.map(q => ({ ...q }));
    }

    const templates: QuestTemplate[] = Array.isArray(parsed.templates) && parsed.templates.length > 0
      ? parsed.templates
      : DEFAULT_TEMPLATES.map(t => ({ ...t }));

    const playerName = parsed.settings?.playerName || parsed.playerName || 'Player One';
    const lifetimeXP = typeof parsed.lifetimeXP === 'number' ? parsed.lifetimeXP : 0;
    const currentLevel = Math.floor(lifetimeXP / 100) + 1;

    const state: LifeRPGState = {
      version: 2,
      playerName,
      playerTitle: getPlayerTitle(currentLevel),
      lifetimeXP,
      dailyXPEarned: typeof parsed.dailyXPEarned === 'number' ? parsed.dailyXPEarned : 0,
      currentStreak: typeof parsed.currentStreak === 'number' ? parsed.currentStreak : 0,
      longestStreak: typeof parsed.longestStreak === 'number' ? parsed.longestStreak : 0,
      lastActiveDate: parsed.lastActiveDate || today,
      lastActiveWeek: parsed.lastActiveWeek || week,
      lastActiveMonth: parsed.lastActiveMonth || month,
      quests,
      templates,
      history: parsed.history || {},
      completedLogs: Array.isArray(parsed.completedLogs) ? parsed.completedLogs : [],
      achievements: Array.isArray(parsed.achievements) && parsed.achievements.length > 0
        ? syncAchievements(parsed.achievements)
        : INITIAL_ACHIEVEMENTS.map(a => ({ ...a })),
      settings: {
        soundEffects: parsed.settings?.soundEffects ?? true,
        hapticFeedback: parsed.settings?.hapticFeedback ?? true,
        dailyReminder: parsed.settings?.dailyReminder ?? false,
        reminderTime: parsed.settings?.reminderTime ?? '20:00',
        playerName,
      },
    };

    // Check boundary transitions (Day, Week, Month)
    return checkAndHandleDateTransition(state, today, week, month);
  } catch (err) {
    console.error('Failed to parse Life RPG state from localStorage', err);
    return getInitialState();
  }
}

export function saveStoredState(state: LifeRPGState) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.error('Failed to persist Life RPG state to localStorage', err);
  }
}

function syncAchievements(existing: Achievement[]): Achievement[] {
  const map = new Map(existing.map(a => [a.id, a]));
  return INITIAL_ACHIEVEMENTS.map(initial => {
    const prev = map.get(initial.id);
    if (prev) {
      return {
        ...initial,
        unlocked: prev.unlocked,
        unlockedAt: prev.unlockedAt,
        currentValue: prev.currentValue ?? 0,
      };
    }
    return { ...initial };
  });
}

/**
 * Handle Day, Week, and Month transitions:
 * 1. Day transition:
 *    - Records previous day history.
 *    - Daily quests do NOT repeat automatically: previous day's daily quests are archived/cleared.
 *    - Daily XP earned resets to 0.
 *    - Streak is updated.
 * 2. Week transition:
 *    - Weekly quests reset completion state.
 * 3. Month transition:
 *    - Monthly quests reset completion state.
 * 4. Main Quests & Side Quests:
 *    - NEVER auto-reset; remain active until manually completed!
 * 5. Lifetime XP is NEVER erased.
 */
export function checkAndHandleDateTransition(
  state: LifeRPGState,
  today: string = getTodayDateString(),
  currentWeek: string = getCurrentWeekString(),
  currentMonth: string = getCurrentMonthString()
): LifeRPGState {
  let updatedQuests = [...state.quests];
  let dailyXPEarned = state.dailyXPEarned;
  let currentStreak = state.currentStreak;
  let longestStreak = state.longestStreak;
  const updatedHistory = { ...state.history };

  // 1. Day boundary check
  if (state.lastActiveDate !== today) {
    const prevDate = state.lastActiveDate;
    const prevDailyQuests = state.quests.filter(q => q.category === 'daily');
    const prevCompletedDaily = prevDailyQuests.filter(q => q.completed);
    const prevTotalDaily = prevDailyQuests.length;
    const prevCompletedCount = prevCompletedDaily.length;

    if (prevDate && !updatedHistory[prevDate]) {
      const dayRecord: DayRecord = {
        date: prevDate,
        completedQuestIds: prevCompletedDaily.map(q => q.id),
        dailyXPEarned: state.dailyXPEarned,
        totalQuests: prevTotalDaily,
        completedCount: prevCompletedCount,
        completionPercentage: prevTotalDaily > 0 ? Math.round((prevCompletedCount / prevTotalDaily) * 100) : 0,
      };
      updatedHistory[prevDate] = dayRecord;
    }

    // Streak continuity
    const prevDateObj = new Date(prevDate);
    const todayDateObj = new Date(today);
    const diffTime = Math.abs(todayDateObj.getTime() - prevDateObj.getTime());
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      if (prevCompletedCount === 0 && state.dailyXPEarned === 0) {
        currentStreak = 0;
      }
    } else if (diffDays > 1) {
      currentStreak = 0;
    }

    // "Daily quests must not automatically repeat. Users should manually add new quests or reuse saved templates."
    // Remove old daily quests from the active list so that daily quests start empty for the new day
    // (User can load from templates or add custom daily quests manually).
    updatedQuests = updatedQuests.filter(q => q.category !== 'daily');

    // Reset daily XP earned
    dailyXPEarned = 0;
  }

  // 2. Week boundary check
  if (state.lastActiveWeek !== currentWeek) {
    // "Weekly quests should reset at the beginning of a new week"
    updatedQuests = updatedQuests.map(q => {
      if (q.category === 'weekly') {
        return {
          ...q,
          completed: false,
          completedAt: undefined,
        };
      }
      return q;
    });
  }

  // 3. Month boundary check
  if (state.lastActiveMonth !== currentMonth) {
    // "monthly quests at the beginning of a new month"
    updatedQuests = updatedQuests.map(q => {
      if (q.category === 'monthly') {
        return {
          ...q,
          completed: false,
          completedAt: undefined,
        };
      }
      return q;
    });
  }

  // Main Quests and Side Quests remain unaffected!

  const updatedState: LifeRPGState = {
    ...state,
    lastActiveDate: today,
    lastActiveWeek: currentWeek,
    lastActiveMonth: currentMonth,
    dailyXPEarned,
    currentStreak,
    longestStreak,
    quests: updatedQuests,
    history: updatedHistory,
  };

  saveStoredState(updatedState);
  return updatedState;
}

export function evaluateAchievements(state: LifeRPGState): {
  updatedState: LifeRPGState;
  newlyUnlocked: Achievement[];
} {
  const newlyUnlocked: Achievement[] = [];
  const level = Math.floor(state.lifetimeXP / 100) + 1;
  const totalCompletedQuests = state.completedLogs.length;

  const studyCount = state.completedLogs.filter(l => l.discipline === 'study').length;
  const fitnessCount = state.completedLogs.filter(l => l.discipline === 'fitness').length;
  const readingCount = state.completedLogs.filter(l => l.discipline === 'reading' || l.discipline === 'mindset').length;
  const mainQuestCount = state.completedLogs.filter(l => l.category === 'main').length;

  const todayDailyQuests = state.quests.filter(q => q.category === 'daily');
  const todayDailyDone = todayDailyQuests.length > 0 && todayDailyQuests.every(q => q.completed);

  let extraXP = 0;

  const updatedAchievements = state.achievements.map(ach => {
    let currentVal = ach.currentValue;

    switch (ach.id) {
      case 'ach-first-blood':
        currentVal = totalCompletedQuests;
        break;
      case 'ach-level-2':
        currentVal = level;
        break;
      case 'ach-level-5':
        currentVal = level;
        break;
      case 'ach-century-club':
        currentVal = state.lifetimeXP;
        break;
      case 'ach-xp-1000':
        currentVal = state.lifetimeXP;
        break;
      case 'ach-scholar':
        currentVal = studyCount;
        break;
      case 'ach-iron-will':
        currentVal = fitnessCount;
        break;
      case 'ach-bookworm':
        currentVal = readingCount;
        break;
      case 'ach-main-quest':
        currentVal = mainQuestCount;
        break;
      case 'ach-streak-3':
        currentVal = state.currentStreak;
        break;
      case 'ach-streak-7':
        currentVal = state.currentStreak;
        break;
      case 'ach-quests-25':
        currentVal = totalCompletedQuests;
        break;
      case 'ach-daily-grandmaster':
        currentVal = todayDailyDone ? 1 : 0;
        break;
    }

    const shouldUnlock = !ach.unlocked && currentVal >= ach.requirement;
    if (shouldUnlock) {
      const unlockedAch: Achievement = {
        ...ach,
        unlocked: true,
        unlockedAt: new Date().toISOString(),
        currentValue: currentVal,
      };
      newlyUnlocked.push(unlockedAch);
      extraXP += ach.rewardXP;
      return unlockedAch;
    }

    return {
      ...ach,
      currentValue: currentVal,
    };
  });

  const finalLifetimeXP = state.lifetimeXP + extraXP;
  const finalLevel = Math.floor(finalLifetimeXP / 100) + 1;

  const updatedState: LifeRPGState = {
    ...state,
    lifetimeXP: finalLifetimeXP,
    playerTitle: getPlayerTitle(finalLevel),
    achievements: updatedAchievements,
  };

  return { updatedState, newlyUnlocked };
}
