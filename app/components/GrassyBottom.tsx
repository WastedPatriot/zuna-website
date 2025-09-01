'use client';

export default function GrassyBottom() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 pointer-events-none" style={{ imageRendering: 'pixelated' }}>
      {/* Grass Layer */}
      <div className="relative h-20">
        {/* Grass texture */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(180deg, #4CAF50 0%, #45A049 50%, #388E3C 100%)',
          borderTop: '4px solid #2E7D32'
        }}>
          {/* Grass blades */}
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute"
              style={{
                left: `${i * 2}%`,
                bottom: '0',
                width: '4px',
                height: `${8 + Math.random() * 8}px`,
                backgroundColor: i % 2 === 0 ? '#66BB6A' : '#4CAF50',
                transform: `rotate(${-5 + Math.random() * 10}deg)`,
                transformOrigin: 'bottom'
              }}
            />
          ))}
        </div>
        
        {/* Dirt layer underneath */}
        <div className="absolute bottom-0 left-0 right-0 h-8" style={{
          background: 'linear-gradient(180deg, #6B4423 0%, #4A2F1A 50%, #3E2723 100%)',
          borderTop: '2px solid #3E2723'
        }}>
          {/* Dirt texture dots */}
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: '2px',
                height: '2px',
                backgroundColor: Math.random() > 0.5 ? '#5D4037' : '#4E342E',
                opacity: 0.5
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
