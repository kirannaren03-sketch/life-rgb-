import { Achievement, Quest, QuestCategory, QuestDiscipline, QuestTemplate } from '../types';

export const DEFAULT_TEMPLATES: QuestTemplate[] = [
  {
    id: 'tmpl-1',
    title: 'SST Written Work',
    description: 'Complete Social Studies written coursework and review key notes.',
    xp: 20,
    category: 'daily',
    discipline: 'study',
  },
  {
    id: 'tmpl-2',
    title: 'Maths Chapter 13 Complete',
    description: 'Solve assigned exercise problems and formulas from Chapter 13.',
    xp: 20,
    category: 'daily',
    discipline: 'study',
  },
  {
    id: 'tmpl-3',
    title: 'Science Chapter 7 Complete',
    description: 'Read concepts, diagrams, and solve questions for Chapter 7.',
    xp: 20,
    category: 'daily',
    discipline: 'study',
  },
  {
    id: 'tmpl-4',
    title: 'Full Body Workout',
    description: 'Hit the gym or complete full body calisthenics & stretching.',
    xp: 20,
    category: 'daily',
    discipline: 'fitness',
  },
  {
    id: 'tmpl-5',
    title: 'Read Two Chapters of The Power of Your Subconscious Mind',
    description: 'Deep reading session focusing on mental reprogramming and clarity.',
    xp: 20,
    category: 'daily',
    discipline: 'reading',
  },
  {
    id: 'tmpl-6',
    title: '30-Minute Deep Revision Session',
    description: 'Active recall and flashcard practice without distractions.',
    xp: 25,
    category: 'daily',
    discipline: 'study',
  },
  {
    id: 'tmpl-7',
    title: '5km Morning Run or 10,000 Steps',
    description: 'Cardiovascular endurance conditioning session.',
    xp: 30,
    category: 'daily',
    discipline: 'fitness',
  },
];

export const INITIAL_DEFAULT_QUESTS: Quest[] = [
  // 1. Daily Quests (The 5 requested default quests)
  {
    id: 'quest-daily-1',
    title: 'SST Written Work',
    description: 'Complete Social Studies written coursework and review key notes.',
    xp: 20,
    category: 'daily',
    discipline: 'study',
    completed: false,
    isDefault: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'quest-daily-2',
    title: 'Maths Chapter 13 Complete',
    description: 'Solve assigned exercise problems and formulas from Chapter 13.',
    xp: 20,
    category: 'daily',
    discipline: 'study',
    completed: false,
    isDefault: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'quest-daily-3',
    title: 'Science Chapter 7 Complete',
    description: 'Read concepts, diagrams, and solve questions for Chapter 7.',
    xp: 20,
    category: 'daily',
    discipline: 'study',
    completed: false,
    isDefault: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'quest-daily-4',
    title: 'Full Body Workout',
    description: 'Hit the gym or complete full body calisthenics & stretching.',
    xp: 20,
    category: 'daily',
    discipline: 'fitness',
    completed: false,
    isDefault: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'quest-daily-5',
    title: 'Read Two Chapters of The Power of Your Subconscious Mind',
    description: 'Deep reading session focusing on mental reprogramming and clarity.',
    xp: 20,
    category: 'daily',
    discipline: 'reading',
    completed: false,
    isDefault: true,
    createdAt: new Date().toISOString(),
  },

  // 2. Weekly Quests (Resets weekly)
  {
    id: 'quest-weekly-1',
    title: 'Weekly Mock Exam & Error Analysis',
    description: 'Take a comprehensive timed paper and document mistake journal.',
    xp: 60,
    category: 'weekly',
    discipline: 'study',
    completed: false,
    isDefault: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'quest-weekly-2',
    title: 'Complete 4 High-Intensity Workouts',
    description: 'Maintain training frequency throughout the week.',
    xp: 75,
    category: 'weekly',
    discipline: 'fitness',
    completed: false,
    isDefault: true,
    createdAt: new Date().toISOString(),
  },

  // 3. Monthly Quests (Resets monthly)
  {
    id: 'quest-monthly-1',
    title: 'Finish 2 Full Books on Personal Mastery',
    description: 'Synthesize actionable notes and implement core principles.',
    xp: 150,
    category: 'monthly',
    discipline: 'reading',
    completed: false,
    isDefault: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'quest-monthly-2',
    title: 'Complete 30-Day Training & Study Audit',
    description: 'Review monthly consistency, grades, and metrics.',
    xp: 200,
    category: 'monthly',
    discipline: 'mindset',
    completed: false,
    isDefault: true,
    createdAt: new Date().toISOString(),
  },

  // 4. Main Quests (Remain active until manually completed!)
  {
    id: 'quest-main-1',
    title: 'Syllabus Mastery – Complete Final Term Exam Prep',
    description: 'Epic milestone: Complete thorough syllabus revision for all academic subjects.',
    xp: 350,
    category: 'main',
    discipline: 'study',
    completed: false,
    isDefault: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'quest-main-2',
    title: 'Physical Transformation – Hit 60-Day Habit Streak',
    description: 'Epic milestone: Consistently train and nourish the physical vessel without breaking chain.',
    xp: 400,
    category: 'main',
    discipline: 'fitness',
    completed: false,
    isDefault: true,
    createdAt: new Date().toISOString(),
  },

  // 5. Side Quests (Optional tasks, remain active until manually completed)
  {
    id: 'quest-side-1',
    title: 'Clean & Optimize Study Desk & Workspace',
    description: 'Declutter physical desk, file loose papers, and setup clean study environment.',
    xp: 25,
    category: 'side',
    discipline: 'life',
    completed: false,
    isDefault: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'quest-side-2',
    title: 'Organize Digital Files & Course Notes',
    description: 'Sort PDF notes, backups, and organize study folders cleanly.',
    xp: 30,
    category: 'side',
    discipline: 'life',
    completed: false,
    isDefault: true,
    createdAt: new Date().toISOString(),
  },
];

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'ach-first-blood',
    title: 'First Step',
    description: 'Complete your first real-life quest.',
    iconName: 'Zap',
    category: 'quests',
    unlocked: false,
    rewardXP: 10,
    requirement: 1,
    currentValue: 0,
  },
  {
    id: 'ach-level-2',
    title: 'Level 2 Initiated',
    description: 'Ascend to Level 2 by earning 100 Lifetime XP.',
    iconName: 'Shield',
    category: 'level',
    unlocked: false,
    rewardXP: 25,
    requirement: 2,
    currentValue: 1,
  },
  {
    id: 'ach-century-club',
    title: 'Century Club',
    description: 'Accumulate 100 Lifetime XP.',
    iconName: 'Award',
    category: 'xp',
    unlocked: false,
    rewardXP: 20,
    requirement: 100,
    currentValue: 0,
  },
  {
    id: 'ach-daily-grandmaster',
    title: 'Daily Clean Sweep',
    description: 'Complete all active daily quests in a single day.',
    iconName: 'CheckCircle2',
    category: 'special',
    unlocked: false,
    rewardXP: 30,
    requirement: 1,
    currentValue: 0,
  },
  {
    id: 'ach-scholar',
    title: 'High Scholar',
    description: 'Complete 5 Study quests.',
    iconName: 'BookOpen',
    category: 'quests',
    unlocked: false,
    rewardXP: 25,
    requirement: 5,
    currentValue: 0,
  },
  {
    id: 'ach-iron-will',
    title: 'Iron Will',
    description: 'Complete 5 Fitness quests.',
    iconName: 'Dumbbell',
    category: 'quests',
    unlocked: false,
    rewardXP: 25,
    requirement: 5,
    currentValue: 0,
  },
  {
    id: 'ach-bookworm',
    title: 'Subconscious Mastery',
    description: 'Complete 5 Reading or Mindset quests.',
    iconName: 'Brain',
    category: 'quests',
    unlocked: false,
    rewardXP: 25,
    requirement: 5,
    currentValue: 0,
  },
  {
    id: 'ach-main-quest',
    title: 'Epic Champion',
    description: 'Conquer your first Main Quest.',
    iconName: 'Crown',
    category: 'special',
    unlocked: false,
    rewardXP: 50,
    requirement: 1,
    currentValue: 0,
  },
  {
    id: 'ach-streak-3',
    title: 'Momentum',
    description: 'Maintain a 3-day quest streak.',
    iconName: 'Flame',
    category: 'streak',
    unlocked: false,
    rewardXP: 30,
    requirement: 3,
    currentValue: 0,
  },
  {
    id: 'ach-streak-7',
    title: 'Unstoppable Habit',
    description: 'Maintain a 7-day consistency streak.',
    iconName: 'Trophy',
    category: 'streak',
    unlocked: false,
    rewardXP: 50,
    requirement: 7,
    currentValue: 0,
  },
  {
    id: 'ach-quests-25',
    title: 'Quest Veteran',
    description: 'Complete 25 total quests across all categories.',
    iconName: 'Target',
    category: 'quests',
    unlocked: false,
    rewardXP: 60,
    requirement: 25,
    currentValue: 0,
  },
  {
    id: 'ach-xp-1000',
    title: 'Grandmaster (1,000 XP)',
    description: 'Reach Level 10 by accumulating 1,000 Lifetime XP.',
    iconName: 'Sparkles',
    category: 'xp',
    unlocked: false,
    rewardXP: 100,
    requirement: 1000,
    currentValue: 0,
  },
];

export function getPlayerTitle(level: number): string {
  if (level >= 10) return 'Mythic Grandmaster';
  if (level >= 8) return 'Ascendant Knight';
  if (level >= 6) return 'Warrior Scholar';
  if (level >= 5) return 'Mindset Alchemist';
  if (level >= 4) return 'Iron Resolute';
  if (level >= 3) return 'Focus Adept';
  if (level >= 2) return 'Disciplined Seeker';
  return 'Apprentice Adventurer';
}

export function getCategoryMetadata(category: QuestCategory): {
  label: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  accentColor: string;
} {
  switch (category) {
    case 'daily':
      return {
        label: 'Daily',
        badgeBg: 'bg-cyan-500/10',
        badgeText: 'text-cyan-400',
        badgeBorder: 'border-cyan-500/30',
        accentColor: '#06b6d4',
      };
    case 'weekly':
      return {
        label: 'Weekly',
        badgeBg: 'bg-emerald-500/10',
        badgeText: 'text-emerald-400',
        badgeBorder: 'border-emerald-500/30',
        accentColor: '#10b981',
      };
    case 'monthly':
      return {
        label: 'Monthly',
        badgeBg: 'bg-purple-500/10',
        badgeText: 'text-purple-400',
        badgeBorder: 'border-purple-500/30',
        accentColor: '#a855f7',
      };
    case 'main':
      return {
        label: 'Main Quest',
        badgeBg: 'bg-amber-500/15',
        badgeText: 'text-amber-300',
        badgeBorder: 'border-amber-500/40',
        accentColor: '#f59e0b',
      };
    case 'side':
      return {
        label: 'Side Quest',
        badgeBg: 'bg-blue-500/10',
        badgeText: 'text-blue-400',
        badgeBorder: 'border-blue-500/30',
        accentColor: '#3b82f6',
      };
    default:
      return {
        label: 'Quest',
        badgeBg: 'bg-slate-500/10',
        badgeText: 'text-slate-300',
        badgeBorder: 'border-slate-500/30',
        accentColor: '#64748b',
      };
  }
}

export function getDisciplineMetadata(discipline?: QuestDiscipline): {
  label: string;
  badgeBg: string;
  badgeText: string;
} {
  switch (discipline) {
    case 'study':
      return { label: 'Study', badgeBg: 'bg-blue-500/10', badgeText: 'text-blue-300' };
    case 'fitness':
      return { label: 'Fitness', badgeBg: 'bg-emerald-500/10', badgeText: 'text-emerald-300' };
    case 'reading':
      return { label: 'Reading', badgeBg: 'bg-purple-500/10', badgeText: 'text-purple-300' };
    case 'mindset':
      return { label: 'Mindset', badgeBg: 'bg-amber-500/10', badgeText: 'text-amber-300' };
    case 'life':
      return { label: 'Life', badgeBg: 'bg-cyan-500/10', badgeText: 'text-cyan-300' };
    default:
      return { label: 'General', badgeBg: 'bg-slate-500/10', badgeText: 'text-slate-300' };
  }
}
