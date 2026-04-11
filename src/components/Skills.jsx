import React from 'react';
import './Skills.css';
import { 
  SiGooglecloud, SiJenkins, SiGithubactions,
  SiDocker, SiKubernetes, SiTerraform, SiAnsible,
  SiPython, SiGnubash, SiGo, SiPrometheus, SiGrafana, SiElasticsearch
} from 'react-icons/si';
import { FaAws } from 'react-icons/fa';

const skillsData = [
  {
    category: 'Cloud Platforms',
    items: [
      { name: 'AWS', icon: <FaAws /> },
      { name: 'GCP', icon: <SiGooglecloud /> }
    ]
  },
  {
    category: 'CI/CD Tools',
    items: [
      { name: 'Jenkins', icon: <SiJenkins /> },
      { name: 'GitHub Actions', icon: <SiGithubactions /> }
    ]
  },
  {
    category: 'Containerization & Orchestration',
    items: [
      { name: 'Docker', icon: <SiDocker /> },
      { name: 'Kubernetes', icon: <SiKubernetes /> }
    ]
  },
  {
    category: 'Infrastructure as Code',
    items: [
      { name: 'Terraform', icon: <SiTerraform /> },
      { name: 'Ansible', icon: <SiAnsible /> }
    ]
  },
  {
    category: 'Scripting & Programming',
    items: [
      { name: 'Python', icon: <SiPython /> },
      { name: 'Bash', icon: <SiGnubash /> },
      { name: 'Go', icon: <SiGo /> }
    ]
  },
  {
    category: 'Monitoring & Logging',
    items: [
      { name: 'Prometheus', icon: <SiPrometheus /> },
      { name: 'Grafana', icon: <SiGrafana /> },
      { name: 'ELK Stack', icon: <SiElasticsearch /> }
    ]
  }
];

const Skills = () => {
  return (
    <section id="skills" className="skills section">
      <div className="container">
        <h2 className="section-title">Technical Skills</h2>
        
        <div className="skills-grid grid">
          {skillsData.map((skillGroup, index) => (
            <div key={index} className="skill-card glass">
              <h3 className="skill-category">{skillGroup.category}</h3>
              <div className="skill-items">
                {skillGroup.items.map((item, idx) => (
                  <div key={idx} className="skill-badge">
                    <span className="skill-icon">{item.icon}</span>
                    <span className="skill-name">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
