import React from 'react'; // Trigger build
import { motion } from 'framer-motion';
import { BsGithub, BsLinkedin } from 'react-icons/bs';
import { MdEmail } from 'react-icons/md';
import { FiDownload } from 'react-icons/fi';
import { SiDocker, SiKubernetes } from 'react-icons/si';
import { FaAws } from 'react-icons/fa';
import devopsHero from '../assets/devops-hero.png';
import PlayButton from './PlayButton';
import './Hero.css';

const TicTacToe = React.lazy(() => import('./TicTacToe'));

const Hero = () => {
  const [isGameActive, setIsGameActive] = React.useState(false);
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
              href={`${import.meta.env.BASE_URL}Saurav_Kumar_Resume.pdf`}
              onClick={handleDownloadResume}
              className="btn btn-outline" 
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
        
        <div className="hero-graphic">
          <div className="hero-graphic-container">
            <img src={devopsHero} alt="DevOps Illustration" className="hero-static-img" />
            {!isGameActive && <PlayButton onClick={() => setIsGameActive(true)} />}
            {isGameActive && (
              <React.Suspense fallback={null}>
                <TicTacToe onClose={() => setIsGameActive(false)} />
              </React.Suspense>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
