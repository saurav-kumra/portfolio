import React from 'react';
import './Footer.css';
import { BsGithub, BsLinkedin } from 'react-icons/bs';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-content">
          <p className="mono">Built with React, Vite and deployed using AWS S3 static hosting.</p>
          <p className="copyright">© {new Date().getFullYear()} DevOps Portfolio. All rights reserved.</p>
        </div>
        
        <div className="footer-links">
          <a href="https://github.com/saurav-kumra" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <BsGithub />
          </a>
          <a href="https://www.linkedin.com/in/sauravkumar0907/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <BsLinkedin />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
