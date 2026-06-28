import React from 'react';
import { motion } from 'framer-motion';
import TiltCard from './TiltCard';
import './Skills.css';
import { 
  SiJenkins, SiGithubactions, SiLinux,
  SiDocker, SiKubernetes, SiHelm,
  SiPrometheus, SiGrafana, SiPython,
  SiGit, SiGithub, SiArgo, SiSonar,
  SiTerraform, SiGo, SiGnubash
} from 'react-icons/si';
import { FaAws } from 'react-icons/fa';

const skillsData = [
  {
    category: 'Cloud & OS',
    items: [
      { name: 'AWS', icon: <FaAws color="#FF9900" /> },
      { name: 'Linux (RHEL)', icon: <SiLinux color="#FCC624" /> },
      { name: 'Terraform', icon: <SiTerraform color="#7B42BC" /> }
    ]
  },
  {
    category: 'Containers & CI/CD',
    items: [
      { name: 'Docker', icon: <SiDocker color="#2496ED" /> },
      { name: 'Kubernetes', icon: <SiKubernetes color="#326CE5" /> },
      { name: 'Helm', icon: <SiHelm color="#0F1689" /> },
      { name: 'GitHub Actions', icon: <SiGithubactions color="#2088FF" /> },
      { name: 'Jenkins', icon: <SiJenkins color="#D24939" /> },
      { name: 'ArgoCD', icon: <SiArgo color="#EF7B4D" /> },
      { name: 'SonarQube', icon: <SiSonar color="#519A8F" /> }
    ]
  },
  {
    category: 'Monitoring & Alerting',
    items: [
      { name: 'Prometheus', icon: <SiPrometheus color="#E6522C" /> },
      { name: 'Grafana', icon: <SiGrafana color="#F47A20" /> },
      { name: 'CloudWatch', icon: <FaAws color="#FF4F8B" /> },
      { name: 'SNS', icon: <FaAws color="#FF9900" /> }
    ]
  },
  {
    category: 'Languages',
    items: [
      { name: 'Python', icon: <SiPython color="#3776AB" /> },
      { name: 'Go', icon: <SiGo color="#00ADD8" /> },
      { name: 'Bash', icon: <SiGnubash color="#4EAA25" /> },
      { name: 'Shell Scripting', icon: <SiGnubash color="#4EAA25" /> }
    ]
  },
  {
    category: 'Version Control',
    items: [
      { name: 'Git', icon: <SiGit color="#F05032" /> },
      { name: 'GitHub', icon: <SiGithub color="#181717" /> }
    ]
  }
];

const fadeSlideUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const Skills = () => {
  return (
    <section id="skills" className="skills section">
      <motion.div 
        className="container"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.h2 variants={fadeSlideUp} className="section-title">Technical Skills</motion.h2>
        
        <div className="skills-grid grid">
          {skillsData.map((skillGroup, index) => (
            <TiltCard
              key={index}
              className={`skill-card glass ${skillGroup.highlight ? 'primary-card' : ''}`}
              variants={fadeSlideUp}
              whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(14, 165, 233, 0.1)' }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <h3 className="skill-category">{skillGroup.category}</h3>
              <div className="skill-items">
                {skillGroup.items.map((item, idx) => (
                  <div key={idx} className="skill-badge">
                    <span className="skill-icon">{item.icon}</span>
                    <span className="skill-name">{item.name}</span>
                  </div>
                ))}
              </div>
            </TiltCard>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Skills;
