const canvas = document.getElementById('canva');
const ctx = canvas.getContext('2d');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
let mouse = {
    x: null,
    y: null,
    radius: 0
};

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = document.body.scrollHeight;
    mouse.radius = (canvas.width / 80) * (canvas.height / 80);
}

resizeCanvas();

let particlesArr;
let burstArr = [];
let animationId = null;
let animationRunning = false;
let canvasVisible = true;

window.addEventListener('mousemove', function (event) {
    mouse.x = event.x;
    mouse.y = event.y + window.scrollY;
});

class Particle {
    constructor(x, y, directionX, directionY, radius) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.radius = radius;
    }

    draw() {
        const isDark = document.body.classList.contains('dark');
        ctx.beginPath();
        ctx.fillStyle = isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.75)';
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }

    update() {
        if (this.x > canvas.width - 2 || this.x < 1) {
            this.directionX = -this.directionX;
        }
        if (this.y > canvas.height - 2 || this.y < 1) {
            this.directionY = -this.directionY;
        }
        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
    }
}

class BurstParticle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 5 + 1.5;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.radius = Math.random() * 2.5 + 0.8;
        this.life = 1;
        this.decay = 0.018 + Math.random() * 0.025;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vx *= 0.93;
        this.vy *= 0.93;
        this.life -= this.decay;
    }

    draw() {
        const isDark = document.body.classList.contains('dark');
        ctx.beginPath();
        ctx.fillStyle = isDark
            ? `rgba(255,255,255,${(this.life * 0.9).toFixed(2)})`
            : `rgba(0,0,0,${(this.life * 0.9).toFixed(2)})`;
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }
}

window.addEventListener('click', (e) => {
    if (prefersReducedMotion || !hasFinePointer || !particlesArr) return;

    const clickX = e.clientX;
    const clickY = e.clientY + window.scrollY;

    for (let i = 0; i < 14; i++) {
        burstArr.push(new BurstParticle(clickX, clickY));
    }

    particlesArr.forEach(p => {
        const dx = p.x - clickX;
        const dy = p.y - clickY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 130 && dist > 0) {
            const force = ((130 - dist) / 130) * 3.5;
            p.directionX = Math.max(-2.5, Math.min(2.5, p.directionX + (dx / dist) * force));
            p.directionY = Math.max(-2.5, Math.min(2.5, p.directionY + (dy / dist) * force));
        }
    });
});

function init() {
    particlesArr = [];
    const densityBasedCount = Math.floor((canvas.width * canvas.height) / 8000);
    const maxParticles = canvas.width < 768 ? 80 : 240;
    const numberOfParticles = Math.min(densityBasedCount, maxParticles);
    for (let i = 0; i < numberOfParticles; i++) {
        let radius = (Math.random() * 2) + 1;
        let x = Math.random() * (canvas.width - radius * 2);
        let y = Math.random() * (canvas.height - radius * 2);
        let directionX = (Math.random() * 1.1) - 0.9;
        let directionY = (Math.random() * 1.1) - 0.9;
        particlesArr.push(new Particle(x, y, directionX, directionY, radius));
    }
}

function animate() {
    if (!animationRunning) {
        animationId = null;
        return;
    }

    animationId = requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particlesArr.length; i++) {
        particlesArr[i].update();
    }

    for (let i = burstArr.length - 1; i >= 0; i--) {
        burstArr[i].update();
        burstArr[i].draw();
        if (burstArr[i].life <= 0) {
            burstArr.splice(i, 1);
        }
    }
}

function startAnimation() {
    if (prefersReducedMotion || animationRunning || !canvasVisible || document.hidden) return;
    animationRunning = true;
    animate();
}

function stopAnimation() {
    animationRunning = false;
    if (animationId !== null) {
        cancelAnimationFrame(animationId);
        animationId = null;
    }
}

init();

if (prefersReducedMotion) {
    canvas.style.display = 'none';
} else {
    const canvasObserver = new IntersectionObserver(([entry]) => {
        canvasVisible = entry.isIntersecting;
        if (canvasVisible) startAnimation();
        else stopAnimation();
    }, { threshold: 0 });

    canvasObserver.observe(canvas);
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) stopAnimation();
        else startAnimation();
    });

    window.addEventListener('resize', () => {
        resizeCanvas();
        init();
    }, { passive: true });

    startAnimation();
}
