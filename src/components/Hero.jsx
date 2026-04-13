import React from 'react';
import { motion } from 'framer-motion';
import { BsGithub, BsLinkedin } from 'react-icons/bs';
import { MdEmail } from 'react-icons/md';
import { FiDownload } from 'react-icons/fi';
import { SiDocker, SiKubernetes } from 'react-icons/si';
import { FaAws } from 'react-icons/fa';
import avatar from '../assets/hero.png';
import './Hero.css';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Slide up staggering for text
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 12 }
    }
  };

  const floatVariants = {
    animate: (delay) => ({
      y: [0, -15, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: delay
      }
    })
  };

  return (
    <section id="home" className="hero section">
      <div className="container hero-container grid">
        <motion.div 
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.p variants={itemVariants} className="hero-subtitle mono highlight">Hello, World! I am</motion.p>
          <motion.h1 variants={itemVariants} className="hero-title">Saurav Kumar</motion.h1>
          <motion.div variants={itemVariants} className="availability-badge">
            <span className="status-dot"></span> Open to DevOps Internships & Entry-Level Roles
          </motion.div>
          <motion.h2 variants={itemVariants} className="hero-role">DevOps Engineer | AWS Certified | CI/CD & Kubernetes Enthusiast</motion.h2>
          
          <motion.p variants={itemVariants} className="hero-description">
            Passionate about building scalable infrastructure, automating CI/CD pipelines, and mastering cloud architectures. Currently turning coffee into flawless deployments and resilient systems.
          </motion.p>
          
          <motion.div variants={itemVariants} className="hero-cta">
            <motion.a 
              href="#projects" 
              className="btn btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Projects
            </motion.a>
            <motion.a 
              href="/resume.pdf" 
              className="btn btn-outline" 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiDownload /> Resume
            </motion.a>
          </motion.div>

          <motion.div variants={itemVariants} className="trust-indicators">
            <div className="trust-badge"><FaAws className="trust-icon" /> AWS Certified</div>
            <div className="trust-badge"><SiDocker className="trust-icon" /> Docker Certified</div>
            <div className="trust-badge"><SiKubernetes className="trust-icon" /> Kubernetes (CKAD)</div>
          </motion.div>
          
          <motion.div variants={itemVariants} className="hero-socials">
            <a href="https://github.com/saurav-kumra" target="_blank" rel="noopener noreferrer"><BsGithub /></a>
            <a href="https://www.linkedin.com/in/sauravkumar0907/" target="_blank" rel="noopener noreferrer"><BsLinkedin /></a>
            <a href="mailto:sauravkumar.rav8@gmail.com"><MdEmail /></a>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="hero-graphic"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="glass-shape active-pulse"></div>
          
          <motion.div 
            className="floating-icon docker-float"
            variants={floatVariants}
            animate="animate"
            custom={0}
          >
            <SiDocker />
          </motion.div>
          
          <motion.div 
            className="floating-icon k8s-float"
            variants={floatVariants}
            animate="animate"
            custom={1.5}
          >
            <SiKubernetes />
          </motion.div>
          
          <motion.div 
            className="floating-icon aws-float"
            variants={floatVariants}
            animate="animate"
            custom={0.8}
          >
            <FaAws />
          </motion.div>
          
          <motion.div 
            className="avatar-wrapper"
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 7, ease: "easeInOut", repeat: Infinity }}
          >
            <img src={avatar} alt="DevOps Engineer" className="avatar-img" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
