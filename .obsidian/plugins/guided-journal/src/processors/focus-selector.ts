import { MarkdownPostProcessorContext, App } from 'obsidian';
import { SELF_CARE_CATEGORIES } from '../constants';

export function registerFocusSelectorProcessor(app: App) {
  return (source: string, el: HTMLElement, ctx: MarkdownPostProcessorContext) => {
    const file = app.workspace.getActiveFile();
    if (!file) return;

    const cache = app.metadataCache.getFileCache(file);
    const selectedAreas: string[] = cache?.frontmatter?.focus_areas || [];

    const container = el.createDiv({ cls: 'gj-focus-selector' });

    SELF_CARE_CATEGORIES.forEach(area => {
      const chip = container.createEl('button', {
        cls: `gj-focus-chip ${selectedAreas.includes(area) ? 'gj-focus-selected' : ''}`,
        text: area,
      });

      chip.addEventListener('click', async () => {
        const currentFile = app.workspace.getActiveFile();
        if (!currentFile) return;

        await app.fileManager.processFrontMatter(currentFile, (fm) => {
          if (!fm.focus_areas) fm.focus_areas = [];
          const idx = fm.focus_areas.indexOf(area);
          if (idx >= 0) {
            fm.focus_areas.splice(idx, 1);
            chip.removeClass('gj-focus-selected');
          } else {
            fm.focus_areas.push(area);
            chip.addClass('gj-focus-selected');
          }
        });
      });
    });
  };
}
