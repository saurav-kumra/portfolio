import React from 'react';
import { motion } from 'framer-motion';
import './Contact.css';
import { FiMail, FiMapPin, FiDownload } from 'react-icons/fi';

const fadeSlideUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const Contact = () => {
  return (
    <section id="contact" className="contact section">
      <motion.div 
        className="container"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.h2 variants={fadeSlideUp} className="section-title">Get In Touch</motion.h2>
        <motion.p variants={fadeSlideUp} className="contact-subtitle text-center">
          <span style={{ fontSize: '1.2rem', color: 'var(--primary)', display: 'block', marginBottom: '1rem', fontWeight: 500 }}>
            Let's build scalable infrastructure together.
          </span>
          I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
        </motion.p>

        <div className="contact-cards">
          <motion.div variants={fadeSlideUp} className="info-card glass">
            <a href="mailto:sauravkumar.rav8@gmail.com" aria-label="Email Me">
              <FiMail className="info-icon" />
            </a>
            <div>
              <h3>Email Me</h3>
              <p>
                <a href="mailto:sauravkumar.rav8@gmail.com" className="contact-link">
                  sauravkumar.rav8@gmail.com
                </a>
              </p>
            </div>
          </motion.div>
          
          <motion.div variants={fadeSlideUp} className="info-card glass">
            <FiMapPin className="info-icon" />
            <div>
              <h3>Location</h3>
              <p>Ahmedabad, Gujarat 380009, India</p>
            </div>
          </motion.div>
        </div>

        <motion.div variants={fadeSlideUp} style={{ display: 'flex', justifyContent: 'center', marginTop: '3rem' }}>
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FiDownload /> Download Resume
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Contact;
