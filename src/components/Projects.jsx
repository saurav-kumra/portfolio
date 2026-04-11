import React from 'react';
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

const Projects = () => {
  return (
    <section id="projects" className="projects section">
      <div className="container">
        <h2 className="section-title">Featured Projects</h2>
        
        <div className="projects-grid grid">
          {projectsData.map((project, index) => (
            <div key={project.id} className={`project-card glass fade-in-up delay-${(index % 5) + 1}`}>
              <div className="project-header">
                <FiFolder className="folder-icon animate-float" />
                <div className="project-links">
                  {project.githubLinks && (
                    <a href={project.githubLinks} target="_blank" rel="noopener noreferrer">
                      <FiGithub />
                    </a>
                  )}
                  {project.liveLink && (
                    <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                      <FiExternalLink />
                    </a>
                  )}
                </div>
              </div>
              
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>
              
              <ul className="project-tech-list mono">
                {project.techStack.map((tech, idx) => (
                  <li key={idx}>{tech}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
