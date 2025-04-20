import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Icon } from "../components/Icon";
import { BadgeIconName } from "../types/icon";
import ReactConfetti from "react-confetti";

interface GeneratedDeed {
  id: string;
  category: string;
  deed: string;
  explanation: string;
  funFact: string;
  difficultyLevel: string;
}

const Deed = () => {
  const navigate = useNavigate();
  const { deedId } = useParams();
  const location = useLocation();
  const generatedDeed = location.state?.generatedDeed as GeneratedDeed;

  // Debug logging
  console.log("Deed component rendered with deedId:", deedId);
  console.log("Generated deed:", generatedDeed);

  const [submission, setSubmission] = useState<{
    content: string;
    type: "text" | "image" | "audio";
    status: "pending" | "success" | "retry";
  }>({
    content: "",
    type: "text",
    status: "pending",
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // Handle window resize for confetti
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

  const handleSubmit = () => {
    // Simulate submission validation
    if (submission.content) {
      setSubmission((prev) => ({ ...prev, status: "success" }));
      setShowSuccess(true);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    } else {
      setSubmission((prev) => ({ ...prev, status: "retry" }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 via-blue-100 to-purple-100 p-4">
      {/* Debug info - will be removed in production */}
      <div className="fixed top-0 left-0 bg-black text-white p-2 z-50">
        Debug: deedId = {deedId}
      </div>

      {/* Confetti */}
      <AnimatePresence>
        {showConfetti && (
          <ReactConfetti
            width={windowSize.width}
            height={windowSize.height}
            recycle={false}
            numberOfPieces={500}
            colors={["#FFD700", "#FF69B4", "#87CEEB", "#98FB98", "#DDA0DD"]}
          />
        )}
      </AnimatePresence>

      <div className="max-w-2xl mx-auto">
        {/* Mission Card */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-purple-600 rounded-3xl p-6 shadow-xl mb-8"
        >
          <div className="flex items-center justify-center mb-4">
            <Icon
              name="default"
              type="badge"
              size="xl"
              className="text-white"
            />
          </div>
          <h1 className="text-3xl font-bold text-white text-center mb-2">
            {generatedDeed?.deed || "Your Mission"}
          </h1>
          <p className="text-white text-lg text-center mb-4">
            {generatedDeed?.explanation ||
              "Complete this mission to earn a badge!"}
          </p>
          <div className="flex justify-center gap-2">
            <span className="bg-white/20 rounded-full px-4 py-1">
              <span className="text-white font-semibold">
                {generatedDeed?.category || "General"}
              </span>
            </span>
            <span className="bg-white/20 rounded-full px-4 py-1">
              <span className="text-white">
                {generatedDeed?.difficultyLevel || "Medium"}
              </span>
            </span>
          </div>
        </motion.div>

        {/* Submission Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-6 shadow-xl mb-8"
        >
          <h2 className="text-2xl font-bold text-purple-800 mb-4">
            How did you complete your mission?
          </h2>

          <div className="space-y-4">
            <label className="block">
              <span className="text-gray-700">Tell us what you did!</span>
              <textarea
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                rows={4}
                value={submission.content}
                onChange={(e) =>
                  setSubmission((prev) => ({
                    ...prev,
                    content: e.target.value,
                  }))
                }
                placeholder="I helped clean up the park by picking up trash..."
              />
            </label>
            <div className="flex gap-2">
              <button className="p-2 rounded-full bg-purple-100 hover:bg-purple-200">
                🎉
              </button>
              <button className="p-2 rounded-full bg-purple-100 hover:bg-purple-200">
                😄
              </button>
              <button className="p-2 rounded-full bg-purple-100 hover:bg-purple-200">
                💡
              </button>
            </div>
          </div>

          {/* Tips Box */}
          <div className="mt-6 p-4 bg-purple-50 rounded-xl">
            <p className="text-purple-800">
              💡 Need help? Try asking a parent to take your picture!
            </p>
          </div>
        </motion.div>

        {/* Did You Know? Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-6 shadow-xl mb-8"
        >
          <h3 className="text-xl font-bold text-purple-800 mb-2">
            💡 Did You Know?
          </h3>
          <p className="text-gray-700">
            {generatedDeed?.funFact || "Fun facts coming soon!"}
          </p>
        </motion.div>

        {/* Submit Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSubmit}
          className="w-full bg-purple-600 text-white font-bold py-4 rounded-full text-xl hover:bg-purple-700 transition-colors"
        >
          I Did It! 🎉
        </motion.button>

        {/* Success Modal */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                className="bg-white rounded-3xl p-8 max-w-md w-full text-center"
              >
                <h2 className="text-3xl font-bold text-purple-800 mb-4">
                  Amazing job! 🎉
                </h2>
                <p className="text-xl text-gray-700 mb-6">
                  You completed your mission!
                </p>
                <div className="bg-yellow-100 rounded-xl p-4 mb-6">
                  <p className="text-yellow-800 font-semibold">
                    You unlocked the 🥇 Earth Explorer Badge!
                  </p>
                </div>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => navigate("/")}
                    className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700"
                  >
                    Back to Home
                  </button>
                  <button
                    onClick={() => navigate("/profile")}
                    className="bg-purple-100 text-purple-800 px-6 py-2 rounded-full hover:bg-purple-200"
                  >
                    View Profile
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Retry Feedback */}
        <AnimatePresence>
          {submission.status === "retry" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-3xl p-6 shadow-xl mt-8"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="text-4xl">😅</div>
                <div>
                  <h3 className="text-xl font-bold text-purple-800">
                    Hmm... Looks like we couldn't see what you did clearly.
                  </h3>
                  <p className="text-gray-700">
                    Try writing a bit more or uploading a better photo!
                  </p>
                </div>
              </div>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() =>
                    setSubmission((prev) => ({ ...prev, status: "pending" }))
                  }
                  className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700"
                >
                  🔁 Try Again
                </button>
                <button className="bg-purple-100 text-purple-800 px-6 py-2 rounded-full hover:bg-purple-200">
                  ❓ Need Help?
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Deed;
