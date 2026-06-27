import React from 'react';
import { motion } from 'framer-motion';
import { BsGithub } from 'react-icons/bs';
import { SiJenkins, SiDocker, SiKubernetes, SiSonar, SiArgo, SiPrometheus, SiGrafana, SiTrivy } from 'react-icons/si';
import { TbWebhook } from 'react-icons/tb';
import { FaAws } from 'react-icons/fa';
import { FiBell } from 'react-icons/fi';
import './Workflow.css';

const fadeSlideUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

const Workflow = () => {
  const steps = [
    { name: 'GitHub', label: 'Source Code', icon: <BsGithub color="#181717" />, color: '#181717' },
    { name: 'Webhook', label: 'Trigger', icon: <TbWebhook color="#F25F22" />, color: '#F25F22' },
    { name: 'Jenkins', label: 'CI Pipeline', icon: <SiJenkins color="#D24939" />, color: '#D24939' },
    { name: 'SonarQube', label: 'Code Quality', icon: <SiSonar color="#519A8F" />, color: '#519A8F' },
    { name: 'Docker', label: 'Build Image', icon: <SiDocker color="#2496ED" />, color: '#2496ED' },
    { name: 'Trivy', label: 'Security Scan', icon: <SiTrivy color="#4E9BCD" />, color: '#4E9BCD' },
    { name: 'AWS ECR', label: 'Image Registry', icon: <FaAws color="#FF9900" />, color: '#FF9900' },
    { name: 'GitHub', label: 'Update K8s Manifest', icon: <BsGithub color="#181717" />, color: '#181717' },
    { name: 'ArgoCD', label: 'GitOps Deployment', icon: <SiArgo color="#EF7B4D" />, color: '#EF7B4D' },
    { name: 'Amazon EKS', label: 'Kubernetes Cluster', icon: <SiKubernetes color="#326CE5" />, color: '#326CE5' },
    { name: 'Prometheus', label: 'Metrics', icon: <SiPrometheus color="#E6522C" />, color: '#E6522C' },
    { name: 'Grafana', label: 'Dashboards', icon: <SiGrafana color="#F47A20" />, color: '#F47A20' },
    { name: 'CloudWatch', label: 'Logs & Monitoring', icon: <FaAws color="#FF4F8B" />, color: '#FF4F8B' },
    { name: 'SNS', label: 'Alerts', icon: <FiBell color="#FF9900" />, color: '#FF9900' }
  ];

  return (
    <section id="workflow" className="workflow section">
      <div className="container">
        <motion.h2 
          variants={fadeSlideUp} 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="section-title"
        >
          DevOps Lifecycle Pipeline
        </motion.h2>
        
        <div className="workflow-scroll-indicator">
          Scroll to view pipeline →
        </div>

        <motion.div 
          className="workflow-wrapper glass"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <div className="workflow-track">
            {steps.map((step, index) => (
              <React.Fragment key={index}>
                <motion.div 
                  className="workflow-node"
                  variants={fadeSlideUp}
                  whileHover={{ y: -5 }}
                >
                  <div className="workflow-icon-wrapper" style={{ '--brand-color': step.color }}>
                    <div className="workflow-icon">
                      {step.icon}
                    </div>
                  </div>
                  <div className="workflow-labels">
                    <h4 className="workflow-name">{step.name}</h4>
                    <span className="workflow-label">{step.label}</span>
                  </div>
                </motion.div>
                
                {index < steps.length - 1 && (
                  <motion.div 
                    className="workflow-connector"
                    variants={fadeSlideUp}
                  >
                    <div 
                      className="flow-dot" 
                      style={{ 
                        animationDelay: `${index * 0.18}s`,
                        background: step.color,
                        boxShadow: `0 0 8px ${step.color}`
                      }}
                    ></div>
                  </motion.div>
                )}
              </React.Fragment>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Workflow;
