import React from "react";
import { motion } from "framer-motion";
import "./styles/AboutMe.css";

const AboutMe = () => {
  return (
    <motion.section
      id="about-me"
      className="section-content"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="about-section" id="about">
        <h2>About Me</h2>
        <p>
            I'm a developer with a love for clean code and a passion for designing engaging user experiences.
            Take a look at some of my projects below to see what I've been working on!
        </p>
    </div>
    </motion.section>
  );
};

export default AboutMe;
