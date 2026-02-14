import { MarkdownPostProcessorContext, App } from 'obsidian';
import { getFileFromPath, safeFrontmatterUpdate } from '../utils';

// Fix #2: Source content determines which frontmatter key to use.
// Daily mood-tracker has empty source, weekly has "week_rating" in source.
export function registerMoodTrackerProcessor(app: App) {
  return (source: string, el: HTMLElement, ctx: MarkdownPostProcessorContext) => {
    const file = getFileFromPath(app, ctx.sourcePath);
    if (!file) return;

    // Determine key from source content
    const trimmed = source.trim();
    const frontmatterKey = trimmed === 'week_rating' ? 'week_rating' : 'mood';

    const cache = app.metadataCache.getFileCache(file);
    const currentMood: number = cache?.frontmatter?.[frontmatterKey] || 0;

    const container = el.createDiv({ cls: 'gj-mood-tracker' });
    const label = container.createDiv({ cls: 'gj-mood-label' });
    label.setText(currentMood > 0 ? `${currentMood} / 10` : 'Rate');

    const scale = container.createDiv({ cls: 'gj-mood-scale' });

    for (let i = 1; i <= 10; i++) {
      const dot = scale.createEl('button', {
        cls: `gj-mood-dot ${i <= currentMood ? 'gj-mood-active' : ''}`,
        text: String(i),
      });
      dot.addEventListener('click', async () => {
        const f = getFileFromPath(app, ctx.sourcePath);
        if (!f) return;

        await safeFrontmatterUpdate(app, f, (fm) => {
          fm[frontmatterKey] = i;
        });

        label.setText(`${i} / 10`);
        scale.querySelectorAll('.gj-mood-dot').forEach((d, idx) => {
          if (idx < i) {
            d.addClass('gj-mood-active');
          } else {
            d.removeClass('gj-mood-active');
          }
        });
      });
    }
  };
}
