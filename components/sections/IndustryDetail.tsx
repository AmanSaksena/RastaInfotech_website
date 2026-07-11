'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

const industriesData: Record<string, {
  icon: string
  title: string
  tagline: string
  desc: string
  longDesc: string
  image: string
  color: string
  tags: string[]
  stats: { value: string; label: string }[]
  challenges: { icon: string; title: string; desc: string }[]
  solutions: { icon: string; title: string; desc: string }[]
  services: string[]
  caseStudy: { client: string; challenge: string; solution: string; result: string }
  faqs: { q: string; a: string }[]
  relatedIndustries: string[]
}> = {
  healthcare: {
    icon: '🏥',
    title: 'Healthcare & Life Sciences',
    tagline: 'Transforming Healthcare Through Digital Innovation',
    desc: 'Digital therapeutics, remote patient monitoring, EMR/EHR development, pharma CRM, health analytics, clinical data management, and compliance services for pharmaceutical, biotech, and medical device companies.',
    longDesc: 'At Rasta Infotech, we empower pharmaceutical, biotech, and medical device companies to unlock value across the entire healthcare ecosystem. Our digital solutions enhance patient experiences, optimize clinical operations, and ensure compliance in a highly regulated environment. From R&D acceleration to smart manufacturing and patient-centric platforms, we enable intelligent transformation backed by data and automation. Our deep domain knowledge and proven engineering practices make us the ideal partner for life sciences organizations aiming to scale innovation securely and efficiently. We combine healthcare expertise with engineering excellence to accelerate digital transformation across the life sciences value chain — delivering scalable solutions with data security and interoperability at the core.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=80',
    color: 'from-[#DC2626] to-[#0066FF]',
    tags: ['Digital Therapeutics', 'EMR/EHR', 'Remote Patient Monitoring', 'Health Analytics', 'HIPAA & FDA Compliance'],
    stats: [
      { value: '40%', label: 'Cost Reduction' },
      { value: '60%', label: 'Faster Clinical Insights' },
      { value: '95%', label: 'Compliance Rate' },
      { value: '50%', label: 'Admin Time Saved' },
    ],
    challenges: [
      { icon: '🧬', title: 'Clinical Data Complexity', desc: 'Clinical trial data handling is fragmented, error-prone, and difficult to manage with integrity and compliance across multiple systems.' },
      { icon: '🏥', title: 'Disjointed Patient Journeys', desc: 'Disconnected hospital information systems, manual diagnostics, and poor digital care coordination creating gaps in patient experiences.' },
      { icon: '💊', title: 'Pharma Supply Chain Visibility', desc: 'Limited real-time visibility into pharma inventory, logistics, and cold chain data leading to stock-outs, wastage, and compliance risks.' },
      { icon: '⚖️', title: 'Regulatory Compliance Burden', desc: 'Meeting HIPAA, FDA 21 CFR Part 11, and ISO 13485 standards across all digital assets is complex, resource-intensive, and constantly evolving.' },
    ],
    solutions: [
      { icon: '💊', title: 'Digital Therapeutics Platforms', desc: 'Custom-built applications to support behavior change and chronic condition management, powered by AI/ML.' },
      { icon: '📡', title: 'Remote Patient Monitoring', desc: 'IoT-enabled dashboards and device integrations to track patient vitals and enable real-time interventions.' },
      { icon: '🏥', title: 'EMR/EHR System Development', desc: 'Secure, interoperable platforms with FHIR integration for hospitals and clinics.' },
      { icon: '🤝', title: 'Pharma CRM Solutions', desc: 'Salesforce-based platforms to streamline field force management, reporting, and doctor engagement.' },
      { icon: '📊', title: 'Health Analytics', desc: 'Dashboards and visualizations that deliver real-time, actionable insights from structured and unstructured data.' },
      { icon: '✅', title: 'Compliance & Validation Services', desc: 'Ensure all digital assets meet global compliance standards including HIPAA, FDA, and ISO 13485.' },
    ],
    services: ['Application Services', 'AI Services', 'Cloud Services', 'Cyber Security', 'Salesforce Consulting COE'],
    caseStudy: {
      client: 'Multi-Specialty Hospital Network',
      challenge: 'The hospital network with 5 locations was managing patient records manually, causing delays, data loss, and compliance risks with no unified patient view.',
      solution: 'We implemented a comprehensive EMR/EHR system with FHIR integration, remote patient monitoring dashboards, health analytics, and compliance and validation services.',
      result: '40% reduction in administrative costs, 60% faster clinical insights, and full HIPAA compliance achieved across all facilities.',
    },
    faqs: [
      { q: 'What healthcare and life sciences solutions do you provide?', a: 'Digital therapeutics platforms, remote patient monitoring, EMR/EHR development with FHIR integration, pharma CRM, health analytics, clinical data management, and compliance and validation services.' },
      { q: 'Do you build FHIR-compliant EMR/EHR systems?', a: 'Yes, we build secure, interoperable EMR/EHR platforms with FHIR standards integration, enabling seamless data exchange across hospitals, clinics, and third-party healthcare systems.' },
      { q: 'What is a digital therapeutics platform?', a: 'A custom-built application that supports patient behavior change and chronic condition management through AI/ML-driven insights, personalized care plans, and real-time monitoring.' },
      { q: 'Can you help with pharma CRM using Salesforce?', a: 'Yes, we build Salesforce-based pharma CRM platforms to streamline field force management, doctor engagement, reporting, and territory management for pharmaceutical companies.' },
      { q: 'How do you ensure HIPAA, FDA, and ISO 13485 compliance?', a: 'Our compliance and validation services audit all digital assets, implement required security controls, and generate documentation to meet HIPAA, FDA 21 CFR Part 11, and ISO 13485 standards.' },
      { q: 'Do you provide remote patient monitoring solutions?', a: 'Yes, we build IoT-enabled RPM dashboards with wearable and IoMT device integrations to track patient vitals in real time, enabling proactive clinical interventions and reducing hospital readmissions.' },
    ],
    relatedIndustries: ['banking-finance', 'education', 'public-sector'],
  },
  'life-sciences': {
    icon: '🔬',
    title: 'Life Sciences',
    tagline: 'Accelerating Innovation in Life Sciences Through Digital Transformation',
    desc: 'AI-powered drug discovery, clinical trial digitization, GxP-compliant platforms, regulatory document management, real-world evidence analytics, and medical device software engineering for pharma, biotech, and medical device companies.',
    longDesc: 'In a rapidly evolving healthcare landscape, Rasta Infotech partners with life sciences organizations to harness the power of digital technologies, accelerate research, streamline operations, and ensure regulatory compliance. From pharmaceuticals and biotechnology to medical devices and clinical research, our tailored digital solutions empower companies to drive scientific breakthroughs, enhance patient outcomes, and bring life-saving therapies to market faster. We enable a digital-first approach across the life sciences value chain — leveraging AI, machine learning, cloud computing, and data analytics to transform drug discovery, clinical trials, manufacturing, and post-market surveillance. Whether you\'re optimizing R&D pipelines, digitizing regulatory submissions, or ensuring data integrity in GxP environments, our expertise supports innovation with precision and compliance. At Rasta Infotech, we combine life sciences domain knowledge with world-class digital engineering capabilities — our team of bioinformatics engineers, data scientists, cloud architects, and compliance specialists build scalable platforms that deliver clinical, operational, and financial impact across the product lifecycle.',
    image: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=1200&q=80',
    color: 'from-[#7C3AED] to-[#0066FF]',
    tags: ['Drug Discovery', 'Clinical Trials', 'GxP Compliance', 'Medical Devices', 'Real-World Evidence'],
    stats: [
      { value: '40%', label: 'Faster Drug Discovery' },
      { value: '60%', label: 'Trial Efficiency Gain' },
      { value: '100%', label: 'GxP Compliance' },
      { value: '50%', label: 'R&D Cost Reduction' },
    ],
    challenges: [
      { icon: '💊', title: 'Slow Drug Development Cycles', desc: 'Research and preclinical development hindered by manual processes, siloed data, and the absence of AI-driven molecule modeling and lab automation.' },
      { icon: '📊', title: 'Complex Clinical Data Management', desc: 'Patient data scattered across systems, manual trial workflows, and difficulty integrating EDC, CTMS, and real-world data sources for unified trial insights.' },
      { icon: '🔬', title: 'Regulatory Compliance Complexity', desc: 'Manual document management, audit trails, and SOP workflows create non-compliance risks with FDA, EMA, and global regulatory bodies.' },
      { icon: '🔒', title: 'Data Integrity in GxP Environments', desc: 'Maintaining ALCOA+ principles — Attributable, Legible, Contemporaneous, Original, Accurate — across digital systems in regulated environments is resource-intensive without automation.' },
    ],
    solutions: [
      { icon: '🤖', title: 'AI-Powered Drug Discovery Platforms', desc: 'Develop AI solutions for molecule screening, biomarker identification, and in silico testing to enhance research productivity.' },
      { icon: '🏥', title: 'Clinical Trial Digitization', desc: 'Implement ePRO, eConsent, wearables integration, and remote monitoring tools to optimize patient recruitment and trial outcomes.' },
      { icon: '✅', title: 'GxP-Compliant Application Development', desc: 'Build and validate enterprise-grade software platforms compliant with FDA 21 CFR Part 11 and global regulatory requirements.' },
      { icon: '📋', title: 'Regulatory Document Management Systems', desc: 'Create digital platforms to streamline regulatory submissions, automate SOP workflows, and maintain audit-ready documentation.' },
      { icon: '📊', title: 'Real-World Evidence & Analytics', desc: 'Leverage structured and unstructured datasets to generate actionable insights for market access, pharmacovigilance, and label expansion.' },
      { icon: '🔧', title: 'Medical Device Software Engineering', desc: 'Design and validate embedded and connected software for Class I–III medical devices, ensuring compliance with IEC 62304 and FDA guidance.' },
    ],
    services: ['AI Services', 'Application Services', 'Cloud Services', 'Cyber Security', 'Infrastructure Services'],
    caseStudy: {
      client: 'Global Pharmaceutical Company',
      challenge: 'Manual clinical trial data management across multiple sites causing delays, compliance risks, and poor real-time visibility into trial outcomes.',
      solution: 'We implemented an integrated EDC and CTMS platform with ePRO, eConsent, wearables integration, and real-time analytics dashboards fully compliant with FDA 21 CFR Part 11 and ALCOA+ standards.',
      result: '60% improvement in trial data processing speed, full GxP compliance achieved, and 40% reduction in trial operational costs.',
    },
    faqs: [
      { q: 'What life sciences digital solutions do you provide?', a: 'AI-powered drug discovery platforms, clinical trial digitization, GxP-compliant application development, regulatory document management systems, real-world evidence and analytics, and medical device software engineering.' },
      { q: 'How does AI help in drug discovery?', a: 'Our AI platforms accelerate drug discovery by predicting molecular interactions, performing virtual compound screening, identifying biomarkers, and enabling in silico testing — significantly shortening the research and preclinical development lifecycle.' },
      { q: 'What does clinical trial digitization involve?', a: 'We implement ePRO (electronic Patient-Reported Outcomes), eConsent, wearables and IoMT device integration, EDC (Electronic Data Capture), CTMS, and real-time remote monitoring tools to optimize patient recruitment, data quality, and trial outcomes.' },
      { q: 'Can you build GxP-compliant applications?', a: 'Yes, we build and validate enterprise-grade software platforms aligned with GxP regulations, FDA 21 CFR Part 11, ALCOA+ principles, HIPAA, and ISO standards — with full audit trails, electronic signatures, and validation documentation.' },
      { q: 'What is real-world evidence and how do you leverage it?', a: 'Real-world evidence (RWE) uses patient data from outside clinical trials — EHRs, claims, registries, wearables — to generate insights for market access decisions, pharmacovigilance, label expansion, and post-market surveillance.' },
      { q: 'Do you develop and validate medical device software?', a: 'Yes, we design and validate embedded and connected software for Class I–III medical devices in compliance with IEC 62304, FDA Software as a Medical Device (SaMD) guidance, and ISO 14971 risk management standards.' },
    ],
    relatedIndustries: ['healthcare', 'manufacturing', 'public-sector'],
  },
  'banking-finance': {
    icon: '🏦',
    title: 'Banking & Finance',
    tagline: 'Empowering financial institutions with secure digital solutions',
    desc: 'Core banking modernization, digital payments, fraud detection, and regulatory compliance.',
    longDesc: 'The banking and financial services industry is at the forefront of digital transformation. Rasta Infotech helps banks, NBFCs, insurance companies, and financial institutions modernize their operations, launch digital products, and ensure regulatory compliance. From core banking modernization and digital payments to AI-powered fraud detection and blockchain-based solutions — we help financial institutions thrive in the digital age.',
    image: 'https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?w=1200&q=80',
    color: 'from-[#0066FF] to-[#7C3AED]',
    tags: ['Core Banking', 'Digital Payments', 'Fraud Detection', 'RegTech', 'Open Banking'],
    stats: [
      { value: '99.9%', label: 'System Uptime' },
      { value: '50%', label: 'Faster Processing' },
      { value: '80%', label: 'Fraud Reduction' },
      { value: '60%', label: 'Cost Savings' },
    ],
    challenges: [
      { icon: '🏗️', title: 'Legacy Systems', desc: 'Aging core banking infrastructure limiting innovation and digital product launch.' },
      { icon: '🔒', title: 'Fraud & Security', desc: 'Rising cyber threats and sophisticated fraud attacks targeting financial data.' },
      { icon: '⚖️', title: 'Regulatory Compliance', desc: 'Complex and evolving RBI, SEBI, and global financial regulations.' },
      { icon: '📱', title: 'Digital Expectations', desc: 'Customers demanding seamless digital banking experiences.' },
    ],
    solutions: [
      { icon: '🏦', title: 'Core Banking Modernization', desc: 'Microservices-based core banking replacing legacy monolithic systems.' },
      { icon: '💳', title: 'Digital Payments', desc: 'UPI, NEFT, RTGS, and international payment processing platforms.' },
      { icon: '🤖', title: 'AI Fraud Detection', desc: 'Real-time ML-based fraud detection with automatic transaction blocking.' },
      { icon: '📊', title: 'Risk Management', desc: 'Enterprise risk management with real-time dashboards and regulatory reporting.' },
      { icon: '🔗', title: 'Blockchain Solutions', desc: 'Cross-border payments, trade finance, and KYC automation using blockchain.' },
      { icon: '📱', title: 'Mobile Banking', desc: 'Feature-rich mobile banking apps with biometric authentication.' },
    ],
    services: ['Cyber Security', 'AI Services', 'Cloud Services', 'Blockchain', 'Application Services'],
    caseStudy: {
      client: 'Regional Bank',
      challenge: 'Legacy core banking system was causing slow transaction processing and inability to launch digital products, losing customers to fintech competitors.',
      solution: 'We modernized the core banking platform with microservices architecture, implemented AI fraud detection, and built a comprehensive mobile banking app.',
      result: '50% faster transaction processing, successful digital banking product launch, and 80% reduction in fraud incidents.',
    },
    faqs: [
      { q: 'What banking solutions do you provide?', a: 'Core banking modernization, digital payments, mobile banking, fraud detection, and regulatory compliance.' },
      { q: 'How do you ensure financial data security?', a: 'Multi-layer security including encryption, tokenization, fraud monitoring, and PCI DSS compliance.' },
      { q: 'Can you help with RBI regulatory compliance?', a: 'Yes, RBI, SEBI, and global banking regulatory compliance consulting and technology solutions.' },
      { q: 'Do you provide blockchain solutions for banking?', a: 'Yes, cross-border payments, trade finance, and KYC automation using blockchain.' },
      { q: 'What is your core banking experience?', a: 'We have modernized core banking systems for banks of all sizes across India.' },
    ],
    relatedIndustries: ['fintech', 'retail-ecommerce', 'public-sector'],
  },
  'retail-ecommerce': {
    icon: '🛒',
    title: 'Retail & E-Commerce',
    tagline: 'Driving retail innovation with smart commerce',
    desc: 'Omnichannel commerce, AI personalization, inventory optimization, and seamless customer experiences.',
    longDesc: 'The retail industry is being reshaped by digital commerce, changing consumer expectations, and data-driven operations. Rasta Infotech helps retailers and e-commerce businesses build unified omnichannel experiences, leverage AI for personalization, and optimize their operations from inventory to last-mile delivery.',
    image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1200&q=80',
    color: 'from-[#00C896] to-[#0066FF]',
    tags: ['E-Commerce', 'Omnichannel', 'AI Personalization', 'Inventory', 'POS'],
    stats: [
      { value: '65%', label: 'Conversion Increase' },
      { value: '40%', label: 'Cart Abandonment Drop' },
      { value: '3x', label: 'Revenue Growth' },
      { value: '30%', label: 'Inventory Optimization' },
    ],
    challenges: [
      { icon: '🔀', title: 'Omnichannel Complexity', desc: 'Siloed online and offline channels creating fragmented customer experiences.' },
      { icon: '📦', title: 'Inventory Management', desc: 'Stockouts and overstocking due to poor inventory visibility.' },
      { icon: '🎯', title: 'Customer Personalization', desc: 'Generic experiences failing to engage modern customers.' },
      { icon: '🚚', title: 'Last Mile Delivery', desc: 'Rising delivery costs and customer expectations for fast delivery.' },
    ],
    solutions: [
      { icon: '🛍️', title: 'Omnichannel Platform', desc: 'Unified commerce platform connecting online, mobile, and in-store experiences.' },
      { icon: '🤖', title: 'AI Personalization', desc: 'ML-powered recommendation engine delivering personalized product suggestions.' },
      { icon: '📦', title: 'Inventory Management', desc: 'Real-time inventory visibility with demand forecasting and auto-replenishment.' },
      { icon: '📱', title: 'Mobile Commerce', desc: 'Feature-rich mobile apps with AR product visualization and one-tap checkout.' },
      { icon: '🚚', title: 'Last Mile Optimization', desc: 'Route optimization and delivery management for faster, cheaper delivery.' },
      { icon: '📊', title: 'Retail Analytics', desc: 'Customer behavior analytics, sales forecasting, and merchandising intelligence.' },
    ],
    services: ['Application Services', 'AI Services', 'Digital Marketing', 'Cloud Services', 'Enterprise Automation'],
    caseStudy: {
      client: 'Multi-Brand Retail Chain',
      challenge: 'Siloed online and offline operations causing inconsistent customer experience and inventory inefficiencies across 100+ stores.',
      solution: 'We built a unified omnichannel platform with AI recommendations, real-time inventory sync, mobile app, and last-mile delivery optimization.',
      result: '65% increase in conversions, 3x revenue growth, and 30% reduction in inventory costs.',
    },
    faqs: [
      { q: 'What retail technology solutions do you offer?', a: 'E-commerce platforms, omnichannel integration, AI personalization, inventory management, and analytics.' },
      { q: 'Can you build a custom e-commerce platform?', a: 'Yes, scalable custom platforms or implementation of Shopify, Magento, and WooCommerce.' },
      { q: 'How do you improve conversion rates?', a: 'AI personalization, optimized checkout flows, A/B testing, and UX improvements.' },
      { q: 'Do you integrate with ERP and inventory systems?', a: 'Yes, seamless integration with SAP, Oracle, and custom ERP systems.' },
      { q: 'Can you help with digital marketing for retail?', a: 'Yes, SEO, paid advertising, social commerce, and email marketing.' },
    ],
    relatedIndustries: ['fintech', 'logistics', 'media-entertainment'],
  },
  education: {
    icon: '🎓',
    title: 'Education & E-Learning',
    tagline: 'Enabling next-gen learning with digital platforms',
    desc: 'Custom LMS platforms, virtual classrooms, AI adaptive learning, and education analytics.',
    longDesc: 'Education is being transformed by technology. Rasta Infotech helps educational institutions, EdTech companies, and corporate training organizations build powerful digital learning experiences. From custom LMS platforms and virtual classrooms to AI-powered adaptive learning and education analytics — we create solutions that improve learning outcomes and scale education.',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80',
    color: 'from-[#7C3AED] to-[#00C896]',
    tags: ['LMS', 'Virtual Classrooms', 'Adaptive Learning', 'EdTech', 'SCORM'],
    stats: [
      { value: '60%', label: 'Completion Rate Increase' },
      { value: '45%', label: 'Better Outcomes' },
      { value: '80%', label: 'Student Engagement' },
      { value: '50%', label: 'Admin Time Saved' },
    ],
    challenges: [
      { icon: '📏', title: 'Scalability', desc: 'Traditional classroom models unable to scale to meet growing demand.' },
      { icon: '📊', title: 'Learning Analytics', desc: 'No visibility into student progress, engagement, and learning outcomes.' },
      { icon: '🎯', title: 'Personalization', desc: 'One-size-fits-all content failing to address individual learning needs.' },
      { icon: '🌍', title: 'Accessibility', desc: 'Geographic and economic barriers limiting access to quality education.' },
    ],
    solutions: [
      { icon: '📚', title: 'Custom LMS', desc: 'Tailored learning management systems with rich content authoring and analytics.' },
      { icon: '📹', title: 'Virtual Classrooms', desc: 'Live and recorded virtual classrooms with interactive tools and breakout rooms.' },
      { icon: '🤖', title: 'AI Adaptive Learning', desc: 'Personalized learning paths that adapt based on student performance and preferences.' },
      { icon: '🏆', title: 'Gamification', desc: 'Points, badges, leaderboards, and rewards to drive engagement and completion.' },
      { icon: '📱', title: 'Mobile Learning', desc: 'Native mobile apps for iOS and Android enabling learning anytime, anywhere.' },
      { icon: '📊', title: 'Education Analytics', desc: 'Dashboards tracking completion, performance, engagement, and learning ROI.' },
    ],
    services: ['Learning Management System', 'AI Services', 'Application Services', 'Cloud Services'],
    caseStudy: {
      client: 'National Education Platform',
      challenge: 'Traditional classroom model unable to scale beyond physical constraints with poor learning outcomes tracking.',
      solution: 'We built a comprehensive e-learning platform with AI adaptive learning paths, virtual classrooms, and detailed analytics dashboard.',
      result: '60% increase in course completion rates and measurable improvement in student learning outcomes.',
    },
    faqs: [
      { q: 'What education technology solutions do you build?', a: 'LMS platforms, virtual classrooms, mobile apps, assessment systems, and analytics.' },
      { q: 'Do you support SCORM and xAPI?', a: 'Yes, full support for SCORM, xAPI, and AICC content standards.' },
      { q: 'Can you build a virtual classroom?', a: 'Yes, with video conferencing, whiteboard, breakout rooms, and recording.' },
      { q: 'How does AI adaptive learning work?', a: 'AI analyzes performance patterns and automatically adjusts content difficulty and learning paths.' },
      { q: 'Can you integrate with school management systems?', a: 'Yes, integration with ERP, SIS, and third-party educational tools.' },
    ],
    relatedIndustries: ['healthcare', 'public-sector', 'media-entertainment'],
  },
  automotive: {
    icon: '🚗',
    title: 'Automotive',
    tagline: 'Accelerating automotive innovation with connected tech',
    desc: 'Connected vehicle platforms, dealer management, EV solutions, and automotive AI.',
    longDesc: 'The automotive industry is undergoing its biggest transformation with electrification, connected vehicles, and digital retail. Rasta Infotech helps automotive OEMs, dealers, and mobility companies leverage technology to improve customer experience, optimize operations, and build the vehicles of the future.',
    image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200&q=80',
    color: 'from-[#0066FF] to-[#00C896]',
    tags: ['Connected Vehicles', 'Dealer Management', 'EV Solutions', 'Digital Retail'],
    stats: [
      { value: '35%', label: 'Sales Efficiency' },
      { value: '50%', label: 'Service Turnaround' },
      { value: '25%', label: 'Cost Reduction' },
      { value: '40%', label: 'Customer Satisfaction' },
    ],
    challenges: [
      { icon: '🔗', title: 'Disconnected Operations', desc: 'Fragmented dealer operations with no unified visibility across locations.' },
      { icon: '📱', title: 'Digital Customer Journey', desc: 'Customers expecting seamless digital research, purchase, and service experiences.' },
      { icon: '⚡', title: 'EV Transition', desc: 'Managing the complexity of EV product launches and charging infrastructure.' },
      { icon: '🔧', title: 'Service Efficiency', desc: 'Manual service processes causing delays and poor customer experience.' },
    ],
    solutions: [
      { icon: '🏢', title: 'Dealer Management System', desc: 'Unified DMS with inventory, CRM, service management, and financial reporting.' },
      { icon: '📱', title: 'Digital Retail Platform', desc: 'Online vehicle configurator, virtual showroom, and digital purchase journey.' },
      { icon: '🔌', title: 'EV Charging Management', desc: 'EV charging network management with mobile app and energy analytics.' },
      { icon: '🛰️', title: 'Connected Vehicle Platform', desc: 'IoT-based telematics with real-time vehicle tracking and diagnostics.' },
      { icon: '🔧', title: 'Service Management', desc: 'Digital service booking, job card management, and customer communication.' },
      { icon: '📊', title: 'Automotive Analytics', desc: 'Sales performance, inventory aging, and service KPI dashboards.' },
    ],
    services: ['Application Services', 'AI Services', 'Infrastructure Services', 'Cloud Services'],
    caseStudy: {
      client: 'Automobile Dealer Network',
      challenge: 'Fragmented dealer operations across 50 locations with no visibility into inventory, sales, and service performance.',
      solution: 'We implemented a unified dealer management system with real-time inventory, CRM, service management, and analytics.',
      result: '35% improvement in sales efficiency and 50% faster service turnaround time.',
    },
    faqs: [
      { q: 'What automotive solutions do you provide?', a: 'Dealer management systems, connected vehicle platforms, EV solutions, and automotive AI.' },
      { q: 'Can you build a dealer management system?', a: 'Yes, complete DMS with inventory, CRM, service management, and financial reporting.' },
      { q: 'Do you have connected vehicle experience?', a: 'Yes, IoT-based vehicle tracking, telematics, and predictive maintenance solutions.' },
      { q: 'Can you help with EV charging infrastructure?', a: 'Yes, EV charging network management platforms and mobile apps.' },
      { q: 'Do you integrate with OEM systems?', a: 'Yes, integration with major automotive OEM systems and third-party APIs.' },
    ],
    relatedIndustries: ['manufacturing', 'logistics', 'energy-utilities'],
  },
  'travel-transportation': {
    icon: '✈️',
    title: 'Travel & Transportation',
    tagline: 'Revolutionizing Travel & Transportation Through Digital Innovation',
    desc: 'AI-powered travel booking, intelligent fleet management, smart ticketing, logistics visibility, passenger experience platforms, and sustainability monitoring for airlines, transit systems, and logistics networks.',
    longDesc: 'At Rasta Infotech, we empower travel, logistics, and transportation companies to embrace digital transformation and deliver seamless, efficient, and personalized experiences. From intelligent fleet management and smart ticketing systems to AI-powered travel planning and real-time logistics tracking, our solutions are designed to enhance operational efficiency, improve customer satisfaction, and drive sustainable growth. Whether you\'re managing a global airline, a public transit system, or a logistics network, our technology platforms help you stay ahead in a rapidly evolving mobility landscape. Our solutions are built to scale, secure, and integrate with legacy and modern systems alike — delivering technology that moves your business forward.',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&q=80',
    color: 'from-[#3385FF] to-[#00C896]',
    tags: ['Fleet Management', 'Smart Ticketing', 'Travel Booking', 'Logistics Tracking', 'Sustainable Mobility'],
    stats: [
      { value: '30%', label: 'Fleet Efficiency' },
      { value: '45%', label: 'Booking Conversion' },
      { value: '50%', label: 'Operational Savings' },
      { value: '35%', label: 'Fuel Savings' },
    ],
    challenges: [
      { icon: '✈️', title: 'Fragmented Traveler Journey', desc: 'Disconnected booking, check-in, and travel management systems creating a disjointed passenger experience without real-time updates or personalization.' },
      { icon: '🚚', title: 'Fleet & Logistics Visibility Gaps', desc: 'Limited real-time visibility into fleet location, vehicle health, and logistics performance, making route optimization and predictive maintenance difficult.' },
      { icon: '🛳️', title: 'Siloed Transport Modes', desc: 'Air, rail, road, and sea transport operating in isolation with no unified booking and tracking system for end-to-end multimodal visibility.' },
      { icon: '🌱', title: 'Sustainability & Emissions Compliance', desc: 'Growing regulatory and customer pressure to monitor carbon footprint, optimize fuel usage, and transition toward green transportation operations.' },
    ],
    solutions: [
      { icon: '✈️', title: 'Travel Booking & Reservation Systems', desc: 'Custom platforms for flights, hotels, and multimodal transport with real-time availability and dynamic pricing.' },
      { icon: '🚚', title: 'Fleet Management Solutions', desc: 'IoT-enabled dashboards for vehicle tracking, driver behavior monitoring, and predictive maintenance.' },
      { icon: '📱', title: 'Passenger Experience Platforms', desc: 'Mobile apps and web portals for itinerary management, notifications, and loyalty programs.' },
      { icon: '📦', title: 'Logistics & Supply Chain Visibility', desc: 'Real-time tracking and analytics for shipments, inventory, and delivery performance.' },
      { icon: '🎫', title: 'Smart Ticketing & Fare Collection', desc: 'Contactless payment systems, QR code-based tickets, and integration with transit cards and wallets.' },
      { icon: '🌱', title: 'Sustainability & Emissions Monitoring', desc: 'Tools to track carbon footprint, optimize fuel usage, and support green transportation initiatives.' },
    ],
    services: ['Application Services', 'AI Services', 'Cloud Services', 'Enterprise Automation', 'Infrastructure Services'],
    caseStudy: {
      client: 'Regional Transport Authority',
      challenge: 'Manual ticketing and lack of real-time fleet visibility causing operational inefficiencies and revenue leakage across multiple transit routes.',
      solution: 'We implemented a smart ticketing system with GPS fleet tracking, passenger experience apps, and a real-time analytics dashboard for operations management.',
      result: '30% improvement in fleet efficiency and 45% increase in digital ticket sales.',
    },
    faqs: [
      { q: 'What travel and transportation solutions do you offer?', a: 'Travel booking platforms, intelligent fleet management, passenger experience apps, smart ticketing and fare collection, logistics and supply chain visibility, and sustainability and emissions monitoring tools.' },
      { q: 'Can you build a multimodal travel booking platform?', a: 'Yes, we build custom booking platforms integrating flights, hotels, buses, trains, and car rentals with real-time availability, dynamic pricing, and GDS integration (Amadeus, Sabre, Travelport).' },
      { q: 'How does your fleet management solution work?', a: 'We deploy IoT-enabled GPS tracking dashboards with real-time vehicle location, driver behavior monitoring, predictive maintenance alerts, and AI-powered route optimization — reducing fuel costs and improving fleet uptime.' },
      { q: 'Can you implement smart ticketing for public transit?', a: 'Yes, we build contactless fare collection systems with NFC-based smart cards, QR code tickets, mobile ticketing apps, and integration with existing transit cards and digital wallets.' },
      { q: 'How do you support sustainability goals in transportation?', a: 'We provide carbon footprint tracking tools, fuel optimization analytics, route efficiency dashboards, and EV fleet management integration to help organizations measure and reduce emissions and meet sustainability targets.' },
      { q: 'Do you provide logistics and supply chain visibility solutions?', a: 'Yes, our real-time logistics platforms track shipments, inventory, and delivery performance with analytics dashboards, exception alerts, and carrier integration for complete end-to-end visibility.' },
    ],
    relatedIndustries: ['automotive', 'logistics', 'hospitality'],
  },
  fintech: {
    icon: '💳',
    title: 'Fintech',
    tagline: 'Powering financial technology with secure solutions',
    desc: 'Payment processing, digital lending, wealth management, and open banking solutions.',
    longDesc: 'Fintech is disrupting traditional financial services with innovative digital-first solutions. Rasta Infotech helps fintech startups and established players build secure, scalable financial technology platforms. From payment gateways and digital lending to wealth management and open banking — we combine deep financial domain expertise with technical excellence.',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&q=80',
    color: 'from-[#0066FF] to-[#00C896]',
    tags: ['Payments', 'Digital Lending', 'Wealth Management', 'Open Banking', 'InsurTech'],
    stats: [
      { value: '99.9%', label: 'Transaction Success' },
      { value: '70%', label: 'Processing Speed' },
      { value: '60%', label: 'Cost Reduction' },
      { value: '50%', label: 'User Acquisition' },
    ],
    challenges: [
      { icon: '⚡', title: 'Speed to Market', desc: 'Need to launch innovative financial products faster than competitors.' },
      { icon: '🔒', title: 'Security & Compliance', desc: 'PCI DSS, RBI regulations, and evolving fintech compliance requirements.' },
      { icon: '📈', title: 'Scalability', desc: 'Transaction volumes that can spike 100x during peak periods.' },
      { icon: '🤖', title: 'Fraud Prevention', desc: 'Sophisticated fraud attacks targeting financial transactions.' },
    ],
    solutions: [
      { icon: '💳', title: 'Payment Gateway', desc: 'Custom payment gateways with multi-currency support and fraud detection.' },
      { icon: '💰', title: 'Digital Lending', desc: 'End-to-end lending platform with AI credit scoring and instant disbursement.' },
      { icon: '📈', title: 'Wealth Management', desc: 'Robo-advisory platforms with portfolio management and financial planning.' },
      { icon: '🔗', title: 'Open Banking APIs', desc: 'Account aggregation, payment initiation, and open banking integration.' },
      { icon: '🛡️', title: 'Fraud Detection', desc: 'Real-time AI-based fraud detection with automatic risk scoring.' },
      { icon: '🏛️', title: 'RegTech Solutions', desc: 'Regulatory reporting automation, KYC, and AML compliance solutions.' },
    ],
    services: ['Application Services', 'Blockchain', 'AI Services', 'Cyber Security', 'Cloud Services'],
    caseStudy: {
      client: 'Digital Lending Startup',
      challenge: 'Manual loan processing taking 7 days causing poor customer experience and high operational costs.',
      solution: 'We built an automated digital lending platform with AI credit scoring, e-KYC, and instant loan disbursement.',
      result: 'Loan processing time reduced from 7 days to 4 hours with 99.9% accuracy.',
    },
    faqs: [
      { q: 'What fintech solutions do you build?', a: 'Payment platforms, digital lending, wealth management, insurtech, and open banking.' },
      { q: 'Are your solutions RBI compliant?', a: 'Yes, all solutions comply with RBI guidelines, PCI DSS, and relevant regulations.' },
      { q: 'Can you build a payment gateway?', a: 'Yes, custom payment gateways with multi-currency support and fraud detection.' },
      { q: 'Do you have AI credit scoring experience?', a: 'Yes, ML-based credit scoring using alternative data for accurate risk assessment.' },
      { q: 'Can you implement open banking APIs?', a: 'Yes, account aggregation, payment initiation, and open banking API development.' },
    ],
    relatedIndustries: ['banking-finance', 'retail-ecommerce', 'public-sector'],
  },
  logistics: {
    icon: '🚚',
    title: 'Logistics & Supply Chain',
    tagline: 'Driving Logistics Innovation with Digital Supply Chain Solutions',
    desc: 'Fleet and transport management, warehouse management systems, last-mile delivery optimization, supply chain analytics, digital freight platforms, and blockchain-powered transparency for logistics providers and 3PLs.',
    longDesc: 'The logistics and supply chain industry is undergoing a significant transformation, driven by the demand for real-time visibility, faster fulfillment, and resilient operations. At Rasta Infotech, we help logistics providers, freight operators, 3PLs, and distribution networks digitize their entire value chain — from warehouse automation and fleet tracking to demand forecasting and last-mile delivery optimization. With rising customer expectations, volatile demand, and global disruptions, logistics enterprises must become more agile, intelligent, and connected. Our end-to-end logistics technology solutions combine IoT, AI/ML, cloud, and blockchain to deliver smarter warehousing, transportation, and inventory management systems. Whether you\'re optimizing reverse logistics, building digital freight platforms, or streamlining customs clearance, we help you accelerate digital transformation with scalable, secure, and cost-effective platforms tailored to your business goals. At Rasta Infotech, we understand the complexities of global logistics and the importance of precision, speed, and visibility. Our team brings deep expertise in transportation management systems (TMS), warehouse automation, supply chain planning, and logistics analytics. We enable logistics providers to respond quickly to market changes, reduce costs, and improve delivery accuracy through intelligent automation and predictive insights. We also ensure that your operations are scalable, resilient, and secure by designing platforms that are cloud-native, API-first, and compliant with international standards like GS1, ISO 28000, and GLEC.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&q=80',
    color: 'from-[#00C896] to-[#7C3AED]',
    tags: ['Supply Chain Visibility', 'Warehouse Management', 'Route Optimization', 'Last Mile', 'Digital Freight'],
    stats: [
      { value: '30%', label: 'Cost Reduction' },
      { value: '45%', label: 'On-Time Delivery' },
      { value: '60%', label: 'Warehouse Efficiency' },
      { value: '25%', label: 'Inventory Optimization' },
    ],
    challenges: [
      { icon: '🚚', title: 'Fleet & Transport Management', desc: 'Digitize fleet operations with GPS tracking, route optimization, driver behavior analytics, and predictive maintenance to address rising transport costs and operational blind spots.' },
      { icon: '🏪', title: 'Warehouse Management Complexity', desc: 'Implement advanced WMS solutions integrated with robotics, barcode scanning, and inventory optimization algorithms to eliminate manual errors and slow fulfillment.' },
      { icon: '📦', title: 'Last-Mile Delivery Inefficiency', desc: 'Enhance last-mile efficiency using AI-powered route planning, mobile delivery apps, and real-time delivery tracking to meet rising customer delivery expectations.' },
      { icon: '👁️', title: 'End-to-End Supply Chain Visibility', desc: 'IoT, RFID, and blockchain enabling complete transparency across inventory, transportation, and supplier networks to reduce disruptions and improve agility.' },
    ],
    solutions: [
      { icon: '🏭', title: 'Warehouse Automation Systems', desc: 'Design and deploy WMS platforms integrated with conveyor systems, pick/pack automation, and real-time inventory control.' },
      { icon: '🚛', title: 'Transportation Management Systems (TMS)', desc: 'Develop AI-driven TMS platforms that support shipment planning, carrier allocation, freight audits, and performance analytics.' },
      { icon: '📡', title: 'Fleet Monitoring & Telematics', desc: 'Enable real-time fleet tracking using GPS, ELD integration, telematics, and maintenance alert systems.' },
      { icon: '📦', title: 'Last-Mile Delivery & Route Optimization', desc: 'Create mobile-first platforms for dispatch, navigation, proof of delivery, and intelligent dynamic route planning.' },
      { icon: '📊', title: 'Supply Chain Analytics & Demand Forecasting', desc: 'Implement AI-powered forecasting models to anticipate demand trends, optimize stock levels, and prevent stockouts.' },
      { icon: '🌐', title: 'Digital Freight Platforms', desc: 'Build cloud-based freight marketplaces and load boards for shippers and carriers to connect in real time with pricing intelligence.' },
    ],
    services: ['Application Services', 'AI Services', 'Enterprise Automation', 'Blockchain Solutions', 'Cloud Services'],
    caseStudy: {
      client: 'National Logistics Company',
      challenge: 'No real-time shipment visibility causing customer complaints and inability to proactively manage delays.',
      solution: 'We implemented end-to-end supply chain visibility with real-time tracking, predictive analytics, and a customer-facing portal.',
      result: '30% reduction in delivery costs and 45% improvement in on-time delivery.',
    },
    faqs: [
      { q: 'What logistics technology solutions do you offer?', a: 'Warehouse automation systems, transportation management systems (TMS), fleet monitoring and telematics, last-mile delivery and route optimization, supply chain analytics and demand forecasting, digital freight platforms, blockchain in logistics, and reverse logistics and returns management.' },
      { q: 'How do you help with warehouse automation?', a: 'We design and deploy WMS platforms integrated with conveyor systems, pick/pack automation, robotic systems, barcode/RFID scanning, and real-time inventory control to eliminate manual errors and speed up fulfillment.' },
      { q: 'What is a Transportation Management System (TMS) and how can it help?', a: 'A TMS is an AI-driven platform that supports shipment planning, carrier allocation, freight audits, and performance analytics — reducing freight costs and improving delivery accuracy across your network.' },
      { q: 'Can you build a digital freight marketplace?', a: 'Yes, we build cloud-based freight platforms and load boards where shippers and carriers connect in real time with dynamic pricing intelligence, load matching, and integrated payment workflows.' },
      { q: 'Do you provide blockchain solutions for logistics?', a: 'Yes, we develop secure, tamper-proof digital ledgers for transparent shipment history, document exchange, compliance records, and multi-party traceability across the supply chain.' },
      { q: 'How do you optimize last-mile delivery?', a: 'We create mobile-first platforms for dispatch, navigation, proof of delivery, and intelligent dynamic route planning — reducing delivery times and costs while improving customer satisfaction.' },
    ],
    relatedIndustries: ['manufacturing', 'retail-ecommerce', 'automotive'],
  },
  'hi-tech': {
    icon: '💻',
    title: 'Hi-Tech Industry',
    tagline: 'Accelerating Innovation in the Hi-Tech Industry',
    desc: 'Embedded systems, AI/ML development, cloud-native engineering, IoT platforms, digital twins, and cybersecurity for semiconductor, consumer electronics, enterprise software, and next-gen connectivity companies.',
    longDesc: 'At Rasta Infotech, we partner with high-tech enterprises to drive innovation, agility, and scalability across the digital value chain. From semiconductor design to consumer electronics, enterprise software, and next-gen connectivity, our solutions are engineered to meet the demands of a rapidly evolving technology landscape. We help businesses embrace cloud-native platforms, AI/ML, edge computing, and automation to stay ahead in a competitive market. Our deep engineering expertise, agile delivery models, and focus on IP protection make us the ideal partner for high-tech companies looking to innovate at scale. Whether you\'re building the next-gen chipset, launching a SaaS platform, or scaling your IoT ecosystem, our global delivery model, IP-sensitive practices, and agile methodologies ensure faster innovation cycles and reduced risk.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80',
    color: 'from-[#7C3AED] to-[#0066FF]',
    tags: ['Embedded Systems', 'AI/ML', 'Cloud-Native', 'IoT Engineering', 'Cybersecurity'],
    stats: [
      { value: '40%', label: 'Faster Time-to-Market' },
      { value: '60%', label: 'Shorter Dev Cycles' },
      { value: '35%', label: 'Cost Efficiency' },
      { value: '50%', label: 'Improved Scalability' },
    ],
    challenges: [
      { icon: '💻', title: 'Long Product Development Cycles', desc: 'Time-to-market pressures require rapid development across embedded, software, and hardware systems without compromising quality or security.' },
      { icon: '📡', title: 'Next-Gen Connectivity Complexity', desc: 'Building connected ecosystems using 5G, Wi-Fi 6, and LPWAN across smart homes, cities, and industries demands expertise in modern connectivity protocols and standards.' },
      { icon: '🔐', title: 'IP & Security Risks', desc: 'Proprietary technology, firmware, and connected devices face increasing threats in a hyper-connected world, requiring secure development lifecycles, encryption, and access control.' },
      { icon: '☁️', title: 'Scaling with Modern Architecture', desc: 'Traditional monolithic architectures unable to support the scalability, resilience, and CI/CD velocity demanded by modern hi-tech software products and SaaS platforms.' },
    ],
    solutions: [
      { icon: '🖥️', title: 'Embedded Systems & Firmware', desc: 'Design and development of low-level software for consumer electronics, automotive, and industrial devices.' },
      { icon: '🤖', title: 'AI/ML Model Development', desc: 'Custom machine learning models for predictive analytics, computer vision, NLP, and automation.' },
      { icon: '☁️', title: 'Cloud-Native Application Development', desc: 'Microservices-based architecture, containerization, and CI/CD pipelines for scalable software delivery.' },
      { icon: '📡', title: 'IoT Platform Engineering', desc: 'End-to-end IoT solutions including device integration, data ingestion, analytics, and remote management.' },
      { icon: '🔮', title: 'Digital Twin & Simulation', desc: 'Create virtual replicas of physical systems to simulate performance, predict failures, and optimize operations.' },
      { icon: '🔐', title: 'Cybersecurity & Compliance', desc: 'Secure development practices, vulnerability assessments, and compliance with standards like ISO 27001 and NIST.' },
    ],
    services: ['Application Services', 'AI Services', 'Cloud Services', 'Cyber Security', 'DevOps Automation'],
    caseStudy: {
      client: 'Consumer Electronics Company',
      challenge: 'Long product development cycles and siloed embedded and software teams causing delayed time-to-market for new IoT-enabled smart devices.',
      solution: 'We implemented cloud-native microservices architecture, embedded firmware integration, and an end-to-end IoT platform with device management, data ingestion, and real-time analytics.',
      result: '40% faster time-to-market and 35% reduction in development costs within the first product cycle.',
    },
    faqs: [
      { q: 'What hi-tech industry solutions do you provide?', a: 'Embedded systems and firmware development, AI/ML model development, cloud-native application development, IoT platform engineering, digital twin and simulation, and cybersecurity and compliance services.' },
      { q: 'Can you develop embedded systems and firmware?', a: 'Yes, we design and develop low-level embedded software and firmware for consumer electronics, automotive systems, wearables, industrial devices, and IoT endpoints — across RTOS and bare-metal environments.' },
      { q: 'What cloud-native development capabilities do you offer?', a: 'We build microservices-based architectures with containerization (Docker, Kubernetes), automated CI/CD pipelines, and DevOps practices that enable scalable, resilient software delivery for hi-tech products and SaaS platforms.' },
      { q: 'How do you handle IP protection and security in hi-tech projects?', a: 'We implement secure development lifecycles (SDLC), code signing, encryption, firmware security, access controls, and regular vulnerability assessments — protecting intellectual property and complying with ISO 27001 and NIST frameworks.' },
      { q: 'Do you build IoT platforms for hi-tech applications?', a: 'Yes, we provide end-to-end IoT solutions covering device integration, connectivity (5G, Wi-Fi 6, LPWAN), data ingestion pipelines, real-time analytics, remote device management, and OTA firmware updates.' },
      { q: 'Can you develop AI/ML models for hi-tech applications?', a: 'Yes, we develop custom AI/ML models for predictive analytics, computer vision, NLP, anomaly detection, and process automation — including edge AI models optimized for deployment on resource-constrained IoT and embedded devices.' },
    ],
    relatedIndustries: ['manufacturing', 'automotive', 'energy-utilities'],
  },
  manufacturing: {
    icon: '🏭',
    title: 'Manufacturing',
    tagline: 'Digitally Transforming Manufacturing for Operational Excellence',
    desc: 'Smart factory solutions, digital twin development, AI-based quality inspection, predictive maintenance platforms, supply chain visibility tools, and MES integration for discrete, process, and hybrid manufacturers.',
    longDesc: 'At Rasta Infotech, we empower manufacturing enterprises to embrace Industry 4.0 and drive intelligent transformation across their production ecosystems. From smart factories and predictive maintenance to supply chain optimization and digital twins, our solutions are designed to enhance productivity, reduce downtime, and improve product quality. We combine deep domain expertise with cutting-edge technologies to help manufacturers modernize legacy systems, integrate real-time data, and achieve sustainable growth. Whether you\'re in discrete, process, or hybrid manufacturing, our digital platforms are built to scale with your business and deliver measurable outcomes. We understand the challenges faced by modern manufacturers — from legacy system integration to workforce enablement and sustainability. Our solutions are tailored to meet the unique needs of your operations, whether you\'re producing consumer goods, automotive components, electronics, or industrial machinery. With a focus on interoperability, scalability, and security, we help you build smart factories that are agile, efficient, and future-ready. Our engineering teams bring deep expertise in automation, data science, and industrial protocols to deliver solutions that drive real business value.',
    image: 'https://images.unsplash.com/photo-1565793979540-3e31ea7db41d?w=1200&q=80',
    color: 'from-[#7C3AED] to-[#0066FF]',
    tags: ['Industry 4.0', 'Predictive Maintenance', 'MES', 'Digital Twin', 'AI Quality'],
    stats: [
      { value: '25%', label: 'OEE Improvement' },
      { value: '40%', label: 'Downtime Reduction' },
      { value: '30%', label: 'Quality Improvement' },
      { value: '20%', label: 'Energy Savings' },
    ],
    challenges: [
      { icon: '🏭', title: 'Smart Manufacturing', desc: 'Digitize production processes with IoT-enabled equipment, MES integration, and real-time performance monitoring to replace manual, disconnected shop floor operations.' },
      { icon: '🔧', title: 'Predictive Maintenance', desc: 'Use sensor data and AI to anticipate equipment failures, reduce unplanned downtime, and extend asset life cycles across production facilities.' },
      { icon: '📦', title: 'Supply Chain Optimization', desc: 'Enhance visibility, traceability, and responsiveness across your supply network with digital logistics platforms to mitigate disruptions and reduce costs.' },
      { icon: '🔮', title: 'Digital Twin in Manufacturing', desc: 'Creating virtual replicas of production lines and assets to simulate performance, predict failures, and optimize throughput without interrupting live operations.' },
    ],
    solutions: [
      { icon: '🏭', title: 'Smart Factory Solutions', desc: 'End-to-end implementation of connected factory systems with real-time data acquisition, analytics, and automation.' },
      { icon: '🔮', title: 'Digital Twin Development', desc: 'Create virtual models of machines, processes, and facilities to simulate performance and optimize operations.' },
      { icon: '✅', title: 'AI-Based Quality Inspection', desc: 'Computer vision and machine learning models to detect defects, classify products, and ensure compliance.' },
      { icon: '🔧', title: 'Predictive Maintenance Platforms', desc: 'Sensor-based monitoring and AI algorithms to forecast equipment failures and schedule proactive maintenance.' },
      { icon: '🔗', title: 'Supply Chain Visibility Tools', desc: 'IoT and blockchain-powered platforms to track inventory, shipments, and supplier performance in real time.' },
      { icon: '📊', title: 'Manufacturing Execution System (MES) Integration', desc: 'Custom integration of MES platforms with ERP, SCADA, and shop floor systems for unified production control.' },
    ],
    services: ['AI Services', 'Enterprise Automation', 'Infrastructure Services', 'SAP Consulting', 'IoT Solutions'],
    caseStudy: {
      client: 'Auto Components Manufacturer',
      challenge: 'Frequent unplanned equipment downtime causing production losses worth crores monthly.',
      solution: 'We implemented IoT-based predictive maintenance with ML models predicting failures 2 weeks in advance.',
      result: '40% reduction in unplanned downtime and 25% improvement in Overall Equipment Effectiveness.',
    },
    faqs: [
      { q: 'What manufacturing solutions do you provide?', a: 'Smart factory solutions, digital twin development, AI-based quality inspection, predictive maintenance platforms, supply chain visibility tools, and MES integration.' },
      { q: 'What is a Smart Factory and how do you implement it?', a: 'A smart factory uses IoT-enabled equipment, MES integration, and real-time analytics to digitize production. We provide end-to-end implementation with connected systems for data acquisition, automation, and performance monitoring.' },
      { q: 'How does Digital Twin technology benefit manufacturers?', a: 'Digital twins create virtual replicas of machines, production lines, and facilities — allowing you to simulate performance, predict failures, and optimize throughput without disrupting live operations.' },
      { q: 'How does AI-based quality inspection work?', a: 'We deploy computer vision and machine learning models on the production line to detect defects, classify products, and ensure compliance in real time — reducing waste and rework significantly.' },
      { q: 'Can you integrate MES with our existing ERP system?', a: 'Yes, we provide custom integration of MES platforms with ERP, SCADA, and shop floor systems for unified production control and real-time data flow.' },
      { q: 'How do you help optimize manufacturing supply chains?', a: 'We deploy IoT and blockchain-powered platforms to track inventory, shipments, and supplier performance in real time — enhancing visibility, traceability, and agility across your entire supply network.' },
    ],
    relatedIndustries: ['automotive', 'logistics', 'energy-utilities'],
  },
  communications: {
    icon: '📡',
    title: 'Communications',
    tagline: 'Revolutionizing the Communications Industry with Next-Gen Digital Solutions',
    desc: '5G network engineering, OSS/BSS transformation, customer experience management, cloud migration, media streaming platforms, and telecom cybersecurity for CSPs, telecom operators, and media enterprises.',
    longDesc: 'In an era defined by hyper-connectivity and digital disruption, Rasta Infotech empowers communication service providers (CSPs), telecom operators, and media enterprises to transform their networks, operations, and customer experiences. From 5G infrastructure and cloud-native OSS/BSS systems to real-time analytics and AI-driven personalization, we help accelerate digital transformation across the communications value chain. Our solutions are designed to enhance network performance, optimize customer journeys, and drive operational agility. We support telcos in unlocking new revenue streams through digital platforms, IoT monetization, and edge computing. Our experts bring deep telecom domain knowledge and digital engineering capabilities — with a commitment to network reliability, compliance (GDPR, TRAI, FCC), and superior user experiences — helping telecom and media companies lead the next phase of digital innovation.',
    image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=1200&q=80',
    color: 'from-[#0066FF] to-[#7C3AED]',
    tags: ['5G Networks', 'OSS/BSS', 'Customer Experience', 'Media Streaming', 'Telecom Security'],
    stats: [
      { value: '40%', label: 'Faster Service Launch' },
      { value: '35%', label: 'Churn Reduction' },
      { value: '50%', label: 'Network Efficiency' },
      { value: '30%', label: 'OpEx Savings' },
    ],
    challenges: [
      { icon: '📡', title: '5G Network Complexity', desc: 'CSPs face significant engineering challenges in designing, deploying, and optimizing 5G infrastructure with SDN/NFV and edge computing to deliver ultra-low latency services at scale.' },
      { icon: '📱', title: 'Poor Digital Customer Experience', desc: 'Fragmented customer touchpoints and lack of AI-driven personalization causing high churn rates and low satisfaction among telecom subscribers.' },
      { icon: '💼', title: 'Legacy OSS/BSS Limitations', desc: 'Monolithic BSS/OSS stacks unable to support rapid service launches, flexible billing, partner integration, or the operational agility demanded by digital-first telecom businesses.' },
      { icon: '🔐', title: 'Telecom Cybersecurity Threats', desc: 'Telecom infrastructure increasingly targeted by DDoS attacks, data breaches, and insider threats, requiring zero-trust models and advanced threat detection frameworks.' },
    ],
    solutions: [
      { icon: '📡', title: '5G Network Engineering & Virtualization', desc: 'Build and optimize 5G networks using SDN, NFV, and edge computing to deliver ultra-fast, reliable connectivity.' },
      { icon: '📊', title: 'Customer Experience Management (CEM)', desc: 'Leverage real-time analytics, AI, and behavior insights to create personalized experiences and reduce churn.' },
      { icon: '💼', title: 'OSS/BSS Transformation', desc: 'Modernize your OSS/BSS stack to streamline service delivery, enhance monetization, and reduce time to market.' },
      { icon: '☁️', title: 'Cloud Migration for Telcos', desc: 'Seamlessly migrate legacy infrastructure to secure, scalable, cloud-native environments with minimal downtime.' },
      { icon: '🎬', title: 'Media & Streaming Platform Development', desc: 'Design OTT, IPTV, and streaming platforms with adaptive bitrate streaming, DRM, and audience analytics.' },
      { icon: '🔐', title: 'Telecom Cybersecurity Solutions', desc: 'Implement zero-trust security, threat detection, and data privacy solutions tailored for telecom and media networks.' },
    ],
    services: ['Application Services', 'AI Services', 'Cloud Services', 'Cyber Security', 'Infrastructure Services'],
    caseStudy: {
      client: 'Regional Telecom Operator',
      challenge: 'Aging OSS/BSS stack causing slow service launches, billing errors, and inability to support digital self-care channels for customers.',
      solution: 'We transformed the OSS/BSS stack to a cloud-native, API-first architecture and built an AI-powered CEM platform with self-care portals, omnichannel engagement, and real-time analytics.',
      result: '40% faster service launch cycles, 35% reduction in customer churn, and 30% operational cost savings.',
    },
    faqs: [
      { q: 'What communications industry solutions do you provide?', a: '5G network engineering and virtualization, customer experience management, OSS/BSS transformation, cloud migration for telcos, media and streaming platform development, and telecom cybersecurity solutions.' },
      { q: 'Can you help with 5G network engineering and virtualization?', a: 'Yes, we design, deploy, and optimize 5G networks using SDN, NFV, and edge computing — enabling ultra-low latency services, network slicing, and real-time orchestration for CSPs and telecom operators.' },
      { q: 'How do you modernize OSS/BSS systems?', a: 'We transform legacy monolithic OSS/BSS stacks to cloud-native, API-first, modular architectures that support rapid service launches, flexible billing models, partner enablement, and seamless CRM and order management integration.' },
      { q: 'What does cloud migration for telcos involve?', a: 'We migrate legacy telecom infrastructure and applications to secure, scalable cloud environments — with network function virtualization, cloud-native microservices, automated CI/CD pipelines, and compliance with GDPR, TRAI, and FCC standards.' },
      { q: 'Can you build OTT media and streaming platforms?', a: 'Yes, we design and develop OTT, IPTV, and streaming platforms with adaptive bitrate streaming, multi-DRM integration (Widevine, FairPlay, PlayReady), audience analytics, and content recommendation engines.' },
      { q: 'How do you secure telecom and communication networks?', a: 'We implement zero-trust security frameworks, DDoS protection, threat detection and response, network access controls, and data privacy solutions aligned with GDPR and telecom-specific compliance requirements.' },
    ],
    relatedIndustries: ['media-entertainment', 'hi-tech', 'public-sector'],
  },
  'media-entertainment': {
    icon: '🎬',
    title: 'Media & Entertainment',
    tagline: 'Transforming content delivery with digital solutions',
    desc: 'OTT platforms, content management, digital rights management, and AI content recommendation.',
    longDesc: 'The media and entertainment industry is being transformed by digital consumption, streaming, and data-driven content strategies. Rasta Infotech helps media companies, OTT platforms, and entertainment businesses build engaging digital experiences that captivate audiences and drive subscriber growth.',
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1200&q=80',
    color: 'from-[#0066FF] to-[#7C3AED]',
    tags: ['OTT Platforms', 'Content Management', 'DRM', 'AI Recommendations', 'Streaming'],
    stats: [
      { value: '3x', label: 'Content Engagement' },
      { value: '50%', label: 'Subscriber Growth' },
      { value: '40%', label: 'Churn Reduction' },
      { value: '60%', label: 'Ad Revenue Increase' },
    ],
    challenges: [
      { icon: '📱', title: 'Multi-Platform Delivery', desc: 'Delivering content seamlessly across web, mobile, TV, and set-top boxes.' },
      { icon: '🔍', title: 'Content Discovery', desc: 'Users unable to find relevant content in large libraries.' },
      { icon: '🔒', title: 'Content Piracy', desc: 'Protecting valuable content from unauthorized distribution.' },
      { icon: '💰', title: 'Monetization', desc: 'Optimizing revenue through subscriptions, ads, and pay-per-view.' },
    ],
    solutions: [
      { icon: '📺', title: 'OTT Streaming Platform', desc: 'Multi-device OTT with adaptive streaming, live content, and VOD.' },
      { icon: '🤖', title: 'AI Content Recommendation', desc: 'ML-powered personalization engine driving content discovery and engagement.' },
      { icon: '📝', title: 'Content Management System', desc: 'Headless CMS for managing large content libraries across multiple channels.' },
      { icon: '🔒', title: 'Digital Rights Management', desc: 'Multi-DRM implementation protecting content from piracy.' },
      { icon: '💰', title: 'Monetization Engine', desc: 'Subscription management, ad insertion, and pay-per-view capabilities.' },
      { icon: '📊', title: 'Content Analytics', desc: 'Viewer behavior, content performance, and revenue analytics.' },
    ],
    services: ['Application Services', 'AI Services', 'Cloud Services', 'Digital Marketing', 'Cyber Security'],
    caseStudy: {
      client: 'Regional OTT Platform',
      challenge: 'Large content library but poor discoverability and high subscriber churn due to generic recommendations.',
      solution: 'We built an AI-powered content recommendation engine and improved streaming infrastructure for better performance.',
      result: '3x improvement in content engagement and 40% reduction in subscriber churn.',
    },
    faqs: [
      { q: 'What media solutions do you offer?', a: 'OTT platforms, content management, streaming infrastructure, DRM, and AI recommendations.' },
      { q: 'Can you build an OTT streaming platform?', a: 'Yes, end-to-end OTT with multi-device support, live streaming, VOD, and subscription management.' },
      { q: 'How does AI content recommendation work?', a: 'ML analyzes viewing patterns to suggest personalized content, increasing engagement.' },
      { q: 'Can you implement DRM?', a: 'Yes, multi-DRM integration with Widevine, FairPlay, and PlayReady.' },
      { q: 'Do you provide content management systems?', a: 'Yes, headless CMS solutions for managing large content libraries.' },
    ],
    relatedIndustries: ['retail-ecommerce', 'education', 'public-sector'],
  },
  'oil-gas': {
    icon: '⛽',
    title: 'Oil & Gas',
    tagline: 'Driving Efficiency and Safety in Oil & Gas Through Digital Innovation',
    desc: 'Predictive maintenance, digital twin development, pipeline monitoring, energy trading platforms, environmental compliance, and smart refinery automation for upstream, midstream, and downstream oil & gas enterprises.',
    longDesc: 'At Rasta Infotech, we empower upstream, midstream, and downstream oil & gas enterprises to optimize operations, enhance safety, and reduce environmental impact. Our digital solutions span asset management, predictive maintenance, real-time monitoring, and compliance automation. With deep domain expertise and advanced engineering capabilities, we help energy companies modernize infrastructure, improve decision-making, and achieve sustainable growth. We bring together energy sector expertise and digital engineering to help oil & gas companies navigate complex challenges — our solutions are built for scalability, security, and compliance, enabling smarter operations and safer environments whether you\'re optimizing exploration, refining, or distribution.',
    image: 'https://images.unsplash.com/photo-1518563077661-8f20c8ec5a96?w=1200&q=80',
    color: 'from-[#D97706] to-[#DC2626]',
    tags: ['Predictive Maintenance', 'Digital Twins', 'Pipeline Safety', 'Energy Trading', 'Environmental Compliance'],
    stats: [
      { value: '35%', label: 'Downtime Reduction' },
      { value: '40%', label: 'Operational Efficiency' },
      { value: '50%', label: 'Faster Anomaly Detection' },
      { value: '30%', label: 'Cost Savings' },
    ],
    challenges: [
      { icon: '⛽', title: 'Asset Performance Degradation', desc: 'Critical assets operating without real-time performance monitoring, leading to unplanned failures and costly downtime across upstream and midstream operations.' },
      { icon: '🛢️', title: 'Pipeline Integrity Risks', desc: 'Aging pipelines lacking IoT-based surveillance and leak detection systems, creating safety hazards and regulatory compliance exposure.' },
      { icon: '⚙️', title: 'Inefficient Refinery Operations', desc: 'Manual and fragmented refinery workflows causing throughput losses, safety incidents, and slow response to process deviations.' },
      { icon: '🌱', title: 'Environmental & Regulatory Pressure', desc: 'Growing regulations on emissions, spills, and environmental impact require automated monitoring, real-time IoT tracking, and compliance reporting across all facilities.' },
    ],
    solutions: [
      { icon: '🔧', title: 'Predictive Maintenance Solutions', desc: 'AI-powered systems to forecast equipment failures and schedule proactive maintenance.' },
      { icon: '🖥️', title: 'Digital Twin Development', desc: 'Virtual models of physical assets for simulation, performance monitoring, and optimization.' },
      { icon: '🛢️', title: 'Pipeline Monitoring Systems', desc: 'IoT-enabled platforms for leak detection, pressure monitoring, and remote surveillance.' },
      { icon: '📈', title: 'Energy Trading & Risk Management', desc: 'Secure platforms for real-time trading, analytics, and regulatory reporting.' },
      { icon: '🌿', title: 'Environmental Compliance Platforms', desc: 'Tools to monitor emissions, manage waste, and ensure adherence to environmental standards.' },
      { icon: '⚙️', title: 'Smart Refinery Automation', desc: 'Integrated control systems and dashboards to streamline refinery operations and improve throughput.' },
    ],
    services: ['AI Services', 'Application Services', 'Cloud Services', 'Cyber Security', 'Infrastructure Services'],
    caseStudy: {
      client: 'Upstream Oil & Gas Company',
      challenge: 'Frequent unplanned equipment failures at drilling sites causing costly downtime and safety risks with no real-time predictive visibility.',
      solution: 'We deployed AI-powered predictive maintenance with IoT sensor integrations, digital twin models of critical assets, and a real-time asset performance dashboard.',
      result: '35% reduction in unplanned downtime and 40% improvement in overall asset performance within the first year.',
    },
    faqs: [
      { q: 'What oil and gas digital solutions do you provide?', a: 'Predictive maintenance, digital twin development, pipeline monitoring systems, energy trading and risk management platforms, environmental compliance tools, and smart refinery automation.' },
      { q: 'How does predictive maintenance work in oilfields?', a: 'We integrate AI models with IoT sensor data from drilling equipment, compressors, and pumps to detect anomalies, predict failure probabilities, and trigger automated maintenance alerts — reducing unplanned downtime by up to 35%.' },
      { q: 'What is digital twin technology and how is it used in oil & gas?', a: 'A digital twin is a virtual replica of a physical asset — such as a well, pipeline, or refinery unit — that continuously mirrors real-world performance data. It enables simulation, predictive analytics, scenario testing, and remote health monitoring without physical intervention.' },
      { q: 'Can you build pipeline monitoring systems?', a: 'Yes, we implement IoT-enabled pipeline surveillance platforms with real-time leak detection, pressure and flow monitoring, geo-fencing alerts, and remote SCADA integration to ensure pipeline integrity and safety compliance.' },
      { q: 'Do you provide energy trading platforms?', a: 'Yes, we build secure, scalable energy trading and risk management (ETRM) platforms with real-time market data feeds, risk analytics, position management, and regulatory reporting capabilities.' },
      { q: 'How do you help with environmental compliance in oil & gas?', a: 'We deploy environmental monitoring platforms that use IoT sensors and analytics to track emissions, detect spills, manage waste streams, and generate compliance reports aligned with environmental regulations and sustainability targets.' },
    ],
    relatedIndustries: ['energy-utilities', 'manufacturing', 'public-sector'],
  },
  'energy-utilities': {
    icon: '⚡',
    title: 'Energy & Utilities',
    tagline: 'Empowering the Energy & Utilities Sector Through Digital Transformation',
    desc: 'Smart grid solutions, renewable energy management, energy analytics and forecasting, energy management systems, customer engagement platforms, and predictive maintenance for energy and utility companies.',
    longDesc: 'At Rasta Infotech, we help energy and utility companies modernize their infrastructure, optimize operations, and transition toward sustainable and resilient systems. Our digital solutions span across power generation, transmission, distribution, and customer engagement. With a focus on smart grids, renewable integration, predictive maintenance, and regulatory compliance, we enable organizations to meet the growing demand for clean, reliable, and efficient energy. Our deep industry expertise, combined with advanced technologies like AI, IoT, and cloud computing, positions us as a strategic partner for utilities navigating the energy transition. We understand the complexities and regulatory demands of the energy and utilities sector. Our solutions are designed to improve operational efficiency, enhance customer satisfaction, and support sustainability goals. Whether you\'re a power producer, grid operator, or utility service provider, we offer scalable, secure, and future-ready platforms that align with industry standards and environmental mandates. Our agile delivery model ensures rapid deployment and continuous innovation.',
    image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1200&q=80',
    color: 'from-[#00C896] to-[#0066FF]',
    tags: ['Smart Grid', 'Renewable Energy', 'Energy Analytics', 'Utility Management', 'IoT'],
    stats: [
      { value: '20%', label: 'Energy Savings' },
      { value: '35%', label: 'Grid Efficiency' },
      { value: '50%', label: 'Outage Reduction' },
      { value: '30%', label: 'AT&C Loss Reduction' },
    ],
    challenges: [
      { icon: '⚡', title: 'Smart Grid Visibility & Control', desc: 'Enable real-time monitoring, automated fault detection, and dynamic load balancing with intelligent grid technologies to address grid reliability challenges.' },
      { icon: '🌞', title: 'Renewable Energy Integration', desc: 'Integrate and manage distributed energy resources (DERs) with advanced forecasting and grid orchestration tools to handle variability in solar and wind generation.' },
      { icon: '📈', title: 'Energy Analytics & Demand Forecasting', desc: 'Leverage big data and machine learning to predict demand, optimize supply, and reduce operational costs across complex energy networks.' },
      { icon: '🔧', title: 'Predictive Maintenance for Energy Assets', desc: 'Using AI and sensor data to anticipate equipment failures and optimize maintenance schedules to reduce downtime and extend critical asset life.' },
    ],
    solutions: [
      { icon: '⚡', title: 'Smart Grid Development', desc: 'Design and implementation of intelligent grid systems with real-time data acquisition, fault detection, and automated control.' },
      { icon: '🌞', title: 'Renewable Energy Integration', desc: 'Solutions for integrating solar, wind, and hydro power into grid infrastructure with advanced forecasting and load balancing.' },
      { icon: '📊', title: 'Energy Management Systems (EMS)', desc: 'Platforms to monitor, control, and optimize energy usage across industrial, commercial, and residential sectors.' },
      { icon: '📱', title: 'Customer Engagement Platforms', desc: 'Digital portals and mobile apps for billing, usage tracking, outage reporting, and personalized energy insights.' },
      { icon: '🔮', title: 'Predictive Maintenance & Asset Monitoring', desc: 'AI-driven tools to monitor equipment health, predict failures, and schedule maintenance to reduce downtime.' },
      { icon: '📋', title: 'Regulatory Compliance & Reporting', desc: 'Automated systems to ensure compliance with energy regulations, environmental standards, and audit requirements.' },
    ],
    services: ['AI Services', 'Infrastructure Services', 'Application Services', 'Cyber Security', 'IoT Solutions'],
    caseStudy: {
      client: 'State Electricity Distribution Company',
      challenge: 'High AT&C losses and frequent power outages due to lack of real-time grid visibility and manual operations.',
      solution: 'We implemented smart grid analytics with real-time monitoring, predictive outage detection, and energy theft detection.',
      result: '20% reduction in AT&C losses and 50% improvement in outage response time.',
    },
    faqs: [
      { q: 'What energy technology solutions do you provide?', a: 'Smart grid development, renewable energy integration, energy management systems (EMS), customer engagement platforms, predictive maintenance and asset monitoring, and regulatory compliance and reporting.' },
      { q: 'How do you help with smart grid development?', a: 'We design and implement intelligent grid systems with real-time data acquisition, automated fault detection, dynamic load balancing, and energy theft detection capabilities.' },
      { q: 'Can you help integrate renewable energy into existing grids?', a: 'Yes, we provide solutions for integrating solar, wind, and hydro power into existing grid infrastructure with advanced forecasting tools, grid orchestration, and load balancing to handle DER variability.' },
      { q: 'What is an Energy Management System (EMS)?', a: 'An EMS is a platform that monitors, controls, and optimizes energy usage across industrial, commercial, and residential sectors — enabling real-time decisions and cost optimization.' },
      { q: 'How does predictive maintenance work for energy assets?', a: 'We use AI and IoT sensor data to continuously monitor equipment health, detect anomalies, and predict failures before they occur — enabling scheduled maintenance that reduces unplanned downtime and extends asset life.' },
      { q: 'How do you ensure regulatory compliance for energy companies?', a: 'We build automated compliance and reporting systems aligned with energy regulations and environmental standards, including audit trails, compliance dashboards, and real-time alerts for regulatory changes.' },
    ],
    relatedIndustries: ['manufacturing', 'public-sector', 'automotive'],
  },
  hospitality: {
    icon: '🏨',
    title: 'Hospitality',
    tagline: 'Redefining Guest Experiences Through Smart Hospitality',
    desc: 'Smart hotel operations, AI concierge, contactless guest experiences, integrated booking engines, guest analytics, and revenue management for hotels, resorts, and travel businesses.',
    longDesc: 'At Rasta Infotech, we help hotels, resorts, and travel businesses embrace digital transformation to deliver seamless, personalized, and efficient guest experiences. From smart room automation to AI-powered concierge services and integrated booking platforms, our solutions are designed to elevate hospitality operations. We combine deep industry knowledge with cutting-edge technology to create memorable stays and operational excellence. Our platforms are scalable, secure, and designed for real-time responsiveness — whether you\'re managing a boutique hotel or a global chain, we provide tailored solutions that enhance service delivery, streamline operations, and boost guest satisfaction.',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200&q=80',
    color: 'from-[#D97706] to-[#0066FF]',
    tags: ['Smart Hotels', 'IoT Automation', 'PMS Integration', 'Guest Experience', 'Revenue Management'],
    stats: [
      { value: '35%', label: 'Operational Cost Reduction' },
      { value: '45%', label: 'Faster Check-In' },
      { value: '90%', label: 'Guest Satisfaction' },
      { value: '25%', label: 'Revenue Increase' },
    ],
    challenges: [
      { icon: '🏨', title: 'Inefficient Hotel Operations', desc: 'Front desk, housekeeping, and maintenance workflows remain manual, causing delays and elevated operational costs.' },
      { icon: '📱', title: 'Lack of Contactless Experience', desc: 'Guests expect mobile check-in/out, digital keys, and app-based room controls but these capabilities are absent, creating friction.' },
      { icon: '📊', title: 'Revenue & Pricing Gaps', desc: 'Without AI-driven forecasting and dynamic pricing tools, maximizing occupancy and profitability across OTA and direct channels is difficult.' },
      { icon: '🔗', title: 'Disconnected Systems', desc: 'Fragmented PMS, CRM, booking engines, and housekeeping apps limiting unified operational visibility and guest data management.' },
    ],
    solutions: [
      { icon: '🏨', title: 'Smart Room Automation', desc: 'IoT-enabled controls for lighting, temperature, and entertainment systems to enhance in-room comfort and energy efficiency.' },
      { icon: '🤖', title: 'AI Concierge & Chatbots', desc: '24/7 virtual assistants for guest queries, bookings, room service requests, and personalized recommendations.' },
      { icon: '📱', title: 'Mobile Check-In & Digital Keys', desc: 'Contactless solutions for seamless guest arrival and room access via smartphones, eliminating front desk queues.' },
      { icon: '🖥️', title: 'Property Management System (PMS) Integration', desc: 'Custom integrations with leading PMS platforms for unified operations and guest data management.' },
      { icon: '⭐', title: 'Guest Feedback & Loyalty Platforms', desc: 'Tools to collect real-time feedback, manage reviews, and drive repeat bookings through loyalty programs.' },
      { icon: '📈', title: 'Revenue & Channel Management', desc: 'AI-powered tools to optimize pricing, manage OTA listings, and increase direct bookings for maximum occupancy and profitability.' },
    ],
    services: ['AI Services', 'Application Services', 'Cloud Services', 'Digital Marketing', 'Enterprise Automation'],
    caseStudy: {
      client: 'Boutique Hotel Chain',
      challenge: 'Manual front desk operations, no digital guest experience, and heavy OTA dependency causing high commission costs and low guest loyalty.',
      solution: 'We implemented smart room IoT automation, mobile check-in with digital keys, an AI concierge chatbot, and a direct booking engine integrated with the PMS.',
      result: '35% reduction in operational costs, 45% faster check-in times, and a 25% increase in direct bookings within six months.',
    },
    faqs: [
      { q: 'What hospitality technology solutions do you provide?', a: 'Smart room automation, AI concierge chatbots, mobile check-in and digital keys, PMS integration, integrated booking engines, guest feedback platforms, guest analytics, and AI-driven revenue management tools.' },
      { q: 'How does smart room automation work?', a: 'IoT sensors and controllers connect lighting, HVAC, entertainment, and security systems, allowing guests to control everything via a mobile app or voice assistant while the hotel monitors energy usage in real time.' },
      { q: 'Can you integrate with our existing Property Management System?', a: 'Yes, we build custom integrations with all major PMS platforms including Opera, Protel, Cloudbeds, and others, ensuring seamless data flow across front desk, housekeeping, and billing.' },
      { q: 'How do AI concierge chatbots help guests?', a: 'They provide instant 24/7 responses to guest queries, handle room service orders, restaurant reservations, local recommendations, and pre-arrival communications — reducing front desk load while enhancing guest satisfaction.' },
      { q: 'How do you help increase direct bookings?', a: 'We build integrated booking engines with dynamic pricing, loyalty incentives, and seamless payment flows that compete with OTA platforms, reducing commission costs and building direct guest relationships.' },
      { q: 'How do you use guest analytics to improve services?', a: 'We leverage data to understand guest preferences, identify service gaps, personalize in-stay experiences, and drive loyalty through targeted offers — resulting in higher guest satisfaction and repeat visits.' },
    ],
    relatedIndustries: ['retail-ecommerce', 'travel-transportation', 'media-entertainment'],
  },
  'public-sector': {
    icon: '🏛️',
    title: 'Public Sector',
    tagline: 'Digital Government Services for an Inclusive, Efficient, and Secure Public Sector',
    desc: 'Citizen services portals, smart infrastructure, government cloud modernization, public sector data analytics, digital identity, and emergency response platforms for governments, public agencies, and non-profit organizations.',
    longDesc: 'At Rasta Infotech, we empower governments, public agencies, and non-profit organizations to leverage digital innovation for better service delivery, increased transparency, and enhanced citizen engagement. As governments worldwide embrace digital-first initiatives, we provide cutting-edge solutions that modernize public infrastructure, automate services, and optimize resource utilization. We specialize in helping local, state, and federal bodies accelerate e-governance, streamline operations, and enhance public trust. From smart cities and digital identity platforms to data-driven policymaking and cybersecurity, our tailored services are aligned with public sector compliance standards and citizen-centric goals. Our government solutions are built with accessibility (WCAG), interoperability (OGC, NIEM), and cybersecurity (NIST, ISO 27001) at their core — delivering transformational outcomes that benefit both government agencies and the communities they serve.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80',
    color: 'from-[#0066FF] to-[#3385FF]',
    tags: ['e-Governance', 'Smart Cities', 'Cybersecurity', 'Digital Identity', 'GovTech'],
    stats: [
      { value: '70%', label: 'Service Efficiency' },
      { value: '80%', label: 'Citizen Satisfaction' },
      { value: '50%', label: 'Paper Reduction' },
      { value: '40%', label: 'Cost Savings' },
    ],
    challenges: [
      { icon: '🏛️', title: 'Digital Gap in Public Services', desc: 'Manual, paper-based government processes causing long queues, slow service delivery, and citizen dissatisfaction with limited access to digital portals and mobile services.' },
      { icon: '🛡️', title: 'Cybersecurity Vulnerabilities', desc: 'Critical national infrastructure, sensitive citizen data, and mission-critical systems increasingly targeted by sophisticated cyber threats without robust defensive frameworks in place.' },
      { icon: '🌐', title: 'Fragmented Urban Infrastructure', desc: 'Disconnected city systems lacking IoT-enabled intelligence for traffic management, smart utilities, waste monitoring, and real-time operational visibility.' },
      { icon: '📊', title: 'Legacy Systems & Data Silos', desc: 'Aging government IT infrastructure and isolated data systems preventing unified service delivery, open data initiatives, cloud-first modernization, and evidence-based policymaking.' },
    ],
    solutions: [
      { icon: '🏛️', title: 'Citizen Services Portals', desc: 'Design and develop intuitive e-governance platforms for services like ID issuance, tax filing, welfare enrollment, and document verification.' },
      { icon: '🌐', title: 'Smart Infrastructure & IoT Solutions', desc: 'Deploy sensor-based networks for smart lighting, waste management, water monitoring, and energy-efficient public utilities.' },
      { icon: '☁️', title: 'Government Cloud Modernization', desc: 'Migrate legacy systems to secure cloud environments with built-in scalability, compliance, and disaster recovery capabilities.' },
      { icon: '📊', title: 'Public Sector Data Analytics', desc: 'Use advanced analytics and data visualization to support policy decisions, budget planning, and citizen sentiment analysis.' },
      { icon: '🆔', title: 'Digital Identity & Authentication Systems', desc: 'Build secure biometric and multi-factor authentication solutions that ensure identity verification for citizens and employees.' },
      { icon: '🚨', title: 'Emergency Response and Public Safety Platforms', desc: 'Create integrated platforms for emergency alert systems, disaster response coordination, and first-responder resource tracking.' },
    ],
    services: ['Application Services', 'Cyber Security', 'Cloud Services', 'AI Services', 'Infrastructure Services'],
    caseStudy: {
      client: 'Municipal Corporation',
      challenge: 'Manual citizen services causing long queues, delays, and poor service delivery with no digital channel for grievances or document processing.',
      solution: 'We built a comprehensive citizen services portal with online applications, payment integration, grievance management, and digital identity verification compliant with government standards.',
      result: '70% improvement in service delivery efficiency and 80% citizen satisfaction score achieved within the first year.',
    },
    faqs: [
      { q: 'What public sector digital solutions do you provide?', a: 'Citizen services portals, smart infrastructure and IoT, government cloud modernization, public sector data analytics, digital identity and authentication systems, and emergency response and public safety platforms.' },
      { q: 'How do you build citizen services portals?', a: 'We design intuitive e-governance platforms with online service delivery for ID issuance, tax filing, welfare enrollment, document verification, and grievance redressal — built with WCAG accessibility and NIEM interoperability standards.' },
      { q: 'Can you help with government cloud migration?', a: 'Yes, we migrate legacy government systems to secure, compliant cloud environments with built-in scalability, data sovereignty controls, audit trails, and disaster recovery capabilities.' },
      { q: 'How do you secure public sector IT systems?', a: 'We implement robust cybersecurity frameworks aligned with NIST and ISO 27001 standards, covering network security, identity and access management, threat detection, incident response, and continuous compliance monitoring.' },
      { q: 'What smart city solutions do you offer?', a: 'IoT-enabled smart infrastructure including intelligent traffic management, smart lighting, waste management automation, water quality monitoring, energy-efficient utilities, and real-time city operations dashboards.' },
      { q: 'Do you provide digital identity and authentication systems?', a: 'Yes, we build secure biometric and multi-factor authentication platforms that enable reliable identity verification for citizens accessing government services and employees accessing critical systems.' },
    ],
    relatedIndustries: ['healthcare', 'education', 'energy-utilities'],
  },
}

const industryNames: Record<string, string> = {
  healthcare: 'Healthcare & Life Sciences',
  'life-sciences': 'Life Sciences',
  'banking-finance': 'Banking & Finance',
  'retail-ecommerce': 'Retail & E-Commerce',
  education: 'Education & E-Learning',
  automotive: 'Automotive',
  'travel-transportation': 'Travel & Transportation',
  fintech: 'Fintech',
  logistics: 'Logistics & Supply Chain',
  'hi-tech': 'Hi-Tech Industry',
  manufacturing: 'Manufacturing',
  communications: 'Communications',
  'media-entertainment': 'Media & Entertainment',
  'oil-gas': 'Oil & Gas',
  'energy-utilities': 'Energy & Utilities',
  'public-sector': 'Public Sector',
  hospitality: 'Hospitality',
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

export default function IndustryDetail({ id }: { id: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const industry = industriesData[id]

  if (!industry) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 pt-32">
        <div className="text-6xl mb-4">🔍</div>
        <h1 className="text-white font-black text-3xl mb-4">Industry Not Found</h1>
        <p className="text-[#8892A4] mb-8">The industry page you are looking for does not exist.</p>
        <Link href="/industries" className="px-6 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-[#0066FF] to-[#00C896]">
          View All Industries
        </Link>
      </div>
    )
  }

  return (
    <section className="relative bg-[#0A1628] overflow-hidden">

      {/* Hero */}
      <div className="relative pt-32 pb-0">
        <div className="absolute inset-0 z-0">
          <img src={industry.image} alt={industry.title} className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A1628]/70 to-[#0A1628]" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="flex items-center gap-2 mb-6 text-sm flex-wrap">
            <Link href="/" className="text-[#8892A4] hover:text-white transition-colors">Home</Link>
            <span className="text-[#8892A4]">/</span>
            <Link href="/industries" className="text-[#8892A4] hover:text-white transition-colors">Industries</Link>
            <span className="text-[#8892A4]">/</span>
            <span className="text-white">{industry.title}</span>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#0066FF]/30 bg-[#0066FF]/10 mb-6">
            <span className="text-2xl">{industry.icon}</span>
            <span className="text-[#0066FF] text-sm font-semibold">{industry.title}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4 max-w-3xl">
            {industry.title}
          </h1>
          <p className={`text-lg font-semibold bg-gradient-to-r ${industry.color} bg-clip-text text-transparent mb-4`}>
            {industry.tagline}
          </p>
          <p className="text-[#8892A4] text-lg max-w-2xl leading-relaxed">{industry.longDesc}</p>
        </div>
      </div>

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">

          {/* Main Content */}
          <div className="xl:col-span-2 space-y-12">

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4"
            >
              {industry.stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.1 + i * 0.1 }}
                  className="text-center p-4 rounded-2xl border border-white/10 bg-white/5"
                >
                  <p className={`text-2xl font-black bg-gradient-to-r ${industry.color} bg-clip-text text-transparent`}>
                    {stat.value}
                  </p>
                  <p className="text-[#8892A4] text-xs mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Challenges */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-2xl lg:text-3xl font-black text-white mb-8">
                Industry{' '}
                <span className={`bg-gradient-to-r ${industry.color} bg-clip-text text-transparent`}>Challenges</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {industry.challenges.map((challenge, i) => (
                  <motion.div
                    key={challenge.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 + i * 0.08 }}
                    className="p-5 rounded-2xl border border-white/10 bg-white/5"
                  >
                    <div className="text-2xl mb-3">{challenge.icon}</div>
                    <h3 className="text-white font-bold text-base mb-2">{challenge.title}</h3>
                    <p className="text-[#8892A4] text-sm leading-relaxed">{challenge.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Solutions */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h2 className="text-2xl lg:text-3xl font-black text-white mb-8">
                Our{' '}
                <span className={`bg-gradient-to-r ${industry.color} bg-clip-text text-transparent`}>Solutions</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {industry.solutions.map((solution, i) => (
                  <motion.div
                    key={solution.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.4 + i * 0.08 }}
                    className="p-5 rounded-2xl border border-white/10 bg-white/5 hover:border-[#0066FF]/30 transition-all duration-300 group"
                  >
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${industry.color} flex items-center justify-center text-xl mb-3 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {solution.icon}
                    </div>
                    <h3 className="text-white font-bold text-base mb-2">{solution.title}</h3>
                    <p className="text-[#8892A4] text-sm leading-relaxed">{solution.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Relevant Services */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2 className="text-2xl font-black text-white mb-6">Relevant Services</h2>
              <div className="flex flex-wrap gap-3">
                {industry.services.map((service) => (
                  <Link
                    key={service}
                    href="/services"
                    className={`px-4 py-2 rounded-full text-sm font-semibold text-white bg-gradient-to-r ${industry.color} hover:shadow-lg transition-all duration-300`}
                  >
                    {service}
                  </Link>
                ))}
              </div>
            </motion.div>

            {/* Case Study */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="relative p-8 rounded-3xl overflow-hidden border border-[#00C896]/20"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#00C896]/10 to-[#0066FF]/10" />
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-6">
                  <span className="w-2 h-2 rounded-full bg-[#00C896]" />
                  <span className="text-[#00C896] text-xs font-bold uppercase tracking-widest">Case Study</span>
                </div>
                <h2 className="text-white font-black text-2xl mb-6">{industry.caseStudy.client}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div>
                    <p className="text-[#0066FF] text-xs font-bold uppercase tracking-wide mb-2">Challenge</p>
                    <p className="text-[#8892A4] text-sm leading-relaxed">{industry.caseStudy.challenge}</p>
                  </div>
                  <div>
                    <p className="text-[#00C896] text-xs font-bold uppercase tracking-wide mb-2">Solution</p>
                    <p className="text-[#8892A4] text-sm leading-relaxed">{industry.caseStudy.solution}</p>
                  </div>
                  <div>
                    <p className="text-yellow-400 text-xs font-bold uppercase tracking-wide mb-2">Result</p>
                    <p className="text-white text-sm font-bold leading-relaxed">{industry.caseStudy.result}</p>
                    <p className="text-[#8892A4] text-xs mt-2">Placeholder - to be updated by Rasta Infotech</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* FAQs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h2 className="text-2xl lg:text-3xl font-black text-white mb-8">
                Frequently Asked{' '}
                <span className={`bg-gradient-to-r ${industry.color} bg-clip-text text-transparent`}>Questions</span>
              </h2>
              <FAQAccordion faqs={industry.faqs} />
            </motion.div>

            {/* Related Industries */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <h2 className="text-2xl font-black text-white mb-6">Related Industries</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {industry.relatedIndustries.map((relId) => (
                  <Link
                    key={relId}
                    href={'/industries/' + relId}
                    className="group p-4 rounded-xl border border-white/10 bg-white/5 hover:border-[#0066FF]/40 hover:bg-[#0066FF]/5 transition-all duration-300 flex items-center gap-3"
                  >
                    <span className="text-2xl">{industriesData[relId]?.icon}</span>
                    <span className="text-[#8892A4] group-hover:text-white text-sm font-medium transition-colors">
                      {industryNames[relId]}
                    </span>
                    <svg className="w-4 h-4 text-[#0066FF] ml-auto group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sticky Sidebar */}
          <div className="xl:col-span-1">
            <div className="sticky top-28 space-y-6">

              {/* CTA */}
<motion.div
  initial={{ opacity: 0, x: 40 }}
  animate={isInView ? { opacity: 1, x: 0 } : {}}
  transition={{ duration: 0.6, delay: 0.2 }}
  className="p-6 rounded-2xl border border-[#0066FF]/30 bg-gradient-to-br from-[#0066FF]/10 to-[#00C896]/10"
>
  <h3 className="text-white font-black text-xl mb-2">Get Industry Solutions</h3>
  <p className="text-[#8892A4] text-sm mb-5">
    Talk to our {industry.title} specialists today.
  </p>

  <div className="space-y-3">

    <a
      href={'mailto:info@rastainfotech.com?subject=' + industry.title + ' Solutions Enquiry'}
      className={`flex items-center justify-center w-full py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r ${industry.color} hover:shadow-lg transition-all duration-300`}
    >
      Get Free Consultation
    </a>

    <a
      href="tel:+919742507066"
      className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-bold text-white border border-white/20 hover:border-white/40 transition-all duration-300"
    >
      📞 +91-97425-07066
    </a>

    <a
      href="https://wa.me/919742507066"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-bold text-[#25D366] border border-[#25D366]/20 hover:bg-[#25D366]/10 transition-all duration-300"
    >
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.52 3.48A11.8 11.8 0 0012.02 0C5.39 0 .02 5.37.02 12c0 2.12.55 4.2 1.6 6.04L0 24l6.14-1.6A11.96 11.96 0 0012.02 24c6.63 0 12-5.37 12-12 0-3.2-1.25-6.2-3.5-8.52zM12.02 22c-1.86 0-3.67-.5-5.26-1.45l-.38-.23-3.64.95.97-3.55-.25-.37A9.96 9.96 0 012.02 12c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10zm5.47-7.53c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.8-1.68-2.1-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.8.37-.27.3-1.05 1.02-1.05 2.48 0 1.45 1.07 2.85 1.22 3.05.15.2 2.1 3.2 5.1 4.48.71.3 1.26.48 1.7.62.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35z" />
      </svg>
      WhatsApp Chat
    </a>

  </div>
</motion.div>

              {/* All Industries */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="p-6 rounded-2xl border border-white/10 bg-white/5"
              >
                <h3 className="text-white font-black text-lg mb-4">All Industries</h3>
                <div className="space-y-1 max-h-80 overflow-y-auto">
                  {Object.entries(industryNames).map(([iid, name]) => (
                    <Link
                      key={iid}
                      href={'/industries/' + iid}
                      className={`flex items-center gap-2 p-2 rounded-lg text-xs transition-all duration-200 ${
                        iid === id
                          ? 'text-white bg-[#0066FF]/20 border border-[#0066FF]/30'
                          : 'text-[#8892A4] hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <span>{industriesData[iid]?.icon}</span>
                      {name}
                      {iid === id && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#0066FF]" />}
                    </Link>
                  ))}
                </div>
              </motion.div>

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}