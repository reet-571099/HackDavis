import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Icon } from "../components/Icon";

const Landing = () => {
  const features = [
    {
      title: "Spin & Do!",
      description: "Get fun missions every day!",
      icon: "star",
      color: "from-yellow-400 to-yellow-500",
    },
    {
      title: "Learn & Play!",
      description: "Fun quizzes and games!",
      icon: "heart",
      color: "from-pink-400 to-pink-500",
    },
    {
      title: "Earn & Unlock!",
      description: "Get cool badges and stories!",
      icon: "crown",
      color: "from-purple-400 to-purple-500",
    },
  ];

  const avatars = [
    "boy-0",
    "girl-0",
    "boy-1",
    "girl-1",
    "boy-2",
    "girl-2",
    "boy-3",
    "girl-3",
    "boy-4",
    "girl-4",
    "boy-5",
    "girl-5",
  ];

  const testimonials = [
    {
      quote:
        "My daughter loves doing kind deeds now! She's always excited to spin the wheel.",
      author: "Sarah M.",
      avatar: "girl-0",
    },
    {
      quote:
        "The badges and stories keep my son motivated to help others. Great app!",
      author: "Michael T.",
      avatar: "boy-0",
    },
    {
      quote: "We do the missions together as a family. It's brought us closer!",
      author: "Lisa K.",
      avatar: "girl-1",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 via-pink-100 to-purple-100 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Floating Stars */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          >
            <Icon name="star" type="ui" size="md" className="text-yellow-400" />
          </motion.div>
        ))}

        {/* Floating Hearts */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -15, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          >
            <Icon name="heart" type="ui" size="md" className="text-pink-400" />
          </motion.div>
        ))}
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Icon
                name="star"
                type="ui"
                size="lg"
                className="text-purple-600"
              />
              <span className="text-2xl font-bold text-purple-600">
                Kindness Quest
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/about"
                className="text-gray-600 hover:text-purple-600 hover:scale-110 transition-transform"
              >
                About
              </Link>
              <Link to="/signup" className="btn-primary animate-bounce">
                Start
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center mb-8"
          >
            <div className="grid grid-cols-6 gap-2">
              {avatars.slice(0, 6).map((avatar, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="w-16 h-16"
                >
                  <Icon name={avatar as any} type="avatar" size="xl" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl font-bold text-purple-800 mb-8 rainbow-text"
          >
            Spin. Do. Learn. Grow!
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Link
              to="/signup"
              className="btn-primary text-2xl px-12 py-6 animate-pulse"
            >
              Start Your Journey!
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
                className={`bg-gradient-to-br ${feature.color} rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all`}
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-4xl mb-4"
                >
                  <Icon name={feature.icon as any} type="ui" size="xl" />
                </motion.div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-white/90">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-purple-800 mb-12">
            What Families Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mr-4">
                    <Icon
                      name={testimonial.avatar as any}
                      type="avatar"
                      size="md"
                    />
                  </div>
                  <span className="font-semibold text-purple-700">
                    {testimonial.author}
                  </span>
                </div>
                <p className="text-gray-600 italic">"{testimonial.quote}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 text-center">
        <motion.p
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-purple-600 text-lg"
        >
          Made with ❤️ for young heroes
        </motion.p>
      </footer>
    </div>
  );
};

export default Landing;
