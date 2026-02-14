import { App, TFile, normalizePath, Notice } from 'obsidian';
import { GuidedJournalSettings, PluginData } from '../types';
import { TemplateEngine } from './template-engine';
import { QuestionBank } from './question-bank';
import { ensureFolderRecursive, formatDate, getDayOfWeek, getISOWeek } from '../utils';

export class JournalManager {
  private app: App;
  private settings: GuidedJournalSettings;
  private templateEngine: TemplateEngine;
  private questionBank: QuestionBank;
  private pluginData: PluginData;
  private saveData: () => Promise<void>;

  constructor(
    app: App,
    settings: GuidedJournalSettings,
    pluginData: PluginData,
    saveData: () => Promise<void>,
  ) {
    this.app = app;
    this.settings = settings;
    this.templateEngine = new TemplateEngine(settings);
    this.questionBank = new QuestionBank(pluginData, settings.customQuestions);
    this.pluginData = pluginData;
    this.saveData = saveData;
  }

  private getToday(): Date {
    return new Date();
  }

  private getWeekStart(d: Date): Date {
    const date = new Date(d.getTime());
    const day = date.getDay();
    const targetDay = this.settings.weekStartDay === 'monday' ? 1 : 0;
    const diff = (day - targetDay + 7) % 7;
    date.setDate(date.getDate() - diff);
    return date;
  }

  private getWeekEnd(weekStart: Date): Date {
    const end = new Date(weekStart.getTime());
    end.setDate(end.getDate() + 6);
    return end;
  }

  private isWeekStartDay(d: Date): boolean {
    if (this.settings.weekStartDay === 'monday') return d.getDay() === 1;
    return d.getDay() === 0;
  }

  // Fix #8: Safe vault operation wrapper
  private async safeCreate(filePath: string, content: string): Promise<TFile | null> {
    try {
      return await this.app.vault.create(filePath, content);
    } catch (e) {
      console.error(`Guided Journal: Failed to create ${filePath}`, e);
      new Notice(`Guided Journal: Failed to create ${filePath}`);
      return null;
    }
  }

  async createDailyIfNeeded(): Promise<TFile | null> {
    if (!this.settings.autoCreateDaily) return null;

    const today = this.getToday();
    const dateStr = formatDate(today);
    const filePath = normalizePath(`${this.settings.dailyFolder}/${dateStr}.md`);

    const existing = this.app.vault.getAbstractFileByPath(filePath);
    if (existing) return existing as TFile;

    await ensureFolderRecursive(this.app, this.settings.dailyFolder);
    const content = this.templateEngine.generateDaily(dateStr, getDayOfWeek(today));
    return await this.safeCreate(filePath, content);
  }

  async createWeeklyIfNeeded(): Promise<TFile | null> {
    if (!this.settings.autoCreateWeekly) return null;

    const today = this.getToday();
    const weekStart = this.getWeekStart(today);
    const weekEnd = this.getWeekEnd(weekStart);
    const { label: weekLabel, weekNum } = getISOWeek(today);
    const filePath = normalizePath(`${this.settings.weeklyFolder}/${weekLabel}.md`);

    const existing = this.app.vault.getAbstractFileByPath(filePath);
    if (existing) return existing as TFile;

    if (!this.isWeekStartDay(today)) return null;

    await ensureFolderRecursive(this.app, this.settings.weeklyFolder);
    const content = this.templateEngine.generateWeekly(
      weekLabel,
      formatDate(weekStart),
      formatDate(weekEnd),
      weekNum,
    );
    return await this.safeCreate(filePath, content);
  }

  async createMonthlyIfNeeded(): Promise<TFile | null> {
    if (!this.settings.autoCreateMonthly) return null;

    const today = this.getToday();
    if (today.getDate() !== 1) return null;

    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const monthLabel = `${year}-${String(month).padStart(2, '0')}`;
    const filePath = normalizePath(`${this.settings.monthlyFolder}/${monthLabel}.md`);

    const existing = this.app.vault.getAbstractFileByPath(filePath);
    if (existing) return existing as TFile;

    await ensureFolderRecursive(this.app, this.settings.monthlyFolder);
    const content = this.templateEngine.generateMonthly(monthLabel, year, month);
    return await this.safeCreate(filePath, content);
  }

  async createDigDeeperIfNeeded(): Promise<TFile | null> {
    if (!this.settings.autoCreateDigDeeper) return null;

    const today = this.getToday();
    const dateStr = formatDate(today);
    const filePath = normalizePath(`${this.settings.digDeeperFolder}/${dateStr}-prompt.md`);

    const existing = this.app.vault.getAbstractFileByPath(filePath);
    if (existing) return existing as TFile;

    await ensureFolderRecursive(this.app, this.settings.digDeeperFolder);
    const { id, question } = this.questionBank.getQuestionForDate(dateStr);
    await this.saveData();
    const content = this.templateEngine.generateDigDeeper(dateStr, id, question);
    return await this.safeCreate(filePath, content);
  }

  async runStartupRoutine(): Promise<TFile | null> {
    const daily = await this.createDailyIfNeeded();
    await this.createWeeklyIfNeeded();
    await this.createMonthlyIfNeeded();
    await this.createDigDeeperIfNeeded();
    return daily;
  }

  async createTodaysJournal(): Promise<TFile | null> {
    const today = this.getToday();
    const dateStr = formatDate(today);
    const filePath = normalizePath(`${this.settings.dailyFolder}/${dateStr}.md`);

    const existing = this.app.vault.getAbstractFileByPath(filePath);
    if (existing) return existing as TFile;

    await ensureFolderRecursive(this.app, this.settings.dailyFolder);
    const content = this.templateEngine.generateDaily(dateStr, getDayOfWeek(today));
    return await this.safeCreate(filePath, content);
  }

  async createThisWeeksJournal(): Promise<TFile | null> {
    const today = this.getToday();
    const weekStart = this.getWeekStart(today);
    const weekEnd = this.getWeekEnd(weekStart);
    const { label: weekLabel, weekNum } = getISOWeek(today);
    const filePath = normalizePath(`${this.settings.weeklyFolder}/${weekLabel}.md`);

    const existing = this.app.vault.getAbstractFileByPath(filePath);
    if (existing) return existing as TFile;

    await ensureFolderRecursive(this.app, this.settings.weeklyFolder);
    const content = this.templateEngine.generateWeekly(
      weekLabel,
      formatDate(weekStart),
      formatDate(weekEnd),
      weekNum,
    );
    return await this.safeCreate(filePath, content);
  }

  async createThisMonthsJournal(): Promise<TFile | null> {
    const today = this.getToday();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const monthLabel = `${year}-${String(month).padStart(2, '0')}`;
    const filePath = normalizePath(`${this.settings.monthlyFolder}/${monthLabel}.md`);

    const existing = this.app.vault.getAbstractFileByPath(filePath);
    if (existing) return existing as TFile;

    await ensureFolderRecursive(this.app, this.settings.monthlyFolder);
    const content = this.templateEngine.generateMonthly(monthLabel, year, month);
    return await this.safeCreate(filePath, content);
  }

  async openTodaysDaily(): Promise<void> {
    const today = this.getToday();
    const dateStr = formatDate(today);
    const filePath = normalizePath(`${this.settings.dailyFolder}/${dateStr}.md`);

    let file = this.app.vault.getAbstractFileByPath(filePath);
    if (!file) {
      file = await this.createTodaysJournal();
    }
    if (file && file instanceof TFile) {
      await this.app.workspace.getLeaf().openFile(file);
    }
  }

  // Fix #12: Dig Deeper open command
  async openTodaysDigDeeper(): Promise<void> {
    const today = this.getToday();
    const dateStr = formatDate(today);
    const filePath = normalizePath(`${this.settings.digDeeperFolder}/${dateStr}-prompt.md`);

    let file = this.app.vault.getAbstractFileByPath(filePath);
    if (!file) {
      file = await this.createDigDeeperIfNeeded();
    }
    if (file && file instanceof TFile) {
      await this.app.workspace.getLeaf().openFile(file);
    }
  }

  // Fix #18: Navigate to adjacent daily notes
  async openDailyByOffset(offset: number): Promise<void> {
    const today = new Date();
    // Find the current note's date from the active file
    const activeFile = this.app.workspace.getActiveFile();
    let baseDate = today;

    if (activeFile) {
      // Try to extract date from filename like "2026-02-14.md"
      const match = activeFile.basename.match(/^(\d{4}-\d{2}-\d{2})/);
      if (match) {
        const parsed = new Date(match[1] + 'T12:00:00');
        if (!isNaN(parsed.getTime())) {
          baseDate = parsed;
        }
      }
    }

    const targetDate = new Date(baseDate);
    targetDate.setDate(targetDate.getDate() + offset);
    const dateStr = formatDate(targetDate);
    const filePath = normalizePath(`${this.settings.dailyFolder}/${dateStr}.md`);

    let file = this.app.vault.getAbstractFileByPath(filePath);
    if (!file) {
      // Create the note for that date
      await ensureFolderRecursive(this.app, this.settings.dailyFolder);
      const content = this.templateEngine.generateDaily(dateStr, getDayOfWeek(targetDate));
      file = await this.safeCreate(filePath, content);
    }
    if (file && file instanceof TFile) {
      await this.app.workspace.getLeaf().openFile(file);
    }
  }
}
