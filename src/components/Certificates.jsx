import React from 'react';
import { motion } from 'framer-motion';
import './Certificates.css';
import { FiExternalLink } from 'react-icons/fi';
import { FaAws } from 'react-icons/fa';
import { SiDocker, SiKubernetes } from 'react-icons/si';

const certificatesData = [
  {
    id: 1,
    title: 'AWS Certified Solutions Architect - Associate',
    issuer: 'Amazon Web Services (AWS)',
    date: 'March 2023',
    link: 'https://aws.amazon.com/certification/',
    icon: <FaAws className="brand-aws" />
  },
  {
    id: 2,
    title: 'Certified Kubernetes Application Developer (CKAD)',
    issuer: 'Cloud Native Computing Foundation (CNCF)',
    date: 'October 2023',
    link: 'https://training.linuxfoundation.org/',
    icon: <SiKubernetes className="brand-k8s" />
  },
  {
    id: 3,
    title: 'Docker Certified Associate (DCA)',
    issuer: 'Docker',
    date: 'January 2024',
    link: 'https://training.mirantis.com/dca-certification-exam/',
    icon: <SiDocker className="brand-docker" />
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

const Certificates = () => {
  return (
    <section id="certificates" className="certificates section">
      <motion.div 
        className="container"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.h2 variants={fadeSlideUp} className="section-title">Certifications</motion.h2>
        
        <div className="certificates-grid">
          {certificatesData.map((cert) => (
            <motion.div 
              key={cert.id} 
              variants={fadeSlideUp} 
              className="cert-card glass"
              whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(14, 165, 233, 0.1)' }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="cert-content">
                <h3 className="cert-title">
                  <span className="cert-provider-icon">{cert.icon}</span>
                  {cert.title}
                </h3>
                <div className="cert-meta">
                  <span className="cert-issuer">{cert.issuer}</span>
                  <span className="cert-date mono">{cert.date}</span>
                </div>
              </div>
              <a href={cert.link} target="_blank" rel="noopener noreferrer" className="btn btn-outline cert-link-btn">
                <FiExternalLink /> Verify
              </a>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Certificates;
