export interface GuidedJournalSettings {
  dailyFolder: string;
  weeklyFolder: string;
  monthlyFolder: string;
  digDeeperFolder: string;
  autoCreateDaily: boolean;
  autoCreateWeekly: boolean;
  autoCreateMonthly: boolean;
  autoCreateDigDeeper: boolean;
  openDailyOnStartup: boolean;
  weekStartDay: 'monday' | 'sunday';
  customEmotions: string[];
  defaultHabits: string[];
  selfCareCategories: string[];
  customQuestions: string[];
  dateFormat: string;
  journalTheme: 'minimal' | 'paper' | 'dark';
}

export const DEFAULT_SETTINGS: GuidedJournalSettings = {
  dailyFolder: 'Journal/Daily',
  weeklyFolder: 'Journal/Weekly',
  monthlyFolder: 'Journal/Monthly',
  digDeeperFolder: 'Journal/Dig-Deeper',
  autoCreateDaily: true,
  autoCreateWeekly: true,
  autoCreateMonthly: true,
  autoCreateDigDeeper: true,
  openDailyOnStartup: true,
  weekStartDay: 'monday',
  customEmotions: [],
  defaultHabits: [],
  selfCareCategories: ['Physical', 'Emotional', 'Professional', 'Social', 'Financial', 'Spiritual'],
  customQuestions: [],
  dateFormat: 'YYYY-MM-DD',
  journalTheme: 'paper',
};

export interface PriorityItem {
  text: string;
  status: 'pending' | 'done' | 'delay' | 'delete';
}

export interface WorkoutDay {
  activity: string;
  nutrition: string;
}

export interface TimeTracker {
  tasks: number;
  distractions: number;
  selfCare: number;
}

export interface QuestionBankData {
  usedIds: number[];
  currentCycle: number;
  lastQuestionDate: string;
  lastQuestionId: number;
}

export interface PluginData {
  questionBank: QuestionBankData;
}

export const DEFAULT_PLUGIN_DATA: PluginData = {
  questionBank: {
    usedIds: [],
    currentCycle: 1,
    lastQuestionDate: '',
    lastQuestionId: -1,
  },
};
