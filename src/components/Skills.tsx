import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getReadme, extractSection } from "../services/githubService"; // Assicurati che questo percorso sia corretto
import "./styles/Skills.css";

// Definisci un'interfaccia per tipizzare i dati delle sezioni
interface Section {
  title: string;
  skills: string[];
}

const Skills = () => {
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReadme = async () => {
      try {
        const { readme } = await getReadme();
        console.log("Contenuto del README:", readme);

        // Imposta le sezioni con i titoli e le competenze
        setSections([
          { title: "Languages & Frameworks", skills: extractSection(readme, "Languages & Frameworks") },
          { title: "Front-end", skills: extractSection(readme, "Front-end") },
          { title: "Back-end", skills: extractSection(readme, "Back-end") },
          { title: "Databases", skills: extractSection(readme, "Databases") },
          { title: "Tools & Platforms", skills: extractSection(readme, "Tools & Platforms") },
          { title: "Versioning", skills: extractSection(readme, "Versioning") },
          { title: "Project Management & Collaboration", skills: extractSection(readme, "Project Management & Collaboration") },
          { title: "Other Tools", skills: extractSection(readme, "Other Tools") },
        ]);
      } catch (err) {
        console.error("Errore durante il caricamento del README:", err);
        setError("Errore durante il caricamento del README.");
      } finally {
        setLoading(false);
      }
    };

    fetchReadme();
  }, []);

  return (
    <motion.section
      id="skills"
      className="section-content"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <h2>Tech Stack</h2>
      
      {error && <p className="error-message">{error}</p>}
      {loading ? (
        <p>Loading skills...</p>
      ) : (
        <div>
          {sections.map((section) => (
            <div key={section.title} className="skill-section">
              <h3>{section.title}</h3>
              <ul className="badge-list">
                {section.skills.map((skill) => (
                  <li key={skill} className="badge">{skill}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </motion.section>
  );
};

export default Skills;
