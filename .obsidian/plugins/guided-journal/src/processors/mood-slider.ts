import { MarkdownPostProcessorContext, App } from 'obsidian';

export function registerMoodTrackerProcessor(app: App, frontmatterKey: string = 'mood') {
  return (source: string, el: HTMLElement, ctx: MarkdownPostProcessorContext) => {
    const file = app.workspace.getActiveFile();
    if (!file) return;

    const cache = app.metadataCache.getFileCache(file);
    let currentMood: number = 0;

    if (frontmatterKey === 'mood') {
      currentMood = cache?.frontmatter?.mood || 0;
    } else if (frontmatterKey === 'week_rating') {
      currentMood = cache?.frontmatter?.week_rating || 0;
    }

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
        const currentFile = app.workspace.getActiveFile();
        if (!currentFile) return;

        await app.fileManager.processFrontMatter(currentFile, (fm) => {
          if (frontmatterKey === 'mood') {
            fm.mood = i;
          } else {
            fm.week_rating = i;
          }
        });

        // Update UI
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
