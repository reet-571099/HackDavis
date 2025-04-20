import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Wheel } from "react-custom-roulette";
import { motion, AnimatePresence } from "framer-motion";
import ReactConfetti from "react-confetti";
import Button from "./Button";
import { Icon } from "./Icon";

interface Category {
  id: string;
  name: string;
  color: string;
}

interface SpinWheelProps {
  categories: Category[];
  onSpinComplete: (categoryId: string) => void;
  disabled?: boolean;
}

const SpinWheel = React.memo(
  ({ categories, onSpinComplete, disabled = false }: SpinWheelProps) => {
    const [mustSpin, setMustSpin] = useState(false);
    const [prizeNumber, setPrizeNumber] = useState(0);
    const [showConfetti, setShowConfetti] = useState(false);
    const [isSpinning, setIsSpinning] = useState(false);
    const [windowSize, setWindowSize] = useState({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    // Memoize wheel data to prevent unnecessary recalculations
    const wheelData = useMemo(
      () =>
        categories.map((category) => ({
          option: category.name,
          style: {
            backgroundColor: category.color,
            textColor: "#ffffff",
          },
        })),
      [categories]
    );

    // Handle window resize with debounce
    useEffect(() => {
      let timeout: ReturnType<typeof setTimeout>;

      const handleResize = () => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
          });
        }, 100);
      };

      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
        clearTimeout(timeout);
      };
    }, []);

    const handleSpinClick = useCallback(() => {
      console.log("Spin button clicked", { isSpinning, disabled, mustSpin }); // Debug log
      if (isSpinning || disabled) {
        console.log("Spin prevented", { isSpinning, disabled });
        return;
      }

      const newPrizeNumber = Math.floor(Math.random() * categories.length);
      console.log("Spinning with prizeNumber:", newPrizeNumber); // Debug log
      setPrizeNumber(newPrizeNumber);
      setIsSpinning(true);
      setMustSpin(true);
      setShowConfetti(false);
    }, [isSpinning, categories.length, disabled]);

    const handleSpinComplete = useCallback(() => {
      console.log(
        "Spin complete, selected category:",
        categories[prizeNumber].id
      ); // Debug log
      const selected = categories[prizeNumber];
      setShowConfetti(true);
      setMustSpin(false);
      setIsSpinning(false);
      onSpinComplete(selected.id);
    }, [prizeNumber, categories, onSpinComplete]);

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
                numberOfPieces={200}
                gravity={0.2}
                colors={categories.map((cat) => cat.color)}
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
                tweenDuration={5000}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative w-80 h-80 ml-28 sm:w-96 sm:h-96 md:w-[400px] md:h-[400px]">
          <Wheel
            mustStartSpinning={mustSpin}
            prizeNumber={prizeNumber}
            data={wheelData}
            outerBorderColor="#8B5CF6"
            outerBorderWidth={8}
            innerBorderColor="#f2f2f2"
            radiusLineColor="#dedede"
            radiusLineWidth={1}
            fontSize={14}
            textDistance={60}
            spinDuration={0.5}
            disableInitialAnimation
            onStopSpinning={handleSpinComplete}
          />
        </div>

        <div className="mt-20 text-center">
          <Button
            onClick={handleSpinClick}
            disabled={isSpinning || disabled} // Temporarily comment out to test: disabled={false}
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
  }
);

SpinWheel.displayName = "SpinWheel";

export default SpinWheel;
