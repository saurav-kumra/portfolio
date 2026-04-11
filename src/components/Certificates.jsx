import React from 'react';
import './Certificates.css';
import { BiAward } from 'react-icons/bi';
import { FiExternalLink } from 'react-icons/fi';

const certificatesData = [
  {
    id: 1,
    title: 'AWS Certified Solutions Architect - Associate',
    issuer: 'Amazon Web Services (AWS)',
    date: 'March 2023',
    link: 'https://aws.amazon.com/certification/'
  },
  {
    id: 2,
    title: 'Certified Kubernetes Application Developer (CKAD)',
    issuer: 'Cloud Native Computing Foundation (CNCF)',
    date: 'October 2023',
    link: 'https://training.linuxfoundation.org/'
  },
  {
    id: 3,
    title: 'Docker Certified Associate (DCA)',
    issuer: 'Docker',
    date: 'January 2024',
    link: 'https://training.mirantis.com/dca-certification-exam/'
  }
];

const Certificates = () => {
  return (
    <section id="certificates" className="certificates section">
      <div className="container">
        <h2 className="section-title">Certifications</h2>
        
        <div className="certificates-grid">
          {certificatesData.map((cert, index) => (
            <div key={cert.id} className={`cert-card glass fade-in-up delay-${(index % 5) + 1}`}>
              <div className="cert-icon-wrapper">
                <BiAward className="cert-icon animate-float" />
              </div>
              <div className="cert-content">
                <h3 className="cert-title">{cert.title}</h3>
                <div className="cert-meta">
                  <span className="cert-issuer">{cert.issuer}</span>
                  <span className="cert-date mono">{cert.date}</span>
                </div>
              </div>
              <a href={cert.link} target="_blank" rel="noopener noreferrer" className="cert-link">
                <FiExternalLink /> Verify
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certificates;
