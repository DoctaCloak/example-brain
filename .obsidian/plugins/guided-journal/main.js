var L=Object.defineProperty;var le=Object.getOwnPropertyDescriptor;var ue=Object.getOwnPropertyNames;var he=Object.prototype.hasOwnProperty;var ce=(i,t)=>{for(var e in t)L(i,e,{get:t[e],enumerable:!0})},de=(i,t,e,o)=>{if(t&&typeof t=="object"||typeof t=="function")for(let a of ue(t))!he.call(i,a)&&a!==e&&L(i,a,{get:()=>t[a],enumerable:!(o=le(t,a))||o.enumerable});return i};var ge=i=>de(L({},"__esModule",{value:!0}),i);var we={};ce(we,{default:()=>_});module.exports=ge(we);var ne=require("obsidian");var B={dailyFolder:"Journal/Daily",weeklyFolder:"Journal/Weekly",monthlyFolder:"Journal/Monthly",digDeeperFolder:"Journal/Dig-Deeper",autoCreateDaily:!0,autoCreateWeekly:!0,autoCreateMonthly:!0,autoCreateDigDeeper:!0,openDailyOnStartup:!0,weekStartDay:"monday",customEmotions:[],defaultHabits:[],selfCareCategories:["Physical","Emotional","Professional","Social","Financial","Spiritual"],customQuestions:[],dateFormat:"YYYY-MM-DD",journalTheme:"paper"},E={questionBank:{usedIds:[],currentCycle:1,lastQuestionDate:"",lastQuestionId:-1}};var v=require("obsidian"),M=class extends v.PluginSettingTab{constructor(t,e){super(t,e),this.plugin=e}display(){let{containerEl:t}=this;t.empty(),t.createEl("h1",{text:"Guided Journal"}),t.createEl("h2",{text:"Folders"}),new v.Setting(t).setName("Daily notes folder").setDesc("Where daily journal notes are stored").addText(e=>e.setPlaceholder("Journal/Daily").setValue(this.plugin.settings.dailyFolder).onChange(async o=>{this.plugin.settings.dailyFolder=o,await this.plugin.saveSettings()})),new v.Setting(t).setName("Weekly notes folder").addText(e=>e.setPlaceholder("Journal/Weekly").setValue(this.plugin.settings.weeklyFolder).onChange(async o=>{this.plugin.settings.weeklyFolder=o,await this.plugin.saveSettings()})),new v.Setting(t).setName("Monthly notes folder").addText(e=>e.setPlaceholder("Journal/Monthly").setValue(this.plugin.settings.monthlyFolder).onChange(async o=>{this.plugin.settings.monthlyFolder=o,await this.plugin.saveSettings()})),new v.Setting(t).setName("Dig Deeper folder").addText(e=>e.setPlaceholder("Journal/Dig-Deeper").setValue(this.plugin.settings.digDeeperFolder).onChange(async o=>{this.plugin.settings.digDeeperFolder=o,await this.plugin.saveSettings()})),t.createEl("h2",{text:"Auto-creation"}),new v.Setting(t).setName("Auto-create daily note").setDesc("Create a daily journal note when you open Obsidian").addToggle(e=>e.setValue(this.plugin.settings.autoCreateDaily).onChange(async o=>{this.plugin.settings.autoCreateDaily=o,await this.plugin.saveSettings()})),new v.Setting(t).setName("Auto-create weekly note").setDesc("Create a weekly note on the first day of each week").addToggle(e=>e.setValue(this.plugin.settings.autoCreateWeekly).onChange(async o=>{this.plugin.settings.autoCreateWeekly=o,await this.plugin.saveSettings()})),new v.Setting(t).setName("Auto-create monthly note").setDesc("Create a monthly note on the 1st of each month").addToggle(e=>e.setValue(this.plugin.settings.autoCreateMonthly).onChange(async o=>{this.plugin.settings.autoCreateMonthly=o,await this.plugin.saveSettings()})),new v.Setting(t).setName("Auto-create Dig Deeper prompt").setDesc("Create a daily reflective prompt").addToggle(e=>e.setValue(this.plugin.settings.autoCreateDigDeeper).onChange(async o=>{this.plugin.settings.autoCreateDigDeeper=o,await this.plugin.saveSettings()})),new v.Setting(t).setName("Open daily note on startup").setDesc("Automatically open today's daily note when Obsidian starts").addToggle(e=>e.setValue(this.plugin.settings.openDailyOnStartup).onChange(async o=>{this.plugin.settings.openDailyOnStartup=o,await this.plugin.saveSettings()})),t.createEl("h2",{text:"Preferences"}),new v.Setting(t).setName("Week starts on").addDropdown(e=>e.addOption("monday","Monday").addOption("sunday","Sunday").setValue(this.plugin.settings.weekStartDay).onChange(async o=>{this.plugin.settings.weekStartDay=o,await this.plugin.saveSettings()})),new v.Setting(t).setName("Custom emotions").setDesc("Additional emotions added to the default 36 (comma-separated)").addTextArea(e=>e.setPlaceholder("Nostalgic, Rebellious, Tender").setValue(this.plugin.settings.customEmotions.join(", ")).onChange(async o=>{this.plugin.settings.customEmotions=o.split(",").map(a=>a.trim()).filter(a=>a),await this.plugin.saveSettings()})),new v.Setting(t).setName("Theme").addDropdown(e=>e.addOption("paper","Paper").addOption("minimal","Minimal").addOption("dark","Dark").setValue(this.plugin.settings.journalTheme).onChange(async o=>{this.plugin.settings.journalTheme=o,await this.plugin.saveSettings()})),t.createEl("h2",{text:"Default Habits"}),t.createEl("p",{text:"These habits will be pre-filled in each new weekly note.",cls:"setting-item-description"}),new v.Setting(t).setName("Habits (comma-separated)").addTextArea(e=>e.setPlaceholder("Morning run, Read 30 min, Meditate").setValue(this.plugin.settings.defaultHabits.join(", ")).onChange(async o=>{this.plugin.settings.defaultHabits=o.split(",").map(a=>a.trim()).filter(a=>a),await this.plugin.saveSettings()})),t.createEl("h2",{text:"Custom Dig Deeper Questions"}),t.createEl("p",{text:"Add your own reflective prompts (one per line). These will be mixed into the rotation.",cls:"setting-item-description"}),new v.Setting(t).addTextArea(e=>{e.setPlaceholder(`What does courage look like in your life?
What are you holding onto that no longer serves you?`).setValue(this.plugin.settings.customQuestions.join(`
`)).onChange(async o=>{this.plugin.settings.customQuestions=o.split(`
`).map(a=>a.trim()).filter(a=>a),await this.plugin.saveSettings()}),e.inputEl.rows=8,e.inputEl.cols=50})}};var b=require("obsidian");var N=["positive","happy","hopeful","stressed","nervous","anxious","determined","insecure","confused","proud","safe","bored","tired","hurt","angry","excited","irritated","disappointed","content","negative","annoyed","inspired","grateful","frustrated","calm","strong","neutral","regretful","lonely","low","confident","restless","relieved","scared","guilty","sad"],G=["Physical","Emotional","Professional","Social","Financial","Spiritual"],R=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],Y=["M","T","W","T","F","S","S"],q={Physical:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 20V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14"/><path d="M2 20h20"/><path d="M14 12v.01"/></svg>',Emotional:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>',Professional:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>',Social:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',Financial:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>',Spiritual:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>'},O=[{text:"Let us make our future now, and let us make our dreams tomorrow's reality.",author:""},{text:"Celebrate even small victories.",author:"H. Jackson Brown Jr."},{text:"Life is long if you know how to use it.",author:"Seneca"},{text:"Most of us spend too much time on what is urgent and not enough time on what is important.",author:"Stephen R. Covey"},{text:"Eat healthily, sleep well, breathe deeply, move harmoniously.",author:"Jean-Pierre Barral"},{text:"Begin anywhere.",author:"John Cage"},{text:"The only journey is the one within.",author:"Rainer Maria Rilke"},{text:"Knowing yourself is the beginning of all wisdom.",author:"Aristotle"},{text:"What lies behind us and what lies before us are tiny matters compared to what lies within us.",author:"Ralph Waldo Emerson"},{text:"The unexamined life is not worth living.",author:"Socrates"},{text:"Be yourself; everyone else is already taken.",author:"Oscar Wilde"},{text:"In the middle of difficulty lies opportunity.",author:"Albert Einstein"},{text:"You must be the change you wish to see in the world.",author:"Mahatma Gandhi"},{text:"The best time to plant a tree was 20 years ago. The second best time is now.",author:"Chinese Proverb"},{text:"Happiness is not something ready made. It comes from your own actions.",author:"Dalai Lama"},{text:"What you get by achieving your goals is not as important as what you become by achieving your goals.",author:"Zig Ziglar"},{text:"It is during our darkest moments that we must focus to see the light.",author:"Aristotle"},{text:"The only way to do great work is to love what you do.",author:"Steve Jobs"},{text:"We are what we repeatedly do. Excellence, then, is not an act, but a habit.",author:"Will Durant"},{text:"Dream big. Start small.",author:""},{text:"Your body hears everything your mind says.",author:"Naomi Judd"},{text:"Almost everything will work again if you unplug it for a few minutes, including you.",author:"Anne Lamott"},{text:"Self-care is not selfish. You cannot serve from an empty vessel.",author:"Eleanor Brownn"},{text:"A journey of a thousand miles begins with a single step.",author:"Lao Tzu"},{text:"Progress, not perfection.",author:""},{text:"The greatest glory in living lies not in never falling, but in rising every time we fall.",author:"Nelson Mandela"},{text:"Be patient with yourself. Nothing in nature blooms all year.",author:""},{text:"You are enough just as you are.",author:"Meghan Markle"},{text:"Small steps every day.",author:""},{text:"What we think, we become.",author:"Buddha"}],U=["Imagine a movie about your life. Who would play you? What would the movie be about?","What is one of your long-term goals?","Are you living the life you imagined for yourself? Why or why not?","What does your ideal day look like from start to finish?","If you could change one thing about yourself, what would it be and why?","What are three words that best describe who you are right now?","What mask do you wear most often, and what are you hiding behind it?","When do you feel most like yourself?","What would you do differently if nobody was watching?","What story do you keep telling yourself that might not be true?","Who has had the biggest impact on your life and why?","What does love mean to you?","Describe a relationship that changed you. How did it change you?","What do you need most from the people in your life?","Who do you need to forgive, and what is stopping you?","What boundaries do you need to set or reinforce?","How do you show love to the people who matter most?","What conversation have you been avoiding? Why?","Who would you call if you had one phone call left?","What kind of friend are you? What kind of friend do you want to be?","What is one thing you need to let go of?","What lesson took you the longest to learn?","What are you most afraid of? How does that fear hold you back?","What would you tell your younger self?","Describe a moment that broke you. How did you rebuild?","What does healing look like for you?","What pattern in your life do you want to break?","What is one thing you have been avoiding that you know you need to face?","When was the last time you felt truly proud of yourself?","What does growth mean to you right now?","What gives your life meaning?","If money were no object, how would you spend your time?","What legacy do you want to leave behind?","What are you most passionate about?","What impact do you want to have on the world?","What does success look like to you \u2014 not to society, but to you?","What is one thing you would regret not doing?","If today were your last day, would you be satisfied with how you lived?","What do you want to be remembered for?","What is the most important thing in your life right now?","What emotion do you avoid feeling the most? Why?","When was the last time you cried? What triggered it?","What brings you genuine peace?","What makes you feel alive?","How do you handle anger? Is it healthy?","What does happiness mean to you?","When do you feel the most vulnerable?","What is weighing on your heart right now?","Describe a moment of pure joy you experienced recently.","What emotion do you wish you could feel more often?","What are five things you are grateful for today?","What is one small thing that brought you joy this week?","Who has shown you kindness recently? How did it make you feel?","What part of your daily routine are you most thankful for?","What is a challenge you are grateful for? What did it teach you?","What about your body are you grateful for?","What is one thing in nature that fills you with awe?","Name a skill or talent you have that you appreciate.","What is a memory you are deeply thankful for?","What is something you take for granted that others wish they had?","Where do you see yourself in five years?","What dream have you put on hold? What would it take to revive it?","If you could master any skill overnight, what would it be?","What does your dream home look like?","Describe your perfect career or vocation.","What country or place do you dream of visiting? Why?","What would you create if you knew you could not fail?","What is one goal that excites and terrifies you at the same time?","If you had unlimited resources, what problem would you solve?","What is one new thing you want to try this year?","What habit do you want to build? What is your first step?","What habit do you need to break? What triggers it?","How do you spend the first hour of your day? Is it intentional?","What does your ideal morning routine look like?","What do you do when you feel unmotivated?","How do you recharge when you are running on empty?","What distractions steal the most time from you?","What is one thing you can do today to invest in your future self?","How do you hold yourself accountable?","What would change if you were 10% more disciplined?","What is the hardest thing you have ever been through?","How do you respond to failure? How would you like to respond?","What obstacle are you currently facing? What is one step forward?","When life gets hard, what keeps you going?","Describe a time when you surprised yourself with your own strength.","What did your last setback teach you?","How do you cope with uncertainty?","What is one thing you overcame that you never thought you could?","What does resilience mean to you?","Who or what do you lean on during tough times?","What are your top three core values?","What do you believe about yourself that empowers you?","What belief have you outgrown?","What does integrity mean to you? Do you live by it?","What would you stand up for, even if you stood alone?","How have your values changed over the past five years?","What is one principle you refuse to compromise on?","Do your daily actions align with your deepest values?","What does faith mean to you?","What truth are you avoiding?","What are you feeling right now, in this exact moment?","When was the last time you were fully present? What were you doing?","What does stillness feel like to you?","How often do you check in with yourself? What do you notice?","What would your life look like if you worried less?","What sounds, smells, or sights bring you comfort?","How do you quiet your mind when it is racing?","What does it mean to truly listen \u2014 to yourself and to others?","Describe your happy place in detail.","If you could freeze one moment in time, which would it be?","How do you feel in your body today?","What does your body need that you have not been giving it?","How is your relationship with food? With exercise? With rest?","What does feeling healthy mean to you?","When do you feel strongest physically?","What is one kind thing you can do for your body this week?","How does your physical health affect your mental health?","What does self-care look like for you beyond the surface level?","Describe how you feel after a great night of sleep.","What would change if you prioritized your health above everything else?","How do you express yourself creatively?","What inspires you the most?","If you could create anything with no limits, what would it be?","When do you feel most creative?","What song, book, or film changed your perspective?","Write about a color that represents your current mood. Why that color?","What would you write about if you wrote a book?","How do you process your emotions \u2014 through words, art, music, movement?","What story do you need to tell?","Describe something beautiful you noticed today.","What is your relationship with money?","What does financial freedom look like to you?","What money belief did you inherit from your family?","What would you do with an unexpected $10,000?","How do you define abundance beyond finances?","What is one financial goal you want to achieve this year?","Do you spend money on things that align with your values?","What does generosity mean to you?","How do you feel when you think about your financial future?","What would change if you felt truly abundant?","What did you love doing as a child? Do you still do it?","When was the last time you laughed until you cried?","What brings you childlike joy?","If you had a completely free day, how would you spend it?","What is your guilty pleasure?","What adventure are you craving?","Who is the most fun person in your life? What makes them fun?","What is one spontaneous thing you did that turned out amazing?","How do you make room for play in your adult life?","What would you do more of if you stopped worrying about being productive?","Is there something you need to forgive yourself for?","What resentment are you carrying that is weighing you down?","How do you know when it is time to let go?","Write a letter to someone you need to forgive. You do not have to send it.","What would your life look like if you released all grudges?","What past version of yourself do you need to make peace with?","How has holding on to pain served you? How has it hurt you?","What does closure mean to you? Do you need it to move forward?","Who do you owe an apology to?","What would you say to the person who hurt you most?","What season of life are you in right now? How does it feel?","What are you outgrowing?","What ending in your life turned out to be a beginning?","How do you handle change? Is it something you resist or embrace?","What is something new that has entered your life recently?","What chapter of your life just closed? What is the next one about?","How have you changed in the past year?","What are you ready to release to make room for something new?","What transition are you currently navigating?","If your life had seasons, what would each one represent?","What is the question you are most afraid to answer honestly?","If your life were a book, what would this chapter be called?","What do you need to hear right now that no one is saying?","What is the bravest thing you have ever done?","What does your inner critic say most often? Is it true?","What would you do if you were not afraid?","What do you need more of in your life? What do you need less of?","How are you different from who you were a year ago?","What is the most important conversation you have ever had?","If you could ask the universe one question, what would it be?","How do you contribute to your community?","What cause matters most to you?","How can you use your strengths to help others?","What does it mean to be a good neighbor?","Who has mentored you? What did they teach you?","How would you like to mentor or support someone else?","What change do you want to see in the world?","How do your daily choices affect the people around you?","What act of kindness has stayed with you the longest?","If you could start a movement, what would it be about?","When was the last time you did something that scared you?","What would your most authentic life look like?","Where in your life are you playing it safe?","What is one courageous step you can take this week?","How do you stay true to yourself under pressure?","What would you say yes to if you trusted yourself more?","What are you pretending not to know?","How do you define courage?","What risk is worth taking right now?","What part of yourself have you been hiding from the world?"];var T=require("obsidian");function p(i,t){let e=i.vault.getAbstractFileByPath(t);return e instanceof T.TFile?e:null}async function k(i,t,e){try{await i.fileManager.processFrontMatter(t,e)}catch(o){console.error("Guided Journal: Failed to update frontmatter",o),new T.Notice("Guided Journal: Failed to save changes")}}async function F(i,t){let e=(0,T.normalizePath)(t);if(i.vault.getAbstractFileByPath(e))return;let o=e.split("/"),a="";for(let r of o)if(a=a?`${a}/${r}`:r,!i.vault.getAbstractFileByPath(a))try{await i.vault.createFolder(a)}catch(u){if(!i.vault.getAbstractFileByPath(a))throw u}}function D(i){let t=i.getFullYear(),e=String(i.getMonth()+1).padStart(2,"0"),o=String(i.getDate()).padStart(2,"0");return`${t}-${e}-${o}`}function j(i){return["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][i.getDay()]}function Q(i){let t=new Date(i.getTime());t.setHours(0,0,0,0),t.setDate(t.getDate()+3-(t.getDay()+6)%7);let e=new Date(t.getFullYear(),0,4),o=1+Math.round(((t.getTime()-e.getTime())/864e5-3+(e.getDay()+6)%7)/7);return{label:`${t.getFullYear()}-W${String(o).padStart(2,"0")}`,weekNum:o}}var A=class{constructor(t){this.settings=t}getQuote(t){let e=0;for(let a=0;a<t.length;a++)e=(e<<5)-e+t.charCodeAt(a),e=e&e;let o=Math.abs(e)%O.length;return O[o]}formatQuote(t){return t.author?`> *"${t.text}"* \u2014 ${t.author}`:`> *"${t.text}"*`}getEmotions(){return this.settings.customEmotions.length>0?[...N,...this.settings.customEmotions]:N}generateDailyLinks(t){let e=new Date(t+"T12:00:00"),o=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],a=`| Day | Date | Focus |
|-----|------|-------|
`;for(let r=0;r<7;r++){let l=new Date(e);l.setDate(l.getDate()+r);let u=D(l);a+=`| ${o[r]} | [[${u}]] | |
`}return a}generateDaily(t,e){let o=this.getEmotions(),a=this.settings.selfCareCategories,r=this.getQuote(t),l=new Date(t+"T12:00:00"),u=new Date(l);u.setDate(u.getDate()-1);let s=new Date(l);s.setDate(s.getDate()+1);let n=D(u),h=D(s);return`---
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
self_care_plan: {}
---

# ${e}, ${t}

[[${n}|< Previous]] | [[${h}|Next >]]

${this.formatQuote(r)}

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

\`\`\`schedule
\`\`\`

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


`}generateWeekly(t,e,o,a){let r=this.settings.defaultHabits,l=r.length>0?r.map(s=>`  "${s}": [false, false, false, false, false, false, false]`).join(`
`):'  "": [false, false, false, false, false, false, false]',u=this.getQuote(t);return`---
type: guided-journal-weekly
week: "${t}"
week_start: "${e}"
week_end: "${o}"
feeling_target: ""
focus_areas: []
week_rating: 0
habits:
${l}
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

**Week ${a} / 52**

${this.formatQuote(u)}

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

${this.generateDailyLinks(e)}

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


`}generateMonthly(t,e,o){let a=Math.ceil(o/3),l=["January","February","March","April","May","June","July","August","September","October","November","December"][o-1],u=this.getQuote(t);return`---
type: guided-journal-monthly
month: "${t}"
year: ${e}
month_number: ${o}
quarter: ${a}
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

# ${l} ${e}

**Quarter:** Q${a} | **Month:** ${o} / 12

${this.formatQuote(u)}

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
${e}-${String(o).padStart(2,"0")}
\`\`\`

---

## Notes


`}generateDigDeeper(t,e,o){let a=this.getQuote(t+"-dig");return`---
type: guided-journal-prompt
date: "${t}"
question_id: ${e}
---

# Dig Deeper \u2014 ${t}

${this.formatQuote(a)}

---

> **${o}**

---


`}};var $=class{constructor(t,e){this.data=t,this.customQuestions=e}getAllQuestions(){return[...U,...this.customQuestions]}hashQuestion(t){let e=0,o=t.substring(0,50);for(let a=0;a<o.length;a++){let r=o.charCodeAt(a);e=(e<<5)-e+r,e=e&e}return String(e)}getQuestionForDate(t){let e=this.data.questionBank;if(e.lastQuestionDate===t&&e.lastQuestionId>=0){let s=this.getAllQuestions();if(e.lastQuestionId<s.length)return{id:e.lastQuestionId,question:s[e.lastQuestionId]}}let o=this.getAllQuestions(),a=o.length,r=new Set(e.usedIds.map(String)),l=[];for(let s=0;s<a;s++)r.has(this.hashQuestion(o[s]))||l.push(s);if(l.length===0){e.usedIds=[],e.currentCycle++;for(let s=0;s<a;s++)l.push(s)}let u=l[Math.floor(Math.random()*l.length)];return e.usedIds.push(parseInt(this.hashQuestion(o[u]))),e.lastQuestionDate=t,e.lastQuestionId=u,{id:u,question:o[u]}}};var H=class{constructor(t,e,o,a){this.app=t,this.settings=e,this.templateEngine=new A(e),this.questionBank=new $(o,e.customQuestions),this.pluginData=o,this.saveData=a}getToday(){return new Date}getWeekStart(t){let e=new Date(t.getTime()),o=e.getDay(),a=this.settings.weekStartDay==="monday"?1:0,r=(o-a+7)%7;return e.setDate(e.getDate()-r),e}getWeekEnd(t){let e=new Date(t.getTime());return e.setDate(e.getDate()+6),e}isWeekStartDay(t){return this.settings.weekStartDay==="monday"?t.getDay()===1:t.getDay()===0}async safeCreate(t,e){try{return await this.app.vault.create(t,e)}catch(o){return console.error(`Guided Journal: Failed to create ${t}`,o),new b.Notice(`Guided Journal: Failed to create ${t}`),null}}async createDailyIfNeeded(){if(!this.settings.autoCreateDaily)return null;let t=this.getToday(),e=D(t),o=(0,b.normalizePath)(`${this.settings.dailyFolder}/${e}.md`),a=this.app.vault.getAbstractFileByPath(o);if(a)return a;await F(this.app,this.settings.dailyFolder);let r=this.templateEngine.generateDaily(e,j(t));return await this.safeCreate(o,r)}async createWeeklyIfNeeded(){if(!this.settings.autoCreateWeekly)return null;let t=this.getToday(),e=this.getWeekStart(t),o=this.getWeekEnd(e),{label:a,weekNum:r}=Q(t),l=(0,b.normalizePath)(`${this.settings.weeklyFolder}/${a}.md`),u=this.app.vault.getAbstractFileByPath(l);if(u)return u;if(!this.isWeekStartDay(t))return null;await F(this.app,this.settings.weeklyFolder);let s=this.templateEngine.generateWeekly(a,D(e),D(o),r);return await this.safeCreate(l,s)}async createMonthlyIfNeeded(){if(!this.settings.autoCreateMonthly)return null;let t=this.getToday();if(t.getDate()!==1)return null;let e=t.getFullYear(),o=t.getMonth()+1,a=`${e}-${String(o).padStart(2,"0")}`,r=(0,b.normalizePath)(`${this.settings.monthlyFolder}/${a}.md`),l=this.app.vault.getAbstractFileByPath(r);if(l)return l;await F(this.app,this.settings.monthlyFolder);let u=this.templateEngine.generateMonthly(a,e,o);return await this.safeCreate(r,u)}async createDigDeeperIfNeeded(){if(!this.settings.autoCreateDigDeeper)return null;let t=this.getToday(),e=D(t),o=(0,b.normalizePath)(`${this.settings.digDeeperFolder}/${e}-prompt.md`),a=this.app.vault.getAbstractFileByPath(o);if(a)return a;await F(this.app,this.settings.digDeeperFolder);let{id:r,question:l}=this.questionBank.getQuestionForDate(e);await this.saveData();let u=this.templateEngine.generateDigDeeper(e,r,l);return await this.safeCreate(o,u)}async runStartupRoutine(){let t=await this.createDailyIfNeeded();return await this.createWeeklyIfNeeded(),await this.createMonthlyIfNeeded(),await this.createDigDeeperIfNeeded(),t}async createTodaysJournal(){let t=this.getToday(),e=D(t),o=(0,b.normalizePath)(`${this.settings.dailyFolder}/${e}.md`),a=this.app.vault.getAbstractFileByPath(o);if(a)return a;await F(this.app,this.settings.dailyFolder);let r=this.templateEngine.generateDaily(e,j(t));return await this.safeCreate(o,r)}async createThisWeeksJournal(){let t=this.getToday(),e=this.getWeekStart(t),o=this.getWeekEnd(e),{label:a,weekNum:r}=Q(t),l=(0,b.normalizePath)(`${this.settings.weeklyFolder}/${a}.md`),u=this.app.vault.getAbstractFileByPath(l);if(u)return u;await F(this.app,this.settings.weeklyFolder);let s=this.templateEngine.generateWeekly(a,D(e),D(o),r);return await this.safeCreate(l,s)}async createThisMonthsJournal(){let t=this.getToday(),e=t.getFullYear(),o=t.getMonth()+1,a=`${e}-${String(o).padStart(2,"0")}`,r=(0,b.normalizePath)(`${this.settings.monthlyFolder}/${a}.md`),l=this.app.vault.getAbstractFileByPath(r);if(l)return l;await F(this.app,this.settings.monthlyFolder);let u=this.templateEngine.generateMonthly(a,e,o);return await this.safeCreate(r,u)}async openTodaysDaily(){let t=this.getToday(),e=D(t),o=(0,b.normalizePath)(`${this.settings.dailyFolder}/${e}.md`),a=this.app.vault.getAbstractFileByPath(o);a||(a=await this.createTodaysJournal()),a&&a instanceof b.TFile&&await this.app.workspace.getLeaf().openFile(a)}async openTodaysDigDeeper(){let t=this.getToday(),e=D(t),o=(0,b.normalizePath)(`${this.settings.digDeeperFolder}/${e}-prompt.md`),a=this.app.vault.getAbstractFileByPath(o);a||(a=await this.createDigDeeperIfNeeded()),a&&a instanceof b.TFile&&await this.app.workspace.getLeaf().openFile(a)}async openDailyByOffset(t){let e=new Date,o=this.app.workspace.getActiveFile(),a=e;if(o){let n=o.basename.match(/^(\d{4}-\d{2}-\d{2})/);if(n){let h=new Date(n[1]+"T12:00:00");isNaN(h.getTime())||(a=h)}}let r=new Date(a);r.setDate(r.getDate()+t);let l=D(r),u=(0,b.normalizePath)(`${this.settings.dailyFolder}/${l}.md`),s=this.app.vault.getAbstractFileByPath(u);if(!s){await F(this.app,this.settings.dailyFolder);let n=this.templateEngine.generateDaily(l,j(r));s=await this.safeCreate(u,n)}s&&s instanceof b.TFile&&await this.app.workspace.getLeaf().openFile(s)}};function V(i){return(t,e,o)=>{var s;let a=t.trim().split(",").map(n=>n.trim()).filter(n=>n);if(a.length===0)return;let r=p(i,o.sourcePath),l=[];if(r){let n=i.metadataCache.getFileCache(r);(s=n==null?void 0:n.frontmatter)!=null&&s.emotions&&(l=n.frontmatter.emotions)}let u=e.createDiv({cls:"gj-emotion-grid"});a.forEach(n=>{let h=u.createEl("button",{cls:"gj-emotion-chip",text:n});l.includes(n)&&h.addClass("gj-emotion-selected"),h.addEventListener("click",async()=>{let m=p(i,o.sourcePath);m&&await k(i,m,c=>{c.emotions||(c.emotions=[]);let y=c.emotions.indexOf(n);y>=0?(c.emotions.splice(y,1),h.removeClass("gj-emotion-selected")):(c.emotions.push(n),h.addClass("gj-emotion-selected"))})})})}}function K(i){return(t,e,o)=>{var y;let a=p(i,o.sourcePath);if(!a)return;let r=i.metadataCache.getFileCache(a),l=((y=r==null?void 0:r.frontmatter)==null?void 0:y.habits)||{},s=e.createDiv({cls:"gj-habit-tracker"}).createEl("table",{cls:"gj-habit-table"}),h=s.createEl("thead").createEl("tr");h.createEl("th",{text:"Habit"}),Y.forEach(d=>h.createEl("th",{text:d}));let m=s.createEl("tbody"),c=Object.keys(l).filter(d=>d.trim());if(c.length===0){let f=m.createEl("tr").createEl("td",{attr:{colspan:"8"},text:"No habits configured. Add them in plugin settings."});f.style.textAlign="center",f.style.opacity="0.6";return}c.forEach(d=>{let f=m.createEl("tr");f.createEl("td",{text:d,cls:"gj-habit-name"}),(l[d]||[!1,!1,!1,!1,!1,!1,!1]).forEach((w,g)=>{let P=f.createEl("td",{cls:"gj-habit-cell"}).createEl("div",{cls:`gj-habit-check ${w?"gj-habit-checked":""}`});P.addEventListener("click",async()=>{let C=p(i,o.sourcePath);C&&await k(i,C,x=>{x.habits||(x.habits={}),x.habits[d]||(x.habits[d]=[!1,!1,!1,!1,!1,!1,!1]),x.habits[d][g]=!x.habits[d][g],x.habits[d][g]?P.addClass("gj-habit-checked"):P.removeClass("gj-habit-checked")})})})})}}function z(i){return(t,e,o)=>{var c;let a=p(i,o.sourcePath);if(!a)return;let l=t.trim()==="week_rating"?"week_rating":"mood",u=i.metadataCache.getFileCache(a),s=((c=u==null?void 0:u.frontmatter)==null?void 0:c[l])||0,n=e.createDiv({cls:"gj-mood-tracker"}),h=n.createDiv({cls:"gj-mood-label"});h.setText(s>0?`${s} / 10`:"Rate");let m=n.createDiv({cls:"gj-mood-scale"});for(let y=1;y<=10;y++)m.createEl("button",{cls:`gj-mood-dot ${y<=s?"gj-mood-active":""}`,text:String(y)}).addEventListener("click",async()=>{let f=p(i,o.sourcePath);f&&(await k(i,f,W=>{W[l]=y}),h.setText(`${y} / 10`),m.querySelectorAll(".gj-mood-dot").forEach((W,w)=>{w<y?W.addClass("gj-mood-active"):W.removeClass("gj-mood-active")}))})}}var Z=[0,.5,1,2,3,4,5,6,7,8],ye=["0","0.5","1","2","3","4","5","6","7","8+"];function X(i){return(t,e,o)=>{var n;let a=p(i,o.sourcePath);if(!a)return;let r=i.metadataCache.getFileCache(a),l=((n=r==null?void 0:r.frontmatter)==null?void 0:n.time_tracker)||{tasks:0,distractions:0,self_care:0},u=e.createDiv({cls:"gj-time-tracker"});[{label:"Tasks",fmKey:"tasks"},{label:"Distractions",fmKey:"distractions"},{label:"Self-Care",fmKey:"self_care"}].forEach(h=>{let m=u.createDiv({cls:"gj-time-row"});m.createDiv({cls:"gj-time-label",text:h.label});let c=m.createDiv({cls:"gj-time-bar"}),y=l[h.fmKey]||0;Z.forEach((d,f)=>{c.createEl("button",{cls:`gj-time-segment ${d<=y&&y>0?"gj-time-filled":""}`,text:ye[f]}).addEventListener("click",async()=>{let w=p(i,o.sourcePath);w&&(await k(i,w,g=>{g.time_tracker||(g.time_tracker={tasks:0,distractions:0,self_care:0}),g.time_tracker[h.fmKey]=d}),c.querySelectorAll(".gj-time-segment").forEach((g,S)=>{Z[S]<=d&&d>0?g.addClass("gj-time-filled"):g.removeClass("gj-time-filled")}))})})})}}var pe=["pending","done","delay","delete"],me={pending:"",done:"Done",delay:"Delay",delete:"Delete"};function ee(i){return(t,e,o)=>{var s;let a=p(i,o.sourcePath);if(!a)return;let r=i.metadataCache.getFileCache(a),l=((s=r==null?void 0:r.frontmatter)==null?void 0:s.priorities)||[{text:"",status:"pending"},{text:"",status:"pending"},{text:"",status:"pending"}],u=e.createDiv({cls:"gj-priorities"});l.forEach((n,h)=>{let m=u.createDiv({cls:"gj-priority-row"});m.createDiv({cls:"gj-priority-num",text:`${h+1}.`});let c=m.createEl("input",{cls:"gj-priority-input",attr:{type:"text",placeholder:"Enter priority...",value:n.text||""}});c.addEventListener("change",async()=>{let d=p(i,o.sourcePath);d&&await k(i,d,f=>{f.priorities||(f.priorities=[]),f.priorities[h]||(f.priorities[h]={text:"",status:"pending"}),f.priorities[h].text=c.value})});let y=m.createDiv({cls:"gj-priority-status-group"});pe.forEach(d=>{if(d==="pending")return;let f=y.createEl("button",{cls:`gj-priority-btn gj-priority-${d} ${n.status===d?"gj-priority-active":""}`,text:me[d]});f.addEventListener("click",async()=>{let W=p(i,o.sourcePath);if(!W)return;let w=n.status===d?"pending":d;await k(i,W,g=>{g.priorities||(g.priorities=[]),g.priorities[h]||(g.priorities[h]={text:"",status:"pending"}),g.priorities[h].status=w}),y.querySelectorAll(".gj-priority-btn").forEach(g=>g.removeClass("gj-priority-active")),w!=="pending"&&f.addClass("gj-priority-active"),n.status=w})})})}}var te=require("obsidian");function oe(i,t){return(e,o,a)=>{let l=e.trim().split("-");if(l.length!==2)return;let u=parseInt(l[0]),s=parseInt(l[1]);if(isNaN(u)||isNaN(s))return;let n=o.createDiv({cls:"gj-calendar"}),h=["January","February","March","April","May","June","July","August","September","October","November","December"];n.createDiv({cls:"gj-calendar-header"}).createEl("span",{text:`${h[s-1]} ${u}`});let c=n.createDiv({cls:"gj-calendar-grid"});["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].forEach(P=>{c.createDiv({cls:"gj-calendar-day-header",text:P})});let d=new Date(u,s-1,1),W=new Date(u,s,0).getDate(),w=d.getDay();w=w===0?6:w-1;for(let P=0;P<w;P++)c.createDiv({cls:"gj-calendar-cell gj-calendar-empty"});let S=D(new Date);for(let P=1;P<=W;P++){let C=`${u}-${String(s).padStart(2,"0")}-${String(P).padStart(2,"0")}`,x=c.createDiv({cls:`gj-calendar-cell ${C===S?"gj-calendar-today":""}`,text:String(P)}),J=`${t.dailyFolder}/${C}.md`;i.vault.getAbstractFileByPath(J)&&(x.addClass("gj-calendar-has-note"),x.addEventListener("click",()=>{let I=i.vault.getAbstractFileByPath(J);I&&I instanceof te.TFile&&i.workspace.getLeaf().openFile(I)}))}}}function ae(i){return(t,e,o)=>{var s;let a=t.trim().split(",").map(n=>n.trim()).filter(n=>n);if(a.length===0)return;let r=p(i,o.sourcePath),l={};if(r){let n=i.metadataCache.getFileCache(r);l=((s=n==null?void 0:n.frontmatter)==null?void 0:s.self_care_plan)||{}}let u=e.createDiv({cls:"gj-self-care"});a.forEach(n=>{let h=u.createDiv({cls:"gj-self-care-card"}),m=h.createDiv({cls:"gj-self-care-icon"}),c=q[n];c?m.innerHTML=c:m.setText(n.charAt(0)),h.createDiv({cls:"gj-self-care-label",text:n});let y=h.createEl("input",{cls:"gj-self-care-input",attr:{type:"text",placeholder:`${n} activity...`,value:l[n]||""}});y.addEventListener("change",async()=>{let d=p(i,o.sourcePath);d&&await k(i,d,f=>{f.self_care_plan||(f.self_care_plan={}),f.self_care_plan[n]=y.value})})})}}function ie(i){return(t,e,o)=>{var s;let a=p(i,o.sourcePath);if(!a)return;let r=i.metadataCache.getFileCache(a),l=((s=r==null?void 0:r.frontmatter)==null?void 0:s.focus_areas)||[],u=e.createDiv({cls:"gj-focus-selector"});G.forEach(n=>{let h=u.createEl("button",{cls:`gj-focus-chip ${l.includes(n)?"gj-focus-selected":""}`,text:n});h.addEventListener("click",async()=>{let m=p(i,o.sourcePath);m&&await k(i,m,c=>{c.focus_areas||(c.focus_areas=[]);let y=c.focus_areas.indexOf(n);y>=0?(c.focus_areas.splice(y,1),h.removeClass("gj-focus-selected")):(c.focus_areas.push(n),h.addClass("gj-focus-selected"))})})})}}var fe=["6:00 AM","7:00 AM","8:00 AM","9:00 AM","10:00 AM","11:00 AM","12:00 PM","1:00 PM","2:00 PM","3:00 PM","4:00 PM","5:00 PM","6:00 PM","7:00 PM","8:00 PM","9:00 PM"];function re(i){return(t,e,o)=>{var u;let a=p(i,o.sourcePath),r={};if(a){let s=i.metadataCache.getFileCache(a);r=((u=s==null?void 0:s.frontmatter)==null?void 0:u.schedule)||{}}let l=e.createDiv({cls:"gj-schedule"});fe.forEach(s=>{let n=l.createDiv({cls:"gj-schedule-row"});n.createDiv({cls:"gj-schedule-time",text:s});let h=n.createEl("input",{cls:"gj-schedule-input",attr:{type:"text",placeholder:"",value:r[s]||""}});h.addEventListener("change",async()=>{let m=p(i,o.sourcePath);m&&await k(i,m,c=>{c.schedule||(c.schedule={}),c.schedule[s]=h.value})})})}}function se(i){return(t,e,o)=>{var u;let a=p(i,o.sourcePath),r={};if(a){let s=i.metadataCache.getFileCache(a);r=((u=s==null?void 0:s.frontmatter)==null?void 0:u.workout)||{}}let l=e.createDiv({cls:"gj-workout"});R.forEach(s=>{let n=s.toLowerCase(),h=r[n]||{activity:"",nutrition:""},m=l.createDiv({cls:"gj-workout-card"});m.createDiv({cls:"gj-workout-day",text:s});let c=m.createDiv({cls:"gj-workout-fields"}),y=c.createDiv({cls:"gj-workout-field-row"});y.createEl("label",{cls:"gj-workout-label",text:"Activity"});let d=y.createEl("input",{cls:"gj-workout-input",attr:{type:"text",placeholder:"Activity...",value:h.activity||""}});d.addEventListener("change",async()=>{let w=p(i,o.sourcePath);w&&await k(i,w,g=>{g.workout||(g.workout={}),g.workout[n]||(g.workout[n]={activity:"",nutrition:""}),g.workout[n].activity=d.value})});let f=c.createDiv({cls:"gj-workout-field-row"});f.createEl("label",{cls:"gj-workout-label",text:"Nutrition"});let W=f.createEl("input",{cls:"gj-workout-input",attr:{type:"text",placeholder:"Nutrition...",value:h.nutrition||""}});W.addEventListener("change",async()=>{let w=p(i,o.sourcePath);w&&await k(i,w,g=>{g.workout||(g.workout={}),g.workout[n]||(g.workout[n]={activity:"",nutrition:""}),g.workout[n].nutrition=W.value})})})}}var _=class extends ne.Plugin{constructor(){super(...arguments);this.settings=B;this.pluginData=E;this.data_={}}async onload(){await this.loadAllData(),this.journalManager=new H(this.app,this.settings,this.pluginData,()=>this.saveAllData()),this.applyTheme(),this.registerMarkdownCodeBlockProcessor("emotion-grid",V(this.app)),this.registerMarkdownCodeBlockProcessor("habit-tracker",K(this.app)),this.registerMarkdownCodeBlockProcessor("mood-tracker",z(this.app)),this.registerMarkdownCodeBlockProcessor("time-tracker",X(this.app)),this.registerMarkdownCodeBlockProcessor("priorities",ee(this.app)),this.registerMarkdownCodeBlockProcessor("monthly-calendar",oe(this.app,this.settings)),this.registerMarkdownCodeBlockProcessor("self-care",ae(this.app)),this.registerMarkdownCodeBlockProcessor("focus-selector",ie(this.app)),this.registerMarkdownCodeBlockProcessor("schedule",re(this.app)),this.registerMarkdownCodeBlockProcessor("workout-planner",se(this.app)),this.addRibbonIcon("book-open","Open today's journal",async()=>{await this.journalManager.openTodaysDaily()}),this.addCommand({id:"open-daily-journal",name:"Open today's daily journal",callback:()=>this.journalManager.openTodaysDaily()}),this.addCommand({id:"create-daily-journal",name:"Create today's daily journal",callback:async()=>{let e=await this.journalManager.createTodaysJournal();e&&await this.app.workspace.getLeaf().openFile(e)}}),this.addCommand({id:"create-weekly-journal",name:"Create this week's journal",callback:async()=>{let e=await this.journalManager.createThisWeeksJournal();e&&await this.app.workspace.getLeaf().openFile(e)}}),this.addCommand({id:"create-monthly-journal",name:"Create this month's journal",callback:async()=>{let e=await this.journalManager.createThisMonthsJournal();e&&await this.app.workspace.getLeaf().openFile(e)}}),this.addCommand({id:"open-dig-deeper",name:"Open today's Dig Deeper prompt",callback:()=>this.journalManager.openTodaysDigDeeper()}),this.addCommand({id:"prev-daily",name:"Go to previous day's journal",callback:()=>this.journalManager.openDailyByOffset(-1)}),this.addCommand({id:"next-daily",name:"Go to next day's journal",callback:()=>this.journalManager.openDailyByOffset(1)}),this.addSettingTab(new M(this.app,this)),this.app.workspace.onLayoutReady(async()=>{let e=await this.journalManager.runStartupRoutine();this.settings.openDailyOnStartup&&e&&await this.app.workspace.getLeaf().openFile(e)})}onunload(){document.body.removeClass("gj-theme-paper","gj-theme-minimal","gj-theme-dark")}applyTheme(){document.body.removeClass("gj-theme-paper","gj-theme-minimal","gj-theme-dark"),document.body.addClass(`gj-theme-${this.settings.journalTheme}`)}async loadAllData(){var e;this.data_=await this.loadData()||{},this.settings=Object.assign({},B,this.data_.settings||{}),this.pluginData=Object.assign({},E,this.data_.pluginData||{}),this.pluginData.questionBank&&(this.pluginData.questionBank=Object.assign({},E.questionBank,((e=this.data_.pluginData)==null?void 0:e.questionBank)||{}))}async saveAllData(){this.data_.settings=this.settings,this.data_.pluginData=this.pluginData,await this.saveData(this.data_)}async saveSettings(){await this.saveAllData(),this.applyTheme()}};
