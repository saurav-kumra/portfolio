import React, { useState, useEffect } from 'react';
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import './Navbar.css';

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.body.classList.add('dark-mode');
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'skills', 'projects', 'certificates'];
      let current = '';
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // If the section is currently in the top part of the viewport
          if (rect.top <= 150 && rect.bottom >= 150) {
            current = section;
            break;
          }
        }
      }
      if (current && current !== activeSection) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', !isDarkMode ? 'dark' : 'light');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar-pill">
      <div className="nav-container">
        <a href="#home" className="logo mono" onClick={() => setIsMobileMenuOpen(false)}>
          <span className="highlight">&lt;</span>
          Saurav.DevOps
          <span className="highlight">/&gt;</span>
        </a>
        
        {/* Desktop Nav Links */}
        <ul className="nav-links desktop-only">
          {['home', 'skills', 'projects', 'certificates'].map((link) => (
            <li key={link}>
              <a 
                href={`#${link}`}
                className={activeSection === link ? 'active' : ''}
              >
                {link.charAt(0).toUpperCase() + link.slice(1)}
              </a>
            </li>
          ))}
        </ul>
        
        <div className="nav-actions">
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle Theme">
            {isDarkMode ? <FiSun /> : <FiMoon />}
          </button>
          <a href="#contact" className="nav-cta-btn desktop-only">Get In Touch</a>
          <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className="mobile-menu"
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <ul className="mobile-nav-links">
              {['home', 'skills', 'projects', 'certificates'].map((link) => (
                <li key={link}>
                  <a 
                    href={`#${link}`}
                    className={activeSection === link ? 'active' : ''}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.charAt(0).toUpperCase() + link.slice(1)}
                  </a>
                </li>
              ))}
              <li>
                <a 
                  href="#contact" 
                  className="mobile-nav-cta"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Get In Touch
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
