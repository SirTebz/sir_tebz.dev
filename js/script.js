const $ = s => document.querySelector(s), rm = matchMedia('(prefers-reduced-motion:reduce)').matches;
$('#yr').textContent = new Date().getFullYear();
/* theme */
$('#theme').onclick = () => { const r = document.documentElement, d = getComputedStyle(r).getPropertyValue('--bg').trim() === '#0e1330'; r.dataset.theme = d ? 'light' : 'dark'; try { localStorage.setItem('t', r.dataset.theme) } catch (e) { } resize() };
try { const t = localStorage.getItem('t'); if (t) document.documentElement.dataset.theme = t } catch (e) { }
/* name letters drop in (single hero moment) */
const nm = $('#name'), txt = nm.textContent; nm.textContent = '';
txt.split('').forEach((c, i) => {
    const s = document.createElement('span'); s.textContent = c === ' ' ? '\u00a0' : c; s.setAttribute('aria-hidden', 'true');
    if (!rm) { s.style.opacity = 0; s.style.transform = 'translateY(40px) rotate(6deg)'; s.style.transition = 'all .7s cubic-bezier(.2,.9,.3,1.3) ' + (i * 55) + 'ms'; requestAnimationFrame(() => requestAnimationFrame(() => { s.style.opacity = 1; s.style.transform = 'none' })) }
    nm.appendChild(s)
});
/* typed roles */
const roles = ['Software Engineer', 'Full-Stack Developer', 'Tech Enthusiast', 'Problem solver']; let ri = 0, ci = 0, del = false;
function type() {
    const w = roles[ri]; if (rm) { $('#typed').textContent = w; return }
    $('#typed').textContent = w.slice(0, ci);
    if (!del && ci++ === w.length) { del = true; return setTimeout(type, 1500) }
    if (del && --ci === 0) { del = false; ri = (ri + 1) % roles.length }
    setTimeout(type, del ? 35 : 75)
} type();
/* network canvas */
const nets = [];
function resize() { nets.forEach(n => n.size()) }
addEventListener('resize', resize);
function network(host, cv, k) {
    const cx = cv.getContext('2d'); let W, H, pts = [], m = { x: -999, y: -999 }, id = 0;
    function size() {
        const r = host.getBoundingClientRect(); W = cv.width = r.width; H = cv.height = r.height;
        pts = Array.from({ length: Math.min(90, Math.floor(W * H / k)) }, () => ({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .4, vy: (Math.random() - .5) * .4 })); if (rm) draw()
    }
    host.addEventListener('pointermove', e => { const r = cv.getBoundingClientRect(); m.x = e.clientX - r.left; m.y = e.clientY - r.top });
    host.addEventListener('pointerleave', () => { m.x = m.y = -999 });
    function draw() {
        const cs = getComputedStyle(document.documentElement), a = cs.getPropertyValue('--acc').trim(), h = cs.getPropertyValue('--hot').trim();
        cx.clearRect(0, 0, W, H);
        for (const p of pts) { if (!rm) { p.x += p.vx; p.y += p.vy; if (p.x < 0 || p.x > W) p.vx *= -1; if (p.y < 0 || p.y > H) p.vy *= -1 } }
        for (let i = 0; i < pts.length; i++) {
            const p = pts[i];
            for (let j = i + 1; j < pts.length; j++) {
                const q = pts[j], d = Math.hypot(p.x - q.x, p.y - q.y);
                if (d < 130) { cx.globalAlpha = (1 - d / 130) * .35; cx.strokeStyle = a; cx.beginPath(); cx.moveTo(p.x, p.y); cx.lineTo(q.x, q.y); cx.stroke() }
            }
            const dm = Math.hypot(p.x - m.x, p.y - m.y);
            if (dm < 170) { cx.globalAlpha = 1 - dm / 170; cx.strokeStyle = h; cx.beginPath(); cx.moveTo(p.x, p.y); cx.lineTo(m.x, m.y); cx.stroke() }
            cx.globalAlpha = dm < 170 ? 1 : .7; cx.fillStyle = dm < 170 ? h : a; cx.beginPath(); cx.arc(p.x, p.y, dm < 170 ? 3.2 : 2, 0, 7); cx.fill()
        }
        cx.globalAlpha = 1; if (!rm) id = requestAnimationFrame(draw)
    }
    new IntersectionObserver(es => { if (es[0].isIntersecting) { if (!rm && !id) draw() } else { cancelAnimationFrame(id); id = 0 } }).observe(host);
    nets.push({ size }); size()
}
network($('#hero'), $('#net'), 14000);
['skills', 'projects', 'contact'].forEach(s => { const sec = document.getElementById(s), c = document.createElement('canvas'); c.setAttribute('aria-hidden', 'true'); sec.classList.add('netsec'); sec.prepend(c); network(sec, c, 16000) });
/* skills tabs */
const skills = {
    'Languages & frameworks': ['C#', 'ASP.NET Core MVC', 'ASP.NET Core Web API', 'Blazor', 'JavaScript', 'React', 'HTML', 'CSS', 'Bootstrap', 'jQuery', 'Java'],
    'Data': ['SQL Server', 'MySQL', 'PostgreSQL', 'Entity Framework Core', 'LINQ', 'T-SQL', 'Database design', 'CRUD'],
    'Engineering': ['SDLC', 'Requirements analysis', 'System design', 'OOP', 'MVC', 'RESTful APIs', 'Debugging', 'Root-cause analysis', 'Testing'],
    'Tools & cloud': ['Visual Studio', 'VS Code', 'Git', 'GitHub', 'GitHub Actions', 'Docker', 'Azure Fundamentals', 'Microsoft 365', 'SharePoint', 'Power Automate', 'Power Apps'],
    'Hardware & networks': ['IP addressing', 'CCTV (Avigilon)', 'Access control (Impro)', 'Active Directory', 'Fault-finding', 'Preventative maintenance'],
    'Ways of working': ['Agile', 'Clean code', 'Version control', 'Documentation', 'Collaboration', 'Communication', 'Ownership', 'Continuous learning']
};
const tabs = $('.tabs'), chips = $('#chips');
function show(k) {
    [...tabs.children].forEach(t => t.setAttribute('aria-selected', t.textContent === k)); chips.innerHTML = '';
    skills[k].forEach((s, i) => { const c = document.createElement('span'); c.className = 'chip'; c.textContent = s; c.style.animationDelay = i * 40 + 'ms'; chips.appendChild(c) })
}
Object.keys(skills).forEach(k => { const b = document.createElement('button'); b.className = 'tab'; b.role = 'tab'; b.textContent = k; b.onclick = () => show(k); tabs.appendChild(b) });
show(Object.keys(skills)[0]);
/* reveal + counters */
const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return; e.target.classList.add('in'); io.unobserve(e.target);
    e.target.querySelectorAll('[data-n]').forEach(el => {
        const n = +el.dataset.n, s = el.dataset.s || ''; if (rm) { el.textContent = n + s; return }
        let t0; const f = t => { t0 = t0 || t; const p = Math.min((t - t0) / 1200, 1); el.textContent = Math.round(n * (1 - Math.pow(1 - p, 3))) + (p === 1 ? s : ''); if (p < 1) requestAnimationFrame(f) }; requestAnimationFrame(f)
    })
}), { threshold: .15 });
document.querySelectorAll('.rv').forEach(e => io.observe(e));
/* project cards: tilt + expand */
document.querySelectorAll('.proj').forEach(c => {
    c.addEventListener('pointermove', e => { if (rm || e.pointerType === 'touch') return; const r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5; c.style.transform = `perspective(700px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg)` });
    c.addEventListener('pointerleave', () => c.style.transform = '');
    const b = c.querySelector('button'); b.onclick = () => { const o = c.classList.toggle('open'); b.textContent = o ? 'Hide details' : 'Show details'; b.setAttribute('aria-expanded', o) }
});
/* links: paste your URLs between the quotes */
const LINKS = { work: 'https://sir-tebz-tech.vercel.app/', cv: 'https://sirtebz.github.io/Cv-TM_Dev/', facebook: 'https://www.facebook.com/sir.tebz', instagram: 'https://www.instagram.com/sir_tebz', x: 'https://x.com/sir_tebz', linkedin: 'https://www.linkedin.com/in/teboho-mokgosi/', github: 'https://github.com/SirTebz', paypal: 'https://paypal.me/Tebz9808' };
const NAMES = { facebook: 'Facebook', instagram: 'Instagram', x: 'X', linkedin: 'LinkedIn', github: 'GitHub', paypal: 'PayPal' };
const sv = p => '<svg viewBox="0 0 24 24" aria-hidden="true">' + p + '</svg>';
const ICONS = {
    facebook: sv('<path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z"/>'),
    instagram: sv('<rect x="3" y="3" width="18" height="18" rx="5.2" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="17.4" cy="6.6" r="1.3"/>'),
    x: sv('<path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>'),
    linkedin: sv('<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>'),
    github: sv('<path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>'),
    paypal: sv('<path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.93 4.778-4.005 7.201-9.138 7.201h-2.19a.563.563 0 0 0-.556.479l-1.187 7.527h-.506l-.24 1.516a.56.56 0 0 0 .554.647h3.882c.46 0 .85-.334.922-.788.06-.26.76-4.852.816-5.09a.932.932 0 0 1 .923-.788h.58c3.76 0 6.705-1.528 7.565-5.946.36-1.847.174-3.388-.777-4.471z"/>')
};
function note(t) { const n = $('#toast'); n.textContent = t; n.classList.add('show'); clearTimeout(note.t); note.t = setTimeout(() => n.classList.remove('show'), 2400) }
function cvUrl() { return LINKS.cv }
document.querySelectorAll('[data-cv]').forEach(a => { const u = cvUrl(a.dataset.cv); if (u) { a.href = u; a.target = '_blank'; a.rel = 'noopener' } else a.addEventListener('click', e => { e.preventDefault(); note('CV link coming soon') }) });
Object.keys(NAMES).forEach(k => {
    const a = document.createElement('a'); a.className = 'soc'; a.innerHTML = ICONS[k]; a.setAttribute('aria-label', NAMES[k]); a.title = NAMES[k]; a.href = '#';
    if (LINKS[k]) { a.href = LINKS[k]; a.target = '_blank'; a.rel = 'noopener noreferrer' } else a.onclick = e => { e.preventDefault(); note(NAMES[k] + ' link coming soon') }; $('#social').appendChild(a)
});
const mb = $('#menu'), ln = $('#links');
function menu(o) { ln.classList.toggle('open', o); mb.setAttribute('aria-expanded', o); mb.setAttribute('aria-label', o ? 'Close menu' : 'Open menu') }
mb.onclick = () => menu(mb.getAttribute('aria-expanded') !== 'true');
ln.addEventListener('click', e => { if (e.target.closest('a')) menu(false) });
addEventListener('keydown', e => { if (e.key === 'Escape') menu(false) });
addEventListener('resize', () => { if (innerWidth > 760) menu(false) });
document.addEventListener('click', e => { if (!e.target.closest('nav')) menu(false) });
const mw = $('#morework'); if (LINKS.work) { mw.href = LINKS.work; mw.target = '_blank'; mw.rel = 'noopener' } else mw.onclick = e => { e.preventDefault(); note('Link coming soon') };
/* copy email */
$('#copy').onclick = async e => { try { await navigator.clipboard.writeText('mokgositeboho77@gmail.com'); e.target.textContent = 'Copied' } catch (x) { e.target.textContent = 'mokgositeboho77@gmail.com' } setTimeout(() => e.target.textContent = 'Copy email', 2200) };
