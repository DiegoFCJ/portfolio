import React from "react";
import { motion } from "framer-motion";

const AboutMe = () => {
  return (
    <motion.section
      id="about-me"
      className="section-content"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <h2>About Me</h2>
      <p>Questa è la sezione "Chi sono". Racconta un po' su di te.</p>
    </motion.section>
  );
};

export default AboutMe;
