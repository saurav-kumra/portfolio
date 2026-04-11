import React from 'react';
import './Contact.css';
import { FiMail, FiMapPin } from 'react-icons/fi';

const Contact = () => {
  return (
    <section id="contact" className="contact section">
      <div className="container">
        <h2 className="section-title">Get In Touch</h2>
        <p className="contact-subtitle text-center">
          I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
        </p>

        <div className="contact-cards">
          <div className="info-card glass">
            <a href="mailto:sauravkumar.rav8@gmail.com" aria-label="Email Me">
              <FiMail className="info-icon" />
            </a>
            <div>
              <h3>Email Me</h3>
              <p>
                <a href="mailto:sauravkumar.rav8@gmail.com" className="contact-link">
                  sauravkumar.rav8@gmail.com
                </a>
              </p>
            </div>
          </div>
          
          <div className="info-card glass">
            <FiMapPin className="info-icon" />
            <div>
              <h3>Location</h3>
              <p>Ahmedabad, Gujarat 380009, India</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
