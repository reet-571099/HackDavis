import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactConfetti from "react-confetti";
import Button from "./Button";
import { Icon } from "./Icon";
import { PrizeIconName } from "../types/icon";

interface Category {
  id: string;
  name: string;
  color: string;
}

interface SpinWheelProps {
  categories: Category[];
  onSpinComplete: (categoryId: string) => void;
}

const SpinWheel = ({ categories, onSpinComplete }: SpinWheelProps) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSpinClick = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setShowConfetti(false);

    // Calculate random rotation (multiple of 360 + random angle)
    const randomPrize = Math.floor(Math.random() * categories.length);
    const anglePerSection = 360 / categories.length;
    const targetRotation = 360 * 5 + randomPrize * anglePerSection;

    setRotation(targetRotation);

    // Wait for animation to complete
    setTimeout(() => {
      setIsSpinning(false);
      setShowConfetti(true);
      onSpinComplete(categories[randomPrize].id);
    }, 5000); // Match this with CSS animation duration
  };

  return (
    <div className="relative">
      <AnimatePresence>
        {showConfetti && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 pointer-events-none"
          >
            <ReactConfetti
              width={windowSize.width}
              height={windowSize.height}
              recycle={false}
              numberOfPieces={500}
              gravity={0.3}
              colors={["#8B5CF6", "#EC4899", "#FCD34D", "#34D399", "#60A5FA"]}
              confettiSource={{
                x: 0,
                y: 0,
                w: windowSize.width,
                h: windowSize.height,
              }}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                pointerEvents: "none",
                width: "100%",
                height: "100%",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative w-80 h-80 mx-auto sm:w-96 sm:h-96 md:w-[400px] md:h-[400px]">
        {/* Outer circle with shadow effect */}
        <div className="absolute inset-0 rounded-full bg-purple-100 shadow-lg" />

        {/* Wheel container */}
        <div className="relative w-full h-full">
          {/* Spinning wheel */}
          <div
            className="absolute inset-0 rounded-full border-8 border-purple-600 overflow-visible"
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: "transform 5s cubic-bezier(0.17, 0.67, 0.12, 0.99)",
            }}
          >
            {/* Wheel segments */}
            {categories.map((category, index) => {
              const sectionAngle = 360 / categories.length;
              const startAngle = sectionAngle * index;
              const endAngle = startAngle + sectionAngle;
              const midAngle = startAngle + sectionAngle / 2;

              // Calculate the coordinates for the text
              const textRadius = 120; // Increased to ensure text is not clipped
              const textX =
                Math.cos((midAngle - 90) * (Math.PI / 180)) * textRadius;
              const textY =
                Math.sin((midAngle - 90) * (Math.PI / 180)) * textRadius;

              return (
                <div
                  key={category.id}
                  className="absolute w-full h-full"
                  style={{
                    clipPath: `polygon(50% 50%, ${
                      50 + 50 * Math.cos((startAngle * Math.PI) / 180)
                    }% ${50 + 50 * Math.sin((startAngle * Math.PI) / 180)}%, ${
                      50 + 50 * Math.cos((endAngle * Math.PI) / 180)
                    }% ${50 + 50 * Math.sin((endAngle * Math.PI) / 180)}%)`,
                    backgroundColor: category.color,
                  }}
                >
                  {/* Text for each segment */}
                  <div
                    className="absolute text-white font-bold z-30"
                    style={{
                      left: `50%`,
                      top: `50%`,
                      transform: `translate(-50%, -50%) rotate(${midAngle}deg) translate(${textX}px, ${textY}px)`,
                      width: "100px",
                      textAlign: "center",
                      fontSize: "1rem",
                      fontWeight: "700",
                      padding: "4px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {category.name}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Center circle */}
          <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-purple-600 rounded-full transform -translate-x-1/2 -translate-y-1/2 z-10 shadow-md flex items-center justify-center">
            <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
              <div className="w-8 h-8 bg-purple-400 rounded-full" />
            </div>
          </div>

          {/* Pointer */}
          <div className="absolute top-0 left-1/2 w-8 h-8 bg-purple-600 transform -translate-x-1/2 -translate-y-1/4 rotate-45 shadow-lg z-20" />
        </div>
      </div>

      <div className="mt-8 text-center">
        <Button
          onClick={handleSpinClick}
          disabled={isSpinning}
          size="lg"
          className="w-full max-w-xs"
        >
          {isSpinning ? (
            <div className="flex items-center justify-center space-x-2">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Icon name="time-planning" type="prize" size="lg" />
              </motion.div>
              <span>Spinning...</span>
            </div>
          ) : (
            <div className="flex items-center justify-center space-x-2">
              <Icon name="time-planning" type="prize" size="lg" />
              <span>Spin the Wheel!</span>
            </div>
          )}
        </Button>
      </div>
    </div>
  );
};

export default SpinWheel;
