const links=[...document.querySelectorAll('.desktop-nav a,.mobile-nav a')];
const sections=[...document.querySelectorAll('main section[id]')];
const homeSection=document.querySelector('#home');

function setActive(){
  let current='home';
  const y=window.scrollY+window.innerHeight*0.28;
  sections.forEach(section=>{if(y>=section.offsetTop) current=section.id;});
  links.forEach(link=>link.classList.toggle('active',link.getAttribute('href')==='#'+current));
}

// Ensure the mobile Home button always returns to the actual hero section.
document.querySelectorAll('a[href="#home"]').forEach(link=>{
  link.addEventListener('click',event=>{
    event.preventDefault();
    if(homeSection) homeSection.scrollIntoView({behavior:'smooth',block:'start'});
    history.replaceState(null,'','#home');
  });
});

window.addEventListener('scroll',setActive,{passive:true});
window.addEventListener('resize',setActive);
setActive();

// Count-up stats when the trust widget enters the viewport.
const counters=document.querySelectorAll('[data-count]');
const counterObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(!entry.isIntersecting) return;
    const el=entry.target;
    const target=Number(el.dataset.count);
    const suffix=el.dataset.suffix||'';
    const duration=1200;
    const start=performance.now();
    function tick(now){
      const progress=Math.min((now-start)/duration,1);
      const eased=1-Math.pow(1-progress,3);
      el.textContent=Math.floor(target*eased).toLocaleString('en-IN')+suffix;
      if(progress<1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
    counterObserver.unobserve(el);
  });
},{threshold:.35});
counters.forEach(counter=>counterObserver.observe(counter));
