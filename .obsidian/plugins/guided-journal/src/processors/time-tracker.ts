import { MarkdownPostProcessorContext, App } from 'obsidian';

const TIME_LEVELS = [0, 0.5, 1, 2, 3, 4, 5, 6, 7, 8];
const TIME_LABELS = ['0', '0.5', '1', '2', '3', '4', '5', '6', '7', '8+'];

export function registerTimeTrackerProcessor(app: App) {
  return (source: string, el: HTMLElement, ctx: MarkdownPostProcessorContext) => {
    const file = app.workspace.getActiveFile();
    if (!file) return;

    const cache = app.metadataCache.getFileCache(file);
    const tracker = cache?.frontmatter?.time_tracker || { tasks: 0, distractions: 0, self_care: 0 };

    const container = el.createDiv({ cls: 'gj-time-tracker' });

    const categories: { key: string; label: string; fmKey: string }[] = [
      { key: 'tasks', label: 'Tasks', fmKey: 'tasks' },
      { key: 'distractions', label: 'Distractions', fmKey: 'distractions' },
      { key: 'self_care', label: 'Self-Care', fmKey: 'self_care' },
    ];

    categories.forEach(cat => {
      const row = container.createDiv({ cls: 'gj-time-row' });
      row.createDiv({ cls: 'gj-time-label', text: cat.label });

      const bar = row.createDiv({ cls: 'gj-time-bar' });
      const currentVal = tracker[cat.fmKey] || 0;

      TIME_LEVELS.forEach((level, idx) => {
        const segment = bar.createEl('button', {
          cls: `gj-time-segment ${level <= currentVal && currentVal > 0 ? 'gj-time-filled' : ''}`,
          text: TIME_LABELS[idx],
        });
        segment.addEventListener('click', async () => {
          const currentFile = app.workspace.getActiveFile();
          if (!currentFile) return;

          await app.fileManager.processFrontMatter(currentFile, (fm) => {
            if (!fm.time_tracker) fm.time_tracker = { tasks: 0, distractions: 0, self_care: 0 };
            fm.time_tracker[cat.fmKey] = level;
          });

          // Update UI
          bar.querySelectorAll('.gj-time-segment').forEach((seg, sIdx) => {
            if (TIME_LEVELS[sIdx] <= level && level > 0) {
              seg.addClass('gj-time-filled');
            } else {
              seg.removeClass('gj-time-filled');
            }
          });
        });
      });
    });
  };
}
