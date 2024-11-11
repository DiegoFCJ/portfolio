import React from "react";
import { motion } from "framer-motion";

const Contact = () => {
  return (
    <motion.section
      id="contact"
      className="section-content"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <h2>Contattami</h2>
      <p>Le informazioni per metterti in contatto con me.</p>
    </motion.section>
  );
};

export default Contact;
