'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

const services = [
  {
    id: 'sap',
    icon: '⚙️',
    title: 'SAP Consulting Services',
    tagline: 'Optimize and streamline your enterprise operations',
    desc: 'End-to-end SAP implementation, customization, and support for enterprise-grade solutions.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    color: 'from-[#0066FF] to-[#3385FF]',
    tags: ['SAP S/4HANA', 'Implementation', 'Customization', 'Support'],
    caseStudy: { client: 'Manufacturing Enterprise', result: '40% reduction in operational costs after SAP S/4HANA migration', duration: 'Placeholder - to be updated' },
    faqs: [
      { q: 'What SAP modules do you support?', a: 'We support SAP S/4HANA, SAP ECC, SAP BW/4HANA, SAP SuccessFactors, SAP Ariba, and more.' },
      { q: 'How long does an SAP implementation take?', a: 'Depending on scope, implementations typically take 3-12 months using agile methodology.' },
      { q: 'Do you provide post-implementation support?', a: 'Yes, we offer 24/7 post-implementation support and continuous improvement services.' },
      { q: 'Can you migrate from legacy SAP to S/4HANA?', a: 'Absolutely. We specialize in SAP ECC to S/4HANA migrations with minimal business disruption.' },
      { q: 'What industries do you serve?', a: 'Manufacturing, retail, healthcare, logistics, finance, and more across India and globally.' },
    ],
  },
  {
    id: 'application',
    icon: '💻',
    title: 'Application Services',
    tagline: 'End-to-end application lifecycle management',
    desc: 'From ideation to deployment — we build fast, secure, scalable mobile, web and enterprise applications.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
    color: 'from-[#7C3AED] to-[#0066FF]',
    tags: ['Mobile Apps', 'Web Apps', 'Enterprise Apps', 'API Integration'],
    caseStudy: { client: 'Retail Chain', result: '65% increase in mobile conversions after app redesign', duration: 'Placeholder - to be updated' },
    faqs: [
      { q: 'What technologies do you use?', a: 'React, Angular, Vue.js, Next.js for frontend; Node.js, .NET Core, Java Spring Boot, Django for backend.' },
      { q: 'Do you provide app maintenance?', a: 'Yes, 24/7 monitoring, bug fixes, performance tuning, and version upgrades.' },
      { q: 'Can you modernize legacy applications?', a: 'Yes, we specialize in re-engineering outdated applications using modern frameworks.' },
      { q: 'How do you ensure app security?', a: 'We implement OAuth2, JWT, secure data storage, input validation, and regular security audits.' },
      { q: 'What is your development process?', a: 'Agile methodology — discovery, design, development, testing, deployment, and continuous improvement.' },
    ],
  },
  {
    id: 'blockchain',
    icon: '🔗',
    title: 'Blockchain Solutions',
    tagline: 'Secure, decentralized solutions for the future',
    desc: 'Leverage smart contracts, DeFi, and supply chain traceability solutions built on Ethereum, Hyperledger and more.',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80',
    color: 'from-[#0066FF] to-[#7C3AED]',
    tags: ['Smart Contracts', 'DeFi', 'Supply Chain', 'NFT'],
    caseStudy: { client: 'Supply Chain Company', result: '80% reduction in fraud incidents with blockchain traceability', duration: 'Placeholder - to be updated' },
    faqs: [
      { q: 'Which blockchain platforms do you work with?', a: 'Ethereum, Hyperledger Fabric, Polygon, Solana, and Binance Smart Chain.' },
      { q: 'What is a smart contract?', a: 'Self-executing code on blockchain that automatically enforces agreements without intermediaries.' },
      { q: 'Is blockchain suitable for my business?', a: 'If your business needs transparency, traceability, or elimination of intermediaries, blockchain adds value.' },
      { q: 'How secure is blockchain?', a: 'Blockchain is inherently secure due to its decentralized, immutable ledger.' },
      { q: 'Can you integrate blockchain with existing systems?', a: 'Yes, we integrate blockchain with your existing ERP, CRM, and enterprise systems.' },
    ],
  },
  {
    id: 'lms',
    icon: '📚',
    title: 'Learning Management System',
    tagline: 'A one-stop solution for effective learning management',
    desc: 'Custom LMS platforms for corporate training, e-learning, and education with AI-driven personalization.',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80',
    color: 'from-[#00C896] to-[#7C3AED]',
    tags: ['E-Learning', 'Corporate Training', 'LMS', 'Analytics'],
    caseStudy: { client: 'Corporate Training Company', result: '60% improvement in employee training completion rates', duration: 'Placeholder - to be updated' },
    faqs: [
      { q: 'What LMS features do you build?', a: 'Course management, video streaming, assessments, certificates, analytics, and mobile learning.' },
      { q: 'Can you integrate with HR systems?', a: 'Yes, we integrate with HRMS, SSO, and third-party content providers.' },
      { q: 'Do you support SCORM content?', a: 'Yes, our LMS platforms fully support SCORM, xAPI, and AICC content standards.' },
      { q: 'Is the LMS mobile-friendly?', a: 'All our LMS solutions are fully responsive with native mobile apps.' },
      { q: 'How do you handle large user bases?', a: 'Our cloud-native architecture scales to support thousands of concurrent users.' },
    ],
  },
  {
    id: 'cognitive',
    icon: '🧠',
    title: 'Cognitive Services',
    tagline: 'Empower your business with AI-driven cognitive solutions',
    desc: 'NLP, speech recognition, image analysis, and intelligent automation powered by cognitive AI.',
    image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80',
    color: 'from-[#7C3AED] to-[#3385FF]',
    tags: ['NLP', 'Speech Recognition', 'Image Analysis', 'Cognitive AI'],
    caseStudy: { client: 'Customer Service Platform', result: '70% reduction in support tickets with cognitive chatbot', duration: 'Placeholder - to be updated' },
    faqs: [
      { q: 'What cognitive services do you offer?', a: 'NLP, speech-to-text, image recognition, sentiment analysis, and intelligent document processing.' },
      { q: 'Which AI frameworks do you use?', a: 'TensorFlow, PyTorch, Azure Cognitive Services, AWS AI, and Google Cloud AI.' },
      { q: 'Can cognitive AI understand multiple languages?', a: 'Yes, we build multilingual NLP solutions supporting 50+ languages.' },
      { q: 'How accurate are cognitive models?', a: 'Typically 90-95% accuracy with continuous improvement through feedback loops.' },
      { q: 'Can you build a chatbot for our business?', a: 'Yes, intelligent chatbots with NLP, context understanding, and CRM integration.' },
    ],
  },
  {
    id: 'cybersecurity',
    icon: '🛡️',
    title: 'Cyber Security',
    tagline: 'Protect your digital assets 24/7',
    desc: 'Advanced cybersecurity including threat detection, penetration testing, SOC monitoring, and compliance consulting.',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80',
    color: 'from-[#DC2626] to-[#7C3AED]',
    tags: ['Threat Detection', 'Pen Testing', 'Risk Management', 'Compliance'],
    caseStudy: { client: 'Financial Institution', result: '99.9% threat prevention rate after security framework implementation', duration: 'Placeholder - to be updated' },
    faqs: [
      { q: 'What cybersecurity services do you offer?', a: 'VAPT, SOC monitoring, incident response, compliance consulting, and security training.' },
      { q: 'How often should penetration testing be done?', a: 'Quarterly for high-risk environments and bi-annually for standard environments.' },
      { q: 'Do you help with GDPR or ISO 27001 compliance?', a: 'Yes, full compliance consulting for GDPR, ISO 27001, SOC 2, PCI DSS, and more.' },
      { q: 'What is zero trust security?', a: 'A model that verifies every user and device before granting access.' },
      { q: 'Do you offer 24/7 security monitoring?', a: 'Yes, our SOC provides round-the-clock monitoring with real-time alerts.' },
    ],
  },
  {
    id: 'devops',
    icon: '🤖',
    title: 'DevOps Automation',
    tagline: 'Accelerate delivery with automated pipelines',
    desc: 'CI/CD pipelines, infrastructure as code, containerization, and monitoring to cut release cycles dramatically.',
    image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&q=80',
    color: 'from-[#0066FF] to-[#00C896]',
    tags: ['CI/CD', 'Infrastructure as Code', 'Monitoring', 'Kubernetes'],
    caseStudy: { client: 'SaaS Company', result: 'Release cycles reduced from 2 weeks to 4 hours with CI/CD automation', duration: 'Placeholder - to be updated' },
    faqs: [
      { q: 'What DevOps tools do you use?', a: 'Jenkins, GitHub Actions, GitLab CI, Docker, Kubernetes, Terraform, Ansible, Prometheus, Grafana.' },
      { q: 'What is infrastructure as code?', a: 'IaC manages and provisions infrastructure through code ensuring consistency and version control.' },
      { q: 'How does DevOps improve software delivery?', a: 'DevOps automates testing, integration, and deployment reducing errors and speeding up releases.' },
      { q: 'Can you migrate us to Kubernetes?', a: 'Yes, we specialize in containerization and Kubernetes migration for improved scalability.' },
      { q: 'Do you provide DevOps training?', a: 'Yes, hands-on training covering CI/CD, containers, cloud, and monitoring best practices.' },
    ],
  },
  {
    id: 'ai',
    icon: '✨',
    title: 'AI Services',
    tagline: 'Unlock the power of Artificial Intelligence',
    desc: 'Machine learning, NLP, computer vision, and AI automation solutions tailored to your business needs.',
    image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80',
    color: 'from-[#7C3AED] to-[#00C896]',
    tags: ['Machine Learning', 'NLP', 'Computer Vision', 'AI Automation'],
    caseStudy: { client: 'E-Commerce Platform', result: '35% increase in sales with AI-powered recommendation engine', duration: 'Placeholder - to be updated' },
    faqs: [
      { q: 'What AI services do you provide?', a: 'ML models, NLP chatbots, computer vision, predictive analytics, and AI automation.' },
      { q: 'Do you need large datasets?', a: 'Not always. We use transfer learning and data augmentation with limited data.' },
      { q: 'Can AI integrate with existing systems?', a: 'Yes, we expose AI models as REST APIs that integrate with your existing platforms.' },
      { q: 'How do you ensure model accuracy?', a: 'Rigorous validation, cross-validation, A/B testing, and continuous monitoring.' },
      { q: 'Is our data safe?', a: 'We follow strict data governance, anonymization, and comply with GDPR and local data laws.' },
    ],
  },
  {
    id: 'digital-marketing',
    icon: '📢',
    title: 'Digital Marketing',
    tagline: 'Drive growth with data-driven digital strategies',
    desc: 'SEO, SEM, social media marketing, content strategy, and AI-powered campaigns that deliver measurable results.',
    image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800&q=80',
    color: 'from-[#0066FF] to-[#00C896]',
    tags: ['SEO', 'SEM', 'Social Media', 'Content Marketing'],
    caseStudy: { client: 'B2B Software Company', result: '300% increase in organic traffic with SEO strategy', duration: 'Placeholder - to be updated' },
    faqs: [
      { q: 'What digital marketing services do you offer?', a: 'SEO, Google Ads, social media, content marketing, email marketing, and analytics.' },
      { q: 'How long does SEO take to show results?', a: 'Typically 3-6 months for significant organic traffic improvements.' },
      { q: 'Do you manage social media accounts?', a: 'Yes, LinkedIn, Instagram, Facebook, Twitter, and YouTube channels.' },
      { q: 'Can you run Google Ads campaigns?', a: 'Yes, certified Google Ads specialists managing search, display, and shopping campaigns.' },
      { q: 'How do you measure marketing ROI?', a: 'We track KPIs using GA4, Search Console, and custom dashboards with monthly reports.' },
    ],
  },
  {
    id: 'enterprise-automation',
    icon: '🔄',
    title: 'Enterprise Automation Services',
    tagline: 'Streamlining Business Operations with Enterprise Automation',
    desc: 'Eliminate manual processes and reduce errors with RPA, BPA, and intelligent automation solutions tailored to your enterprise workflows.',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80',
    color: 'from-[#00C896] to-[#0066FF]',
    tags: ['RPA', 'BPA', 'Intelligent Automation', 'Low-Code', 'Workflow Orchestration'],
    caseStudy: { client: 'Financial Services Firm', result: '80% reduction in manual data entry and 99.9% accuracy with UiPath RPA implementation', duration: 'Placeholder - to be updated' },
    faqs: [
      { q: 'What is enterprise automation?', a: 'Enterprise automation uses RPA, AI, and workflow tools to eliminate manual, repetitive business processes—improving speed, accuracy, and operational efficiency.' },
      { q: 'Which RPA tools do you use?', a: 'UiPath, Automation Anywhere, Blue Prism, and Microsoft Power Automate.' },
      { q: 'What processes can be automated?', a: 'Invoice processing, data entry, employee onboarding, document extraction, compliance reporting, customer support workflows, and order management.' },
      { q: 'What ROI can we expect?', a: 'Typically 200-300% ROI within the first year, with 70-90% reduction in processing time and near-zero error rates.' },
      { q: 'What platforms do you use for workflow automation?', a: 'Camunda, Appian, Kissflow, and ServiceNow for orchestration; Zapier, Workato, and MuleSoft for integration.' },
    ],
  },
  {
    id: 'grc',
    icon: '⚖️',
    title: 'Governance, Risk & Compliance Services',
    tagline: 'Ensuring Integrity and Security Across Your Organization',
    desc: 'Navigate regulatory landscapes, manage risks, and implement robust governance frameworks that protect your assets, ensure compliance, and foster a culture of integrity.',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80',
    color: 'from-[#7C3AED] to-[#DC2626]',
    tags: ['Risk Management', 'Compliance Audits', 'Corporate Governance', 'Policy Development'],
    caseStudy: { client: 'Banking Institution', result: 'Full ISO 27001 certification achieved enabling 3 major enterprise contracts', duration: 'Placeholder - to be updated' },
    faqs: [
      { q: 'What GRC frameworks do you support?', a: 'ISO 27001, SOC 2, GDPR, PCI DSS, HIPAA, NIST, and industry-specific regulations.' },
      { q: 'How do you approach risk management?', a: 'We follow a structured methodology: identify, assess, prioritize, and treat risks with continuous monitoring.' },
      { q: 'Can you help with regulatory audits?', a: 'Yes, we perform comprehensive compliance audits with policy reviews, gap analysis, and corrective action plans.' },
      { q: 'Do you provide policy development services?', a: 'Yes, we draft, review, and train on policies aligned with regulatory requirements and best practices.' },
      { q: 'How do you handle regulatory change management?', a: 'We conduct regulatory analysis, impact assessments, and build implementation plans to keep your organization compliant.' },
    ],
  },
  {
    id: 'infrastructure',
    icon: '🏗️',
    title: 'Infrastructure Services',
    tagline: 'Modern, Scalable & Secure IT Infrastructure Services',
    desc: 'Cloud platforms, data center modernization, network architecture, and security hardening — future-ready IT infrastructure for business continuity and growth.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
    color: 'from-[#0066FF] to-[#3385FF]',
    tags: ['Cloud Infrastructure', 'Hybrid Solutions', 'Network Security', 'IaC'],
    caseStudy: { client: 'IT Services Company', result: '99.99% uptime achieved and 40% cost reduction after infrastructure modernization', duration: 'Placeholder - to be updated' },
    faqs: [
      { q: 'What cloud platforms do you support?', a: 'AWS, Microsoft Azure, Google Cloud Platform, and Oracle Cloud including cloud-native builds, migrations, and hybrid integrations.' },
      { q: 'Do you manage hybrid environments?', a: 'Yes, we design and manage hybrid environments integrating on-premise data centers with public cloud platforms.' },
      { q: 'How do you ensure high availability?', a: 'Redundant architecture, load balancing, failover mechanisms, and 24/7 monitoring with Prometheus, Grafana, and Datadog.' },
      { q: 'What IaC tools do you use?', a: 'Terraform, Ansible, and Pulumi for automated infrastructure provisioning, configuration management, and scaling.' },
      { q: 'Do you provide network security services?', a: 'Yes, including firewalls, VPNs, zero trust, SD-WAN, and network segmentation using Cisco, Fortinet, and Palo Alto.' },
    ],
  },
  {
    id: 'microsoft-coe',
    icon: '🪟',
    title: 'Microsoft Center of Excellence (COE)',
    tagline: 'Driving Innovation and Excellence with Microsoft Technologies',
    desc: 'Comprehensive consulting, implementation, and support for Azure, Office 365, Dynamics 365, and Power Platform to maximize your Microsoft investment.',
    image: 'https://images.unsplash.com/photo-1633419461186-7d40a38105ec?w=800&q=80',
    color: 'from-[#0066FF] to-[#00C896]',
    tags: ['Azure', 'Office 365', 'Dynamics 365', 'Power Platform'],
    caseStudy: { client: 'Professional Services Firm', result: '50% productivity increase and 80% reduction in email volume after Microsoft 365 and Teams rollout', duration: 'Placeholder - to be updated' },
    faqs: [
      { q: 'What Microsoft technologies do you specialize in?', a: 'Azure, Office 365, Dynamics 365, Power Platform (Power Apps, Power Automate, Power BI), Teams, and SharePoint.' },
      { q: 'Can you migrate to Microsoft Azure?', a: 'Yes, end-to-end Azure migrations including cloud assessment, migration planning, execution, and post-migration support.' },
      { q: 'Do you implement Dynamics 365?', a: 'Yes, we implement and customize Dynamics 365 Sales, Customer Service, Marketing, and Finance modules.' },
      { q: 'What Power Platform services do you offer?', a: 'Power Apps development, Power Automate workflow automation, Power BI dashboards, and Power Virtual Agents chatbots.' },
      { q: 'Do you provide training and support?', a: 'Yes, training materials, workshops, and ongoing support to maximize adoption of all Microsoft tools.' },
    ],
  },
  {
    id: 'agile-it',
    icon: '📋',
    title: 'Agile IT Operations',
    tagline: 'Agile IT Ops – Adaptive, Scalable, and Efficient',
    desc: 'Bridge IT operations and agile development with CI/CD pipelines, infrastructure automation, real-time monitoring, and cross-functional collaboration.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
    color: 'from-[#00C896] to-[#7C3AED]',
    tags: ['CI/CD', 'DevOps', 'Monitoring & Observability', 'IaC'],
    caseStudy: { client: 'Technology Company', result: '40% faster project delivery and on-time rate increased from 40% to 85% after Agile transformation', duration: 'Placeholder - to be updated' },
    faqs: [
      { q: 'What is Agile IT Operations?', a: 'A transformative approach that bridges IT operations and agile development using CI/CD, infrastructure automation, real-time monitoring, and cross-functional collaboration.' },
      { q: 'What CI/CD tools do you use?', a: 'Jenkins, GitHub Actions, GitLab CI, and Azure DevOps for automated code integration and deployment.' },
      { q: 'What IaC tools do you support?', a: 'Terraform, Ansible, and AWS CloudFormation for consistent and repeatable environment provisioning.' },
      { q: 'How do you handle monitoring and observability?', a: 'We use Prometheus, Grafana, Datadog, New Relic, and Splunk for real-time infrastructure and application insights.' },
      { q: 'Do you provide DevOps and Agile coaching?', a: 'Yes, hands-on training, workshops, and consulting to help teams adopt agile principles and build a DevOps culture.' },
    ],
  },
  {
    id: 'product-engineering',
    icon: '🔧',
    title: 'Product Engineering Services',
    tagline: 'Innovative Product Engineering to Accelerate Your Digital Vision',
    desc: 'Full-lifecycle product engineering from ideation and MVP to cloud-native architecture, mobile apps, API integration, and QA automation.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80',
    color: 'from-[#3385FF] to-[#00C896]',
    tags: ['MVP Development', 'Platform Modernization', 'Cloud-Native', 'QA Automation'],
    caseStudy: { client: 'B2B SaaS Startup', result: 'MVP launched in 8 weeks, 500 beta users onboarded, and Series A funding secured', duration: 'Placeholder - to be updated' },
    faqs: [
      { q: 'What is product engineering?', a: 'A strategic, full-lifecycle process covering ideation, UI/UX, architecture, agile development, QA automation, DevOps, and post-launch support.' },
      { q: 'How quickly can you build an MVP?', a: 'Typically 6-12 weeks depending on scope and complexity, with rapid iteration cycles.' },
      { q: 'What technologies do you use?', a: 'Frontend: React, Next.js, Angular. Backend: Node.js, .NET Core, Java Spring Boot, Python. Mobile: React Native, Flutter. Cloud: AWS, Azure, GCP.' },
      { q: 'Can you modernize our legacy platform?', a: 'Yes, we re-architect monolithic applications into scalable, cloud-native, API-driven platforms.' },
      { q: 'Do you provide QA and test automation?', a: 'Yes, using Selenium, Cypress, Jest, Postman, and Playwright — automated for CI/CD environments.' },
    ],
  },
  {
    id: 'xaap',
    icon: '🗂️',
    title: 'Platforms & Protocols – XAAP',
    tagline: 'Cross-Platform Innovation with Protocol Intelligence',
    desc: 'Build interoperable, protocol-driven platforms across cloud, on-premise, and edge environments using the eXtensible Application Access Platform framework.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
    color: 'from-[#0066FF] to-[#7C3AED]',
    tags: ['Cross-Platform Integration', 'Protocol Architecture', 'Microservices', 'API Gateway'],
    caseStudy: { client: 'Enterprise Technology Company', result: '60% faster feature deployment and 70% reduction in deployment failures with XAAP architecture', duration: 'Placeholder - to be updated' },
    faqs: [
      { q: 'What is XAAP?', a: 'eXtensible Application Access Platform — a next-generation framework for interoperable, protocol-driven ecosystems across cloud, on-premise, and edge environments.' },
      { q: 'What protocols does XAAP support?', a: 'REST, GraphQL, MQTT, gRPC, WebSockets, CoAP, and SOAP based on performance and security needs.' },
      { q: 'What domain-specific standards do you support?', a: 'ISO 20022 for finance, HL7/FHIR for healthcare, OPC-UA for industrial automation, and OAuth2/OpenID for authorization.' },
      { q: 'What API gateway tools do you use?', a: 'Kong, Apigee, and AWS API Gateway to manage services, authenticate access, and route data securely.' },
      { q: 'How is XAAP deployed?', a: 'Containerized with Docker and orchestrated with Kubernetes for maximum portability, monitored via ELK, Prometheus, and Datadog.' },
    ],
  },
  {
    id: 'salesforce',
    icon: '☁️',
    title: 'Salesforce Consulting and Services COE',
    tagline: 'Salesforce Consulting That Drives Connected Customer Experiences',
    desc: 'Tailored Salesforce consulting, implementation, custom development, integration, and managed services to transform your CRM and maximize ROI.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    color: 'from-[#00A1E0] to-[#0066FF]',
    tags: ['Sales Cloud', 'Service Cloud', 'Apex & LWC', 'MuleSoft'],
    caseStudy: { client: 'Enterprise Sales Team', result: '45% increase in sales productivity and 30% improvement in forecast accuracy after Salesforce Sales Cloud implementation', duration: 'Placeholder - to be updated' },
    faqs: [
      { q: 'What Salesforce clouds do you implement?', a: 'Sales Cloud, Service Cloud, Marketing Cloud, Experience Cloud, Commerce Cloud, Field Service, and Salesforce Platform.' },
      { q: 'Do you provide custom Salesforce development?', a: 'Yes, custom Apex, Lightning Web Components (LWC), Visualforce, Salesforce Flow, and AppExchange solutions.' },
      { q: 'Can you integrate Salesforce with external systems?', a: 'Yes, using REST/SOAP APIs, MuleSoft, Dell Boomi, or Zapier with SAP, Oracle, HubSpot, and Microsoft Dynamics.' },
      { q: 'Do you offer Salesforce DevOps services?', a: 'Yes, with Salesforce DX, Git, Jenkins, and automated testing using Provar or Selenium.' },
      { q: 'Do you provide managed services and admin support?', a: 'Yes, SLA-based ongoing support, administration, user training, bug fixes, and continuous enhancements.' },
    ],
  },
  {
    id: 'cloud',
    icon: '🌐',
    title: 'Cloud Services',
    tagline: 'Cloud Solutions for Scalable, Secure & Agile Digital Transformation',
    desc: 'Comprehensive cloud services across AWS, Azure, and GCP — public, private, and hybrid — from migration and cloud-native development to 24/7 managed operations.',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&q=80',
    color: 'from-[#0066FF] to-[#00C896]',
    tags: ['Public Cloud', 'Private Cloud', 'Hybrid & Multi-Cloud', 'IaC'],
    caseStudy: { client: 'Healthcare Provider', result: '60% reduction in infrastructure costs and 99.99% uptime after phased AWS migration', duration: 'Placeholder - to be updated' },
    faqs: [
      { q: 'Which cloud platforms do you support?', a: 'AWS, Microsoft Azure, Google Cloud Platform, Oracle Cloud, and hybrid or multi-cloud environments.' },
      { q: 'What IaC tools do you use?', a: 'Terraform, AWS CloudFormation, Pulumi, and Ansible for automated, repeatable cloud provisioning.' },
      { q: 'Can you reduce our cloud costs?', a: 'Yes, through right-sizing, reserved instances, and architecture optimization — typically 30-50% reduction.' },
      { q: 'How do you ensure cloud security and compliance?', a: 'IAM, RBAC, firewalls, WAF, encryption, and compliance auditing for GDPR, HIPAA, SOC 2, and ISO 27001.' },
      { q: 'Do you offer 24/7 managed cloud services?', a: 'Yes, covering monitoring, alerting, cost control, performance tuning, scaling, patching, and backups.' },
    ],
  },
  {
    id: 'aws',
    icon: '🟠',
    title: 'AWS Cloud Services',
    tagline: 'Scalable, Secure, and Future-Ready AWS Cloud Solutions',
    desc: 'End-to-end AWS cloud services — migration, cloud-native development, DevOps automation, security, and 24/7 managed operations by certified AWS architects.',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&q=80',
    color: 'from-[#FF9900] to-[#0066FF]',
    tags: ['Cloud Migration', 'Cloud-Native', 'Security & Compliance', 'DevOps'],
    caseStudy: { client: 'E-Commerce Platform', result: '10x scalability with zero downtime and 40% reduction in infrastructure costs after AWS migration', duration: 'Placeholder - to be updated' },
    faqs: [
      { q: 'Are you an AWS partner?', a: 'Yes, we are an advanced AWS service provider with certified cloud architects, DevOps specialists, and security engineers.' },
      { q: 'What AWS services do you specialize in?', a: 'EC2, Lambda, S3, RDS, DynamoDB, ECS, EKS, CloudFront, Route 53, IAM, GuardDuty, and SageMaker.' },
      { q: 'Can you help reduce AWS costs?', a: 'Yes, through right-sizing, reserved instances, savings plans, and FinOps practices — typically 30-50% reduction.' },
      { q: 'Do you implement AWS security and compliance?', a: 'Yes, using IAM, KMS, VPC, AWS WAF, Security Hub, and GuardDuty for HIPAA, GDPR, and ISO compliance.' },
      { q: 'Do you offer 24/7 managed AWS services?', a: 'Yes, monitoring, patching, cost optimization, incident response, and proactive remediation around the clock.' },
    ],
  },
  {
    id: 'azure',
    icon: '🔵',
    title: 'Microsoft Azure Cloud Services',
    tagline: 'Build, Scale, and Transform with Microsoft Azure',
    desc: 'Expert Azure cloud services — migration, IaaS/PaaS, DevOps, security, data analytics, hybrid cloud, and managed operations for enterprise digital transformation.',
    image: 'https://images.unsplash.com/photo-1633419461186-7d40a38105ec?w=800&q=80',
    color: 'from-[#0078D4] to-[#0066FF]',
    tags: ['Azure Migration', 'IaaS & PaaS', 'Azure Security', 'Hybrid Cloud'],
    caseStudy: { client: 'Financial Services Company', result: 'Full regulatory compliance and 35% reduction in IT overhead with Azure Government Cloud', duration: 'Placeholder - to be updated' },
    faqs: [
      { q: 'Are you a Microsoft Azure partner?', a: 'Yes, a certified Microsoft Partner with Azure Solutions Architects, DevOps specialists, and security engineers.' },
      { q: 'What Azure services do you specialize in?', a: 'Azure DevOps, AKS, App Services, Azure SQL, Cosmos DB, Synapse, Data Factory, Power BI, Azure ML, and Security Center.' },
      { q: 'Can you migrate workloads to Azure?', a: 'Yes, using Azure Migrate with lift-and-shift, re-platforming, or re-architecture strategies with minimal downtime.' },
      { q: 'How do you handle Azure security and compliance?', a: 'Azure AD, MFA, RBAC, encryption, Microsoft Defender, Sentinel, and compliance policies for ISO, HIPAA, and GDPR.' },
      { q: 'Do you support hybrid cloud with Azure?', a: 'Yes, using Azure Arc, ExpressRoute, and VPN Gateway to integrate on-premises systems with Azure.' },
    ],
  },
  {
    id: 'vmware',
    icon: '🖥️',
    title: 'VMware Tanzu Services',
    tagline: 'Modernize Applications & Infrastructure with VMware Tanzu Services',
    desc: 'Accelerate cloud-native transformation with Kubernetes orchestration, containerization, app modernization, DevSecOps pipelines, and managed Tanzu platform services across hybrid and multi-cloud environments.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
    color: 'from-[#607078] to-[#0066FF]',
    tags: ['Kubernetes', 'Containerization', 'App Modernization', 'DevSecOps', 'Tanzu TAP'],
    caseStudy: { client: 'Enterprise Software Company', result: '70% faster application deployment with Tanzu platform', duration: 'Placeholder - to be updated' },
    faqs: [
      { q: 'What is VMware Tanzu and what does it offer?', a: 'VMware Tanzu is a portfolio of products for building, running, and managing modern containerized applications on Kubernetes across multi-cloud and on-premises environments. It includes Tanzu Kubernetes Grid (TKG), Tanzu Application Platform (TAP), and Tanzu Observability.' },
      { q: 'How does Rasta InfoTech help with VMware Tanzu implementation?', a: 'We provide end-to-end Tanzu services including readiness assessments, Kubernetes cluster setup, application containerization, CI/CD pipeline implementation with TAP, monitoring and observability setup, and ongoing managed platform services.' },
      { q: 'Can VMware Tanzu work with our existing VMware infrastructure?', a: 'Yes, Tanzu integrates seamlessly with existing vSphere infrastructure via Tanzu Kubernetes Grid, allowing you to leverage your current VMware investments while modernizing to Kubernetes-based operations.' },
      { q: 'What is Tanzu Application Platform (TAP) and how does it help developers?', a: 'TAP provides a pre-configured developer experience for Kubernetes with supply chain automation, service bindings, and built-in security. It accelerates developer productivity by abstracting Kubernetes complexity and enabling rapid, secure application deployments.' },
      { q: 'How does Tanzu support DevSecOps practices?', a: 'Tanzu integrates security throughout the CI/CD pipeline with automated scanning, policy enforcement, role-based access control, and compliance management. This ensures security is built-in from code commit to production deployment.' },
      { q: 'Do you offer managed Tanzu platform services?', a: 'Yes, our managed Tanzu services include platform monitoring, updates, health checks, incident response, and continuous optimization to ensure peak performance with minimal operational overhead for your team.' },
    ],
  },
  {
    id: 'recruitment',
    icon: '🎓',
    title: 'Recruitment & Staffing',
    tagline: '100% Placement Assurance — Your Career Guaranteed',
    desc: 'Premium recruitment and staffing with 100% placement assurance, AI-powered job matching, and payroll management.',
    image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80',
    color: 'from-[#00C896] to-[#0066FF]',
    tags: ['100% Placement', 'AI Matching', 'Payroll', 'Career Support'],
    isNew: true,
    isPremium: true,
    caseStudy: { client: 'IT Graduate Batch 2024', result: '100% placement rate with average salary of 6.5 LPA across 500+ students', duration: 'Placeholder - to be updated' },
    faqs: [
      { q: 'What does 100% placement assurance mean?', a: 'Every student gets dedicated support until placed — no placement, no fee.' },
      { q: 'What companies do you place students in?', a: 'Infosys, TCS, Wipro, Cognizant, HCL, Capgemini, and 200+ more companies.' },
      { q: 'What training tracks do you offer?', a: 'Full Stack, DevOps, Data Science, Cloud, Cybersecurity, and SAP.' },
      { q: 'Do you offer enterprise staffing?', a: 'Yes, contract hiring, permanent recruitment, and payroll management for enterprises.' },
      { q: 'What post-placement support do you provide?', a: 'Career mentorship, upskilling, and growth tracking for 1 year post-placement.' },
    ],
  },
]

const expertTopics = [
  'SAP Implementation',
  'Cloud Migration',
  'Cybersecurity Audit',
  'AI/ML Solutions',
  'DevOps Setup',
  'Blockchain Development',
  'Recruitment Programs',
  'Digital Marketing',
]

function AskExpertWidget() {
  const [selected, setSelected] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent('Expert Consultation Request: ' + selected)
    const body = encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\nTopic: ' + selected)
    window.open('mailto:info@rastainfotech.com?subject=' + subject + '&body=' + body, '_blank')
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
    setName('')
    setEmail('')
    setSelected('')
  }

  return (
    <div className="p-8 rounded-3xl border border-[#0066FF]/30 bg-gradient-to-br from-[#0066FF]/10 to-[#00C896]/10 backdrop-blur-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0066FF] to-[#00C896] flex items-center justify-center text-2xl">
          💬
        </div>
        <div>
          <h3 className="text-white font-black text-xl">Ask an Expert</h3>
          <p className="text-[#8892A4] text-sm">Get a free consultation from our specialists</p>
        </div>
      </div>

      {submitted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center h-40 text-center"
        >
          <div className="text-4xl mb-3">✅</div>
          <h4 className="text-white font-black text-lg mb-1">Request Sent!</h4>
          <p className="text-[#8892A4] text-sm">Our expert will contact you within 24 hours.</p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-[#8892A4] text-xs font-semibold uppercase tracking-wide mb-2 block">Your Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-[#8892A4] text-sm focus:outline-none focus:border-[#0066FF]/60 transition-all duration-300"
            />
          </div>
          <div>
            <label className="text-[#8892A4] text-xs font-semibold uppercase tracking-wide mb-2 block">Your Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john@company.com"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-[#8892A4] text-sm focus:outline-none focus:border-[#0066FF]/60 transition-all duration-300"
            />
          </div>
          <div>
            <label className="text-[#8892A4] text-xs font-semibold uppercase tracking-wide mb-2 block">Select Topic</label>
            <div className="flex flex-wrap gap-2">
              {expertTopics.map((topic) => (
                <button
                  key={topic}
                  type="button"
                  onClick={() => setSelected(topic)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                    selected === topic
                      ? 'bg-gradient-to-r from-[#0066FF] to-[#00C896] text-white'
                      : 'border border-white/10 text-[#8892A4] hover:text-white hover:border-white/30'
                  }`}
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>
          <button
            type="submit"
            disabled={!selected}
            className="w-full py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-[#0066FF] to-[#00C896] hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Request Free Consultation
          </button>
        </form>
      )}
    </div>
  )
}

function FAQAccordion({ faqs }: { faqs: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => (
        <div key={i} className="rounded-xl border border-white/10 overflow-hidden">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between p-4 text-left hover:bg-white/5 transition-colors duration-200"
          >
            <span className="text-white font-semibold text-sm pr-4">{faq.q}</span>
            <motion.span
              animate={{ rotate: open === i ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="text-[#0066FF] shrink-0"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </motion.span>
          </button>
          <AnimatePresence>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="px-4 pb-4 text-[#8892A4] text-sm leading-relaxed border-t border-white/5 pt-3">
                  {faq.a}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const [showFAQ, setShowFAQ] = useState(false)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      id={service.id}
      className="rounded-3xl border border-white/10 bg-white/5 overflow-hidden hover:border-white/20 transition-all duration-300"
    >
      <div className="relative h-56 overflow-hidden">
        <img src={service.image} alt={service.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-[#0A1628]/50 to-transparent" />
        <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
          <span className={`px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${service.color}`}>
            {service.icon} {service.tags[0]}
          </span>
          {'isNew' in service && service.isNew && (
            <span className="px-3 py-1 rounded-full text-xs font-bold text-white bg-[#00C896]">NEW</span>
          )}
          {'isPremium' in service && service.isPremium && (
            <span className="px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r from-yellow-500 to-orange-500">⭐ Premium</span>
          )}
        </div>
      </div>

      <div className="p-6 lg:p-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <h2 className="text-white text-2xl font-black mb-2">{service.title}</h2>
            <p className={`text-sm font-semibold bg-gradient-to-r ${service.color} bg-clip-text text-transparent mb-4`}>
              {service.tagline}
            </p>
            <p className="text-[#8892A4] leading-relaxed mb-4">{service.desc}</p>

            <div className="flex flex-wrap gap-2 mb-6">
              {service.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 rounded-full text-xs font-medium border border-white/10 text-[#8892A4] bg-white/5">
                  {tag}
                </span>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-gradient-to-br from-[#0066FF]/10 to-[#00C896]/10 border border-white/10 mb-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[#00C896] text-xs font-bold uppercase tracking-wide">Case Study</span>
              </div>
              <p className="text-white text-sm font-bold mb-1">{service.caseStudy.client}</p>
              <p className="text-[#8892A4] text-sm mb-2">{service.caseStudy.result}</p>
              <p className="text-[#0066FF] text-xs">{service.caseStudy.duration}</p>
            </div>

            <button
              onClick={() => setShowFAQ(!showFAQ)}
              className="flex items-center gap-2 text-[#0066FF] text-sm font-bold hover:text-white transition-colors duration-300 mb-4"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {showFAQ ? 'Hide FAQs' : 'View 5 FAQs'}
            </button>

            <AnimatePresence>
              {showFAQ && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FAQAccordion faqs={service.faqs} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="lg:w-64 shrink-0 space-y-3">
            <Link
              href={'/services/' + service.id}
              className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r ${service.color} hover:shadow-lg transition-all duration-300`}
            >
              Learn More
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <a
              href={'mailto:info@rastainfotech.com?subject=Enquiry about ' + service.title}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-bold text-white border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all duration-300"
            >
              Get Started
            </a>
            <a
              href="tel:+919742507066"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-bold text-white border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all duration-300"
            >
              📞 Call Us
            </a>
            <a
              href="https://wa.me/919742507066"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-bold text-[#25D366] border border-[#25D366]/20 hover:bg-[#25D366]/10 transition-all duration-300"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function ServicesPage() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section className="relative bg-[#0A1628] overflow-hidden">
      <div className="relative pt-32 pb-16">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1573164713988-8665fc963095?w=1600&q=80" alt="Services" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A1628]/60 to-[#0A1628]" />
        </div>
        <div className="relative z-10 text-center px-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#0066FF]/30 bg-[#0066FF]/10 mb-6">
            <span className="text-[#0066FF] text-sm font-semibold tracking-wide">What We Offer</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4">
            Our{' '}
            <span className="bg-gradient-to-r from-[#0066FF] to-[#00C896] bg-clip-text text-transparent">
              Services
            </span>
          </h1>
          <p className="text-[#8892A4] text-lg max-w-2xl mx-auto">
            Powering digital solutions of the future, today. From enterprise IT to career assurance.
          </p>
        </div>
      </div>

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          {services.map((s) => (
            <a
              key={s.id}
              href={'#' + s.id}
              className="px-4 py-2 rounded-full text-xs font-semibold border border-white/10 text-[#8892A4] hover:text-white hover:border-[#0066FF]/40 hover:bg-[#0066FF]/10 transition-all duration-300"
            >
              {s.icon} {s.title}
            </a>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2 space-y-8">
            {services.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>

          <div className="xl:col-span-1">
            <div className="sticky top-28 space-y-6">
              <AskExpertWidget />
              <div className="p-6 rounded-2xl border border-white/10 bg-white/5 space-y-4">
                <h4 className="text-white font-black text-lg">Quick Contact</h4>
                <a href="tel:+919742507066" className="flex items-center gap-3 text-[#8892A4] hover:text-white text-sm transition-colors duration-300">
                  <span className="w-8 h-8 rounded-lg bg-[#00C896]/20 flex items-center justify-center text-sm">📞</span>
                  +91-97425-07066
                </a>
                <a href="mailto:info@rastainfotech.com" className="flex items-center gap-3 text-[#8892A4] hover:text-white text-sm transition-colors duration-300">
                  <span className="w-8 h-8 rounded-lg bg-[#0066FF]/20 flex items-center justify-center text-sm">📧</span>
                  info@rastainfotech.com
                </a>
                <a href="https://wa.me/919742507066" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-[#25D366] hover:text-white text-sm transition-colors duration-300">
                  <span className="w-8 h-8 rounded-lg bg-[#25D366]/20 flex items-center justify-center text-sm">💬</span>
                  WhatsApp Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}