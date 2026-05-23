/* =============================================== SKILLS =============================================== */

async function loadSkills() {
    try {
        const res = await fetch('/assets/about.json');
        if (!res.ok) throw new Error('Could not load skills data');
        const data = await res.json();

        const frontendList = document.getElementById('frontend-skills');
        const backendList = document.getElementById('backend-skills');

        data.frontend.skills.forEach(skill => {
            const li = document.createElement('li');
            li.className = 'skill-tag';
            li.textContent = skill;
            frontendList.appendChild(li);
        });

        data.backend.skills.forEach(skill => {
            const li = document.createElement('li');
            li.className = 'skill-tag';
            if (typeof skill === 'object') {
                const key = Object.keys(skill)[0];
                li.textContent = key + ': ' + skill[key].join(', ');
            } else {
                li.textContent = skill;
            }
            backendList.appendChild(li);
        });
    } catch (error) {
        console.error('Skills load error:', error);
    }
}

loadSkills();

/* =============================================== PROJECTS =============================================== */

const images = document.querySelectorAll('.project-img');
const title = document.getElementById('project-title');
const description = document.getElementById('project-description');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const projects = [
    {
        title: 'Chat Web App',
        description: 'A real-time chat application built with React and Firebase, featuring user authentication and live messaging.'
    },
    {
        title: 'Travel Agency App',
        description: 'A travel agency landing page with destination browsing, booking UI, and a responsive multi-section layout.'
    },
    {
        title: 'Travel Agency App — Detail View',
        description: 'A deeper look at the travel app\'s destination detail pages, including image galleries and trip info cards.'
    },
];

let current = 0;

function slide(index) {
    images.forEach((img, i) => {
        img.classList.remove('active', 'previous', 'next');
        if (i === index) {
            img.classList.add('active');
        } else if (i === (index + 1) % images.length) {
            img.classList.add('next');
        } else if (i === (index - 1 + images.length) % images.length) {
            img.classList.add('previous');
        }
    });

    title.textContent = projects[index].title;
    description.textContent = projects[index].description;
}

prevBtn.addEventListener('click', () => {
    current = (current - 1 + images.length) % images.length;
    slide(current);
});

nextBtn.addEventListener('click', () => {
    current = (current + 1) % images.length;
    slide(current);
});

slide(current);
