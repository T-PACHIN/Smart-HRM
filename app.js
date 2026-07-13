const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const toast=(m)=>{const t=$('#toast');t.textContent=m;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),1800)};
const showPage=(name)=>{$$('.page').forEach(p=>p.classList.remove('active'));const page=$('#page-'+name);if(page) page.classList.add('active');$$('.bottom-nav button').forEach(b=>b.classList.toggle('active',b.dataset.page===name));window.scrollTo({top:0,behavior:'smooth'});};
$('#loginBtn').addEventListener('click',()=>{$('#loginView').classList.add('hidden');$('#appView').classList.remove('hidden');localStorage.setItem('hrm_logged','1');});
$('#logoutBtn').addEventListener('click',()=>{localStorage.removeItem('hrm_logged');$('#appView').classList.add('hidden');$('#loginView').classList.remove('hidden');});
$$('[data-page]').forEach(el=>el.addEventListener('click',()=>showPage(el.dataset.page)));
$('#themeBtn').addEventListener('click',()=>{const html=document.documentElement;const dark=html.dataset.theme==='dark';html.dataset.theme=dark?'light':'dark';$('#themeBtn use').setAttribute('href',dark?'#i-moon':'#i-sun');localStorage.setItem('hrm_theme',html.dataset.theme);});
const savedTheme=localStorage.getItem('hrm_theme');if(savedTheme){document.documentElement.dataset.theme=savedTheme;$('#themeBtn use').setAttribute('href',savedTheme==='dark'?'#i-sun':'#i-moon');}
function updateClock(){const d=new Date(),pad=n=>String(n).padStart(2,'0');$('#liveTime').textContent=`${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;const wd=['日','一','二','三','四','五','六'][d.getDay()];$('#liveDate').textContent=`${d.getFullYear()}年${d.getMonth()+1}月${d.getDate()}日 星期${wd}`;const h=d.getHours();$('#greeting').textContent=`${h<12?'早安':h<18?'午安':'晚安'}，林小明`;}
updateClock();setInterval(updateClock,1000);
let inTime='08:55',outTime='';
$('#clockInBtn').addEventListener('click',()=>{const d=new Date(),t=d.toTimeString().slice(0,5);inTime=t;$('#homeClockIn').textContent=t;$('#timeline').innerHTML=`<div class="timeline-item"><span></span><div><strong>上班打卡成功</strong><small>${t} · GPS + Face ID</small></div><b>正常</b></div>`;toast('上班打卡成功');});
$('#clockOutBtn').addEventListener('click',()=>{const d=new Date(),t=d.toTimeString().slice(0,5);outTime=t;$('#homeClockOut').textContent=t;$('#timeline').insertAdjacentHTML('beforeend',`<div class="timeline-item"><span></span><div><strong>下班打卡成功</strong><small>${t} · GPS + Face ID</small></div><b>正常</b></div>`);toast('下班打卡成功');});
$$('.submit-request').forEach(b=>b.addEventListener('click',()=>{toast('申請已送出，等待主管審核');setTimeout(()=>showPage('applications'),700)}));
$$('.segmented button').forEach(b=>b.addEventListener('click',()=>{b.parentElement.querySelectorAll('button').forEach(x=>x.classList.remove('active'));b.classList.add('active')}));
if(localStorage.getItem('hrm_logged')==='1'){$('#loginView').classList.add('hidden');$('#appView').classList.remove('hidden');}
