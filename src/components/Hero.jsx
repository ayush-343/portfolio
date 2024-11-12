'use client'

import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

const Hero = ({ darkMode }) => {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const words = ["Ayush Srivastava", "a Web Developer", "a DSA Enthusiast"];
  const controls = useAnimation();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCurrentText(words[currentIndex].slice(0, currentText.length + 1));
      
      if (currentText === words[currentIndex]) {
        setTimeout(() => {
          controls.start({ opacity: 0 }).then(() => {
            setCurrentText("");
            setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
            controls.start({ opacity: 1 });
          });
        }, 1000);
      }
    }, 100);

    return () => clearTimeout(timeout);
  }, [currentText, currentIndex, words, controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  return (
    <section className={`h-screen w-full flex items-center justify-center ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      <motion.div
        className="text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 
          className="text-5xl sm:text-7xl font-extrabold mb-6"
          variants={itemVariants}
        >
          <span className={`bg-clip-text text-transparent ${darkMode ? 'bg-gradient-to-r from-blue-300 via-blue-500 to-blue-700' : 'bg-gradient-to-r from-blue-400 via-blue-600 to-blue-800'}`}>
            Hi, I'm{" "}
          </span>
          <motion.span
            animate={controls}
            className={`bg-clip-text text-transparent ${darkMode ? 'bg-gradient-to-r from-blue-200 via-blue-400 to-blue-600' : 'bg-gradient-to-r from-blue-300 via-blue-500 to-blue-700'}`}
          >
            {currentText}
          </motion.span>
        </motion.h1>
        <motion.p
          variants={itemVariants}
          className={`text-xl sm:text-2xl ${darkMode ? "text-gray-300" : "text-gray-600"} mb-8 max-w-2xl mx-auto`}
        >
          Passionate about creating stunning web experiences that leave a lasting impression.
        </motion.p>
        <motion.div
          variants={itemVariants}
          className={`text-lg sm:text-xl ${darkMode ? "text-blue-300" : "text-blue-500"}`}
        >
          Scroll down to explore my work
        </motion.div>
        <motion.div
          variants={itemVariants}
          animate={{
            y: [0, 10, 0],
            transition: {
              duration: 1.5,
              repeat: Infinity,
              repeatType: "reverse",
            },
          }}
          className="mt-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`mx-auto ${darkMode ? "text-blue-300" : "text-blue-500"}`}
          >
            <path d="M12 5v14" />
            <path d="m19 12-7 7-7-7" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;