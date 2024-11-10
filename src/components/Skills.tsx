import React from "react";
import { motion } from "framer-motion";

const Skills = () => {
  return (
    <motion.section
      id="skills"
      className="section-content"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <h2>Skills</h2>
      <p>Elenca le tue competenze.</p>
    </motion.section>
  );
};

export default Skills;
