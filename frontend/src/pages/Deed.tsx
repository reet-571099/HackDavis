import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { Icon } from "../components/Icon";
import { BadgeIconName } from "../types/icon";
import ReactConfetti from "react-confetti";

// Mock data for deeds (replace with actual data from your backend)
const mockDeed = {
  id: "recycling-1",
  title: "Be a Recycling Hero Today!",
  category: "Environment",
  inputType: "photo" as const,
  description: "Pick up 5 pieces of litter or help sort recycling",
  badgeId: "earth-explorer",
  icon: "leaf" as BadgeIconName,
  color: "bg-green-400",
};

// Mock facts for "Did You Know?" section
const facts = [
  "Recycling 1 bottle saves enough energy to light a bulb for 4 hours!",
  "Every ton of paper recycled saves 17 trees!",
  "Plastic takes 450 years to decompose in nature!",
];

const Deed = () => {
  const navigate = useNavigate();
  const { deedId } = useParams();
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
  const [currentFact, setCurrentFact] = useState(facts[0]);
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

  // Rotate facts every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFact((prev) => {
        const currentIndex = facts.indexOf(prev);
        return facts[(currentIndex + 1) % facts.length];
      });
    }, 5000);
    return () => clearInterval(interval);
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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSubmission({
          content: reader.result as string,
          type: "image",
          status: "pending",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 via-blue-100 to-purple-100 p-4">
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
          className={`${mockDeed.color} rounded-3xl p-6 shadow-xl mb-8`}
        >
          <div className="flex items-center justify-center mb-4">
            <Icon
              name={mockDeed.icon}
              type="badge"
              size="xl"
              className="text-white"
            />
          </div>
          <h1 className="text-3xl font-bold text-white text-center mb-2">
            {mockDeed.title}
          </h1>
          <p className="text-white text-lg text-center mb-4">
            {mockDeed.description}
          </p>
          <div className="flex justify-center gap-2">
            <span className="bg-white/20 rounded-full px-4 py-1">
              <span className="text-white font-semibold">
                {mockDeed.category}
              </span>
            </span>
            <span className="bg-white/20 rounded-full px-4 py-1">
              <span className="text-white">
                {mockDeed.inputType === "photo" ? "📸" : "📝"}
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

          {mockDeed.inputType === "photo" ? (
            <div className="space-y-4">
              <label className="block">
                <span className="text-gray-700">Upload a photo</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="mt-1 block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-purple-50 file:text-purple-700
                    hover:file:bg-purple-100"
                />
              </label>
              {submission.content && (
                <div className="mt-4">
                  <img
                    src={submission.content}
                    alt="Submission preview"
                    className="rounded-lg max-w-full h-auto"
                  />
                </div>
              )}
            </div>
          ) : (
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
          )}

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
          <p className="text-gray-700">{currentFact}</p>
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
