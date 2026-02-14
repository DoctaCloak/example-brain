var x=Object.defineProperty;var V=Object.getOwnPropertyDescriptor;var U=Object.getOwnPropertyNames;var K=Object.prototype.hasOwnProperty;var z=(s,t)=>{for(var e in t)x(s,e,{get:t[e],enumerable:!0})},X=(s,t,e,o)=>{if(t&&typeof t=="object"||typeof t=="function")for(let a of U(t))!K.call(s,a)&&a!==e&&x(s,a,{get:()=>t[a],enumerable:!(o=V(t,a))||o.enumerable});return s};var Z=s=>X(x({},"__esModule",{value:!0}),s);var ie={};z(ie,{default:()=>C});module.exports=Z(ie);var q=require("obsidian");var M={dailyFolder:"Journal/Daily",weeklyFolder:"Journal/Weekly",monthlyFolder:"Journal/Monthly",digDeeperFolder:"Journal/Dig-Deeper",autoCreateDaily:!0,autoCreateWeekly:!0,autoCreateMonthly:!0,autoCreateDigDeeper:!0,openDailyOnStartup:!0,weekStartDay:"monday",customEmotions:[],defaultHabits:[],selfCareCategories:["Physical","Emotional","Professional","Social","Financial","Spiritual"],customQuestions:[],dateFormat:"YYYY-MM-DD",journalTheme:"paper"},A={questionBank:{usedIds:[],currentCycle:1,lastQuestionDate:"",lastQuestionId:-1}};var m=require("obsidian"),T=class extends m.PluginSettingTab{constructor(t,e){super(t,e),this.plugin=e}display(){let{containerEl:t}=this;t.empty(),t.createEl("h1",{text:"Guided Journal"}),t.createEl("h2",{text:"Folders"}),new m.Setting(t).setName("Daily notes folder").setDesc("Where daily journal notes are stored").addText(e=>e.setPlaceholder("Journal/Daily").setValue(this.plugin.settings.dailyFolder).onChange(async o=>{this.plugin.settings.dailyFolder=o,await this.plugin.saveSettings()})),new m.Setting(t).setName("Weekly notes folder").addText(e=>e.setPlaceholder("Journal/Weekly").setValue(this.plugin.settings.weeklyFolder).onChange(async o=>{this.plugin.settings.weeklyFolder=o,await this.plugin.saveSettings()})),new m.Setting(t).setName("Monthly notes folder").addText(e=>e.setPlaceholder("Journal/Monthly").setValue(this.plugin.settings.monthlyFolder).onChange(async o=>{this.plugin.settings.monthlyFolder=o,await this.plugin.saveSettings()})),new m.Setting(t).setName("Dig Deeper folder").addText(e=>e.setPlaceholder("Journal/Dig-Deeper").setValue(this.plugin.settings.digDeeperFolder).onChange(async o=>{this.plugin.settings.digDeeperFolder=o,await this.plugin.saveSettings()})),t.createEl("h2",{text:"Auto-creation"}),new m.Setting(t).setName("Auto-create daily note").setDesc("Create a daily journal note when you open Obsidian").addToggle(e=>e.setValue(this.plugin.settings.autoCreateDaily).onChange(async o=>{this.plugin.settings.autoCreateDaily=o,await this.plugin.saveSettings()})),new m.Setting(t).setName("Auto-create weekly note").setDesc("Create a weekly note on the first day of each week").addToggle(e=>e.setValue(this.plugin.settings.autoCreateWeekly).onChange(async o=>{this.plugin.settings.autoCreateWeekly=o,await this.plugin.saveSettings()})),new m.Setting(t).setName("Auto-create monthly note").setDesc("Create a monthly note on the 1st of each month").addToggle(e=>e.setValue(this.plugin.settings.autoCreateMonthly).onChange(async o=>{this.plugin.settings.autoCreateMonthly=o,await this.plugin.saveSettings()})),new m.Setting(t).setName("Auto-create Dig Deeper prompt").setDesc("Create a daily reflective prompt").addToggle(e=>e.setValue(this.plugin.settings.autoCreateDigDeeper).onChange(async o=>{this.plugin.settings.autoCreateDigDeeper=o,await this.plugin.saveSettings()})),new m.Setting(t).setName("Open daily note on startup").setDesc("Automatically open today's daily note when Obsidian starts").addToggle(e=>e.setValue(this.plugin.settings.openDailyOnStartup).onChange(async o=>{this.plugin.settings.openDailyOnStartup=o,await this.plugin.saveSettings()})),t.createEl("h2",{text:"Preferences"}),new m.Setting(t).setName("Week starts on").addDropdown(e=>e.addOption("monday","Monday").addOption("sunday","Sunday").setValue(this.plugin.settings.weekStartDay).onChange(async o=>{this.plugin.settings.weekStartDay=o,await this.plugin.saveSettings()})),new m.Setting(t).setName("Theme").addDropdown(e=>e.addOption("paper","Paper").addOption("minimal","Minimal").addOption("dark","Dark").setValue(this.plugin.settings.journalTheme).onChange(async o=>{this.plugin.settings.journalTheme=o,await this.plugin.saveSettings()})),t.createEl("h2",{text:"Default Habits"}),t.createEl("p",{text:"These habits will be pre-filled in each new weekly note.",cls:"setting-item-description"}),new m.Setting(t).setName("Habits (comma-separated)").addTextArea(e=>e.setPlaceholder("Morning run, Read 30 min, Meditate").setValue(this.plugin.settings.defaultHabits.join(", ")).onChange(async o=>{this.plugin.settings.defaultHabits=o.split(",").map(a=>a.trim()).filter(a=>a),await this.plugin.saveSettings()})),t.createEl("h2",{text:"Custom Dig Deeper Questions"}),t.createEl("p",{text:"Add your own reflective prompts (one per line). These will be mixed into the rotation.",cls:"setting-item-description"}),new m.Setting(t).addTextArea(e=>{e.setPlaceholder(`What does courage look like in your life?
What are you holding onto that no longer serves you?`).setValue(this.plugin.settings.customQuestions.join(`
`)).onChange(async o=>{this.plugin.settings.customQuestions=o.split(`
`).map(a=>a.trim()).filter(a=>a),await this.plugin.saveSettings()}),e.inputEl.rows=8,e.inputEl.cols=50})}};var v=require("obsidian");var $=["positive","happy","hopeful","stressed","nervous","anxious","determined","insecure","confused","proud","safe","bored","tired","hurt","angry","excited","irritated","disappointed","content","negative","annoyed","inspired","grateful","frustrated","calm","strong","neutral","regretful","lonely","low","confident","restless","relieved","scared","guilty","sad","energetic","overwhelmed","focused"],H=["Physical","Emotional","Professional","Social","Financial","Spiritual"];var I=["M","T","W","T","F","S","S"],_=["Imagine a movie about your life. Who would play you? What would the movie be about?","What is one of your long-term goals?","Are you living the life you imagined for yourself? Why or why not?","What does your ideal day look like from start to finish?","If you could change one thing about yourself, what would it be and why?","What are three words that best describe who you are right now?","What mask do you wear most often, and what are you hiding behind it?","When do you feel most like yourself?","What would you do differently if nobody was watching?","What story do you keep telling yourself that might not be true?","Who has had the biggest impact on your life and why?","What does love mean to you?","Describe a relationship that changed you. How did it change you?","What do you need most from the people in your life?","Who do you need to forgive, and what is stopping you?","What boundaries do you need to set or reinforce?","How do you show love to the people who matter most?","What conversation have you been avoiding? Why?","Who would you call if you had one phone call left?","What kind of friend are you? What kind of friend do you want to be?","What is one thing you need to let go of?","What lesson took you the longest to learn?","What are you most afraid of? How does that fear hold you back?","What would you tell your younger self?","Describe a moment that broke you. How did you rebuild?","What does healing look like for you?","What pattern in your life do you want to break?","What is one thing you have been avoiding that you know you need to face?","When was the last time you felt truly proud of yourself?","What does growth mean to you right now?","What gives your life meaning?","If money were no object, how would you spend your time?","What legacy do you want to leave behind?","What are you most passionate about?","What impact do you want to have on the world?","What does success look like to you \u2014 not to society, but to you?","What is one thing you would regret not doing?","If today were your last day, would you be satisfied with how you lived?","What do you want to be remembered for?","What is the most important thing in your life right now?","What emotion do you avoid feeling the most? Why?","When was the last time you cried? What triggered it?","What brings you genuine peace?","What makes you feel alive?","How do you handle anger? Is it healthy?","What does happiness mean to you?","When do you feel the most vulnerable?","What is weighing on your heart right now?","Describe a moment of pure joy you experienced recently.","What emotion do you wish you could feel more often?","What are five things you are grateful for today?","What is one small thing that brought you joy this week?","Who has shown you kindness recently? How did it make you feel?","What part of your daily routine are you most thankful for?","What is a challenge you are grateful for? What did it teach you?","What about your body are you grateful for?","What is one thing in nature that fills you with awe?","Name a skill or talent you have that you appreciate.","What is a memory you are deeply thankful for?","What is something you take for granted that others wish they had?","Where do you see yourself in five years?","What dream have you put on hold? What would it take to revive it?","If you could master any skill overnight, what would it be?","What does your dream home look like?","Describe your perfect career or vocation.","What country or place do you dream of visiting? Why?","What would you create if you knew you could not fail?","What is one goal that excites and terrifies you at the same time?","If you had unlimited resources, what problem would you solve?","What is one new thing you want to try this year?","What habit do you want to build? What is your first step?","What habit do you need to break? What triggers it?","How do you spend the first hour of your day? Is it intentional?","What does your ideal morning routine look like?","What do you do when you feel unmotivated?","How do you recharge when you are running on empty?","What distractions steal the most time from you?","What is one thing you can do today to invest in your future self?","How do you hold yourself accountable?","What would change if you were 10% more disciplined?","What is the hardest thing you have ever been through?","How do you respond to failure? How would you like to respond?","What obstacle are you currently facing? What is one step forward?","When life gets hard, what keeps you going?","Describe a time when you surprised yourself with your own strength.","What did your last setback teach you?","How do you cope with uncertainty?","What is one thing you overcame that you never thought you could?","What does resilience mean to you?","Who or what do you lean on during tough times?","What are your top three core values?","What do you believe about yourself that empowers you?","What belief have you outgrown?","What does integrity mean to you? Do you live by it?","What would you stand up for, even if you stood alone?","How have your values changed over the past five years?","What is one principle you refuse to compromise on?","Do your daily actions align with your deepest values?","What does faith mean to you?","What truth are you avoiding?","What are you feeling right now, in this exact moment?","When was the last time you were fully present? What were you doing?","What does stillness feel like to you?","How often do you check in with yourself? What do you notice?","What would your life look like if you worried less?","What sounds, smells, or sights bring you comfort?","How do you quiet your mind when it is racing?","What does it mean to truly listen \u2014 to yourself and to others?","Describe your happy place in detail.","If you could freeze one moment in time, which would it be?","How do you feel in your body today?","What does your body need that you have not been giving it?","How is your relationship with food? With exercise? With rest?","What does feeling healthy mean to you?","When do you feel strongest physically?","What is one kind thing you can do for your body this week?","How does your physical health affect your mental health?","What does self-care look like for you beyond the surface level?","Describe how you feel after a great night of sleep.","What would change if you prioritized your health above everything else?","How do you express yourself creatively?","What inspires you the most?","If you could create anything with no limits, what would it be?","When do you feel most creative?","What song, book, or film changed your perspective?","Write about a color that represents your current mood. Why that color?","What would you write about if you wrote a book?","How do you process your emotions \u2014 through words, art, music, movement?","What story do you need to tell?","Describe something beautiful you noticed today.","What is your relationship with money?","What does financial freedom look like to you?","What money belief did you inherit from your family?","What would you do with an unexpected $10,000?","How do you define abundance beyond finances?","What is one financial goal you want to achieve this year?","Do you spend money on things that align with your values?","What does generosity mean to you?","How do you feel when you think about your financial future?","What would change if you felt truly abundant?","What did you love doing as a child? Do you still do it?","When was the last time you laughed until you cried?","What brings you childlike joy?","If you had a completely free day, how would you spend it?","What is your guilty pleasure?","What adventure are you craving?","Who is the most fun person in your life? What makes them fun?","What is one spontaneous thing you did that turned out amazing?","How do you make room for play in your adult life?","What would you do more of if you stopped worrying about being productive?","Is there something you need to forgive yourself for?","What resentment are you carrying that is weighing you down?","How do you know when it is time to let go?","Write a letter to someone you need to forgive. You do not have to send it.","What would your life look like if you released all grudges?","What past version of yourself do you need to make peace with?","How has holding on to pain served you? How has it hurt you?","What does closure mean to you? Do you need it to move forward?","Who do you owe an apology to?","What would you say to the person who hurt you most?","What season of life are you in right now? How does it feel?","What are you outgrowing?","What ending in your life turned out to be a beginning?","How do you handle change? Is it something you resist or embrace?","What is something new that has entered your life recently?","What chapter of your life just closed? What is the next one about?","How have you changed in the past year?","What are you ready to release to make room for something new?","What transition are you currently navigating?","If your life had seasons, what would each one represent?","What is the question you are most afraid to answer honestly?","If your life were a book, what would this chapter be called?","What do you need to hear right now that no one is saying?","What is the bravest thing you have ever done?","What does your inner critic say most often? Is it true?","What would you do if you were not afraid?","What do you need more of in your life? What do you need less of?","How are you different from who you were a year ago?","What is the most important conversation you have ever had?","If you could ask the universe one question, what would it be?","How do you contribute to your community?","What cause matters most to you?","How can you use your strengths to help others?","What does it mean to be a good neighbor?","Who has mentored you? What did they teach you?","How would you like to mentor or support someone else?","What change do you want to see in the world?","How do your daily choices affect the people around you?","What act of kindness has stayed with you the longest?","If you could start a movement, what would it be about?","When was the last time you did something that scared you?","What would your most authentic life look like?","Where in your life are you playing it safe?","What is one courageous step you can take this week?","How do you stay true to yourself under pressure?","What would you say yes to if you trusted yourself more?","What are you pretending not to know?","How do you define courage?","What risk is worth taking right now?","What part of yourself have you been hiding from the world?"];var S=class{constructor(t){this.settings=t}generateDaily(t,e){let o=this.settings.customEmotions.length>0?this.settings.customEmotions:$,a=this.settings.selfCareCategories;return`---
type: guided-journal-daily
date: "${t}"
day: "${e}"
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

# ${e}, ${t}

> *"Let us make our future now, and let us make our dreams tomorrow's reality."*

---

## How Do You Feel?

\`\`\`emotion-grid
${o.join(",")}
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
${a.join(",")}
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


`}generateWeekly(t,e,o){let a=this.settings.defaultHabits,r=a.length>0?a.map(i=>`  "${i}": [false, false, false, false, false, false, false]`).join(`
`):'  "": [false, false, false, false, false, false, false]';return`---
type: guided-journal-weekly
week: "${t}"
week_start: "${e}"
week_end: "${o}"
feeling_target: ""
focus_areas: []
week_rating: 0
habits:
${r}
workout:
  monday: { activity: "", nutrition: "" }
  tuesday: { activity: "", nutrition: "" }
  wednesday: { activity: "", nutrition: "" }
  thursday: { activity: "", nutrition: "" }
  friday: { activity: "", nutrition: "" }
  saturday: { activity: "", nutrition: "" }
  sunday: { activity: "", nutrition: "" }
---

# Week of ${e}

> *"Celebrate even small victories."* \u2014 H. Jackson Brown Jr.

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


`}generateMonthly(t,e,o){let a=Math.ceil(o/3),i=["January","February","March","April","May","June","July","August","September","October","November","December"][o-1];return`---
type: guided-journal-monthly
month: "${t}"
year: ${e}
month_number: ${o}
quarter: ${a}
focus_areas: []
goals:
  - ""
  - ""
  - ""
---

# ${i} ${e}

> *"Life is long if you know how to use it."* \u2014 Seneca

**Quarter:** Q${a} | **Month:** ${o} / 12

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
${e}-${String(o).padStart(2,"0")}
\`\`\`

---

## Notes


`}generateDigDeeper(t,e,o){return`---
type: guided-journal-prompt
date: "${t}"
question_id: ${e}
---

# Dig Deeper \u2014 ${t}

> **${o}**

---


`}};var P=class{constructor(t,e){this.data=t,this.customQuestions=e}getAllQuestions(){return[..._,...this.customQuestions]}getQuestionForDate(t){let e=this.data.questionBank;if(e.lastQuestionDate===t&&e.lastQuestionId>=0){let u=this.getAllQuestions(),l=u[e.lastQuestionId]||u[0];return{id:e.lastQuestionId,question:l}}let o=this.getAllQuestions(),a=o.length,r=new Set(e.usedIds),i=[];for(let u=0;u<a;u++)r.has(u)||i.push(u);if(i.length===0){e.usedIds=[],e.currentCycle++;for(let u=0;u<a;u++)i.push(u)}let n=i[Math.floor(Math.random()*i.length)];return e.usedIds.push(n),e.lastQuestionDate=t,e.lastQuestionId=n,{id:n,question:o[n]}}};var E=class{constructor(t,e,o,a){this.app=t,this.settings=e,this.templateEngine=new S(e),this.questionBank=new P(o,e.customQuestions),this.pluginData=o,this.saveData=a}async ensureFolder(t){let e=(0,v.normalizePath)(t);this.app.vault.getAbstractFileByPath(e)||await this.app.vault.createFolder(e)}getToday(){return new Date}formatDate(t){let e=t.getFullYear(),o=String(t.getMonth()+1).padStart(2,"0"),a=String(t.getDate()).padStart(2,"0");return`${e}-${o}-${a}`}getDayOfWeek(t){return["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][t.getDay()]}getISOWeek(t){let e=new Date(t.getTime());e.setHours(0,0,0,0),e.setDate(e.getDate()+3-(e.getDay()+6)%7);let o=new Date(e.getFullYear(),0,4),a=1+Math.round(((e.getTime()-o.getTime())/864e5-3+(o.getDay()+6)%7)/7);return`${e.getFullYear()}-W${String(a).padStart(2,"0")}`}getWeekStart(t){let e=new Date(t.getTime()),o=e.getDay(),a=this.settings.weekStartDay==="monday"?1:0,r=(o-a+7)%7;return e.setDate(e.getDate()-r),e}getWeekEnd(t){let e=new Date(t.getTime());return e.setDate(e.getDate()+6),e}isWeekStartDay(t){return this.settings.weekStartDay==="monday"?t.getDay()===1:t.getDay()===0}async createDailyIfNeeded(){if(!this.settings.autoCreateDaily)return null;let t=this.getToday(),e=this.formatDate(t),o=(0,v.normalizePath)(`${this.settings.dailyFolder}/${e}.md`),a=this.app.vault.getAbstractFileByPath(o);if(a)return a;await this.ensureFolder(this.settings.dailyFolder);let r=this.templateEngine.generateDaily(e,this.getDayOfWeek(t));return await this.app.vault.create(o,r)}async createWeeklyIfNeeded(){if(!this.settings.autoCreateWeekly)return null;let t=this.getToday(),e=this.getWeekStart(t),o=this.getWeekEnd(e),a=this.getISOWeek(t),r=(0,v.normalizePath)(`${this.settings.weeklyFolder}/${a}.md`),i=this.app.vault.getAbstractFileByPath(r);if(i)return i;if(!this.isWeekStartDay(t))return null;await this.ensureFolder(this.settings.weeklyFolder);let n=this.templateEngine.generateWeekly(a,this.formatDate(e),this.formatDate(o));return await this.app.vault.create(r,n)}async createMonthlyIfNeeded(){if(!this.settings.autoCreateMonthly)return null;let t=this.getToday();if(t.getDate()!==1)return null;let e=t.getFullYear(),o=t.getMonth()+1,a=`${e}-${String(o).padStart(2,"0")}`,r=(0,v.normalizePath)(`${this.settings.monthlyFolder}/${a}.md`),i=this.app.vault.getAbstractFileByPath(r);if(i)return i;await this.ensureFolder(this.settings.monthlyFolder);let n=this.templateEngine.generateMonthly(a,e,o);return await this.app.vault.create(r,n)}async createDigDeeperIfNeeded(){if(!this.settings.autoCreateDigDeeper)return null;let t=this.getToday(),e=this.formatDate(t),o=(0,v.normalizePath)(`${this.settings.digDeeperFolder}/${e}-prompt.md`),a=this.app.vault.getAbstractFileByPath(o);if(a)return a;await this.ensureFolder(this.settings.digDeeperFolder);let{id:r,question:i}=this.questionBank.getQuestionForDate(e);await this.saveData();let n=this.templateEngine.generateDigDeeper(e,r,i);return await this.app.vault.create(o,n)}async runStartupRoutine(){let t=await this.createDailyIfNeeded();return await this.createWeeklyIfNeeded(),await this.createMonthlyIfNeeded(),await this.createDigDeeperIfNeeded(),t}async createTodaysJournal(){let t=this.getToday(),e=this.formatDate(t),o=(0,v.normalizePath)(`${this.settings.dailyFolder}/${e}.md`),a=this.app.vault.getAbstractFileByPath(o);if(a)return a;await this.ensureFolder(this.settings.dailyFolder);let r=this.templateEngine.generateDaily(e,this.getDayOfWeek(t));return await this.app.vault.create(o,r)}async createThisWeeksJournal(){let t=this.getToday(),e=this.getWeekStart(t),o=this.getWeekEnd(e),a=this.getISOWeek(t),r=(0,v.normalizePath)(`${this.settings.weeklyFolder}/${a}.md`),i=this.app.vault.getAbstractFileByPath(r);if(i)return i;await this.ensureFolder(this.settings.weeklyFolder);let n=this.templateEngine.generateWeekly(a,this.formatDate(e),this.formatDate(o));return await this.app.vault.create(r,n)}async createThisMonthsJournal(){let t=this.getToday(),e=t.getFullYear(),o=t.getMonth()+1,a=`${e}-${String(o).padStart(2,"0")}`,r=(0,v.normalizePath)(`${this.settings.monthlyFolder}/${a}.md`),i=this.app.vault.getAbstractFileByPath(r);if(i)return i;await this.ensureFolder(this.settings.monthlyFolder);let n=this.templateEngine.generateMonthly(a,e,o);return await this.app.vault.create(r,n)}async openTodaysDaily(){let t=this.getToday(),e=this.formatDate(t),o=(0,v.normalizePath)(`${this.settings.dailyFolder}/${e}.md`),a=this.app.vault.getAbstractFileByPath(o);a||(a=await this.createTodaysJournal()),a&&a instanceof v.TFile&&await this.app.workspace.getLeaf().openFile(a)}};function N(s){return(t,e,o)=>{var u;let a=t.trim().split(",").map(l=>l.trim()).filter(l=>l);if(a.length===0)return;let r=e.createDiv({cls:"gj-emotion-grid"}),i=s.workspace.getActiveFile(),n=[];if(i){let l=s.metadataCache.getFileCache(i);(u=l==null?void 0:l.frontmatter)!=null&&u.emotions&&(n=l.frontmatter.emotions)}a.forEach(l=>{let d=r.createEl("button",{cls:"gj-emotion-chip",text:l});n.includes(l)&&d.addClass("gj-emotion-selected"),d.addEventListener("click",async()=>{let g=s.workspace.getActiveFile();g&&await s.fileManager.processFrontMatter(g,y=>{y.emotions||(y.emotions=[]);let h=y.emotions.indexOf(l);h>=0?(y.emotions.splice(h,1),d.removeClass("gj-emotion-selected")):(y.emotions.push(l),d.addClass("gj-emotion-selected"))})})})}}function L(s){return(t,e,o)=>{var h;let a=s.workspace.getActiveFile();if(!a)return;let r=s.metadataCache.getFileCache(a),i=((h=r==null?void 0:r.frontmatter)==null?void 0:h.habits)||{},u=e.createDiv({cls:"gj-habit-tracker"}).createEl("table",{cls:"gj-habit-table"}),d=u.createEl("thead").createEl("tr");d.createEl("th",{text:"Habit"}),I.forEach(c=>d.createEl("th",{text:c}));let g=u.createEl("tbody"),y=Object.keys(i).filter(c=>c.trim());if(y.length===0){let p=g.createEl("tr").createEl("td",{attr:{colspan:"8"},text:"No habits configured. Add them in plugin settings."});p.style.textAlign="center",p.style.opacity="0.6";return}y.forEach(c=>{let p=g.createEl("tr");p.createEl("td",{text:c,cls:"gj-habit-name"}),(i[c]||[!1,!1,!1,!1,!1,!1,!1]).forEach((k,f)=>{let b=p.createEl("td",{cls:"gj-habit-cell"}).createEl("div",{cls:`gj-habit-check ${k?"gj-habit-checked":""}`});b.addEventListener("click",async()=>{let F=s.workspace.getActiveFile();F&&await s.fileManager.processFrontMatter(F,W=>{W.habits||(W.habits={}),W.habits[c]||(W.habits[c]=[!1,!1,!1,!1,!1,!1,!1]),W.habits[c][f]=!W.habits[c][f],W.habits[c][f]?b.addClass("gj-habit-checked"):b.removeClass("gj-habit-checked")})})})})}}function O(s,t="mood"){return(e,o,a)=>{var g,y;let r=s.workspace.getActiveFile();if(!r)return;let i=s.metadataCache.getFileCache(r),n=0;t==="mood"?n=((g=i==null?void 0:i.frontmatter)==null?void 0:g.mood)||0:t==="week_rating"&&(n=((y=i==null?void 0:i.frontmatter)==null?void 0:y.week_rating)||0);let u=o.createDiv({cls:"gj-mood-tracker"}),l=u.createDiv({cls:"gj-mood-label"});l.setText(n>0?`${n} / 10`:"Rate");let d=u.createDiv({cls:"gj-mood-scale"});for(let h=1;h<=10;h++)d.createEl("button",{cls:`gj-mood-dot ${h<=n?"gj-mood-active":""}`,text:String(h)}).addEventListener("click",async()=>{let p=s.workspace.getActiveFile();p&&(await s.fileManager.processFrontMatter(p,w=>{t==="mood"?w.mood=h:w.week_rating=h}),l.setText(`${h} / 10`),d.querySelectorAll(".gj-mood-dot").forEach((w,k)=>{k<h?w.addClass("gj-mood-active"):w.removeClass("gj-mood-active")}))})}}var J=[0,.5,1,2,3,4,5,6,7,8],ee=["0","0.5","1","2","3","4","5","6","7","8+"];function G(s){return(t,e,o)=>{var l;let a=s.workspace.getActiveFile();if(!a)return;let r=s.metadataCache.getFileCache(a),i=((l=r==null?void 0:r.frontmatter)==null?void 0:l.time_tracker)||{tasks:0,distractions:0,self_care:0},n=e.createDiv({cls:"gj-time-tracker"});[{key:"tasks",label:"Tasks",fmKey:"tasks"},{key:"distractions",label:"Distractions",fmKey:"distractions"},{key:"self_care",label:"Self-Care",fmKey:"self_care"}].forEach(d=>{let g=n.createDiv({cls:"gj-time-row"});g.createDiv({cls:"gj-time-label",text:d.label});let y=g.createDiv({cls:"gj-time-bar"}),h=i[d.fmKey]||0;J.forEach((c,p)=>{y.createEl("button",{cls:`gj-time-segment ${c<=h&&h>0?"gj-time-filled":""}`,text:ee[p]}).addEventListener("click",async()=>{let k=s.workspace.getActiveFile();k&&(await s.fileManager.processFrontMatter(k,f=>{f.time_tracker||(f.time_tracker={tasks:0,distractions:0,self_care:0}),f.time_tracker[d.fmKey]=c}),y.querySelectorAll(".gj-time-segment").forEach((f,D)=>{J[D]<=c&&c>0?f.addClass("gj-time-filled"):f.removeClass("gj-time-filled")}))})})})}}var te=["pending","done","delay","delete"],oe={pending:"\u25CB",done:"\u2713 Done",delay:"\u25F7 Delay",delete:"\u2715 Delete"};function B(s){return(t,e,o)=>{var u;let a=s.workspace.getActiveFile();if(!a)return;let r=s.metadataCache.getFileCache(a),i=((u=r==null?void 0:r.frontmatter)==null?void 0:u.priorities)||[{text:"",status:"pending"},{text:"",status:"pending"},{text:"",status:"pending"}],n=e.createDiv({cls:"gj-priorities"});i.forEach((l,d)=>{let g=n.createDiv({cls:"gj-priority-row"});g.createDiv({cls:"gj-priority-num",text:`${d+1}.`});let y=g.createEl("input",{cls:"gj-priority-input",attr:{type:"text",placeholder:"Enter priority...",value:l.text||""}});y.addEventListener("change",async()=>{let c=s.workspace.getActiveFile();c&&await s.fileManager.processFrontMatter(c,p=>{p.priorities||(p.priorities=[]),p.priorities[d]||(p.priorities[d]={text:"",status:"pending"}),p.priorities[d].text=y.value})});let h=g.createDiv({cls:"gj-priority-status-group"});te.forEach(c=>{if(c==="pending")return;let p=h.createEl("button",{cls:`gj-priority-btn gj-priority-${c} ${l.status===c?"gj-priority-active":""}`,text:oe[c]});p.addEventListener("click",async()=>{let w=s.workspace.getActiveFile();if(!w)return;let k=l.status===c?"pending":c;await s.fileManager.processFrontMatter(w,f=>{f.priorities||(f.priorities=[]),f.priorities[d]||(f.priorities[d]={text:"",status:"pending"}),f.priorities[d].status=k}),h.querySelectorAll(".gj-priority-btn").forEach(f=>f.removeClass("gj-priority-active")),k!=="pending"&&p.addClass("gj-priority-active"),l.status=k})})})}}function Q(s){return(t,e,o)=>{let r=t.trim().split("-");if(r.length!==2)return;let i=parseInt(r[0]),n=parseInt(r[1]);if(isNaN(i)||isNaN(n))return;let u=e.createDiv({cls:"gj-calendar"}),l=["January","February","March","April","May","June","July","August","September","October","November","December"];u.createDiv({cls:"gj-calendar-header"}).createEl("span",{text:`${l[n-1]} ${i}`});let g=u.createDiv({cls:"gj-calendar-grid"});["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].forEach(D=>{g.createDiv({cls:"gj-calendar-day-header",text:D})});let h=new Date(i,n-1,1),p=new Date(i,n,0).getDate(),w=h.getDay();w=w===0?6:w-1;for(let D=0;D<w;D++)g.createDiv({cls:"gj-calendar-cell gj-calendar-empty"});let k=new Date,f=`${k.getFullYear()}-${String(k.getMonth()+1).padStart(2,"0")}-${String(k.getDate()).padStart(2,"0")}`;for(let D=1;D<=p;D++){let b=`${i}-${String(n).padStart(2,"0")}-${String(D).padStart(2,"0")}`,F=g.createDiv({cls:`gj-calendar-cell ${b===f?"gj-calendar-today":""}`,text:String(D)}),W=`Journal/Daily/${b}.md`;s.vault.getAbstractFileByPath(W)&&(F.addClass("gj-calendar-has-note"),F.addEventListener("click",()=>{let j=s.vault.getAbstractFileByPath(W);j&&s.workspace.getLeaf().openFile(j)}))}}}function Y(s){return(t,e,o)=>{let a=t.trim().split(",").map(i=>i.trim()).filter(i=>i);if(a.length===0)return;let r=e.createDiv({cls:"gj-self-care"});a.forEach(i=>{let n=r.createDiv({cls:"gj-self-care-card"}),u=ae(i);n.createDiv({cls:"gj-self-care-icon",text:u}),n.createDiv({cls:"gj-self-care-label",text:i});let l=n.createEl("input",{cls:"gj-self-care-input",attr:{type:"text",placeholder:`${i} activity...`}})})}}function ae(s){return{Physical:"\u{1F4AA}",Emotional:"\u2764\uFE0F",Professional:"\u{1F4BC}",Social:"\u{1F465}",Financial:"\u{1F4B0}",Spiritual:"\u{1F64F}"}[s]||"\u25CF"}function R(s){return(t,e,o)=>{var u;let a=s.workspace.getActiveFile();if(!a)return;let r=s.metadataCache.getFileCache(a),i=((u=r==null?void 0:r.frontmatter)==null?void 0:u.focus_areas)||[],n=e.createDiv({cls:"gj-focus-selector"});H.forEach(l=>{let d=n.createEl("button",{cls:`gj-focus-chip ${i.includes(l)?"gj-focus-selected":""}`,text:l});d.addEventListener("click",async()=>{let g=s.workspace.getActiveFile();g&&await s.fileManager.processFrontMatter(g,y=>{y.focus_areas||(y.focus_areas=[]);let h=y.focus_areas.indexOf(l);h>=0?(y.focus_areas.splice(h,1),d.removeClass("gj-focus-selected")):(y.focus_areas.push(l),d.addClass("gj-focus-selected"))})})})}}var C=class extends q.Plugin{constructor(){super(...arguments);this.settings=M;this.pluginData=A}async onload(){await this.loadSettings(),await this.loadPluginData(),this.journalManager=new E(this.app,this.settings,this.pluginData,()=>this.savePluginData()),this.registerMarkdownCodeBlockProcessor("emotion-grid",N(this.app)),this.registerMarkdownCodeBlockProcessor("habit-tracker",L(this.app)),this.registerMarkdownCodeBlockProcessor("mood-tracker",O(this.app,"mood")),this.registerMarkdownCodeBlockProcessor("time-tracker",G(this.app)),this.registerMarkdownCodeBlockProcessor("priorities",B(this.app)),this.registerMarkdownCodeBlockProcessor("monthly-calendar",Q(this.app)),this.registerMarkdownCodeBlockProcessor("self-care",Y(this.app)),this.registerMarkdownCodeBlockProcessor("focus-selector",R(this.app)),this.addRibbonIcon("book-open","Open today's journal",async()=>{await this.journalManager.openTodaysDaily()}),this.addCommand({id:"open-daily-journal",name:"Open today's daily journal",callback:()=>this.journalManager.openTodaysDaily()}),this.addCommand({id:"create-daily-journal",name:"Create today's daily journal",callback:async()=>{let e=await this.journalManager.createTodaysJournal();e&&await this.app.workspace.getLeaf().openFile(e)}}),this.addCommand({id:"create-weekly-journal",name:"Create this week's journal",callback:async()=>{let e=await this.journalManager.createThisWeeksJournal();e&&await this.app.workspace.getLeaf().openFile(e)}}),this.addCommand({id:"create-monthly-journal",name:"Create this month's journal",callback:async()=>{let e=await this.journalManager.createThisMonthsJournal();e&&await this.app.workspace.getLeaf().openFile(e)}}),this.addSettingTab(new T(this.app,this)),this.app.workspace.onLayoutReady(async()=>{let e=await this.journalManager.runStartupRoutine();this.settings.openDailyOnStartup&&e&&await this.app.workspace.getLeaf().openFile(e)})}async loadSettings(){let e=await this.loadData();this.settings=Object.assign({},M,(e==null?void 0:e.settings)||{})}async saveSettings(){let e=await this.loadData()||{};e.settings=this.settings,await this.saveData(e)}async loadPluginData(){let e=await this.loadData();this.pluginData=Object.assign({},A,(e==null?void 0:e.pluginData)||{})}async savePluginData(){let e=await this.loadData()||{};e.pluginData=this.pluginData,await this.saveData(e)}};
