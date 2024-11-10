import { useEffect } from "react";

const useSectionObserver = (setCurrentSection: (section: string) => void) => {
  useEffect(() => {
    const sections = document.querySelectorAll(".section");
    const options = {
      threshold: 0.7, // Mostra il 70% della sezione per attivare il callback
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setCurrentSection(entry.target.id);
        }
      });
    }, options);

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [setCurrentSection]);
};

export default useSectionObserver;
