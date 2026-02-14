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

export default class GuidedJournalPlugin extends Plugin {
  settings: GuidedJournalSettings = DEFAULT_SETTINGS;
  pluginData: PluginData = DEFAULT_PLUGIN_DATA;
  journalManager!: JournalManager;

  async onload() {
    await this.loadSettings();
    await this.loadPluginData();

    this.journalManager = new JournalManager(
      this.app,
      this.settings,
      this.pluginData,
      () => this.savePluginData(),
    );

    // Register post-processors for code blocks
    this.registerMarkdownCodeBlockProcessor('emotion-grid', registerEmotionGridProcessor(this.app));
    this.registerMarkdownCodeBlockProcessor('habit-tracker', registerHabitTrackerProcessor(this.app));
    this.registerMarkdownCodeBlockProcessor('mood-tracker', registerMoodTrackerProcessor(this.app, 'mood'));
    this.registerMarkdownCodeBlockProcessor('time-tracker', registerTimeTrackerProcessor(this.app));
    this.registerMarkdownCodeBlockProcessor('priorities', registerPriorityProcessor(this.app));
    this.registerMarkdownCodeBlockProcessor('monthly-calendar', registerCalendarGridProcessor(this.app));
    this.registerMarkdownCodeBlockProcessor('self-care', registerSelfCareGridProcessor(this.app));
    this.registerMarkdownCodeBlockProcessor('focus-selector', registerFocusSelectorProcessor(this.app));

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

  async loadSettings() {
    const data = await this.loadData();
    this.settings = Object.assign({}, DEFAULT_SETTINGS, data?.settings || {});
  }

  async saveSettings() {
    const data = await this.loadData() || {};
    data.settings = this.settings;
    await this.saveData(data);
  }

  async loadPluginData() {
    const data = await this.loadData();
    this.pluginData = Object.assign({}, DEFAULT_PLUGIN_DATA, data?.pluginData || {});
  }

  async savePluginData() {
    const data = await this.loadData() || {};
    data.pluginData = this.pluginData;
    await this.saveData(data);
  }
}
