/* =============================================== PAGE ENTRANCE =============================================== */

const loader = document.getElementById('page-loader');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
window.addEventListener('load', () => {
    setTimeout(() => {
        loader.classList.add('loaded');
        loader.addEventListener('transitionend', () => loader.remove(), { once: true });
    }, 120);
});

/* =============================================== DARK MODE =============================================== */

const darkToggle = document.getElementById('dark-toggle');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const storedTheme = localStorage.getItem('theme');
const initialDarkMode = storedTheme === 'dark' || (!storedTheme && prefersDark);

if (initialDarkMode) {
    document.body.classList.add('dark');
}

function updateThemeControl(isDark) {
    darkToggle.setAttribute('aria-pressed', String(isDark));
    darkToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    darkToggle.style.color = isDark ? 'white' : 'black';
}

updateThemeControl(initialDarkMode);

darkToggle.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark');
    updateThemeControl(isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});
/* =============================================== CUSTOM CURSOR =============================================== */

const cursorDot = document.getElementById('cursor-dot');
const cursorRing = document.getElementById('cursor-ring');
let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';
});

document.addEventListener('mouseleave', () => {
    cursorDot.style.opacity = '0';
    cursorRing.style.opacity = '0';
});

document.addEventListener('mouseenter', () => {
    cursorDot.style.opacity = '1';
    cursorRing.style.opacity = '1';
});

(function animateCursor() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top = ringY + 'px';
    requestAnimationFrame(animateCursor);
})();

document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => cursorRing.classList.add('expanded'));
    el.addEventListener('mouseleave', () => cursorRing.classList.remove('expanded'));
});

/* =============================================== TYPEWRITER =============================================== */

const typewriterEl = document.getElementById('typewriter');
const typewriterText = 'Software Engineer · Frontend';
typewriterEl.textContent = typewriterText;

/* =============================================== SCROLL REVEAL =============================================== */

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => {
    if (reduceMotion) {
        el.classList.add('visible');
    } else {
        revealObserver.observe(el);
    }
});

/* =============================================== ACTIVE NAV =============================================== */

const navLinks = document.querySelectorAll('.nav-list a');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => {
                link.classList.toggle(
                    'nav-active',
                    link.getAttribute('href') === `#${entry.target.id}`
                );
            });
        }
    });
}, {
    rootMargin: '-35% 0px -55% 0px',
    threshold: 0
});

document.querySelectorAll('section[id], footer[id]').forEach(el => sectionObserver.observe(el));

/* =============================================== SCROLL HINT =============================================== */

const scrollHint = document.querySelector('.scroll-hint');
if (scrollHint) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            scrollHint.classList.add('hidden');
        } else {
            scrollHint.classList.remove('hidden');
        }
    }, { passive: true });
}

/* =============================================== SKILLS =============================================== */

function buildSkillRow(skill, index) {
    const li = document.createElement('li');
    li.className = 'skill-row reveal';
    li.style.setProperty('--i', index);
    const levelFraction = (skill.level || 80) / 100;
    li.innerHTML = `
        <span class="skill-name">${skill.name}</span>
        <div class="skill-bar-track">
            <div class="skill-bar-fill" style="width:${skill.level || 80}%"></div>
        </div>`;
    return li;
}

async function loadSkills() {
    try {
        const res = await fetch('/assets/about.json?v=4');
        if (!res.ok) throw new Error('Could not load skills data');
        const data = await res.json();

        const frontendList = document.getElementById('frontend-skills');
        const backendList = document.getElementById('backend-skills');

        data.frontend.skills.forEach((skill, i) => {
            const li = buildSkillRow(skill, i);
            frontendList.appendChild(li);
            if (reduceMotion) li.classList.add('visible');
            else revealObserver.observe(li);
        });

        data.backend.skills.forEach((skill, i) => {
            const li = buildSkillRow(skill, i);
            backendList.appendChild(li);
            if (reduceMotion) li.classList.add('visible');
            else revealObserver.observe(li);
        });
    } catch (error) {
        console.error('Skills load error:', error);
    }
}

loadSkills();

/* =============================================== SCROLL PROGRESS BAR =============================================== */

const scrollProgressBar = document.getElementById('scroll-progress');

window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (maxScroll > 0) {
        scrollProgressBar.style.width = `${(scrolled / maxScroll) * 100}%`;
    }
}, { passive: true });
window.dispatchEvent(new Event('scroll'));

/* =============================================== EXPERIENCE TIMELINE DOT =============================================== */

const timelineDot = document.getElementById('timeline-dot');
const expSection = document.getElementById('exp');
const scrollLineEl = document.querySelector('.scroll-line');

if (timelineDot && expSection && scrollLineEl) {
    window.addEventListener('scroll', () => {
        const expRect = expSection.getBoundingClientRect();
        const lineHeight = scrollLineEl.offsetHeight;
        const totalTravel = expSection.offsetHeight + window.innerHeight;
        const traveled = window.innerHeight - expRect.top;
        const progress = Math.max(0, Math.min(1, traveled / totalTravel));
        timelineDot.style.top = `${progress * lineHeight}px`;
    }, { passive: true });
}

/* =============================================== CANVAS SCROLL BLUR =============================================== */

const bgCanvas = document.getElementById('canva');
if (bgCanvas) {
    window.addEventListener('scroll', () => {
        if (reduceMotion) return;
        const blurProgress = Math.min(window.scrollY / 700, 1);
        bgCanvas.style.filter = `blur(${(blurProgress * 2).toFixed(2)}px)`;
    }, { passive: true });
}

/* =============================================== PARALLAX HEADINGS =============================================== */

const parallaxHeadings = document.querySelectorAll('#exp > h2, #projects > h2, #skills > h2, #contacts > h2');

function tickParallax() {
    if (reduceMotion) return;
    const scrollY = window.scrollY;
    parallaxHeadings.forEach(heading => {
        const section = heading.closest('section') || heading.parentElement;
        const offset = (scrollY - section.offsetTop) * 0.018;
        heading.style.transform = `translateY(${offset}px)`;
    });
    requestAnimationFrame(tickParallax);
}

if (!reduceMotion) tickParallax();

const currentYear = document.getElementById('current-year');
if (currentYear) currentYear.textContent = new Date().getFullYear();
