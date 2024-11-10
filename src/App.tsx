import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import { Helmet } from "react-helmet";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import Home from "./components/Home";
import AboutMe from "./components/AboutMe";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import ThemeSwitch from "./components/ThemeSwitch";

// Effetti di transizione a libro
const pageTurnVariants = (direction: number) => ({
  initial: { rotateX: direction === 1 ? 90 : -90, opacity: 0 },
  animate: { rotateX: 0, opacity: 1, transition: { duration: 0.8, ease: "easeInOut" } },
  exit: { rotateX: direction === 1 ? -90 : 90, opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } },
});

const App = () => {
  const [currentSection, setCurrentSection] = useState("Home");
  const [darkMode, setDarkMode] = useState(true);
  const [pageIndex, setPageIndex] = useState(0);
  const pages = ["Home", "AboutMe", "Skills", "Projects", "Contact"];
  const controls = useAnimation();

  const toggleTheme = () => setDarkMode((prevMode) => !prevMode);

  const handleScroll = useCallback(
    (e: WheelEvent) => {
      if (e.deltaY > 0 && pageIndex < pages.length - 1) {
        setPageIndex((prevIndex) => prevIndex + 1);
      } else if (e.deltaY < 0 && pageIndex > 0) {
        setPageIndex((prevIndex) => prevIndex - 1);
      }
    },
    [pageIndex, pages.length]
  );

  useEffect(() => {
    window.addEventListener("wheel", handleScroll);
    return () => window.removeEventListener("wheel", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    setCurrentSection(pages[pageIndex]);
    controls.start(pageTurnVariants(pageIndex > 0 ? 1 : -1));
  }, [pageIndex, controls]);

  useEffect(() => {
    document.body.className = darkMode ? "dark-mode" : "light-mode";
  }, [darkMode]);

  return (
    <div className="app-container">
      <Helmet>
        <title>{currentSection} | Mio Portfolio</title>
      </Helmet>
      
      {/* Switch Tema */}
      <ThemeSwitch darkMode={darkMode} toggleTheme={toggleTheme} />

      <AnimatePresence mode="wait">
        <motion.div
          key={pages[pageIndex]}
          className="section"
          variants={pageTurnVariants(pageIndex > 0 ? 1 : -1)}
          initial="initial"
          animate="animate"
          exit="exit"
          custom={pageIndex}
        >
          {pageIndex === 0 && <Home />}
          {pageIndex === 1 && <AboutMe />}
          {pageIndex === 2 && <Skills />}
          {pageIndex === 3 && <Projects />}
          {pageIndex === 4 && <Contact />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default App;