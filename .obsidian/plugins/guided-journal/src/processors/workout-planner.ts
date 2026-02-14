import { MarkdownPostProcessorContext, App } from 'obsidian';
import { DAYS_OF_WEEK } from '../constants';
import { getFileFromPath, safeFrontmatterUpdate } from '../utils';

// Fix #15: Interactive workout planner component
export function registerWorkoutPlannerProcessor(app: App) {
  return (source: string, el: HTMLElement, ctx: MarkdownPostProcessorContext) => {
    const file = getFileFromPath(app, ctx.sourcePath);
    let savedWorkout: Record<string, { activity: string; nutrition: string }> = {};
    if (file) {
      const cache = app.metadataCache.getFileCache(file);
      savedWorkout = cache?.frontmatter?.workout || {};
    }

    const container = el.createDiv({ cls: 'gj-workout' });

    DAYS_OF_WEEK.forEach(day => {
      const dayKey = day.toLowerCase();
      const dayData = savedWorkout[dayKey] || { activity: '', nutrition: '' };

      const card = container.createDiv({ cls: 'gj-workout-card' });
      card.createDiv({ cls: 'gj-workout-day', text: day });

      const fields = card.createDiv({ cls: 'gj-workout-fields' });

      // Activity field
      const actRow = fields.createDiv({ cls: 'gj-workout-field-row' });
      actRow.createEl('label', { cls: 'gj-workout-label', text: 'Activity' });
      const actInput = actRow.createEl('input', {
        cls: 'gj-workout-input',
        attr: { type: 'text', placeholder: 'Activity...', value: dayData.activity || '' },
      });
      actInput.addEventListener('change', async () => {
        const f = getFileFromPath(app, ctx.sourcePath);
        if (!f) return;
        await safeFrontmatterUpdate(app, f, (fm) => {
          if (!fm.workout) fm.workout = {};
          if (!fm.workout[dayKey]) fm.workout[dayKey] = { activity: '', nutrition: '' };
          fm.workout[dayKey].activity = actInput.value;
        });
      });

      // Nutrition field
      const nutRow = fields.createDiv({ cls: 'gj-workout-field-row' });
      nutRow.createEl('label', { cls: 'gj-workout-label', text: 'Nutrition' });
      const nutInput = nutRow.createEl('input', {
        cls: 'gj-workout-input',
        attr: { type: 'text', placeholder: 'Nutrition...', value: dayData.nutrition || '' },
      });
      nutInput.addEventListener('change', async () => {
        const f = getFileFromPath(app, ctx.sourcePath);
        if (!f) return;
        await safeFrontmatterUpdate(app, f, (fm) => {
          if (!fm.workout) fm.workout = {};
          if (!fm.workout[dayKey]) fm.workout[dayKey] = { activity: '', nutrition: '' };
          fm.workout[dayKey].nutrition = nutInput.value;
        });
      });
    });
  };
}
