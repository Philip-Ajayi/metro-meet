'use client';
import React, { useEffect, useRef } from 'react';

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles: Particle[] = [];
    const particleCount = Math.min(60, Math.floor((width * height) / 25000));

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.radius = Math.random() * 2 + 1;
        this.alpha = Math.random() * 0.5 + 0.1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }

      draw(c: CanvasRenderingContext2D) {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        c.fillStyle = `rgba(245, 158, 11, ${this.alpha})`;
        c.shadowBlur = 10;
        c.shadowColor = '#f59e0b';
        c.fill();
        c.shadowBlur = 0; // reset
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const drawConnections = (c: CanvasRenderingContext2D) => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            const alpha = (1 - dist / 120) * 0.15;
            c.beginPath();
            c.moveTo(particles[i].x, particles[i].y);
            c.lineTo(particles[j].x, particles[j].y);
            c.strokeStyle = `rgba(245, 158, 11, ${alpha})`;
            c.lineWidth = 0.5;
            c.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Create rich dark premium gradient background
      const bgGrad = ctx.createRadialGradient(
        width / 2,
        height / 2,
        10,
        width / 2,
        height / 2,
        Math.max(width, height)
      );
      bgGrad.addColorStop(0, '#0f172a');
      bgGrad.addColorStop(1, '#020617');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Draw subtle ambient glow spots
      ctx.beginPath();
      const glowGrad = ctx.createRadialGradient(
        width * 0.2,
        height * 0.3,
        50,
        width * 0.2,
        height * 0.3,
        400
      );
      glowGrad.addColorStop(0, 'rgba(30, 58, 138, 0.25)'); // blue
      glowGrad.addColorStop(1, 'rgba(15, 23, 42, 0)');
      ctx.fillStyle = glowGrad;
      ctx.fillRect(0, 0, width, height);

      ctx.beginPath();
      const glowGrad2 = ctx.createRadialGradient(
        width * 0.8,
        height * 0.7,
        50,
        width * 0.8,
        height * 0.7,
        400
      );
      glowGrad2.addColorStop(0, 'rgba(245, 158, 11, 0.08)'); // gold/amber
      glowGrad2.addColorStop(1, 'rgba(15, 23, 42, 0)');
      ctx.fillStyle = glowGrad2;
      ctx.fillRect(0, 0, width, height);

      particles.forEach((p) => {
        p.update();
        p.draw(ctx);
      });

      drawConnections(ctx);

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none -z-20"
    />
  );
}
