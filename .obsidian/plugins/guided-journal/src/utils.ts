import { App, TFile, normalizePath, Notice } from 'obsidian';

/**
 * Get a TFile from a source path string (from ctx.sourcePath).
 * More reliable than getActiveFile() in multi-pane scenarios.
 */
export function getFileFromPath(app: App, sourcePath: string): TFile | null {
  const file = app.vault.getAbstractFileByPath(sourcePath);
  if (file instanceof TFile) return file;
  return null;
}

/**
 * Safe wrapper around processFrontMatter with error handling.
 */
export async function safeFrontmatterUpdate(
  app: App,
  file: TFile,
  updater: (fm: Record<string, any>) => void,
): Promise<void> {
  try {
    await app.fileManager.processFrontMatter(file, updater);
  } catch (e) {
    console.error('Guided Journal: Failed to update frontmatter', e);
    new Notice('Guided Journal: Failed to save changes');
  }
}

/**
 * Recursively create nested folders.
 */
export async function ensureFolderRecursive(app: App, path: string): Promise<void> {
  const normalized = normalizePath(path);
  if (app.vault.getAbstractFileByPath(normalized)) return;

  const parts = normalized.split('/');
  let current = '';
  for (const part of parts) {
    current = current ? `${current}/${part}` : part;
    const existing = app.vault.getAbstractFileByPath(current);
    if (!existing) {
      try {
        await app.vault.createFolder(current);
      } catch (e) {
        // Folder might have been created by another async operation
        if (!app.vault.getAbstractFileByPath(current)) {
          throw e;
        }
      }
    }
  }
}

/**
 * Format a date as YYYY-MM-DD.
 */
export function formatDate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

/**
 * Get day of week name.
 */
export function getDayOfWeek(d: Date): string {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[d.getDay()];
}

/**
 * Get ISO week string like "2026-W07".
 */
export function getISOWeek(d: Date): { label: string; weekNum: number } {
  const date = new Date(d.getTime());
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
  const week1 = new Date(date.getFullYear(), 0, 4);
  const weekNum = 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
  return {
    label: `${date.getFullYear()}-W${String(weekNum).padStart(2, '0')}`,
    weekNum,
  };
}
