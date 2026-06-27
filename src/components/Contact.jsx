import React from 'react';
import { motion } from 'framer-motion';
import './Contact.css';
import { FiMail, FiPhone, FiDownload } from 'react-icons/fi';

const fadeSlideUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const Contact = () => {
  const handleDownloadResume = (e) => {
    e.preventDefault();
    fetch(`${import.meta.env.BASE_URL}Saurav_Kumar_Resume.pdf`)
      .then((response) => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.blob();
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'Saurav_Kumar_Resume.pdf';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      })
      .catch((error) => {
        console.error('Download failed, falling back to direct link:', error);
        window.open(`${import.meta.env.BASE_URL}Saurav_Kumar_Resume.pdf`, '_blank');
      });
  };

  return (
    <section id="contact" className="contact section">
      <motion.div
        className="container"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.h2 variants={fadeSlideUp} className="section-title">
          Get In Touch
        </motion.h2>

        <motion.p variants={fadeSlideUp} className="contact-subtitle">
          <span className="contact-tagline">
            Let's build scalable infrastructure together.
          </span>
          I'm currently looking for new opportunities. Whether you have a
          question or just want to say hi, I'll try my best to get back to you!
        </motion.p>

        <div className="contact-cards">
          {/* Email Card */}
          <motion.div
            variants={fadeSlideUp}
            className="info-card"
            whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.12)' }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <div className="info-card-icon-wrap">
              <FiMail className="info-icon" />
            </div>
            <div className="info-card-body">
              <h3>Email Me</h3>
              <a
                href="mailto:sauravkumar.rav8@gmail.com"
                className="contact-link"
              >
                sauravkumar.rav8@gmail.com
              </a>
            </div>
          </motion.div>

          {/* Phone Card */}
          <motion.div
            variants={fadeSlideUp}
            className="info-card"
            whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.12)' }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <div className="info-card-icon-wrap">
              <FiPhone className="info-icon" />
            </div>
            <div className="info-card-body">
              <h3>Call Me</h3>
              <a href="tel:+916203669911" className="contact-link">
                +91-6203669911
              </a>
            </div>
          </motion.div>
        </div>

        {/* Download Resume */}
        <motion.div
          variants={fadeSlideUp}
          className="contact-resume-wrap"
        >
          <a
            href={`${import.meta.env.BASE_URL}Saurav_Kumar_Resume.pdf`}
            onClick={handleDownloadResume}
            className="btn btn-primary"
          >
            <FiDownload /> Download Resume
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Contact;
