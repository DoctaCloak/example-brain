import { MarkdownPostProcessorContext, App } from 'obsidian';
import { getFileFromPath, safeFrontmatterUpdate } from '../utils';

// Fix #19: Interactive schedule instead of raw markdown table
const DEFAULT_HOURS = [
  '6:00 AM', '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
  '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM',
  '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM',
];

export function registerScheduleProcessor(app: App) {
  return (source: string, el: HTMLElement, ctx: MarkdownPostProcessorContext) => {
    const file = getFileFromPath(app, ctx.sourcePath);
    let savedSchedule: Record<string, string> = {};
    if (file) {
      const cache = app.metadataCache.getFileCache(file);
      savedSchedule = cache?.frontmatter?.schedule || {};
    }

    const container = el.createDiv({ cls: 'gj-schedule' });

    DEFAULT_HOURS.forEach(hour => {
      const row = container.createDiv({ cls: 'gj-schedule-row' });
      row.createDiv({ cls: 'gj-schedule-time', text: hour });

      const input = row.createEl('input', {
        cls: 'gj-schedule-input',
        attr: {
          type: 'text',
          placeholder: '',
          value: savedSchedule[hour] || '',
        },
      });

      input.addEventListener('change', async () => {
        const f = getFileFromPath(app, ctx.sourcePath);
        if (!f) return;
        await safeFrontmatterUpdate(app, f, (fm) => {
          if (!fm.schedule) fm.schedule = {};
          fm.schedule[hour] = input.value;
        });
      });
    });
  };
}
