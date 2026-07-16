const body=document.body;
const navLinks=document.getElementById("navLinks");
const menuToggle=document.getElementById("menuToggle");
const themeToggle=document.getElementById("themeToggle");

menuToggle.addEventListener("click",()=>navLinks.classList.toggle("open"));
themeToggle.addEventListener("click",()=>{
  body.classList.toggle("light");
  localStorage.setItem("bombhr-site-theme",body.classList.contains("light")?"light":"dark");
});
if(localStorage.getItem("bombhr-site-theme")==="light")body.classList.add("light");

document.getElementById("year").textContent=new Date().getFullYear();

const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting)entry.target.classList.add("visible");
  });
},{threshold:.12});

document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

document.getElementById("demoForm").addEventListener("submit",event=>{
  event.preventDefault();
  const toast=document.getElementById("toast");
  toast.classList.add("show");
  setTimeout(()=>toast.classList.remove("show"),2600);
  event.target.reset();
});

document.querySelectorAll(".nav-links a").forEach(link=>{
  link.addEventListener("click",()=>navLinks.classList.remove("open"));
});
