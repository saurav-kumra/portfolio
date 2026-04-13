import React from 'react';
import { motion } from 'framer-motion';
import './Skills.css';
import { 
  SiJenkins, SiGithubactions, SiLinux,
  SiDocker, SiKubernetes, SiTerraform,
  SiGnubash, SiPrometheus, SiGrafana, SiElasticsearch
} from 'react-icons/si';
import { FaAws } from 'react-icons/fa';

const skillsData = [
  {
    category: 'Primary Skills',
    highlight: true,
    items: [
      { name: 'AWS', icon: <FaAws /> },
      { name: 'Docker', icon: <SiDocker /> },
      { name: 'Kubernetes', icon: <SiKubernetes /> },
      { name: 'Terraform', icon: <SiTerraform /> }
    ]
  },
  {
    category: 'Secondary Skills',
    items: [
      { name: 'Jenkins', icon: <SiJenkins /> },
      { name: 'GitHub Actions', icon: <SiGithubactions /> },
      { name: 'Linux', icon: <SiLinux /> },
      { name: 'Bash', icon: <SiGnubash /> }
    ]
  },
  {
    category: 'Monitoring Tools',
    items: [
      { name: 'Prometheus', icon: <SiPrometheus /> },
      { name: 'Grafana', icon: <SiGrafana /> },
      { name: 'ELK Stack', icon: <SiElasticsearch /> }
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
            <motion.div 
              key={index} 
              variants={fadeSlideUp} 
              className={`skill-card glass ${skillGroup.highlight ? 'primary-card' : ''}`}
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
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Skills;
