import { useEffect, useState } from 'react';
import { X, Twitter } from 'lucide-react';
import { Reward } from '../App';
import Confetti from './Confetti';

interface WinModalProps {
  reward: Reward;
  onClose: () => void;
}

const WinModal = ({ reward, onClose }: WinModalProps) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const isWin = reward !== 'Try Again';

  useEffect(() => {
    if (isWin) {
      setShowConfetti(true);
      // Play audio on win (assuming the data URI works)
      const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBCl+zPLTgjMGHm7A7OGVRwsPUrXp8a1cFgpBmuDyvWgbBCmBzvLTgjMGHm7AOGVRwwPUbXp8a1bFgo');
      audio.play().catch(() => {});
    }
  }, [isWin]);

  const generateQRCode = (text: string) => {
    return `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(text)}`;
  };

  const getTweetText = () => {
    return `I just spun the wheel at #SuinamiLagos and won a ${reward}! Big thanks to the Sui Nigeria team for bringing the energy and rewards @panic_community, @Rainbowsdotsui, @Goodylili, @ezeransome #BuildOnSui #Suinami #SuiEcosystem #SuiNigeria`;
  };

  // Generates the full URL for the Twitter intent
  const getTweetIntentUrl = () => {
    return `https://twitter.com/intent/tweet?text=${encodeURIComponent(getTweetText())}`;
  };

  // Function to handle the social share action (used by the button)
  const handleShareOnX = () => {
    window.open(getTweetIntentUrl(), '_blank');
  };

  // === KEY CHANGE HERE ===
  // The QR code now contains the Twitter Intent URL itself.
  const qrCodeUrl = generateQRCode(getTweetIntentUrl());

  return (
    <>
      {showConfetti && <Confetti />}

      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
        <div className="bg-gradient-to-br from-blue-900/90 to-blue-950/90 backdrop-blur-xl border-2 border-cyan-400/50 rounded-3xl p-8 max-w-md w-full shadow-2xl relative animate-scaleIn">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {isWin ? (
            <div className="text-center">
              
              <h2 className="text-4xl font-bold text-white mb-3">
                Congratulations!
              </h2>

              <p className="text-2xl text-cyan-300 mb-6 font-semibold">
                You just won a **{reward}**!
              </p>

              <div className="bg-white rounded-2xl p-6 mb-6 shadow-xl">
                <img
                  src={qrCodeUrl}
                  alt="QR Code"
                  className="w-full h-auto mx-auto"
                />
              </div>

              <p className="text-blue-200 text-lg leading-relaxed mb-6">
                **Scan this QR code to claim your reward** at the{' '}
                <span className="text-cyan-400 font-semibold">Suinami Lagos Booth</span>
                , and let the world know about your win!
              </p>
              
              <button
                onClick={onClose} 
                className="w-full px-6 py-3 bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-bold rounded-full hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 mb-3"
              >
                Spin Again
              </button>
              
              <button
                onClick={handleShareOnX}
                className="w-full px-6 py-3 bg-blue-500/80 text-white font-bold rounded-full hover:bg-blue-500 transition-all duration-300 flex items-center justify-center mb-4"
              >
                <Twitter className="w-5 h-5 mr-2" /> Share on X
              </button>

              <p className="text-xs text-blue-300">
                Share your win on X (Twitter) and celebrate with the community!
              </p>
            </div>
          ) : (
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                So Close!
              </h2>

              <p className="text-xl text-blue-300 mb-6">
                **Try again and win big!**
              </p>
              
              <button
                onClick={onClose}
                className="px-8 py-3 bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-bold rounded-full hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105"
              >
                Spin Again
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default WinModal;