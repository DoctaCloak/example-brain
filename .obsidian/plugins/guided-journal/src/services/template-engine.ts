import { GuidedJournalSettings } from '../types';
import { EMOTIONS, SELF_CARE_CATEGORIES, QUOTES } from '../constants';
import { formatDate } from '../utils';

export class TemplateEngine {
  private settings: GuidedJournalSettings;

  constructor(settings: GuidedJournalSettings) {
    this.settings = settings;
  }

  // Fix #11: Rotating quotes based on date
  private getQuote(dateStr: string): { text: string; author: string } {
    // Use date string to deterministically pick a quote
    let hash = 0;
    for (let i = 0; i < dateStr.length; i++) {
      hash = ((hash << 5) - hash) + dateStr.charCodeAt(i);
      hash = hash & hash;
    }
    const idx = Math.abs(hash) % QUOTES.length;
    return QUOTES[idx];
  }

  private formatQuote(q: { text: string; author: string }): string {
    if (q.author) {
      return `> *"${q.text}"* — ${q.author}`;
    }
    return `> *"${q.text}"*`;
  }

  // Fix #17: Custom emotions extend defaults instead of replacing
  private getEmotions(): string[] {
    if (this.settings.customEmotions.length > 0) {
      return [...EMOTIONS, ...this.settings.customEmotions];
    }
    return EMOTIONS;
  }

  // Fix #13: Generate daily links for a week
  private generateDailyLinks(weekStartStr: string): string {
    const start = new Date(weekStartStr + 'T12:00:00');
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    let table = '| Day | Date | Focus |\n|-----|------|-------|\n';
    for (let i = 0; i < 7; i++) {
      const d = new Date(start);
      d.setDate(d.getDate() + i);
      const dateStr = formatDate(d);
      table += `| ${days[i]} | [[${dateStr}]] | |\n`;
    }
    return table;
  }

  generateDaily(date: string, dayOfWeek: string): string {
    const emotions = this.getEmotions();
    const categories = this.settings.selfCareCategories;
    const quote = this.getQuote(date);

    // Fix #18: Prev/next navigation links
    const d = new Date(date + 'T12:00:00');
    const prev = new Date(d);
    prev.setDate(prev.getDate() - 1);
    const next = new Date(d);
    next.setDate(next.getDate() + 1);
    const prevStr = formatDate(prev);
    const nextStr = formatDate(next);

    return `---
type: guided-journal-daily
date: "${date}"
day: "${dayOfWeek}"
emotions: []
mood: 0
priorities:
  - text: ""
    status: pending
  - text: ""
    status: pending
  - text: ""
    status: pending
time_tracker:
  tasks: 0
  distractions: 0
  self_care: 0
self_care_plan: {}
---

# ${dayOfWeek}, ${date}

[[${prevStr}|< Previous]] | [[${nextStr}|Next >]]

${this.formatQuote(quote)}

---

## How Do You Feel?

\`\`\`emotion-grid
${emotions.join(',')}
\`\`\`

---

## How Could You Achieve Balance Today?



---

## Priorities

\`\`\`priorities
1.
2.
3.
\`\`\`

---

## Tasks For Today

- [ ]
- [ ]
- [ ]
- [ ]
- [ ]

---

## Schedule

\`\`\`schedule
\`\`\`

---

## Self-Care Plan

\`\`\`self-care
${categories.join(',')}
\`\`\`

---

## Key Motivators

1.
2.
3.

---

## Mood Tracker

\`\`\`mood-tracker
\`\`\`

---

## Time Tracker

\`\`\`time-tracker
\`\`\`

---

## Intentions / Achievements



---

## Things You're Grateful For

1.
2.
3.

---

## Your Happy Hour



---

## Notes


`;
  }

  // Fix #10: Week X / 52 counter added via weekNum parameter
  generateWeekly(weekLabel: string, weekStart: string, weekEnd: string, weekNum: number): string {
    const habits = this.settings.defaultHabits;
    const habitRows = habits.length > 0
      ? habits.map(h => `  "${h}": [false, false, false, false, false, false, false]`).join('\n')
      : '  "": [false, false, false, false, false, false, false]';

    const quote = this.getQuote(weekLabel);

    return `---
type: guided-journal-weekly
week: "${weekLabel}"
week_start: "${weekStart}"
week_end: "${weekEnd}"
feeling_target: ""
focus_areas: []
week_rating: 0
habits:
${habitRows}
workout:
  monday: { activity: "", nutrition: "" }
  tuesday: { activity: "", nutrition: "" }
  wednesday: { activity: "", nutrition: "" }
  thursday: { activity: "", nutrition: "" }
  friday: { activity: "", nutrition: "" }
  saturday: { activity: "", nutrition: "" }
  sunday: { activity: "", nutrition: "" }
---

# Week of ${weekStart}

**Week ${weekNum} / 52**

${this.formatQuote(quote)}

---

## Weekly Preview: What Are You Focusing On This Week?



---

## Weekly Focus Areas

1.
2.
3.
4.
5.

---

## How Do You Want To Feel This Week?



---

## Daily Plan

${this.generateDailyLinks(weekStart)}

---

## Habits Tracker

\`\`\`habit-tracker
\`\`\`

---

## Weekly Workout Planner

\`\`\`workout-planner
\`\`\`

---

## Weekly Reflection

### Rate Your Week

\`\`\`mood-tracker
week_rating
\`\`\`

### Your Three Wins

1.
2.
3.

### Blockers



### What Did You Learn This Week?



### Review Tasks List: What Tasks Were Delayed?

1.
2.
3.
4.
5.

### Review Your Time Tracker

| Category | Hours |
|----------|-------|
| Tasks | |
| Distractions | |
| Self-care | |

### How Could You Improve Next Week?



### Notes


`;
  }

  // Fix #14: Per-goal structure for monthly
  generateMonthly(monthLabel: string, year: number, month: number): string {
    const quarter = Math.ceil(month / 3);
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const monthName = monthNames[month - 1];
    const quote = this.getQuote(monthLabel);

    return `---
type: guided-journal-monthly
month: "${monthLabel}"
year: ${year}
month_number: ${month}
quarter: ${quarter}
focus_areas: []
goals:
  - text: ""
    why: ""
    strategy: ""
    reward: ""
  - text: ""
    why: ""
    strategy: ""
    reward: ""
  - text: ""
    why: ""
    strategy: ""
    reward: ""
---

# ${monthName} ${year}

**Quarter:** Q${quarter} | **Month:** ${month} / 12

${this.formatQuote(quote)}

---

## Monthly Focus: Plan The Month Ahead

### What Areas Do You Want To Focus On?

\`\`\`focus-selector
\`\`\`

---

### Goal 1

**What is the goal?**


**Why is it important?**


**What will help you achieve it?**


**How will you reward yourself?**


---

### Goal 2

**What is the goal?**


**Why is it important?**


**What will help you achieve it?**


**How will you reward yourself?**


---

### Goal 3

**What is the goal?**


**Why is it important?**


**What will help you achieve it?**


**How will you reward yourself?**


---

## Monthly Calendar

\`\`\`monthly-calendar
${year}-${String(month).padStart(2, '0')}
\`\`\`

---

## Notes


`;
  }

  generateDigDeeper(date: string, questionId: number, question: string): string {
    const quote = this.getQuote(date + '-dig');

    return `---
type: guided-journal-prompt
date: "${date}"
question_id: ${questionId}
---

# Dig Deeper — ${date}

${this.formatQuote(quote)}

---

> **${question}**

---


`;
  }
}
