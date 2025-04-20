import { useState, useEffect, useRef } from "react";
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

type EntryType = "text" | "photo" | "audio";

const Deed = () => {
  const navigate = useNavigate();
  const { deedId } = useParams();
  const location = useLocation();
  const generatedDeed = location.state?.generatedDeed as GeneratedDeed;
  const [selectedEntryType, setSelectedEntryType] = useState<EntryType>("text");
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // Debug logging
  console.log("Deed component rendered with deedId:", deedId);
  console.log("Generated deed:", generatedDeed);

  const [submission, setSubmission] = useState<{
    content: string;
    type: EntryType;
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
          type: "photo",
          status: "pending",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/wav",
        });
        const audioUrl = URL.createObjectURL(audioBlob);
        setSubmission({
          content: audioUrl,
          type: "audio",
          status: "pending",
        });
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      mediaRecorderRef.current.stream
        .getTracks()
        .forEach((track) => track.stop());
    }
  };

  const FloatingElements = () => {
    const elements = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 2 + Math.random() * 2,
      type: i % 2 === 0 ? "⭐" : "❤️",
    }));

    return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {elements.map((element) => (
          <motion.div
            key={element.id}
            className="absolute text-2xl"
            style={{
              left: `${element.x}%`,
              top: `${element.y}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: element.duration,
              repeat: Infinity,
              delay: element.delay,
              ease: "easeInOut",
            }}
          >
            {element.type}
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 py-8 px-4 relative overflow-hidden">
      <FloatingElements />
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

        {/* Entry Type Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-6 shadow-xl mb-8"
        >
          <h2 className="text-2xl font-bold text-purple-800 mb-4">
            How would you like to share your deed?
          </h2>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <button
              onClick={() => setSelectedEntryType("text")}
              className={`p-4 rounded-xl text-center transition-all ${
                selectedEntryType === "text"
                  ? "bg-purple-600 text-white"
                  : "bg-purple-100 text-purple-800 hover:bg-purple-200"
              }`}
            >
              <span className="text-2xl mb-2 block">📝</span>
              Text
            </button>
            <button
              onClick={() => setSelectedEntryType("photo")}
              className={`p-4 rounded-xl text-center transition-all ${
                selectedEntryType === "photo"
                  ? "bg-purple-600 text-white"
                  : "bg-purple-100 text-purple-800 hover:bg-purple-200"
              }`}
            >
              <span className="text-2xl mb-2 block">📸</span>
              Photo
            </button>
            <button
              onClick={() => setSelectedEntryType("audio")}
              className={`p-4 rounded-xl text-center transition-all ${
                selectedEntryType === "audio"
                  ? "bg-purple-600 text-white"
                  : "bg-purple-100 text-purple-800 hover:bg-purple-200"
              }`}
            >
              <span className="text-2xl mb-2 block">🎤</span>
              Audio
            </button>
          </div>

          {/* Entry Content */}
          {selectedEntryType === "text" && (
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
                      type: "text",
                    }))
                  }
                  placeholder="I helped clean up the park by picking up trash..."
                />
              </label>
            </div>
          )}

          {selectedEntryType === "photo" && (
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
          )}

          {selectedEntryType === "audio" && (
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-4">
                {!isRecording ? (
                  <button
                    onClick={startRecording}
                    className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 flex items-center gap-2"
                  >
                    <span>🎤</span>
                    Start Recording
                  </button>
                ) : (
                  <button
                    onClick={stopRecording}
                    className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 flex items-center gap-2"
                  >
                    <span>⏹️</span>
                    Stop Recording
                  </button>
                )}
              </div>
              {submission.content && (
                <div className="mt-4">
                  <audio controls src={submission.content} className="w-full" />
                </div>
              )}
            </div>
          )}
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
