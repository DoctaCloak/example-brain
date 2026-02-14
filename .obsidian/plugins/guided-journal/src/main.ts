import { Plugin, TFile } from 'obsidian';
import { GuidedJournalSettings, DEFAULT_SETTINGS, PluginData, DEFAULT_PLUGIN_DATA } from './types';
import { GuidedJournalSettingTab } from './settings';
import { JournalManager } from './services/journal-manager';
import { registerEmotionGridProcessor } from './processors/emotion-grid';
import { registerHabitTrackerProcessor } from './processors/habit-tracker';
import { registerMoodTrackerProcessor } from './processors/mood-slider';
import { registerTimeTrackerProcessor } from './processors/time-tracker';
import { registerPriorityProcessor } from './processors/priority-status';
import { registerCalendarGridProcessor } from './processors/calendar-grid';
import { registerSelfCareGridProcessor } from './processors/self-care-grid';
import { registerFocusSelectorProcessor } from './processors/focus-selector';
import { registerScheduleProcessor } from './processors/schedule';
import { registerWorkoutPlannerProcessor } from './processors/workout-planner';

export default class GuidedJournalPlugin extends Plugin {
  settings: GuidedJournalSettings = DEFAULT_SETTINGS;
  pluginData: PluginData = DEFAULT_PLUGIN_DATA;
  journalManager!: JournalManager;
  private data_: Record<string, any> = {};

  async onload() {
    await this.loadAllData();

    this.journalManager = new JournalManager(
      this.app,
      this.settings,
      this.pluginData,
      () => this.saveAllData(),
    );

    // Apply theme class
    this.applyTheme();

    // Register post-processors
    this.registerMarkdownCodeBlockProcessor('emotion-grid', registerEmotionGridProcessor(this.app));
    this.registerMarkdownCodeBlockProcessor('habit-tracker', registerHabitTrackerProcessor(this.app));
    this.registerMarkdownCodeBlockProcessor('mood-tracker', registerMoodTrackerProcessor(this.app));
    this.registerMarkdownCodeBlockProcessor('time-tracker', registerTimeTrackerProcessor(this.app));
    this.registerMarkdownCodeBlockProcessor('priorities', registerPriorityProcessor(this.app));
    this.registerMarkdownCodeBlockProcessor('monthly-calendar', registerCalendarGridProcessor(this.app, this.settings));
    this.registerMarkdownCodeBlockProcessor('self-care', registerSelfCareGridProcessor(this.app));
    this.registerMarkdownCodeBlockProcessor('focus-selector', registerFocusSelectorProcessor(this.app));
    this.registerMarkdownCodeBlockProcessor('schedule', registerScheduleProcessor(this.app));
    this.registerMarkdownCodeBlockProcessor('workout-planner', registerWorkoutPlannerProcessor(this.app));

    // Ribbon icon
    this.addRibbonIcon('book-open', 'Open today\'s journal', async () => {
      await this.journalManager.openTodaysDaily();
    });

    // Commands
    this.addCommand({
      id: 'open-daily-journal',
      name: 'Open today\'s daily journal',
      callback: () => this.journalManager.openTodaysDaily(),
    });

    this.addCommand({
      id: 'create-daily-journal',
      name: 'Create today\'s daily journal',
      callback: async () => {
        const file = await this.journalManager.createTodaysJournal();
        if (file) await this.app.workspace.getLeaf().openFile(file);
      },
    });

    this.addCommand({
      id: 'create-weekly-journal',
      name: 'Create this week\'s journal',
      callback: async () => {
        const file = await this.journalManager.createThisWeeksJournal();
        if (file) await this.app.workspace.getLeaf().openFile(file);
      },
    });

    this.addCommand({
      id: 'create-monthly-journal',
      name: 'Create this month\'s journal',
      callback: async () => {
        const file = await this.journalManager.createThisMonthsJournal();
        if (file) await this.app.workspace.getLeaf().openFile(file);
      },
    });

    this.addCommand({
      id: 'open-dig-deeper',
      name: 'Open today\'s Dig Deeper prompt',
      callback: () => this.journalManager.openTodaysDigDeeper(),
    });

    this.addCommand({
      id: 'prev-daily',
      name: 'Go to previous day\'s journal',
      callback: () => this.journalManager.openDailyByOffset(-1),
    });

    this.addCommand({
      id: 'next-daily',
      name: 'Go to next day\'s journal',
      callback: () => this.journalManager.openDailyByOffset(1),
    });

    // Settings tab
    this.addSettingTab(new GuidedJournalSettingTab(this.app, this));

    // Auto-create on startup
    this.app.workspace.onLayoutReady(async () => {
      const dailyFile = await this.journalManager.runStartupRoutine();
      if (this.settings.openDailyOnStartup && dailyFile) {
        await this.app.workspace.getLeaf().openFile(dailyFile);
      }
    });
  }

  onunload() {
    document.body.removeClass('gj-theme-paper', 'gj-theme-minimal', 'gj-theme-dark');
  }

  private applyTheme() {
    document.body.removeClass('gj-theme-paper', 'gj-theme-minimal', 'gj-theme-dark');
    document.body.addClass(`gj-theme-${this.settings.journalTheme}`);
  }

  // Single data object to prevent save race conditions
  async loadAllData() {
    this.data_ = (await this.loadData()) || {};
    this.settings = Object.assign({}, DEFAULT_SETTINGS, this.data_.settings || {});
    this.pluginData = Object.assign({}, DEFAULT_PLUGIN_DATA, this.data_.pluginData || {});
    if (this.pluginData.questionBank) {
      this.pluginData.questionBank = Object.assign(
        {},
        DEFAULT_PLUGIN_DATA.questionBank,
        this.data_.pluginData?.questionBank || {},
      );
    }
  }

  async saveAllData() {
    this.data_.settings = this.settings;
    this.data_.pluginData = this.pluginData;
    await this.saveData(this.data_);
  }

  // Keep these for settings tab compatibility
  async saveSettings() {
    await this.saveAllData();
    this.applyTheme();
  }
}
