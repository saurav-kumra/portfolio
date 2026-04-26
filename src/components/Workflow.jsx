import React from 'react';
import { motion } from 'framer-motion';
import { FaGitAlt, FaAws } from 'react-icons/fa';
import { SiJenkins, SiDocker, SiKubernetes } from 'react-icons/si';
import { FiArrowRight } from 'react-icons/fi';
import './Workflow.css';

const fadeSlideUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const pulseGlow = {
  initial: { opacity: 0.3, scale: 0.95 },
  animate: { 
    opacity: [0.3, 1, 0.3], 
    scale: [0.95, 1.05, 0.95],
    transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
  }
};

const Workflow = () => {
  const steps = [
    { name: 'Git', icon: <FaGitAlt />, color: '#4A4A4A' },
    { name: 'Jenkins', icon: <SiJenkins />, color: '#4A4A4A' },
    { name: 'Docker', icon: <SiDocker />, color: '#4A4A4A' },
    { name: 'Kubernetes', icon: <SiKubernetes />, color: '#4A4A4A' },
    { name: 'AWS', icon: <FaAws />, color: '#4A4A4A' }
  ];

  return (
    <section id="workflow" className="workflow section">
      <motion.div 
        className="container"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.h2 variants={fadeSlideUp} className="section-title">Deployment Pipeline</motion.h2>
        <motion.div variants={fadeSlideUp} className="workflow-container glass">
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              <motion.div 
                className="workflow-node"
                whileHover={{ y: -5, scale: 1.1 }}
              >
                <div className="workflow-icon" style={{ color: step.color }}>
                  {step.icon}
                </div>
                <span className="workflow-name">{step.name}</span>
              </motion.div>
              {index < steps.length - 1 && (
                <motion.div className="workflow-arrow" variants={pulseGlow} initial="initial" animate="animate">
                  <FiArrowRight />
                </motion.div>
              )}
            </React.Fragment>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Workflow;
