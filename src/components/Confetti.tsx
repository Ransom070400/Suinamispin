import { useEffect, useState } from 'react';

interface ConfettiPiece {
  id: number;
  left: number;
  animationDuration: number;
  delay: number;
  color: string;
}

const Confetti = () => {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    const colors = ['#22d3ee', '#06b6d4', '#3b82f6', '#60a5fa', '#fbbf24', '#f59e0b'];
    const newPieces: ConfettiPiece[] = [];

    for (let i = 0; i < 50; i++) {
      newPieces.push({
        id: i,
        left: Math.random() * 100,
        animationDuration: 2 + Math.random() * 3,
        delay: Math.random() * 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    setPieces(newPieces);

    const timer = setTimeout(() => {
      setPieces([]);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className="absolute w-3 h-3 opacity-80 animate-confettiFall"
          style={{
            left: `${piece.left}%`,
            top: '-10px',
            backgroundColor: piece.color,
            animationDuration: `${piece.animationDuration}s`,
            animationDelay: `${piece.delay}s`,
            transform: `rotate(${Math.random() * 360}deg)`,
          }}
        />
      ))}
    </div>
  );
};

export default Confetti;
