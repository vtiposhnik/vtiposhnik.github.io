const canvas = document.getElementById('canva');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = document.body.scrollHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

let particlesArr;

let mouse = {
    x: null,
    y: null,
    radius: (canvas.width / 80) * (canvas.height / 80)
};

window.addEventListener('mousemove', function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
})

class Particle {
    constructor(x, y, directionX, directionY, color, radius) {
        this.x = x,
            this.y = y,
            this.directionX = directionX,
            this.directionY = directionY,
            this.color = color,
            this.radius = radius
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = 'black';
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }

    update() {
        // edge collision detection
        if (this.x > canvas.width - 2 || this.x < 1) {
            this.directionX = -this.directionX;
        }
        if (this.y > canvas.height - 2 || this.y < 1) {
            this.directionY = -this.directionY;
        }

        // let dx = mouse.x - this.x;
        // let dy = mouse.y - this.y;
        // let distance = Math.sqrt(dx * dx + dy * dy);
        // // mouse collision detection
        // if (distance < mouse.radius) {
        //     if (mouse.y < this.y && this.y < 40) {
        //         this.y -= 10;
        //     }
        //     if (mouse.x < this.x && this.x < canvas.width - 40) {
        //         this.x += 10;
        //     }
        //     if (mouse.y < this.y && this.y < canvas.height - 40) {
        //         this.y += 10;
        //     }
        //     if (mouse.x > this.x && this.x < 40) {
        //         this.x -= 10;
        //     }
        // }
        this.x += this.directionX;
        this.y += this.directionY;

        // draw the particle
        this.draw()
    }

}

// initialize particles
function init() {
    particlesArr = [];
    let numberOfParticles = Math.floor((canvas.width * canvas.height) / 8000);
    for (let i = 0; i < numberOfParticles; i++) {
        let radius = (Math.random() * 2) + 1;
        let x = Math.random() * (canvas.width - radius * 2);
        let y = Math.random() * (canvas.height - radius * 2);
        
        let directionX = (Math.random() * 1.1) - 0.9;
        let directionY = (Math.random() * 1.1) - 0.9;
        let color = '#000'

        particlesArr.push(new Particle(x, y, directionX, directionY, color, radius));
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    for (let i = 0; i < particlesArr.length; i++) {
        particlesArr[i].update();
    }
}

// initialize and run
init();
animate();