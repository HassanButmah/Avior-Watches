'use client';

export default function LoadingScreen({ visible }: { visible: boolean }) {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-carbon-deep">
      <div className="w-full max-w-sm px-8 text-center">
        <div className="mb-8 flex justify-center gap-2 text-4xl font-display tracking-[0.4em] text-gold">
          {['A', 'V', 'I', 'O', 'R'].map((letter, index) => (
            <span key={letter} className="animate-fade-up opacity-0" style={{ animationDelay: `${index * 0.1}s` }}>
              {letter}
            </span>
          ))}
        </div>
        <div className="h-1 overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-full animate-shimmer bg-gradient-to-r from-transparent via-gold to-transparent" />
        </div>
      </div>
    </div>
  );
}

