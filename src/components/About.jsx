import React from 'react';
import './About.css';
import { SiDocker, SiKubernetes, SiTerraform } from 'react-icons/si';
import { FaAws } from 'react-icons/fa';

const About = () => {
  return (
    <section id="about" className="about section">
      <div className="container">
        <h2 className="section-title">About Me</h2>
        
        <div className="about-grid grid">
          <div className="about-content fade-in-up delay-1">
            <p>
              Hello! My journey into tech started with curiosity about how large-scale systems stay online. This led me to the fascinating world of <strong>DevOps and Cloud Computing</strong>.
            </p>
            <p>
              I am a dedicated student mapping the bridge between software development and IT operations. I specialize in designing robust CI/CD pipelines, provisioning infrastructure as code, and containerizing distributed applications to ensure they run smoothly from local development to production.
            </p>

            
            <div className="about-stats">
              <div className="stat glass">
                <h3>3+</h3>
                <p>Cloud Projects</p>
              </div>
              <div className="stat glass">
                <h3>5+</h3>
                <p>CI/CD Pipelines</p>
              </div>
              <div className="stat glass">
                <h3>100%</h3>
                <p>Automation Focus</p>
              </div>
            </div>
          </div>
          
          <div className="about-visuals glass animate-float delay-2">
            <h3>Core Focus</h3>
            <div className="focus-grid">
              <div className="focus-item">
                <SiDocker className="focus-icon docker animate-float-slow delay-1" />
                <span>Containerization</span>
              </div>
              <div className="focus-item">
                <SiKubernetes className="focus-icon k8s animate-float-slow delay-2" />
                <span>Orchestration</span>
              </div>
              <div className="focus-item">
                <SiTerraform className="focus-icon terraform animate-float-slow delay-3" />
                <span>Infrastructure as Code</span>
              </div>
              <div className="focus-item">
                <FaAws className="focus-icon aws animate-float-slow delay-4" />
                <span>Cloud Computing</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
