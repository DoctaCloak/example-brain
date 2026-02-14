import { App, PluginSettingTab, Setting } from 'obsidian';
import type GuidedJournalPlugin from './main';
import { GuidedJournalSettings } from './types';

export class GuidedJournalSettingTab extends PluginSettingTab {
  plugin: GuidedJournalPlugin;

  constructor(app: App, plugin: GuidedJournalPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;
    containerEl.empty();

    containerEl.createEl('h1', { text: 'Guided Journal' });

    // --- Folders ---
    containerEl.createEl('h2', { text: 'Folders' });

    new Setting(containerEl)
      .setName('Daily notes folder')
      .setDesc('Where daily journal notes are stored')
      .addText(text => text
        .setPlaceholder('Journal/Daily')
        .setValue(this.plugin.settings.dailyFolder)
        .onChange(async (value) => {
          this.plugin.settings.dailyFolder = value;
          await this.plugin.saveSettings();
        }));

    new Setting(containerEl)
      .setName('Weekly notes folder')
      .addText(text => text
        .setPlaceholder('Journal/Weekly')
        .setValue(this.plugin.settings.weeklyFolder)
        .onChange(async (value) => {
          this.plugin.settings.weeklyFolder = value;
          await this.plugin.saveSettings();
        }));

    new Setting(containerEl)
      .setName('Monthly notes folder')
      .addText(text => text
        .setPlaceholder('Journal/Monthly')
        .setValue(this.plugin.settings.monthlyFolder)
        .onChange(async (value) => {
          this.plugin.settings.monthlyFolder = value;
          await this.plugin.saveSettings();
        }));

    new Setting(containerEl)
      .setName('Dig Deeper folder')
      .addText(text => text
        .setPlaceholder('Journal/Dig-Deeper')
        .setValue(this.plugin.settings.digDeeperFolder)
        .onChange(async (value) => {
          this.plugin.settings.digDeeperFolder = value;
          await this.plugin.saveSettings();
        }));

    // --- Auto-creation ---
    containerEl.createEl('h2', { text: 'Auto-creation' });

    new Setting(containerEl)
      .setName('Auto-create daily note')
      .setDesc('Create a daily journal note when you open Obsidian')
      .addToggle(toggle => toggle
        .setValue(this.plugin.settings.autoCreateDaily)
        .onChange(async (value) => {
          this.plugin.settings.autoCreateDaily = value;
          await this.plugin.saveSettings();
        }));

    new Setting(containerEl)
      .setName('Auto-create weekly note')
      .setDesc('Create a weekly note on the first day of each week')
      .addToggle(toggle => toggle
        .setValue(this.plugin.settings.autoCreateWeekly)
        .onChange(async (value) => {
          this.plugin.settings.autoCreateWeekly = value;
          await this.plugin.saveSettings();
        }));

    new Setting(containerEl)
      .setName('Auto-create monthly note')
      .setDesc('Create a monthly note on the 1st of each month')
      .addToggle(toggle => toggle
        .setValue(this.plugin.settings.autoCreateMonthly)
        .onChange(async (value) => {
          this.plugin.settings.autoCreateMonthly = value;
          await this.plugin.saveSettings();
        }));

    new Setting(containerEl)
      .setName('Auto-create Dig Deeper prompt')
      .setDesc('Create a daily reflective prompt')
      .addToggle(toggle => toggle
        .setValue(this.plugin.settings.autoCreateDigDeeper)
        .onChange(async (value) => {
          this.plugin.settings.autoCreateDigDeeper = value;
          await this.plugin.saveSettings();
        }));

    new Setting(containerEl)
      .setName('Open daily note on startup')
      .setDesc('Automatically open today\'s daily note when Obsidian starts')
      .addToggle(toggle => toggle
        .setValue(this.plugin.settings.openDailyOnStartup)
        .onChange(async (value) => {
          this.plugin.settings.openDailyOnStartup = value;
          await this.plugin.saveSettings();
        }));

    // --- Preferences ---
    containerEl.createEl('h2', { text: 'Preferences' });

    new Setting(containerEl)
      .setName('Week starts on')
      .addDropdown(dropdown => dropdown
        .addOption('monday', 'Monday')
        .addOption('sunday', 'Sunday')
        .setValue(this.plugin.settings.weekStartDay)
        .onChange(async (value: 'monday' | 'sunday') => {
          this.plugin.settings.weekStartDay = value;
          await this.plugin.saveSettings();
        }));

    new Setting(containerEl)
      .setName('Custom emotions')
      .setDesc('Additional emotions added to the default 36 (comma-separated)')
      .addTextArea(text => text
        .setPlaceholder('Nostalgic, Rebellious, Tender')
        .setValue(this.plugin.settings.customEmotions.join(', '))
        .onChange(async (value) => {
          this.plugin.settings.customEmotions = value.split(',').map(e => e.trim()).filter(e => e);
          await this.plugin.saveSettings();
        }));

    new Setting(containerEl)
      .setName('Theme')
      .addDropdown(dropdown => dropdown
        .addOption('paper', 'Paper')
        .addOption('minimal', 'Minimal')
        .addOption('dark', 'Dark')
        .setValue(this.plugin.settings.journalTheme)
        .onChange(async (value: 'minimal' | 'paper' | 'dark') => {
          this.plugin.settings.journalTheme = value;
          await this.plugin.saveSettings();
        }));

    // --- Default Habits ---
    containerEl.createEl('h2', { text: 'Default Habits' });
    containerEl.createEl('p', {
      text: 'These habits will be pre-filled in each new weekly note.',
      cls: 'setting-item-description',
    });

    new Setting(containerEl)
      .setName('Habits (comma-separated)')
      .addTextArea(text => text
        .setPlaceholder('Morning run, Read 30 min, Meditate')
        .setValue(this.plugin.settings.defaultHabits.join(', '))
        .onChange(async (value) => {
          this.plugin.settings.defaultHabits = value.split(',').map(h => h.trim()).filter(h => h);
          await this.plugin.saveSettings();
        }));

    // --- Custom Questions ---
    containerEl.createEl('h2', { text: 'Custom Dig Deeper Questions' });
    containerEl.createEl('p', {
      text: 'Add your own reflective prompts (one per line). These will be mixed into the rotation.',
      cls: 'setting-item-description',
    });

    new Setting(containerEl)
      .addTextArea(text => {
        text
          .setPlaceholder('What does courage look like in your life?\nWhat are you holding onto that no longer serves you?')
          .setValue(this.plugin.settings.customQuestions.join('\n'))
          .onChange(async (value) => {
            this.plugin.settings.customQuestions = value.split('\n').map(q => q.trim()).filter(q => q);
            await this.plugin.saveSettings();
          });
        text.inputEl.rows = 8;
        text.inputEl.cols = 50;
      });
  }
}
