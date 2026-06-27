'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const layers = [
  { x: -120, y: -80, rotate: -12, scale: 0.78 },
  { x: 90, y: -90, rotate: 14, scale: 0.82 },
  { x: -70, y: 40, rotate: -8, scale: 0.86 },
  { x: 110, y: 20, rotate: 12, scale: 0.9 },
  { x: -140, y: 120, rotate: -15, scale: 0.84 },
  { x: 140, y: 120, rotate: 18, scale: 0.82 },
  { x: -20, y: -150, rotate: 0, scale: 0.72 },
  { x: 0, y: 150, rotate: 0, scale: 0.72 },
  { x: -220, y: 0, rotate: -20, scale: 0.68 },
  { x: 220, y: 0, rotate: 20, scale: 0.68 },
];

export default function ExplodedWatch() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-watch-layer]',
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 75%',
            end: 'bottom center',
            scrub: 1,
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-[2.5rem] border border-white/10 bg-carbon-card/70 p-6 md:p-10">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-gold/70">Inside the craft</p>
            <h2 className="mt-3 font-display text-4xl text-white sm:text-5xl">The watch, revealed part by part</h2>
            <p className="mt-5 max-w-lg text-base leading-8 text-white/65">
              A staged exploded view that exposes the geometry, finishing, and silhouette behind the Avior design language.
            </p>
          </div>

          <div className="relative min-h-[420px]">
            <div className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_center,_rgba(201,168,76,0.18),_transparent_55%)]" />
            <div className="absolute inset-0 flex items-center justify-center">
              {layers.map((layer, index) => (
                <div
                  key={index}
                  data-watch-layer
                  className="absolute h-40 w-40 md:h-52 md:w-52"
                  style={{
                    transform: `translate(${layer.x}px, ${layer.y}px) rotate(${layer.rotate}deg) scale(${layer.scale})`,
                  }}
                >
                  <Image src="/images/watch-exploded.png" alt="" fill className="object-contain opacity-90" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

