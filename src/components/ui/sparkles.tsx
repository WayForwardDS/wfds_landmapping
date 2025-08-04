// src/components/ui/sparkles.tsx

import { useEffect, useRef } from "react";
import { cn } from "../../utils/cn";

export const SparklesCore = ({
  background = "transparent",
  minSize = 1,
  maxSize = 2,
  particleColor = "#00C6FF",
  className,
}: {
  background?: string;
  minSize?: number;
  maxSize?: number;
  particleColor?: string;
  className?: string;
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;
    canvas.width = width;
    canvas.height = height;

    const numParticles = Math.floor((width * height) / 4000);
    const particles: any[] = [];

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * (maxSize - minSize) + minSize,
        speedX: (Math.random() - 0.5) * 0.2,
        speedY: (Math.random() - 0.5) * 0.2,
        opacity: Math.random(),
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0 || p.x > width) p.speedX *= -1;
        if (p.y < 0 || p.y > height) p.speedY *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = particleColor;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      requestAnimationFrame(animate);
    };

    animate();
  }, [minSize, maxSize, particleColor]);

  return (
    <canvas
      ref={canvasRef}
      className={cn("absolute inset-0 w-full h-full z-0", className)}
      style={{ background }}
    />
  );
};
