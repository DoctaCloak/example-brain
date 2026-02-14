import { MarkdownPostProcessorContext, App } from 'obsidian';
import { getFileFromPath, safeFrontmatterUpdate } from '../utils';

const STATUSES = ['pending', 'done', 'delay', 'delete'] as const;
const STATUS_LABELS: Record<string, string> = {
  pending: '',
  done: 'Done',
  delay: 'Delay',
  delete: 'Delete',
};

export function registerPriorityProcessor(app: App) {
  return (source: string, el: HTMLElement, ctx: MarkdownPostProcessorContext) => {
    const file = getFileFromPath(app, ctx.sourcePath);
    if (!file) return;

    const cache = app.metadataCache.getFileCache(file);
    const priorities = cache?.frontmatter?.priorities || [
      { text: '', status: 'pending' },
      { text: '', status: 'pending' },
      { text: '', status: 'pending' },
    ];

    const container = el.createDiv({ cls: 'gj-priorities' });

    priorities.forEach((priority: { text: string; status: string }, idx: number) => {
      const row = container.createDiv({ cls: 'gj-priority-row' });
      row.createDiv({ cls: 'gj-priority-num', text: `${idx + 1}.` });

      const input = row.createEl('input', {
        cls: 'gj-priority-input',
        attr: { type: 'text', placeholder: 'Enter priority...', value: priority.text || '' },
      });
      input.addEventListener('change', async () => {
        const f = getFileFromPath(app, ctx.sourcePath);
        if (!f) return;
        await safeFrontmatterUpdate(app, f, (fm) => {
          if (!fm.priorities) fm.priorities = [];
          if (!fm.priorities[idx]) fm.priorities[idx] = { text: '', status: 'pending' };
          fm.priorities[idx].text = input.value;
        });
      });

      const statusGroup = row.createDiv({ cls: 'gj-priority-status-group' });
      STATUSES.forEach(status => {
        if (status === 'pending') return;
        const btn = statusGroup.createEl('button', {
          cls: `gj-priority-btn gj-priority-${status} ${priority.status === status ? 'gj-priority-active' : ''}`,
          text: STATUS_LABELS[status],
        });
        btn.addEventListener('click', async () => {
          const f = getFileFromPath(app, ctx.sourcePath);
          if (!f) return;

          const newStatus = priority.status === status ? 'pending' : status;
          await safeFrontmatterUpdate(app, f, (fm) => {
            if (!fm.priorities) fm.priorities = [];
            if (!fm.priorities[idx]) fm.priorities[idx] = { text: '', status: 'pending' };
            fm.priorities[idx].status = newStatus;
          });

          statusGroup.querySelectorAll('.gj-priority-btn').forEach(b => b.removeClass('gj-priority-active'));
          if (newStatus !== 'pending') {
            btn.addClass('gj-priority-active');
          }
          priority.status = newStatus;
        });
      });
    });
  };
}
