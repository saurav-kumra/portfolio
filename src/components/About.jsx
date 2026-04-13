import React from 'react';
import { motion } from 'framer-motion';
import './About.css';
import { SiDocker, SiKubernetes, SiTerraform } from 'react-icons/si';
import { FaAws } from 'react-icons/fa';

const fadeSlideUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const About = () => {
  return (
    <section id="about" className="about section">
      <motion.div 
        className="container"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.h2 variants={fadeSlideUp} className="section-title">About Me</motion.h2>
        
        <div className="about-grid grid">
          <motion.div variants={fadeSlideUp} className="about-content">
            <p>
              I’m a DevOps-focused engineering student passionate about building scalable cloud infrastructure and automating deployments using AWS, Docker, Kubernetes, and Terraform.
            </p>
            <p>
              I enjoy designing CI/CD pipelines and infrastructure-as-code systems that improve deployment reliability and developer productivity.
            </p>
            <p>
              Currently seeking entry-level DevOps opportunities where I can contribute to automation, cloud operations, and platform engineering teams.
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
          </motion.div>
          
          <motion.div variants={fadeSlideUp} className="about-visuals glass animate-float">
            <h3>Core Focus</h3>
            <div className="focus-grid">
              <div className="focus-item">
                <SiDocker className="focus-icon docker animate-float-slow" />
                <span>Containerization</span>
              </div>
              <div className="focus-item">
                <SiKubernetes className="focus-icon k8s animate-float-slow" />
                <span>Orchestration</span>
              </div>
              <div className="focus-item">
                <SiTerraform className="focus-icon terraform animate-float-slow" />
                <span>Infrastructure as Code</span>
              </div>
              <div className="focus-item">
                <FaAws className="focus-icon aws animate-float-slow" />
                <span>Cloud Computing</span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
