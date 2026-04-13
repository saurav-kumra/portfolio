import React from 'react';
import { motion } from 'framer-motion';
import './Projects.css';
import { FiGithub, FiExternalLink, FiFolder } from 'react-icons/fi';

const projectsData = [
  {
    id: 1,
    title: 'E-Commerce CI/CD Pipeline',
    description: 'Automated deployment pipeline for a microservices-based e-commerce platform using Jenkins, Docker, and Kubernetes. Reduced deployment time by 40%.',
    techStack: ['Jenkins', 'Docker', 'Kubernetes', 'Helm'],
    githubLinks: 'https://github.com/saurav-kumra',
    liveLink: ''
  },
  {
    id: 2,
    title: 'AWS Infrastructure as Code',
    description: 'Provisioned a highly available AWS infrastructure using Terraform. Includes VPC, EC2 Auto Scaling, RDS, and Application Load Balancer.',
    techStack: ['Terraform', 'AWS', 'Bash'],
    githubLinks: 'https://github.com/saurav-kumra',
    liveLink: ''
  },
  {
    id: 3,
    title: 'Microservices Monitoring Stack',
    description: 'Implemented a centralized monitoring and logging stack using Prometheus, Grafana, and ELK stack to track application performance and detect anomalies.',
    techStack: ['Prometheus', 'Grafana', 'ELK', 'Docker'],
    githubLinks: 'https://github.com/saurav-kumra',
    liveLink: 'https://example.com'
  },
  {
    id: 4,
    title: 'Serverless Data Processing',
    description: 'Event-driven architecture using AWS Lambda and S3 to automatically process uploaded data files, utilizing GitHub Actions for continuous delivery.',
    techStack: ['AWS Lambda', 'Python', 'GitHub Actions'],
    githubLinks: 'https://github.com/saurav-kumra',
    liveLink: ''
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
    transition: { staggerChildren: 0.15 }
  }
};

const Projects = () => {
  return (
    <section id="projects" className="projects section">
      <motion.div 
        className="container"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <motion.h2 variants={fadeSlideUp} className="section-title">Featured Projects</motion.h2>
        
        <div className="projects-grid grid">
          {projectsData.map((project, index) => (
            <motion.div 
              key={project.id} 
              variants={fadeSlideUp} 
              className="project-card glass"
              whileHover={{ y: -10, boxShadow: '0 15px 30px rgba(14, 165, 233, 0.15)' }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="project-header">
                <FiFolder className="folder-icon animate-float" />
                <div className="project-links">
                  {project.liveLink && (
                    <a href={project.liveLink} target="_blank" rel="noopener noreferrer" aria-label="Live Demo">
                      <FiExternalLink />
                    </a>
                  )}
                </div>
              </div>
              
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>
              
              <ul className="project-tech-list mono">
                {project.techStack.map((tech, idx) => (
                  <li key={idx} className="tech-badge">{tech}</li>
                ))}
              </ul>

              {project.githubLinks && (
                <div className="project-footer">
                  <a href={project.githubLinks} target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ display: 'inline-flex', width: '100%', justifyContent: 'center' }}>
                    <FiGithub /> View on GitHub
                  </a>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Projects;
