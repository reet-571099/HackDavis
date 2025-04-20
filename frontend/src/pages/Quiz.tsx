import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { StarIcon, ArrowPathIcon } from "@heroicons/react/24/solid";

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation?: string;
  imageUrl?: string;
}

interface Quiz {
  id: string;
  category: string;
  questions: QuizQuestion[];
}

const sampleQuiz: Quiz = {
  id: "kindness-quiz-1",
  category: "Kindness",
  questions: [
    {
      question: "What should you do if you see someone crying?",
      options: [
        "Ignore them",
        "Ask if they're okay",
        "Laugh at them",
        "Walk away",
      ],
      correctAnswerIndex: 1,
      explanation: "It's kind to show care and ask how someone is feeling!",
    },
    {
      question: "Your friend forgot their lunch. What's the kind thing to do?",
      options: [
        "Share your food",
        "Tell them to buy lunch",
        "Eat in front of them",
        "Ignore them",
      ],
      correctAnswerIndex: 0,
      explanation: "Sharing is a great way to show kindness!",
    },
    // Add more questions as needed
  ],
};

const Quiz = () => {
  const navigate = useNavigate();
  const [quiz] = useState<Quiz>(sampleQuiz);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const currentQuestion = quiz.questions[currentIndex];
  const isLastQuestion = currentIndex === quiz.questions.length - 1;

  const handleAnswerSelect = (index: number) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(index);
    if (index === currentQuestion.correctAnswerIndex) {
      setCorrectCount((prev) => prev + 1);
    }
    setShowFeedback(true);
  };

  const handleNext = () => {
    if (isLastQuestion) {
      setQuizCompleted(true);
    } else {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setCorrectCount(0);
    setShowFeedback(false);
    setQuizCompleted(false);
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

  if (quizCompleted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-2xl p-8 shadow-lg max-w-md w-full text-center"
        >
          <h1 className="text-3xl font-bold mb-4">🎉 You finished the quiz!</h1>
          <div className="flex justify-center mb-6">
            <StarIcon className="w-12 h-12 text-yellow-400" />
          </div>
          <p className="text-xl mb-4">
            You got {correctCount} out of {quiz.questions.length} right!
          </p>
          <p className="text-lg mb-6">+{correctCount * 2} Stars</p>
          <div className="space-y-3">
            <button
              onClick={() => navigate("/")}
              className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Back to Home
            </button>
            <button
              onClick={handleRestart}
              className="w-full bg-purple-100 text-purple-600 py-3 rounded-lg hover:bg-purple-200 transition-colors flex items-center justify-center gap-2"
            >
              <ArrowPathIcon className="w-5 h-5" />
              Try a New Quiz
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 py-8 px-4 relative overflow-hidden">
      <FloatingElements />
      <div className="max-w-2xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">
              Question {currentIndex + 1} of {quiz.questions.length}
            </span>
            <span className="text-sm font-medium text-purple-600">
              {correctCount} correct
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <motion.div
              className="bg-purple-600 h-2.5 rounded-full"
              initial={{ width: 0 }}
              animate={{
                width: `${((currentIndex + 1) / quiz.questions.length) * 100}%`,
              }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Question Card */}
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-6 shadow-lg mb-6"
        >
          <h2 className="text-2xl font-bold mb-4">
            {currentQuestion.question}
          </h2>

          {/* Options */}
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAnswerSelect(index)}
                disabled={selectedAnswer !== null}
                className={`w-full p-4 rounded-xl text-left transition-colors ${
                  selectedAnswer === null
                    ? "bg-purple-50 hover:bg-purple-100"
                    : index === currentQuestion.correctAnswerIndex
                    ? "bg-green-100 text-green-800"
                    : selectedAnswer === index
                    ? "bg-red-100 text-red-800"
                    : "bg-gray-50"
                }`}
              >
                {option}
              </motion.button>
            ))}
          </div>

          {/* Feedback */}
          {showFeedback && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-4 rounded-xl bg-purple-50"
            >
              <p className="text-purple-800">
                {selectedAnswer === currentQuestion.correctAnswerIndex
                  ? "You got it! Helping makes hearts happy 💛"
                  : `Hmm... not quite. ${currentQuestion.explanation}`}
              </p>
              <button
                onClick={handleNext}
                className="mt-4 w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
              >
                {isLastQuestion ? "Finish Quiz" : "Next Question →"}
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Quiz;
