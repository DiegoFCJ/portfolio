import { useState, useEffect, useCallback, useMemo } from "react";
import "./App.css";
import { Helmet } from "react-helmet";
import { motion, AnimatePresence } from "framer-motion";
import Home from "./components/Home";
import AboutMe from "./components/AboutMe";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import ThemeSwitch from "./components/ThemeSwitch";
import { MY_NAME } from "./constants/general";

// Varianti avanzate per piegatura e rotazione 3D realistica
const pageTurnVariants = (direction: number) => ({
  initial: {
    rotateX: direction > 0 ? 20 : -20,
    rotateZ: direction > 0 ? 5 : -5,
    opacity: 0,
    scale: 1,
    transformOrigin: "bottom right",  // Piegatura dall'angolo in basso a destra
    boxShadow: direction > 0 ? "5px 15px 35px rgba(0, 0, 0, 0.25)" : "-5px 15px 35px rgba(0, 0, 0, 0.25)",  // Ombra dinamica
  },
  animate: {
    rotateX: 0,
    rotateZ: 0,
    opacity: 1,
    scale: 1,
    boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)", // Ombra più morbida durante il movimento
    transition: {
      duration: 1.2,
      ease: "easeInOut",
    },
  },
  exit: {
    rotateX: direction > 0 ? -270 : 270,  // Rotazione parziale
    rotateZ: direction > 0 ? -20 : 20,    // Piega per effetto realistico
    opacity: 0,
    scale: 1,
    boxShadow: direction > 0 ? "5px 15px 50px rgba(0, 0, 0, 0.4)" : "-5px 15px 50px rgba(0, 0, 0, 0.4)",  // Ombra dinamica con maggiore intensità
    transition: {
      duration: 1.2,
      ease: "easeInOut",
    },
  },
});

const App = () => {
  const [currentSection, setCurrentSection] = useState("Home");
  const [darkMode, setDarkMode] = useState(true);
  const [pageIndex, setPageIndex] = useState(0);

  const pages = useMemo(() => ["Home", "AboutMe", "Skills", "Projects", "Contact"], []);
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
  }, [pages, pageIndex]);

  useEffect(() => {
    document.body.className = darkMode ? "dark-mode" : "light-mode";
  }, [darkMode]);

  return (
    <div className="app-container">
      <Helmet>
        <title>
          {currentSection} | {MY_NAME}'s Portfolio
        </title>
      </Helmet>

      <ThemeSwitch darkMode={darkMode} toggleTheme={toggleTheme} />

      <AnimatePresence mode="wait">
        <motion.div
          key={pages[pageIndex]}
          className="section"
          variants={pageTurnVariants(pageIndex > 0 ? 1 : -1)}
          initial="initial"
          animate="animate"
          exit="exit"
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
