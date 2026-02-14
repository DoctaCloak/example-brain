import { MarkdownPostProcessorContext, App } from 'obsidian';
import { getFileFromPath, safeFrontmatterUpdate } from '../utils';

export function registerEmotionGridProcessor(app: App) {
  return (source: string, el: HTMLElement, ctx: MarkdownPostProcessorContext) => {
    const emotions = source.trim().split(',').map(e => e.trim()).filter(e => e);
    if (emotions.length === 0) return;

    const file = getFileFromPath(app, ctx.sourcePath);
    let selected: string[] = [];
    if (file) {
      const cache = app.metadataCache.getFileCache(file);
      if (cache?.frontmatter?.emotions) {
        selected = cache.frontmatter.emotions;
      }
    }

    const container = el.createDiv({ cls: 'gj-emotion-grid' });

    emotions.forEach(emotion => {
      const chip = container.createEl('button', {
        cls: 'gj-emotion-chip',
        text: emotion,
      });
      if (selected.includes(emotion)) {
        chip.addClass('gj-emotion-selected');
      }
      chip.addEventListener('click', async () => {
        const f = getFileFromPath(app, ctx.sourcePath);
        if (!f) return;

        await safeFrontmatterUpdate(app, f, (fm) => {
          if (!fm.emotions) fm.emotions = [];
          const idx = fm.emotions.indexOf(emotion);
          if (idx >= 0) {
            fm.emotions.splice(idx, 1);
            chip.removeClass('gj-emotion-selected');
          } else {
            fm.emotions.push(emotion);
            chip.addClass('gj-emotion-selected');
          }
        });
      });
    });
  };
}
