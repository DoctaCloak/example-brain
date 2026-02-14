import { MarkdownPostProcessorContext, App } from 'obsidian';
import { SELF_CARE_ICONS } from '../constants';
import { getFileFromPath, safeFrontmatterUpdate } from '../utils';

// Fix #1: Self-care grid now persists to frontmatter
// Fix #23: Uses SVG icons instead of emoji
export function registerSelfCareGridProcessor(app: App) {
  return (source: string, el: HTMLElement, ctx: MarkdownPostProcessorContext) => {
    const categories = source.trim().split(',').map(c => c.trim()).filter(c => c);
    if (categories.length === 0) return;

    const file = getFileFromPath(app, ctx.sourcePath);
    let savedData: Record<string, string> = {};
    if (file) {
      const cache = app.metadataCache.getFileCache(file);
      savedData = cache?.frontmatter?.self_care_plan || {};
    }

    const container = el.createDiv({ cls: 'gj-self-care' });

    categories.forEach(category => {
      const card = container.createDiv({ cls: 'gj-self-care-card' });

      const iconDiv = card.createDiv({ cls: 'gj-self-care-icon' });
      const svgIcon = SELF_CARE_ICONS[category];
      if (svgIcon) {
        iconDiv.innerHTML = svgIcon;
      } else {
        iconDiv.setText(category.charAt(0));
      }

      card.createDiv({ cls: 'gj-self-care-label', text: category });

      const input = card.createEl('input', {
        cls: 'gj-self-care-input',
        attr: {
          type: 'text',
          placeholder: `${category} activity...`,
          value: savedData[category] || '',
        },
      });

      // Fix #1: Persist on change
      input.addEventListener('change', async () => {
        const f = getFileFromPath(app, ctx.sourcePath);
        if (!f) return;
        await safeFrontmatterUpdate(app, f, (fm) => {
          if (!fm.self_care_plan) fm.self_care_plan = {};
          fm.self_care_plan[category] = input.value;
        });
      });
    });
  };
}
