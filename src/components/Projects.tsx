import React from "react";
import { motion } from "framer-motion";

const Projects = () => {
  return (
    <motion.section
      id="projects"
      className="section-content"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <h2>Progetti</h2>
      <p>Mostra i tuoi progetti principali.</p>
    </motion.section>
  );
};

export default Projects;
