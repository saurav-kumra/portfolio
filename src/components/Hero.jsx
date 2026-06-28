import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { BsGithub, BsLinkedin } from 'react-icons/bs';
import { MdEmail } from 'react-icons/md';
import { FiDownload } from 'react-icons/fi';
import { SiDocker, SiKubernetes, SiJenkins, SiTerraform, SiLinux } from 'react-icons/si';
import { FaAws } from 'react-icons/fa';
import avatar from '../assets/hero.png';
import TiltCard from './TiltCard';
import './Hero.css';

/* ─── Orbiting DevOps Icons Component ───────────────────────────────── */
const OrbitingIcons = () => {
  const iconRefs = useRef([]);
  const [radiusX, setRadiusX] = useState(220);
  const [radiusY, setRadiusY] = useState(80);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 480) {
        setRadiusX(120);
        setRadiusY(40);
      } else if (window.innerWidth < 768) {
        setRadiusX(160);
        setRadiusY(55);
      } else if (window.innerWidth < 1024) {
        setRadiusX(180);
        setRadiusY(65);
      } else {
        setRadiusX(220);
        setRadiusY(80);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const icons = [
    { component: <FaAws color="#FF9900" />, name: 'AWS' },
    { component: <SiDocker color="#2496ED" />, name: 'Docker' },
    { component: <SiKubernetes color="#326CE5" />, name: 'Kubernetes' },
    { component: <SiJenkins color="#D24939" />, name: 'Jenkins' },
    { component: <BsGithub color="#181717" />, name: 'GitHub' },
    { component: <SiTerraform color="#7B42BC" />, name: 'Terraform' },
    { component: <SiLinux color="#FCC624" />, name: 'Linux' }
  ];

  useEffect(() => {
    let animationFrameId;
    let angle = 0;
    const speed = 0.005;
    const depth = 110;

    const updatePositions = () => {
      angle += speed;
      icons.forEach((_, idx) => {
        const el = iconRefs.current[idx];
        if (!el) return;

        const offset = (idx * 2 * Math.PI) / icons.length;
        const theta = angle + offset;

        const x = radiusX * Math.cos(theta);
        const y = radiusY * Math.sin(theta);
        const z = depth * Math.sin(theta);

        const scale = 0.75 + 0.25 * (z / depth);
        const opacity = 0.45 + 0.55 * ((z + depth) / (2 * depth));
        const zIndex = z > 0 ? 3 : 1;

        el.style.transform = `translate3d(${x}px, ${y}px, ${z}px) scale(${scale})`;
        el.style.opacity = opacity;
        el.style.zIndex = zIndex;
      });

      animationFrameId = requestAnimationFrame(updatePositions);
    };

    updatePositions();
    return () => cancelAnimationFrame(animationFrameId);
  }, [radiusX, radiusY]);

  return (
    <div className="orbit-container">
      {icons.map((icon, idx) => (
        <div
          key={idx}
          ref={el => (iconRefs.current[idx] = el)}
          className="orbit-icon-wrapper"
        >
          <div className="orbit-icon-card" title={icon.name}>
            {icon.component}
          </div>
        </div>
      ))}
    </div>
  );
};

/* ─── Subtle Floating Background Particles Component ────────────────── */
const Particles = () => {
  const count = 20;
  return (
    <div className="hero-particles">
      {Array.from({ length: count }).map((_, i) => {
        const size = Math.random() * 3 + 2;
        const delay = Math.random() * 8;
        const duration = Math.random() * 12 + 8;
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        return (
          <div
            key={i}
            className="hero-particle"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${left}%`,
              top: `${top}%`,
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`
            }}
          />
        );
      })}
    </div>
  );
};

const Hero = () => {
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
        
        <motion.div 
          className="hero-graphic"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Glowing Animated SaaS Aura */}
          <div className="glow-ring"></div>
          
          {/* Floating background particles */}
          <Particles />
          
          {/* Orbiting Icons */}
          <OrbitingIcons />
          
          {/* Avatar with 3D Tilt Card wrapper */}
          <TiltCard
            className="avatar-wrapper tilt-card"
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 7, ease: 'easeInOut', repeat: Infinity }}
          >
            <img src={avatar} alt="DevOps Engineer" className="avatar-img" />
          </TiltCard>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
