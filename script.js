// =============================================
// CORE DATA & STATE
// =============================================
const PASS_DB = {
  'AI250201':'pass123',
  'STF2047':'pass123',
  'DOC001':'pass123',
  'DOC002':'pass123',
  'DEN001':'pass123',
  'DEN002':'pass123',
  'PHA001':'pass123',
  'ADM001':'pass123'
};

const ROLE_DB = {
  'AI250201':'user',
  'STF2047':'user',
  'DOC001':'doctor',
  'DOC002':'doctor',
  'DEN001':'dentist',
  'DEN002':'dentist',
  'PHA001':'pharmacist',
  'ADM001':'admin'
};

const USERS_DB={
'AI250201':{name:'Muhammad Fahim bin Zainuddin',id:'AI250201',role:'user',subRole:'Student',faculty:'Faculty of Computer Science & IT',year:'Year 3',ic:'050403-02-1234',blood:'B+',allergy:'Penicillin',phone:'+60 12-345 6789',email:'ai250201@student.uthm.edu.my',approved:true},
'STF2047':{name:'Dr. Nurul Ain Abdullah',id:'STF2047',role:'user',subRole:'staff',faculty:'Academic Affairs Division',year:'—',ic:'850410-10-4567',blood:'AB+',allergy:'None',phone:'+60 17-890 1234',email:'nurulain@uthm.edu.my',approved:true},
'DOC001':{name:'Dr. Mohd Hafiz Ismail',id:'DOC001',role:'doctor',subRole:'doctor',faculty:'General Practice',year:'—',ic:'750312-01-1234',blood:'O+',allergy:'None',phone:'+60 12-111 2222',email:'hafiz@uthm.edu.my',approved:true,spec:'General Practitioner',exp:'12 yrs',avail:'Mon–Fri',rating:'4.8'},
'DOC002':{name:'Dr. Aminah binti Zulkifli',id:'DOC002',role:'doctor',subRole:'doctor',faculty:'General Practice',year:'—',ic:'800615-03-5678',blood:'A+',allergy:'None',phone:'+60 12-333 4444',email:'aminah@uthm.edu.my',approved:true,spec:'General Practitioner',exp:'8 yrs',avail:'Mon–Wed',rating:'4.7'},
'DEN001':{name:'Dr. Siti Norzalina Aziz',id:'DEN001',role:'dentist',subRole:'dentist',faculty:'Dental Clinic',year:'—',ic:'820720-06-9012',blood:'B+',allergy:'None',phone:'+60 12-555 6666',email:'norzalina@uthm.edu.my',approved:true,spec:'Dental Surgeon',exp:'10 yrs',avail:'Tue–Fri',rating:'4.9'},
'DEN002':{name:'Dr. Kamaruzaman Hassan',id:'DEN002',role:'dentist',subRole:'dentist',faculty:'Dental Clinic',year:'—',ic:'780430-08-3456',blood:'O+',allergy:'None',phone:'+60 12-777 8888',email:'kamarul@uthm.edu.my',approved:true,spec:'Dental Surgeon',exp:'15 yrs',avail:'Mon,Thu,Fri',rating:'4.6'},
'PHA001':{name:'Pn. Rozita binti Ramlan',id:'PHA001',role:'pharmacist',subRole:'pharma',faculty:'Pharmacy Unit',year:'—',ic:'860914-07-7890',blood:'A-',allergy:'None',phone:'+60 12-999 0000',email:'rozita@uthm.edu.my',approved:true},
'ADM001':{name:'En. Shahrul Nizam Othman',id:'ADM001',role:'admin',subRole:'admin',faculty:'Health Centre Administration',year:'—',ic:'790210-09-1234',blood:'B+',allergy:'None',phone:'+60 12-000 1111',email:'shahrul@uthm.edu.my',approved:true},
};

let S={user:null,sbOpen:true,view:'dashboard',bStep:1,bDept:null,bDoc:null,bDate:null,bTime:null,calM:new Date().getMonth(),calY:new Date().getFullYear(),payMethod:'duitnow',npFilter:'all',profilePic:null};
let PENDING=[],APPTS=[],BILLS=[],QUEUE=[],PRESCRIPTIONS=[],MED_RECORDS=[],PROFILE_REQS=[];
let DRUGS=[{name:'Paracetamol 500mg',stock:480,min:100,unit:'tablets'},{name:'Amoxicillin 500mg',stock:220,min:80,unit:'capsules'},{name:'Ibuprofen 400mg',stock:310,min:80,unit:'tablets'},{name:'Chlorpheniramine 4mg',stock:95,min:60,unit:'tablets'},{name:'Cough Syrup 100mL',stock:48,min:20,unit:'bottles'},{name:'Chlorhexidine Mouthwash',stock:32,min:15,unit:'bottles'},{name:'Vitamin C 500mg',stock:600,min:100,unit:'tablets'},{name:'ORS Sachets',stock:85,min:30,unit:'sachets'}];
let STAFF=[{id:'DOC001',name:'Dr. Mohd Hafiz Ismail',role:'Doctor',dept:'General Practice',shift:'08:00–17:00',status:'on-duty'},{id:'DOC002',name:'Dr. Aminah binti Zulkifli',role:'Doctor',dept:'General Practice',shift:'08:00–13:00',status:'on-duty'},{id:'DEN001',name:'Dr. Siti Norzalina Aziz',role:'Dentist',dept:'Dental Clinic',shift:'08:00–17:00',status:'on-duty'},{id:'DEN002',name:'Dr. Kamaruzaman Hassan',role:'Dentist',dept:'Dental Clinic',shift:'13:00–17:00',status:'off-duty'},{id:'PHA001',name:'Pn. Rozita binti Ramlan',role:'Pharmacist',dept:'Pharmacy',shift:'08:00–17:00',status:'on-duty'},{id:'NUR001',name:'Pn. Haslinah binti Musa',role:'Nurse',dept:'General Practice',shift:'08:00–17:00',status:'on-duty'},{id:'ADM001',name:'En. Shahrul Nizam Othman',role:'Admin',dept:'Administration',shift:'08:00–17:00',status:'on-duty'}];
let ROOMS=[{id:'R1',name:'Room 1',type:'GP',status:'avail',doctor:'Dr. Mohd Hafiz',patient:null},{id:'R2',name:'Room 2',type:'GP',status:'avail',doctor:'Dr. Aminah',patient:null},{id:'R3',name:'Room 3',type:'GP',status:'clean',doctor:'—',patient:null},{id:'R4',name:'Room 4',type:'GP',status:'avail',doctor:'—',patient:null},{id:'D1',name:'Dental 1',type:'Dental',status:'avail',doctor:'Dr. Siti Norzalina',patient:null},{id:'D2',name:'Dental 2',type:'Dental',status:'avail',doctor:'Dr. Kamaruzaman',patient:null},{id:'PH',name:'Pharmacy',type:'Service',status:'avail',doctor:'Pn. Rozita',patient:null},{id:'BL',name:'Billing',type:'Service',status:'avail',doctor:'Admin',patient:null},{id:'WA',name:'Wait A',type:'Common',status:'avail',doctor:'—',patient:null},{id:'WB',name:'Wait B',type:'Common',status:'avail',doctor:'—',patient:null},{id:'LAB',name:'Lab',type:'Service',status:'clean',doctor:'Lab Tech',patient:null},{id:'REG',name:'Reception',type:'Common',status:'avail',doctor:'Front Desk',patient:null}];
let SYS={maxQ:150,resetT:'08:00',alertThr:20,smsNotif:true,emailNotif:true,pushNotif:true,apptLead:24,maxCancel:3,slotDur:30,autoConflict:true,reminder:true,rxAlert:true,payConfirm:true,consultFee:0.00,dentalFee:0.00,grace:7,duitnow:true,smap:true};
let NOTIFS=[{id:1,type:'queue',cls:'',title:'Welcome to UTHM PKU',body:'Your account is active. Register for a queue or book an appointment to get started.',time:'Just now',read:false}];
let NC=2,AC=1,BC=1,QC=1,RC=1,MRC=1,QCALLED=0;
// =============================================
// ICONS
// =============================================
const IC={dash:`<svg width="15" height="15" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="7" height="7" rx="1.5" fill="currentColor" fill-opacity=".8"/><rect x="14" y="3" width="7" height="7" rx="1.5" fill="currentColor" fill-opacity=".8"/><rect x="3" y="14" width="7" height="7" rx="1.5" fill="currentColor" fill-opacity=".8"/><rect x="14" y="14" width="7" height="7" rx="1.5" fill="currentColor" fill-opacity=".38"/></svg>`,qr:`<svg width="15" height="15" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" stroke-width="1.5"/><rect x="5" y="5" width="3" height="3" fill="currentColor"/><rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" stroke-width="1.5"/><rect x="16" y="5" width="3" height="3" fill="currentColor"/><rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" stroke-width="1.5"/><rect x="5" y="16" width="3" height="3" fill="currentColor"/><path d="M14 14h2v2h-2zM18 14h3M14 18h2M18 18h3M21 16v2M16 20v1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,cal:`<svg width="15" height="15" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="8" cy="15" r="1.5" fill="currentColor"/><circle cx="12" cy="15" r="1.5" fill="currentColor"/><circle cx="16" cy="15" r="1.5" fill="currentColor"/></svg>`,bill:`<svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8L14 2z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M14 2v6h6M8 13h8M8 17h5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,phar:`<svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,user:`<svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="12" cy="7" r="4" stroke="currentColor" stroke-width="1.5"/></svg>`,chart:`<svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M18 20V10M12 20V4M6 20v-6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,sett:`<svg width="15" height="15" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.5"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" stroke="currentColor" stroke-width="1.5"/></svg>`,notif:`<svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,msg:`<svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>`,hist:`<svg width="15" height="15" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.5"/><path d="M12 6v6l4 2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,pkg:`<svg width="15" height="15" viewBox="0 0 24 24" fill="none"><rect x="2" y="7" width="20" height="14" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2M12 12v4M10 14h4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,room:`<svg width="15" height="15" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="8" height="8" rx="1" stroke="currentColor" stroke-width="1.5"/><rect x="13" y="3" width="8" height="8" rx="1" stroke="currentColor" stroke-width="1.5"/><rect x="3" y="13" width="8" height="8" rx="1" stroke="currentColor" stroke-width="1.5"/><rect x="13" y="13" width="8" height="8" rx="1" stroke="currentColor" stroke-width="1.5"/></svg>`,staff2:`<svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="9" cy="7" r="4" stroke="currentColor" stroke-width="1.5"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,teeth:`<svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M7 3C4 3 3 6 3 8c0 3 1 5 2 8 .5 1.5 1 2 2 2s1.5-1.5 2-3c.3-1 .7-2 1-2s.7 1 1 2c.5 1.5 1 3 2 3s1.5-.5 2-2c1-3 2-5 2-8 0-2-1-5-4-5-1 0-2 .5-3 .5S8 3 7 3z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,chk:`<svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M9 12l2 2 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.5"/></svg>`,warn:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0zM12 9v4M12 17h.01" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,dl:`<svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,info:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5"/><path d="M12 8v4M12 16h.01" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`};
// =============================================
// UTILS
// =============================================
function showPg(p){document.querySelectorAll('.page').forEach(e=>e.classList.remove('active'));document.getElementById('pg-'+p).classList.add('active');}
function ini(n){return(n||'').split(' ').slice(0,2).map(w=>w[0]||'').join('').toUpperCase()||'?';}
function fmtMoney(n){return'RM '+Number(n).toFixed(2);}
function fmtDate(){return new Date().toLocaleDateString('en-MY',{day:'numeric',month:'long',year:'numeric'});}
function capRole(r){if(!r)return'';return r.charAt(0).toUpperCase()+r.slice(1);}
function capStatus(r){if(!r)return'';return r.charAt(0).toUpperCase()+r.slice(1);}
function safeDeptDisplay(d){if(!d)return'--';const m={'GP':'General Practice','Dental':'Dental Clinic','gp':'General Practice','dental':'Dental Clinic'};return m[d]||d;}
function fmtDateLong(d){if(!d)return'—';const dt=new Date(d);if(isNaN(dt))return d;return dt.toLocaleDateString('en-MY',{day:'numeric',month:'long',year:'numeric'});}

function fmtTime(){return new Date().toLocaleTimeString('en-MY',{hour:'2-digit',minute:'2-digit'});}
let toastTimer;
function toast(msg,t='i'){clearTimeout(toastTimer);const e=document.getElementById('toast');e.className='show '+t;e.textContent=msg;toastTimer=setTimeout(()=>e.className='',3200);}
function closeAll(){
  document.getElementById('overlay').classList.remove('on');
  document.getElementById('np').classList.remove('open');
  document.getElementById('sidebar').classList.remove('mob-open');
  const tc=document.getElementById('mobTapCatcher');
  if(tc)tc.remove();
  document.body.style.overflow='';
}
function openNotif(){buildNP();document.getElementById('np').classList.add('open');document.getElementById('overlay').classList.add('on');}
function toggleSb(){
  const sb=document.getElementById('sidebar'),mn=document.getElementById('main');
  if(window.innerWidth<=640){
    const op=!sb.classList.contains('mob-open');
    sb.classList.toggle('mob-open',op);
    if(op){
      // Dim main area visually — use a tap-catcher div ONLY over main, NOT over sidebar
      let tc=document.getElementById('mobTapCatcher');
      if(!tc){
        tc=document.createElement('div');
        tc.id='mobTapCatcher';
        // Position: starts after sidebar width, covers rest of screen
        tc.style.cssText='position:fixed;top:0;right:0;bottom:0;left:var(--sw);background:rgba(0,0,0,.45);z-index:299;';
        // Clicking/tapping here closes sidebar
        tc.onclick=function(){toggleSb();};
        document.body.appendChild(tc);
      }
    } else {
      const tc=document.getElementById('mobTapCatcher');
      if(tc)tc.remove();
    }
  }else{
    S.sbOpen=!S.sbOpen;
    sb.classList.toggle('closed',!S.sbOpen);
    mn.classList.toggle('expanded',!S.sbOpen);
  }
}
function closeSbOnMainClick(){}
function openModal(title,body,btns=[],wide=false){document.getElementById('mTitle').textContent=title;document.getElementById('mBody').innerHTML=body;document.getElementById('modalBox').className='modal'+(wide?' wide':'');document.getElementById('mFoot').innerHTML=btns.map(b=>`<button class="btn ${b.cls}" onclick="${b.fn}">${b.lbl}</button>`).join('');document.getElementById('modalBg').classList.add('open');}
function closeModal(){document.getElementById('modalBg').classList.remove('open');}
document.getElementById('modalBg').addEventListener('click',e=>{if(e.target===e.currentTarget)closeModal();});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeAll();closeModal();}});
window.addEventListener('resize',()=>{if(window.innerWidth>640){document.getElementById('overlay').classList.remove('on');document.getElementById('main').classList.toggle('expanded',!S.sbOpen);}});
function setErr(id,msg){const e=document.getElementById(id);if(e)e.textContent=msg;}
function togglePw(id){const e=document.getElementById(id);if(e)e.type=e.type==='password'?'text':'password';}
function updateRegFields(){const r=document.getElementById('rRole').value;document.getElementById('rIdLbl').textContent=r==='student'?'Matrix Number':'Staff ID';document.getElementById('rId').placeholder=r==='student'?'A21EB0001':'STF1234';const sf=document.getElementById('stuFields');if(sf)sf.style.display=r==='student'?'':'none';}
function addNotif(type,cls,title,body){NOTIFS.unshift({id:NC++,type,cls,title,body,time:fmtTime(),read:false});updateNdot();}
function updateNdot(){const n=NOTIFS.filter(x=>!x.read).length;const d=document.getElementById('ndot');if(d)d.style.display=n?'block':'none';}

// ===== SKELETON LOADER =====
function showSkeleton(){
  const vc=document.getElementById('vc');
  if(!vc)return;
  vc.innerHTML='<div class="sk-page">'
    +'<div class="skeleton sk-title"></div>'
    +'<div class="skeleton sk-sub"></div>'
    +'<div class="sk-stats">'
    +'<div class="skeleton sk-stat"></div>'
    +'<div class="skeleton sk-stat"></div>'
    +'<div class="skeleton sk-stat"></div>'
    +'<div class="skeleton sk-stat"></div>'
    +'</div>'
    +'<div class="sk-grid">'
    +'<div class="sk-card"><div class="skeleton sk-card-hd"></div><div class="skeleton sk-row w80"></div><div class="skeleton sk-row w60"></div><div class="skeleton sk-row w90"></div><div class="skeleton sk-row w40"></div></div>'
    +'<div class="sk-card"><div class="skeleton sk-card-hd"></div><div class="skeleton sk-row w90"></div><div class="skeleton sk-row w60"></div><div class="skeleton sk-row w80"></div><div class="skeleton sk-row w40"></div></div>'
    +'</div>'
    +'</div>';
}

function markAllRead(){NOTIFS.forEach(n=>n.read=true);buildNP();updateNdot();toast('All marked as read','s');}
function filterNP(type,el){S.npFilter=type;document.querySelectorAll('.np-filters .chip').forEach(c=>c.classList.remove('on'));el.classList.add('on');buildNP();}
function buildNP(){const f=S.npFilter,list=NOTIFS.filter(n=>f==='all'||n.type===f);document.getElementById('npList').innerHTML=list.length?list.map(n=>`<div class="np-item ${n.cls||''}" style="opacity:${n.read?.6:1}" onclick="readN(${n.id},this)"><div class="np-title">${n.title}${!n.read?'<span style="display:inline-block;width:6px;height:6px;background:var(--red);border-radius:50%;margin-left:5px;vertical-align:middle"></span>':''}</div><div class="np-body">${n.body}</div><div class="np-time">${n.time}</div></div>`).join(''):`<div style="text-align:center;padding:2rem;color:var(--g400);font-size:.82rem">No ${f==='all'?'':f+' '}notifications</div>`;}
function readN(id,el){const n=NOTIFS.find(x=>x.id===id);if(n)n.read=true;el.style.opacity='.6';el.querySelector('span[style*="border-radius:50%"]')?.remove();updateNdot();}
function dlFile(name,html){const b=new Blob([html],{type:'text/html'});const u=URL.createObjectURL(b);const a=document.createElement('a');a.href=u;a.download=name;a.click();URL.revokeObjectURL(u);}
function dlCSV(name,rows){const b=new Blob([rows.map(r=>r.join(',')).join('\n')],{type:'text/csv'});const u=URL.createObjectURL(b);const a=document.createElement('a');a.href=u;a.download=name;a.click();URL.revokeObjectURL(u);}
// =============================================
// AUTH
// =============================================
function doLogin(){
  const id=document.getElementById('lId').value.trim().toUpperCase();
  const pw=document.getElementById('lPw').value;
  const role=document.getElementById('lRole').value;
  setErr('lIdErr','');setErr('lPwErr','');
  if(!id){setErr('lIdErr','Please enter your ID');return;}
  if(!pw){setErr('lPwErr','Please enter your password');return;}
  const ud=USERS_DB[id];
  const pu=PENDING.find(u=>u.id===id);
  if(!ud&&!pu){setErr('lIdErr','ID not found. Please register first.');toast('Account not found','e');return;}
  if(pu&&!pu.approved){setErr('lIdErr','Account pending admin approval');toast('Awaiting admin approval','w');return;}
  const correctPw=PASS_DB[id]||pu?.pw;
  if(!correctPw||pw!==correctPw){setErr('lPwErr','Incorrect password');toast('Invalid password','e');return;}
  const actualRole=ROLE_DB[id]||'user';
  if(role==='user'&&actualRole!=='user'){setErr('lIdErr','This is a '+actualRole+' account. Select correct role.');toast('Role mismatch','e');return;}
  if(role!=='user'&&actualRole!==role){setErr('lIdErr','This ID belongs to a '+actualRole+' account.');toast('Role mismatch','e');return;}
  S.user={...(ud||{name:pu.name,id:pu.id,role:'user',subRole:pu.subRole,faculty:pu.faculty||'',year:pu.year||'—',ic:pu.ic||'',blood:'—',allergy:'None',phone:pu.phone||'',email:pu.email||'',approved:true})};
  bootApp();toast('Welcome, '+S.user.name.split(' ')[0]+'!','s');
}
function doRegister(){
  const first=document.getElementById('rFirst').value.trim();
  const id=document.getElementById('rId').value.trim().toUpperCase();
  const email=document.getElementById('rEmail').value.trim();
  const pw=document.getElementById('rPw').value;
  const pw2=document.getElementById('rPw2').value;
  const terms=document.getElementById('rTerms').checked;
  const role=document.getElementById('rRole').value;
  ['rFirstErr','rIdErr','rEmailErr','rPwErr','rPw2Err','rTermsErr'].forEach(e=>setErr(e,''));
  let ok=true;
  if(!first){setErr('rFirstErr','First name required');ok=false;}
  if(!id){setErr('rIdErr','ID required');ok=false;}
  else if(USERS_DB[id]||PENDING.find(u=>u.id===id)){setErr('rIdErr','ID already registered');ok=false;}
  if(!email.includes('@')){setErr('rEmailErr','Valid email required');ok=false;}
  if(pw.length<8){setErr('rPwErr','Min 8 characters');ok=false;}
  if(pw!==pw2){setErr('rPw2Err','Passwords do not match');ok=false;}
  if(!terms){setErr('rTermsErr','Must agree to terms');ok=false;}
  if(!ok)return;
  const last=document.getElementById('rLast').value.trim();
  const newU={id,name:first+(last?' '+last:''),role:'user',subRole:role,pw,
    faculty:role==='student'?document.getElementById('rFaculty')?.value:'Staff Division',
    year:role==='student'?document.getElementById('rYear')?.value:'—',
    email,phone:document.getElementById('rPhone')?.value||'',
    ic:document.getElementById('rIc')?.value||'',approved:false,date:fmtDate()};
  PENDING.push(newU);PASS_DB[id]=pw;ROLE_DB[id]='user';
  addNotif('system','b','New Registration',`${newU.name} (${id}) registered as ${role}. Awaiting approval.`);
  toast('Registration submitted! Awaiting admin approval.','s');showPg('login');
}
// =============================================
// BOOT
// =============================================
function bootApp(){
  showPg('app');const u=S.user;
  updateAvatars();
  document.getElementById('sbName').textContent=u.name;
  document.getElementById('sbRole').textContent=capRole(u.subRole||u.role);
  document.getElementById('tbName').textContent=u.name.split(' ')[0];
  buildNav();buildNP();updateNdot();nav('dashboard');
  if(window.innerWidth<=640){document.getElementById('main').classList.add('expanded');S.sbOpen=false;}
}
function updateAvatars(){
  const u=S.user;if(!u)return;
  ['sbAv','tbAv'].forEach(id=>{const e=document.getElementById(id);if(!e)return;if(S.profilePic){e.innerHTML=`<img src="${S.profilePic}" alt="av" style="width:100%;height:100%;object-fit:cover;border-radius:50%">`;}else{e.textContent=ini(u.name);}});
}
function doLogout(){S.user=null;S.profilePic=null;showPg('login');}
// =============================================
// NAVIGATION
// =============================================
function navItems(){
  const r=S.user.role;
  if(r==='user')return[{s:'Main'},{v:'dashboard',ic:'dash',lbl:'Dashboard'},{v:'queue',ic:'qr',lbl:'Walk In',bdg:'Live'},{v:'appointments',ic:'cal',lbl:'Appointments'},{s:'Health'},{v:'med-history',ic:'hist',lbl:'Medical History'},{s:'Services'},{v:'billing',ic:'bill',lbl:'Billing & Payment'},{v:'pharmacy',ic:'phar',lbl:'Pharmacy'},{s:'Support'},{v:'notifications',ic:'notif',lbl:'Notifications',bdg:()=>NOTIFS.filter(n=>!n.read).length||''},{v:'feedback',ic:'msg',lbl:'Feedback & Help'},{s:'Account'},{v:'profile',ic:'user',lbl:'Profile'}];
  if(r==='doctor')return[{s:'Main'},{v:'dashboard',ic:'dash',lbl:'Dashboard'},{v:'schedule',ic:'cal',lbl:'My Schedule'},{v:'queue-mgmt',ic:'qr',lbl:'Patient Queue',bdg:()=>QUEUE.filter(q=>q.dept==='GP'&&q.status==='waiting').length||''},{s:'Clinical'},{v:'records',ic:'hist',lbl:'Patient Records'},{v:'appointments',ic:'cal',lbl:'Appointments'},{s:'Account'},{v:'profile',ic:'user',lbl:'Profile'}];
  if(r==='dentist')return[{s:'Main'},{v:'dashboard',ic:'dash',lbl:'Dashboard'},{v:'schedule',ic:'cal',lbl:'My Schedule'},{v:'queue-mgmt',ic:'teeth',lbl:'Dental Queue',bdg:()=>QUEUE.filter(q=>q.dept==='Dental'&&q.status==='waiting').length||''},{s:'Clinical'},{v:'records',ic:'hist',lbl:'Patient Records'},{v:'appointments',ic:'cal',lbl:'Dental Appointments'},{s:'Account'},{v:'profile',ic:'user',lbl:'Profile'}];
  if(r==='pharmacist')return[{s:'Main'},{v:'dashboard',ic:'dash',lbl:'Dashboard'},{v:'pharma-mgmt',ic:'phar',lbl:'Prescription Queue',bdg:()=>PRESCRIPTIONS.filter(p=>p.status==='pending'||p.status==='processing').length||''},{v:'prescriptions',ic:'bill',lbl:'All Prescriptions'},{s:'Inventory'},{v:'drug-inventory',ic:'pkg',lbl:'Drug Inventory'},{s:'Account'},{v:'profile',ic:'user',lbl:'Profile'}];
  return[{s:'Main'},{v:'dashboard',ic:'dash',lbl:'Dashboard'},{v:'patients',ic:'user',lbl:'Patient Management'},{v:'queue-mgmt',ic:'qr',lbl:'Queue Management',bdg:()=>QUEUE.filter(q=>q.status==='waiting').length||''},{v:'appointments',ic:'cal',lbl:'All Appointments'},{v:'room-status',ic:'room',lbl:'Room Status'},{s:'Analytics'},{v:'analytics',ic:'chart',lbl:'Analytics & Reports'},{v:'billing-admin',ic:'bill',lbl:'Financial Reports'},{s:'System'},{v:'staff-mgmt',ic:'staff2',lbl:'Staff Management'},{v:'approvals',ic:'user',lbl:'Pending Approvals',bdg:()=>PENDING.filter(u=>!u.approved).length||''},{v:'profile-reqs',ic:'user',lbl:'Profile Edit Requests',bdg:()=>PROFILE_REQS.filter(r=>r.status==='pending').length||''},{v:'drug-inventory',ic:'pkg',lbl:'Drug Inventory'},{v:'settings',ic:'sett',lbl:'System Settings'},{s:'Account'},{v:'profile',ic:'user',lbl:'Admin Profile'}];
}
const PT={dashboard:'Dashboard',appointments:'Appointments',queue:'Walk In','queue-mgmt':'Queue Management',billing:'Billing & Payment','billing-admin':'Financial Reports',pharmacy:'Pharmacy','pharma-mgmt':'Prescription Queue',profile:'Profile',patients:'Patient Management',analytics:'Analytics & Reports',settings:'System Settings',schedule:'My Schedule',records:'Patient Records',prescriptions:'All Prescriptions','drug-inventory':'Drug Inventory','room-status':'Room Status','staff-mgmt':'Staff Management','med-history':'Medical History',notifications:'Notifications',feedback:'Feedback & Help',approvals:'Pending Approvals','profile-reqs':'Profile Edit Requests'};
function buildNav(){document.getElementById('sbNav').innerHTML=navItems().map(it=>{if(it.s)return`<div class="sb-sec">${it.s}</div>`;const bdg=typeof it.bdg==='function'?it.bdg():it.bdg;return`<div class="sb-item${S.view===it.v?' active':''}" onclick="nav('${it.v}')"><div class="sb-item-ic">${IC[it.ic]||''}</div><span>${it.lbl}</span>${bdg?`<span class="sb-badge">${bdg}</span>`:''}</div>`;}).join('');}
function nav(v){
  S.view=v;
  closeAll();
  document.getElementById('tbTitle').textContent=PT[v]||'Dashboard';
  buildNav();
  showSkeleton();
  setTimeout(()=>renderView(v),120);
}
function renderView(v){
  const r=S.user.role;
  const views={dashboard:()=>{if(r==='admin')vAdminDash();else if(r==='doctor')vDoctorDash();else if(r==='dentist')vDentistDash();else if(r==='pharmacist')vPharmaDash();else vUserDash();},appointments:vAppointments,queue:vQueue,'queue-mgmt':vQueueMgmt,billing:vBilling,'billing-admin':vBillingAdmin,pharmacy:vPharmacy,'pharma-mgmt':vPharmaMgmt,profile:vProfile,patients:vPatients,analytics:vAnalytics,settings:vSettings,schedule:vSchedule,records:vRecords,prescriptions:vPrescriptions,'drug-inventory':vDrugInventory,'room-status':vRoomStatus,'staff-mgmt':vStaffMgmt,'med-history':vMedHistory,notifications:vNotifications,feedback:vFeedback,approvals:vApprovals,'profile-reqs':vProfileReqs};
  (views[v]||views.dashboard)();
}
// =============================================
// UI HELPERS
// =============================================
function sgHTML(items){return`<div class="sg">${items.map(s=>`<div class="stat ${s.cls||''}"><div class="stat-ic" style="${s.cls==='g'?'background:rgba(39,174,96,.1)':s.cls==='o'?'background:rgba(243,156,18,.1)':s.cls==='b'?'background:rgba(41,128,185,.1)':''}">${s.ic}</div><div class="stat-val">${s.pfx||''}${s.val}</div><div class="stat-lbl">${s.lbl}</div>${s.ch?`<div class="stat-ch ${s.chcls||''}">${s.ch}</div>`:''}</div>`).join('')}</div>`;}
function svgi(path,clr){return`<svg width="18" height="18" viewBox="0 0 24 24" fill="none">${path.replace(/CLOR/g,clr||'#8B1A1A')}</svg>`;}
const P={users:`<path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="CLOR" stroke-width="1.5" stroke-linecap="round"/><circle cx="12" cy="7" r="4" stroke="CLOR" stroke-width="1.5"/>`,cal:`<rect x="3" y="4" width="18" height="18" rx="2" stroke="CLOR" stroke-width="1.5"/><path d="M16 2v4M8 2v4M3 10h18" stroke="CLOR" stroke-width="1.5" stroke-linecap="round"/>`,clk:`<circle cx="12" cy="12" r="9" stroke="CLOR" stroke-width="1.5"/><path d="M12 6v6l4 2" stroke="CLOR" stroke-width="1.5" stroke-linecap="round"/>`,dol:`<path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" stroke="CLOR" stroke-width="1.5" stroke-linecap="round"/>`,chk:`<path d="M9 12l2 2 4-4" stroke="CLOR" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="12" cy="12" r="9" stroke="CLOR" stroke-width="1.5"/>`,rx:`<path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" stroke="CLOR" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>`,bar:`<path d="M18 20V10M12 20V4M6 20v-6" stroke="CLOR" stroke-width="1.5" stroke-linecap="round"/>`};
function barchart(id,data,maxV){const e=document.getElementById(id);if(!e)return;const mx=maxV||Math.max(...data.map(d=>d.v),1);e.innerHTML=data.map(d=>`<div class="bi-item"><div class="bi-val">${d.v}</div><div class="bi-fill" style="height:${Math.round((d.v/mx)*130)}px"></div><div class="bi-lbl">${d.l}</div></div>`).join('');}
// =============================================
// DOWNLOAD HELPERS
// =============================================
function genReceiptHTML(b){const tot=b.items.reduce((s,i)=>s+i.p,0);return`<!DOCTYPE html><html><head><title>Receipt ${b.id}</title><style>body{font-family:Arial,sans-serif;max-width:500px;margin:40px auto;padding:24px;border:2px solid #8B1A1A;border-radius:12px}.hd{background:#8B1A1A;color:white;padding:20px;border-radius:8px 8px 0 0;text-align:center;margin:-24px -24px 20px}h2{margin:0;font-size:1.2rem}table{width:100%;border-collapse:collapse;margin:16px 0}th,td{padding:8px 12px;border-bottom:1px solid #eee;font-size:.84rem}th{background:#f5f0e8;text-align:left}.tot{font-weight:bold;font-size:1rem}.status{display:inline-block;padding:3px 10px;border-radius:20px;font-size:.73rem;font-weight:bold;background:${b.status==='paid'?'#e8f8f0':'#fdecea'};color:${b.status==='paid'?'#1a7a4a':'#c0392b'}}.foot{text-align:center;margin-top:20px;font-size:.71rem;color:#888;border-top:1px solid #eee;padding-top:12px}</style></head><body><div class="hd"><h2>UTHM University Health Centre</h2><p style="margin:.3rem 0 0;opacity:.8;font-size:.8rem">Official Receipt</p></div><p><strong>Invoice:</strong> ${b.id} &nbsp;<span class="status">${b.status.toUpperCase()}</span></p><p><strong>Date:</strong> ${b.date}</p><p><strong>Patient:</strong> ${b.patient} (${b.pid})</p>${b.method?`<p><strong>Payment:</strong> ${b.method}</p>`:''}<table><tr><th>Description</th><th style="text-align:right">Amount</th></tr>${b.items.map(i=>`<tr><td>${i.n}</td><td style="text-align:right">RM ${i.p.toFixed(2)}</td></tr>`).join('')}<tr><td class="tot">TOTAL</td><td class="tot" style="text-align:right">RM ${tot.toFixed(2)}</td></tr></table><div class="foot">UTHM PKU — University Health Centre, Batu Pahat, Johor<br>Tel: +607-453 7765 | pku@uthm.edu.my | github.com/paim41</div></body></html>`;}
function genSlipHTML(a){return`<!DOCTYPE html><html><head><title>Appointment Slip ${a.id}</title><style>body{font-family:Arial,sans-serif;max-width:480px;margin:40px auto;padding:24px;border:2px solid #8B1A1A;border-radius:12px}.hd{background:#8B1A1A;color:white;padding:20px;border-radius:8px 8px 0 0;text-align:center;margin:-24px -24px 20px}h2{margin:0;font-size:1.1rem}.row{display:flex;justify-content:space-between;padding:9px 0;border-bottom:1px solid #eee;font-size:.84rem}.lbl{color:#888}.val{font-weight:600}.qrb{text-align:center;margin:18px 0;padding:14px;background:#f5f0e8;border-radius:8px}.foot{text-align:center;margin-top:18px;font-size:.71rem;color:#888;border-top:1px solid #eee;padding-top:12px}</style></head><body><div class="hd"><h2>UTHM PKU Appointment Slip</h2></div>${[['Appointment ID',a.id],['Patient',a.patient+' ('+a.pid+')'],['Department',a.dept],['Doctor',a.doctor],['Date',a.date],['Time',a.time],['Type',a.type],['Status',a.status.toUpperCase()]].map(([k,v])=>`<div class="row"><span class="lbl">${k}</span><span class="val">${v}</span></div>`).join('')}<div class="qrb"><div style="font-size:.78rem;font-weight:600;color:#8B1A1A;margin-bottom:8px">Scan at PKU Check-in Terminal</div><svg width="80" height="80" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg"><rect width="80" height="80" fill="white"/><rect x="5" y="5" width="28" height="28" rx="2" fill="#1A1510"/><rect x="10" y="10" width="18" height="18" rx="1" fill="white"/><rect x="13" y="13" width="12" height="12" rx="1" fill="#1A1510"/><rect x="47" y="5" width="28" height="28" rx="2" fill="#1A1510"/><rect x="52" y="10" width="18" height="18" rx="1" fill="white"/><rect x="55" y="13" width="12" height="12" rx="1" fill="#1A1510"/><rect x="5" y="47" width="28" height="28" rx="2" fill="#1A1510"/><rect x="10" y="52" width="18" height="18" rx="1" fill="white"/><rect x="13" y="55" width="12" height="12" rx="1" fill="#1A1510"/><rect x="47" y="47" width="8" height="8" fill="#1A1510"/><rect x="59" y="47" width="8" height="8" fill="#1A1510"/><rect x="47" y="59" width="8" height="8" fill="#1A1510"/><rect x="59" y="59" width="8" height="8" fill="#1A1510"/><rect x="71" y="47" width="8" height="8" fill="#1A1510"/><rect x="71" y="59" width="8" height="8" fill="#1A1510"/><rect x="47" y="71" width="8" height="8" fill="#1A1510"/><rect x="59" y="71" width="8" height="8" fill="#1A1510"/></svg><div style="font-size:.72rem;color:#888;margin-top:5px">${a.id} / ${a.pid}</div></div><p style="font-size:.79rem;color:#888;text-align:center">Please arrive 10 minutes early. Bring your student/staff ID card.</p><div class="foot">UTHM PKU — University Health Centre, Batu Pahat | github.com/paim41</div></body></html>`;}
function genQRHTML(q){return`<!DOCTYPE html><html><head><title>Queue ${q.number}</title><style>body{font-family:Arial,sans-serif;max-width:370px;margin:40px auto;padding:24px;border:3px solid #8B1A1A;border-radius:16px;text-align:center}.hd{background:#8B1A1A;color:white;padding:14px;border-radius:10px 10px 0 0;margin:-24px -24px 18px;font-size:1rem;font-weight:bold}.qn{font-family:Georgia,serif;font-size:5rem;font-weight:bold;color:#8B1A1A;line-height:1;margin:14px 0}.foot{margin-top:18px;font-size:.7rem;color:#888;border-top:1px solid #eee;padding-top:12px}</style></head><body><div class="hd">UTHM PKU Queue Ticket</div><div style="font-size:.7rem;text-transform:uppercase;letter-spacing:.06em;color:#888">Your Number</div><div class="qn">${q.number}</div><div style="font-size:.9rem;font-weight:600;color:#333">${q.dept}</div><div style="font-size:.8rem;color:#888;margin:4px 0">Doctor: ${q.doctor||'TBA'}</div><div style="font-size:.8rem;color:#888">Patient: ${q.patient} (${q.pid})</div><div style="font-size:.8rem;color:#888;margin-bottom:14px">Registered: ${q.time}</div><svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style="margin:0 auto;display:block"><rect width="100" height="100" fill="white"/><rect x="5" y="5" width="35" height="35" rx="3" fill="#1A1510"/><rect x="10" y="10" width="25" height="25" rx="2" fill="white"/><rect x="14" y="14" width="17" height="17" rx="1" fill="#1A1510"/><rect x="60" y="5" width="35" height="35" rx="3" fill="#1A1510"/><rect x="65" y="10" width="25" height="25" rx="2" fill="white"/><rect x="69" y="14" width="17" height="17" rx="1" fill="#1A1510"/><rect x="5" y="60" width="35" height="35" rx="3" fill="#1A1510"/><rect x="10" y="65" width="25" height="25" rx="2" fill="white"/><rect x="14" y="69" width="17" height="17" rx="1" fill="#1A1510"/><rect x="60" y="60" width="9" height="9" fill="#1A1510"/><rect x="73" y="60" width="9" height="9" fill="#1A1510"/><rect x="86" y="60" width="9" height="9" fill="#1A1510"/><rect x="60" y="73" width="9" height="9" fill="#1A1510"/><rect x="73" y="73" width="9" height="9" fill="#1A1510"/><rect x="86" y="86" width="9" height="9" fill="#1A1510"/><rect x="60" y="86" width="9" height="9" fill="#1A1510"/><rect x="73" y="86" width="9" height="9" fill="#1A1510"/></svg><div class="foot">UTHM PKU — University Health Centre, Batu Pahat | github.com/paim41</div></body></html>`;}
function genMedHTML(recs,u){
  function safeDateLong(d){if(!d)return'--';try{const dt=new Date(d);if(isNaN(dt.getTime()))return d;return dt.toLocaleDateString('en-MY',{day:'numeric',month:'long',year:'numeric'});}catch(e){return d;}}
  function safeDept(d){if(!d)return'--';const m={'GP':'General Practice','Dental':'Dental Clinic','gp':'General Practice','dental':'Dental Clinic'};return m[d]||d;}
  const rows=recs.length?recs.map(r=>{const dept=safeDept(r.dept);const date=safeDateLong(r.date);const fu=r.followUp||r.fu||'--';return'<div class="rec"><h3>'+r.id+' &ndash; '+date+'</h3><table style="width:100%;border-collapse:collapse">'+[['Department',dept],['Doctor',r.doctor||'--'],['Complaint',r.complaint||'--'],['Diagnosis',r.diagnosis||'--'],['Treatment',r.treatment||'--'],['Follow-up',fu]].map(([l,v])=>'<tr><td style="padding:5px 0;border-bottom:1px solid #f5f0e8;font-size:.81rem;color:#888;width:110px">'+l+'</td><td style="padding:5px 0;border-bottom:1px solid #f5f0e8;font-size:.81rem;font-weight:500">'+v+'</td></tr>').join('')+'</table></div>';}).join(''):'<p style="text-align:center;color:#888;padding:18px">No consultation records found.</p>';
  const html='<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Medical Record - '+u.name+'</title><style>body{font-family:Arial,sans-serif;max-width:680px;margin:40px auto;padding:24px;color:#333}.hd{background:#8B1A1A;color:white;padding:20px;border-radius:8px;margin-bottom:20px}.pi{background:#f5f0e8;border-radius:8px;padding:14px;margin-bottom:18px;display:grid;grid-template-columns:1fr 1fr;gap:8px}.pi-i .l{font-size:.69rem;color:#888;text-transform:uppercase}.pi-i .v{font-weight:600;font-size:.84rem;margin-top:2px}.rec{border:1px solid #eee;border-radius:8px;padding:14px;margin-bottom:14px;border-left:4px solid #8B1A1A}h3{font-size:.92rem;color:#8B1A1A;margin-bottom:10px}.foot{text-align:center;margin-top:20px;font-size:.7rem;color:#888;border-top:1px solid #eee;padding-top:12px}</style></head><body>'
  +'<div class="hd"><h2 style="margin:0">UTHM PKU Medical History Report</h2><p style="margin:.3rem 0 0;opacity:.8;font-size:.79rem">Confidential &ndash; Generated '+new Date().toLocaleDateString('en-MY',{day:'numeric',month:'long',year:'numeric'})+'</p></div>'
  +'<div class="pi">'+[['Patient',u.name],['ID',u.id],['Blood',u.blood||'--'],['Allergy',u.allergy||'None'],['Email',u.email||'--'],['Phone',u.phone||'--']].map(([l,v])=>'<div class="pi-i"><div class="l">'+l+'</div><div class="v">'+v+'</div></div>').join('')+'</div>'
  +rows
  +'<div class="foot">UTHM PKU &ndash; University Health Centre, Batu Pahat</div></body></html>';
  return html;
}

function vUserDash(){const u=S.user,myT=QUEUE.find(q=>q.pid===u.id&&q.status==='waiting'),myA=APPTS.filter(a=>a.pid===u.id&&a.status!=='completed'&&a.status!=='cancelled').slice(0,2),myB=BILLS.filter(b=>b.pid===u.id&&b.status==='unpaid'),ahead=myT?QUEUE.filter(q=>q.status==='waiting'&&parseInt(q.number.split('-')[1])<parseInt(myT.number.split('-')[1])).length:0;document.getElementById('vc').innerHTML=`<div class="ph"><h1>Good Morning, ${u.name.split(' ')[0]}</h1><p>${new Date().toLocaleDateString('en-MY',{weekday:'long',day:'numeric',month:'long',year:'numeric'})}</p></div>${sgHTML([{ic:svgi(P.users),val:APPTS.filter(a=>a.pid===u.id).length,lbl:'Total Visits'},{cls:'g',ic:svgi(P.cal,'#27ae60'),val:myA.length,lbl:'Upcoming Appts'},{cls:'o',ic:svgi(P.rx,'#f39c12'),val:PRESCRIPTIONS.filter(p=>p.pid===u.id&&p.status==='ready').length,lbl:'Prescriptions Ready'},{cls:'b',ic:svgi(P.dol,'#2980b9'),val:myB.length,lbl:'Unpaid Bills',ch:myB.length?'Payment needed':'All clear',chcls:myB.length?'dn':'up'}])}<div class="g2" style="margin-bottom:.95rem"><div class="card"><div class="card-hd"><span class="card-title">My Queue Status</span><span class="badge ${myT?'bs':'bn'}"><span class="dot"></span>&nbsp;${myT?'Active':'No Queue'}</span></div><div class="card-bd">${myT?`<div class="q-hero"><div style="position:relative;z-index:1"><div style="font-size:.73rem;opacity:.75;margin-bottom:.28rem;letter-spacing:.06em">YOUR NUMBER</div><div class="q-num">${myT.number}</div><div class="q-lbl">${myT.dept} — ${myT.doctor||'Assigned Doctor'}</div><div style="margin-top:.82rem;background:rgba(255,255,255,.13);border-radius:8px;padding:.55rem .82rem"><div style="display:flex;justify-content:space-between;font-size:.73rem;opacity:.85"><span>Now Serving</span><span>${QCALLED>0?'Q-'+String(QCALLED).padStart(3,'0'):'Not started'}</span></div><div style="display:flex;justify-content:space-between;font-size:.73rem;opacity:.85;margin-top:.16rem"><span>Ahead of you</span><span>${ahead}</span></div></div><div class="q-live" style="margin-top:.82rem"><div class="pls"></div><span>${QCALLED>=parseInt(myT.number.split('-')[1])?'Your turn! Proceed to room.':ahead===0?'You are next!':ahead+' patient(s) ahead'}</span></div></div></div><div style="display:flex;gap:.55rem;margin-top:.82rem"><button class="btn btn-outline btn-sm" style="flex:1" onclick="nav('queue')">View Queue</button><button class="btn btn-ghost btn-sm" style="flex:1" onclick="cancelMyQ('${myT.id}')">Cancel</button></div>`:`<div style="text-align:center;padding:1.75rem"><p style="color:var(--g400);font-size:.83rem;margin-bottom:.82rem">No active queue ticket</p><button class="btn btn-primary btn-sm" onclick="openGetQ()">Get Queue Number</button></div>`}</div></div><div class="card"><div class="card-hd"><span class="card-title">Upcoming Appointments</span><button class="btn btn-primary btn-sm" onclick="nav('appointments')">Book New</button></div><div class="card-bd">${myA.length?myA.map(a=>`<div class="appt-card"><div class="appt-badge"><strong>${a.time}</strong><span>${a.date}</span></div><div class="appt-info"><div class="appt-doc">${a.doctor}</div><div class="appt-dept">${a.dept}</div></div><span class="badge ${a.status==='confirmed'?'bs':'bw'}">${a.status}</span></div>`).join(''):`<div style="text-align:center;padding:1.5rem;color:var(--g400);font-size:.83rem">No upcoming appointments<br><button class="btn btn-ghost btn-sm" style="margin-top:.55rem" onclick="nav('appointments')">Book one</button></div>`}</div></div></div><div class="g2"><div class="card"><div class="card-hd"><span class="card-title">Recent Bills</span><button class="btn btn-ghost btn-sm" onclick="nav('billing')">View All</button></div><div class="card-bd">${BILLS.filter(b=>b.pid===u.id).length?`<div class="tw"><table><thead><tr><th>Invoice</th><th>Date</th><th>Amount</th><th>Status</th></tr></thead><tbody>${BILLS.filter(b=>b.pid===u.id).slice(0,4).map(b=>`<tr><td><strong>${b.id}</strong></td><td>${b.date}</td><td><strong>${fmtMoney(b.items.reduce((s,i)=>s+i.p,0))}</strong></td><td><span class="badge ${b.status==='paid'?'bs':'bd'}">${b.status}</span></td></tr>`).join('')}</tbody></table></div>`:`<div style="text-align:center;padding:1.5rem;color:var(--g400);font-size:.83rem">No bills yet</div>`}</div></div><div class="card"><div class="card-hd"><span class="card-title">Activity</span></div><div class="card-bd"><div class="tl"><div class="tl-item now"><div class="tl-dot"></div><div class="tl-body"><div class="tl-title">Logged In</div><div class="tl-desc">UTHM PKU System</div><div class="tl-time">Just now</div></div></div>${APPTS.filter(a=>a.pid===u.id).slice(0,3).map(a=>`<div class="tl-item done"><div class="tl-dot"></div><div class="tl-body"><div class="tl-title">Appointment — ${a.status}</div><div class="tl-desc">${a.dept} · ${a.doctor}</div><div class="tl-time">${a.date}</div></div></div>`).join('')}</div></div></div></div>`;}
function cancelMyQ(id){const q=QUEUE.find(x=>x.id===id);if(q){q.status='cancelled';addNotif('queue','','Queue Cancelled','Your ticket '+q.number+' cancelled.');toast('Queue cancelled','i');nav('dashboard');}}
function vAdminDash(){const rev=BILLS.reduce((s,b)=>s+(b.status==='paid'?b.items.reduce((ss,i)=>ss+i.p,0):0),0);document.getElementById('vc').innerHTML=`<div class="ph-row"><div class="ph" style="margin-bottom:0"><h1>Admin Dashboard</h1><p>${new Date().toLocaleDateString('en-MY',{weekday:'long',day:'numeric',month:'long',year:'numeric'})}</p></div><div style="display:flex;gap:.55rem;flex-wrap:wrap"><button class="btn btn-outline btn-sm" onclick="exportAdminRpt()">Export</button><button class="btn btn-primary btn-sm" onclick="showDailySummary()">Daily Summary</button></div></div><div style="height:1.1rem"></div>${sgHTML([{ic:svgi(P.users),val:APPTS.length,lbl:'Total Appointments'},{cls:'g',ic:svgi(P.clk,'#27ae60'),val:QUEUE.filter(q=>q.status==='waiting').length,lbl:'Active Queue'},{cls:'o',ic:svgi(P.users,'#f39c12'),val:PENDING.filter(u=>!u.approved).length,lbl:'Pending Approvals'},{cls:'b',ic:svgi(P.dol,'#2980b9'),val:'RM '+rev.toFixed(2),lbl:'Revenue Collected'}])}<div class="g2" style="margin-bottom:.95rem"><div class="card"><div class="card-hd"><span class="card-title">Appointments by Dept</span></div><div class="card-bd"><div class="bar-chart" id="adBar"></div></div></div><div class="card"><div class="card-hd"><span class="card-title">System Health</span></div><div class="card-bd">${[['Queue System','Online',100,'#27ae60'],['Scheduler','Online',100,'#27ae60'],['Notifications','Online',98,'#27ae60'],['Payment','Online',100,'#27ae60'],['Database','99.1%',99,'#2980b9']].map(([l,v,p,c])=>`<div style="margin-bottom:.58rem"><div style="display:flex;justify-content:space-between;font-size:.78rem;margin-bottom:.2rem"><span style="color:var(--g600)">${l}</span><span style="font-weight:600;color:${c}">${v}</span></div><div class="prog-bar"><div class="prog-fill" style="width:${p}%;background:${c}"></div></div></div>`).join('')}</div></div></div><div class="g2"><div class="card"><div class="card-hd"><span class="card-title">Quick Actions</span></div><div class="card-bd" style="display:grid;grid-template-columns:1fr 1fr;gap:.58rem">${[['Approvals',"nav('approvals')"],['Queue',"nav('queue-mgmt')"],['Staff',"nav('staff-mgmt')"],['Rooms',"nav('room-status')"],['Analytics',"nav('analytics')"],['Settings',"nav('settings')"]].map(([l,a])=>`<button class="btn btn-ghost" style="flex-direction:column;gap:.28rem;height:60px;font-size:.76rem;border:1.5px solid var(--g200)" onclick="${a}">${IC.sett}${l}</button>`).join('')}</div></div><div class="card"><div class="card-hd"><span class="card-title">Live Queue</span></div><div class="card-bd">${QUEUE.filter(q=>q.status==='waiting').length?`<div class="tw"><table><thead><tr><th>No.</th><th>Patient</th><th>Dept</th><th>Status</th></tr></thead><tbody>${QUEUE.filter(q=>q.status==='waiting').slice(0,6).map(q=>`<tr><td><strong>${q.number}</strong></td><td>${q.patient}</td><td>${q.dept}</td><td><span class="badge ${QCALLED===parseInt(q.number.split('-')[1])?'bs':'bw'}">${QCALLED===parseInt(q.number.split('-')[1])?'Called':'Waiting'}</span></td></tr>`).join('')}</tbody></table></div>`:`<div style="text-align:center;padding:1.5rem;color:var(--g400);font-size:.83rem">No active queue</div>`}</div></div></div>`;setTimeout(()=>{const mx=Math.max(APPTS.filter(a=>a.dept==='General Practice').length,APPTS.filter(a=>a.dept==='Dental').length,PRESCRIPTIONS.length,BILLS.length,1);barchart('adBar',[{l:'GP',v:APPTS.filter(a=>a.dept==='General Practice').length},{l:'Dental',v:APPTS.filter(a=>a.dept==='Dental').length},{l:'Prescriptions',v:PRESCRIPTIONS.length},{l:'Bills',v:BILLS.length}],mx);},50);}
function exportAdminRpt(){const rev=BILLS.reduce((s,b)=>s+(b.status==='paid'?b.items.reduce((ss,i)=>ss+i.p,0):0),0);dlFile('UTHM_PKU_Admin_Report.html','<!DOCTYPE html><html><head><title>Admin Report</title><style>body{font-family:Arial,sans-serif;max-width:700px;margin:40px auto;padding:24px}.hd{background:#8B1A1A;color:white;padding:20px;border-radius:8px;margin-bottom:20px}table{width:100%;border-collapse:collapse;margin-bottom:18px}th,td{padding:8px 12px;border:1px solid #eee;font-size:.82rem}th{background:#f5f0e8}.foot{text-align:center;font-size:.71rem;color:#888;margin-top:18px}</style></head><body><div class="hd"><h2 style="margin:0">UTHM PKU Admin Report</h2><p style="margin:.3rem 0 0;opacity:.8;font-size:.79rem">Generated: '+new Date().toLocaleString('en-MY')+'</p></div><h3>Summary</h3><table><tr><th>Metric</th><th>Value</th></tr><tr><td>Appointments</td><td>'+APPTS.length+'</td></tr><tr><td>Active Queue</td><td>'+QUEUE.filter(q=>q.status==="waiting").length+'</td></tr><tr><td>Prescriptions</td><td>'+PRESCRIPTIONS.length+'</td></tr><tr><td>Bills</td><td>'+BILLS.length+'</td></tr><tr><td>Revenue</td><td>RM '+rev.toFixed(2)+'</td></tr><tr><td>Pending Approvals</td><td>'+PENDING.filter(u=>!u.approved).length+'</td></tr></table><div class="foot">UTHM PKU — github.com/paim41</div></body></html>');toast('Report downloaded','s');}
function showDailySummary(){const rev=BILLS.reduce((s,b)=>s+(b.status==='paid'?b.items.reduce((ss,i)=>ss+i.p,0):0),0);openModal('Daily Summary — '+fmtDate(),'<div>'+[['Date',fmtDate()],['Appointments',APPTS.length],['Queue Issued',QUEUE.length],['Active Queue',QUEUE.filter(q=>q.status==="waiting").length],['Prescriptions',PRESCRIPTIONS.length],['Bills',BILLS.length],['Revenue','RM '+rev.toFixed(2)],['Staff On Duty',STAFF.filter(s=>s.status==='on-duty').length]].map(([k,v])=>'<div style="display:flex;justify-content:space-between;padding:.46rem 0;border-bottom:1px solid var(--g100)"><span style="font-size:.82rem;color:var(--g400)">'+k+'</span><strong style="font-size:.82rem">'+v+'</strong></div>').join('')+'</div>',[{lbl:'Close',cls:'btn-ghost',fn:'closeModal()'},{lbl:'Download',cls:'btn-primary',fn:'exportAdminRpt();closeModal()'}]);}
function vDoctorDash(){const myQ=QUEUE.filter(q=>q.dept==='GP'&&q.status==='waiting'),myA=APPTS.filter(a=>a.dept==='General Practice');document.getElementById('vc').innerHTML=`<div class="ph"><h1>Good Morning, ${S.user.name.split(' ').slice(0,3).join(' ')}</h1><p>General Practice</p></div>${sgHTML([{ic:svgi(P.users),val:myQ.length,lbl:'Queue'},{cls:'g',ic:svgi(P.chk,'#27ae60'),val:myA.filter(a=>a.status==='completed').length,lbl:'Completed'},{cls:'o',ic:svgi(P.cal,'#f39c12'),val:myA.filter(a=>a.status==='confirmed').length,lbl:'Scheduled'},{cls:'b',ic:svgi(P.clk,'#2980b9'),val:QCALLED,lbl:'Serving'}])}<div class="g2"><div class="card"><div class="card-hd"><span class="card-title">Queue (GP)</span><span class="badge ${myQ.length?'bs':'bn'}"><span class="dot"></span>&nbsp;${myQ.length?'Active':'Empty'}</span></div><div class="card-bd">${myQ.length?myQ.slice(0,6).map((q,i)=>`<div style="display:flex;align-items:center;gap:.72rem;padding:.68rem;border-radius:9px;background:${i===0?'rgba(139,26,26,.06)':'var(--g100)'};margin-bottom:.38rem"><div style="width:32px;height:32px;border-radius:50%;background:${i===0?'var(--red)':'var(--g200)'};display:flex;align-items:center;justify-content:center;font-weight:700;font-size:.7rem;color:${i===0?'#fff':'var(--g500)'};flex-shrink:0">${q.number.split('-')[1]}</div><div style="flex:1"><div style="font-size:.82rem;font-weight:600">${q.patient}</div><div style="font-size:.7rem;color:var(--g400)">${q.time} · ${q.type}</div></div><button class="btn btn-primary btn-sm" onclick="callPatient('${q.id}')">Call</button></div>`).join(''):`<div style="text-align:center;padding:1.5rem;color:var(--g400);font-size:.82rem">No patients</div>`}<button class="btn btn-ghost btn-sm btn-full" style="margin-top:.55rem" onclick="nav('queue-mgmt')">Full Queue</button></div></div><div class="card"><div class="card-hd"><span class="card-title">Schedule</span></div><div class="card-bd">${myA.length?myA.slice(0,5).map(a=>`<div class="appt-card"><div class="appt-badge"><strong>${a.time}</strong><span>${a.date}</span></div><div class="appt-info"><div class="appt-doc">${a.patient}</div><div class="appt-dept">${a.type}</div></div><span class="badge ${a.status==='completed'?'bs':a.status==='confirmed'?'bi':'bn'}">${a.status}</span></div>`).join(''):`<div style="text-align:center;padding:1.5rem;color:var(--g400);font-size:.82rem">No appointments</div>`}</div></div></div>`;}
function vDentistDash(){const myId=S.user.id,myQ=QUEUE.filter(q=>q.dept==='Dental'&&q.status==='waiting'&&(q.doctorId===myId||!q.doctorId)),myA=APPTS.filter(a=>a.dept==='Dental'&&a.doctorId===myId);document.getElementById('vc').innerHTML=`<div class="ph"><h1>Good Morning, ${S.user.name.split(' ').slice(0,3).join(' ')}</h1><p>Dental Clinic — Personal Dentist System</p></div>${sgHTML([{ic:svgi(P.users),val:myQ.length,lbl:'Dental Queue'},{cls:'g',ic:svgi(P.chk,'#27ae60'),val:myA.filter(a=>a.status==='completed').length,lbl:'Completed'},{cls:'o',ic:svgi(P.cal,'#f39c12'),val:myA.filter(a=>a.status==='confirmed').length,lbl:'Appointments'},{cls:'b',ic:svgi(P.clk,'#2980b9'),val:myA.length,lbl:'Total Assigned'}])}<div class="g2"><div class="card"><div class="card-hd"><span class="card-title">Dental Queue (Your Patients)</span><span class="badge ${myQ.length?'bs':'bn'}"><span class="dot"></span>&nbsp;${myQ.length?'Active':'Empty'}</span></div><div class="card-bd">${myQ.length?myQ.slice(0,5).map((q,i)=>`<div style="display:flex;align-items:center;gap:.72rem;padding:.68rem;border-radius:9px;background:${i===0?'rgba(139,26,26,.06)':'var(--g100)'};margin-bottom:.38rem"><div style="width:32px;height:32px;border-radius:50%;background:${i===0?'var(--red)':'var(--g200)'};display:flex;align-items:center;justify-content:center;font-weight:700;font-size:.7rem;color:${i===0?'#fff':'var(--g500)'};flex-shrink:0">${q.number.split('-')[1]}</div><div style="flex:1"><div style="font-size:.82rem;font-weight:600">${q.patient}</div><div style="font-size:.7rem;color:var(--g400)">${q.time}</div></div><button class="btn btn-primary btn-sm" onclick="callPatient('${q.id}')">Call</button></div>`).join(''):`<div style="text-align:center;padding:1.5rem;color:var(--g400);font-size:.82rem">No dental patients assigned</div>`}<button class="btn btn-ghost btn-sm btn-full" style="margin-top:.55rem" onclick="nav('queue-mgmt')">Manage Queue</button></div></div><div class="card"><div class="card-hd"><span class="card-title">My Dental Appointments</span></div><div class="card-bd">${myA.length?myA.slice(0,5).map(a=>`<div class="appt-card"><div class="appt-badge"><strong>${a.time}</strong><span>${a.date}</span></div><div class="appt-info"><div class="appt-doc">${a.patient}</div><div class="appt-dept">${a.type}</div></div><span class="badge ${a.status==='completed'?'bs':a.status==='confirmed'?'bi':'bn'}">${a.status}</span></div>`).join(''):`<div style="text-align:center;padding:1.5rem;color:var(--g400);font-size:.82rem">No dental appointments yet</div>`}</div></div></div>`;}
function vPharmaDash(){const rev=BILLS.reduce((s,b)=>s+(b.status==='paid'?b.items.reduce((ss,i)=>ss+i.p,0):0),0);document.getElementById('vc').innerHTML=`<div class="ph"><h1>Pharmacy Dashboard</h1><p>Prescription queue and dispensing</p></div>${sgHTML([{ic:svgi(P.rx),val:PRESCRIPTIONS.length,lbl:'Total Prescriptions'},{cls:'g',ic:svgi(P.chk,'#27ae60'),val:PRESCRIPTIONS.filter(p=>p.status==='collected').length,lbl:'Dispensed'},{cls:'o',ic:svgi(P.clk,'#f39c12'),val:PRESCRIPTIONS.filter(p=>p.status==='pending'||p.status==='processing').length,lbl:'Pending'},{cls:'b',ic:svgi(P.dol,'#2980b9'),val:'RM '+rev.toFixed(2),lbl:'Revenue'}])}<div class="card"><div class="card-hd"><span class="card-title">Active Queue</span><span class="badge bs"><span class="dot"></span>&nbsp;Live</span></div><div class="card-bd">${PRESCRIPTIONS.filter(p=>p.status!=='collected').length?`<div class="tw"><table><thead><tr><th>RX</th><th>Patient</th><th>Medications</th><th>Counter</th><th>Status</th><th>Action</th></tr></thead><tbody>${PRESCRIPTIONS.filter(p=>p.status!=='collected').map(p=>`<tr><td><strong>${p.rx}</strong></td><td>${p.patient}</td><td style="font-size:.77rem;color:var(--g400)">${p.meds}</td><td>${p.counter||'—'}</td><td><span class="badge ${p.status==='ready'?'bs':p.status==='processing'?'bi':'bw'}">${p.status}</span></td><td><button class="btn btn-primary btn-sm" onclick="openRxUpdate('${p.id}')">Update</button></td></tr>`).join('')}</tbody></table></div>`:`<div style="text-align:center;padding:1.5rem;color:var(--g400);font-size:.82rem">No active prescriptions</div>`}</div></div>`;}

function openRxUpdate(id){const rx=PRESCRIPTIONS.find(p=>p.id===id);if(!rx)return;openModal('Update Prescription — '+rx.rx,'<div style="margin-bottom:.88rem"><div style="font-size:.82rem;color:var(--g500)">Patient: <strong>'+rx.patient+'</strong></div><div style="font-size:.82rem;color:var(--g500);margin-top:.2rem">Meds: <strong>'+rx.meds+'</strong></div></div><p style="font-size:.81rem;font-weight:600;color:var(--g700);margin-bottom:.55rem">Update Status:</p><div style="display:flex;flex-direction:column;gap:.38rem">'+['pending','processing','ready','collected'].map(s=>'<label style="display:flex;align-items:center;gap:.62rem;padding:.55rem;border-radius:8px;border:1.5px solid '+(rx.status===s?'var(--red)':'var(--g200)')+';cursor:pointer"><input type="radio" name="rxSt" value="'+s+'" '+(rx.status===s?'checked':'')+' style="accent-color:var(--red)"><span style="font-size:.82rem;font-weight:500;text-transform:capitalize">'+s+'</span></label>').join('')+'</div>',[{lbl:'Cancel',cls:'btn-ghost',fn:'closeModal()'},{lbl:'Update',cls:'btn-primary',fn:"doRxUpdate('"+id+"')"}]);}
function doRxUpdate(id){const rx=PRESCRIPTIONS.find(p=>p.id===id);if(!rx)return;const sel=document.querySelector('input[name="rxSt"]:checked');if(!sel)return;rx.status=sel.value;if(rx.status==='ready'){rx.counter='Counter 1';addNotif('pharma','g','Medication Ready','Prescription '+rx.rx+' ready at '+rx.counter);}closeModal();toast('Updated to: '+sel.value,'s');nav('pharma-mgmt');}
function vQueue(){const u=S.user,myT=QUEUE.find(q=>q.pid===u.id&&q.status==='waiting'),wGP=QUEUE.filter(q=>q.dept==='GP'&&q.status==='waiting'),wDen=QUEUE.filter(q=>q.dept==='Dental'&&q.status==='waiting');document.getElementById('vc').innerHTML=`<div class="ph"><h1>QR Queue System</h1><p>Real-time queue — moves only when doctor calls</p></div><div class="g2" style="margin-bottom:.95rem"><div>${myT?`<div class="q-hero"><div style="position:relative;z-index:1"><div style="font-size:.72rem;opacity:.75;margin-bottom:.25rem;letter-spacing:.06em">YOUR QUEUE NUMBER</div><div class="q-num">${myT.number}</div><div class="q-lbl">${myT.dept} — ${myT.doctor||'Assigned Doctor'}</div><div style="margin-top:.8rem;background:rgba(255,255,255,.13);border-radius:8px;padding:.52rem .8rem"><div style="display:flex;justify-content:space-between;font-size:.72rem;opacity:.85"><span>Now Serving</span><span>${QCALLED>0?'Q-'+String(QCALLED).padStart(3,'0'):'Not started'}</span></div></div><div class="q-live" style="margin-top:.8rem"><div class="pls"></div><span>${QCALLED>=parseInt(myT.number.split('-')[1])?'Your turn! Proceed to room.':QUEUE.filter(q=>q.status==='waiting'&&parseInt(q.number.split('-')[1])<parseInt(myT.number.split('-')[1])).length===0?'You are next!':QUEUE.filter(q=>q.status==='waiting'&&parseInt(q.number.split('-')[1])<parseInt(myT.number.split('-')[1])).length+' ahead'}</span></div></div></div><div class="card" style="margin-top:.95rem"><div class="card-hd"><span class="card-title">Progress</span></div><div class="card-bd"><div style="display:flex;justify-content:space-between;font-size:.76rem;color:var(--g500);margin-bottom:.42rem"><span>Served: ${QCALLED}</span><span>Your No.: ${parseInt(myT.number.split('-')[1])}</span></div><div class="prog-bar"><div class="prog-fill" style="width:${QUEUE.filter(q=>q.dept===myT.dept).length>0?Math.min(Math.round((QCALLED/QUEUE.filter(q=>q.dept===myT.dept).length)*100),100):0}%"></div></div><div style="display:flex;gap:.52rem;margin-top:.8rem"><button class="btn btn-outline btn-sm" style="flex:1" onclick="dlQR('${myT.id}')">${IC.dl} QR Ticket</button><button class="btn btn-ghost btn-sm" style="flex:1" onclick="cancelMyQ('${myT.id}')">Cancel</button></div></div></div>`:`<div class="card"><div class="card-bd" style="text-align:center;padding:1.75rem"><p style="color:var(--g400);font-size:.82rem;margin-bottom:.8rem">No active queue ticket</p><button class="btn btn-primary" onclick="openGetQ()">Walk In</button></div></div>`}<div class="card" style="margin-top:.95rem"><div class="card-hd"><span class="card-title">Navigation</span></div><div class="card-bd"><div style="background:var(--g100);border-radius:8px;padding:.78rem;font-size:.77rem;color:var(--g500);line-height:1.75"><strong style="color:var(--g700);display:block;margin-bottom:.28rem">PKU Ground Floor</strong>1. Main entrance → turn left<br>2. Red floor line → Waiting Area A<br>3. GP: Rooms 1–4 · Dental: Right wing D1–D2</div></div></div></div><div class="card"><div class="card-hd"><span class="card-title">Live Queue Board</span><span class="badge bs"><span class="dot"></span>&nbsp;Doctor-controlled</span></div><div class="card-bd"><div style="margin-bottom:.82rem"><div style="font-size:.76rem;font-weight:600;color:var(--g700);margin-bottom:.42rem">General Practice</div>${wGP.length?wGP.slice(0,5).map(q=>`<div style="display:flex;justify-content:space-between;align-items:center;padding:.4rem .62rem;border-radius:7px;background:${q.pid===u.id?'rgba(139,26,26,.08)':'var(--g100)'};margin-bottom:.26rem;border-left:3px solid ${QCALLED===parseInt(q.number.split('-')[1])?'var(--green)':q.pid===u.id?'var(--red)':'transparent'}"><span style="font-weight:${q.pid===u.id?700:500};font-size:.79rem">${q.number}${q.pid===u.id?' (You)':''}</span><span class="badge ${QCALLED===parseInt(q.number.split('-')[1])?'bs':'bw'}">${QCALLED===parseInt(q.number.split('-')[1])?'Called':'Waiting'}</span></div>`).join(''):`<div style="font-size:.78rem;color:var(--g400);padding:.38rem">No GP patients</div>`}</div><div><div style="font-size:.76rem;font-weight:600;color:var(--g700);margin-bottom:.42rem">Dental Clinic</div>${wDen.length?wDen.slice(0,5).map(q=>`<div style="display:flex;justify-content:space-between;align-items:center;padding:.4rem .62rem;border-radius:7px;background:${q.pid===u.id?'rgba(41,128,185,.08)':'var(--g100)'};margin-bottom:.26rem"><span style="font-weight:${q.pid===u.id?700:500};font-size:.79rem">${q.number}${q.pid===u.id?' (You)':''}</span><span class="badge bw">Waiting</span></div>`).join(''):`<div style="font-size:.78rem;color:var(--g400);padding:.38rem">No dental patients</div>`}</div></div></div>`;}
function openGetQ(){openModal('Walk In — Get Queue Number','<p style="color:var(--g500);font-size:.83rem;margin-bottom:.95rem">Select the service you need:</p><div style="display:flex;flex-direction:column;gap:.48rem"><div class="pay-opt sel" id="qOptGP" onclick="selQDept(\'GP\',this)"><div class="pay-opt-ic" style="background:rgba(139,26,26,.08)">'+svgi(P.users)+'</div><div class="pay-opt-txt"><strong>General Practice</strong><span>Consultation, follow-up, vaccination</span></div><div class="pay-radio sel"><div></div></div></div><div class="pay-opt" id="qOptDen" onclick="selQDept(\'Dental\',this)"><div class="pay-opt-ic" style="background:rgba(41,128,185,.08)">'+IC.teeth+'</div><div class="pay-opt-txt"><strong>Dental Clinic</strong><span>Personal dentist assignment</span></div><div class="pay-radio"></div></div></div><div class="fg" style="margin-top:.88rem"><label class="lbl">Visit Type</label><select class="inp" id="qType"><option>Consultation</option><option>Follow-up</option><option>Checkup</option><option>Vaccination</option></select></div>',[{lbl:'Cancel',cls:'btn-ghost',fn:'closeModal()'},{lbl:'Get Number',cls:'btn-primary',fn:'confirmGetQ()'}]);window._qDept='GP';}
function selQDept(dept,el){window._qDept=dept;document.querySelectorAll('#qOptGP,#qOptDen').forEach(o=>{o.classList.remove('sel');o.querySelector('.pay-radio').classList.remove('sel');});el.classList.add('sel');el.querySelector('.pay-radio').classList.add('sel');}
function confirmGetQ(){const u=S.user,dept=window._qDept||'GP',type=document.getElementById('qType')?.value||'Consultation';let doctor='',doctorId='';if(dept==='Dental'){const prior=APPTS.find(a=>a.pid===u.id&&a.dept==='Dental'&&a.doctorId);if(prior){doctor=prior.doctor;doctorId=prior.doctorId;}else{const d=STAFF.find(s=>s.role==='Dentist'&&s.status==='on-duty');doctor=d?d.name:'Dr. Siti Norzalina Aziz';doctorId=d?d.id:'DEN001';}}else{const d=STAFF.find(s=>s.role==='Doctor'&&s.status==='on-duty');doctor=d?d.name:'Dr. Mohd Hafiz Ismail';doctorId=d?d.id:'DOC001';}const num=++QC,qNum='Q-'+String(num).padStart(3,'0');QUEUE.push({id:'QT'+Date.now(),number:qNum,pid:u.id,patient:u.name,dept,type,doctor,doctorId,time:fmtTime(),status:'waiting'});addNotif('queue','','Queue Registered','Your number is '+qNum+' for '+dept+'. Doctor: '+doctor);closeModal();toast('Queue '+qNum+' issued!','s');nav('queue');}
function dlQR(id){const t=QUEUE.find(q=>q.id===id);if(!t){toast('Ticket not found','e');return;}dlFile('QR_'+t.number+'.html',genQRHTML(t));toast('QR ticket downloaded','s');}
function vQueueMgmt(){const r=S.user.role,dept=r==='dentist'?'Dental':'GP',myQ=r==='admin'?QUEUE:QUEUE.filter(q=>q.dept===dept),waiting=myQ.filter(q=>q.status==='waiting');document.getElementById('vc').innerHTML=`<div class="ph-row"><div class="ph" style="margin-bottom:0"><h1>Queue Management</h1><p>Queue moves only when you click Call</p></div>${r==='admin'?'<button class="btn btn-danger btn-sm" onclick="confirmResetQ()">Reset Queue</button>':''}</div><div style="height:1.1rem"></div>${sgHTML([{ic:svgi(P.users),val:waiting.length,lbl:'Waiting'},{cls:'g',ic:svgi(P.chk,'#27ae60'),val:myQ.filter(q=>q.status==='done').length,lbl:'Served'},{cls:'o',ic:svgi(P.clk,'#f39c12'),val:QCALLED,lbl:'Called'},{cls:'b',ic:svgi(P.users,'#2980b9'),val:myQ.length,lbl:'Total'}])}<div class="card"><div class="card-hd"><span class="card-title">Patient Queue</span><span class="badge bs"><span class="dot"></span>&nbsp;Doctor-controlled</span></div><div class="card-bd">${waiting.length?`<div class="tw"><table><thead><tr><th>Number</th><th>Patient</th><th>Dept</th><th>Type</th><th>Time</th><th>Doctor</th><th>Status</th><th>Actions</th></tr></thead><tbody>${waiting.map(q=>`<tr><td><strong style="color:${QCALLED===parseInt(q.number.split('-')[1])?'var(--green)':'var(--red)'}">${q.number}</strong></td><td>${q.patient}</td><td>${q.dept}</td><td>${q.type}</td><td>${q.time}</td><td style="font-size:.76rem">${q.doctor}</td><td><span class="badge ${QCALLED===parseInt(q.number.split('-')[1])?'bs':'bw'}">${QCALLED===parseInt(q.number.split('-')[1])?'Called':'Waiting'}</span></td><td style="display:flex;gap:.28rem;flex-wrap:wrap"><button class="btn btn-primary btn-sm" onclick="callPatient('${q.id}')">Call</button><button class="btn btn-ghost btn-sm" onclick="skipPatient('${q.id}')">Skip</button><button class="btn btn-success btn-sm" onclick="donePatient('${q.id}')">Done</button></td></tr>`).join('')}</tbody></table></div>`:`<div style="text-align:center;padding:2rem;color:var(--g400)">No patients in queue</div>`}</div></div>`;}
function callPatient(id){const q=QUEUE.find(x=>x.id===id);if(!q)return;QCALLED=parseInt(q.number.split('-')[1]);q.status='consulting';addNotif('queue','g','Your Turn — '+q.number,'Proceed to consultation room. Doctor: '+q.doctor);toast(q.number+' called — '+q.patient,'s');buildNav();nav('queue-mgmt');}
function skipPatient(id){const q=QUEUE.find(x=>x.id===id);if(!q)return;q.status='skipped';addNotif('queue','o','Queue Skipped','Number '+q.number+' skipped. Please report to front desk.');toast(q.number+' skipped','w');nav('queue-mgmt');}
function donePatient(id){const q=QUEUE.find(x=>x.id===id);if(!q)return;q.status='done';const billId='INV-'+new Date().getFullYear()+'-'+String(BC++).padStart(4,'0');BILLS.push({id:billId,pid:q.pid,patient:q.patient,items:[{n:'Consultation Fee',p:q.dept==='Dental'?SYS.dentalFee:SYS.consultFee}],status:'unpaid',method:null,date:fmtDate()});addNotif('billing','o','Invoice Generated','Invoice '+billId+' for your visit. Pay at billing counter.');if(q.dept==='GP'){const rxId='RX-'+new Date().getFullYear()+'-'+String(RC++).padStart(4,'0');PRESCRIPTIONS.push({id:'PR'+Date.now(),rx:rxId,pid:q.pid,patient:q.patient,doctor:q.doctor,meds:'As prescribed by doctor',status:'pending',counter:'—',date:fmtDate()});addNotif('pharma','','Prescription Issued','Prescription '+rxId+' issued. Collect at pharmacy.');}toast('Done — bill and prescription created','s');nav('queue-mgmt');}
function confirmResetQ(){openModal('Reset Queue — Step 1 of 2','<div class="ib ib-r">'+IC.warn+'<span><strong>Warning:</strong> Clears ALL '+QUEUE.filter(q=>q.status==='waiting').length+' waiting tickets. Cannot be undone.</span></div><p style="font-size:.82rem;color:var(--g600);margin-bottom:.8rem">Type <strong>RESET</strong> to continue:</p><div class="fg"><input class="inp" id="rc1" type="text" placeholder="Type RESET"></div>',[{lbl:'Cancel',cls:'btn-ghost',fn:'closeModal()'},{lbl:'Continue →',cls:'btn-danger',fn:'confirmResetQ2()'}]);}
function confirmResetQ2(){if(document.getElementById('rc1')?.value!=='RESET'){toast('Type RESET exactly','e');return;}closeModal();openModal('Final Confirmation','<p style="font-size:.88rem;text-align:center;padding:1rem;color:var(--g700)">Permanently delete <strong style="color:var(--danger)">'+QUEUE.filter(q=>q.status==='waiting').length+' active tickets</strong>?</p>',[{lbl:'Cancel',cls:'btn-ghost',fn:'closeModal()'},{lbl:'Yes, Reset All',cls:'btn-danger',fn:'doResetQ()'}]);}
function doResetQ(){QUEUE=[];QC=1;QCALLED=0;closeModal();toast('Queue reset complete','s');buildNav();nav('queue-mgmt');}
function vAppointments(){const u=S.user,isAdmin=u.role==='admin',isDoc=(u.role==='doctor'||u.role==='dentist'),data=isAdmin?APPTS:isDoc?APPTS.filter(a=>a.dept===(u.role==='dentist'?'Dental':'General Practice')):APPTS.filter(a=>a.pid===u.id);document.getElementById('vc').innerHTML=`<div class="ph-row"><div class="ph" style="margin-bottom:0"><h1>Appointments</h1><p>${isAdmin?'All system appointments':isDoc?'Your patients appointments':'Your appointments'}</p></div><div style="display:flex;gap:.52rem;flex-wrap:wrap">${isAdmin?'<button class="btn btn-outline btn-sm" onclick="exportApptRpt()">Export</button>':''}${!isDoc?'<button class="btn btn-primary" onclick="openBooking()"><svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>Book</button>':''}</div></div><div style="height:1.1rem"></div><div class="tabs"><div class="tab active" onclick="filterTab(this,'all')">All (${data.length})</div><div class="tab" onclick="filterTab(this,'confirmed')">Confirmed</div><div class="tab" onclick="filterTab(this,'completed')">Completed</div><div class="tab" onclick="filterTab(this,'cancelled')">Cancelled</div></div><div class="card"><div class="card-bd"><div class="tw"><table><thead><tr><th>ID</th><th>Patient</th><th>Dept</th><th>Doctor</th><th>Date</th><th>Time</th><th>Status</th><th>Actions</th></tr></thead><tbody id="apptTbl">${data.length?data.map(a=>`<tr data-st="${a.status}"><td><strong>${a.id}</strong></td><td>${a.patient}</td><td>${a.dept}</td><td>${a.doctor}</td><td>${a.date}</td><td><strong>${a.time}</strong></td><td><span class="badge ${a.status==='confirmed'?'bs':a.status==='completed'?'bn':'bd'}">${a.status}</span></td><td style="display:flex;gap:.26rem;flex-wrap:wrap"><button class="btn btn-ghost btn-sm" onclick="dlApptSlip('${a.id}')">${IC.dl}</button>${a.status!=='completed'&&a.status!=='cancelled'?`<button class="btn btn-danger btn-sm" onclick="cancelAppt('${a.id}',this)">Cancel</button>`:''}</td></tr>`).join(''):`<tr><td colspan="8" style="text-align:center;padding:2rem;color:var(--g400)">No appointments. <button class="btn btn-ghost btn-sm" onclick="openBooking()">Book now</button></td></tr>`}</tbody></table></div></div></div>`;}
function filterTab(el,st){document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));el.classList.add('active');document.querySelectorAll('#apptTbl tr[data-st]').forEach(r=>{r.style.display=(st==='all'||r.dataset.st===st)?'':'none';});}
function dlApptSlip(id){const a=APPTS.find(x=>x.id===id);if(!a)return;dlFile('Appointment_'+a.id+'.html',genSlipHTML(a));toast('Slip downloaded','s');}
function cancelAppt(id,btn){const a=APPTS.find(x=>x.id===id);if(!a)return;a.status='cancelled';const row=btn?.closest('tr');if(row){const b=row.querySelector('.badge');if(b){b.className='badge bd';b.textContent='cancelled';}btn.remove();}addNotif('appt','o','Appointment Cancelled','Appointment '+a.id+' cancelled.');toast('Cancelled','i');}
function exportApptRpt(){dlFile('UTHM_PKU_Appointments.html','<!DOCTYPE html><html><head><title>Appointments</title><style>body{font-family:Arial;max-width:750px;margin:40px auto;padding:24px}.hd{background:#8B1A1A;color:white;padding:18px;border-radius:8px;margin-bottom:18px}table{width:100%;border-collapse:collapse}th,td{padding:8px 12px;border:1px solid #eee;font-size:.82rem}th{background:#f5f0e8}.foot{text-align:center;font-size:.7rem;color:#888;margin-top:18px}</style></head><body><div class="hd"><h2 style="margin:0">UTHM PKU Appointment Report</h2><p style="margin:.3rem 0 0;opacity:.8;font-size:.78rem">Generated: '+new Date().toLocaleString('en-MY')+'</p></div><table><tr><th>ID</th><th>Patient</th><th>Dept</th><th>Doctor</th><th>Date</th><th>Time</th><th>Status</th></tr>'+APPTS.map(a=>'<tr><td>'+a.id+'</td><td>'+a.patient+'</td><td>'+a.dept+'</td><td>'+a.doctor+'</td><td>'+a.date+'</td><td>'+a.time+'</td><td>'+a.status+'</td></tr>').join('')+'</table><div class="foot">UTHM PKU — github.com/paim41</div></body></html>');toast('Report downloaded','s');}
let bStep=1,bDept=null,bDoc=null,bDate=null,bTime=null;
const DEPT_DOCS={'General Practice':['DOC001','DOC002'],'Dental':['DEN001','DEN002']};
function openBooking(){bStep=1;bDept=null;bDoc=null;bDate=null;bTime=null;showBS();}
function showBS(){const sl=['Department','Doctor','Date & Time','Confirm'],stH='<div class="steps">'+sl.map((l,i)=>'<div class="step '+(i<bStep-1?'done':i===bStep-1?'cur':'')+'"><div class="step-c">'+(i<bStep-1?'✓':i+1)+'</div><div class="step-lbl">'+l+'</div></div>').join('')+'</div>';const btns=[];if(bStep>1)btns.push({lbl:'← Back',cls:'btn-outline',fn:'prevBS()'});btns.push({lbl:'Cancel',cls:'btn-ghost',fn:'closeModal()'});btns.push({lbl:bStep<4?'Next →':'Confirm Booking',cls:'btn-primary',fn:'nextBS()'});let body=stH;
if(bStep===1)body+='<p style="color:var(--g500);font-size:.82rem;margin-bottom:.88rem">Choose department:</p><div class="g2">'+['General Practice','Dental'].map(d=>'<div class="dc '+(bDept===d?'sel':'')+'" onclick="bDept=\''+d+'\';document.querySelectorAll(\'.dc\').forEach(x=>x.classList.remove(\'sel\'));this.classList.add(\'sel\')"><div class="dc-ic">'+(d==='Dental'?IC.teeth:svgi(P.users))+'</div><div class="dc-nm">'+d+'</div><div style="font-size:.69rem;color:var(--g400);margin-top:.18rem">'+(d==='Dental'?'Personal dentist assigned':'General practitioners')+'</div></div>').join('')+'</div>';
else if(bStep===2){const dids=DEPT_DOCS[bDept]||[],docs=dids.map(id=>USERS_DB[id]).filter(Boolean),onD=STAFF.filter(s=>dids.includes(s.id)&&s.status==='on-duty'),priorDoc=bDept==='Dental'?APPTS.find(a=>a.pid===S.user.id&&a.dept==='Dental'&&a.doctorId)?.doctorId:null;body+='<p style="color:var(--g500);font-size:.82rem;margin-bottom:.88rem">Select your '+(bDept==='Dental'?'personal ':'')+' doctor:</p>'+docs.map(d=>{const duty=onD.find(s=>s.id===d.id),isPrior=d.id===priorDoc;return'<div class="pay-opt '+(bDoc===d.id?'sel':'')+'" onclick="bDoc=\''+d.id+'\';document.querySelectorAll(\'.pay-opt\').forEach(x=>{x.classList.remove(\'sel\');x.querySelector(\'.pay-radio\').classList.remove(\'sel\')});this.classList.add(\'sel\');this.querySelector(\'.pay-radio\').classList.add(\'sel\')"><div class="pay-opt-ic" style="background:rgba(139,26,26,.08)">'+svgi(P.users)+'</div><div class="pay-opt-txt"><strong>'+d.name+(isPrior?' ⭐ Your dentist':'')+'</strong><span>'+(d.spec||'Specialist')+' · ★'+(d.rating||'4.8')+' · '+(duty?'<span style="color:var(--green);font-weight:600">On Duty</span>':'<span style="color:var(--danger)">Off Duty</span>')+'</span></div><div class="pay-radio"></div></div>';}).join('');}
else if(bStep===3){const now=new Date(),nowMins=now.getHours()*60+now.getMinutes();
    const allSlots=['08:30','09:00','09:30','10:00','10:30','11:00','14:00','14:30','15:00','15:30'];
    // For today: only show slots that haven't passed yet (with 30min buffer)
    // For future dates: show all slots
    const isToday=bDate===new Date().toLocaleDateString('en-MY',{day:'numeric',month:'long',year:'numeric'});
    const slots=allSlots.filter(t=>{
      if(!bDate)return true;
      const [h,m]=t.split(':').map(Number);
      const slotMins=h*60+m;
      return !isToday||(slotMins>nowMins+30);
    });body+='<div class="g2" style="gap:1.1rem"><div><p style="font-size:.79rem;font-weight:600;color:var(--g700);margin-bottom:.6rem">Select Date</p><div id="calBox"></div></div><div><p style="font-size:.79rem;font-weight:600;color:var(--g700);margin-bottom:.6rem">Time Slots</p><div style="display:grid;grid-template-columns:1fr 1fr;gap:.36rem" id="slotGrid">'+slots.map(s=>'<button class="btn btn-ghost btn-sm '+(bTime===s?'btn-primary':'')+'" onclick="bTime=\''+s+'\';document.querySelectorAll(\'#slotGrid button\').forEach(b=>{b.classList.remove(\'btn-primary\');b.classList.add(\'btn-ghost\')});this.classList.add(\'btn-primary\');this.classList.remove(\'btn-ghost\')" style="justify-content:center">'+s+'</button>').join('')+'</div></div></div>';}
else{const doc=USERS_DB[bDoc];body+='<div style="background:var(--g100);border-radius:10px;padding:1rem;margin-bottom:.82rem"><h4 style="font-family:\'Playfair Display\',serif;margin-bottom:.78rem;color:var(--g900)">Summary</h4>'+[['Department',bDept],['Doctor',doc?.name||'TBA'],['Date',bDate||'Not selected'],['Time',bTime||'Not selected'],['Patient',S.user.name],['Fee',fmtMoney(bDept==='Dental'?SYS.dentalFee:SYS.consultFee)]].map(([k,v])=>'<div style="display:flex;justify-content:space-between;padding:.4rem 0;border-bottom:1px solid var(--g200)"><span style="font-size:.8rem;color:var(--g400)">'+k+'</span><strong style="font-size:.8rem">'+v+'</strong></div>').join('')+'</div><div class="ib ib-r">'+IC.info+'<span>Arrive 10 minutes early. Cancellations must be ≥2 hours before.</span></div>';}
openModal('Book Appointment — Step '+bStep+' of 4',body,btns);if(bStep===3)setTimeout(()=>{const e=document.getElementById('calBox');if(e)e.innerHTML=renderCal();},30);}
function nextBS(){if(bStep===1&&!bDept){toast('Select a department','e');return;}if(bStep===2&&!bDoc){toast('Select a doctor','e');return;}if(bStep===3&&(!bDate||!bTime)){toast('Select date and time','e');return;}if(bStep===4){const u=S.user,doc=USERS_DB[bDoc],id='APT-'+new Date().getFullYear()+'-'+String(AC++).padStart(4,'0');APPTS.push({id,pid:u.id,patient:u.name,dept:bDept,doctor:doc?.name||'TBA',doctorId:bDoc,date:bDate,time:bTime,type:'Consultation',status:'confirmed'});addNotif('appt','g','Appointment Confirmed',id+' on '+bDate+' at '+bTime+' confirmed.');closeModal();toast('Appointment '+id+' booked!','s');nav('appointments');return;}bStep++;showBS();}
function prevBS(){if(bStep>1){bStep--;showBS();}}
function renderCal(){const M=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],D=['Su','Mo','Tu','We','Th','Fr','Sa'],t=new Date(),m=S.calM,y=S.calY,fd=new Date(y,m,1).getDay(),dim=new Date(y,m+1,0).getDate();let c='';for(let i=0;i<fd;i++)c+='<div class="cal-day emp"></div>';for(let d=1;d<=dim;d++){const ds=y+'-'+String(m+1).padStart(2,'0')+'-'+String(d).padStart(2,'0'),iT=d===t.getDate()&&m===t.getMonth()&&y===t.getFullYear(),iP=new Date(y,m,d)<new Date(t.getFullYear(),t.getMonth(),t.getDate());c+='<div class="cal-day '+(iT&&!iP?'today':'')+' '+(bDate===ds?'sel':'')+(iP?' past':'')+'" onclick="bDate=\''+ds+'\';document.querySelectorAll(\'.cal-day\').forEach(x=>x.classList.remove(\'sel\'));this.classList.add(\'sel\')">'+d+'</div>';}return'<div class="cal-nav"><button class="cal-nb" onclick="chCal(-1)"><svg width="9" height="9" viewBox="0 0 12 12" fill="none"><path d="M8 2L4 6l4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></button><span style="font-size:.79rem;font-weight:600;color:var(--g700)">'+M[m]+' '+y+'</span><button class="cal-nb" onclick="chCal(1)"><svg width="9" height="9" viewBox="0 0 12 12" fill="none"><path d="M4 2l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></button></div><div class="cal-hd">'+D.map(d=>'<div class="cal-dn">'+d+'</div>').join('')+'</div><div class="cal-grid">'+c+'</div>';}
function chCal(d){S.calM+=d;if(S.calM>11){S.calM=0;S.calY++;}if(S.calM<0){S.calM=11;S.calY--;}const e=document.getElementById('calBox');if(e)e.innerHTML=renderCal();}

function vBilling(){const u=S.user,myB=BILLS.filter(b=>b.pid===u.id);document.getElementById('vc').innerHTML='<div class="ph"><h1>Billing &amp; Payment</h1><p>Your invoices and payment history</p></div>'+sgHTML([{ic:svgi(P.rx),val:myB.length,lbl:'Total Invoices'},{cls:'g',ic:svgi(P.chk,'#27ae60'),val:myB.filter(b=>b.status==='paid').length,lbl:'Paid'},{cls:'o',ic:svgi(P.dol,'#f39c12'),val:myB.filter(b=>b.status==='unpaid').length,lbl:'Unpaid'},{cls:'b',ic:svgi(P.dol,'#2980b9'),val:'RM '+myB.filter(b=>b.status==='paid').reduce((s,b)=>s+b.items.reduce((ss,i)=>ss+i.p,0),0).toFixed(2),lbl:'Total Paid'}])+(myB.length?myB.map(b=>{const tot=b.items.reduce((s,i)=>s+i.p,0);return'<div class="inv-wrap"><div class="inv-hd"><div class="inv-meta"><div><div class="inv-logo">UTHM PKU</div><div style="font-size:.73rem;opacity:.8;margin-top:.14rem">University Health Centre</div></div><div class="inv-num"><div style="font-size:.88rem;font-weight:700">'+b.id+'</div><div>Date: '+b.date+'</div><div>Status: <strong>'+b.status.toUpperCase()+'</strong></div></div></div></div><div class="inv-body"><div class="tw"><table><thead><tr><th>Description</th><th style="text-align:right">Amount (RM)</th></tr></thead><tbody>'+b.items.map(i=>'<tr><td>'+i.n+'</td><td style="text-align:right;font-weight:600">'+i.p.toFixed(2)+'</td></tr>').join('')+'</tbody></table></div></div><div class="inv-foot"><div><div style="font-size:.72rem;opacity:.8">Payment</div><div style="font-size:.8rem">'+(b.status==='paid'?b.method:'—')+'</div></div><div style="text-align:right"><div style="font-size:.72rem;opacity:.8">Total</div><strong>'+fmtMoney(tot)+'</strong></div></div><div class="inv-actions"><button class="btn btn-ghost btn-sm" onclick="dlReceipt(\''+b.id+'\')">'+IC.dl+'Receipt</button>'+(b.status==='unpaid'?'<button class="btn btn-primary btn-sm" onclick="openPayM(\''+b.id+'\')">Pay Now — '+fmtMoney(tot)+'</button>':'<span class="badge bs" style="font-size:.74rem">Paid via '+b.method+'</span>')+'</div></div>';}).join(''):'<div class="card"><div class="card-bd" style="text-align:center;padding:2rem;color:var(--g400)">No bills yet. Bills generated after consultation.</div></div>');}
function dlReceipt(id){const b=BILLS.find(x=>x.id===id);if(!b)return;dlFile('Receipt_'+b.id+'.html',genReceiptHTML(b));toast('Receipt downloaded','s');}
function openPayM(id){S.payMethod='duitnow';const b=BILLS.find(x=>x.id===id);if(!b)return;const tot=b.items.reduce((s,i)=>s+i.p,0);openModal('Payment — '+id,'<div style="display:flex;justify-content:space-between;align-items:center;background:var(--g100);border-radius:9px;padding:.85rem 1rem;margin-bottom:.88rem"><span style="font-size:.83rem;color:var(--g500)">Amount Due</span><strong style="font-family:\'Playfair Display\',serif;font-size:1.38rem">'+fmtMoney(tot)+'</strong></div><p style="font-size:.81rem;font-weight:600;color:var(--g700);margin-bottom:.62rem">Payment Method</p><div id="payOpts">'+[['duitnow','DuitNow QR','Scan with banking app','rgba(41,128,185,.08)','#2980b9'],['smap','SMAP Account','Student/staff deduction','rgba(39,174,96,.08)','#27ae60'],['cash','Cash Payment','Pay at Billing Counter','rgba(243,156,18,.08)','#f39c12']].map(([m,n,d,bg,c],i)=>'<div class="pay-opt '+(i===0?'sel':'')+'" onclick="selPay(\''+m+'\',this)"><div class="pay-opt-ic" style="background:'+bg+'">'+svgi(P.dol,c)+'</div><div class="pay-opt-txt"><strong>'+n+'</strong><span>'+d+'</span></div><div class="pay-radio '+(i===0?'sel':'')+'" ></div></div>').join('')+'</div>',[{lbl:'Cancel',cls:'btn-ghost',fn:'closeModal()'},{lbl:'Pay '+fmtMoney(tot),cls:'btn-primary',fn:"processPayment('"+id+"')"}]);}
function selPay(m,el){S.payMethod=m;document.querySelectorAll('#payOpts .pay-opt').forEach(o=>{o.classList.remove('sel');o.querySelector('.pay-radio').classList.remove('sel');});el.classList.add('sel');el.querySelector('.pay-radio').classList.add('sel');}
function processPayment(id){const b=BILLS.find(x=>x.id===id);if(!b)return;b.status='paid';b.method=S.payMethod==='duitnow'?'DuitNow':S.payMethod==='smap'?'SMAP':'Cash';addNotif('billing','g','Payment Confirmed','Invoice '+b.id+' paid via '+b.method+'.');closeModal();dlReceipt(id);nav('billing');}
function vBillingAdmin(){const rev=BILLS.reduce((s,b)=>s+(b.status==='paid'?b.items.reduce((ss,i)=>ss+i.p,0):0),0);document.getElementById('vc').innerHTML='<div class="ph-row"><div class="ph" style="margin-bottom:0"><h1>Financial Reports</h1></div><button class="btn btn-primary btn-sm" onclick="dlAllBills()">Download Report</button></div><div style="height:1.1rem"></div>'+sgHTML([{ic:svgi(P.rx),val:BILLS.length,lbl:'Total Invoices'},{cls:'g',ic:svgi(P.chk,'#27ae60'),val:BILLS.filter(b=>b.status==='paid').length,lbl:'Paid'},{cls:'o',ic:svgi(P.dol,'#f39c12'),val:BILLS.filter(b=>b.status==='unpaid').length,lbl:'Unpaid'},{cls:'b',ic:svgi(P.dol,'#2980b9'),val:'RM '+rev.toFixed(2),lbl:'Revenue'}])+'<div class="card"><div class="card-bd"><div class="tw"><table><thead><tr><th>Invoice</th><th>Patient</th><th>Date</th><th>Amount</th><th>Status</th><th>Method</th><th>Action</th></tr></thead><tbody>'+(BILLS.length?BILLS.map(b=>'<tr><td><strong>'+b.id+'</strong></td><td>'+b.patient+'</td><td>'+b.date+'</td><td><strong>'+fmtMoney(b.items.reduce((s,i)=>s+i.p,0))+'</strong></td><td><span class="badge '+(b.status==='paid'?'bs':'bd')+'">'+b.status+'</span></td><td>'+(b.method||'—')+'</td><td><button class="btn btn-ghost btn-sm" onclick="dlReceipt(\''+b.id+'\')">'+IC.dl+'</button></td></tr>').join(''):'<tr><td colspan="7" style="text-align:center;padding:2rem;color:var(--g400)">No bills yet</td></tr>')+'</tbody></table></div></div></div>';}
function dlAllBills(){const rev=BILLS.reduce((s,b)=>s+(b.status==='paid'?b.items.reduce((ss,i)=>ss+i.p,0):0),0);dlFile('UTHM_PKU_Financial.html','<!DOCTYPE html><html><head><title>Financial Report</title><style>body{font-family:Arial;max-width:700px;margin:40px auto;padding:24px}.hd{background:#8B1A1A;color:white;padding:18px;border-radius:8px;margin-bottom:18px}table{width:100%;border-collapse:collapse;margin-bottom:16px}th,td{padding:8px 12px;border:1px solid #eee;font-size:.82rem}th{background:#f5f0e8}.foot{text-align:center;font-size:.7rem;color:#888;margin-top:16px}</style></head><body><div class="hd"><h2 style="margin:0">UTHM PKU Financial Report</h2><p style="margin:.3rem 0 0;opacity:.8;font-size:.78rem">Generated: '+new Date().toLocaleString('en-MY')+'</p></div><table><tr><th>Invoice</th><th>Patient</th><th>Date</th><th>Amount</th><th>Status</th><th>Method</th></tr>'+BILLS.map(b=>'<tr><td>'+b.id+'</td><td>'+b.patient+'</td><td>'+b.date+'</td><td>RM '+b.items.reduce((s,i)=>s+i.p,0).toFixed(2)+'</td><td>'+b.status+'</td><td>'+(b.method||'—')+'</td></tr>').join('')+'</table><div class="foot">UTHM PKU — github.com/paim41</div></body></html>');toast('Financial report downloaded','s');}
function vPharmacy(){const u=S.user,myRx=PRESCRIPTIONS.filter(p=>p.pid===u.id);document.getElementById('vc').innerHTML='<div class="ph"><h1>Pharmacy</h1><p>Prescription tracking and pickup</p></div>'+(myRx.filter(p=>p.status!=='collected').length?myRx.filter(p=>p.status!=='collected').map(p=>'<div class="card" style="margin-bottom:.88rem"><div class="card-hd"><span class="card-title">'+p.rx+'</span><span class="badge '+(p.status==='ready'?'bs':p.status==='processing'?'bi':'bw')+'">'+p.status+'</span></div><div class="card-bd"><div style="background:rgba(139,26,26,.04);border-left:3px solid var(--red);border-radius:8px;padding:.78rem .92rem;margin-bottom:.78rem"><div style="font-size:.72rem;color:var(--g400)">Issued by: '+p.doctor+' · '+p.date+'</div><div style="font-size:.86rem;font-weight:600;color:var(--g900);margin-top:.18rem">'+p.meds+'</div></div>'+(p.status==='ready'?'<div class="ib ib-g">'+IC.chk+'<span>Ready at <strong>'+p.counter+'</strong>. Bring IC or student card.</span></div>':p.status==='processing'?'<div class="ib ib-b">'+IC.info+'<span>Processing. Ready in ~10–15 min.</span></div>':'')+'</div></div>').join(''):'')+'<div class="card"><div class="card-hd"><span class="card-title">Prescription History</span></div><div class="card-bd">'+(myRx.length?'<div class="tw"><table><thead><tr><th>RX</th><th>Doctor</th><th>Medications</th><th>Date</th><th>Status</th></tr></thead><tbody>'+myRx.map(p=>'<tr><td><strong>'+p.rx+'</strong></td><td style="font-size:.76rem">'+p.doctor+'</td><td style="font-size:.76rem">'+p.meds+'</td><td>'+p.date+'</td><td><span class="badge '+(p.status==='collected'?'bn':p.status==='ready'?'bs':p.status==='processing'?'bi':'bw')+'">'+p.status+'</span></td></tr>').join('')+'</tbody></table></div>':'<div style="text-align:center;padding:1.5rem;color:var(--g400);font-size:.82rem">No prescriptions yet.</div>')+'</div></div>';}
function vPharmaMgmt(){document.getElementById('vc').innerHTML='<div class="ph-row"><div class="ph" style="margin-bottom:0"><h1>Prescription Queue</h1></div><button class="btn btn-outline btn-sm" onclick="dlRxReport()">Export</button></div><div style="height:1.1rem"></div><div class="tabs"><div class="tab active" onclick="filterRx(this,\'all\')">All ('+PRESCRIPTIONS.length+')</div><div class="tab" onclick="filterRx(this,\'pending\')">Pending</div><div class="tab" onclick="filterRx(this,\'processing\')">Processing</div><div class="tab" onclick="filterRx(this,\'ready\')">Ready</div><div class="tab" onclick="filterRx(this,\'collected\')">Collected</div></div><div class="card"><div class="card-bd"><div class="tw"><table><thead><tr><th>RX</th><th>Patient</th><th>Doctor</th><th>Medications</th><th>Date</th><th>Counter</th><th>Status</th><th>Action</th></tr></thead><tbody id="rxTbl">'+(PRESCRIPTIONS.length?PRESCRIPTIONS.map(p=>'<tr data-st="'+p.status+'"><td><strong>'+p.rx+'</strong></td><td>'+p.patient+'</td><td style="font-size:.76rem">'+p.doctor+'</td><td style="font-size:.76rem;color:var(--g400)">'+p.meds+'</td><td>'+p.date+'</td><td>'+(p.counter||'—')+'</td><td><span class="badge '+(p.status==='ready'?'bs':p.status==='processing'?'bi':p.status==='collected'?'bn':'bw')+'">'+p.status+'</span></td><td><button class="btn btn-primary btn-sm" onclick="openRxUpdate(\''+p.id+'\')">Update</button></td></tr>').join(''):'<tr><td colspan="8" style="text-align:center;padding:2rem;color:var(--g400)">No prescriptions yet</td></tr>')+'</tbody></table></div></div></div>';}
function filterRx(el,st){document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));el.classList.add('active');document.querySelectorAll('#rxTbl tr[data-st]').forEach(r=>{r.style.display=(st==='all'||r.dataset.st===st)?'':'none';});}
function dlRxReport(){dlFile('UTHM_PKU_Prescriptions.html','<!DOCTYPE html><html><head><title>Prescription Report</title><style>body{font-family:Arial;max-width:700px;margin:40px auto;padding:24px}.hd{background:#8B1A1A;color:white;padding:18px;border-radius:8px;margin-bottom:18px}table{width:100%;border-collapse:collapse}th,td{padding:8px 12px;border:1px solid #eee;font-size:.82rem}th{background:#f5f0e8}.foot{text-align:center;font-size:.7rem;color:#888;margin-top:16px}</style></head><body><div class="hd"><h2 style="margin:0">Prescription Report</h2><p style="margin:.3rem 0 0;opacity:.8;font-size:.78rem">Generated: '+new Date().toLocaleString('en-MY')+'</p></div><table><tr><th>RX</th><th>Patient</th><th>Doctor</th><th>Medications</th><th>Date</th><th>Status</th></tr>'+PRESCRIPTIONS.map(p=>'<tr><td>'+p.rx+'</td><td>'+p.patient+'</td><td>'+p.doctor+'</td><td>'+p.meds+'</td><td>'+p.date+'</td><td>'+p.status+'</td></tr>').join('')+'</table><div class="foot">UTHM PKU — github.com/paim41</div></body></html>');toast('Report downloaded','s');}
function vPrescriptions(){vPharmaMgmt();}
function vDrugInventory(){document.getElementById('vc').innerHTML='<div class="ph-row"><div class="ph" style="margin-bottom:0"><h1>Drug Inventory</h1></div><button class="btn btn-primary btn-sm" onclick="openReorder(-1)">+ Reorder</button></div><div style="height:1.1rem"></div>'+sgHTML([{ic:svgi(P.rx),val:DRUGS.length,lbl:'Drug Lines'},{cls:'g',ic:svgi(P.chk,'#27ae60'),val:DRUGS.filter(d=>d.stock>d.min*1.5).length,lbl:'Adequate'},{cls:'o',ic:svgi(P.clk,'#f39c12'),val:DRUGS.filter(d=>d.stock<=d.min*1.5).length,lbl:'Low Stock'},{cls:'b',ic:svgi(P.users,'#2980b9'),val:DRUGS.reduce((s,d)=>s+d.stock,0),lbl:'Total Units'}])+(DRUGS.some(d=>d.stock<=d.min*1.5)?'<div class="ib ib-o">'+IC.warn+'<span><strong>Low stock:</strong> '+DRUGS.filter(d=>d.stock<=d.min*1.5).map(d=>d.name).join(', ')+'</span></div>':'')+'<div class="card"><div class="card-bd"><div class="tw"><table><thead><tr><th>Medication</th><th>Stock</th><th>Min</th><th>Unit</th><th>Status</th><th>Level</th><th>Action</th></tr></thead><tbody>'+DRUGS.map((d,i)=>{const c=d.stock<=d.min,l=d.stock<=d.min*1.5,p=Math.min(Math.round(d.stock/500*100),100),clr=c?'var(--danger)':l?'var(--orange)':'var(--green)';return'<tr><td><strong>'+d.name+'</strong></td><td>'+d.stock+'</td><td>'+d.min+'</td><td>'+d.unit+'</td><td><span class="badge '+(c?'bd':l?'bw':'bs')+'">'+(c?'Critical':l?'Low':'OK')+'</span></td><td style="min-width:95px"><div class="prog-bar"><div class="prog-fill" style="width:'+p+'%;background:'+clr+'"></div></div></td><td><button class="btn btn-ghost btn-sm" onclick="openReorder('+i+')">Reorder</button></td></tr>';}).join('')+'</tbody></table></div></div></div>';}
function openReorder(idx){openModal('Reorder Request','<div class="fg"><label class="lbl">Medication</label><select class="inp" id="rrDrug">'+DRUGS.map((d,i)=>'<option value="'+i+'" '+(i===idx?'selected':'')+'>'+d.name+' (Stock: '+d.stock+')</option>').join('')+'</select></div><div class="r2"><div class="fg"><label class="lbl">Quantity to Add</label><input class="inp" type="number" id="rrQty" value="200" min="1"></div><div class="fg"><label class="lbl">Priority</label><select class="inp"><option>Normal</option><option>Urgent</option><option>Critical</option></select></div></div><div class="fg"><label class="lbl">Reason</label><textarea class="inp" rows="2">Stock approaching minimum threshold.</textarea></div>',[{lbl:'Cancel',cls:'btn-ghost',fn:'closeModal()'},{lbl:'Submit',cls:'btn-primary',fn:'submitReorder()'}]);}
function submitReorder(){const i=parseInt(document.getElementById('rrDrug')?.value),q=parseInt(document.getElementById('rrQty')?.value||0);if(isNaN(q)||q<=0){toast('Enter valid quantity','e');return;}if(!isNaN(i)&&DRUGS[i])DRUGS[i].stock+=q;closeModal();toast('Reorder submitted & stock updated','s');nav('drug-inventory');}
function vMedHistory(){
  const u=S.user,myR=MED_RECORDS.filter(r=>r.pid===u.id);
  const recTable=myR.length
    ?'<div class="tw"><table><thead><tr><th>Record ID</th><th>Date</th><th>Dept</th><th>Doctor</th><th>Diagnosis</th><th>Follow-up</th></tr></thead><tbody>'
      +myR.map(r=>'<tr><td><strong>'+r.id+'</strong></td>'
        +'<td>'+fmtDateLong(r.date)+'</td>'
        +'<td>'+safeDeptDisplay(r.dept)+'</td>'
        +'<td>'+r.doctor+'</td>'
        +'<td>'+r.diagnosis+'</td>'
        +'<td>'+(r.followUp||r.fu||'—')+'</td></tr>').join('')
      +'</tbody></table></div>'
    :'<div style="text-align:center;padding:2rem;color:var(--g400);font-size:.82rem">No consultation records yet.</div>';
  document.getElementById('vc').innerHTML=
    '<div class="ph-row"><div class="ph" style="margin-bottom:0"><h1>Medical History</h1></div>'
    +'<button class="btn btn-outline btn-sm" onclick="dlMedHistory()">'+IC.dl+'Export PDF</button></div>'
    +'<div style="height:1.1rem"></div>'
    +'<div class="prof-hd">'
    +'<div class="prof-av-lg" onclick="triggerAvatarUpload()">'+(S.profilePic?'<img src="'+S.profilePic+'" alt="av">':(ini(u.name)||'?'))+'<div class="av-ov">Change Photo</div></div>'
    +'<div><div class="prof-nm">'+u.name+'</div><div class="prof-sub-id">'+u.id+' | '+capRole(u.subRole||u.role)+'</div>'
    +'<div class="prof-tags">'
    +'<span class="prof-tag">Blood: '+(u.blood||'—')+'</span>'
    +'<span class="prof-tag">Allergy: '+(u.allergy||'None')+'</span>'
    +'<span class="prof-tag">'+myR.length+' records</span>'
    +'</div></div></div>'
    +'<input type="file" id="avFile" accept="image/*" style="display:none" onchange="handleAvUpload(this)">'
    +'<div class="g2" style="margin-bottom:.88rem">'
    +renderVitalsCard(u.id,false)
    +'<div class="card"><div class="card-hd"><span class="card-title">Allergies & Blood</span></div><div class="card-bd">'
    +'<p style="font-size:.72rem;text-transform:uppercase;letter-spacing:.06em;color:var(--g400);font-weight:600;margin-bottom:.4rem">Known Allergies</p>'
    +'<div style="display:flex;gap:.36rem;flex-wrap:wrap;margin-bottom:.88rem">'
    +'<span class="badge '+(u.allergy&&u.allergy!=='None'?'bd':'bn')+'" style="font-size:.77rem;padding:.24rem .66rem">'+(u.allergy||'None')+'</span>'
    +'</div>'
    +'<p style="font-size:.72rem;text-transform:uppercase;letter-spacing:.06em;color:var(--g400);font-weight:600;margin-bottom:.4rem">Blood Type</p>'
    +'<span class="badge bn" style="font-size:.82rem;padding:.3rem .8rem">'+(u.blood||'—')+'</span>'
    +'</div></div>'
    +'</div>'
    +'<div class="card"><div class="card-hd"><span class="card-title">Consultation Records</span>'
    +'<span style="font-size:.73rem;color:var(--g400)">Auto-generated after each consultation</span>'
    +'</div><div class="card-bd">'+recTable+'</div></div>';
}

function vProfile(){const u=S.user;document.getElementById('vc').innerHTML='<div class="ph"><h1>Profile</h1><p>Personal information and account settings</p></div><div class="prof-hd"><div class="prof-av-lg" onclick="triggerAvatarUpload()">'+(S.profilePic?'<img src="'+S.profilePic+'" alt="av">':(ini(u.name)||'?'))+'<div class="av-ov">Change Photo</div></div><div><div class=\"prof-nm\">'+ u.name +'</div><div class=\"prof-sub-id">'+ u.id +' | '+capRole(u.subRole||u.role)+'</div><div class="prof-tags"><span class="prof-tag">'+(u.faculty||'UTHM')+'</span>'+(u.year&&u.year!=='—'?'<span class="prof-tag">'+u.year+'</span>':'')+'<span class="prof-tag">Active Account</span></div></div></div><input type="file" id="avFile" accept="image/*" style="display:none" onchange="handleAvUpload(this)"><div class="g2" style="margin-bottom:.88rem"><div class="card"><div class="card-hd"><span class="card-title">Personal Information</span><button class="btn btn-outline btn-sm" onclick="openEditProfile()">Edit Profile</button></div><div class="card-bd">'+[['Full Name',u.name],['ID',u.id],['Role',capRole(u.subRole||u.role)],['IC Number',u.ic||'—'],['Email',u.email||'—'],['Phone',u.phone||'—'],['Faculty',u.faculty||'—']].map(([k,v])=>'<div style="display:flex;justify-content:space-between;padding:.5rem 0;border-bottom:1px solid var(--g100)"><span style="font-size:.79rem;color:var(--g400)">'+k+'</span><span style="font-size:.82rem;font-weight:500">'+v+'</span></div>').join('')+'</div></div><div class="card"><div class="card-hd"><span class="card-title">Health &amp; Security</span></div><div class="card-bd">'+[['Blood Type',u.blood||'—'],['Allergies',u.allergy||'None'],['Last Login',fmtDate()]].map(([k,v])=>'<div style="display:flex;justify-content:space-between;padding:.5rem 0;border-bottom:1px solid var(--g100)"><span style="font-size:.79rem;color:var(--g400)">'+k+'</span><span style="font-size:.82rem;font-weight:500">'+v+'</span></div>').join('')+'<div style="margin-top:.95rem;display:flex;flex-direction:column;gap:.48rem"><button class="btn btn-outline btn-sm" onclick="openChangePw()">Change Password</button><button class="btn btn-ghost btn-sm" onclick="openNotifSettings()">Notification Settings</button><button class="btn btn-ghost btn-sm" onclick="openPrivacySettings()">Privacy Settings</button></div></div></div></div>'+(PROFILE_REQS.filter(r=>r.pid===u.id&&r.status==='pending').length?'<div class="ib ib-o">'+IC.info+'<span>You have a pending profile edit request awaiting admin approval.</span></div>':'');}
function triggerAvatarUpload(){const i=document.getElementById('avFile');if(i)i.click();}
function handleAvUpload(input){const file=input.files[0];if(!file)return;if(file.size>2*1024*1024){toast('Image too large (max 2MB)','e');return;}const reader=new FileReader();reader.onload=e=>{const req={id:'PER-'+Date.now(),pid:S.user.id,patient:S.user.name,type:'profile_picture',data:e.target.result,status:'pending',date:fmtDate()};PROFILE_REQS.push(req);addNotif('system','b','Profile Photo Request','Photo update submitted. Awaiting admin approval.');buildNav();toast('Photo submitted for approval','s');nav('profile');};reader.readAsDataURL(file);}
function openEditProfile(){const u=S.user;openModal('Edit Profile','<div class="ib ib-o">'+IC.info+'<span>Profile edits require admin approval.</span></div><div class="r2"><div class="fg"><label class="lbl">Phone Number</label><input class="inp" id="epPh" type="tel" value="'+(u.phone||'')+'"></div><div class="fg"><label class="lbl">Emergency Contact</label><input class="inp" id="epEmg" type="text" placeholder="Name, Phone"></div></div><div class="fg"><label class="lbl">Blood Type</label><select class="inp" id="epBl">'+['A+','A-','B+','B-','O+','O-','AB+','AB-'].map(t=>'<option '+(u.blood===t?'selected':'')+'>'+t+'</option>').join('')+'</select></div><div class="fg"><label class="lbl">Known Allergies</label><input class="inp" id="epAl" type="text" value="'+(u.allergy||'')+'"></div>',[{lbl:'Cancel',cls:'btn-ghost',fn:'closeModal()'},{lbl:'Submit for Approval',cls:'btn-primary',fn:'submitProfileEdit()'}]);}
function submitProfileEdit(){PROFILE_REQS.push({id:'PER-'+Date.now(),pid:S.user.id,patient:S.user.name,type:'profile_info',changes:{phone:document.getElementById('epPh')?.value,blood:document.getElementById('epBl')?.value,allergy:document.getElementById('epAl')?.value},status:'pending',date:fmtDate()});addNotif('system','b','Profile Edit Request','Profile update submitted. Awaiting admin approval.');closeModal();buildNav();toast('Edit request submitted for approval','s');}
function openChangePw(){openModal('Change Password','<div class="fg"><label class="lbl">Current Password</label><div class="pw-wrap"><input class="inp" id="cpOld" type="password" placeholder="Current password"><span class="pw-eye" onclick="togglePw(\'cpOld\')"><svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.5"/></svg></span></div></div><div class="fg"><label class="lbl">New Password</label><div class="pw-wrap"><input class="inp" id="cpNew" type="password" placeholder="Min 8 characters"><span class="pw-eye" onclick="togglePw(\'cpNew\')"><svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.5"/></svg></span></div></div><div class="fg"><label class="lbl">Confirm New Password</label><input class="inp" id="cpCf" type="password" placeholder="Repeat new password"><div class="errtxt" id="cpErr"></div></div>',[{lbl:'Cancel',cls:'btn-ghost',fn:'closeModal()'},{lbl:'Change Password',cls:'btn-primary',fn:'doChangePw()'}]);}
function doChangePw(){const old=document.getElementById('cpOld')?.value,nw=document.getElementById('cpNew')?.value,cf=document.getElementById('cpCf')?.value,correct=PASS_DB[S.user.id];if(old!==correct){setErr('cpErr','Current password incorrect');return;}if(nw.length<8){setErr('cpErr','Min 8 characters');return;}if(nw!==cf){setErr('cpErr','Passwords do not match');return;}PASS_DB[S.user.id]=nw;closeModal();toast('Password changed successfully','s');}
function openNotifSettings(){openModal('Notification Settings','<div>'+[['Email notifications',true],['SMS alerts',true],['Push notifications',true],['Prescription ready',true],['Payment confirmation',true],['Appointment reminders',true]].map(([l,on])=>'<div class="tg-row"><label class="tg"><input type="checkbox" '+(on?'checked':'')+' ><span class="tg-sl"></span></label><span>'+l+'</span></div>').join('')+'</div>',[{lbl:'Cancel',cls:'btn-ghost',fn:'closeModal()'},{lbl:'Save',cls:'btn-primary',fn:"toast('Saved','s');closeModal()"}]);}
function openPrivacySettings(){openModal('Privacy Settings','<div>'+[['Share health data with doctors',true],['Allow appointment reminders',true],['Show in queue board',true],['Receive system announcements',true]].map(([l,on])=>'<div class="tg-row"><label class="tg"><input type="checkbox" '+(on?'checked':'')+' ><span class="tg-sl"></span></label><span>'+l+'</span></div>').join('')+'</div>',[{lbl:'Cancel',cls:'btn-ghost',fn:'closeModal()'},{lbl:'Save',cls:'btn-primary',fn:"toast('Saved','s');closeModal()"}]);}

function vPatients(){const allU=Object.values(USERS_DB).filter(u=>u.role==='user');document.getElementById('vc').innerHTML='<div class="ph-row"><div class="ph" style="margin-bottom:0"><h1>Patient Management</h1></div><div style="display:flex;gap:.52rem;flex-wrap:wrap"><div class="search-box" style="width:196px"><svg width="13" height="13" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="1.5"/><path d="m21 21-4.35-4.35" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg><input type="text" placeholder="Search..." oninput="searchPat(this.value)"></div><button class="btn btn-primary btn-sm" onclick="exportPatCSV()">Export CSV</button></div></div><div style="height:1.1rem"></div>'+sgHTML([{ic:svgi(P.users),val:allU.length,lbl:'Users'},{cls:'g',ic:svgi(P.chk,'#27ae60'),val:allU.filter(u=>u.subRole==='student').length,lbl:'Students'},{cls:'b',ic:svgi(P.users,'#2980b9'),val:allU.filter(u=>u.subRole==='staff').length,lbl:'Staff'},{cls:'o',ic:svgi(P.clk,'#f39c12'),val:APPTS.length,lbl:'Appointments'}])+'<div class="card"><div class="card-bd"><div class="tw"><table><thead><tr><th>ID</th><th>Name</th><th>Type</th><th>Faculty</th><th>Blood</th><th>Allergy</th><th>Visits</th><th>Action</th></tr></thead><tbody id="patTbl">'+allU.map(u=>'<tr><td><strong>'+u.id+'</strong></td><td>'+u.name+'</td><td><span class="badge '+(u.subRole==='staff'?'bi':'bn')+'">'+u.subRole+'</span></td><td style="font-size:.76rem">'+(u.faculty||'—')+'</td><td><strong style="color:var(--red)">'+(u.blood||'—')+'</strong></td><td style="font-size:.76rem;color:'+(u.allergy&&u.allergy!=='None'?'var(--danger)':'var(--g400)')+'">'+(u.allergy||'—')+'</td><td>'+APPTS.filter(a=>a.pid===u.id).length+'</td><td><button class="btn btn-ghost btn-sm" onclick="viewPatient(\''+u.id+'\')">View</button></td></tr>').join('')+'</tbody></table></div></div></div>';}
function searchPat(q){document.querySelectorAll('#patTbl tr').forEach(r=>{r.style.display=r.textContent.toLowerCase().includes(q.toLowerCase())?'':'none';});}
function viewPatient(id){const u=USERS_DB[id];if(!u)return;const ap=APPTS.filter(a=>a.pid===id);openModal('Patient — '+u.name,'<div style="background:linear-gradient(135deg,var(--red-dk),var(--red-lt));border-radius:10px;padding:.9rem 1.1rem;margin-bottom:.95rem;color:#fff;display:flex;align-items:center;gap:.9rem"><div style="width:42px;height:42px;border-radius:50%;background:rgba(255,255,255,.25);display:flex;align-items:center;justify-content:center;font-family:\'Playfair Display\',serif;font-size:1.05rem;font-weight:700;flex-shrink:0">'+ini(u.name)+'</div><div><strong style="font-family:\'Playfair Display\',serif;font-size:.97rem">'+u.name+'</strong><div style="font-size:.75rem;opacity:.85;margin-top:.08rem">'+u.id+' · '+u.subRole+' · '+u.faculty+'</div></div></div><div style="display:grid;grid-template-columns:1fr 1fr;gap:.42rem;margin-bottom:.88rem">'+[['IC',u.ic||'—'],['Phone',u.phone||'—'],['Blood',u.blood||'—'],['Allergy',u.allergy||'None'],['Email',u.email||'—'],['Visits',ap.length+' appointments']].map(([k,v])=>'<div style="background:var(--g100);border-radius:7px;padding:.52rem .72rem"><div style="font-size:.67rem;color:var(--g400);text-transform:uppercase;margin-bottom:.12rem">'+k+'</div><div style="font-size:.8rem;font-weight:600">'+v+'</div></div>').join('')+'</div>'+(ap.length?ap.slice(0,2).map(a=>'<div style="background:rgba(139,26,26,.04);border-left:3px solid var(--red);border-radius:7px;padding:.6rem .8rem;margin-bottom:.36rem"><div style="font-size:.79rem;font-weight:600">'+a.id+' — '+a.dept+'</div><div style="font-size:.7rem;color:var(--g400);margin-top:.08rem">'+a.date+' · '+a.doctor+'</div></div>').join(''):''),[{lbl:'Close',cls:'btn-ghost',fn:'closeModal()'}]);}
function exportPatCSV(){const rows=[['ID','Name','Type','Faculty','Blood','Allergy','Visits'],...Object.values(USERS_DB).filter(u=>u.role==='user').map(u=>[u.id,u.name,u.subRole,u.faculty||'',u.blood||'',u.allergy||'',APPTS.filter(a=>a.pid===u.id).length])];dlCSV('UTHM_PKU_Patients.csv',rows);toast('Patient CSV exported','s');}
function vAnalytics(){const rev=BILLS.reduce((s,b)=>s+(b.status==='paid'?b.items.reduce((ss,i)=>ss+i.p,0):0),0);document.getElementById('vc').innerHTML='<div class="ph-row"><div class="ph" style="margin-bottom:0"><h1>Analytics &amp; Reports</h1></div><div style="display:flex;gap:.52rem"><button class="btn btn-outline btn-sm" onclick="exportAdminRpt()">Export PDF</button><button class="btn btn-primary btn-sm" onclick="emailReport()">Email Report</button></div></div><div style="height:1.1rem"></div>'+sgHTML([{ic:svgi(P.users),val:APPTS.length,lbl:'Appointments'},{cls:'g',ic:svgi(P.bar,'#27ae60'),val:PRESCRIPTIONS.filter(p=>p.status==='collected').length,lbl:'Rx Dispensed'},{cls:'o',ic:svgi(P.clk,'#f39c12'),val:QUEUE.length,lbl:'Queue Tickets'},{cls:'b',ic:svgi(P.dol,'#2980b9'),val:'RM '+rev.toFixed(2),lbl:'Revenue'}])+'<div class="g2"><div class="card"><div class="card-hd"><span class="card-title">Appointments by Dept</span></div><div class="card-bd"><div class="bar-chart" id="anaBar"></div></div></div><div class="card"><div class="card-hd"><span class="card-title">Queue Performance</span></div><div class="card-bd"><div class="tw"><table><thead><tr><th>Metric</th><th>Value</th><th>Status</th></tr></thead><tbody><tr><td>Total Tickets</td><td><strong>'+QUEUE.length+'</strong></td><td><span class="badge bs">Tracked</span></td></tr><tr><td>Waiting</td><td><strong>'+QUEUE.filter(q=>q.status==='waiting').length+'</strong></td><td><span class="badge bw">Live</span></td></tr><tr><td>Served</td><td><strong>'+QUEUE.filter(q=>q.status==='done').length+'</strong></td><td><span class="badge bs">Done</span></td></tr><tr><td>Prescriptions</td><td><strong>'+PRESCRIPTIONS.length+'</strong></td><td><span class="badge bs">Total</span></td></tr><tr><td>Pending Approvals</td><td><strong>'+PENDING.filter(u=>!u.approved).length+'</strong></td><td><span class="badge '+(PENDING.filter(u=>!u.approved).length?'bw':'bn')+'">'+(PENDING.filter(u=>!u.approved).length?'Action needed':'None')+'</span></td></tr></tbody></table></div></div></div>';setTimeout(()=>{const mx=Math.max(APPTS.filter(a=>a.dept==='General Practice').length,APPTS.filter(a=>a.dept==='Dental').length,PRESCRIPTIONS.length,BILLS.length,QUEUE.length,1);barchart('anaBar',[{l:'GP',v:APPTS.filter(a=>a.dept==='General Practice').length},{l:'Dental',v:APPTS.filter(a=>a.dept==='Dental').length},{l:'Prescriptions',v:PRESCRIPTIONS.length},{l:'Bills',v:BILLS.length},{l:'Queue',v:QUEUE.length}],mx);},50);}
function emailReport(){openModal('Email Report','<div class="fg"><label class="lbl">Recipients</label><input class="inp" type="email" id="emailRpt" value="admin@uthm.edu.my"></div><div class="fg"><label class="lbl">Report Type</label><select class="inp"><option>Daily Summary</option><option>Weekly Analytics</option><option>Financial Report</option></select></div>',[{lbl:'Cancel',cls:'btn-ghost',fn:'closeModal()'},{lbl:'Send Email',cls:'btn-primary',fn:"toast('Report emailed to '+document.getElementById('emailRpt').value,'s');closeModal()"}]);}
function vSchedule(){const r=S.user.role,myId=S.user.id,myA=r==='dentist'?APPTS.filter(a=>a.dept==='Dental'&&a.doctorId===myId):APPTS.filter(a=>a.dept==='General Practice');document.getElementById('vc').innerHTML='<div class="ph"><h1>My Schedule</h1></div><div class="card" style="margin-bottom:.88rem"><div class="card-hd"><span class="card-title">Upcoming</span></div><div class="card-bd">'+(myA.filter(a=>a.status==='confirmed').length?'<div class="tw"><table><thead><tr><th>ID</th><th>Patient</th><th>Date</th><th>Time</th><th>Type</th><th>Status</th><th>Action</th></tr></thead><tbody>'+myA.filter(a=>a.status==='confirmed').map(a=>'<tr><td><strong>'+a.id+'</strong></td><td>'+a.patient+'</td><td>'+a.date+'</td><td><strong>'+a.time+'</strong></td><td>'+a.type+'</td><td><span class="badge bs">confirmed</span></td><td><button class="btn btn-success btn-sm" onclick="markDone(\''+a.id+'\')">Mark Done</button></td></tr>').join('')+'</tbody></table></div>':'<div style="text-align:center;padding:2rem;color:var(--g400)">No upcoming appointments</div>')+'</div></div><div class="card"><div class="card-hd"><span class="card-title">All Appointments</span></div><div class="card-bd"><div class="tw"><table><thead><tr><th>ID</th><th>Patient</th><th>Date</th><th>Time</th><th>Type</th><th>Status</th></tr></thead><tbody>'+(myA.length?myA.map(a=>'<tr><td><strong>'+a.id+'</strong></td><td>'+a.patient+'</td><td>'+a.date+'</td><td>'+a.time+'</td><td>'+a.type+'</td><td><span class="badge '+(a.status==='confirmed'?'bs':a.status==='completed'?'bn':'bw')+'">'+a.status+'</span></td></tr>').join(''):'<tr><td colspan="6" style="text-align:center;padding:2rem;color:var(--g400)">No appointments assigned</td></tr>')+'</tbody></table></div></div></div>';}
function markDone(id){const a=APPTS.find(x=>x.id===id);if(!a)return;a.status='completed';MED_RECORDS.push({id:'MR-'+new Date().getFullYear()+'-'+String(MRC++).padStart(4,'0'),pid:a.pid,patient:a.patient,dept:a.dept,doctor:a.doctor,complaint:'Consultation',diagnosis:'As documented by doctor',treatment:'As prescribed',date:a.date,fu:'As needed'});addNotif('appt','g','Consultation Complete','Consultation with '+a.doctor+' complete.');toast('Appointment completed','s');nav('schedule');}
function vRecords(){document.getElementById('vc').innerHTML='<div class="ph-row"><div class="ph" style="margin-bottom:0"><h1>Patient Records</h1></div><div class="search-box" style="width:196px"><svg width="13" height="13" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="1.5"/><path d="m21 21-4.35-4.35" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg><input type="text" placeholder="Search..." oninput="searchRec(this.value)"></div></div><div style="height:1.1rem"></div><div class="card"><div class="card-bd"><div class="tw"><table><thead><tr><th>Record ID</th><th>Patient</th><th>Date</th><th>Dept</th><th>Diagnosis</th><th>Follow-up</th><th>Action</th></tr></thead><tbody id="recTbl">'+(MED_RECORDS.length?MED_RECORDS.map(r=>'<tr><td><strong>'+r.id+'</strong></td><td>'+r.patient+'</td><td>'+r.date+'</td><td>'+r.dept+'</td><td>'+r.diagnosis+'</td><td>'+(r.fu||'—')+'</td><td><button class="btn btn-ghost btn-sm" onclick="dlPatRec(\''+r.id+'\')">'+IC.dl+'</button></td></tr>').join(''):'<tr><td colspan="7" style="text-align:center;padding:2rem;color:var(--g400)">No records yet.</td></tr>')+'</tbody></table></div></div></div>';}
function searchRec(q){document.querySelectorAll('#recTbl tr').forEach(r=>{r.style.display=r.textContent.toLowerCase().includes(q.toLowerCase())?'':'none';});}
function dlPatRec(id){const r=MED_RECORDS.find(x=>x.id===id);if(!r)return;const u=USERS_DB[r.pid]||{name:r.patient,id:r.pid,blood:'—',allergy:'—',email:'—',phone:'—'};dlFile('MedRecord_'+r.id+'.html',genMedHTML([r],u));toast('Patient record downloaded','s');}
function vRoomStatus(){document.getElementById('vc').innerHTML='<div class="ph"><h1>Room Status</h1><p>Real-time facility occupancy</p></div>'+sgHTML([{ic:svgi(P.users),val:ROOMS.length,lbl:'Total Rooms'},{cls:'g',ic:svgi(P.chk,'#27ae60'),val:ROOMS.filter(r=>r.status==="avail").length,lbl:'Available'},{cls:'o',ic:svgi(P.clk,'#f39c12'),val:ROOMS.filter(r=>r.status==="occ").length,lbl:'Occupied'},{cls:'b',ic:svgi(P.clk,'#2980b9'),val:ROOMS.filter(r=>r.status==="clean").length,lbl:'Cleaning'}])+'<div class="card" style="margin-bottom:.88rem"><div class="card-hd"><span class="card-title">Floor Map</span><div style="display:flex;gap:.36rem"><span class="badge bs">Available</span><span class="badge bi">Occupied</span><span class="badge bw">Cleaning</span></div></div><div class="card-bd"><div class="room-map">'+ROOMS.map(r=>'<div class="room-box '+r.status+'" onclick="showRoomDetail(\''+r.id+'\')"><div class="rm-dot" style="background:'+(r.status==='occ'?'var(--red)':r.status==='avail'?'var(--green)':'var(--orange)')+'"></div><div style="font-size:.69rem;font-weight:700;margin-top:2px">'+r.id+'</div><div style="font-size:.58rem;text-align:center;line-height:1.3;margin-top:1px">'+r.name+'</div></div>').join('')+'</div></div></div><div class="card"><div class="card-bd"><div class="tw"><table><thead><tr><th>Room</th><th>Type</th><th>Staff</th><th>Status</th><th>Action</th></tr></thead><tbody>'+ROOMS.map(r=>'<tr><td><strong>'+r.name+'</strong></td><td><span class="badge bn">'+r.type+'</span></td><td style="font-size:.76rem">'+r.doctor+'</td><td><span class="badge '+(r.status==='occ'?'bi':r.status==='avail'?'bs':'bw')+'">'+(r.status==='occ'?'Occupied':r.status==='avail'?'Available':'Cleaning')+'</span></td><td><button class="btn btn-ghost btn-sm" onclick="showRoomDetail(\''+r.id+'\')">Update</button></td></tr>').join('')+'</tbody></table></div></div></div>';}
function showRoomDetail(id){const r=ROOMS.find(x=>x.id===id);if(!r)return;openModal(r.name+' — Status','<div style="margin-bottom:.88rem">'+[['Room',r.name],['Type',r.type],['Staff',r.doctor]].map(([k,v])=>'<div style="display:flex;justify-content:space-between;padding:.44rem 0;border-bottom:1px solid var(--g100)"><span style="font-size:.79rem;color:var(--g400)">'+k+'</span><strong style="font-size:.8rem">'+v+'</strong></div>').join('')+'</div><div class="fg"><label class="lbl">Update Status</label><select class="inp" id="rmSt"><option value="avail" '+(r.status==='avail'?'selected':'')+'>Available</option><option value="occ" '+(r.status==='occ'?'selected':'')+'>Occupied</option><option value="clean" '+(r.status==='clean'?'selected':'')+'>Cleaning</option></select></div>',[{lbl:'Cancel',cls:'btn-ghost',fn:'closeModal()'},{lbl:'Update',cls:'btn-primary',fn:"doUpdateRoom('"+id+"')"}]);}
function doUpdateRoom(id){const r=ROOMS.find(x=>x.id===id);if(!r)return;const s=document.getElementById('rmSt');if(s)r.status=s.value;closeModal();toast(r.name+' updated','s');nav('room-status');}
function vStaffMgmt(){document.getElementById('vc').innerHTML='<div class="ph-row"><div class="ph" style="margin-bottom:0"><h1>Staff Management</h1></div><button class="btn btn-primary btn-sm" onclick="openAddStaff()">+ Add Staff</button></div><div style="height:1.1rem"></div>'+sgHTML([{ic:svgi(P.users),val:STAFF.length,lbl:'Total Staff'},{cls:'g',ic:svgi(P.chk,'#27ae60'),val:STAFF.filter(s=>s.status==='on-duty').length,lbl:'On Duty'},{cls:'b',ic:svgi(P.users,'#2980b9'),val:STAFF.filter(s=>s.role==='Doctor'||s.role==='Dentist').length,lbl:'Doctors'},{cls:'o',ic:svgi(P.clk,'#f39c12'),val:STAFF.filter(s=>s.status==='off-duty').length,lbl:'Off Duty'}])+'<div class="card"><div class="card-bd"><div class="tw"><table><thead><tr><th>ID</th><th>Name</th><th>Role</th><th>Dept</th><th>Shift</th><th>Status</th><th>Actions</th></tr></thead><tbody>'+STAFF.map(s=>'<tr><td><strong>'+s.id+'</strong></td><td>'+s.name+'</td><td><span class="badge bn">'+s.role+'</span></td><td>'+s.dept+'</td><td style="font-size:.76rem">'+s.shift+'</td><td><span class="badge '+(s.status==='on-duty'?'bs':'bn')+'">'+s.status+'</span></td><td style="display:flex;gap:.26rem;flex-wrap:wrap"><button class="btn btn-ghost btn-sm" onclick="editStaff(\''+s.id+'\')">Edit</button><button class="btn btn-danger btn-sm" onclick="confirmDeleteStaff(\''+s.id+'\')">Delete</button></td></tr>').join('')+'</tbody></table></div></div></div>';}
function openAddStaff(){openModal('Add Staff Member','<div class="r2"><div class="fg"><label class="lbl">Staff ID</label><input class="inp" id="nsId" type="text" placeholder="STF1234"></div><div class="fg"><label class="lbl">Full Name</label><input class="inp" id="nsNm" type="text" placeholder="Dr. Ahmad..."></div></div><div class="r2"><div class="fg"><label class="lbl">Role</label><select class="inp" id="nsRl"><option>Doctor</option><option>Dentist</option><option>Nurse</option><option>Pharmacist</option><option>Admin Clerk</option></select></div><div class="fg"><label class="lbl">Department</label><input class="inp" id="nsDp" type="text" placeholder="General Practice"></div></div><div class="r2"><div class="fg"><label class="lbl">Shift</label><input class="inp" id="nsSh" type="text" placeholder="08:00–17:00"></div><div class="fg"><label class="lbl">Status</label><select class="inp" id="nsSt"><option value="on-duty">On Duty</option><option value="off-duty">Off Duty</option></select></div></div>',[{lbl:'Cancel',cls:'btn-ghost',fn:'closeModal()'},{lbl:'Add Staff',cls:'btn-primary',fn:'doAddStaff()'}]);}
function doAddStaff(){const id=document.getElementById('nsId')?.value.trim(),name=document.getElementById('nsNm')?.value.trim();if(!id||!name){toast('ID and name required','e');return;}STAFF.push({id,name,role:document.getElementById('nsRl')?.value,dept:document.getElementById('nsDp')?.value||'—',shift:document.getElementById('nsSh')?.value||'08:00–17:00',status:document.getElementById('nsSt')?.value||'on-duty'});closeModal();toast('Staff added','s');nav('staff-mgmt');}
function editStaff(id){const s=STAFF.find(x=>x.id===id);if(!s)return;openModal('Edit Staff — '+s.name,'<div class="fg"><label class="lbl">Full Name</label><input class="inp" id="esNm" type="text" value="'+s.name+'"></div><div class="r2"><div class="fg"><label class="lbl">Role</label><select class="inp" id="esRl">'+['Doctor','Dentist','Nurse','Pharmacist','Admin','Admin Clerk'].map(r=>'<option '+(s.role===r?'selected':'')+'>'+r+'</option>').join('')+'</select></div><div class="fg"><label class="lbl">Dept</label><input class="inp" id="esDp" type="text" value="'+s.dept+'"></div></div><div class="r2"><div class="fg"><label class="lbl">Shift</label><input class="inp" id="esSh" type="text" value="'+s.shift+'"></div><div class="fg"><label class="lbl">Status</label><select class="inp" id="esSt"><option value="on-duty" '+(s.status==='on-duty'?'selected':'')+'>On Duty</option><option value="off-duty" '+(s.status==='off-duty'?'selected':'')+'>Off Duty</option></select></div></div>',[{lbl:'Cancel',cls:'btn-ghost',fn:'closeModal()'},{lbl:'Save',cls:'btn-primary',fn:"doEditStaff('"+id+"')"}]);}
function doEditStaff(id){const s=STAFF.find(x=>x.id===id);if(!s)return;s.name=document.getElementById('esNm')?.value||s.name;s.role=document.getElementById('esRl')?.value||s.role;s.dept=document.getElementById('esDp')?.value||s.dept;s.shift=document.getElementById('esSh')?.value||s.shift;s.status=document.getElementById('esSt')?.value||s.status;closeModal();toast('Staff updated','s');nav('staff-mgmt');}
function confirmDeleteStaff(id){const s=STAFF.find(x=>x.id===id);if(!s)return;openModal('Delete Staff — Confirmation','<div class="ib ib-r">'+IC.warn+'<span>Remove <strong>'+s.name+'</strong>? Cannot be undone.</span></div><p style="font-size:.82rem;color:var(--g600);margin-bottom:.78rem">Type <strong>DELETE</strong> to confirm:</p><div class="fg"><input class="inp" id="delCf" type="text" placeholder="Type DELETE"></div>',[{lbl:'Cancel',cls:'btn-ghost',fn:'closeModal()'},{lbl:'Confirm Delete',cls:'btn-danger',fn:"doDeleteStaff('"+id+"')"}]);}
function doDeleteStaff(id){if(document.getElementById('delCf')?.value!=='DELETE'){toast('Type DELETE exactly','e');return;}const idx=STAFF.findIndex(x=>x.id===id);if(idx>-1)STAFF.splice(idx,1);closeModal();toast('Staff removed','s');nav('staff-mgmt');}
function vApprovals(){const pending=PENDING.filter(u=>!u.approved);document.getElementById('vc').innerHTML='<div class="ph"><h1>Pending Approvals</h1><p>New registrations awaiting admin approval</p></div>'+(pending.length?'<div class="ib ib-o">'+IC.warn+'<span><strong>'+pending.length+' account(s)</strong> pending approval.</span></div>':'')+'<div class="card"><div class="card-bd">'+(pending.length?'<div class="tw"><table><thead><tr><th>ID</th><th>Name</th><th>Type</th><th>Email</th><th>Faculty</th><th>Submitted</th><th>Actions</th></tr></thead><tbody>'+pending.map(u=>'<tr><td><strong>'+u.id+'</strong></td><td>'+u.name+'</td><td><span class="badge '+(u.subRole==='student'?'bn':'bi')+'">'+u.subRole+'</span></td><td style="font-size:.76rem">'+(u.email||'—')+'</td><td style="font-size:.76rem">'+(u.faculty||'—')+'</td><td>'+(u.date||fmtDate())+'</td><td style="display:flex;gap:.26rem"><button class="btn btn-success btn-sm" onclick="approveUser(\''+u.id+'\')">Approve</button><button class="btn btn-danger btn-sm" onclick="rejectUser(\''+u.id+'\')">Reject</button></td></tr>').join('')+'</tbody></table></div>':'<div style="text-align:center;padding:2rem;color:var(--g400);font-size:.82rem">No pending approvals.</div>')+'</div></div>';}
function approveUser(id){const u=PENDING.find(x=>x.id===id);if(!u)return;u.approved=true;USERS_DB[id]={...u,role:'user',blood:'—',allergy:'None',approved:true};addNotif('system','g','Account Approved',u.name+' ('+id+') can now login.');buildNav();toast(u.name+' approved!','s');nav('approvals');}
function rejectUser(id){const idx=PENDING.findIndex(x=>x.id===id),u=PENDING[idx];if(idx>-1){PENDING.splice(idx,1);delete PASS_DB[id];delete ROLE_DB[id];}buildNav();toast((u?.name||id)+' rejected','w');nav('approvals');}
function vProfileReqs(){document.getElementById('vc').innerHTML='<div class="ph"><h1>Profile Edit Requests</h1><p>Pending updates requiring approval</p></div><div class="card"><div class="card-bd">'+(PROFILE_REQS.length?'<div class="tw"><table><thead><tr><th>ID</th><th>Patient</th><th>Type</th><th>Date</th><th>Status</th><th>Actions</th></tr></thead><tbody>'+PROFILE_REQS.map(r=>'<tr><td><strong>'+r.id+'</strong></td><td>'+r.patient+' ('+r.pid+')</td><td><span class="badge bn">'+(r.type==='profile_picture'?'Photo':'Info')+'</span></td><td>'+r.date+'</td><td><span class="badge '+(r.status==='pending'?'bw':r.status==='approved'?'bs':'bd')+'">'+r.status+'</span></td><td style="display:flex;gap:.26rem">'+(r.status==='pending'?'<button class="btn btn-success btn-sm" onclick="approvePerReq(\''+r.id+'\')">Approve</button><button class="btn btn-danger btn-sm" onclick="rejectPerReq(\''+r.id+'\')">Reject</button>':r.status==='approved'?'<span style="font-size:.76rem;color:var(--green)">Approved</span>':'<span style="font-size:.76rem;color:var(--danger)">Rejected</span>')+'</td></tr>').join('')+'</tbody></table></div>':'<div style="text-align:center;padding:2rem;color:var(--g400);font-size:.82rem">No profile edit requests pending.</div>')+'</div></div>';}
function approvePerReq(id){const r=PROFILE_REQS.find(x=>x.id===id);if(!r)return;r.status='approved';const u=USERS_DB[r.pid];if(u&&r.type==='profile_info'&&r.changes)Object.assign(u,r.changes);if(r.type==='profile_picture'&&r.data&&S.user&&S.user.id===r.pid){S.profilePic=r.data;updateAvatars();}addNotif('system','g','Profile Update Approved','Your profile update has been approved.');toast('Approved','s');nav('profile-reqs');}
function rejectPerReq(id){const r=PROFILE_REQS.find(x=>x.id===id);if(!r)return;r.status='rejected';addNotif('system','o','Profile Update Rejected','Your profile update was rejected.');toast('Rejected','w');nav('profile-reqs');}
function vNotifications(){document.getElementById('vc').innerHTML='<div class="ph-row"><div class="ph" style="margin-bottom:0"><h1>Notifications</h1></div><button class="btn btn-ghost btn-sm" onclick="markAllRead()">Mark all read</button></div><div style="height:1.1rem"></div><div class="tabs"><div class="tab active" onclick="filterNTab(this,\'all\')">All ('+NOTIFS.length+')</div><div class="tab" onclick="filterNTab(this,\'queue\')">Queue</div><div class="tab" onclick="filterNTab(this,\'billing\')">Billing</div><div class="tab" onclick="filterNTab(this,\'appt\')">Appointments</div><div class="tab" onclick="filterNTab(this,\'pharma\')">Pharmacy</div><div class="tab" onclick="filterNTab(this,\'system\')">System</div></div><div id="notifPgList" style="display:flex;flex-direction:column;gap:.6rem">'+renderNotifCards(NOTIFS)+'</div>';}
function renderNotifCards(list){return list.length?list.map(n=>'<div class="card" style="border-left:4px solid '+(n.cls==='g'?'var(--green)':n.cls==='o'?'var(--orange)':n.cls==='b'?'var(--blue)':'var(--red)')+';opacity:'+(n.read?.7:1)+';cursor:pointer" onclick="readNPage('+n.id+',this)"><div style="padding:.85rem 1rem;display:flex;align-items:flex-start;gap:.76rem"><div style="width:7px;height:7px;border-radius:50%;background:'+(n.cls==='g'?'var(--green)':n.cls==='o'?'var(--orange)':n.cls==='b'?'var(--blue)':'var(--red)')+';flex-shrink:0;margin-top:4px"></div><div style="flex:1"><div style="font-weight:600;font-size:.86rem;color:var(--g900);margin-bottom:.2rem">'+n.title+(!n.read?'<span style="display:inline-block;width:6px;height:6px;background:var(--red);border-radius:50%;margin-left:4px;vertical-align:middle"></span>':'')+'</div><div style="font-size:.8rem;color:var(--g500);line-height:1.6">'+n.body+'</div><div style="font-size:.68rem;color:var(--g300);margin-top:.3rem">'+n.time+'</div></div>'+(!n.read?'<span class="badge bd">New</span>':'')+'</div></div>').join(''):'<div style="text-align:center;padding:2rem;color:var(--g400);font-size:.82rem">No notifications found</div>';}
function filterNTab(el,type){document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));el.classList.add('active');const fl=type==='all'?NOTIFS:NOTIFS.filter(n=>n.type===type);const el2=document.getElementById('notifPgList');if(el2)el2.innerHTML=renderNotifCards(fl);}
function readNPage(id,el){const n=NOTIFS.find(x=>x.id===id);if(n)n.read=true;el.style.opacity='.7';el.querySelector('span[style*="border-radius:50%"]')?.remove();el.querySelector('.badge.bd')?.remove();updateNdot();}
function vFeedback(){document.getElementById('vc').innerHTML='<div class="ph"><h1>Feedback &amp; Help</h1></div><div class="g2" style="margin-bottom:.88rem"><div class="card"><div class="card-hd"><span class="card-title">Submit Feedback</span></div><div class="card-bd"><div class="fg"><label class="lbl">Type</label><select class="inp"><option>General Feedback</option><option>Queue System</option><option>Appointment Booking</option><option>Billing &amp; Payment</option><option>Pharmacy Service</option><option>System Bug</option></select></div><div class="fg"><label class="lbl">Rating</label><div style="display:flex;gap:.38rem;margin-top:.18rem" id="stars">'+[1,2,3,4,5].map(n=>'<span onclick="rateStar('+n+')" style="font-size:1.7rem;cursor:pointer;color:var(--g300)" data-v="'+n+'">★</span>').join('')+'</div></div><div class="fg"><label class="lbl">Message</label><textarea class="inp" rows="4" placeholder="Describe your experience..."></textarea></div><button class="btn btn-primary btn-full" onclick="toast(\'Feedback submitted. Thank you!\',\'s\')">Submit Feedback</button></div></div><div class="card"><div class="card-hd"><span class="card-title">FAQ</span></div><div class="card-bd">'+[['How do I get a queue number?','Go to QR Queue and click Get Queue Number. Select your department and receive your ticket instantly.'],['Can I book a dental appointment?','Yes. Go to Appointments, click Book, select Dental. You will be assigned your personal dentist.'],['How does the queue work?','Queue is doctor-controlled. It only advances when the doctor clicks Call for the next patient.'],['How do I pay my bill?','Go to Billing & Payment. Click Pay Now on unpaid invoices. Pay via DuitNow, SMAP, or Cash.'],['When will my prescription be ready?','Typically 10-15 minutes. You will receive a push notification when ready for pickup.'],['How do I cancel an appointment?','Go to Appointments, find your booking, click Cancel. Please cancel at least 2 hours before.']].map((f,i)=>'<div class="faq-item"><div class="faq-q" onclick="togFaq('+i+',this)"><span>'+f[0]+'</span><svg class="faq-arr" width="11" height="11" viewBox="0 0 24 24" fill="none"><path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div><div class="faq-a" id="faq'+i+'"><div class="faq-a-inner">'+f[1]+'</div></div></div>').join('')+'</div></div></div><div class="card"><div class="card-hd"><span class="card-title">Contact Us</span></div><div class="card-bd"><div class="g3" style="gap:.6rem">'+[['Main Line','+607-453 7765'],['Emergency','+607-453 7999'],['Email','pku@uthm.edu.my'],['WhatsApp','+60 11-1234 5678'],['Location','Building H01, UTHM Batu Pahat'],['Hours','Mon–Fri 08:00–17:00']].map(([k,v])=>'<div style="background:var(--g100);border-radius:8px;padding:.6rem .78rem"><div style="font-size:.67rem;color:var(--g400);text-transform:uppercase;letter-spacing:.05em;margin-bottom:.18rem">'+k+'</div><div style="font-size:.8rem;font-weight:600;word-break:break-all">'+v+'</div></div>').join('')+'</div></div></div><div style="text-align:center;padding:1.3rem 0 .35rem;color:var(--g400);font-size:.77rem">UTHM PKU Patient Appointment System — Academic Prototype&nbsp;|&nbsp;<a href="https://github.com/paim41" target="_blank" style="color:var(--red);font-weight:500;text-decoration:none">github.com/paim41</a></div>';}
function togFaq(i,el){const b=document.getElementById('faq'+i),arr=el.querySelector('.faq-arr'),open=b.style.maxHeight&&b.style.maxHeight!=='0px';b.style.maxHeight=open?'0px':'180px';if(arr)arr.style.transform=open?'':'rotate(180deg)';}
function rateStar(n){document.querySelectorAll('#stars span').forEach(s=>{s.style.color=+s.dataset.v<=n?'#f39c12':'var(--g300)';});}
function vSettings(){document.getElementById('vc').innerHTML='<div class="ph"><h1>System Settings</h1></div><div class="g2" style="margin-bottom:.88rem"><div class="card"><div class="card-hd"><span class="card-title">Queue Configuration</span><button class="btn btn-primary btn-sm" onclick="saveSettings(\'queue\')">Save</button></div><div class="card-bd"><div class="fg"><label class="lbl">Max queue per day</label><input class="inp" type="number" id="sMaxQ" value="'+SYS.maxQ+'"></div><div class="fg"><label class="lbl">Reset time</label><input class="inp" type="time" id="sResetT" value="'+SYS.resetT+'"></div><div class="tg-row"><label class="tg"><input type="checkbox" id="sSms" '+(SYS.smsNotif?'checked':'')+' ><span class="tg-sl"></span></label><span>SMS Notifications</span></div><div class="tg-row"><label class="tg"><input type="checkbox" id="sEmail" '+(SYS.emailNotif?'checked':'')+' ><span class="tg-sl"></span></label><span>Email Notifications</span></div></div></div><div class="card"><div class="card-hd"><span class="card-title">Appointment Configuration</span><button class="btn btn-primary btn-sm" onclick="saveSettings(\'appt\')">Save</button></div><div class="card-bd"><div class="fg"><label class="lbl">Lead time (hours)</label><input class="inp" type="number" id="sLead" value="'+SYS.apptLead+'"></div><div class="fg"><label class="lbl">Slot duration (min)</label><input class="inp" type="number" id="sSlot" value="'+SYS.slotDur+'"></div><div class="tg-row"><label class="tg"><input type="checkbox" id="sConf" '+(SYS.autoConflict?'checked':'')+' ><span class="tg-sl"></span></label><span>Auto conflict detection</span></div><div class="tg-row"><label class="tg"><input type="checkbox" id="sRem" '+(SYS.reminder?'checked':'')+' ><span class="tg-sl"></span></label><span>24h reminder notifications</span></div></div></div><div class="card"><div class="card-hd"><span class="card-title">Billing Configuration</span><button class="btn btn-primary btn-sm" onclick="saveSettings(\'billing\')">Save</button></div><div class="card-bd"><div class="fg"><label class="lbl">Consultation fee (RM)</label><input class="inp" type="number" id="sFee" value="'+SYS.consultFee+'" step="0.50"></div><div class="fg"><label class="lbl">Dental fee (RM)</label><input class="inp" type="number" id="sDFee" value="'+SYS.dentalFee+'" step="0.50"></div><div class="tg-row"><label class="tg"><input type="checkbox" id="sDuit" '+(SYS.duitnow?'checked':'')+' ><span class="tg-sl"></span></label><span>DuitNow QR enabled</span></div><div class="tg-row"><label class="tg"><input type="checkbox" id="sSmap" '+(SYS.smap?'checked':'')+' ><span class="tg-sl"></span></label><span>SMAP Account enabled</span></div></div></div><div class="card"><div class="card-hd"><span class="card-title" style="color:var(--danger)">Danger Zone</span></div><div class="card-bd" style="display:flex;gap:.55rem;flex-wrap:wrap"><button class="btn btn-danger btn-sm" onclick="confirmResetQ()">Reset Queue</button><button class="btn btn-warning btn-sm" onclick="APPTS.filter(a=>a.status===\'pending\').forEach(a=>a.status=\'cancelled\');toast(\'Pending appointments cancelled\',\'w\')">Cancel Pending Appts</button><button class="btn btn-ghost btn-sm" onclick="toast(\'Backup initiated\',\'i\')">Backup Database</button></div></div></div><div style="text-align:center;padding:1.3rem 0 .35rem;color:var(--g400);font-size:.76rem">UTHM PKU v2.0 · Academic Prototype · <a href="https://github.com/paim41" target="_blank" style="color:var(--red);font-weight:500;text-decoration:none">github.com/paim41</a></div>';}
function saveSettings(type){if(type==='queue'){SYS.maxQ=+document.getElementById('sMaxQ')?.value||SYS.maxQ;SYS.resetT=document.getElementById('sResetT')?.value||SYS.resetT;SYS.smsNotif=document.getElementById('sSms')?.checked;SYS.emailNotif=document.getElementById('sEmail')?.checked;}if(type==='appt'){SYS.apptLead=+document.getElementById('sLead')?.value||SYS.apptLead;SYS.slotDur=+document.getElementById('sSlot')?.value||SYS.slotDur;SYS.autoConflict=document.getElementById('sConf')?.checked;SYS.reminder=document.getElementById('sRem')?.checked;}if(type==='billing'){SYS.consultFee=+document.getElementById('sFee')?.value||SYS.consultFee;SYS.dentalFee=+document.getElementById('sDFee')?.value||SYS.dentalFee;SYS.duitnow=document.getElementById('sDuit')?.checked;SYS.smap=document.getElementById('sSmap')?.checked;}toast('Settings saved','s');}



// =============================================
// INTEGRATED WORKFLOW ADDITIONS v3.0
// PatientVisit as central linking entity
// =============================================

// New data stores
let PATIENT_VISITS = [];
let CONSULTATIONS = [];
let PRESCRIPTION_ITEMS = [];
let AUDIT_LOG = [];
let VC = 1, CSC = 1, PXC = 1, PXIC = 1;

// Add price to drugs
[0.50,1.20,0.80,0.60,5.00,8.00,0.30,1.50].forEach((p,i)=>{if(DRUGS[i])DRUGS[i].price=p;});

// ---- Audit Trail ----
function auditLog(action,entity,entityId,details){
  AUDIT_LOG.push({id:'AUD-'+Date.now(),timestamp:new Date().toISOString(),user:S.user?S.user.id:'system',userName:S.user?S.user.name:'System',action,entity,entityId,details:details||''});
}

// ---- Visit status badge ----
function visitStatusBadge(status){
  const m={'checked-in':'bi','queued':'bw','consulting':'bs','prescription':'bi','pharmacy':'bi','billing':'bw','completed':'bn','cancelled':'bd'};
  return '<span class="badge '+(m[status]||'bn')+'">'+status+'</span>';
}

// ---- Visit progress bar ----
function visitProgressBar(status){
  const stages=['checked-in','queued','consulting','pharmacy','billing','completed'];
  const labels=['Check-In','Queue','Consult','Pharmacy','Billing','Done'];
  const idx=stages.indexOf(status);
  const pct=idx<0?0:Math.round(((idx+1)/stages.length)*100);
  return '<div style="margin:.8rem 0"><div style="display:flex;justify-content:space-between;font-size:.63rem;color:var(--g400);margin-bottom:.35rem">'+stages.map((s,i)=>'<span style="color:'+(i<=idx?'var(--red)':'var(--g300)')+';font-weight:'+(i===idx?700:400)+'">'+labels[i]+'</span>').join('')+'</div><div class="prog-bar"><div class="prog-fill" style="width:'+pct+'%;background:var(--red)"></div></div></div>';
}

// ---- Check-in from appointment ----
function checkInFromAppointment(apptId){
  const appt=APPTS.find(a=>a.id===apptId);
  if(!appt)return null;
  if(PATIENT_VISITS.find(v=>v.appointmentId===apptId&&v.visitStatus!=='completed'))return PATIENT_VISITS.find(v=>v.appointmentId===apptId);
  const visitId='VIS-'+new Date().getFullYear()+'-'+String(VC++).padStart(4,'0');
  const visit={visitId,patientId:appt.pid,patientName:appt.patient,appointmentId:apptId,checkInTime:fmtTime(),visitDate:fmtDate(),visitStatus:'checked-in',doctorId:appt.doctorId||'DOC001',doctorName:appt.doctor,dept:appt.dept,queueId:null,consultationId:null,prescriptionId:null,billingId:null};
  PATIENT_VISITS.push(visit);
  appt.status='checked-in';
  auditLog('CHECK_IN','PatientVisit',visitId,'Patient '+appt.patient+' checked in');
  addNotif('queue','g','Check-In Successful','Visit '+visitId+' created. Queue number will be issued shortly.');
  return visit;
}

// ---- Walk-in check-in ----
function walkInCheckIn(patientId,dept,doctorId){
  const patient=USERS_DB[patientId];
  if(!patient)return null;
  const visitId='VIS-'+new Date().getFullYear()+'-'+String(VC++).padStart(4,'0');
  const doc=USERS_DB[doctorId]||STAFF.find(s=>s.id===doctorId);
  const visit={visitId,patientId,patientName:patient.name,appointmentId:null,checkInTime:fmtTime(),visitDate:fmtDate(),visitStatus:'checked-in',doctorId,doctorName:doc?doc.name:'TBA',dept,queueId:null,consultationId:null,prescriptionId:null,billingId:null};
  PATIENT_VISITS.push(visit);
  auditLog('WALK_IN','PatientVisit',visitId,'Walk-in for '+patient.name);
  return visit;
}

// ---- Generate queue from visit ----
function generateQueueFromVisit(visitId){
  const visit=PATIENT_VISITS.find(v=>v.visitId===visitId);
  if(!visit)return null;
  const num=++QC;
  const qNum='Q-'+String(num).padStart(3,'0');
  const dept=visit.dept==='Dental'?'Dental':'GP';
  const waiting=QUEUE.filter(q=>q.dept===dept&&q.status==='waiting').length;
  const entry={id:'QT'+Date.now(),number:qNum,visitId,pid:visit.patientId,patient:visit.patientName,dept,type:'Consultation',doctor:visit.doctorName,doctorId:visit.doctorId,time:fmtTime(),status:'waiting',estimatedWait:waiting*15};
  QUEUE.push(entry);
  visit.queueId=entry.id;
  visit.visitStatus='queued';
  auditLog('QUEUE_CREATED','Queue',entry.id,'Queue '+qNum+' for Visit '+visitId);
  addNotif('queue','','Queue Number Issued','Your number is '+qNum+'. Est. wait: '+(waiting*15)+' min.');
  return entry;
}

// ---- Patient check-in from appointment button ----
function checkInAppointment(apptId){
  if(PATIENT_VISITS.find(v=>v.appointmentId===apptId)){toast('Already checked in','w');return;}
  const visit=checkInFromAppointment(apptId);
  if(!visit)return;
  const q=generateQueueFromVisit(visit.visitId);
  toast('Checked in! Visit '+visit.visitId+' · Queue '+q.number,'s');
  buildNav();nav('queue');
}

// ---- Create consultation (doctor calls patient) ----
function createConsultation(queueId){
  const q=QUEUE.find(x=>x.id===queueId);
  if(!q)return null;
  const visit=q.visitId?PATIENT_VISITS.find(v=>v.visitId===q.visitId):null;
  const csId='CS-'+new Date().getFullYear()+'-'+String(CSC++).padStart(4,'0');
  const cs={consultationId:csId,visitId:q.visitId||null,patientId:q.pid,patientName:q.patient,doctorId:q.doctorId||S.user.id,doctorName:q.doctor||S.user.name,diagnosis:'',notes:'',treatment:'',symptoms:'',followUp:'',consultationDate:fmtDate(),consultationTime:fmtTime(),status:'in-progress'};
  CONSULTATIONS.push(cs);
  if(visit){visit.consultationId=csId;visit.visitStatus='consulting';}
  q.status='consulting';
  QCALLED=parseInt(q.number.split('-')[1]);
  auditLog('CONSULT_START','Consultation',csId,'Started for '+q.patient);
  return cs;
}

// ---- Submit consultation → auto-creates Rx + Bill + MedRecord ----
function submitConsultation(csId,diagData,rxItems){
  const cs=CONSULTATIONS.find(c=>c.consultationId===csId);
  if(!cs)return;
  const visit=cs.visitId?PATIENT_VISITS.find(v=>v.visitId===cs.visitId):null;
  cs.diagnosis=diagData.diagnosis||'As documented';
  cs.notes=diagData.notes||'';
  cs.treatment=diagData.treatment||'';
  cs.symptoms=diagData.symptoms||'';
  cs.followUp=diagData.followUp||'';
  cs.status='completed';

  // Auto-create Medical Record
  const mrId='MR-'+new Date().getFullYear()+'-'+String(MRC++).padStart(4,'0');
  MED_RECORDS.push({id:mrId,visitId:cs.visitId,pid:cs.patientId,patient:cs.patientName,dept:visit?visit.dept:'General Practice',doctor:cs.doctorName,complaint:cs.symptoms||'Consultation',diagnosis:cs.diagnosis,treatment:cs.treatment,notes:cs.notes,followUp:cs.followUp,date:cs.consultationDate});

  // Auto-create Prescription if items given
  let rxId=null;
  if(rxItems&&rxItems.length>0){
    rxId='RX-'+new Date().getFullYear()+'-'+String(PXC++).padStart(4,'0');
    const pxObj={id:'PR'+Date.now(),rx:rxId,consultationId:csId,visitId:cs.visitId,pid:cs.patientId,patient:cs.patientName,doctor:cs.doctorName,doctorId:cs.doctorId,meds:rxItems.map(i=>i.name).join(', '),status:'pending',counter:'—',date:fmtDate()};
    PRESCRIPTIONS.push(pxObj);
    rxItems.forEach(item=>{
      PRESCRIPTION_ITEMS.push({id:'PXI-'+String(PXIC++).padStart(4,'0'),prescriptionId:pxObj.id,medicineName:item.name,quantity:item.qty,dosage:item.dosage,unit:item.unit||''});
      const drug=DRUGS.find(d=>d.name===item.name);
      if(drug)drug.stock=Math.max(0,drug.stock-item.qty);
    });
    if(visit)visit.prescriptionId=pxObj.id;
    auditLog('RX_CREATED','Prescription',rxId,rxItems.length+' items');
    addNotif('pharma','','Prescription Sent to Pharmacy','Prescription '+rxId+' is now being prepared. Patient: '+cs.patientName);
  }

  // Auto-create Bill
  const billId='INV-'+new Date().getFullYear()+'-'+String(BC++).padStart(4,'0');
  const dept=visit?visit.dept:'General Practice';
  const fee=dept==='Dental'?SYS.dentalFee:SYS.consultFee;
  const items=[{n:'Consultation Fee',p:fee,type:'consultation'}];
  if(rxItems&&rxItems.length>0){
    rxItems.forEach(item=>{
      const drug=DRUGS.find(d=>d.name===item.name);
      const price=drug?(drug.price||0)*item.qty:0;
      if(price>0)items.push({n:item.name+' x'+item.qty,p:price,type:'medication'});
    });
  }
  const bill={id:billId,visitId:cs.visitId,pid:cs.patientId,patient:cs.patientName,items,status:'unpaid',method:null,date:fmtDate(),dept,consultationId:csId};
  BILLS.push(bill);
  if(visit){visit.billingId=billId;visit.visitStatus=rxItems&&rxItems.length>0?'pharmacy':'billing';}

  // Update queue
  const q=QUEUE.find(x=>x.visitId===cs.visitId||(x.pid===cs.patientId&&x.status==='consulting'));
  if(q)q.status='done';

  auditLog('CONSULT_DONE','Consultation',csId,'Diagnosis: '+cs.diagnosis);
  addNotif('appt','g','Consultation Complete','Consultation done.'+(rxItems&&rxItems.length>0?' Prescription sent to pharmacy.':'')+' Invoice '+billId+' generated.');
  return{mrId,rxId,billId};
}

// ---- Consultation Room view (Doctor/Dentist) ----
function vConsultationRoom(){
  const myId=S.user.id;
  const activeCs=CONSULTATIONS.find(c=>c.doctorId===myId&&c.status==='in-progress');
  const dept=S.user.role==='dentist'?'Dental':'GP';

  if(activeCs){
    const patient=USERS_DB[activeCs.patientId]||{};
    const prevRecs=MED_RECORDS.filter(m=>m.pid===activeCs.patientId).slice(0,3);
    window._rxItems=window._rxItems||[];
    document.getElementById('vc').innerHTML=
      '<div class="ph-row"><div class="ph" style="margin-bottom:0"><h1>Active Consultation</h1><p>'+activeCs.consultationId+' — '+fmtTime()+'</p></div>'
      +'<span class="badge bs" style="font-size:.8rem;padding:.28rem .7rem"><span class="dot" style="background:#27ae60;border-radius:50%;display:inline-block;width:7px;height:7px;margin-right:4px"></span>In Progress</span></div>'
      +'<div style="height:.9rem"></div>'
      +'<div class="g2" style="margin-bottom:.9rem">'
      // Patient card
      +'<div class="card"><div class="card-hd"><span class="card-title">Patient</span>'+(patient.allergy&&patient.allergy!=='None'?'<span class="badge bd" style="font-size:.72rem">⚠ '+patient.allergy+'</span>':'<span class="badge bn" style="font-size:.72rem">No known allergy</span>')+'</div><div class="card-bd">'
      +'<div style="display:flex;align-items:center;gap:.75rem;margin-bottom:.8rem"><div style="width:42px;height:42px;border-radius:50%;background:var(--red);display:flex;align-items:center;justify-content:center;color:#fff;font-family:\'Playfair Display\',serif;font-size:1rem;font-weight:700;flex-shrink:0">'+ini(activeCs.patientName)+'</div><div><div style="font-weight:600">' +activeCs.patientName+'</div><div style="font-size:.73rem;color:var(--g400)">'+activeCs.patientId+' · Blood: '+(patient.blood||'—')+'</div></div></div>'
      +[['IC',patient.ic||'—'],['Phone',patient.phone||'—'],['Faculty',patient.faculty||'—']].map(([k,v])=>'<div style="display:flex;justify-content:space-between;padding:.32rem 0;border-bottom:1px solid var(--g100);font-size:.79rem"><span style="color:var(--g400)">'+k+'</span><strong>'+v+'</strong></div>').join('')
      +(prevRecs.length?'<div style="margin-top:.7rem"><div style="font-size:.68rem;font-weight:600;color:var(--g400);text-transform:uppercase;margin-bottom:.35rem">Recent History</div>'+prevRecs.map(m=>'<div style="background:var(--g100);border-radius:6px;padding:.38rem .55rem;margin-bottom:.28rem;font-size:.76rem"><strong>'+m.date+'</strong> — '+m.diagnosis+'</div>').join('')+'</div>':'')
      +'</div></div>'
      // Diagnosis form
      +'<div class="card"><div class="card-hd"><span class="card-title">Consultation Form</span></div><div class="card-bd">'
      +'<div class="fg"><label class="lbl">Chief Complaint / Symptoms</label><textarea class="inp" id="csSymp" rows="2" placeholder="Patient main complaint..."></textarea></div>'
      +'<div class="fg"><label class="lbl">Diagnosis *</label><textarea class="inp" id="csDiag" rows="2" placeholder="Enter diagnosis..."></textarea></div>'
      +'<div class="fg"><label class="lbl">Treatment</label><textarea class="inp" id="csTreat" rows="2" placeholder="Treatment plan..."></textarea></div>'
      +'<div class="fg"><label class="lbl">Doctor Notes</label><textarea class="inp" id="csNotes" rows="2" placeholder="Additional notes..."></textarea></div>'
      +'<div class="fg"><label class="lbl">Follow-up</label><input class="inp" id="csFU" type="text" placeholder="e.g. 2 weeks, none"></div>'
      +'</div></div></div>'
      // Prescription builder
      +'<div class="card" style="margin-bottom:.9rem"><div class="card-hd"><span class="card-title">Prescription (auto-sent to pharmacy on submit)</span><button class="btn btn-primary btn-sm" onclick="addRxItem()">+ Add Medicine</button></div>'
      +'<div class="card-bd"><div id="rxBuilderMsg" style="text-align:center;padding:.8rem;color:var(--g400);font-size:.81rem">No medicines added yet. Leave empty for no prescription.</div><div id="rxItemsList"></div></div></div>'
      // Actions
      +'<div class="card"><div class="card-bd" style="display:flex;gap:.5rem;justify-content:flex-end;flex-wrap:wrap">'
      +'<button class="btn btn-ghost" onclick="skipActiveConsult(\''+activeCs.consultationId+'\')">Skip Patient</button>'
      +'<button class="btn btn-success" onclick="submitConsultForm(\''+activeCs.consultationId+'\')">✓ Complete & Send to Pharmacy/Billing</button>'
      +'</div></div>';
    return;
  }

  // No active consult — show waiting queue
  const waitQ=QUEUE.filter(q=>q.dept===dept&&q.status==='waiting');
  document.getElementById('vc').innerHTML=
    '<div class="ph"><h1>Consultation Room</h1><p>Call a patient to begin consultation</p></div>'
    +'<div class="ib ib-b">'+IC.info+'<span>Clicking <strong>Call & Start</strong> creates a Consultation linked to the PatientVisit. Submitting auto-generates Prescription, Bill and Medical Record.</span></div>'
    +'<div class="card"><div class="card-hd"><span class="card-title">Waiting — '+(dept==='GP'?'General Practice':'Dental Clinic')+'</span><span class="badge '+(waitQ.length?'bw':'bn')+'">'+waitQ.length+' waiting</span></div>'
    +'<div class="card-bd">'
    +(waitQ.length?waitQ.map((q,i)=>'<div style="display:flex;align-items:center;gap:.75rem;padding:.75rem;border-radius:9px;background:'+(i===0?'rgba(139,26,26,.05)':'var(--g100)')+';margin-bottom:.42rem;border:'+(i===0?'1.5px solid rgba(139,26,26,.18)':'1px solid transparent')+'">'
      +'<div style="width:38px;height:38px;border-radius:50%;background:'+(i===0?'var(--red)':'var(--g200)')+';display:flex;align-items:center;justify-content:center;font-weight:700;font-size:.78rem;color:'+(i===0?'#fff':'var(--g500)')+'">'+q.number.split('-')[1]+'</div>'
      +'<div style="flex:1"><div style="font-weight:600;font-size:.84rem">'+q.patient+'</div>'
      +'<div style="font-size:.71rem;color:var(--g400)">'+q.time+(q.visitId?' · Visit: '+q.visitId:'')+'</div>'
      +(q.estimatedWait?'<div style="font-size:.69rem;color:var(--blue)">Est. wait: '+q.estimatedWait+' min</div>':'')
      +'</div>'
      +'<div style="display:flex;gap:.36rem"><button class="btn btn-primary btn-sm" onclick="callAndStartConsult(\''+q.id+'\')">Call & Start</button>'
      +'<button class="btn btn-ghost btn-sm" onclick="skipPatient(\''+q.id+'\')">Skip</button></div>'
      +'</div>').join('')
    :'<div style="text-align:center;padding:2rem;color:var(--g400)">No patients waiting</div>')
    +'</div></div>';
}

window._rxItems=[];

function addRxItem(){
  openModal('Add Medicine','<div class="fg"><label class="lbl">Medicine</label><select class="inp" id="rxDrug">'+DRUGS.map((d,i)=>'<option value="'+i+'">'+d.name+' (Stock: '+d.stock+')</option>').join('')+'</select></div><div class="r2"><div class="fg"><label class="lbl">Quantity</label><input class="inp" type="number" id="rxQty" value="10" min="1"></div><div class="fg"><label class="lbl">Unit</label><select class="inp" id="rxUnit"><option>tablets</option><option>capsules</option><option>bottles</option><option>sachets</option><option>doses</option></select></div></div><div class="fg"><label class="lbl">Dosage Instructions</label><input class="inp" id="rxDosage" placeholder="e.g. 1 tablet 3 times daily after meals"></div>',
    [{lbl:'Cancel',cls:'btn-ghost',fn:'closeModal()'},{lbl:'Add',cls:'btn-primary',fn:'confirmAddRx()'}]);
}

function confirmAddRx(){
  const idx=parseInt(document.getElementById('rxDrug')?.value);
  const qty=parseInt(document.getElementById('rxQty')?.value||0);
  const dosage=document.getElementById('rxDosage')?.value||'As directed';
  const unit=document.getElementById('rxUnit')?.value||'tablets';
  if(!qty||qty<=0){toast('Enter valid quantity','e');return;}
  const drug=DRUGS[idx];
  if(!drug)return;
  if(!window._rxItems)window._rxItems=[];
  window._rxItems.push({name:drug.name,qty,dosage,unit});
  closeModal();
  const msg=document.getElementById('rxBuilderMsg');
  if(msg)msg.style.display='none';
  const el=document.getElementById('rxItemsList');
  if(el)el.innerHTML=window._rxItems.map((item,i)=>'<div style="display:flex;align-items:center;gap:.7rem;padding:.65rem;border-radius:8px;background:var(--g100);margin-bottom:.38rem"><div style="width:30px;height:30px;border-radius:7px;background:var(--red);display:flex;align-items:center;justify-content:center;flex-shrink:0">'+IC.phar+'</div><div style="flex:1"><div style="font-size:.81rem;font-weight:600">'+item.name+' ×'+item.qty+' '+item.unit+'</div><div style="font-size:.71rem;color:var(--g400)">'+item.dosage+'</div></div><button class="btn btn-danger btn-sm" onclick="removeRxItem('+i+')">✕</button></div>').join('');
  toast(drug.name+' added','s');
}

function removeRxItem(i){
  if(!window._rxItems)return;
  window._rxItems.splice(i,1);
  const el=document.getElementById('rxItemsList');
  if(el)el.innerHTML=window._rxItems.map((item,j)=>'<div style="display:flex;align-items:center;gap:.7rem;padding:.65rem;border-radius:8px;background:var(--g100);margin-bottom:.38rem"><div style="width:30px;height:30px;border-radius:7px;background:var(--red);display:flex;align-items:center;justify-content:center;flex-shrink:0">'+IC.phar+'</div><div style="flex:1"><div style="font-size:.81rem;font-weight:600">'+item.name+' ×'+item.qty+' '+item.unit+'</div><div style="font-size:.71rem;color:var(--g400)">'+item.dosage+'</div></div><button class="btn btn-danger btn-sm" onclick="removeRxItem('+j+')">✕</button></div>').join('');
  if(!window._rxItems.length){const msg=document.getElementById('rxBuilderMsg');if(msg)msg.style.display='';}
}

function callAndStartConsult(queueId){
  const cs=createConsultation(queueId);
  if(!cs){toast('Error starting consultation','e');return;}
  window._rxItems=[];
  toast('Consultation '+cs.consultationId+' started for '+cs.patientName,'s');
  buildNav();
  nav('consultation');
}

function submitConsultForm(csId){
  const diag=document.getElementById('csDiag')?.value.trim();
  if(!diag){toast('Diagnosis is required','e');return;}
  const data={symptoms:document.getElementById('csSymp')?.value||'',diagnosis:diag,treatment:document.getElementById('csTreat')?.value||'',notes:document.getElementById('csNotes')?.value||'',followUp:document.getElementById('csFU')?.value||''};
  submitConsultation(csId,data,window._rxItems||[]);
  window._rxItems=[];
  toast('Consultation complete! Prescription & Bill auto-generated.','s');
  buildNav();
  nav('consultation');
}

function skipActiveConsult(csId){
  const cs=CONSULTATIONS.find(c=>c.consultationId===csId);
  if(!cs)return;
  const q=QUEUE.find(x=>x.visitId===cs.visitId||(x.pid===cs.patientId&&x.status==='consulting'));
  if(q)q.status='waiting';
  cs.status='skipped';
  const visit=cs.visitId?PATIENT_VISITS.find(v=>v.visitId===cs.visitId):null;
  if(visit)visit.visitStatus='queued';
  window._rxItems=[];
  toast('Patient skipped','w');
  buildNav();nav('consultation');
}

// ---- Patient Visits (Admin) ----
function vVisits(){
  const visits=PATIENT_VISITS.slice().reverse();
  document.getElementById('vc').innerHTML='<div class="ph-row"><div class="ph" style="margin-bottom:0"><h1>Patient Visits</h1><p>Central record linking Appointment → Queue → Consultation → Pharmacy → Billing</p></div><div style="display:flex;gap:.5rem;flex-wrap:wrap"><button class="btn btn-outline btn-sm" onclick="openWalkIn()">+ Walk-in</button><button class="btn btn-primary btn-sm" onclick="dlVisitCSV()">Export</button></div></div><div style="height:1rem"></div>'
  +sgHTML([{ic:svgi(P.users),val:PATIENT_VISITS.length,lbl:'Total Visits'},{cls:'o',ic:svgi(P.clk,'#f39c12'),val:PATIENT_VISITS.filter(v=>v.visitStatus!=='completed'&&v.visitStatus!=='cancelled').length,lbl:'Active'},{cls:'g',ic:svgi(P.chk,'#27ae60'),val:PATIENT_VISITS.filter(v=>v.visitStatus==='completed').length,lbl:'Completed'},{cls:'b',ic:svgi(P.dol,'#2980b9'),val:PATIENT_VISITS.filter(v=>v.visitStatus==='pharmacy').length,lbl:'In Pharmacy'}])
  +'<div class="card"><div class="card-bd">'
  +'<div class="tabs"><div class="tab active" onclick="filterVTab(this,\'all\')">All ('+visits.length+')</div>'
  +'<div class="tab" onclick="filterVTab(this,\'checked-in\')">Checked In</div>'
  +'<div class="tab" onclick="filterVTab(this,\'queued\')">Queued</div>'
  +'<div class="tab" onclick="filterVTab(this,\'consulting\')">Consulting</div>'
  +'<div class="tab" onclick="filterVTab(this,\'pharmacy\')">Pharmacy</div>'
  +'<div class="tab" onclick="filterVTab(this,\'billing\')">Billing</div>'
  +'<div class="tab" onclick="filterVTab(this,\'completed\')">Completed</div></div>'
  +'<div class="tw"><table><thead><tr><th>Visit ID</th><th>Patient</th><th>Dept</th><th>Doctor</th><th>Check-In</th><th>Appointment</th><th>Queue</th><th>Status</th><th>Actions</th></tr></thead><tbody id="visitTbl">'
  +(visits.length?visits.map(v=>{const q=QUEUE.find(x=>x.visitId===v.visitId);return'<tr data-st="'+v.visitStatus+'"><td><strong style="color:var(--red)">'+v.visitId+'</strong></td><td>'+v.patientName+'</td><td>'+v.dept+'</td><td style="font-size:.75rem">'+v.doctorName+'</td><td>'+v.checkInTime+'</td><td style="font-size:.74rem">'+(v.appointmentId||'<em>Walk-in</em>')+'</td><td>'+(q?'<strong>'+q.number+'</strong>':'<em>—</em>')+'</td><td>'+visitStatusBadge(v.visitStatus)+'</td><td style="display:flex;gap:.26rem;flex-wrap:wrap"><button class="btn btn-ghost btn-sm" onclick="viewVisitDetail(\''+v.visitId+'\')">View</button>'+(v.visitStatus==='checked-in'?'<button class="btn btn-primary btn-sm" onclick="adminIssueQueue(\''+v.visitId+'\')">→ Queue</button>':'')+'</td></tr>';}).join('')
  :'<tr><td colspan="9" style="text-align:center;padding:2rem;color:var(--g400)">No visits yet</td></tr>')
  +'</tbody></table></div></div></div>';
}

function filterVTab(el,st){document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));el.classList.add('active');document.querySelectorAll('#visitTbl tr[data-st]').forEach(r=>{r.style.display=(st==='all'||r.dataset.st===st)?'':'none';});}

function adminIssueQueue(visitId){
  const q=generateQueueFromVisit(visitId);
  if(q){toast('Queue '+q.number+' issued for '+visitId,'s');nav('visits');}
}

function viewVisitDetail(visitId){
  const v=PATIENT_VISITS.find(x=>x.visitId===visitId);
  if(!v)return;
  const q=QUEUE.find(x=>x.visitId===visitId);
  const cs=CONSULTATIONS.find(x=>x.visitId===visitId);
  const rx=PRESCRIPTIONS.find(x=>x.visitId===visitId);
  const rxItems=rx?PRESCRIPTION_ITEMS.filter(i=>i.prescriptionId===rx.id):[];
  const bill=BILLS.find(x=>x.visitId===visitId);
  openModal('Visit — '+visitId,
    '<div style="background:linear-gradient(135deg,var(--red-dk),var(--red));border-radius:10px;padding:.9rem 1.1rem;margin-bottom:.9rem;color:#fff">'
    +'<div style="font-size:.68rem;opacity:.7;margin-bottom:.2rem">PATIENT VISIT</div>'
    +'<div style="font-family:\'Playfair Display\',serif;font-size:1.05rem;font-weight:700">'+v.patientName+'</div>'
    +'<div style="font-size:.76rem;opacity:.82;margin-top:.15rem">'+v.visitId+' · '+v.dept+' · '+v.visitDate+'</div>'
    +'</div>'
    +visitProgressBar(v.visitStatus)
    +'<div style="display:grid;grid-template-columns:1fr 1fr;gap:.5rem;margin-bottom:.8rem">'
    +[['Visit ID',v.visitId],['Patient ID',v.patientId],['Dept',v.dept],['Doctor',v.doctorName],['Check-in',v.checkInTime],['Status',v.visitStatus],['Appointment',v.appointmentId||'Walk-in'],['Queue',q?q.number:'—']].map(([k,val])=>'<div style="background:var(--g100);border-radius:7px;padding:.45rem .65rem"><div style="font-size:.65rem;color:var(--g400);text-transform:uppercase;margin-bottom:.1rem">'+k+'</div><div style="font-size:.79rem;font-weight:600">'+val+'</div></div>').join('')
    +'</div>'
    +(cs?'<div style="background:rgba(39,174,96,.06);border-left:3px solid var(--green);border-radius:8px;padding:.7rem .85rem;margin-bottom:.6rem"><div style="font-size:.7rem;color:var(--g400);font-weight:600;text-transform:uppercase;margin-bottom:.35rem">Consultation — '+cs.consultationId+'</div><div style="font-size:.8rem"><strong>Diagnosis:</strong> '+cs.diagnosis+'</div>'+(cs.treatment?'<div style="font-size:.8rem;margin-top:.18rem"><strong>Treatment:</strong> '+cs.treatment+'</div>':'')+'</div>':'')
    +(rx?'<div style="background:rgba(41,128,185,.06);border-left:3px solid var(--blue);border-radius:8px;padding:.7rem .85rem;margin-bottom:.6rem"><div style="font-size:.7rem;color:var(--g400);font-weight:600;text-transform:uppercase;margin-bottom:.35rem">Prescription — '+rx.rx+'</div>'+(rxItems.length?rxItems.map(i=>'<div style="font-size:.8rem">• '+i.medicineName+' — '+i.quantity+' '+i.unit+' ('+i.dosage+')</div>').join(''):'<div style="font-size:.8rem">'+rx.meds+'</div>')+'<div style="margin-top:.3rem"><span class="badge '+(rx.status==='collected'?'bn':rx.status==='ready'?'bs':'bw')+'">'+rx.status+'</span></div></div>':'')
    +(bill?'<div style="background:rgba(243,156,18,.06);border-left:3px solid var(--orange);border-radius:8px;padding:.7rem .85rem"><div style="font-size:.7rem;color:var(--g400);font-weight:600;text-transform:uppercase;margin-bottom:.35rem">Invoice — '+bill.id+'</div>'+bill.items.map(i=>'<div style="display:flex;justify-content:space-between;font-size:.79rem"><span>'+i.n+'</span><strong>RM '+i.p.toFixed(2)+'</strong></div>').join('')+'<div style="display:flex;justify-content:space-between;font-size:.83rem;font-weight:700;border-top:1px solid var(--g200);margin-top:.35rem;padding-top:.35rem"><span>Total</span><span>RM '+bill.items.reduce((s,i)=>s+i.p,0).toFixed(2)+'</span></div><span class="badge '+(bill.status==='paid'?'bs':'bd')+'" style="margin-top:.3rem;display:inline-block">'+bill.status+'</span></div>':'')
    ,[{lbl:'Close',cls:'btn-ghost',fn:'closeModal()'}],true);
}

function openWalkIn(){
  const allU=Object.values(USERS_DB).filter(u=>u.role==='user');
  const docs=STAFF.filter(s=>s.role==='Doctor'||s.role==='Dentist');
  openModal('Walk-in Check-in',
    '<div class="ib ib-b">'+IC.info+'<span>Creates a PatientVisit and queue number immediately — no appointment needed.</span></div>'
    +'<div class="fg"><label class="lbl">Patient</label><select class="inp" id="wiPat">'+allU.map(u=>'<option value="'+u.id+'">'+u.name+' ('+u.id+')</option>').join('')+'</select></div>'
    +'<div class="r2"><div class="fg"><label class="lbl">Department</label><select class="inp" id="wiDept"><option>General Practice</option><option>Dental</option></select></div>'
    +'<div class="fg"><label class="lbl">Doctor</label><select class="inp" id="wiDoc">'+docs.map(d=>'<option value="'+d.id+'">'+d.name+'</option>').join('')+'</select></div></div>',
    [{lbl:'Cancel',cls:'btn-ghost',fn:'closeModal()'},{lbl:'Check In & Issue Queue',cls:'btn-primary',fn:'doWalkIn()'}]);
}

function doWalkIn(){
  const pid=document.getElementById('wiPat')?.value;
  const dept=document.getElementById('wiDept')?.value;
  const docId=document.getElementById('wiDoc')?.value;
  if(!pid||!dept||!docId){toast('All fields required','e');return;}
  const visit=walkInCheckIn(pid,dept,docId);
  if(!visit){toast('Error','e');return;}
  const q=generateQueueFromVisit(visit.visitId);
  closeModal();
  toast('Visit '+visit.visitId+' created. Queue: '+q.number,'s');
  buildNav();nav('visits');
}

function dlVisitCSV(){
  const rows=[['Visit ID','Patient','Dept','Doctor','Check-In','Appointment','Queue','Status'],...PATIENT_VISITS.map(v=>[v.visitId,v.patientName,v.dept,v.doctorName,v.checkInTime,v.appointmentId||'Walk-in',QUEUE.find(q=>q.visitId===v.visitId)?.number||'—',v.visitStatus])];
  dlCSV('UTHM_PKU_Visits.csv',rows);toast('Visits exported','s');
}

// ---- Audit Log view (Admin) ----
function vAuditLog(){
  document.getElementById('vc').innerHTML='<div class="ph-row"><div class="ph" style="margin-bottom:0"><h1>Audit Trail</h1><p>Every system action tracked with timestamp and user</p></div><button class="btn btn-outline btn-sm" onclick="dlAuditCSV()">Export CSV</button></div><div style="height:1rem"></div>'
  +'<div class="card"><div class="card-bd">'
  +(AUDIT_LOG.length
    ?'<div class="tw"><table><thead><tr><th>Time</th><th>User</th><th>Action</th><th>Entity</th><th>ID</th><th>Details</th></tr></thead><tbody>'
      +AUDIT_LOG.slice().reverse().slice(0,100).map(a=>'<tr><td style="font-size:.72rem">'+new Date(a.timestamp).toLocaleTimeString('en-MY',{hour:'2-digit',minute:'2-digit'})+'</td><td style="font-size:.76rem">'+a.userName+'</td><td><span class="badge bn" style="font-size:.67rem">'+a.action+'</span></td><td style="font-size:.76rem">'+a.entity+'</td><td style="font-size:.73rem;color:var(--blue)">'+a.entityId+'</td><td style="font-size:.73rem;color:var(--g400)">'+a.details+'</td></tr>').join('')
      +'</tbody></table></div>'
    :'<div style="text-align:center;padding:2rem;color:var(--g400)">No audit entries yet. Actions will appear here as users interact with the system.</div>')
  +'</div></div>';
}
function dlAuditCSV(){const rows=[['Timestamp','User','Action','Entity','ID','Details'],...AUDIT_LOG.map(a=>[a.timestamp,a.userName,a.action,a.entity,a.entityId,a.details])];dlCSV('UTHM_PKU_Audit.csv',rows);toast('Audit log exported','s');}

// ---- Override: Patient Dashboard with active visit ----
const _origUserDash=vUserDash;
vUserDash=function(){
  _origUserDash();
  // Inject active visit card below stat grid if patient has one
  const u=S.user;
  const myVisit=PATIENT_VISITS.filter(v=>v.patientId===u.id&&v.visitStatus!=='completed'&&v.visitStatus!=='cancelled').slice(-1)[0];
  if(myVisit){
    const sg=document.querySelector('#vc .sg');
    if(sg){
      const card=document.createElement('div');
      card.className='card';
      card.style.cssText='margin-bottom:.9rem;border:2px solid var(--red)';
      card.innerHTML='<div class="card-hd" style="background:rgba(139,26,26,.04)"><span class="card-title" style="color:var(--red)">Active Visit — '+myVisit.visitId+'</span>'+visitStatusBadge(myVisit.visitStatus)+'</div><div class="card-bd">'+visitProgressBar(myVisit.visitStatus)+'<div style="font-size:.79rem;color:var(--g500)">Dept: <strong>'+myVisit.dept+'</strong> · Doctor: <strong>'+myVisit.doctorName+'</strong></div></div>';
      sg.insertAdjacentElement('afterend',card);
    }
  }
};

// ---- Override: doLogin to add audit ----
const _origLogin=doLogin;
doLogin=function(){
  const id=document.getElementById('lId').value.trim();
  _origLogin();
  if(S.user)auditLog('LOGIN','User',S.user.id,'Login successful');
};

// ---- Override: doLogout to add audit ----
const _origLogout=doLogout;
doLogout=function(){
  if(S.user)auditLog('LOGOUT','User',S.user.id,'Logged out');
  _origLogout();
};

// ---- Override: processPayment to update visit status ----
const _origProcessPayment=processPayment;
processPayment=function(id){
  _origProcessPayment(id);
  const b=BILLS.find(x=>x.id===id);
  if(b&&b.visitId){
    const visit=PATIENT_VISITS.find(v=>v.visitId===b.visitId);
    if(visit&&visit.visitStatus!=='completed')visit.visitStatus='completed';
    auditLog('PAYMENT','Billing',id,'Paid via '+(b.method||'—'));
  }
};

// ---- Override: openRxUpdate to update visit status on ready ----
const _origDoRxUpdate=doRxUpdate;
doRxUpdate=function(id){
  _origDoRxUpdate(id);
  const rx=PRESCRIPTIONS.find(p=>p.id===id);
  if(rx&&rx.visitId){
    const visit=PATIENT_VISITS.find(v=>v.visitId===rx.visitId);
    if(visit&&rx.status==='ready'&&visit.visitStatus==='pharmacy')visit.visitStatus='billing';
    if(rx.status==='ready')auditLog('RX_READY','Prescription',rx.rx,'Ready for collection');
    if(rx.status==='collected')auditLog('RX_COLLECTED','Prescription',rx.rx,'Collected by '+rx.patient);
  }
};

// ---- Override: callPatient to use consultation room ----
const _origCallPatient=callPatient;
callPatient=function(id){
  const q=QUEUE.find(x=>x.id===id);
  if(!q)return;
  if(q.visitId&&(S.user.role==='doctor'||S.user.role==='dentist')){
    callAndStartConsult(id);
  } else {
    _origCallPatient(id);
  }
};

// ---- Override: confirmGetQ to create visit for walk-in queue ----
const _origConfirmGetQ=confirmGetQ;
confirmGetQ=function(){
  const u=S.user,dept=window._qDept||'GP';
  const docId=dept==='Dental'?'DEN001':'DOC001';
  const visit=walkInCheckIn(u.id,dept,docId);
  if(!visit){toast('Error creating visit','e');return;}
  const q=generateQueueFromVisit(visit.visitId);
  closeModal();
  toast('Queue '+q.number+' issued! Visit '+visit.visitId+' created.','s');
  buildNav();nav('queue');
};

// ---- Override: donePatient for legacy non-visit queue ----
const _origDonePatient=donePatient;
donePatient=function(id){
  const q=QUEUE.find(x=>x.id===id);
  if(!q)return;
  if(q.visitId&&(S.user.role==='doctor'||S.user.role==='dentist')){
    callAndStartConsult(id);
  } else {
    _origDonePatient(id);
  }
};

// ---- Override: checkInAppointment for appointment page ----
// (already defined in additions above — takes priority)

// ---- Override navItems to add new views ----
const _origNavItems=navItems;
navItems=function(){
  const items=_origNavItems();
  const r=S.user.role;
  if(r==='admin'){
    // Add Visits and Audit after dashboard
    const dashIdx=items.findIndex(i=>i.v==='dashboard');
    if(dashIdx>=0){
      items.splice(dashIdx+1,0,
        {v:'visits',ic:'chart',lbl:'Patient Visits',bdg:()=>PATIENT_VISITS.filter(v=>v.visitStatus!=='completed').length||''},
        {v:'audit-log',ic:'hist',lbl:'Audit Trail'}
      );
    }
  }
  if(r==='doctor'||r==='dentist'){
    const qIdx=items.findIndex(i=>i.v==='queue-mgmt');
    if(qIdx>=0){
      items.splice(qIdx+1,0,{v:'consultation',ic:'chk',lbl:'Consultation Room',bdg:()=>CONSULTATIONS.filter(c=>c.doctorId===S.user.id&&c.status==='in-progress').length||''});
    }
  }
  return items;
};

// ---- Override renderView to add new routes ----
const _origRenderView=renderView;
renderView=function(v){
  if(v==='visits'){vVisits();return;}
  if(v==='consultation'){vConsultationRoom();return;}
  if(v==='audit-log'){vAuditLog();return;}
  _origRenderView(v);
};

// ---- Override PT (page titles) ----
PT.visits='Patient Visits';
PT.consultation='Consultation Room';
PT['audit-log']='Audit Trail';

// ---- Override cancelMyQ to also update visit ----
const _origCancelMyQ=cancelMyQ;
cancelMyQ=function(id){
  const q=QUEUE.find(x=>x.id===id);
  if(q&&q.visitId){
    const visit=PATIENT_VISITS.find(v=>v.visitId===q.visitId);
    if(visit)visit.visitStatus='checked-in';
  }
  _origCancelMyQ(id);
};

// ---- Override vPharmacy to show visit linkage ----
const _origVPharmacy=vPharmacy;
vPharmacy=function(){
  _origVPharmacy();
  // Append visit info to each prescription card
  const u=S.user;
  const myRx=PRESCRIPTIONS.filter(p=>p.pid===u.id&&p.visitId);
  // Info already in visitId field visible in history table
};

// ---- Override vMedHistory to add visit summary ----
const _origVMedHistory = typeof vMedHistory !== 'undefined' ? vMedHistory : null;

// Override vPharmaMgmt to show visit column
const _origVPharmaMgmt=vPharmaMgmt;
vPharmaMgmt=function(){
  _origVPharmaMgmt();
  // Visit column already embedded in vPharmaMgmt output
};

console.log('[UTHM PKU v3.0] Integrated workflow engine loaded. PatientVisit central entity active.');

function openForgotPw(){
  showPg('forgotPw');
  document.getElementById('fpStep1').style.display='';
  document.getElementById('fpStep2').style.display='none';
  ['fpIdErr','fpIcErr'].forEach(id=>{const e=document.getElementById(id);if(e)e.textContent='';});
  ['fpId','fpIc','fpNew','fpCf'].forEach(id=>{const e=document.getElementById(id);if(e)e.value='';});
  // Reset step indicators
  const d1=document.getElementById('fpDot1'),d2=document.getElementById('fpDot2'),l1=document.getElementById('fpLine1');
  if(d1){d1.style.background='var(--red)';d1.style.color='#fff';}
  if(d2){d2.style.background='var(--g200)';d2.style.color='var(--g400)';}
  if(l1)l1.style.background='var(--g200)';
}
function fpNext(){
  const rawId=document.getElementById('fpId').value.trim().toUpperCase();
  const ic=document.getElementById('fpIc').value.trim();
  const role=document.getElementById('fpRole').value;
  document.getElementById('fpIdErr').textContent='';
  document.getElementById('fpIcErr').textContent='';
  if(!rawId){document.getElementById('fpIdErr').textContent='Please enter your ID';return;}
  if(!ic){document.getElementById('fpIcErr').textContent='Please enter your IC number';return;}
  const ud=USERS_DB[rawId]||PENDING.find(u=>u.id===rawId);
  if(!ud){document.getElementById('fpIdErr').textContent='ID not found in system';return;}
  // Verify IC number
  const storedIc=(ud.ic||'').replace(/-/g,'').trim();
  const enteredIc=ic.replace(/-/g,'').trim();
  if(storedIc&&enteredIc&&storedIc!==enteredIc){
    document.getElementById('fpIcErr').textContent='IC number does not match our records';return;
  }
  const correctRole=ROLE_DB[rawId]||'user';
  if(role!=='user'&&correctRole!==role){document.getElementById('fpIdErr').textContent='Role does not match this ID';return;}
  window._fpId=rawId;
  document.getElementById('fpStep1').style.display='none';
  document.getElementById('fpStep2').style.display='';
  document.getElementById('fpNewErr').textContent='';
  document.getElementById('fpNew').value='';
  document.getElementById('fpCf').value='';
  // Animate step indicators
  const d1=document.getElementById('fpDot1'),d2=document.getElementById('fpDot2'),l1=document.getElementById('fpLine1');
  if(d1){d1.style.background='var(--green)';d1.innerHTML='✓';}
  if(l1)l1.style.background='var(--green)';
  if(d2){d2.style.background='var(--red)';d2.style.color='#fff';}
}
function fpReset(){
  const pw=document.getElementById('fpNew').value;
  const cf=document.getElementById('fpCf').value;
  document.getElementById('fpNewErr').textContent='';
  if(pw.length<8){document.getElementById('fpNewErr').textContent='Minimum 8 characters required';return;}
  if(pw!==cf){document.getElementById('fpNewErr').textContent='Passwords do not match';return;}
  PASS_DB[window._fpId]=pw;
  // Animate done
  const d2=document.getElementById('fpDot2');
  if(d2){d2.style.background='var(--green)';d2.innerHTML='✓';}
  setTimeout(()=>{
    toast('Password reset successful! You can now sign in.','s');
    showPg('login');
  },600);
}

// ---- Vital Signs store ----
const VITALS = {};
function getVitals(pid){
  return VITALS[pid]||{bp:'--',hr:'--',wt:'--',bmi:'--',spo2:'--',temp:'--'};
}
function openEditVitals(pid,patientName){
  const v=getVitals(pid);
  openModal('Edit Vital Signs — '+patientName,
    '<div class="r2">'
    +'<div class="fg"><label class="lbl">Blood Pressure (mmHg)</label><input class="inp" id="vtBp" type="text" value="'+v.bp+'" placeholder="e.g. 118/76"></div>'
    +'<div class="fg"><label class="lbl">Heart Rate (bpm)</label><input class="inp" id="vtHr" type="number" value="'+v.hr+'" placeholder="e.g. 82"></div>'
    +'</div><div class="r2">'
    +'<div class="fg"><label class="lbl">Weight (kg)</label><input class="inp" id="vtWt" type="number" step="0.1" value="'+v.wt+'" placeholder="e.g. 68"></div>'
    +'<div class="fg"><label class="lbl">BMI</label><input class="inp" id="vtBmi" type="number" step="0.1" value="'+v.bmi+'" placeholder="e.g. 22.4"></div>'
    +'</div><div class="r2">'
    +'<div class="fg"><label class="lbl">SpO2 (%)</label><input class="inp" id="vtSpo2" type="number" value="'+v.spo2+'" placeholder="e.g. 98"></div>'
    +'<div class="fg"><label class="lbl">Temperature (°C)</label><input class="inp" id="vtTemp" type="number" step="0.1" value="'+v.temp+'" placeholder="e.g. 36.8"></div>'
    +'</div>',
    [{lbl:'Cancel',cls:'btn-ghost',fn:'closeModal()'},{lbl:'Save Vitals',cls:'btn-primary',fn:'saveVitals("'+pid+'")'}]
  );
}
function saveVitals(pid){
  const bp=document.getElementById('vtBp')?.value||'--';
  const hr=document.getElementById('vtHr')?.value||'--';
  const wt=document.getElementById('vtWt')?.value||'--';
  const bmi=document.getElementById('vtBmi')?.value||'--';
  const spo2=document.getElementById('vtSpo2')?.value||'--';
  const temp=document.getElementById('vtTemp')?.value||'--';
  VITALS[pid]={bp,hr,wt,bmi,spo2,temp,updated:fmtTime()};
  auditLog('VITALS_UPDATED','Patient',pid,'BP:'+bp+' HR:'+hr+' SpO2:'+spo2);
  closeModal();
  toast('Vital signs saved','s');
}
function renderVitalsCard(pid,canEdit){
  const v=getVitals(pid);
  const hasData=v.bp!=='--'||v.hr!=='--';
  const vitals=[
    ['Blood Pressure',v.bp+(v.bp!=='--'?' mmHg':''),72,'var(--red)'],
    ['Heart Rate',v.hr+(v.hr!=='--'?' bpm':''),65,'var(--green)'],
    ['Weight / BMI',(v.wt!=='--'?v.wt+' kg':'--')+(v.bmi!=='--'?' / BMI '+v.bmi:''),58,'var(--blue)'],
    ['SpO2',v.spo2+(v.spo2!=='--'?'%':''),v.spo2!=='--'?parseInt(v.spo2):50,'var(--green)'],
    ['Temperature',v.temp+(v.temp!=='--'?' °C':''),55,'var(--orange)']
  ];
  return '<div class="card" style="margin-bottom:.9rem"><div class="card-hd"><span class="card-title">Vital Signs</span>'
    +(v.updated?'<span style="font-size:.7rem;color:var(--g400)">Updated '+v.updated+'</span>':'')
    +(canEdit?'<button class="btn btn-primary btn-sm" onclick="openEditVitals(\'' + pid + '\',\'\')">Edit Vitals</button>':'')
    +'</div><div class="card-bd">'
    +(hasData
      ?'<div class="vstat-list">'+vitals.map(([l,val,p,c])=>'<div class="vstat-item"><div class="vstat-lc">'+l+'</div><div class="vstat-bc"><div class="vstat-top"><span>'+val+'</span></div><div class="vstat-bar"><div class="vstat-fill" style="width:'+p+'%;background:'+c+'"></div></div></div></div>').join('')+'</div>'
      :'<div style="text-align:center;padding:1rem;color:var(--g400);font-size:.81rem">No vitals recorded yet.'+(canEdit?' Click Edit Vitals to add.':'')+'</div>'
    )
    +'</div></div>';
}

function rxNextStep(id){
  const rx=PRESCRIPTIONS.find(p=>p.id===id);
  if(!rx)return;
  const steps=['pending','preparing','ready','collected'];
  const idx=steps.indexOf(rx.status);
  if(idx<0||idx>=steps.length-1){toast('Already at final step','w');return;}
  const next=steps[idx+1];
  rx.status=next;
  if(next==='ready'){
    rx.counter='Counter 1';
    auditLog('RX_READY','Prescription',rx.rx,'Ready at Counter 1');
    addNotif('pharma','g','Medication Ready','Your prescription '+rx.rx+' is ready for collection at Counter 1. Please proceed to the pharmacy counter.');
    toast('Prescription ready — patient notified','s');
  } else if(next==='preparing'){
    auditLog('RX_PREPARING','Prescription',rx.rx,'Now preparing');
    toast('Prescription marked as Preparing','s');
  } else if(next==='collected'){
    auditLog('RX_COLLECTED','Prescription',rx.rx,'Collected by '+rx.patient);
    addNotif('pharma','g','Medicine Collected','Prescription '+rx.rx+' has been collected. Your visit is complete.');
    // Update visit status
    if(rx.visitId){const visit=PATIENT_VISITS.find(v=>v.visitId===rx.visitId);if(visit&&visit.visitStatus==='pharmacy')visit.visitStatus='billing';}
    toast('Medicine collected — visit updated','s');
  }
  buildNav();nav('pharma-mgmt');
}
function rxStepBtn(rx){
  var steps = ['pending','preparing','ready','collected'];
  var labels = {pending:'Processing',preparing:'Mark Ready',ready:'Mark Collected',collected:'Done'};
  var clss = {pending:'btn-primary',preparing:'btn-success',ready:'btn-outline',collected:'btn-ghost'};
  var idx = steps.indexOf(rx.status);
  if(idx < 0) return '';
  if(idx === steps.length - 1) return '<span class="badge bn">Collected</span>';
  var btn = '<button class="btn ' + clss[rx.status] + ' btn-sm" onclick="rxNextStep(' + "'" + rx.id + "'" + ')">' + labels[rx.status] + '</button>';
  return btn;
}

function openRxUpdate(id){
  // Legacy redirect to step function
  rxNextStep(id);
}
function doRxUpdate(id){rxNextStep(id);}

// ===== KEYBOARD ENTER SUPPORT =====
document.getElementById('lId').addEventListener('keydown',e=>{if(e.key==='Enter')doLogin();});
document.getElementById('lPw').addEventListener('keydown',e=>{if(e.key==='Enter')doLogin();});
document.getElementById('rPw2').addEventListener('keydown',e=>{if(e.key==='Enter')doRegister();});
document.getElementById('fpCf') && document.getElementById('fpCf').addEventListener('keydown',e=>{if(e.key==='Enter')fpReset();});
