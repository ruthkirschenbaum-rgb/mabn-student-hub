const opportunities = [
  {id:1,date:'2026-09-15',day:'15',month:'SEP',title:'Neuroscience 2026 Late-Breaking Abstract',org:'Society for Neuroscience',type:['Poster','Conference'],place:'Washington, DC',format:'Deadline · 5:00 p.m. EDT',amount:'$260 submission fee',urgent:true,url:'https://www.sfn.org/meetings/neuroscience-2026/late-breaking-abstracts'},
  {id:14,date:'2026-09-18',day:'18',month:'SEP',title:'Neurodegenerative Diseases: Biology & Therapeutics',org:'Cold Spring Harbor Laboratory',type:['Conference','Poster'],place:'Cold Spring Harbor, NY · December 1–4',format:'Abstract deadline',amount:'Student aid may be available',urgent:true,url:'https://meetings.cshl.edu/meetings.aspx?meet=degen'},
  {id:2,date:'2026-09-22',day:'22',month:'SEP',title:'CNS 2027 Symposium Proposal',org:'Cognitive Neuroscience Society',type:['Conference'],place:'Boston, MA · March 20–23, 2027',format:'Proposal deadline',amount:'September 22',urgent:true,url:'https://www.cogneurosociety.org/submit-a-symposium/'},
  {id:15,date:'2026-10-09',day:'09',month:'OCT',title:'Development & 3D Modeling of the Human Brain',org:'Cold Spring Harbor Laboratory',type:['Conference','Poster'],place:'Cold Spring Harbor, NY · December 7–10',format:'Abstract deadline · in person only',amount:'Graduate-student aid may be available',urgent:false,url:'https://meetings.cshl.edu/meetings.aspx?meet=BRAIN'},
  {id:3,date:'2026-09-30',day:'30',month:'SEP',title:'MABN Coffee & Chat',org:'MABN Student Representatives',type:['MABN Event'],place:'Science Building',format:'Open to all MABN students',amount:'Details TBD',urgent:false,url:'',calendarKind:'event'},
  {id:16,date:'2026-10-09',day:'09',month:'OCT',title:'INBC 2026: Neurology & Brain Disorders',org:'Magnus Group',type:['Conference','Poster'],place:'Boston/Woburn + online · October 19–21',format:'Final abstract deadline · commercial conference',amount:'Presenter: $439–$639 virtual; $739–$939 in person',urgent:false,url:'https://neurologycongress.com/information/important-dates'},
  {id:4,date:'2026-10-20',day:'20',month:'OCT',title:'NSF Graduate Research Fellowship Program',org:'National Science Foundation',type:['Award'],place:'Psychology & Social Sciences deadline',format:'First-year graduate students only',amount:'Thesis-based program and research eligibility rules apply',urgent:false,url:'https://www.nsf.gov/funding/opportunities/grfp-nsf-graduate-research-fellowship-program/nsf26-526/solicitation'},
  {id:21,date:'',day:'TBD',month:'DATE',title:'Neuropsych Research Day',org:'Queens College',type:['Conference'],place:'Queens College',format:'Date and details TBA',amount:'Awaiting official confirmation',urgent:false,url:'https://www.qc.cuny.edu/academics/psychology/research-day/',calendarKind:'event'},
  {id:17,date:'2026-11-01',day:'01',month:'NOV',title:'Music Has Power Student Research Showcase',org:'CUNY ASRC + Institute for Music and Neurologic Function',type:['Poster','Conference'],place:'CUNY Graduate Center · November 9, 12:00–5:30 p.m.',format:'Poster showcase submission deadline',amount:'Event is free and open to the public',urgent:false,url:'https://asrc.gc.cuny.edu/event/save-the-date-2026-music-has-power-symposium-awards/'},
  {id:6,date:'2026-11-03',day:'03',month:'NOV',title:'CNS 2027 Poster & Travel Award',org:'Cognitive Neuroscience Society',type:['Poster','Conference','Award'],place:'Boston, MA · March 20–23, 2027',format:'Poster and travel award deadline',amount:'$500 travel award available',urgent:false,url:'https://www.cogneurosociety.org/travel-award/'},
  {id:7,date:'2026-11-14',endDate:'2026-11-19',day:'14',month:'NOV',title:'Neuroscience 2026 Annual Meeting',org:'Society for Neuroscience',type:['Conference'],place:'Washington, DC',format:'Conference dates',amount:'November 14–18',urgent:false,url:'https://www.sfn.org/meetings/neuroscience-2026',calendarKind:'event'},
  {id:5,date:'2026-11-20',day:'20',month:'NOV',title:'MABN Data Blitz',org:'MABN Student Representatives',type:['MABN Event'],place:'Science Building',format:'Friday, November 20',amount:'Time and details TBD',urgent:false,url:'',calendarKind:'event'},
  {id:22,date:'2026-11-30',day:'30',month:'NOV',title:'INS Boston 2027 Early Registration',org:'International Neuropsychological Society',type:['Conference'],place:'Boston, MA · conference February 10–13, 2027',format:'Discounted in-training registration deadline',amount:'$143 through November 30 · abstract submissions closed',urgent:false,url:'https://ins-boston-2027.oa-event.com/registration'},
  {id:18,date:'2026-12-01',day:'01',month:'DEC',title:'EPA 2027 Annual Meeting',org:'Eastern Psychological Association',type:['Conference','Poster'],place:'Philadelphia, PA · February 25–27, 2027',format:'Submission deadline · 5:00 p.m. EST',amount:'Current EPA membership required to submit',urgent:false,url:'https://www.easternpsychological.org/i4a/pages/index.cfm?pageID=3501'},
  {id:19,date:'',day:'TBD',month:'SPRING',title:'Greater New York SfN Annual Symposium',org:'Greater New York Chapter, Society for Neuroscience',type:['Conference','Poster'],place:'New York City area',format:'2027 symposium & trainee poster details',amount:'TBD · watch for the official announcement',urgent:false,url:'https://my.sfn.org/Directories/SfN-Chapters/Chapter-Home-Page?pa_chapterid=%7B4C0E121E-E3C1-EA11-A812-000D3A3156C1%7D'},
  {id:23,date:'2027-02-10',endDate:'2027-02-14',day:'10',month:'FEB',title:'INS 2027 Annual Meeting: From Neurocircuits to People',org:'International Neuropsychological Society',type:['Conference'],place:'Boston, MA',format:'Conference dates',amount:'February 10–13 · abstract submissions closed',urgent:false,url:'https://ins-boston-2027.oa-event.com/',calendarKind:'event'},
  {id:8,date:'2027-03-20',endDate:'2027-03-24',day:'20',month:'MAR',title:'CNS 2027 Annual Meeting',org:'Cognitive Neuroscience Society',type:['Conference'],place:'Boston, MA',format:'Conference dates',amount:'March 20–23',urgent:false,url:'https://www.cogneurosociety.org/annual-meeting/',calendarKind:'event'},
  {id:9,date:'2027-04-11',day:'11',month:'APR',title:'NEURON 2027 Conference',org:'Northeast Undergraduate and Research Organization for Neuroscience',type:['Conference','Poster'],place:'Quinnipiac University',format:'Conference date',amount:'April 11, 2027',urgent:false,url:'https://calendar.qu.edu/event/51393-neuron-2027',calendarKind:'event'},
  {id:20,date:'',day:'EXPECTED',month:'MAY–JUN',title:'2027 Trainee Professional Development Award',org:'Society for Neuroscience',type:['Award'],place:'Presenting authors with active SfN membership',format:'Anticipated application window',amount:'May–June 2027 · confirm when SfN announces dates',urgent:false,url:'https://www.sfn.org/tpda'},
  {id:11,date:'',day:'OPEN',month:'ONGOING',title:'CITI Training: Research with Animals',org:'Queens College',type:['Training'],place:'Online',format:'Required training',amount:'Self-paced',urgent:false,url:'https://www.qc.cuny.edu/academics/ratqc/citi-training/',trainingOnly:true},
  {id:12,date:'',day:'OPEN',month:'ONGOING',title:'CITI Training: Research with Human Participants',org:'Queens College',type:['Training'],place:'Online',format:'Required training',amount:'Self-paced',urgent:false,url:'https://www.qc.cuny.edu/academics/orc/citi-training/',trainingOnly:true},
  {id:13,date:'',day:'—',month:'2026–27',title:'Teacher Apprentice Program (TAP)',org:'MABN Program',type:['Training'],place:'Queens College',format:'Program status',amount:'Not offered this year',urgent:false,url:'',trainingOnly:true},
];

// Conference dates stay visible independently after a submission deadline passes.
// Dates below come from the existing listings; endDate is exclusive for calendar files.
const conferenceEvents = [
  {id:24,date:'2026-12-01',endDate:'2026-12-05',title:'Neurodegenerative Diseases: Biology & Therapeutics',org:'Cold Spring Harbor Laboratory',type:['Conference'],place:'Cold Spring Harbor, NY',format:'Conference dates',amount:'Student aid may be available',url:'https://meetings.cshl.edu/meetings.aspx?meet=degen',calendarKind:'event'},
  {id:25,date:'2026-12-07',endDate:'2026-12-11',title:'Development & 3D Modeling of the Human Brain',org:'Cold Spring Harbor Laboratory',type:['Conference'],place:'Cold Spring Harbor, NY',format:'In person only',amount:'Graduate-student aid may be available',url:'https://meetings.cshl.edu/meetings.aspx?meet=BRAIN',calendarKind:'event'},
  {id:26,date:'2026-10-19',endDate:'2026-10-22',title:'INBC 2026: Neurology & Brain Disorders',org:'Magnus Group',type:['Conference'],place:'Boston/Woburn + online',format:'Commercial conference',amount:'Presenter: $439–$639 virtual; $739–$939 in person',url:'https://neurologycongress.com/information/important-dates',calendarKind:'event'},
  {id:27,date:'2026-11-09',dateLabel:'Event date',title:'Music Has Power Student Research Showcase',org:'CUNY ASRC + Institute for Music and Neurologic Function',type:['Conference'],place:'CUNY Graduate Center',format:'12:00–5:30 p.m.',amount:'Free and open to the public',url:'https://asrc.gc.cuny.edu/event/save-the-date-2026-music-has-power-symposium-awards/',calendarKind:'event'},
  {id:28,date:'2027-02-25',endDate:'2027-02-28',title:'EPA 2027 Annual Meeting',org:'Eastern Psychological Association',type:['Conference'],place:'Philadelphia, PA',format:'Conference dates',amount:'See organizer for registration details',url:'https://www.easternpsychological.org/i4a/pages/index.cfm?pageID=3501',calendarKind:'event'},
];
opportunities.push(...conferenceEvents);
const deadlineDetails = {
  1:{dateLabel:'Abstract deadline',conferenceId:7},
  14:{dateLabel:'Abstract deadline',conferenceId:24,place:'Cold Spring Harbor, NY'},
  2:{dateLabel:'Symposium proposal deadline',conferenceId:8,place:'Boston, MA'},
  15:{dateLabel:'Abstract deadline',conferenceId:25,place:'Cold Spring Harbor, NY'},
  16:{dateLabel:'Abstract deadline',conferenceId:26,place:'Boston/Woburn + online'},
  4:{dateLabel:'Fellowship application deadline'},
  17:{dateLabel:'Poster submission deadline',conferenceId:27,place:'CUNY Graduate Center'},
  6:{dateLabel:'Poster & travel award deadline',conferenceId:8,place:'Boston, MA'},
  22:{dateLabel:'Early registration deadline',conferenceId:23,place:'Boston, MA'},
  18:{dateLabel:'Submission deadline',conferenceId:28,place:'Philadelphia, PA'},
};
opportunities.forEach(o=>Object.assign(o,deadlineDetails[o.id]||{}));

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
  `<p>NEXT DEADLINE</p><strong id="deadline-countdown">${d}</strong><span>${d===1?'day':'days'}</span><div><b>${nextDeadline.title}</b><small>${nextDeadline.dateLabel||'Deadline'} · ${d===0?'Due today':'Due '+longDate(nextDeadline.date)}</small></div>`}
  else deadlineCard.style.display='none'}

// Keep dates and their meaning together at every screen size.
const escapeHTML=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const fullDate=iso=>new Date(iso+'T12:00:00Z').toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric',timeZone:'UTC'});
function dateRange(o){
  if(!o.date)return o.trainingOnly?(o.id===13?'Not offered in 2026–27':'Ongoing · self-paced'):'Date to be announced';
  if(!o.endDate)return fullDate(o.date);
  const last=new Date(o.endDate+'T12:00:00Z');
  last.setUTCDate(last.getUTCDate()-1);
  return `${fullDate(o.date)} – ${fullDate(last.toISOString().slice(0,10))}`;
}
const dateLabel=o=>o.dateLabel||(o.trainingOnly?'Availability':null)||(isEvent(o)?(o.type.includes('Conference')?'Conference dates':'Event date'):(o.date?'Application deadline':'Date / status'));
function calendarButton(o,label){return `<button class="calendar-button" data-cal="${o.id}" aria-label="${escapeHTML(label+': '+o.title)}">${label}<span aria-hidden="true"> ↓</span></button>`}
function card(o,past){
  const conference=opportunities.find(event=>event.id===o.conferenceId);
  const kind=isEvent(o)?'event':(o.date?'deadline':'announcement');
  return `<article class="opportunity${past?' is-past':''}">
    <div class="date" aria-hidden="true"><small>${o.date?new Date(o.date+'T12:00:00Z').toLocaleDateString('en-US',{month:'short',timeZone:'UTC'}):o.month}</small><strong>${o.date?o.date.slice(8):o.day}</strong>${o.date?`<small>${o.date.slice(0,4)}</small>`:''}</div>
    <div class="main-info">
      <div class="listing-tags"><span class="tag tag-${kind}">${isEvent(o)?(o.type.includes('Conference')?'Conference':'Event'):(o.date?'Deadline':(o.trainingOnly?'Training':'Announcement'))}</span>${o.urgent&&!past?'<span class="tag urgent">Closing soon</span>':''}${past?'<span class="tag">Past</span>':''}</div>
      <h3>${escapeHTML(o.title)}</h3>
      <p class="organizer">${escapeHTML(o.org)} · ${escapeHTML(o.place)}</p>
      <dl class="schedule"><div><dt>${dateLabel(o)}</dt><dd>${dateRange(o)}</dd></div>${conference?`<div><dt>${conference.id===27?'Event date':'Conference dates'}</dt><dd>${dateRange(conference)}</dd></div>`:''}</dl>
      <p class="listing-detail">${escapeHTML(o.format)} · ${escapeHTML(o.amount)}</p>
    </div>
    <div class="actions">${o.url?`<a class="official-link" href="${escapeHTML(o.url)}" target="_blank" rel="noreferrer" aria-label="${escapeHTML('Visit official site for '+o.title+' (opens in a new tab)')}">Visit official site <span aria-hidden="true">↗</span></a>`:''}${o.date&&!past?calendarButton(o,isEvent(o)?(o.type.includes('Conference')?'Add conference to calendar':'Add event to calendar'):'Add deadline to calendar'):''}${conference&&!isPast(conference)?calendarButton(conference,conference.id===27?'Add event to calendar':'Add conference to calendar'):''}</div>
  </article>`;
}
const pastItems=opportunities.filter(isPast).sort((a,b)=>b.date.localeCompare(a.date)); // most recent first
const pastSection=document.getElementById('past-section'), pastList=document.getElementById('past-list'), pastCount=document.getElementById('past-count');

function render(){
  const q=search.value.trim().toLowerCase();
  const match=o=>((active==='All'&&!o.trainingOnly)||o.type.includes(active))&&(!q||[o.title,o.org,o.place,o.type.join(' ')].join(' ').toLowerCase().includes(q));
  const rows=current.filter(match).sort((a,b)=>{
    if(a.date&&b.date)return a.date.localeCompare(b.date);
    if(a.date)return -1;
    if(b.date)return 1;
    return 0;
  });
  list.innerHTML=rows.map(o=>card(o,false)).join('');
  empty.style.display=rows.length?'none':'flex';
  if(pastSection){const pastRows=pastItems.filter(match);
    pastList.innerHTML=pastRows.map(o=>card(o,true)).join('');
    pastCount.textContent=pastRows.length;
    pastSection.style.display=pastRows.length?'':'none';}
}
document.getElementById('filters').addEventListener('click',e=>{if(!e.target.matches('.chip'))return;document.querySelectorAll('.chip').forEach(c=>c.classList.remove('active'));e.target.classList.add('active');active=e.target.dataset.filter;render()});
search.addEventListener('input',render);
document.querySelector('.board').addEventListener('click',e=>{
  const cal=e.target.closest('[data-cal]');if(cal){downloadICS(opportunities.find(o=>o.id===+cal.dataset.cal))}
});
document.getElementById('past-list').addEventListener('click',e=>{const cal=e.target.closest('[data-cal]');if(cal)downloadICS(opportunities.find(o=>o.id===+cal.dataset.cal));});
// RFC 5545: exclusive end dates, escaped text, CRLF, and folded UTF-8 lines.
const escapeICS=value=>String(value).replace(/\\/g,'\\\\').replace(/\r?\n/g,'\\n').replace(/;/g,'\\;').replace(/,/g,'\\,');
function foldICS(line){
  const lines=[];let part='',bytes=0;
  for(const char of line){const size=new TextEncoder().encode(char).length;if(bytes+size>75){lines.push(part);part=' ';bytes=1;}part+=char;bytes+=size;}
  lines.push(part);return lines.join('\r\n');
}
function buildICS(o){
  const nextDay=new Date(o.date+'T12:00:00Z');nextDay.setUTCDate(nextDay.getUTCDate()+1);
  const description=`${o.org}\n${dateLabel(o)}: ${dateRange(o)}\n${o.format}\n${o.amount}\nAll-day calendar reminder. Check the official site for times and submission cutoffs.`;
  return [
    'BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//MABN Student Hub//Opportunities//EN','CALSCALE:GREGORIAN','BEGIN:VEVENT',
    `UID:mabn-opportunity-${o.id}@mabn-student-hub`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g,'').replace(/\.\d{3}/,'')}`,
    `DTSTART;VALUE=DATE:${o.date.replaceAll('-','')}`,
    `DTEND;VALUE=DATE:${(o.endDate||nextDay.toISOString().slice(0,10)).replaceAll('-','')}`,
    `SUMMARY:${escapeICS((isEvent(o)?'':dateLabel(o)+': ')+o.title)}`,
    `DESCRIPTION:${escapeICS(description)}`,`LOCATION:${escapeICS(o.place)}`,
    ...(o.url?[`URL:${o.url}`]:[]),'END:VEVENT','END:VCALENDAR',''
  ].map(foldICS).join('\r\n');
}
function downloadICS(o){
  const a=document.createElement('a');
  a.href=URL.createObjectURL(new Blob([buildICS(o)],{type:'text/calendar;charset=utf-8'}));
  a.download=`${isEvent(o)?'event':'deadline'}-${o.title.toLowerCase().replace(/[^a-z0-9]+/g,'-')}.ics`;
  document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(a.href),1000);
}
render();

// Count one visit per browser-tab session; only the aggregate is stored server-side.
async function loadVisitCount(){
  const counter=document.getElementById('visit-count');
  try{
    let counted=false;
    try{counted=sessionStorage.getItem('mabn-visit-counted')==='1';}catch{}
    const response=await fetch('/api/visits',{method:counted?'GET':'POST',credentials:'omit',cache:'no-store',headers:counted?{}:{'Content-Type':'application/json'},...(counted?{}:{body:'{}'})});
    if(!response.ok)return;
    const data=await response.json();
    if(!Number.isSafeInteger(data.count)||data.count<0)return;
    try{sessionStorage.setItem('mabn-visit-counted','1');}catch{}
    counter.textContent=new Intl.NumberFormat('en-US').format(data.count);
    counter.setAttribute('aria-label',`${data.count} site visits`);counter.hidden=false;
  }catch{/* Leave unavailable counts hidden rather than inventing a number. */}
}
loadVisitCount();

const feedbackForm=document.getElementById('feedback-form');
async function checkFeedbackAvailability(){
  const button=feedbackForm.querySelector('button[type="submit"]');
  const status=document.getElementById('feedback-status');
  try{
    const response=await fetch('/api/feedback',{credentials:'omit',cache:'no-store'});
    const result=await response.json();
    if(response.ok&&result.available){button.disabled=false;status.textContent='';return;}
  }catch{}
  status.textContent='Anonymous feedback is being set up. Please check back soon.';
}
checkFeedbackAvailability();
feedbackForm.addEventListener('submit',async event=>{
  event.preventDefault();
  const message=feedbackForm.elements.message.value.trim();
  const status=document.getElementById('feedback-status');
  if(message.length<5){status.textContent='Please write at least 5 characters.';return;}
  const button=feedbackForm.querySelector('button[type="submit"]');
  button.disabled=true;button.textContent='Sending…';status.textContent='';
  try{
    const response=await fetch('/api/feedback',{method:'POST',credentials:'omit',headers:{'Content-Type':'application/json'},body:JSON.stringify({message,website:feedbackForm.elements.website.value})});
    const result=await response.json().catch(()=>({}));
    if(!response.ok)throw new Error(result.error||'Your message could not be sent. Please try again later.');
    status.textContent='Thank you! Your message has been sent to the MABN student representatives.';
    feedbackForm.reset();
  }catch(error){status.textContent=error.message==='Failed to fetch'?'Could not connect. Your message is still here; please try again.':error.message;}
  finally{button.disabled=false;button.textContent='Send anonymous feedback';}
});
