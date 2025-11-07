import { useEffect, useState } from 'react';
// Icons removed from import: Shirt, ShoppingBag, BookOpen, RotateCcw, Crown

interface SpinWheelProps {
  isSpinning: boolean;
  onSpinClick: () => void;
}

const SpinWheel = ({ isSpinning, onSpinClick }: SpinWheelProps) => {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    if (isSpinning) {
      const spins = 360 * 8 + Math.floor(Math.random() * 360);
      setRotation(rotation + spins);
    }
  }, [isSpinning]);

  // Rewards arranged EXACTLY like the provided screenshot:
  // Icons have been removed from the object definition.
  const sections = [
    { label: 'T-Shirt',    color: 'from-cyan-400 to-cyan-500' },      // 1.
    { label: 'Try Again',  color: 'from-blue-600 to-blue-700' },  // 2.
    { label: 'Tote Bag',   color: 'from-cyan-500 to-cyan-600' }, // 3.
    { label: 'Jotter',     color: 'from-cyan-400 to-cyan-500' },   // 4.
    { label: 'Try Again',  color: 'from-blue-700 to-blue-800' },  // 5.
    { label: 'Cap',        color: 'from-cyan-500 to-cyan-600' },      // 6.
    { label: 'Try Again',  color: 'from-blue-600 to-blue-700' },  // 7. Adjacent
    { label: 'Try Again',  color: 'from-blue-700 to-blue-800' },  // 8. Adjacent
  ];
  
  const sectionAngle = 360 / sections.length;
  const degToRad = (deg: number) => deg * Math.PI / 180;

  return (
    <div className="relative">
      {/* Pointer/Indicator */}
      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[40px] border-t-cyan-400 drop-shadow-xl"></div>
      </div>

      <div className="relative w-[400px] h-[400px] md:w-[500px] md:h-[500px]">
        <div
          className="absolute inset-0 rounded-full transition-transform duration-[4000ms] ease-out"
          style={{
            transform: `rotate(${rotation}deg)`,
            transitionTimingFunction: 'cubic-bezier(0.17, 0.67, 0.12, 0.99)', 
          }}
        >
          <div className="relative w-full h-full rounded-full shadow-2xl overflow-hidden border-8 border-cyan-400">
            {sections.map((section, index) => {
              // const Icon = section.icon; // Icon import removed
              const angle = sectionAngle * index;
              const nextAngle = sectionAngle * (index + 1);
              const contentRotation = angle + sectionAngle / 2;

              return (
                <div
                  key={index}
                  className={`absolute w-full h-full bg-gradient-to-br ${section.color}`}
                  style={{
                    // Creates the pie slice shape using clipPath and trigonometry
                    clipPath: `polygon(50% 50%, 
                      ${50 + 50 * Math.cos(degToRad(angle - 90))}% ${50 + 50 * Math.sin(degToRad(angle - 90))}%, 
                      ${50 + 50 * Math.cos(degToRad(nextAngle - 90))}% ${50 + 50 * Math.sin(degToRad(nextAngle - 90))}%)`,
                  }}
                >
                  <div
                    className="absolute top-1/2 left-1/2 flex flex-col items-center justify-center pointer-events-none"
                    style={{
                      // Position content diagonally and keep the text upright.
                      transform: `
                        translate(-50%, -50%)
                        rotate(${contentRotation}deg) 
                        translateY(-140px) 
                        rotate(-${contentRotation}deg)
                      `,
                      width: '80px',
                    }}
                  >
                    {/* Removed: <Icon className="w-7 h-7 text-white mb-1" /> */}
                    <span className="text-white font-bold text-base block whitespace-nowrap">
                      {section.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <button
          onClick={onSpinClick}
          disabled={isSpinning}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center z-10 shadow-2xl border-4 border-white hover:scale-110 transition-transform duration-300 disabled:opacity-70 disabled:hover:scale-100 cursor-pointer group"
        >
          <img
            src="https://cocozqaswhyugfbilbxk.supabase.co/storage/v1/object/public/suihub/Sui_Symbol_White.png"
            alt="Sui Logo"
            className="w-20 h-20 object-contain group-hover:drop-shadow-lg"
          />
        </button>
      </div>
      <div className="absolute inset-0 rounded-full pointer-events-none shadow-[0_0_60px_rgba(34,211,238,0.4)]"></div>
    </div>
  );
};

export default SpinWheel;