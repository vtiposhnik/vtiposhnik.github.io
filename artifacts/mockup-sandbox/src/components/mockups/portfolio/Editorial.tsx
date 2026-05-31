import React, { useEffect, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function Editorial() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: { x: number; y: number; vx: number; vy: number; radius: number; alpha: number }[] = [];
    let animationFrameId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const particleCount = Math.floor((canvas.width * canvas.height) / 15000);
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: Math.random() * 1.5 + 0.5,
          alpha: Math.random() * 0.3 + 0.1,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
        ctx.fill();
      });
      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resize);
    resize();
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-[#f0f0f0] font-sans selection:bg-[#ff4500] selection:text-white overflow-x-hidden">
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&family=Syne:wght@400..800&display=swap');
        
        .font-syne { font-family: 'Syne', sans-serif; }
        .font-space { font-family: 'Space Grotesk', sans-serif; }

        .glass-nav {
          background: rgba(13, 13, 13, 0.4);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .text-outline {
          color: transparent;
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.15);
        }
        
        .huge-title {
          font-size: clamp(4rem, 12vw, 12rem);
          line-height: 0.85;
          letter-spacing: -0.04em;
        }

        .bg-number {
          font-size: clamp(10rem, 25vw, 30rem);
          line-height: 1;
          color: rgba(255, 255, 255, 0.02);
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 0;
          user-select: none;
          pointer-events: none;
          font-weight: 800;
        }
        
        .section-content {
          position: relative;
          z-index: 10;
        }

        .marquee-container {
          overflow: hidden;
          white-space: nowrap;
          width: 100%;
        }

        .marquee-content {
          display: inline-block;
          animation: marquee 25s linear infinite;
        }

        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .custom-cursor {
          cursor: crosshair;
        }
      `}} />

      {/* Particle Canvas */}
      <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none opacity-50" />

      {/* Navigation */}
      <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-2xl">
        <nav className="glass-nav rounded-full px-6 py-4 flex justify-between items-center font-space text-sm tracking-widest uppercase">
          <a href="#hero" className="hover:text-[#ff4500] transition-colors">AK</a>
          <div className="hidden md:flex gap-8">
            <a href="#exp" className="hover:text-[#ff4500] transition-colors">Experience</a>
            <a href="#projects" className="hover:text-[#ff4500] transition-colors">Projects</a>
            <a href="#skills" className="hover:text-[#ff4500] transition-colors">Skills</a>
          </div>
          <a href="#contact" className="hover:text-[#ff4500] transition-colors">Contact</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-[100dvh] flex flex-col justify-center pt-20 pb-10 section-content">
        <div className="container mx-auto px-6 lg:px-12 flex-1 flex flex-col justify-center">
          <div className="max-w-7xl mx-auto w-full">
            <h1 className="font-syne font-bold huge-title uppercase tracking-tighter mix-blend-difference mb-6">
              Akzhol<br />
              Kasymov
            </h1>
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mt-12 border-t border-white/10 pt-8">
              <div className="font-space max-w-sm">
                <h2 className="text-xl md:text-2xl text-[#ff4500] font-medium mb-4">Frontend Developer</h2>
                <p className="text-white/60 leading-relaxed">
                  Building polished, highly interactive web experiences with a focus on creative development.
                </p>
              </div>
              
              <div className="flex gap-4 font-space text-sm uppercase tracking-widest">
                <a href="#projects" className="border border-white/20 px-6 py-3 rounded-full hover:bg-white hover:text-black transition-colors">View Work</a>
                <a href="#contact" className="bg-[#ff4500] text-white px-6 py-3 rounded-full hover:bg-[#ff6320] transition-colors">Let's Talk</a>
              </div>
            </div>
          </div>
        </div>

        {/* Marquee Tagline */}
        <div className="absolute bottom-10 left-0 w-full marquee-container border-y border-white/5 py-4 bg-black/20 backdrop-blur-sm">
          <div className="marquee-content font-space text-sm uppercase tracking-[0.2em] text-white/40">
            <span className="mx-8">GENIUS (NO)</span> • 
            <span className="mx-8">BILLIONAIRE (SURE)</span> • 
            <span className="mx-8">PLAYBOY (ASK MY HOMIES?)</span> • 
            <span className="mx-8">PHILANTHROPIST (WHAT IS THAT?)</span> • 
            {/* Duplicate for infinite loop */}
            <span className="mx-8">GENIUS (NO)</span> • 
            <span className="mx-8">BILLIONAIRE (SURE)</span> • 
            <span className="mx-8">PLAYBOY (ASK MY HOMIES?)</span> • 
            <span className="mx-8">PHILANTHROPIST (WHAT IS THAT?)</span>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="exp" className="relative py-32 section-content overflow-hidden">
        <div className="font-syne bg-number text-outline">01</div>
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="flex flex-col md:flex-row gap-12 lg:gap-24">
            <div className="md:w-1/3">
              <h2 className="font-syne text-5xl md:text-7xl font-bold uppercase sticky top-32">Experience</h2>
            </div>
            
            <div className="md:w-2/3 flex flex-col gap-16 font-space">
              {/* Job 1 */}
              <div className="group border-l border-white/10 pl-8 relative">
                <div className="absolute w-3 h-3 bg-[#ff4500] rounded-full -left-[6.5px] top-2 transition-transform group-hover:scale-150"></div>
                <div className="text-white/40 text-sm mb-2 tracking-widest uppercase">Jan 2025 – Present</div>
                <h3 className="text-3xl font-syne font-bold mb-2 text-white">Solva Technology</h3>
                <h4 className="text-xl text-[#ff4500] mb-6">Frontend Developer</h4>
                <p className="text-white/60 leading-relaxed">
                  Building and maintaining React-based features for an enterprise fintech platform. Collaborating with design and backend teams using Agile methodology. Writing reusable UI components and improving codebase consistency.
                </p>
              </div>

              {/* Job 2 */}
              <div className="group border-l border-white/10 pl-8 relative">
                <div className="absolute w-3 h-3 bg-white/20 rounded-full -left-[6.5px] top-2 transition-transform group-hover:scale-150 group-hover:bg-[#ff4500]"></div>
                <div className="text-white/40 text-sm mb-2 tracking-widest uppercase">Sep 2024 – Dec 2024</div>
                <h3 className="text-3xl font-syne font-bold mb-2 text-white">ICEBERG-Service</h3>
                <h4 className="text-xl text-white/80 mb-6">Frontend Developer</h4>
                <p className="text-white/60 leading-relaxed">
                  Developed responsive UI for a service-management web application. Integrated REST APIs and handled async data fetching with React hooks. Optimized performance by reducing unnecessary re-renders.
                </p>
              </div>

              {/* Job 3 */}
              <div className="group border-l border-white/10 pl-8 relative">
                <div className="absolute w-3 h-3 bg-white/20 rounded-full -left-[6.5px] top-2 transition-transform group-hover:scale-150 group-hover:bg-[#ff4500]"></div>
                <div className="text-white/40 text-sm mb-2 tracking-widest uppercase">Jan 2023 – Mar 2024</div>
                <h3 className="text-3xl font-syne font-bold mb-2 text-white">AitecOne</h3>
                <h4 className="text-xl text-white/80 mb-6">Frontend Developer</h4>
                <p className="text-white/60 leading-relaxed">
                  Assisted in building and styling multi-page websites from Figma designs. Gained hands-on experience with version control (Git) and code review. Learned fundamentals of component-based architecture with React.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative py-32 section-content overflow-hidden bg-black/40">
        <div className="font-syne bg-number text-outline">02</div>
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <h2 className="font-syne text-5xl md:text-7xl font-bold uppercase mb-20 text-center">Selected Work</h2>
          
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
            {/* Project 1 */}
            <div className="group relative aspect-[4/5] bg-neutral-900 rounded-xl overflow-hidden cursor-crosshair">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-40 transition-transform duration-700 group-hover:scale-105 group-hover:opacity-20 grayscale"></div>
              <div className="absolute inset-0 flex flex-col justify-between p-8 md:p-12">
                <div className="flex justify-between items-start">
                  <span className="font-syne text-6xl text-white/20 font-bold">01</span>
                  <div className="flex gap-2 flex-wrap justify-end max-w-[60%]">
                    <Badge variant="outline" className="font-space border-white/20 text-white bg-black/30 backdrop-blur-md">React</Badge>
                    <Badge variant="outline" className="font-space border-white/20 text-white bg-black/30 backdrop-blur-md">Firebase</Badge>
                    <Badge variant="outline" className="font-space border-white/20 text-white bg-black/30 backdrop-blur-md">CSS</Badge>
                  </div>
                </div>
                
                <div className="transform transition-transform duration-500 translate-y-8 group-hover:translate-y-0">
                  <h3 className="font-syne text-4xl md:text-5xl font-bold text-white mb-4">Chat Web App</h3>
                  <p className="font-space text-white/70 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 line-clamp-3">
                    A real-time chat application built with React and Firebase, featuring user authentication and live messaging in a sleek interface.
                  </p>
                </div>
              </div>
            </div>

            {/* Project 2 */}
            <div className="group relative aspect-[4/5] bg-neutral-900 rounded-xl overflow-hidden cursor-crosshair md:mt-24">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-40 transition-transform duration-700 group-hover:scale-105 group-hover:opacity-20 grayscale"></div>
              <div className="absolute inset-0 flex flex-col justify-between p-8 md:p-12">
                <div className="flex justify-between items-start">
                  <span className="font-syne text-6xl text-white/20 font-bold">02</span>
                  <div className="flex gap-2 flex-wrap justify-end max-w-[60%]">
                    <Badge variant="outline" className="font-space border-white/20 text-white bg-black/30 backdrop-blur-md">HTML</Badge>
                    <Badge variant="outline" className="font-space border-white/20 text-white bg-black/30 backdrop-blur-md">CSS</Badge>
                    <Badge variant="outline" className="font-space border-white/20 text-white bg-black/30 backdrop-blur-md">JavaScript</Badge>
                  </div>
                </div>
                
                <div className="transform transition-transform duration-500 translate-y-8 group-hover:translate-y-0">
                  <h3 className="font-syne text-4xl md:text-5xl font-bold text-white mb-4">Travel Agency</h3>
                  <p className="font-space text-white/70 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 line-clamp-3">
                    A travel agency landing page with destination browsing, booking UI, and a responsive multi-section layout designed for conversion.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="relative py-32 section-content overflow-hidden">
        <div className="font-syne bg-number text-outline">03</div>
        <div className="container mx-auto px-6 lg:px-12 relative z-10 max-w-6xl">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
            <div className="lg:w-1/3">
              <h2 className="font-syne text-5xl md:text-7xl font-bold uppercase mb-8">Arsenal</h2>
              <p className="font-space text-white/60 leading-relaxed">
                The tools, frameworks, and technologies I use to bring ideas to life. Always learning, always evolving.
              </p>
            </div>
            
            <div className="lg:w-2/3 flex flex-col gap-16">
              <div>
                <h3 className="font-space text-sm tracking-[0.2em] uppercase text-[#ff4500] mb-8 border-b border-white/10 pb-4">Frontend</h3>
                <div className="flex flex-wrap gap-4 font-syne">
                  {['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Figma', 'HTML5', 'CSS3', 'JavaScript'].map((skill) => (
                    <span key={skill} className="text-2xl md:text-4xl text-white/70 hover:text-white hover:scale-105 transition-all cursor-default">{skill}</span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-space text-sm tracking-[0.2em] uppercase text-[#ff4500] mb-8 border-b border-white/10 pb-4">Backend</h3>
                <div className="flex flex-wrap gap-4 font-syne">
                  {['Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'REST APIs', 'Firebase'].map((skill) => (
                    <span key={skill} className="text-2xl md:text-4xl text-white/70 hover:text-white hover:scale-105 transition-all cursor-default">{skill}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-32 section-content overflow-hidden bg-[#ff4500] text-black">
        <div className="font-syne bg-number text-black/10">04</div>
        <div className="container mx-auto px-6 lg:px-12 relative z-10 text-center">
          <h2 className="font-syne text-6xl md:text-9xl font-bold uppercase mb-8 tracking-tighter">Let's Talk</h2>
          <p className="font-space text-xl md:text-3xl font-medium mb-16 max-w-2xl mx-auto">
            Got a project in mind? Looking for a frontend developer who cares about design? Let's build something great.
          </p>
          
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16 font-space text-lg md:text-2xl font-bold uppercase tracking-widest">
            <a href="mailto:akzhol@example.com" className="relative group overflow-hidden">
              <span>Email</span>
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-black transform translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300"></span>
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="relative group overflow-hidden">
              <span>GitHub</span>
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-black transform translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300"></span>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="relative group overflow-hidden">
              <span>LinkedIn</span>
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-black transform translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300"></span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer / Credits */}
      <footer className="py-12 border-t border-white/10 section-content font-space text-sm">
        <div className="container mx-auto px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-white/40">
            &copy; 2025 Akzhol Kasymov. All rights reserved.
          </div>
          
          <div className="flex gap-8 text-white/60">
            <div className="flex flex-col gap-1 text-right">
              <span className="text-white/30 text-xs uppercase tracking-widest">Typography</span>
              <span>Syne & Space Grotesk</span>
            </div>
            <div className="flex flex-col gap-1 text-right">
              <span className="text-white/30 text-xs uppercase tracking-widest">Stack</span>
              <span>React, Tailwind, Canvas</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
