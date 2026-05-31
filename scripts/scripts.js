/* =============================================== PAGE ENTRANCE =============================================== */

const loader = document.getElementById('page-loader');
window.addEventListener('load', () => {
    setTimeout(() => {
        loader.classList.add('loaded');
        loader.addEventListener('transitionend', () => loader.remove(), { once: true });
    }, 120);
});

/* =============================================== DARK MODE =============================================== */

const darkToggle = document.getElementById('dark-toggle');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme') && prefersDark)) {
    document.body.classList.add('dark');
    // darkToggle.textContent = '○';
}

darkToggle.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark');

    darkToggle.style.fill = isDark ? 'white' : 'black';

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
const typewriterText = 'Web Developer';
let twIndex = 0;

function typeNext() {
    if (twIndex <= typewriterText.length) {
        typewriterEl.textContent = typewriterText.slice(0, twIndex);
        twIndex++;
        setTimeout(typeNext, 85);
    }
}

setTimeout(() => {
    typewriterEl.textContent = '';
    typeNext();
}, 650);

/* =============================================== SCROLL REVEAL =============================================== */

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

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
        const res = await fetch('/assets/about.json?v=3');
        if (!res.ok) throw new Error('Could not load skills data');
        const data = await res.json();

        const frontendList = document.getElementById('frontend-skills');
        const backendList = document.getElementById('backend-skills');

        data.frontend.skills.forEach((skill, i) => {
            const li = buildSkillRow(skill, i);
            frontendList.appendChild(li);
            revealObserver.observe(li);
        });

        data.backend.skills.forEach((skill, i) => {
            const li = buildSkillRow(skill, i);
            backendList.appendChild(li);
            revealObserver.observe(li);
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

/* =============================================== PARALLAX HEADINGS =============================================== */

const parallaxHeadings = document.querySelectorAll('#exp > h1, #projects > h1, #skills > h1, #contacts > h1');

function tickParallax() {
    const scrollY = window.scrollY;
    parallaxHeadings.forEach(h1 => {
        const section = h1.closest('section') || h1.parentElement;
        const offset = (scrollY - section.offsetTop) * 0.018;
        h1.style.transform = `translateY(${offset}px)`;
    });
    requestAnimationFrame(tickParallax);
}

tickParallax();
