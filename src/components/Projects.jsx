import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CustomEase } from 'gsap/CustomEase';
import { FiGithub, FiExternalLink, FiFolder } from 'react-icons/fi';
import './Projects.css';

import projectCicdImg from '../assets/project_cicd.png';
import projectAwsImg from '../assets/project_aws.png';
import projectMonitoringImg from '../assets/project_monitoring.png';

gsap.registerPlugin(ScrollTrigger, CustomEase);

const projectsData = [
  {
    id: 1,
    title: 'AWS 3-Tier Web Application Architecture',
    descriptionPoints: [
      'Designed and deployed a highly available 3-tier web app on AWS with custom VPC, public/private subnets, ALB, and NAT Gateway.',
      'Provisioned Aurora MySQL with Read Replica and Auto Scaling Groups; secured with IAM Roles, Security Groups, and Route Tables.'
    ],
    techStack: ['EC2', 'VPC', 'ALB', 'Auto Scaling', 'Aurora MySQL', 'IAM'],
    githubLinks: 'https://github.com/saurav-kumra/aws-3tier-architecture',
    liveLink: '',
    image: projectAwsImg
  },
  {
    id: 2,
    title: 'End-to-End CI/CD Pipeline with SonarQube on AWS EKS',
    descriptionPoints: [
      'Built a full CI/CD pipeline using GitHub Actions — automated build, SonarQube quality gate, Docker image push to ECR.',
      'Deployed containerized app to EKS with zero-downtime rolling updates; secured credentials via GitHub Secrets and AWS IAM.'
    ],
    techStack: ['GitHub Actions', 'Docker', 'ECR', 'EKS', 'SonarQube'],
    githubLinks: 'https://github.com/saurav-kumra/cicd-eks-project',
    liveLink: '',
    image: projectCicdImg
  },
  {
    id: 3,
    title: 'Production Monitoring & Alerting on Amazon EKS',
    descriptionPoints: [
      'Deployed Prometheus and Grafana via Helm on EKS; built dashboards for CPU, Memory, Network, Pod, and Node metrics in real time.',
      'Configured CloudWatch Alarms and SNS email alerts for critical events; validated by generating load and verifying alert triggers.'
    ],
    techStack: ['Prometheus', 'Grafana', 'Helm', 'CloudWatch', 'SNS'],
    githubLinks: '',
    liveLink: '',
    image: projectMonitoringImg
  }
];

const Projects = () => {
  const sectionRef = useRef(null);
  const wrapperRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current.filter(Boolean); // Filter out any null entries
    
    if (!section || cards.length === 0) return;

    CustomEase.create("elegantEase", "0.25, 0.46, 0.45, 0.94");

    let mm = gsap.matchMedia();

    // Desktop view: Pinned scroll sequence
    mm.add("(min-width: 1025px)", () => {
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

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: `+=${cards.length * 150}%`,
          pin: true,
          scrub: 1.2,
          anticipatePin: 1
        }
      });

      cards.forEach((card, index) => {
        if (index === cards.length - 1) return;
        const label = `step${index}`;

        tl.to(card, {
          xPercent: -120,
          scale: 0.9,
          opacity: 0.3,
          ease: 'elegantEase',
          duration: 0.8
        }, label);

        tl.to(cards[index + 1], {
          xPercent: -50,
          scale: 1,
          opacity: 1,
          ease: 'elegantEase',
          duration: 0.8
        }, label);

        for (let k = 0; k < index; k++) {
          const depth = index - k;
          tl.to(cards[k], {
            xPercent: -120 - (depth * 5),
            yPercent: -50 - (depth * 5),
            scale: 0.9 - (depth * 0.05),
            opacity: 0.3 - (depth * 0.1),
            ease: 'elegantEase',
            duration: 0.8
          }, label);
        }
      });
    });

    // Tablet & Mobile view: Normal vertical flow with Intersection Observer effect
    mm.add("(max-width: 1024px)", () => {
      // Clean up any remaining positioning from desktop
      gsap.set(cards, { clearProps: "all" });

      cards.forEach((card) => {
        gsap.fromTo(card, 
          { opacity: 0, y: 50 }, 
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.8, 
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });
    });

    return () => mm.revert();
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
                
                <ul className="project-description-points" style={{ 
                  paddingLeft: '1.2rem', 
                  marginBottom: '1.5rem', 
                  listStyleType: 'disc',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.4rem',
                  flexGrow: 1
                }}>
                  {project.descriptionPoints.map((point, idx) => (
                    <li key={idx} style={{ 
                      color: 'var(--text-secondary)', 
                      fontSize: '0.85rem', 
                      lineHeight: '1.45'
                    }}>
                      {point}
                    </li>
                  ))}
                </ul>
                
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
