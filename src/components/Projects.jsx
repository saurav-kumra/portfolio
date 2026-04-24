import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CustomEase } from 'gsap/CustomEase';
import { FiGithub, FiExternalLink, FiFolder } from 'react-icons/fi';
import './Projects.css';

import projectCicdImg from '../assets/project_cicd.png';
import projectAwsImg from '../assets/project_aws.png';
import projectMonitoringImg from '../assets/project_monitoring.png';
import projectServerlessImg from '../assets/project_serverless.png';

gsap.registerPlugin(ScrollTrigger, CustomEase);

const projectsData = [
  {
    id: 1,
    title: 'E-Commerce CI/CD Pipeline',
    description: 'Automated deployment pipeline for microservices using Jenkins, Docker, Kubernetes. Reduced deployment time by 40%.',
    techStack: ['Jenkins', 'Docker', 'Kubernetes', 'Helm'],
    githubLinks: 'https://github.com/saurav-kumra',
    liveLink: '',
    image: projectCicdImg
  },
  {
    id: 2,
    title: 'AWS Infrastructure as Code',
    description: 'Highly available AWS infra using Terraform. VPC, EC2 Auto Scaling, RDS, Load Balancer.',
    techStack: ['Terraform', 'AWS', 'Bash'],
    githubLinks: 'https://github.com/saurav-kumra',
    liveLink: '',
    image: projectAwsImg
  },
  {
    id: 3,
    title: 'Microservices Monitoring Stack',
    description: 'Centralized monitoring using Prometheus, Grafana, ELK stack.',
    techStack: ['Prometheus', 'Grafana', 'ELK', 'Docker'],
    githubLinks: 'https://github.com/saurav-kumra',
    liveLink: 'https://example.com',
    image: projectMonitoringImg
  },
  {
    id: 4,
    title: 'Serverless Data Processing',
    description: 'Event-driven AWS Lambda + S3 with GitHub Actions CI/CD.',
    techStack: ['AWS Lambda', 'Python', 'GitHub Actions'],
    githubLinks: 'https://github.com/saurav-kumra',
    liveLink: '',
    image: projectServerlessImg
  }
];

const Projects = () => {
  const sectionRef = useRef(null);
  const wrapperRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current;
    
    if (!section || cards.length === 0) return;

    // Create the custom ease based on user's exact cubic-bezier curve
    CustomEase.create("elegantEase", "0.25, 0.46, 0.45, 0.94");

    let ctx = gsap.context(() => {
      // Set initial states
      // Card 0 (top) is centered (-50, -50)
      // Cards 1+ are offscreen right (100) waiting to slide in
      gsap.set(cards, {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transformOrigin: 'center center',
        zIndex: (i) => i,
        scale: 1,
        xPercent: (i) => (i === 0 ? -50 : 100),
        yPercent: -50,
        opacity: (i) => (i === 0 ? 1 : 0.3)
      });

      // Create a timeline that spans height proportional to number of cards
      // Increased scroll distance (150% instead of 100%) to reduce scroll sensitivity
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: `+=${cards.length * 150}%`,
          pin: true,
          scrub: 1.2, // Slightly smoother scrubbing
          anticipatePin: 1
        }
      });

      // Create transitions for each scroll step
      cards.forEach((card, index) => {
        if (index === cards.length - 1) return;

        // Label for simultaneous animations
        const label = `step${index}`;

        // 1. Animate current card OUT to the LEFT (Deck stack top position)
        tl.to(card, {
          xPercent: -120,
          scale: 0.9,
          opacity: 0.3,
          ease: 'elegantEase',
          duration: 0.8
        }, label);

        // 2. Animate next card IN from the RIGHT to center
        tl.to(cards[index + 1], {
          xPercent: -50,
          scale: 1,
          opacity: 1,
          ease: 'elegantEase',
          duration: 0.8
        }, label);

        // 3. Animate previously viewed cards deeper into the left deck stack
        for (let k = 0; k < index; k++) {
          const depth = index - k; // How deep into the stack it goes
          tl.to(cards[k], {
            xPercent: -120 - (depth * 5),
            yPercent: -50 - (depth * 5),
            scale: 0.9 - (depth * 0.05),
            opacity: 0.3 - (depth * 0.1), // Fade out further as they get deeper
            ease: 'elegantEase',
            duration: 0.8
          }, label);
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="projects-gsap-section">
      <div className="container" style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '100px' }}>
        <h2 className="section-title" style={{ margin: 0, position: 'relative', zIndex: 100 }}>Featured Projects</h2>
        
        <div className="cards-wrapper" ref={wrapperRef}>
          {projectsData.map((project, index) => (
            <div 
              key={project.id} 
              ref={el => cardsRef.current[index] = el}
              className="gsap-project-card"
            >
              {/* LEFT SIDE: Content */}
              <div className="project-content-left">
                <div className="project-header">
                  <FiFolder className="folder-icon" />
                  <div className="project-links">
                    {project.liveLink && (
                      <a href={project.liveLink} target="_blank" rel="noopener noreferrer" aria-label="Live Demo">
                        <FiExternalLink />
                      </a>
                    )}
                  </div>
                </div>
                
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                
                <ul className="project-tech-list mono">
                  {project.techStack.map((tech, idx) => (
                    <li key={idx} className="tech-badge">{tech}</li>
                  ))}
                </ul>

                {project.githubLinks && (
                  <div className="project-footer">
                    <a href={project.githubLinks} target="_blank" rel="noopener noreferrer" className="btn btn-github">
                      <FiGithub /> View on GitHub
                    </a>
                  </div>
                )}
              </div>
              
              {/* RIGHT SIDE: Image */}
              <div className="project-image-right">
                <img src={project.image} alt={project.title} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
