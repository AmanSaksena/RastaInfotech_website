'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'

const industries = [
  {
    id: 'healthcare',
    icon: '🏥',
    title: 'Healthcare & Life Sciences',
    tagline: 'Transforming Healthcare Through Digital Innovation',
    desc: 'Empowering pharmaceutical, biotech, and medical device companies with digital therapeutics, remote patient monitoring, EMR/EHR systems, pharma CRM, health analytics, and compliance services.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80',
    color: 'from-[#DC2626] to-[#0066FF]',
    tags: ['Digital Therapeutics', 'EMR/EHR', 'Remote Patient Monitoring', 'Health Analytics'],
    stats: [
      { value: '40%', label: 'Cost Reduction' },
      { value: '60%', label: 'Faster Clinical Insights' },
      { value: '95%', label: 'Compliance Rate' },
    ],
    services: ['Application Services', 'AI Services', 'Cloud Services', 'Cyber Security'],
    caseStudy: {
      client: 'Multi-Specialty Hospital Network',
      challenge: 'Managing patient records manually across 5 locations causing delays, data loss, and compliance risks.',
      solution: 'We implemented a comprehensive EMR/EHR system with FHIR integration, remote patient monitoring, health analytics, and compliance validation.',
      result: '40% reduction in administrative costs, 60% faster clinical insights, and full HIPAA compliance achieved.',
    },
    faqs: [
      { q: 'What healthcare and life sciences solutions do you provide?', a: 'Digital therapeutics platforms, remote patient monitoring, EMR/EHR development with FHIR integration, pharma CRM, health analytics, clinical data management, and compliance and validation services.' },
      { q: 'Do you build FHIR-compliant EMR/EHR systems?', a: 'Yes, secure, interoperable EMR/EHR platforms with FHIR standards for seamless data exchange across hospitals, clinics, and third-party systems.' },
      { q: 'What is a digital therapeutics platform?', a: 'A custom application supporting patient behavior change and chronic condition management through AI/ML-driven insights, personalized care plans, and real-time monitoring.' },
      { q: 'Can you build pharma CRM using Salesforce?', a: 'Yes, Salesforce-based pharma CRM to streamline field force management, doctor engagement, reporting, and territory management.' },
      { q: 'How do you ensure HIPAA, FDA, and ISO 13485 compliance?', a: 'Our compliance and validation services audit digital assets, implement required controls, and generate documentation to meet HIPAA, FDA 21 CFR Part 11, and ISO 13485 standards.' },
    ],
  },
  {
    id: 'life-sciences',
    icon: '🔬',
    title: 'Life Sciences',
    tagline: 'Accelerating Innovation in Life Sciences Through Digital Transformation',
    desc: 'Partnering with pharma, biotech, and medical device companies to accelerate drug discovery, digitize clinical trials, ensure GxP compliance, and build regulatory-grade platforms across the life sciences value chain.',
    image: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800&q=80',
    color: 'from-[#7C3AED] to-[#0066FF]',
    tags: ['Drug Discovery', 'Clinical Trials', 'GxP Compliance', 'Medical Devices'],
    stats: [
      { value: '40%', label: 'Faster Drug Discovery' },
      { value: '60%', label: 'Trial Efficiency Gain' },
      { value: '50%', label: 'R&D Cost Reduction' },
    ],
    services: ['AI Services', 'Application Services', 'Cloud Services', 'Cyber Security'],
    caseStudy: {
      client: 'Global Pharmaceutical Company',
      challenge: 'Manual clinical trial data management across multiple sites causing delays, compliance risks, and poor visibility into trial outcomes.',
      solution: 'We implemented an integrated EDC and CTMS platform with ePRO, eConsent, wearables integration, and real-time analytics dashboards compliant with FDA 21 CFR Part 11.',
      result: '60% improvement in trial data processing speed, full GxP compliance, and 40% reduction in trial operational costs.',
    },
    faqs: [
      { q: 'What life sciences solutions do you provide?', a: 'AI-powered drug discovery, clinical trial digitization, GxP-compliant application development, regulatory document management, real-world evidence analytics, and medical device software engineering.' },
      { q: 'How does AI help in drug discovery?', a: 'Our AI platforms accelerate discovery by predicting molecular interactions, performing virtual compound screening, identifying biomarkers, and enabling in silico testing — shortening research and preclinical development cycles.' },
      { q: 'What does clinical trial digitization involve?', a: 'We implement ePRO, eConsent, wearables integration, EDC, CTMS, and real-time remote monitoring to optimize patient recruitment, data quality, and trial compliance.' },
      { q: 'Can you build GxP-compliant applications?', a: 'Yes, enterprise-grade platforms aligned with GxP, FDA 21 CFR Part 11, ALCOA+ principles, HIPAA, and ISO standards — with full audit trails, electronic signatures, and validation documentation.' },
      { q: 'Do you develop and validate medical device software?', a: 'Yes, we design and validate software for Class I–III medical devices per IEC 62304, FDA SaMD guidance, and ISO 14971 risk management standards.' },
    ],
  },
  {
    id: 'banking-finance',
    icon: '🏦',
    title: 'Banking & Finance',
    tagline: 'Empowering financial institutions with secure digital solutions',
    desc: 'Empowering banks, NBFCs, and financial institutions with core banking modernization, digital payments, fraud detection, and regulatory compliance solutions.',
    image: 'https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?w=800&q=80',
    color: 'from-[#0066FF] to-[#7C3AED]',
    tags: ['Core Banking', 'Digital Payments', 'Fraud Detection', 'RegTech'],
    stats: [
      { value: '99.9%', label: 'System Uptime' },
      { value: '50%', label: 'Faster Processing' },
      { value: '80%', label: 'Fraud Reduction' },
    ],
    services: ['Cyber Security', 'AI Services', 'Cloud Services', 'Blockchain'],
    caseStudy: {
      client: 'Regional Bank',
      challenge: 'Legacy core banking system causing slow transactions and inability to launch digital products.',
      solution: 'We modernized the core banking platform with microservices architecture and built a mobile banking app.',
      result: '50% faster transaction processing and successful launch of digital banking products.',
    },
    faqs: [
      { q: 'What banking technology solutions do you provide?', a: 'Core banking modernization, digital payments, mobile banking, fraud detection, and regulatory compliance.' },
      { q: 'How do you ensure financial data security?', a: 'Multi-layer security including encryption, tokenization, real-time fraud monitoring, and PCI DSS compliance.' },
      { q: 'Can you help with regulatory compliance?', a: 'Yes, we provide RBI, SEBI, and global banking regulatory compliance consulting and technology solutions.' },
      { q: 'Do you provide blockchain solutions for banking?', a: 'Yes, cross-border payments, trade finance, and KYC automation using blockchain.' },
      { q: 'What is your experience with core banking?', a: 'We have experience modernizing core banking systems for banks of all sizes across India.' },
    ],
  },
  {
    id: 'retail-ecommerce',
    icon: '🛒',
    title: 'Retail & E-Commerce',
    tagline: 'Driving retail innovation with smart commerce',
    desc: 'Driving retail innovation with omnichannel commerce platforms, AI-powered personalization, inventory optimization, and seamless customer experiences.',
    image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&q=80',
    color: 'from-[#00C896] to-[#0066FF]',
    tags: ['E-Commerce', 'Omnichannel', 'AI Personalization', 'Inventory Management'],
    stats: [
      { value: '65%', label: 'Conversion Increase' },
      { value: '40%', label: 'Cart Abandonment Drop' },
      { value: '3x', label: 'Revenue Growth' },
    ],
    services: ['Application Services', 'AI Services', 'Digital Marketing', 'Cloud Services'],
    caseStudy: {
      client: 'Multi-Brand Retail Chain',
      challenge: 'Siloed online and offline channels causing poor customer experience and inventory issues.',
      solution: 'We built a unified omnichannel platform with AI recommendations, real-time inventory sync, and mobile app.',
      result: '65% increase in conversions and 3x revenue growth within 6 months.',
    },
    faqs: [
      { q: 'What retail technology solutions do you offer?', a: 'E-commerce platforms, mobile apps, omnichannel integration, AI personalization, and inventory management.' },
      { q: 'Can you build a custom e-commerce platform?', a: 'Yes, we build scalable custom platforms or implement and customize Shopify, Magento, and WooCommerce.' },
      { q: 'How do you improve conversion rates?', a: 'Through AI-powered personalization, optimized checkout flows, A/B testing, and UX improvements.' },
      { q: 'Do you integrate with ERP and inventory systems?', a: 'Yes, seamless integration with SAP, Oracle, and custom ERP and inventory management systems.' },
      { q: 'Can you help with digital marketing for retail?', a: 'Yes, SEO, paid advertising, social commerce, and email marketing for retail businesses.' },
    ],
  },
  {
    id: 'education',
    icon: '🎓',
    title: 'Education & E-Learning',
    tagline: 'Enabling next-gen learning with digital platforms',
    desc: 'Enabling next-generation learning with custom LMS platforms, virtual classrooms, AI-powered adaptive learning, and education analytics solutions.',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80',
    color: 'from-[#7C3AED] to-[#00C896]',
    tags: ['LMS Platforms', 'Virtual Classrooms', 'Adaptive Learning', 'EdTech'],
    stats: [
      { value: '60%', label: 'Completion Rate Increase' },
      { value: '45%', label: 'Better Outcomes' },
      { value: '80%', label: 'Student Engagement' },
    ],
    services: ['Learning Management System', 'AI Services', 'Application Services', 'Cloud Services'],
    caseStudy: {
      client: 'National Education Platform',
      challenge: 'Traditional classroom model unable to scale and poor learning outcomes tracking.',
      solution: 'We built a comprehensive e-learning platform with AI adaptive learning paths and analytics dashboard.',
      result: '60% increase in course completion rates and measurable improvement in student outcomes.',
    },
    faqs: [
      { q: 'What education technology solutions do you build?', a: 'LMS platforms, virtual classrooms, mobile learning apps, assessment systems, and education analytics.' },
      { q: 'Do you support SCORM and xAPI standards?', a: 'Yes, all our LMS solutions support SCORM, xAPI, and AICC content standards.' },
      { q: 'Can you build a virtual classroom?', a: 'Yes, with video conferencing, whiteboard, breakout rooms, attendance tracking, and recording.' },
      { q: 'How does AI adaptive learning work?', a: 'AI analyzes student performance patterns and automatically adjusts content difficulty and learning paths.' },
      { q: 'Can you integrate with existing school management systems?', a: 'Yes, we integrate with ERP, SIS, and third-party educational tools.' },
    ],
  },
  {
    id: 'automotive',
    icon: '🚗',
    title: 'Automotive',
    tagline: 'Accelerating automotive innovation with connected tech',
    desc: 'Accelerating automotive innovation with connected vehicle platforms, dealer management systems, EV charging infrastructure, and automotive AI solutions.',
    image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80',
    color: 'from-[#0066FF] to-[#00C896]',
    tags: ['Connected Vehicles', 'Dealer Management', 'EV Solutions', 'Automotive AI'],
    stats: [
      { value: '35%', label: 'Sales Efficiency' },
      { value: '50%', label: 'Service Turnaround' },
      { value: '25%', label: 'Cost Reduction' },
    ],
    services: ['Application Services', 'AI Services', 'IoT Solutions', 'Cloud Services'],
    caseStudy: {
      client: 'Automobile Dealer Network',
      challenge: 'Fragmented dealer operations with no visibility into inventory, sales, and service across 50 locations.',
      solution: 'We implemented a unified dealer management system with real-time inventory, CRM, and service management.',
      result: '35% improvement in sales efficiency and 50% faster service turnaround.',
    },
    faqs: [
      { q: 'What automotive technology solutions do you provide?', a: 'Dealer management systems, connected vehicle platforms, EV solutions, and automotive AI.' },
      { q: 'Can you build a dealer management system?', a: 'Yes, complete DMS with inventory, CRM, service management, and financial reporting.' },
      { q: 'Do you have experience with connected vehicles?', a: 'Yes, IoT-based vehicle tracking, telematics, and predictive maintenance solutions.' },
      { q: 'Can you help with EV charging infrastructure?', a: 'Yes, EV charging network management platforms and mobile apps.' },
      { q: 'Do you integrate with OEM systems?', a: 'Yes, we integrate with major automotive OEM systems and third-party automotive APIs.' },
    ],
  },
  {
    id: 'travel-transportation',
    icon: '✈️',
    title: 'Travel & Transportation',
    tagline: 'Revolutionizing Travel & Transportation Through Digital Innovation',
    desc: 'Empowering travel, logistics, and transportation companies with AI-powered booking, intelligent fleet management, smart ticketing, multimodal platforms, logistics visibility, and sustainability monitoring.',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80',
    color: 'from-[#3385FF] to-[#00C896]',
    tags: ['Fleet Management', 'Smart Ticketing', 'Travel Booking', 'Sustainable Mobility'],
    stats: [
      { value: '30%', label: 'Fleet Efficiency' },
      { value: '45%', label: 'Booking Conversion' },
      { value: '50%', label: 'Operational Savings' },
    ],
    services: ['Application Services', 'AI Services', 'Cloud Services', 'Enterprise Automation'],
    caseStudy: {
      client: 'Regional Transport Authority',
      challenge: 'Manual ticketing and lack of real-time fleet visibility causing operational inefficiencies and revenue leakage.',
      solution: 'We implemented a smart ticketing system with GPS fleet tracking, passenger experience apps, and a real-time analytics dashboard.',
      result: '30% improvement in fleet efficiency and 45% increase in digital ticket sales.',
    },
    faqs: [
      { q: 'What travel and transportation solutions do you offer?', a: 'Travel booking platforms, intelligent fleet management, passenger experience apps, smart ticketing and fare collection, logistics and supply chain visibility, and sustainability and emissions monitoring.' },
      { q: 'Can you build a multimodal travel booking platform?', a: 'Yes, custom platforms integrating flights, hotels, buses, trains, and car rentals with real-time availability, dynamic pricing, and GDS integration (Amadeus, Sabre, Travelport).' },
      { q: 'How does your fleet management solution work?', a: 'IoT-enabled GPS dashboards with real-time vehicle tracking, driver behavior monitoring, predictive maintenance, and AI-powered route optimization to reduce fuel costs and improve uptime.' },
      { q: 'Can you implement smart ticketing for public transit?', a: 'Yes, contactless fare collection with NFC smart cards, QR code tickets, mobile ticketing apps, and integration with transit cards and digital wallets.' },
      { q: 'How do you support sustainability in transportation?', a: 'Carbon footprint tracking, fuel optimization analytics, route efficiency dashboards, and EV fleet management integration to help meet sustainability and emissions targets.' },
    ],
  },
  {
    id: 'fintech',
    icon: '💳',
    title: 'Fintech',
    tagline: 'Powering financial technology with secure solutions',
    desc: 'Powering the fintech revolution with payment processing platforms, digital lending, wealth management apps, and open banking solutions.',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80',
    color: 'from-[#0066FF] to-[#00C896]',
    tags: ['Payment Processing', 'Digital Lending', 'Wealth Management', 'Open Banking'],
    stats: [
      { value: '99.9%', label: 'Transaction Success' },
      { value: '70%', label: 'Processing Speed' },
      { value: '60%', label: 'Cost Reduction' },
    ],
    services: ['Application Services', 'Blockchain', 'AI Services', 'Cyber Security'],
    caseStudy: {
      client: 'Digital Lending Startup',
      challenge: 'Manual loan processing causing delays and poor customer experience.',
      solution: 'We built an automated digital lending platform with AI credit scoring and instant loan disbursement.',
      result: 'Loan processing time reduced from 7 days to 4 hours with 99.9% accuracy.',
    },
    faqs: [
      { q: 'What fintech solutions do you build?', a: 'Payment platforms, digital lending, wealth management, insurtech, and open banking solutions.' },
      { q: 'Are your fintech solutions RBI compliant?', a: 'Yes, all solutions comply with RBI guidelines, PCI DSS, and relevant financial regulations.' },
      { q: 'Can you build a payment gateway?', a: 'Yes, custom payment gateways with multi-currency support and fraud detection.' },
      { q: 'Do you have experience with AI credit scoring?', a: 'Yes, ML-based credit scoring models using alternative data sources for accurate risk assessment.' },
      { q: 'Can you implement open banking APIs?', a: 'Yes, account aggregation, payment initiation, and open banking API development.' },
    ],
  },
  {
    id: 'logistics',
    icon: '🚚',
    title: 'Logistics & Supply Chain',
    tagline: 'Driving Logistics Innovation with Digital Supply Chain Solutions',
    desc: 'Fleet and transport management, warehouse management systems, last-mile delivery optimization, supply chain analytics, digital freight platforms, and blockchain-powered transparency for logistics providers and 3PLs.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80',
    color: 'from-[#00C896] to-[#7C3AED]',
    tags: ['Supply Chain Visibility', 'Warehouse Management', 'Route Optimization', 'Last Mile', 'Digital Freight'],
    stats: [
      { value: '30%', label: 'Delivery Cost Reduction' },
      { value: '45%', label: 'On-Time Delivery' },
      { value: '60%', label: 'Warehouse Efficiency' },
    ],
    services: ['Application Services', 'AI Services', 'Enterprise Automation', 'Blockchain Solutions', 'Cloud Services'],
    caseStudy: {
      client: 'National Logistics Company',
      challenge: 'No real-time shipment visibility causing customer complaints and inability to proactively manage delays.',
      solution: 'We implemented end-to-end supply chain visibility with real-time tracking, predictive analytics, and a customer-facing portal.',
      result: '30% reduction in delivery costs and 45% improvement in on-time delivery.',
    },
    faqs: [
      { q: 'What logistics technology solutions do you offer?', a: 'Warehouse automation systems, TMS, fleet monitoring and telematics, last-mile delivery and route optimization, supply chain analytics and demand forecasting, digital freight platforms, blockchain in logistics, and reverse logistics and returns management.' },
      { q: 'How do you help with warehouse automation?', a: 'We deploy WMS platforms integrated with conveyor systems, pick/pack automation, robotic systems, barcode/RFID scanning, and real-time inventory control.' },
      { q: 'Can you build a digital freight marketplace?', a: 'Yes, cloud-based freight platforms and load boards where shippers and carriers connect in real time with dynamic pricing intelligence and integrated payments.' },
      { q: 'Do you provide blockchain solutions for logistics?', a: 'Yes, tamper-proof digital ledgers for transparent shipment history, document exchange, compliance records, and multi-party traceability.' },
      { q: 'How do you optimize last-mile delivery?', a: 'Mobile-first platforms for dispatch, navigation, proof of delivery, and intelligent dynamic route planning to reduce delivery times and costs.' },
    ],
  },
  {
    id: 'hi-tech',
    icon: '💻',
    title: 'Hi-Tech Industry',
    tagline: 'Accelerating Innovation in the Hi-Tech Industry',
    desc: 'Partnering with semiconductor, consumer electronics, and enterprise software companies to deliver embedded systems, AI/ML, cloud-native engineering, IoT platforms, digital twins, and cybersecurity solutions.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
    color: 'from-[#7C3AED] to-[#0066FF]',
    tags: ['Embedded Systems', 'AI/ML', 'Cloud-Native', 'IoT Engineering'],
    stats: [
      { value: '40%', label: 'Faster Time-to-Market' },
      { value: '60%', label: 'Shorter Dev Cycles' },
      { value: '35%', label: 'Cost Efficiency' },
    ],
    services: ['Application Services', 'AI Services', 'Cloud Services', 'Cyber Security'],
    caseStudy: {
      client: 'Consumer Electronics Company',
      challenge: 'Long product development cycles and siloed embedded and software teams causing delayed time-to-market for IoT-enabled smart devices.',
      solution: 'We implemented cloud-native microservices architecture, embedded firmware integration, and an end-to-end IoT platform with device management and real-time analytics.',
      result: '40% faster time-to-market and 35% reduction in development costs within the first product cycle.',
    },
    faqs: [
      { q: 'What hi-tech solutions do you provide?', a: 'Embedded systems and firmware, AI/ML model development, cloud-native application development, IoT platform engineering, digital twin and simulation, and cybersecurity and compliance services.' },
      { q: 'Can you develop embedded systems and firmware?', a: 'Yes, low-level embedded software and firmware for consumer electronics, automotive, wearables, and industrial devices — across RTOS and bare-metal environments.' },
      { q: 'What cloud-native capabilities do you offer?', a: 'Microservices architecture, containerization (Docker, Kubernetes), CI/CD pipelines, and DevOps practices for scalable and resilient hi-tech software products.' },
      { q: 'How do you handle IP protection and security?', a: 'Secure development lifecycles, code signing, firmware security, encryption, access controls, and compliance with ISO 27001 and NIST frameworks.' },
      { q: 'Do you build IoT platforms?', a: 'Yes, end-to-end IoT solutions covering device integration, 5G/Wi-Fi 6/LPWAN connectivity, data ingestion, real-time analytics, remote device management, and OTA updates.' },
    ],
  },
  {
    id: 'manufacturing',
    icon: '🏭',
    title: 'Manufacturing',
    tagline: 'Digitally Transforming Manufacturing for Operational Excellence',
    desc: 'Smart factory solutions, digital twin development, AI-based quality inspection, predictive maintenance platforms, supply chain visibility tools, and MES integration for discrete, process, and hybrid manufacturers.',
    image: 'https://images.unsplash.com/photo-1565793979540-3e31ea7db41d?w=800&q=80',
    color: 'from-[#7C3AED] to-[#0066FF]',
    tags: ['Industry 4.0', 'Predictive Maintenance', 'MES', 'Digital Twin', 'AI Quality'],
    stats: [
      { value: '25%', label: 'OEE Improvement' },
      { value: '40%', label: 'Downtime Reduction' },
      { value: '30%', label: 'Quality Improvement' },
    ],
    services: ['AI Services', 'Enterprise Automation', 'Infrastructure Services', 'SAP Consulting', 'IoT Solutions'],
    caseStudy: {
      client: 'Auto Components Manufacturer',
      challenge: 'Frequent unplanned equipment downtime causing production losses.',
      solution: 'We implemented IoT-based predictive maintenance with ML models predicting failures 2 weeks in advance.',
      result: '40% reduction in unplanned downtime and 25% improvement in Overall Equipment Effectiveness.',
    },
    faqs: [
      { q: 'What manufacturing solutions do you provide?', a: 'Smart factory solutions, digital twin development, AI-based quality inspection, predictive maintenance platforms, supply chain visibility tools, and MES integration.' },
      { q: 'What is a Smart Factory and how do you implement it?', a: 'A smart factory uses IoT-enabled equipment, MES integration, and real-time analytics to digitize production. We provide end-to-end implementation with connected systems for data acquisition, automation, and performance monitoring.' },
      { q: 'How does Digital Twin technology benefit manufacturers?', a: 'Digital twins create virtual replicas of machines and production lines — allowing you to simulate performance, predict failures, and optimize throughput without disrupting live operations.' },
      { q: 'How does AI-based quality inspection work?', a: 'Computer vision and ML models on the production line detect defects, classify products, and ensure compliance in real time — reducing waste and rework.' },
      { q: 'Can you integrate MES with our existing ERP system?', a: 'Yes, custom integration of MES platforms with ERP, SCADA, and shop floor systems for unified production control and real-time data flow.' },
    ],
  },
  {
    id: 'communications',
    icon: '📡',
    title: 'Communications',
    tagline: 'Revolutionizing the Communications Industry with Next-Gen Digital Solutions',
    desc: 'Empowering CSPs, telecom operators, and media enterprises with 5G network engineering, OSS/BSS transformation, customer experience management, cloud migration, streaming platforms, and telecom cybersecurity.',
    image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&q=80',
    color: 'from-[#0066FF] to-[#7C3AED]',
    tags: ['5G Networks', 'OSS/BSS', 'Customer Experience', 'Telecom Security'],
    stats: [
      { value: '40%', label: 'Faster Service Launch' },
      { value: '35%', label: 'Churn Reduction' },
      { value: '30%', label: 'OpEx Savings' },
    ],
    services: ['Application Services', 'AI Services', 'Cloud Services', 'Cyber Security'],
    caseStudy: {
      client: 'Regional Telecom Operator',
      challenge: 'Aging OSS/BSS stack causing slow service launches, billing errors, and inability to support digital self-care channels.',
      solution: 'We transformed the OSS/BSS to a cloud-native API-first architecture and built an AI-powered CEM platform with self-care portals and real-time analytics.',
      result: '40% faster service launches, 35% churn reduction, and 30% operational cost savings.',
    },
    faqs: [
      { q: 'What communications solutions do you provide?', a: '5G network engineering, customer experience management, OSS/BSS transformation, cloud migration for telcos, media and streaming platform development, and telecom cybersecurity.' },
      { q: 'Can you help with 5G network engineering?', a: 'Yes, we design, deploy, and optimize 5G networks using SDN, NFV, and edge computing for ultra-low latency services, network slicing, and real-time orchestration.' },
      { q: 'How do you modernize OSS/BSS systems?', a: 'We transform legacy stacks to cloud-native, API-first modular architectures supporting rapid service launches, flexible billing, partner enablement, and CRM integration.' },
      { q: 'Can you build OTT and streaming platforms?', a: 'Yes, OTT, IPTV, and streaming platforms with adaptive bitrate streaming, multi-DRM integration, audience analytics, and content recommendation engines.' },
      { q: 'How do you secure telecom networks?', a: 'Zero-trust security frameworks, DDoS protection, threat detection, network access controls, and data privacy solutions aligned with GDPR, TRAI, and FCC requirements.' },
    ],
  },
  {
    id: 'media-entertainment',
    icon: '🎬',
    title: 'Media & Entertainment',
    tagline: 'Transforming content delivery with digital solutions',
    desc: 'Transforming content delivery with OTT platforms, content management systems, digital rights management, and AI-powered content recommendation engines.',
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&q=80',
    color: 'from-[#0066FF] to-[#7C3AED]',
    tags: ['OTT Platforms', 'CMS', 'Digital Rights', 'Content Recommendation'],
    stats: [
      { value: '3x', label: 'Content Engagement' },
      { value: '50%', label: 'Subscriber Growth' },
      { value: '40%', label: 'Churn Reduction' },
    ],
    services: ['Application Services', 'AI Services', 'Cloud Services', 'Digital Marketing'],
    caseStudy: {
      client: 'Regional OTT Platform',
      challenge: 'High content library but poor discoverability and subscriber retention issues.',
      solution: 'We built AI-powered content recommendation engine and improved streaming infrastructure.',
      result: '3x improvement in content engagement and 40% reduction in subscriber churn.',
    },
    faqs: [
      { q: 'What media and entertainment solutions do you offer?', a: 'OTT platforms, content management, streaming infrastructure, DRM, and AI recommendations.' },
      { q: 'Can you build an OTT streaming platform?', a: 'Yes, end-to-end OTT with multi-device support, live streaming, VOD, and subscription management.' },
      { q: 'Do you provide content management systems?', a: 'Yes, headless CMS solutions for managing large content libraries across multiple channels.' },
      { q: 'How does AI content recommendation work?', a: 'ML algorithms analyze viewing patterns to suggest personalized content, increasing engagement.' },
      { q: 'Can you implement digital rights management?', a: 'Yes, DRM integration with multi-DRM support for content protection.' },
    ],
  },
  {
    id: 'oil-gas',
    icon: '⛽',
    title: 'Oil & Gas',
    tagline: 'Driving Efficiency and Safety in Oil & Gas Through Digital Innovation',
    desc: 'Empowering upstream, midstream, and downstream oil & gas enterprises with predictive maintenance, digital twins, pipeline monitoring, energy trading platforms, environmental compliance, and smart refinery automation.',
    image: 'https://images.unsplash.com/photo-1518563077661-8f20c8ec5a96?w=800&q=80',
    color: 'from-[#D97706] to-[#DC2626]',
    tags: ['Predictive Maintenance', 'Digital Twins', 'Pipeline Safety', 'Environmental Compliance'],
    stats: [
      { value: '35%', label: 'Downtime Reduction' },
      { value: '40%', label: 'Operational Efficiency' },
      { value: '30%', label: 'Cost Savings' },
    ],
    services: ['AI Services', 'Application Services', 'Cloud Services', 'Infrastructure Services'],
    caseStudy: {
      client: 'Upstream Oil & Gas Company',
      challenge: 'Frequent unplanned equipment failures at drilling sites causing costly downtime and safety risks with no real-time predictive visibility.',
      solution: 'We deployed AI-powered predictive maintenance with IoT sensor integrations, digital twin models, and a real-time asset performance dashboard.',
      result: '35% reduction in unplanned downtime and 40% improvement in overall asset performance within the first year.',
    },
    faqs: [
      { q: 'What oil and gas digital solutions do you provide?', a: 'Predictive maintenance, digital twin development, pipeline monitoring, energy trading and risk management platforms, environmental compliance tools, and smart refinery automation.' },
      { q: 'How does predictive maintenance work in oilfields?', a: 'We integrate AI models with IoT sensor data from drilling equipment and pumps to detect anomalies, predict failures, and trigger maintenance alerts — reducing unplanned downtime significantly.' },
      { q: 'What is digital twin technology and how is it used in oil & gas?', a: 'A digital twin is a virtual replica of a physical asset — well, pipeline, or refinery unit — that mirrors real-world performance for simulation, predictive analytics, and remote health monitoring.' },
      { q: 'Can you build pipeline monitoring and safety systems?', a: 'Yes, IoT-enabled platforms with real-time leak detection, pressure and flow monitoring, geo-fencing alerts, and SCADA integration to ensure pipeline integrity and safety compliance.' },
      { q: 'How do you help with environmental compliance?', a: 'We deploy monitoring platforms using IoT sensors and analytics to track emissions, detect spills, manage waste, and generate compliance reports aligned with environmental regulations.' },
    ],
  },
  {
    id: 'energy-utilities',
    icon: '⚡',
    title: 'Energy & Utilities',
    tagline: 'Empowering the Energy & Utilities Sector Through Digital Transformation',
    desc: 'Smart grid solutions, renewable energy management, energy analytics and forecasting, energy management systems, customer engagement platforms, and predictive maintenance for energy and utility companies.',
    image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&q=80',
    color: 'from-[#00C896] to-[#0066FF]',
    tags: ['Smart Grid', 'Renewable Energy', 'Energy Analytics', 'Utility Management'],
    stats: [
      { value: '20%', label: 'Energy Savings' },
      { value: '35%', label: 'Grid Efficiency' },
      { value: '50%', label: 'Outage Reduction' },
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
      { q: 'Can you help integrate renewable energy into existing grids?', a: 'Yes, solutions for integrating solar, wind, and hydro power with advanced forecasting tools, grid orchestration, and load balancing to handle DER variability.' },
      { q: 'How does predictive maintenance work for energy assets?', a: 'We use AI and IoT sensors to monitor equipment health, detect anomalies, and predict failures — enabling scheduled maintenance that reduces downtime and extends asset life.' },
      { q: 'How do you ensure regulatory compliance for energy companies?', a: 'We build automated compliance and reporting systems with audit trails, compliance dashboards, and real-time alerts aligned with energy regulations and environmental standards.' },
    ],
  },
  {
    id: 'hospitality',
    icon: '🏨',
    title: 'Hospitality',
    tagline: 'Redefining Guest Experiences Through Smart Hospitality',
    desc: 'Helping hotels, resorts, and travel businesses deliver seamless, personalized guest experiences with smart room automation, AI concierge, contactless check-in, integrated booking engines, guest analytics, and revenue management.',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80',
    color: 'from-[#D97706] to-[#0066FF]',
    tags: ['Smart Hotels', 'IoT Automation', 'PMS Integration', 'Guest Experience'],
    stats: [
      { value: '35%', label: 'Cost Reduction' },
      { value: '45%', label: 'Faster Check-In' },
      { value: '25%', label: 'Revenue Increase' },
    ],
    services: ['AI Services', 'Application Services', 'Cloud Services', 'Digital Marketing'],
    caseStudy: {
      client: 'Boutique Hotel Chain',
      challenge: 'Manual operations and OTA dependency causing high costs and low guest loyalty.',
      solution: 'Smart room IoT, mobile check-in with digital keys, AI concierge chatbot, and direct booking engine with PMS integration.',
      result: '35% operational cost reduction and 25% increase in direct bookings within six months.',
    },
    faqs: [
      { q: 'What hospitality technology solutions do you provide?', a: 'Smart room automation, AI concierge chatbots, mobile check-in and digital keys, PMS integration, integrated booking engines, guest feedback platforms, guest analytics, and AI-driven revenue management.' },
      { q: 'Can you integrate with our existing PMS?', a: 'Yes, we integrate with all major PMS platforms including Opera, Protel, Cloudbeds, and others for seamless data flow across front desk, housekeeping, and billing.' },
      { q: 'How does smart room automation work?', a: 'IoT sensors connect lighting, HVAC, entertainment, and security systems, allowing guests to control everything via a mobile app or voice assistant while the hotel monitors energy usage in real time.' },
      { q: 'How do AI concierge chatbots help guests?', a: '24/7 instant responses to guest queries, room service orders, restaurant reservations, and local recommendations — reducing front desk load while improving guest satisfaction.' },
      { q: 'How do you use guest analytics to improve services?', a: 'We leverage data to understand guest preferences, improve services, and drive loyalty through personalization — resulting in higher satisfaction and more repeat bookings.' },
    ],
  },
  {
    id: 'public-sector',
    icon: '🏛️',
    title: 'Public Sector',
    tagline: 'Digital Government Services for an Inclusive, Efficient, and Secure Public Sector',
    desc: 'Empowering governments and public agencies with citizen services portals, smart infrastructure, government cloud modernization, public sector analytics, digital identity, and emergency response platforms.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
    color: 'from-[#0066FF] to-[#3385FF]',
    tags: ['e-Governance', 'Smart Cities', 'Cybersecurity', 'Digital Identity'],
    stats: [
      { value: '70%', label: 'Service Efficiency' },
      { value: '80%', label: 'Citizen Satisfaction' },
      { value: '50%', label: 'Paper Reduction' },
    ],
    services: ['Application Services', 'Cyber Security', 'Cloud Services', 'AI Services'],
    caseStudy: {
      client: 'Municipal Corporation',
      challenge: 'Manual citizen services causing long queues, delays, and poor service delivery with no digital channel for grievances or document processing.',
      solution: 'We built a citizen services portal with online applications, payment integration, grievance management, and digital identity verification aligned with government standards.',
      result: '70% improvement in service delivery efficiency and 80% citizen satisfaction score within the first year.',
    },
    faqs: [
      { q: 'What public sector digital solutions do you provide?', a: 'Citizen services portals, smart infrastructure and IoT, government cloud modernization, public sector data analytics, digital identity and authentication, and emergency response and public safety platforms.' },
      { q: 'How do you build citizen services portals?', a: 'We design intuitive e-governance platforms for ID issuance, tax filing, welfare enrollment, document verification, and grievance redressal — built with WCAG accessibility and NIEM interoperability standards.' },
      { q: 'Can you help with government cloud migration?', a: 'Yes, we migrate legacy government systems to secure, compliant cloud environments with data sovereignty controls, audit trails, and disaster recovery capabilities.' },
      { q: 'How do you secure public sector IT systems?', a: 'We implement cybersecurity frameworks aligned with NIST and ISO 27001, covering network security, identity management, threat detection, incident response, and continuous compliance monitoring.' },
      { q: 'What smart city solutions do you offer?', a: 'IoT-enabled smart infrastructure including intelligent traffic management, smart lighting, waste management automation, water monitoring, energy-efficient utilities, and real-time city operations dashboards.' },
    ],
  },
]

function IndustryCard({ industry, index }: { industry: typeof industries[0]; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group rounded-2xl overflow-hidden border border-white/10 bg-white/5 hover:border-white/20 hover:-translate-y-2 transition-all duration-300"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={industry.image}
          alt={industry.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-[#0A1628]/50 to-transparent" />
        <div className={`absolute top-4 left-4 w-12 h-12 rounded-xl bg-gradient-to-br ${industry.color} flex items-center justify-center text-2xl shadow-lg`}>
          {industry.icon}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-white text-xl font-black mb-2 group-hover:text-[#0066FF] transition-colors duration-300">
          {industry.title}
        </h3>
        <p className={`text-xs font-semibold bg-gradient-to-r ${industry.color} bg-clip-text text-transparent mb-3`}>
          {industry.tagline}
        </p>
        <p className="text-[#8892A4] text-sm leading-relaxed mb-4 line-clamp-3">
          {industry.desc}
        </p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {industry.stats.map((stat) => (
            <div key={stat.label} className="text-center p-2 rounded-lg bg-white/5 border border-white/10">
              <p className={`text-sm font-black bg-gradient-to-r ${industry.color} bg-clip-text text-transparent`}>
                {stat.value}
              </p>
              <p className="text-[#8892A4] text-xs mt-0.5 leading-tight">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {industry.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="px-2 py-1 rounded-full text-xs border border-white/10 text-[#8892A4] bg-white/5">
              {tag}
            </span>
          ))}
        </div>

        {/* CTA */}
        <Link
          href={'/industries/' + industry.id}
          className={`inline-flex items-center gap-2 text-sm font-semibold bg-gradient-to-r ${industry.color} bg-clip-text text-transparent group-hover:gap-3 transition-all duration-300`}
        >
          Learn More
          <svg className="w-4 h-4 text-[#0066FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </motion.div>
  )
}

export default function IndustriesPage() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section className="relative bg-[#0A1628] overflow-hidden">

      {/* Hero */}
      <div className="relative pt-32 pb-16">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80"
            alt="Industries"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A1628]/60 to-[#0A1628]" />
        </div>
        <div className="relative z-10 text-center px-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#0066FF]/30 bg-[#0066FF]/10 mb-6">
            <span className="text-[#0066FF] text-sm font-semibold tracking-wide">Industries We Serve</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4">
            Our{' '}
            <span className="bg-gradient-to-r from-[#0066FF] to-[#00C896] bg-clip-text text-transparent">
              Industries
            </span>
          </h1>
          <p className="text-[#8892A4] text-lg max-w-2xl mx-auto">
            Delivering industry-specific digital transformation solutions across 12+ sectors worldwide.
          </p>
        </div>
      </div>

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">

        {/* Quick Nav */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          {industries.map((ind) => (
            <a
              key={ind.id}
              href={'#' + ind.id}
              className="px-4 py-2 rounded-full text-xs font-semibold border border-white/10 text-[#8892A4] hover:text-white hover:border-[#0066FF]/40 hover:bg-[#0066FF]/10 transition-all duration-300"
            >
              {ind.icon} {ind.title}
            </a>
          ))}
        </motion.div>

        {/* Industries Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {industries.map((industry, index) => (
            <div key={industry.id} id={industry.id}>
              <IndustryCard industry={industry} index={index} />
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="relative p-8 lg:p-12 rounded-3xl overflow-hidden text-center"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#0066FF]/10 to-[#00C896]/10" />
          <div className="absolute inset-0 border border-[#0066FF]/20 rounded-3xl" />
          <div className="relative z-10">
            <h3 className="text-2xl lg:text-3xl font-black text-white mb-3">
              {"Don't see your industry?"}
            </h3>
            <p className="text-[#8892A4] mb-6 max-w-xl mx-auto">
              We work with businesses across all sectors. Contact us to discuss how we can help transform your industry.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-bold text-white bg-gradient-to-r from-[#0066FF] to-[#00C896] hover:shadow-lg transition-all duration-300"
            >
              Talk to Our Experts
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}