import React from "react";
import { motion } from "framer-motion";
import { Project } from "../dtos/ProjectDTO";
import "./styles/Projects.css";

const projects: Project[] = [
  {
    title: 'Micro Games',
    description: 'A collection of simple games built using various technologies. Key Features: Multiple mini-games designed to challenge players. Interactive UI with responsive design. Easy to extend with new games and features.',
    image: 'https://github.com/DiegoFCJ/MicroGames/blob/master/overview/loggedPage.png?raw=true',
    link: 'https://github.com/DiegoFCJ/MicroGames'
  },
  {
    title: 'Self',
    description: 'This project provides tools for tracking goals and progress, focusing on self-improvement and productivity through an intuitive interface. Users can add plugins for enhanced functionality. Key Features: Goal tracking and visualization User-friendly task management dashboard Optimized with modern web technologies',
    image: 'https://github.com/DiegoFCJ/self/blob/master/self.png?raw=true',
    link: 'https://github.com/DiegoFCJ/self'
  },
  {
    title: 'E-commerce',
    description: 'This repository serves as the foundation for an e-commerce application, providing essential features and structure for building a robust online shopping platform.',
    image: 'https://github.com/DiegoFCJ/E-commerce/blob/master/overview/homeSideDash.png?raw=true',
    link: 'https://github.com/DiegoFCJ/E-commerce'
  }
];

const Projects: React.FC = () => {
  return (
    <motion.section
      id="projects"
      className="section-content"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="projects-section">
        <h2>Featured Projects</h2>
        <div className="project-cards">
          {projects.map((project, index) => (
            <div className="project-card" key={index}>
              <h3>{project.title}</h3>
              <img src={project.image} alt=""/>
              <p>{project.description}</p>
              <a href={project.link} target="_blank" rel="noopener noreferrer">View Project</a>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Projects;