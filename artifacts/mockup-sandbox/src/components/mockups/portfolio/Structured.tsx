import React, { useEffect, useRef } from "react";

const ParticleCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 1.5;
        this.vy = (Math.random() - 0.5) * 1.5;
        this.size = Math.random() * 2 + 1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      const numParticles = Math.floor((canvas.width * canvas.height) / 15000);
      for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle());
      }
    };

    initParticles();

    const drawLines = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 0, 0, ${0.15 - distance / 800})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });
      
      drawLines();
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[-1]"
    />
  );
};

export function Structured() {
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const sectionClass = "w-[80vw] mx-auto py-24";
  const headerClass = "text-5xl md:text-7xl mb-12 uppercase";
  const bodyFont = { fontFamily: "'Space Grotesk', sans-serif" };
  const displayFont = { fontFamily: "'One Piece', serif" };

  return (
    <div className="min-h-screen bg-[#fafafa] text-slate-900 overflow-x-hidden selection:bg-slate-900 selection:text-white" style={bodyFont}>
      <ParticleCanvas />

      {/* Floating Nav */}
      <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
        <nav className="flex items-center gap-1 md:gap-4 px-6 py-3 bg-white/70 backdrop-blur-md rounded-full border border-slate-200/50 shadow-sm text-sm font-medium tracking-wide">
          <a href="#about" className="hover:opacity-60 transition-opacity px-2">About</a>
          <a href="#experience" className="hover:opacity-60 transition-opacity px-2">Experience</a>
          <a href="#projects" className="hover:opacity-60 transition-opacity px-2">Projects</a>
          <a href="#skills" className="hover:opacity-60 transition-opacity px-2">Skills</a>
          <a href="#contact" className="hover:opacity-60 transition-opacity px-2">Contact</a>
        </nav>
      </header>

      {/* Hero */}
      <section id="about" className="h-screen w-[80vw] mx-auto flex flex-col justify-center">
        <div className="max-w-4xl">
          <h1 className="text-6xl sm:text-8xl md:text-[140px] leading-[0.9] tracking-tighter uppercase mb-6" style={displayFont}>
            Akzhol Kasymov
          </h1>
          <h2 className="text-2xl md:text-4xl font-semibold opacity-80 mb-8">
            Frontend Developer / Web Developer
          </h2>
          <p className="text-lg md:text-xl opacity-60 leading-relaxed max-w-2xl font-light">
            Genius(no), Billionaire(sure), Playboy(ask my homies?), Philanthropist(what is that?)
          </p>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className={sectionClass}>
        <h2 className={headerClass} style={displayFont}>Experience</h2>
        <div className="border-l-2 border-slate-200 pl-8 md:pl-12 flex flex-col gap-16">
          <div className="relative group">
            <div className="absolute -left-[34px] md:-left-[50px] top-1.5 w-4 h-4 rounded-full bg-slate-900 ring-4 ring-[#fafafa] group-hover:scale-125 transition-transform" />
            <h3 className="text-2xl font-bold mb-1">Solva Technology</h3>
            <div className="text-slate-500 font-medium mb-4">Frontend Developer <span className="mx-2">•</span> Jan 2025 – Present</div>
            <ul className="list-disc list-inside text-slate-700 space-y-2 opacity-80 leading-relaxed">
              <li>Built and maintained React-based features for an enterprise fintech platform</li>
              <li>Collaborated with design and backend teams using Agile methodology</li>
              <li>Wrote reusable UI components and improved codebase consistency</li>
            </ul>
          </div>
          
          <div className="relative group">
            <div className="absolute -left-[34px] md:-left-[50px] top-1.5 w-4 h-4 rounded-full bg-slate-400 ring-4 ring-[#fafafa] group-hover:scale-125 transition-transform" />
            <h3 className="text-2xl font-bold mb-1">ICEBERG-Service</h3>
            <div className="text-slate-500 font-medium mb-4">Frontend Developer <span className="mx-2">•</span> Sep 2024 – Dec 2024</div>
            <ul className="list-disc list-inside text-slate-700 space-y-2 opacity-80 leading-relaxed">
              <li>Developed responsive UI for a service-management web application</li>
              <li>Integrated REST APIs and handled async data fetching with React hooks</li>
              <li>Optimized performance by reducing unnecessary re-renders</li>
            </ul>
          </div>
          
          <div className="relative group">
            <div className="absolute -left-[34px] md:-left-[50px] top-1.5 w-4 h-4 rounded-full bg-slate-300 ring-4 ring-[#fafafa] group-hover:scale-125 transition-transform" />
            <h3 className="text-2xl font-bold mb-1">AitecOne</h3>
            <div className="text-slate-500 font-medium mb-4">Frontend Developer <span className="mx-2">•</span> Jan 2023 – Mar 2024</div>
            <ul className="list-disc list-inside text-slate-700 space-y-2 opacity-80 leading-relaxed">
              <li>Assisted in building and styling multi-page websites from Figma designs</li>
              <li>Gained hands-on experience with version control (Git) and code review</li>
              <li>Learned fundamentals of component-based architecture with React</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className={sectionClass}>
        <h2 className={headerClass} style={displayFont}>Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 cursor-pointer">
            <img 
              src="/assets/imgs/projects/chat-app.png" 
              alt="Chat Web App" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/80 transition-colors duration-500 flex flex-col justify-end p-8 text-transparent group-hover:text-white">
              <h3 className="text-4xl uppercase mb-3 translate-y-4 group-hover:translate-y-0 transition-transform duration-500" style={displayFont}>Chat Web App</h3>
              <p className="opacity-0 group-hover:opacity-90 transition-opacity duration-500 delay-100 mb-6 max-w-md">
                A real-time chat application featuring user authentication and live messaging.
              </p>
              <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                <span className="px-4 py-1.5 rounded-full border border-white/30 text-sm">React</span>
                <span className="px-4 py-1.5 rounded-full border border-white/30 text-sm">Firebase</span>
                <span className="px-4 py-1.5 rounded-full border border-white/30 text-sm">CSS</span>
              </div>
            </div>
            <div className="absolute top-6 left-8 text-5xl opacity-40 mix-blend-difference text-white pointer-events-none group-hover:opacity-0 transition-opacity" style={displayFont}>01</div>
          </div>

          <div className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 cursor-pointer">
            <img 
              src="/assets/imgs/projects/travel-app.png" 
              alt="Travel Agency App" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/80 transition-colors duration-500 flex flex-col justify-end p-8 text-transparent group-hover:text-white">
              <h3 className="text-4xl uppercase mb-3 translate-y-4 group-hover:translate-y-0 transition-transform duration-500" style={displayFont}>Travel Agency App</h3>
              <p className="opacity-0 group-hover:opacity-90 transition-opacity duration-500 delay-100 mb-6 max-w-md">
                A travel agency landing page with destination browsing, booking UI, and a responsive multi-section layout.
              </p>
              <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                <span className="px-4 py-1.5 rounded-full border border-white/30 text-sm">HTML</span>
                <span className="px-4 py-1.5 rounded-full border border-white/30 text-sm">CSS</span>
                <span className="px-4 py-1.5 rounded-full border border-white/30 text-sm">JavaScript</span>
              </div>
            </div>
            <div className="absolute top-6 left-8 text-5xl opacity-40 mix-blend-difference text-white pointer-events-none group-hover:opacity-0 transition-opacity" style={displayFont}>02</div>
          </div>

        </div>
      </section>

      {/* Skills */}
      <section id="skills" className={sectionClass}>
        <h2 className={headerClass} style={displayFont}>Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          
          <div className="space-y-6">
            <h3 className="text-xl font-bold uppercase tracking-widest border-b-2 border-slate-900 pb-4">Frontend</h3>
            <div className="flex flex-col">
              {['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Figma'].map(skill => (
                <div key={skill} className="flex items-center py-4 border-b border-slate-200 group">
                  <div className="w-2 h-2 rounded-full bg-slate-300 mr-6 group-hover:bg-slate-900 transition-colors" />
                  <span className="text-xl font-medium group-hover:translate-x-2 transition-transform">{skill}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-bold uppercase tracking-widest border-b-2 border-slate-900 pb-4">Backend</h3>
            <div className="flex flex-col">
              {['Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'REST APIs'].map(skill => (
                <div key={skill} className="flex items-center py-4 border-b border-slate-200 group">
                  <div className="w-2 h-2 rounded-full bg-slate-300 mr-6 group-hover:bg-slate-900 transition-colors" />
                  <span className="text-xl font-medium group-hover:translate-x-2 transition-transform">{skill}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Contact */}
      <section id="contact" className={`${sectionClass} min-h-[60vh] flex flex-col justify-center`}>
        <h2 className={headerClass} style={displayFont}>Contact</h2>
        <div className="text-2xl md:text-3xl opacity-60 mb-16 max-w-2xl font-light">
          Got a project in mind? Let's talk.
        </div>
        
        <div className="flex flex-col gap-8 max-w-3xl">
          <a href="mailto:akzhol@example.com" className="flex items-baseline border-b border-slate-200 pb-6 group">
            <span className="w-32 text-sm uppercase tracking-widest font-semibold opacity-40">Email</span>
            <span className="text-3xl md:text-5xl font-medium group-hover:opacity-50 transition-opacity">akzhol@example.com</span>
          </a>
          <a href="https://github.com/" target="_blank" rel="noreferrer" className="flex items-baseline border-b border-slate-200 pb-6 group">
            <span className="w-32 text-sm uppercase tracking-widest font-semibold opacity-40">GitHub</span>
            <span className="text-3xl md:text-5xl font-medium group-hover:opacity-50 transition-opacity">github.com/akzhol</span>
          </a>
          <a href="https://linkedin.com/" target="_blank" rel="noreferrer" className="flex items-baseline border-b border-slate-200 pb-6 group">
            <span className="w-32 text-sm uppercase tracking-widest font-semibold opacity-40">LinkedIn</span>
            <span className="text-3xl md:text-5xl font-medium group-hover:opacity-50 transition-opacity">linkedin.com/in/akzhol</span>
          </a>
        </div>
      </section>

      {/* Credits */}
      <footer className="w-full border-t border-slate-200 py-16">
        <div className="w-[80vw] mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div>
            <h2 className="text-3xl mb-6 uppercase" style={displayFont}>Credits</h2>
            <ul className="space-y-3 opacity-60 font-medium">
              <li>Font: <strong className="font-bold">One Piece</strong> — custom display typeface</li>
              <li>Font: <strong className="font-bold">Space Grotesk</strong> — Google Fonts</li>
              <li>Background animation: Canvas API particle system</li>
              <li>Built with React, Tailwind CSS</li>
            </ul>
          </div>
          <div className="opacity-40 text-sm font-medium tracking-wide">
            &copy; 2025 Akzhol Kasymov
          </div>
        </div>
      </footer>

    </div>
  );
}
