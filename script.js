const links=[...document.querySelectorAll('.desktop-nav a,.mobile-nav a')];
const sections=[...document.querySelectorAll('main section[id]')];
const setActive=()=>{let current='home';const y=window.scrollY+180;sections.forEach(s=>{if(y>=s.offsetTop)current=s.id});links.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+current));};
window.addEventListener('scroll',setActive,{passive:true});setActive();
