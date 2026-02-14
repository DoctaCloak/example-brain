import { MarkdownPostProcessorContext, App } from 'obsidian';
import { getFileFromPath, safeFrontmatterUpdate } from '../utils';

const TIME_LEVELS = [0, 0.5, 1, 2, 3, 4, 5, 6, 7, 8];
const TIME_LABELS = ['0', '0.5', '1', '2', '3', '4', '5', '6', '7', '8+'];

export function registerTimeTrackerProcessor(app: App) {
  return (source: string, el: HTMLElement, ctx: MarkdownPostProcessorContext) => {
    const file = getFileFromPath(app, ctx.sourcePath);
    if (!file) return;

    const cache = app.metadataCache.getFileCache(file);
    const tracker = cache?.frontmatter?.time_tracker || { tasks: 0, distractions: 0, self_care: 0 };

    const container = el.createDiv({ cls: 'gj-time-tracker' });

    const categories: { label: string; fmKey: string }[] = [
      { label: 'Tasks', fmKey: 'tasks' },
      { label: 'Distractions', fmKey: 'distractions' },
      { label: 'Self-Care', fmKey: 'self_care' },
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
          const f = getFileFromPath(app, ctx.sourcePath);
          if (!f) return;

          await safeFrontmatterUpdate(app, f, (fm) => {
            if (!fm.time_tracker) fm.time_tracker = { tasks: 0, distractions: 0, self_care: 0 };
            fm.time_tracker[cat.fmKey] = level;
          });

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
