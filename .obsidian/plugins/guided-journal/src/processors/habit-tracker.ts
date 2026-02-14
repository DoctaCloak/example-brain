import { MarkdownPostProcessorContext, App } from 'obsidian';
import { DAYS_SHORT } from '../constants';
import { getFileFromPath, safeFrontmatterUpdate } from '../utils';

export function registerHabitTrackerProcessor(app: App) {
  return (source: string, el: HTMLElement, ctx: MarkdownPostProcessorContext) => {
    const file = getFileFromPath(app, ctx.sourcePath);
    if (!file) return;

    const cache = app.metadataCache.getFileCache(file);
    const habits: Record<string, boolean[]> = cache?.frontmatter?.habits || {};

    const container = el.createDiv({ cls: 'gj-habit-tracker' });
    const table = container.createEl('table', { cls: 'gj-habit-table' });

    const thead = table.createEl('thead');
    const headerRow = thead.createEl('tr');
    headerRow.createEl('th', { text: 'Habit' });
    DAYS_SHORT.forEach(d => headerRow.createEl('th', { text: d }));

    const tbody = table.createEl('tbody');
    const habitNames = Object.keys(habits).filter(h => h.trim());

    if (habitNames.length === 0) {
      const row = tbody.createEl('tr');
      const cell = row.createEl('td', { attr: { colspan: '8' }, text: 'No habits configured. Add them in plugin settings.' });
      cell.style.textAlign = 'center';
      cell.style.opacity = '0.6';
      return;
    }

    habitNames.forEach(habitName => {
      const row = tbody.createEl('tr');
      row.createEl('td', { text: habitName, cls: 'gj-habit-name' });

      const days = habits[habitName] || [false, false, false, false, false, false, false];
      days.forEach((checked, dayIdx) => {
        const cell = row.createEl('td', { cls: 'gj-habit-cell' });
        const checkbox = cell.createEl('div', {
          cls: `gj-habit-check ${checked ? 'gj-habit-checked' : ''}`,
        });
        checkbox.addEventListener('click', async () => {
          const f = getFileFromPath(app, ctx.sourcePath);
          if (!f) return;

          await safeFrontmatterUpdate(app, f, (fm) => {
            if (!fm.habits) fm.habits = {};
            if (!fm.habits[habitName]) fm.habits[habitName] = [false, false, false, false, false, false, false];
            fm.habits[habitName][dayIdx] = !fm.habits[habitName][dayIdx];

            if (fm.habits[habitName][dayIdx]) {
              checkbox.addClass('gj-habit-checked');
            } else {
              checkbox.removeClass('gj-habit-checked');
            }
          });
        });
      });
    });
  };
}
