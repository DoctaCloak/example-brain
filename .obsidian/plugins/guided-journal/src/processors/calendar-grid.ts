import { MarkdownPostProcessorContext, App } from 'obsidian';

export function registerCalendarGridProcessor(app: App) {
  return (source: string, el: HTMLElement, ctx: MarkdownPostProcessorContext) => {
    const yearMonth = source.trim(); // e.g. "2026-02"
    const parts = yearMonth.split('-');
    if (parts.length !== 2) return;

    const year = parseInt(parts[0]);
    const month = parseInt(parts[1]);
    if (isNaN(year) || isNaN(month)) return;

    const container = el.createDiv({ cls: 'gj-calendar' });

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    // Header
    const header = container.createDiv({ cls: 'gj-calendar-header' });
    header.createEl('span', { text: `${monthNames[month - 1]} ${year}` });

    // Day headers
    const grid = container.createDiv({ cls: 'gj-calendar-grid' });
    const dayHeaders = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    dayHeaders.forEach(d => {
      grid.createDiv({ cls: 'gj-calendar-day-header', text: d });
    });

    // Calculate first day and total days
    const firstDay = new Date(year, month - 1, 1);
    const lastDay = new Date(year, month, 0);
    const totalDays = lastDay.getDate();

    // Day of week for first day (0=Sun, adjust for Mon start)
    let startDow = firstDay.getDay(); // 0=Sun
    startDow = startDow === 0 ? 6 : startDow - 1; // Convert to Mon=0

    // Empty cells before first day
    for (let i = 0; i < startDow; i++) {
      grid.createDiv({ cls: 'gj-calendar-cell gj-calendar-empty' });
    }

    // Day cells
    const today = new Date();
    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

    for (let d = 1; d <= totalDays; d++) {
      const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const cell = grid.createDiv({
        cls: `gj-calendar-cell ${dateStr === todayStr ? 'gj-calendar-today' : ''}`,
        text: String(d),
      });

      // Check if a daily note exists for this date
      const dailyPath = `Journal/Daily/${dateStr}.md`;
      const exists = app.vault.getAbstractFileByPath(dailyPath);
      if (exists) {
        cell.addClass('gj-calendar-has-note');
        cell.addEventListener('click', () => {
          const file = app.vault.getAbstractFileByPath(dailyPath);
          if (file) {
            app.workspace.getLeaf().openFile(file as any);
          }
        });
      }
    }
  };
}
