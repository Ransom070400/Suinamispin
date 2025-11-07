import { useState } from 'react';
import SpinWheel from './components/SpinWheel';
import WinModal from './components/WinModal';
import Background from './components/Background';

export type Reward = 'TSHIRT' | 'TOTE BAG' | 'JOTTER' | 'CAP' | 'Try Again';

function App() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentReward, setCurrentReward] = useState<Reward | null>(null);

  const handleSpin = () => {
    if (isSpinning) return;

    setIsSpinning(true);

    const rewards: Reward[] = ['TSHIRT', 'TOTE BAG', 'JOTTER', 'CAP', 'Try Again'];
    const randomReward = rewards[Math.floor(Math.random() * rewards.length)];

    setTimeout(() => {
      setIsSpinning(false);
      setCurrentReward(randomReward);
      setShowModal(true);
    }, 4000);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentReward(null);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-blue-950">
      <Background />

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 drop-shadow-2xl">
            Suinami Lagos
          </h1>
          <p className="text-xl md:text-2xl text-blue-200 font-light tracking-wide">
            Spin to Win Exclusive Rewards
          </p>
        </div>

        <SpinWheel isSpinning={isSpinning} onSpinClick={handleSpin} />

        <footer className="absolute bottom-6 text-center text-blue-200 text-sm">
           Suinami Lagos 2025
        </footer>
      </div>

      {showModal && currentReward && (
        <WinModal reward={currentReward} onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default App;
