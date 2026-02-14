import { MarkdownPostProcessorContext, App } from 'obsidian';

export function registerSelfCareGridProcessor(app: App) {
  return (source: string, el: HTMLElement, ctx: MarkdownPostProcessorContext) => {
    const categories = source.trim().split(',').map(c => c.trim()).filter(c => c);
    if (categories.length === 0) return;

    const container = el.createDiv({ cls: 'gj-self-care' });

    categories.forEach(category => {
      const card = container.createDiv({ cls: 'gj-self-care-card' });
      const icon = getCategoryIcon(category);
      card.createDiv({ cls: 'gj-self-care-icon', text: icon });
      card.createDiv({ cls: 'gj-self-care-label', text: category });
      const input = card.createEl('input', {
        cls: 'gj-self-care-input',
        attr: { type: 'text', placeholder: `${category} activity...` },
      });
    });
  };
}

function getCategoryIcon(category: string): string {
  const icons: Record<string, string> = {
    'Physical': '💪',
    'Emotional': '❤️',
    'Professional': '💼',
    'Social': '👥',
    'Financial': '💰',
    'Spiritual': '🙏',
  };
  return icons[category] || '●';
}
