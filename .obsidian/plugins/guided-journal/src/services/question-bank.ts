import { DIG_DEEPER_QUESTIONS } from '../constants';
import { PluginData } from '../types';

// Fix #6: Use content hash instead of index for tracking used questions.
// This prevents corruption when custom questions are added/removed.
export class QuestionBank {
  private data: PluginData;
  private customQuestions: string[];

  constructor(data: PluginData, customQuestions: string[]) {
    this.data = data;
    this.customQuestions = customQuestions;
  }

  getAllQuestions(): string[] {
    return [...DIG_DEEPER_QUESTIONS, ...this.customQuestions];
  }

  private hashQuestion(q: string): string {
    // Simple hash from first 50 chars — stable across index changes
    let hash = 0;
    const str = q.substring(0, 50);
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return String(hash);
  }

  getQuestionForDate(dateStr: string): { id: number; question: string } {
    const qb = this.data.questionBank;

    // If we already assigned a question for this date, return it
    if (qb.lastQuestionDate === dateStr && qb.lastQuestionId >= 0) {
      const allQ = this.getAllQuestions();
      if (qb.lastQuestionId < allQ.length) {
        return { id: qb.lastQuestionId, question: allQ[qb.lastQuestionId] };
      }
    }

    const allQ = this.getAllQuestions();
    const totalCount = allQ.length;

    // Build set of used question hashes
    const usedHashes = new Set(qb.usedIds.map(String));

    // Find questions whose hash is not in usedHashes
    const available: number[] = [];
    for (let i = 0; i < totalCount; i++) {
      if (!usedHashes.has(this.hashQuestion(allQ[i]))) {
        available.push(i);
      }
    }

    // Reset cycle if all used
    if (available.length === 0) {
      qb.usedIds = [];
      qb.currentCycle++;
      for (let i = 0; i < totalCount; i++) {
        available.push(i);
      }
    }

    // Pick random from available
    const idx = available[Math.floor(Math.random() * available.length)];
    // Store hash as the "id" for tracking
    qb.usedIds.push(parseInt(this.hashQuestion(allQ[idx])));
    qb.lastQuestionDate = dateStr;
    qb.lastQuestionId = idx;

    return { id: idx, question: allQ[idx] };
  }
}
