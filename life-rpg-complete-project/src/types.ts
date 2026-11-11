export type QuestCategory = 'daily' | 'weekly' | 'monthly' | 'main' | 'side';

export type QuestDiscipline = 'study' | 'fitness' | 'reading' | 'mindset' | 'life' | 'custom';

export interface Quest {
  id: string;
  title: string;
  description?: string;
  xp: number;
  category: QuestCategory; // 'daily' | 'weekly' | 'monthly' | 'main' | 'side'
  discipline?: QuestDiscipline; // 'study' | 'fitness' | 'reading' | 'mindset' | 'life' | 'custom'
  completed: boolean;
  completedAt?: string; // ISO timestamp
  isDefault?: boolean;
  createdAt: string; // ISO timestamp
  dateFor?: string; // Date or period string (e.g. 'YYYY-MM-DD' for daily)
}

export interface QuestTemplate {
  id: string;
  title: string;
  description?: string;
  xp: number;
  category: QuestCategory;
  discipline?: QuestDiscipline;
}

export interface DayRecord {
  date: string; // 'YYYY-MM-DD'
  completedQuestIds: string[];
  dailyXPEarned: number;
  totalQuests: number;
  completedCount: number;
  completionPercentage: number;
}

export interface CompletedLogEntry {
  id: string;
  questId: string;
  questTitle: string;
  category: QuestCategory;
  discipline?: QuestDiscipline;
  xp: number;
  completedAt: string;
  date: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  iconName: string;
  category: 'level' | 'quests' | 'streak' | 'xp' | 'special';
  unlocked: boolean;
  unlockedAt?: string;
  rewardXP: number;
  requirement: number;
  currentValue: number;
}

export interface AppSettings {
  soundEffects: boolean;
  hapticFeedback: boolean;
  dailyReminder: boolean;
  reminderTime: string;
  playerName: string;
}

export interface LifeRPGState {
  version: number;
  playerName: string;
  playerTitle: string;
  lifetimeXP: number;
  dailyXPEarned: number;
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string; // 'YYYY-MM-DD'
  lastActiveWeek: string; // 'YYYY-Wxx'
  lastActiveMonth: string; // 'YYYY-MM'
  quests: Quest[];
  templates: QuestTemplate[];
  history: Record<string, DayRecord>;
  completedLogs: CompletedLogEntry[];
  achievements: Achievement[];
  settings: AppSettings;
}
