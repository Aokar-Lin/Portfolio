/* ---------- navbar menu bar ---------- */
const menuicon = document.getElementById('menuicon');
const navlinks = document.getElementById('navlinks');
menuicon.addEventListener('click', () => navlinks.classList.toggle('open'));
navlinks.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => navlinks.classList.remove('open')));

/* ---------- nav scroll ---------- */
const sections = [...document.querySelectorAll('section[id]')];
const linkMap = new Map([...document.querySelectorAll('.nav-links a')]
  .map(a => [a.getAttribute('href').slice(1), a]));

window.addEventListener('scroll', () => {
  const y = scrollY + 90;
  let cur = '';
  sections.forEach(s => { if(s.offsetTop <= y) cur = s.id; });
  linkMap.forEach((a, id) => a.classList.toggle('active', id === cur));
  document.getElementById('toTop').classList.toggle('show', scrollY > 500);
}, { passive: true });

/* ---------- typewriter ---------- */

const words = ['Javascript', 'React', 'MongoDB', 'Python'];
const typedEl = document.getElementById('typed');
let wi = 0, ci = 0, deleting = false;
(function type(){
  const w = words[wi];
  typedEl.textContent = w.slice(0, ci);
  if(!deleting && ci < w.length){ ci++; setTimeout(type, 70); }
  else if(!deleting){ deleting = true; setTimeout(type, 1500); }
  else if(ci > 0){ ci--; setTimeout(type, 38); }
  else { deleting = false; wi = (wi + 1) % words.length; setTimeout(type, 350); }
})();

/* ---------- back to top ---------- */
document.getElementById('toTop').addEventListener('click', () =>
  scrollTo({ top: 0, behavior: 'smooth' }));


/* ---------- scroll reveal ---------- */
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if(!e.isIntersecting) return;
    e.target.classList.add('visible');
    /* animate skill/goal bars inside */
    e.target.querySelectorAll('.bar-fill').forEach((b, i) =>
      setTimeout(() => { b.style.width = (b.dataset.lvl || 0) + '%'; }, i * 120));
    /* animate counters */
    e.target.querySelectorAll('.count').forEach(c => {
      const target = +c.dataset.target, dur = 1400, t0 = performance.now();
      (function tick(t){
        const p = Math.min((t - t0) / dur, 1);
        c.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))).toLocaleString();
        if(p < 1) requestAnimationFrame(tick);
      })(t0);
    });
    io.unobserve(e.target);
  });
}, { threshold: .18 });
document.querySelectorAll('.reveal, .stat').forEach(el => io.observe(el));

/* ---------- project filter ---------- */
document.querySelectorAll('.filter').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter').forEach(b => b.classList.remove('on'));
    btn.classList.add('on');
    const f = btn.dataset.f;
    document.querySelectorAll('.project').forEach(p => {
      const show = f === 'all' || p.dataset.cat === f;
      p.style.display = show ? '' : 'none';
      if(show){ p.classList.remove('visible'); requestAnimationFrame(() => p.classList.add('visible')); }
    });
    layoutSlots();
  });
});

/* ---------- project image side decider ---------- */
function layoutSlots(){
  let i = 0;
  document.querySelectorAll('.project').forEach(p => {
    if(p.offsetParent === null) return;   // hidden by the filter
    p.classList.toggle('slot-r', i % 2 === 1);
    i++;
  });
}
layoutSlots();

/* ---------- footer year ---------- */
document.getElementById('year').textContent = new Date().getFullYear();
