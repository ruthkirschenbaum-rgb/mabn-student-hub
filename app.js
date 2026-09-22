const opportunities = [
  {id:1,date:'2026-09-15',day:'15',month:'SEP',title:'Neuroscience 2026 Late-Breaking Abstract',org:'Society for Neuroscience',type:['Poster','Conference'],place:'Washington, DC',format:'Deadline · 5:00 p.m. EDT',amount:'$260 submission fee',urgent:true,url:'https://www.sfn.org/meetings/neuroscience-2026/general-information/dates-and-deadlines'},
  {id:14,date:'2026-09-18',day:'18',month:'SEP',title:'Neurodegenerative Diseases: Biology & Therapeutics',org:'Cold Spring Harbor Laboratory',type:['Conference','Poster'],place:'Cold Spring Harbor, NY · December 1–4',format:'Abstract deadline',amount:'Student aid may be available',urgent:true,url:'https://meetings.cshl.edu/meetings.aspx?meet=degen'},
  {id:2,date:'2026-09-22',day:'22',month:'SEP',title:'CNS 2027 Symposium Proposal',org:'Cognitive Neuroscience Society',type:['Conference'],place:'Boston, MA · March 20–23, 2027',format:'Proposal deadline',amount:'September 22',urgent:true,url:'https://www.cogneurosociety.org/dates-and-deadlines/'},
  {id:15,date:'2026-09-25',day:'25',month:'SEP',title:'Development & 3D Modeling of the Human Brain',org:'Cold Spring Harbor Laboratory',type:['Conference','Poster'],place:'Cold Spring Harbor, NY · December 7–10',format:'Abstract deadline · in person only',amount:'Graduate-student aid may be available',urgent:false,url:'https://meetings.cshl.edu/meetings.aspx?meet=brain'},
  {id:3,date:'2026-09-30',day:'30',month:'SEP',title:'MABN Coffee & Chat',org:'MABN Student Representatives',type:['MABN Event'],place:'Science Building',format:'Open to all MABN students',amount:'Details TBD',urgent:false,url:'',calendarKind:'event'},
  {id:16,date:'2026-10-09',day:'09',month:'OCT',title:'INBC 2026: Neurology & Brain Disorders',org:'Magnus Group',type:['Conference','Poster'],place:'Boston/Woburn + online · October 19–21',format:'Final abstract deadline · commercial conference',amount:'Presenter: $439–$639 virtual; $739–$939 in person',urgent:false,url:'https://neurologycongress.com/information/important-dates'},
  {id:4,date:'2026-10-20',day:'20',month:'OCT',title:'NSF Graduate Research Fellowship Program',org:'National Science Foundation',type:['Award'],place:'Psychology & Social Sciences deadline',format:'First-year graduate students only',amount:'Thesis-based program and research eligibility rules apply',urgent:false,url:'https://www.nsf.gov/funding/opportunities/grfp-nsf-graduate-research-fellowship-program/nsf26-526/solicitation'},
    {id:21,date:'2026-10-30',day:'30',month:'OCT',title:'Neuropsych Research Day',org:'Queens College',type:['Conference'],place:'Queens College',format:'Details TBA',amount:'Watch this page for updates',urgent:false,url:'',calendarKind:'event'},
  {id:5,date:'',day:'TBD',month:'SOON',title:'MABN Data Blitz',org:'MABN Student Representatives',type:['MABN Event'],place:'Coming soon',format:'Date',amount:'TBD',urgent:false,url:'',calendarKind:'event'},
  {id:17,date:'2026-11-01',day:'01',month:'NOV',title:'Music Has Power Student Research Showcase',org:'CUNY ASRC + Institute for Music and Neurologic Function',type:['Poster','Conference'],place:'CUNY Graduate Center · event November 9',format:'Poster showcase submission deadline',amount:'Event is free and open to the public',urgent:false,url:'https://asrc.gc.cuny.edu/event/save-the-date-2026-music-has-power-symposium-awards/'},
  {id:6,date:'2026-11-03',day:'03',month:'NOV',title:'CNS 2027 Poster & Travel Award',org:'Cognitive Neuroscience Society',type:['Poster','Conference','Award'],place:'Boston, MA · March 20–23, 2027',format:'Poster and travel award deadline',amount:'$500 travel award available',urgent:false,url:'https://www.cogneurosociety.org/submit-a-poster/'},
  {id:7,date:'2026-11-14',endDate:'2026-11-19',day:'14',month:'NOV',title:'Neuroscience 2026 Annual Meeting',org:'Society for Neuroscience',type:['Conference'],place:'Washington, DC',format:'Conference dates',amount:'November 14–18',urgent:false,url:'https://www.sfn.org/meetings/neuroscience-2026',calendarKind:'event'},
  {id:18,date:'2026-12-01',day:'01',month:'DEC',title:'EPA 2027 Annual Meeting',org:'Eastern Psychological Association',type:['Conference','Poster'],place:'Philadelphia, PA · February 25–27, 2027',format:'Submission deadline · 5:00 p.m.',amount:'Current EPA membership required to submit',urgent:false,url:'https://www.easternpsychological.org/'},
  {id:9,date:'',day:'TBD',month:'SPRING',title:'NEURON 2027 Conference',org:'Northeast Under/graduate Research Organization for Neuroscience',type:['Conference','Poster'],place:'Regional student neuroscience conference',format:'2027 date & poster deadline',amount:'TBD · typically held in early spring',urgent:false,url:'https://nurhopsi.org/'},
  {id:19,date:'',day:'TBD',month:'SPRING',title:'Greater New York SfN Annual Symposium',org:'Greater New York Chapter, Society for Neuroscience',type:['Conference','Poster'],place:'New York City area',format:'2027 symposium & trainee poster details',amount:'TBD · watch for the official announcement',urgent:false,url:'https://www.comebebrainy.com/'},
  {id:8,date:'2027-03-20',endDate:'2027-03-24',day:'20',month:'MAR',title:'CNS 2027 Annual Meeting',org:'Cognitive Neuroscience Society',type:['Conference'],place:'Boston, MA',format:'Conference dates',amount:'March 20–23',urgent:false,url:'https://www.cogneurosociety.org/annual-meeting/',calendarKind:'event'},
  {id:20,date:'',day:'EXPECTED',month:'MAY–JUN',title:'2027 Trainee Professional Development Award',org:'Society for Neuroscience',type:['Award'],place:'First/presenting authors with active trainee membership',format:'Anticipated application window',amount:'May–June 2027 · confirm when SfN announces dates',urgent:false,url:'https://www.sfn.org/tpda'},
  {id:11,date:'',day:'OPEN',month:'ONGOING',title:'CITI Training: Research with Animals',org:'Queens College',type:['Training'],place:'Online',format:'Required training',amount:'Self-paced',urgent:false,url:'https://www.qc.cuny.edu/academics/ratqc/citi-training/',trainingOnly:true},
  {id:12,date:'',day:'OPEN',month:'ONGOING',title:'CITI Training: Research with Human Participants',org:'Queens College',type:['Training'],place:'Online',format:'Required training',amount:'Self-paced',urgent:false,url:'https://www.qc.cuny.edu/academics/orc/citi-training/',trainingOnly:true},
  {id:13,date:'',day:'—',month:'2026–27',title:'Teacher Apprentice Program (TAP)',org:'MABN Program',type:['Training'],place:'Queens College',format:'Program status',amount:'Not offered this year',urgent:false,url:'',trainingOnly:true},
];

let active='All';
const list=document.getElementById('list'), empty=document.getElementById('empty'), search=document.getElementById('search');

// ---- Keep the page current automatically (uses the visitor's date) ----
const pad=n=>String(n).padStart(2,'0');
const now=new Date();
const todayISO=`${now.getFullYear()}-${pad(now.getMonth()+1)}-${pad(now.getDate())}`;
const daysUntil=iso=>Math.round((new Date(iso+'T00:00:00')-new Date(todayISO+'T00:00:00'))/86400000);
const isEvent=o=>o.calendarKind==='event';
// A dated item disappears the day after it happens. endDate is the day AFTER a multi-day event ends (same as the calendar file).
const isPast=o=>!o.date?false:(o.endDate?o.endDate<=todayISO:o.date<todayISO);
const current=opportunities.filter(o=>!isPast(o));
// "Closing soon" = a deadline within the next 7 days
current.forEach(o=>{o.urgent=!!o.date&&!isEvent(o)&&daysUntil(o.date)>=0&&daysUntil(o.date)<=7});

const longDate=iso=>new Date(iso+'T12:00:00').toLocaleDateString('en-US',{month:'long',day:'numeric'});
const shortDate=iso=>new Date(iso+'T12:00:00').toLocaleDateString('en-US',{month:'short',day:'numeric'}).toUpperCase();
const upcoming=current.filter(o=>o.date&&o.date>=todayISO).sort((a,b)=>a.date.localeCompare(b.date));
const nextEvent=upcoming.find(isEvent), nextDeadline=upcoming.find(o=>!isEvent(o));
const eventCard=document.querySelector('.event-card'), deadlineCard=document.querySelector('.deadline-card');
if(eventCard){eventCard.innerHTML=nextEvent
  ?`<p>NEXT EVENT</p><time datetime="${nextEvent.date}"><strong>${shortDate(nextEvent.date)}</strong></time><div><b>${nextEvent.title}</b><small>${nextEvent.place} · ${nextEvent.format}</small></div>`
  :`<p>NEXT EVENT</p><strong>TBA</strong><div><b>More events coming soon</b><small>Check back for updates</small></div>`}
if(deadlineCard){if(nextDeadline){const d=daysUntil(nextDeadline.date);deadlineCard.innerHTML=
  `<p>NEXT DEADLINE</p><strong id="deadline-countdown">${d}</strong><span>${d===1?'day':'days'}</span><div><b>${nextDeadline.title}</b><small>${d===0?'Due today':'Due '+longDate(nextDeadline.date)}</small></div>`}
  else deadlineCard.style.display='none'}

// One listing row. Past items get a "Passed" tag and no add-to-calendar button.
function card(o,past){return `<article class="opportunity${past?' is-past':''}">
    <div class="date"><small>${o.month}</small>${o.day}</div>
    <div class="main-info"><h3>${o.title}</h3><span class="tag ${o.urgent&&!past?'urgent':''}">${past?'Passed':(o.urgent?'Closing soon':o.type[0])}</span></div>
    <div class="meta"><b>${o.org}</b>${o.place}</div>
    <div class="meta"><b>${o.format}</b>${o.amount}</div>
    <div class="actions">${o.date&&!past?`<button class="icon-btn" data-cal="${o.id}" aria-label="Add to calendar">＋</button>`:''}${o.url?`<a class="go" href="${o.url}" target="_blank" rel="noreferrer" aria-label="Visit official opportunity page">↗</a>`:''}</div>
  </article>`}
const pastItems=opportunities.filter(isPast).sort((a,b)=>b.date.localeCompare(a.date)); // most recent first
const pastSection=document.getElementById('past-section'), pastList=document.getElementById('past-list'), pastCount=document.getElementById('past-count');

function render(){
  const q=search.value.trim().toLowerCase();
  const match=o=>((active==='All'&&!o.trainingOnly)||o.type.includes(active))&&(!q||[o.title,o.org,o.place,o.type.join(' ')].join(' ').toLowerCase().includes(q));
  const rows=current.filter(match);
  list.innerHTML=rows.map(o=>card(o,false)).join('');
  empty.style.display=rows.length?'none':'flex';
  if(pastSection){const pastRows=pastItems.filter(match);
    pastList.innerHTML=pastRows.map(o=>card(o,true)).join('');
    pastCount.textContent=pastRows.length;
    pastSection.style.display=pastRows.length?'':'none';}
}
document.getElementById('filters').addEventListener('click',e=>{if(!e.target.matches('.chip'))return;document.querySelectorAll('.chip').forEach(c=>c.classList.remove('active'));e.target.classList.add('active');active=e.target.dataset.filter;render()});
search.addEventListener('input',render);
list.addEventListener('click',e=>{
  const cal=e.target.closest('[data-cal]');if(cal){downloadICS(opportunities.find(o=>o.id===+cal.dataset.cal))}
});
function downloadICS(o){const d=o.date.replaceAll('-','');const nextDay=new Date(`${o.date}T12:00:00Z`);nextDay.setUTCDate(nextDay.getUTCDate()+1);const end=(o.endDate||nextDay.toISOString().slice(0,10)).replaceAll('-','');const prefix=o.calendarKind==='event'?'':'Deadline: ';const body=`BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nDTSTART;VALUE=DATE:${d}\nDTEND;VALUE=DATE:${end}\nSUMMARY:${prefix}${o.title}\nDESCRIPTION:${o.org}\nURL:${o.url}\nEND:VEVENT\nEND:VCALENDAR`;const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([body],{type:'text/calendar'}));a.download=`${o.title.toLowerCase().replace(/[^a-z0-9]+/g,'-')}.ics`;a.click();URL.revokeObjectURL(a.href)}
render();
