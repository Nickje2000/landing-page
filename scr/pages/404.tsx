import React, { useEffect, useRef } from 'react';

const NotFound = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width: number, height: number;
    let particles: Particle[] = [];
    let animationFrameId: number;
    const particleCount = 70;
    const connectionDistance = 120;
    const mouseDistance = 150;

    let mouse = { x: -1000, y: -1000 }; // Initialize off-screen

    // Particle Class
    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      isRed: boolean;
      color: string;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.size = Math.random() * 1.5;
        this.isRed = Math.random() > 0.9;
        this.color = this.isRed
          ? `rgba(239, 68, 68, ${Math.random() * 0.5 + 0.4})`
          : `rgba(200, 200, 200, ${Math.random() * 0.3 + 0.1})`;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off edges
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Mouse interaction
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouseDistance) {
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const force = (mouseDistance - distance) / mouseDistance;
          const directionX = forceDirectionX * force * 0.5;
          const directionY = forceDirectionY * force * 0.5;

          this.vx -= directionX;
          this.vy -= directionY;
        }
      }

      draw(context: CanvasRenderingContext2D) {
        context.beginPath();
        context.rect(this.x, this.y, this.size, this.size);
        context.fillStyle = this.color;
        context.fill();
      }
    }

    const init = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const connectParticles = () => {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            const opacityValue = 1 - distance / connectionDistance;
            if (particles[a].isRed || particles[b].isRed) {
              ctx.strokeStyle = `rgba(239, 68, 68, ${opacityValue * 0.15})`;
            } else {
              ctx.strokeStyle = `rgba(255, 255, 255, ${opacityValue * 0.05})`;
            }
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((particle) => {
        particle.update();
        particle.draw(ctx);
      });

      connectParticles();
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      init(); // Re-init particles on resize to prevent stretching
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    // Listeners
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Initial Start
    handleResize();
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative flex items-center justify-center w-full h-screen overflow-hidden bg-[#050505] text-white font-sans">
      <style>{`
        /* Embedded fonts import if not already in your index.html/_document.tsx */
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&family=Noto+Sans+JP:wght@100;300;500;700;900&display=swap');

        .writing-vertical {
          writing-mode: vertical-rl;
          text-orientation: mixed;
        }
        
        .neo-glass {
          background: rgba(10, 10, 10, 0.6);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-left: 4px solid #ef4444;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
        }

        .glitch {
          position: relative;
          color: #ffffff;
          font-size: 8rem;
          font-weight: 900;
          line-height: 0.8;
          letter-spacing: -0.05em;
          z-index: 1;
        }

        .glitch::before,
        .glitch::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0.8;
        }

        .glitch::before {
          left: 2px;
          text-shadow: -2px 0 #ef4444;
          clip: rect(44px, 450px, 56px, 0);
          animation: glitch-anim 4s infinite linear alternate-reverse;
        }

        .glitch::after {
          left: -2px;
          text-shadow: -2px 0 #00ffff;
          clip: rect(44px, 450px, 56px, 0);
          animation: glitch-anim2 4s infinite linear alternate-reverse;
        }

        @keyframes glitch-anim {
          0% { clip: rect(31px, 9999px, 94px, 0); }
          5% { clip: rect(70px, 9999px, 19px, 0); }
          10% { clip: rect(6px, 9999px, 12px, 0); }
          15% { clip: rect(78px, 9999px, 66px, 0); }
          20% { clip: rect(13px, 9999px, 83px, 0); }
          25% { clip: rect(38px, 9999px, 86px, 0); }
          30% { clip: rect(25px, 9999px, 60px, 0); }
          35% { clip: rect(77px, 9999px, 52px, 0); }
          40% { clip: rect(51px, 9999px, 20px, 0); }
          45% { clip: rect(3px, 9999px, 69px, 0); }
          50% { clip: rect(95px, 9999px, 45px, 0); }
          100% { clip: rect(0, 0, 0, 0); }
        }

        @keyframes glitch-anim2 {
          0% { clip: rect(65px, 9999px, 100px, 0); }
          100% { clip: rect(5px, 9999px, 76px, 0); }
        }

        .btn-modern {
          position: relative;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .btn-modern::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: rgba(255, 255, 255, 0.1);
          transform: skewX(-20deg);
          transition: left 0.5s;
        }

        .btn-modern:hover::before {
          left: 100%;
        }

        .bg-kanji {
            position: absolute;
            font-family: 'Noto Sans JP', sans-serif;
            font-weight: 900;
            font-size: 40vw;
            color: rgba(255, 255, 255, 0.02);
            z-index: 0;
            pointer-events: none;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            line-height: 1;
        }
      `}</style>

      {/* Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full z-0 opacity-40"
      />

      {/* Kanji Background */}
      <div className="bg-kanji select-none">無</div>

      {/* Decorative Grid Lines */}
      <div className="absolute top-0 left-8 h-full w-[1px] bg-white/5 z-0 hidden md:block"></div>
      <div className="absolute top-0 right-8 h-full w-[1px] bg-white/5 z-0 hidden md:block"></div>
      <div className="absolute top-12 left-0 w-full h-[1px] bg-white/5 z-0"></div>
      <div className="absolute bottom-12 left-0 w-full h-[1px] bg-white/5 z-0"></div>

      {/* Vertical Text */}
      <div className="fixed left-12 top-1/2 -translate-y-1/2 writing-vertical text-xs tracking-[0.5em] text-neutral-600 hidden md:block select-none z-0">
        システムエラー・接続切断
      </div>

      {/* Main Content */}
      <main className="neo-glass z-10 p-10 md:p-14 text-left max-w-2xl w-full mx-6 relative">
        <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
          <span className="text-xs font-mono text-red-500 tracking-widest uppercase">
            Error Code: 404
          </span>
          <span className="text-xs font-light text-neutral-500 tracking-widest">
            存在しない
          </span>
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="glitch-wrapper select-none flex-shrink-0">
            <h1 className="glitch font-mono" data-text="404">
              404
            </h1>
          </div>

          <div className="flex flex-col justify-center h-full pt-2">
            <h2 className="text-3xl font-bold mb-2 tracking-wide font-sans">
              Page Not Found
              <span className="inline-block w-2 h-2 ml-1 mb-0.5 bg-red-500 rounded-full"></span>
            </h2>
            <h3 className="text-lg font-light text-neutral-400 mb-6 font-mono tracking-widest">
              ページが見つかりません
            </h3>

            <p className="text-neutral-400 text-sm font-light leading-relaxed mb-8 max-w-sm">
              The requested data could not be located in the current sector. It
              may have been moved, deleted, or never existed in this timeline.
            </p>

            <div className="flex flex-row gap-4">
              <button
                onClick={() => window.history.back()}
                className="btn-modern px-6 py-3 bg-transparent border border-neutral-600 hover:border-white text-white text-sm tracking-widest uppercase transition-colors"
              >
                Return
              </button>

              <a
                href="/"
                className="btn-modern px-6 py-3 bg-red-600 border border-red-600 hover:bg-red-700 text-white text-sm font-medium tracking-widest uppercase shadow-[0_0_15px_rgba(239,68,68,0.3)] hover:shadow-[0_0_25px_rgba(239,68,68,0.5)] transition-all flex items-center justify-center"
              >
                Homepage
              </a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-4 right-4">
          <div className="w-16 h-16 border-r border-b border-white/20"></div>
        </div>
      </main>
    </div>
  );
};

export default NotFound;