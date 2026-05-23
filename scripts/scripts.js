/* =============================================== DARK MODE =============================================== */

const darkToggle = document.getElementById('dark-toggle');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme') && prefersDark)) {
    document.body.classList.add('dark');
    darkToggle.textContent = '○';
}

darkToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    darkToggle.textContent = isDark ? '○' : '●';
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
let twStarted = false;

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
}, 400);

/* =============================================== SCROLL REVEAL =============================================== */

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* =============================================== SKILLS =============================================== */

async function loadSkills() {
    try {
        const res = await fetch('/assets/about.json');
        if (!res.ok) throw new Error('Could not load skills data');
        const data = await res.json();

        const frontendList = document.getElementById('frontend-skills');
        const backendList = document.getElementById('backend-skills');

        data.frontend.skills.forEach((skill, i) => {
            const li = document.createElement('li');
            li.className = 'skill-tag reveal';
            li.style.transitionDelay = `${i * 80}ms`;
            li.textContent = skill;
            frontendList.appendChild(li);
            revealObserver.observe(li);
        });

        data.backend.skills.forEach((skill, i) => {
            const li = document.createElement('li');
            li.className = 'skill-tag reveal';
            li.style.transitionDelay = `${i * 80}ms`;
            if (typeof skill === 'object') {
                const key = Object.keys(skill)[0];
                li.textContent = key + ': ' + skill[key].join(', ');
            } else {
                li.textContent = skill;
            }
            backendList.appendChild(li);
            revealObserver.observe(li);
        });
    } catch (error) {
        console.error('Skills load error:', error);
    }
}

loadSkills();

