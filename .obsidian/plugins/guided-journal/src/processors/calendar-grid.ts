import { MarkdownPostProcessorContext, App, TFile } from 'obsidian';
import { GuidedJournalSettings } from '../types';
import { formatDate } from '../utils';

// Fix #3: Accept settings to use configured dailyFolder instead of hardcoded path
export function registerCalendarGridProcessor(app: App, settings: GuidedJournalSettings) {
  return (source: string, el: HTMLElement, ctx: MarkdownPostProcessorContext) => {
    const yearMonth = source.trim();
    const parts = yearMonth.split('-');
    if (parts.length !== 2) return;

    const year = parseInt(parts[0]);
    const month = parseInt(parts[1]);
    if (isNaN(year) || isNaN(month)) return;

    const container = el.createDiv({ cls: 'gj-calendar' });
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const header = container.createDiv({ cls: 'gj-calendar-header' });
    header.createEl('span', { text: `${monthNames[month - 1]} ${year}` });

    const grid = container.createDiv({ cls: 'gj-calendar-grid' });
    const dayHeaders = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    dayHeaders.forEach(d => {
      grid.createDiv({ cls: 'gj-calendar-day-header', text: d });
    });

    const firstDay = new Date(year, month - 1, 1);
    const lastDay = new Date(year, month, 0);
    const totalDays = lastDay.getDate();

    let startDow = firstDay.getDay();
    startDow = startDow === 0 ? 6 : startDow - 1;

    for (let i = 0; i < startDow; i++) {
      grid.createDiv({ cls: 'gj-calendar-cell gj-calendar-empty' });
    }

    const today = new Date();
    const todayStr = formatDate(today);

    for (let d = 1; d <= totalDays; d++) {
      const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const cell = grid.createDiv({
        cls: `gj-calendar-cell ${dateStr === todayStr ? 'gj-calendar-today' : ''}`,
        text: String(d),
      });

      // Use configured folder path instead of hardcoded (fix #3)
      const dailyPath = `${settings.dailyFolder}/${dateStr}.md`;
      const exists = app.vault.getAbstractFileByPath(dailyPath);
      if (exists) {
        cell.addClass('gj-calendar-has-note');
        cell.addEventListener('click', () => {
          const file = app.vault.getAbstractFileByPath(dailyPath);
          if (file && file instanceof TFile) {
            app.workspace.getLeaf().openFile(file);
          }
        });
      }
    }
  };
}
