import { DIG_DEEPER_QUESTIONS } from '../constants';
import { PluginData } from '../types';

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

  getQuestionForDate(dateStr: string): { id: number; question: string } {
    const qb = this.data.questionBank;

    // If we already assigned a question for this date, return it
    if (qb.lastQuestionDate === dateStr && qb.lastQuestionId >= 0) {
      const allQ = this.getAllQuestions();
      const q = allQ[qb.lastQuestionId] || allQ[0];
      return { id: qb.lastQuestionId, question: q };
    }

    const allQ = this.getAllQuestions();
    const totalCount = allQ.length;

    // Find unused question IDs
    const usedSet = new Set(qb.usedIds);
    const available: number[] = [];
    for (let i = 0; i < totalCount; i++) {
      if (!usedSet.has(i)) {
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
    qb.usedIds.push(idx);
    qb.lastQuestionDate = dateStr;
    qb.lastQuestionId = idx;

    return { id: idx, question: allQ[idx] };
  }
}
