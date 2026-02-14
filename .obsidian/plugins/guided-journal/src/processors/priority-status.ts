import { MarkdownPostProcessorContext, App } from 'obsidian';

const STATUSES = ['pending', 'done', 'delay', 'delete'] as const;
const STATUS_LABELS: Record<string, string> = {
  pending: '○',
  done: '✓ Done',
  delay: '◷ Delay',
  delete: '✕ Delete',
};

export function registerPriorityProcessor(app: App) {
  return (source: string, el: HTMLElement, ctx: MarkdownPostProcessorContext) => {
    const file = app.workspace.getActiveFile();
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

      // Number
      row.createDiv({ cls: 'gj-priority-num', text: `${idx + 1}.` });

      // Text input
      const input = row.createEl('input', {
        cls: 'gj-priority-input',
        attr: { type: 'text', placeholder: 'Enter priority...', value: priority.text || '' },
      });
      input.addEventListener('change', async () => {
        const currentFile = app.workspace.getActiveFile();
        if (!currentFile) return;
        await app.fileManager.processFrontMatter(currentFile, (fm) => {
          if (!fm.priorities) fm.priorities = [];
          if (!fm.priorities[idx]) fm.priorities[idx] = { text: '', status: 'pending' };
          fm.priorities[idx].text = input.value;
        });
      });

      // Status buttons
      const statusGroup = row.createDiv({ cls: 'gj-priority-status-group' });
      STATUSES.forEach(status => {
        if (status === 'pending') return; // Don't show pending as a button
        const btn = statusGroup.createEl('button', {
          cls: `gj-priority-btn gj-priority-${status} ${priority.status === status ? 'gj-priority-active' : ''}`,
          text: STATUS_LABELS[status],
        });
        btn.addEventListener('click', async () => {
          const currentFile = app.workspace.getActiveFile();
          if (!currentFile) return;

          const newStatus = priority.status === status ? 'pending' : status;
          await app.fileManager.processFrontMatter(currentFile, (fm) => {
            if (!fm.priorities) fm.priorities = [];
            if (!fm.priorities[idx]) fm.priorities[idx] = { text: '', status: 'pending' };
            fm.priorities[idx].status = newStatus;
          });

          // Update UI
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
