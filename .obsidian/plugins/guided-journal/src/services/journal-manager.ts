import { App, TFile, TFolder, normalizePath } from 'obsidian';
import { GuidedJournalSettings, PluginData } from '../types';
import { TemplateEngine } from './template-engine';
import { QuestionBank } from './question-bank';

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

  private async ensureFolder(path: string): Promise<void> {
    const normalized = normalizePath(path);
    const existing = this.app.vault.getAbstractFileByPath(normalized);
    if (!existing) {
      await this.app.vault.createFolder(normalized);
    }
  }

  private getToday(): Date {
    return new Date();
  }

  private formatDate(d: Date): string {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }

  private getDayOfWeek(d: Date): string {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[d.getDay()];
  }

  private getISOWeek(d: Date): string {
    const date = new Date(d.getTime());
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    const week1 = new Date(date.getFullYear(), 0, 4);
    const weekNum = 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
    return `${date.getFullYear()}-W${String(weekNum).padStart(2, '0')}`;
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

  async createDailyIfNeeded(): Promise<TFile | null> {
    if (!this.settings.autoCreateDaily) return null;

    const today = this.getToday();
    const dateStr = this.formatDate(today);
    const filePath = normalizePath(`${this.settings.dailyFolder}/${dateStr}.md`);

    const existing = this.app.vault.getAbstractFileByPath(filePath);
    if (existing) return existing as TFile;

    await this.ensureFolder(this.settings.dailyFolder);
    const content = this.templateEngine.generateDaily(dateStr, this.getDayOfWeek(today));
    return await this.app.vault.create(filePath, content);
  }

  async createWeeklyIfNeeded(): Promise<TFile | null> {
    if (!this.settings.autoCreateWeekly) return null;

    const today = this.getToday();
    // Only auto-create on week start day, but also create if it doesn't exist
    const weekStart = this.getWeekStart(today);
    const weekEnd = this.getWeekEnd(weekStart);
    const weekLabel = this.getISOWeek(today);
    const filePath = normalizePath(`${this.settings.weeklyFolder}/${weekLabel}.md`);

    const existing = this.app.vault.getAbstractFileByPath(filePath);
    if (existing) return existing as TFile;

    // Only auto-create on the week start day
    if (!this.isWeekStartDay(today)) return null;

    await this.ensureFolder(this.settings.weeklyFolder);
    const content = this.templateEngine.generateWeekly(
      weekLabel,
      this.formatDate(weekStart),
      this.formatDate(weekEnd),
    );
    return await this.app.vault.create(filePath, content);
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

    await this.ensureFolder(this.settings.monthlyFolder);
    const content = this.templateEngine.generateMonthly(monthLabel, year, month);
    return await this.app.vault.create(filePath, content);
  }

  async createDigDeeperIfNeeded(): Promise<TFile | null> {
    if (!this.settings.autoCreateDigDeeper) return null;

    const today = this.getToday();
    const dateStr = this.formatDate(today);
    const filePath = normalizePath(`${this.settings.digDeeperFolder}/${dateStr}-prompt.md`);

    const existing = this.app.vault.getAbstractFileByPath(filePath);
    if (existing) return existing as TFile;

    await this.ensureFolder(this.settings.digDeeperFolder);
    const { id, question } = this.questionBank.getQuestionForDate(dateStr);
    await this.saveData();
    const content = this.templateEngine.generateDigDeeper(dateStr, id, question);
    return await this.app.vault.create(filePath, content);
  }

  async runStartupRoutine(): Promise<TFile | null> {
    const daily = await this.createDailyIfNeeded();
    await this.createWeeklyIfNeeded();
    await this.createMonthlyIfNeeded();
    await this.createDigDeeperIfNeeded();
    return daily;
  }

  // Manual commands
  async createTodaysJournal(): Promise<TFile | null> {
    const today = this.getToday();
    const dateStr = this.formatDate(today);
    const filePath = normalizePath(`${this.settings.dailyFolder}/${dateStr}.md`);

    const existing = this.app.vault.getAbstractFileByPath(filePath);
    if (existing) return existing as TFile;

    await this.ensureFolder(this.settings.dailyFolder);
    const content = this.templateEngine.generateDaily(dateStr, this.getDayOfWeek(today));
    return await this.app.vault.create(filePath, content);
  }

  async createThisWeeksJournal(): Promise<TFile | null> {
    const today = this.getToday();
    const weekStart = this.getWeekStart(today);
    const weekEnd = this.getWeekEnd(weekStart);
    const weekLabel = this.getISOWeek(today);
    const filePath = normalizePath(`${this.settings.weeklyFolder}/${weekLabel}.md`);

    const existing = this.app.vault.getAbstractFileByPath(filePath);
    if (existing) return existing as TFile;

    await this.ensureFolder(this.settings.weeklyFolder);
    const content = this.templateEngine.generateWeekly(
      weekLabel,
      this.formatDate(weekStart),
      this.formatDate(weekEnd),
    );
    return await this.app.vault.create(filePath, content);
  }

  async createThisMonthsJournal(): Promise<TFile | null> {
    const today = this.getToday();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const monthLabel = `${year}-${String(month).padStart(2, '0')}`;
    const filePath = normalizePath(`${this.settings.monthlyFolder}/${monthLabel}.md`);

    const existing = this.app.vault.getAbstractFileByPath(filePath);
    if (existing) return existing as TFile;

    await this.ensureFolder(this.settings.monthlyFolder);
    const content = this.templateEngine.generateMonthly(monthLabel, year, month);
    return await this.app.vault.create(filePath, content);
  }

  async openTodaysDaily(): Promise<void> {
    const today = this.getToday();
    const dateStr = this.formatDate(today);
    const filePath = normalizePath(`${this.settings.dailyFolder}/${dateStr}.md`);

    let file = this.app.vault.getAbstractFileByPath(filePath);
    if (!file) {
      file = await this.createTodaysJournal();
    }
    if (file && file instanceof TFile) {
      await this.app.workspace.getLeaf().openFile(file);
    }
  }
}
