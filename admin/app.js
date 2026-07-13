
function toggleTheme(){
 const html=document.documentElement;
 const next=html.dataset.theme==='dark'?'light':'dark';
 html.dataset.theme=next; localStorage.setItem('hrm-theme',next);
}
function toggleMenu(){document.getElementById('sidebar')?.classList.toggle('open')}
function switchRole(role){
 localStorage.setItem('hrm-role',role);
 toast('已切換為「'+role+'」檢視模式');
}
function toast(msg){
 let el=document.createElement('div'); el.textContent=msg;
 Object.assign(el.style,{position:'fixed',right:'24px',bottom:'24px',background:'#142d50',color:'#fff',padding:'12px 16px',borderRadius:'10px',zIndex:9999,boxShadow:'0 8px 24px rgba(0,0,0,.2)'});
 document.body.appendChild(el); setTimeout(()=>el.remove(),1800);
}
(function(){
 const theme=localStorage.getItem('hrm-theme'); if(theme) document.documentElement.dataset.theme=theme;
 const role=localStorage.getItem('hrm-role'); const sel=document.getElementById('roleSelect'); if(sel&&role) sel.value=role;
 document.addEventListener('click',e=>{if(window.innerWidth<760 && !e.target.closest('.sidebar') && !e.target.closest('.mobile-menu')) document.getElementById('sidebar')?.classList.remove('open')})
})();
