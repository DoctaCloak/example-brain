import { GuidedJournalSettings } from '../types';
import { EMOTIONS, SELF_CARE_CATEGORIES, DAYS_OF_WEEK, DAYS_SHORT } from '../constants';

export class TemplateEngine {
  private settings: GuidedJournalSettings;

  constructor(settings: GuidedJournalSettings) {
    this.settings = settings;
  }

  generateDaily(date: string, dayOfWeek: string): string {
    const emotions = this.settings.customEmotions.length > 0
      ? this.settings.customEmotions
      : EMOTIONS;
    const categories = this.settings.selfCareCategories;

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
---

# ${dayOfWeek}, ${date}

> *"Let us make our future now, and let us make our dreams tomorrow's reality."*

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

| Time | Activity |
|------|----------|
| 6:00 | |
| 7:00 | |
| 8:00 | |
| 9:00 | |
| 10:00 | |
| 11:00 | |
| 12:00 | |
| 1:00 | |
| 2:00 | |
| 3:00 | |
| 4:00 | |
| 5:00 | |
| 6:00 | |
| 7:00 | |
| 8:00 | |
| 9:00 | |

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

  generateWeekly(weekLabel: string, weekStart: string, weekEnd: string): string {
    const habits = this.settings.defaultHabits;
    const habitRows = habits.length > 0
      ? habits.map(h => `  "${h}": [false, false, false, false, false, false, false]`).join('\n')
      : '  "": [false, false, false, false, false, false, false]';

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

> *"Celebrate even small victories."* — H. Jackson Brown Jr.

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

| Day | Focus |
|-----|-------|
| Monday | |
| Tuesday | |
| Wednesday | |
| Thursday | |
| Friday | |
| Saturday | |
| Sunday | |

---

## Habits Tracker

\`\`\`habit-tracker
\`\`\`

---

## Weekly Workout Planner

### Monday
- **Activity:**
- **Nutrition:**

### Tuesday
- **Activity:**
- **Nutrition:**

### Wednesday
- **Activity:**
- **Nutrition:**

### Thursday
- **Activity:**
- **Nutrition:**

### Friday
- **Activity:**
- **Nutrition:**

### Saturday
- **Activity:**
- **Nutrition:**

### Sunday
- **Activity:**
- **Nutrition:**

---

## Weekly Reflection

### Rate Your Week

\`\`\`mood-tracker
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

  generateMonthly(monthLabel: string, year: number, month: number): string {
    const quarter = Math.ceil(month / 3);
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const monthName = monthNames[month - 1];

    return `---
type: guided-journal-monthly
month: "${monthLabel}"
year: ${year}
month_number: ${month}
quarter: ${quarter}
focus_areas: []
goals:
  - ""
  - ""
  - ""
---

# ${monthName} ${year}

> *"Life is long if you know how to use it."* — Seneca

**Quarter:** Q${quarter} | **Month:** ${month} / 12

---

## Monthly Focus: Plan The Month Ahead

### What Areas Do You Want To Focus On?

\`\`\`focus-selector
\`\`\`

---

### What Three Goals/Tasks Are You Working Towards This Month?

1.
2.
3.

---

### Why Are These Goals/Tasks Important?



---

### What Will Help You Achieve These Goals/Tasks?



---

### How Will You Reward Yourself?



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
    return `---
type: guided-journal-prompt
date: "${date}"
question_id: ${questionId}
---

# Dig Deeper — ${date}

> **${question}**

---


`;
  }
}
