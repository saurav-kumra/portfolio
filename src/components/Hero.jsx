import React from 'react';
import { BsGithub, BsLinkedin } from 'react-icons/bs';
import { MdEmail } from 'react-icons/md';
import { FiDownload } from 'react-icons/fi';
import { SiDocker, SiKubernetes } from 'react-icons/si';
import { FaAws } from 'react-icons/fa';
import './Hero.css';

const Hero = () => {
  return (
    <section id="home" className="hero section">
      <div className="container hero-container grid">
        <div className="hero-content fade-in-up">
          <p className="hero-subtitle mono highlight">Hello, World! I am</p>
          <h1 className="hero-title">Saurav Kumar</h1>
          <h2 className="hero-role">Cloud & DevOps Engineer Student</h2>
          
          <p className="hero-description">
            Passionate about building scalable infrastructure, automating CI/CD pipelines, and mastering cloud architectures. Currently turning coffee into flawless deployments and resilient systems.
          </p>
          
          <div className="hero-cta">
            <a href="#projects" className="btn btn-primary animate-glow">
              View Projects
            </a>
            <a href="/resume.pdf" className="btn btn-outline" target="_blank" rel="noopener noreferrer">
              <FiDownload /> Resume
            </a>
          </div>
          
          <div className="hero-socials">
            <a href="https://github.com/saurav-kumra" target="_blank" rel="noopener noreferrer"><BsGithub /></a>
            <a href="https://www.linkedin.com/in/sauravkumar0907/" target="_blank" rel="noopener noreferrer"><BsLinkedin /></a>
            <a href="mailto:sauravkumar.rav8@gmail.com"><MdEmail /></a>
          </div>
        </div>
        
        <div className="hero-graphic">
          <div className="glass-shape active-pulse"></div>
          <SiDocker className="floating-icon docker-float delay-1 animate-float" />
          <SiKubernetes className="floating-icon k8s-float delay-3 animate-float-slow" />
          <FaAws className="floating-icon aws-float delay-5 animate-float" />
          <div className="avatar-wrapper">
            <img src="/devops-avatar.png" alt="DevOps Engineer" className="avatar-img" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
