'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { sapServicesData } from '@/lib/sapServicesData'

const servicesData: Record<string, {
  icon: string
  title: string
  tagline: string
  desc: string
  longDesc: string
  image: string
  color: string
  tags: string[]
  features: { icon: string; title: string; desc: string }[]
  process: { step: string; title: string; desc: string }[]
  caseStudy: { client: string; challenge: string; solution: string; result: string; duration: string }
  faqs: { q: string; a: string }[]
  relatedServices: string[]
  whyChoose?: string
  technologies?: string
}> = {
  sap: {
    icon: '⚙️',
    title: 'SAP Consulting Services',
    tagline: 'Optimize and streamline your enterprise operations',
    desc: 'End-to-end SAP implementation, customization, and support for enterprise-grade solutions.',
    longDesc: 'Rasta Infotech delivers comprehensive SAP consulting services that transform how enterprises manage their operations. From initial strategy and system design to full implementation, customization, and ongoing support — our certified SAP consultants bring deep expertise across all major SAP modules. We help businesses leverage the full power of SAP S/4HANA to drive efficiency, reduce costs, and gain real-time business insights.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80',
    color: 'from-[#0066FF] to-[#3385FF]',
    tags: ['SAP S/4HANA', 'SAP ECC', 'SAP BW/4HANA', 'SAP SuccessFactors', 'SAP Ariba'],
    features: [
      { icon: '🏗️', title: 'SAP S/4HANA Implementation', desc: 'Full greenfield and brownfield S/4HANA implementations tailored to your business processes.' },
      { icon: '⚙️', title: 'SAP Customization', desc: 'Custom ABAP development, Fiori app development, and workflow automation.' },
      { icon: '🔄', title: 'SAP Migration', desc: 'Seamless migration from legacy SAP ECC to S/4HANA with zero business disruption.' },
      { icon: '📊', title: 'SAP Analytics & BI', desc: 'SAP BW/4HANA and SAP Analytics Cloud for real-time business intelligence.' },
      { icon: '🛡️', title: 'SAP Security & GRC', desc: 'SAP GRC implementation for role-based access control and regulatory compliance.' },
      { icon: '🔧', title: '24/7 SAP Support', desc: 'Round-the-clock monitoring, incident management, and continuous improvement services.' },
    ],
    process: [
      { step: '01', title: 'Discovery & Assessment', desc: 'Analyze your current systems, business processes, and requirements.' },
      { step: '02', title: 'Solution Design', desc: 'Design the SAP landscape including architecture, integrations, and custom developments.' },
      { step: '03', title: 'Implementation', desc: 'Agile implementation with regular sprints, demos, and feedback loops.' },
      { step: '04', title: 'Testing & Validation', desc: 'Comprehensive testing including unit testing, integration testing, and UAT.' },
      { step: '05', title: 'Go-Live & Support', desc: 'Managed go-live with hypercare support and ongoing maintenance.' },
    ],
    caseStudy: {
      client: 'Large Manufacturing Enterprise',
      challenge: 'The client was running SAP ECC 6.0 with heavy customizations, facing performance issues and struggling with real-time reporting.',
      solution: 'We designed and executed a brownfield migration to SAP S/4HANA 2023, simplifying custom code and implementing SAP Analytics Cloud.',
      result: '40% reduction in operational costs, 60% improvement in report generation speed, and real-time inventory visibility across 12 plants.',
      duration: 'Placeholder - to be updated by Rasta Infotech',
    },
    faqs: [
      { q: 'What SAP modules do you support?', a: 'We support all major SAP modules including FI/CO, MM, SD, PP, QM, PM, HCM, SuccessFactors, Ariba, S/4HANA, and BW/4HANA.' },
      { q: 'How long does an SAP S/4HANA implementation take?', a: 'Depending on scope, implementations typically take 3-12 months using agile methodology.' },
      { q: 'Do you provide post-implementation support?', a: 'Yes, we offer 24/7 post-implementation support and continuous improvement services.' },
      { q: 'Can you migrate from legacy SAP to S/4HANA?', a: 'Absolutely. We specialize in both greenfield and brownfield S/4HANA migrations.' },
      { q: 'What industries do you serve with SAP?', a: 'Manufacturing, retail, healthcare, logistics, finance, utilities, and public sector.' },
    ],
    relatedServices: ['devops', 'cloud', 'ai'],
  },
  application: {
    icon: '💻',
    title: 'Application Services',
    tagline: 'End-to-End Application Services for Digital-First Enterprises',
    desc: 'Comprehensive application services covering the entire lifecycle — from ideation and design to development, deployment, and ongoing maintenance.',
    longDesc: 'In today\'s competitive and rapidly evolving digital landscape, applications are at the core of business innovation and user engagement. Whether it\'s a customer-facing mobile app, an enterprise-grade web portal, or a mission-critical backend system, applications must be fast, secure, scalable, and user-friendly. At Rasta InfoTech, we offer comprehensive application services that cover the entire lifecycle — from ideation and design to development, deployment, and ongoing maintenance. Our application services are engineered to accelerate your digital transformation journey. We combine modern software development methodologies like Agile and DevOps with cutting-edge technologies including microservices, APIs, cloud-native infrastructure, and AI-driven automation. Whether you\'re building a new application, re-engineering legacy systems, or integrating third-party solutions, we ensure quality, performance, and business alignment. With Rasta InfoTech, your applications become powerful enablers of growth, productivity, and innovation.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=80',
    color: 'from-[#7C3AED] to-[#0066FF]',
    tags: ['React', 'Angular', 'Node.js', 'Flutter', 'React Native', '.NET Core', 'Django', 'Microservices', 'Cloud-Native'],
    features: [
      { icon: '📱', title: 'Mobile Application Development', desc: 'High-performance mobile apps for Android and iOS using native (Swift, Kotlin) and cross-platform (Flutter, React Native) technologies, built for excellent user experiences across all devices.' },
      { icon: '💻', title: 'Web Application Development', desc: 'Responsive, secure, and scalable web applications using React, Angular, Node.js, .NET, and Laravel — optimized for performance, SEO, accessibility, and cross-browser compatibility.' },
      { icon: '🏢', title: 'Enterprise Application Services', desc: 'Robust enterprise-grade software — ERP systems, CRM platforms, supply chain solutions, and HRMS tools — integrating with core systems and supporting complex workflows at scale.' },
      { icon: '🔗', title: 'Application Integration Services', desc: 'Connect applications with CRMs, ERPs, databases, payment gateways, and third-party APIs to ensure seamless data exchange and unified business processes.' },
      { icon: '🧪', title: 'Application Testing & QA', desc: 'Comprehensive manual and automated testing ensuring applications are bug-free, secure, and performant. Unit, system, regression, and load testing using Jest, Mocha, Selenium, and Cypress.' },
      { icon: '🔧', title: 'Application Maintenance & Support', desc: '24/7 monitoring, troubleshooting, bug fixing, performance tuning, and version upgrades to keep your applications updated, secure, and aligned with user needs.' },
    ],
    process: [
      { step: '01', title: 'Requirements & Discovery', desc: 'Deep discovery sessions to understand your business objectives, user expectations, and technical constraints.' },
      { step: '02', title: 'UI/UX Design', desc: 'User-centric design process ensuring intuitive UI/UX with wireframes, prototypes, and usability testing.' },
      { step: '03', title: 'Agile Development', desc: 'Iterative sprint-based development with continuous feedback, faster releases, and real-time collaboration.' },
      { step: '04', title: 'Testing & Quality Assurance', desc: 'Multi-layer testing including unit, integration, performance, security, and automated regression testing.' },
      { step: '05', title: 'Deployment & CI/CD', desc: 'Smooth production deployment using Docker, Kubernetes, and CI/CD pipelines via Jenkins, GitHub Actions, and GitLab CI.' },
      { step: '06', title: 'Maintenance & Support', desc: 'Post-deployment performance tuning, feature enhancements, security updates, and ongoing technical support.' },
    ],
    caseStudy: {
      client: 'Multi-Industry Enterprise Client',
      challenge: 'Needed a complete digital transformation — replacing legacy monolithic applications with modern, scalable, cloud-native platforms while ensuring zero downtime.',
      solution: 'Built microservices-based architecture with React frontend, Node.js backend, and React Native mobile apps, with full DevOps CI/CD pipeline integration.',
      result: 'Significantly improved performance, faster release cycles, and enhanced user experience across web and mobile platforms.',
      duration: 'Contact us for details',
    },
    faqs: [
      { q: 'What technologies do you use for application development?', a: 'Frontend: React.js, Angular, Vue.js, Next.js. Backend: Node.js, .NET Core, Java Spring Boot, Django. Mobile: Swift, Kotlin, React Native, Flutter. Databases: MySQL, PostgreSQL, MongoDB, Firebase.' },
      { q: 'Do you provide app maintenance after launch?', a: 'Yes, we offer 24/7 monitoring, bug fixes, performance tuning, security updates, and feature enhancements post-deployment.' },
      { q: 'Can you modernize our legacy applications?', a: 'Yes, we re-engineer outdated applications using modern frameworks, architectures, and UI/UX design to enhance functionality without disrupting core operations.' },
      { q: 'How do you ensure app security?', a: 'We implement OAuth2, JWT, secure data storage, input validation, and regular security audits at every stage of development.' },
      { q: 'What is your app development process?', a: 'We follow Agile methodology — discovery, user-centric design, sprint-based development, multi-layer QA testing, CI/CD deployment, and continuous improvement.' },
    ],
    whyChoose: 'Rasta InfoTech is more than just an application development company — we are your strategic technology partner. With a team of experienced designers, developers, architects, and QA engineers, we take a holistic approach to application delivery. Every solution we build is aligned with your business objectives, user expectations, and industry standards. We follow a user-centric design process to ensure intuitive UI/UX. Our agile delivery model enables iterative development, faster releases, and real-time feedback. We adopt cloud-native and microservice-based architectures to ensure scalability and fault tolerance. Whether it\'s modernizing legacy systems or creating greenfield apps, we use secure coding practices, performance optimization, and continuous testing to deliver high-quality software. Our post-deployment services ensure ongoing performance tuning, feature enhancements, security updates, and technical support. Rasta InfoTech delivers reliable, future-ready applications that help businesses improve operations, deliver better customer experiences, and gain a competitive edge in the digital age.',
    technologies: 'Our application development services are powered by a wide range of technologies to suit diverse business needs and performance goals. For front-end development, we use React.js, Angular, Vue.js, and Next.js to create fast, interactive, and responsive UIs. On the backend, we specialize in Node.js, Express, .NET Core, Java Spring Boot, and Django for building powerful business logic and integrations. For mobile development, we work with Swift, Kotlin, React Native, and Flutter. We leverage REST and GraphQL APIs for seamless communication and third-party integration. Our databases include MySQL, PostgreSQL, MongoDB, and Firebase. For scalable deployments, we rely on Docker, Kubernetes, and cloud platforms like AWS, Azure, and GCP. We integrate DevOps pipelines for CI/CD using tools such as Jenkins, GitHub Actions, and GitLab CI. Security is built into every stage with authentication protocols (OAuth2, JWT), secure data storage, and input validation. Our QA processes include unit testing, integration testing, performance testing, and automated regression testing using Jest, Mocha, Selenium, and Cypress. We deliver robust, modern applications across industries including healthcare, finance, retail, logistics, and education.',
    relatedServices: ['devops', 'cybersecurity', 'ai'],
  },
  blockchain: {
    icon: '🔗',
    title: 'Blockchain Development',
    tagline: 'Blockchain – Expert Strategy, Seamless Solutions',
    desc: 'Scalable blockchain solutions that redefine how data and digital assets are managed — from smart contracts to full decentralized platforms.',
    longDesc: 'Blockchain is a revolutionary distributed ledger technology that maintains a continuously growing list of records, called blocks, linked and secured using cryptography. Each block contains a hash of the previous block, a timestamp, and transaction data — creating an immutable chain. This ledger, duplicated across a decentralized network, ensures transparency and security without intermediaries. Rasta InfoTech empowers businesses with scalable blockchain solutions that redefine how data and digital assets are managed. Whether integrating blockchain into existing systems or building a decentralized platform from scratch, our expert team is here to support you. We work with three core blockchain models: Public Blockchain — open to everyone, fully decentralized networks like Bitcoin and Ethereum offering maximum transparency; Private Blockchain — restricted networks controlled by specific organizations for greater control and privacy; and Hybrid Blockchain — combining elements of both, letting organizations control access to specific data while keeping other information public.',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1200&q=80',
    color: 'from-[#0066FF] to-[#7C3AED]',
    tags: ['Ethereum', 'Hyperledger Fabric', 'Polygon', 'Binance Smart Chain', 'Solidity', 'IPFS', 'Web3', 'NFT'],
    features: [
      { icon: '📜', title: 'Smart Contract Development', desc: 'Secure and self-executing contracts on Ethereum, Solana, or Binance Smart Chain.' },
      { icon: '📱', title: 'App Development', desc: 'Scalable, responsive decentralized applications tailored for industries like finance, gaming, and supply chain.' },
      { icon: '🏢', title: 'Private Blockchain', desc: 'Enterprise-grade blockchain networks with access control using Hyperledger Fabric or Quorum.' },
      { icon: '🖼️', title: 'NFT Platforms', desc: 'Complete NFT marketplaces with minting, trading, wallet integration, and auction features.' },
      { icon: '🪙', title: 'Custom Token Development', desc: 'Creation of utility, governance, and security tokens with compliance and listing support.' },
      { icon: '🔗', title: 'Blockchain Integration', desc: 'Connect blockchain backends with existing web or mobile apps using Web3 and REST APIs.' },
    ],
    process: [
      { step: '01', title: 'Use Case Analysis', desc: 'Evaluate whether blockchain is the right solution and identify the optimal platform and network type for your business.' },
      { step: '02', title: 'Architecture Design', desc: 'Design the blockchain network topology, smart contract architecture, and integration points.' },
      { step: '03', title: 'Development', desc: 'Smart contract and dApp development using Solidity, Web3, and industry-leading frameworks with rigorous security practices.' },
      { step: '04', title: 'Security Audit', desc: 'Thorough security audit of all smart contracts and blockchain components before mainnet deployment.' },
      { step: '05', title: 'Deployment & Integration', desc: 'Mainnet deployment and seamless integration with existing web or mobile applications via Web3 and REST APIs.' },
    ],
    caseStudy: {
      client: 'Enterprise Blockchain Client',
      challenge: 'Needed a secure, transparent system to manage digital assets and eliminate intermediaries causing delays and fraud across operations.',
      solution: 'Built a custom blockchain platform using Ethereum smart contracts and Hyperledger Fabric with full Web3 integration into their existing enterprise systems.',
      result: 'Eliminated intermediary costs, significantly reduced fraud, and achieved full transaction transparency across the network.',
      duration: 'Contact us for details',
    },
    faqs: [
      { q: 'Which blockchain platforms do you work with?', a: 'We work with Ethereum, Binance Smart Chain, Hyperledger Fabric, Polygon, and Solana — choosing the right platform based on your use case.' },
      { q: 'What is the difference between public and private blockchain?', a: 'Public blockchains like Ethereum are open to everyone with maximum transparency. Private blockchains restrict access to authorized participants, offering more control and privacy.' },
      { q: 'How secure are your smart contracts?', a: 'We follow strict development standards using Solidity best practices and conduct thorough security audits before any mainnet deployment.' },
      { q: 'Can you integrate blockchain with our existing systems?', a: 'Yes, we connect blockchain backends with your existing web or mobile apps using Web3 and REST APIs.' },
      { q: 'What is the cost of blockchain development?', a: 'Costs vary by complexity, platform, and scope. Contact us for a detailed estimate tailored to your project.' },
    ],
    whyChoose: 'Choosing Rasta InfoTech for your blockchain development means collaborating with a technology partner committed to delivering innovation, integrity, and impact. We understand that blockchain isn\'t just a tech trend — it\'s a revolution in how businesses operate. Our team excels in creating systems that eliminate intermediaries, reduce fraud, and foster trust through decentralization. With our experience in developing secure and scalable blockchain solutions, we ensure seamless integration with your enterprise architecture. From enhancing transaction transparency to enforcing data immutability, we help you unlock the full potential of blockchain technology in a way that aligns with your long-term digital goals.',
    technologies: 'To deliver cutting-edge blockchain solutions, Rasta InfoTech leverages a variety of platforms and tools tailored to meet client needs. We work with industry-leading technologies such as Ethereum, Binance Smart Chain, Hyperledger Fabric, and Polygon to design systems that are both flexible and future-ready. Using Solidity for smart contract programming and tools like IPFS for decentralized file storage, we create comprehensive solutions that handle everything from data transparency to transaction speed and scalability. Our tech stack ensures that your blockchain application is not only innovative but also secure, performant, and fully aligned with your business goals.',
    relatedServices: ['cybersecurity', 'ai', 'application'],
  },
  lms: {
    icon: '📚',
    title: 'Learning Management System (LMS)',
    tagline: 'Delivering Scalable & Engaging Learning Experiences',
    desc: 'A robust LMS platform tailored to deliver online education efficiently, engagingly, and securely — from corporate training to national e-governance initiatives.',
    longDesc: 'Rasta Infotech offers a robust Learning Management System (LMS) tailored to deliver online education efficiently, engagingly, and securely. Whether you\'re running a school, institution, or corporate training program, our LMS platform is designed to meet diverse learning needs — from early childhood development to national e-governance education initiatives. Built with a user-first approach, our LMS provides an intuitive interface, powerful automation, and rich content delivery models including live classes, assessments, progress tracking, and gamified learning. We empower education providers to scale, automate, and personalize their programs with cutting-edge digital tools designed for the future of learning. Our platform ensures zero lead leakage with real-time syncing, intelligent routing, and activity tracking. AI-powered follow-up reminders ensure no conversation falls through the cracks, boosting response times and conversion rates. It also facilitates hybrid and virtual learning delivery via traditional classroom, online virtual institutions, and knowledge banks accessible across web and mobile devices.',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80',
    color: 'from-[#00C896] to-[#7C3AED]',
    tags: ['E-Learning', 'LMS', 'AWS', 'WhatsApp API', 'AI Automation', 'CRM', 'Corporate Training', 'E-Governance'],
    features: [
      { icon: '🔄', title: 'Auto Lead Syncing', desc: 'Automatically sync leads into your system from forms, CRM, or third-party platforms to centralize lead management.' },
      { icon: '📞', title: 'Call Log Capturing', desc: 'Track all incoming and outgoing calls related to a lead or user, ensuring full traceability and audit trails.' },
      { icon: '📋', title: 'Rule-Based Auto Lead Distribution', desc: 'Assign leads to specific users or departments automatically based on predefined criteria or availability.' },
      { icon: '🗂️', title: 'Customized Lead Pipeline', desc: 'Define your own lead stages for enrollment, inquiry, or course progression with full customization options.' },
      { icon: '💰', title: 'Quick Quotation Builder', desc: 'Generate and share professional quotes instantly with pre-defined templates and automated workflows.' },
      { icon: '🔔', title: 'Lead Follow-Up Alerts', desc: 'Get AI-powered reminders and notifications for pending follow-ups to ensure no opportunity is missed.' },
      { icon: '📒', title: 'Buyer\'s Address Book Management', desc: 'Maintain and auto-update contact databases for all students, parents, or organizations interacting with the LMS.' },
      { icon: '📜', title: 'Lead History & Tracking', desc: 'View complete activity logs, communication history, and progress records for every learner or lead.' },
      { icon: '💬', title: 'WhatsApp, Calls & Email Communication', desc: 'Communicate with leads directly via WhatsApp, phone calls, emails, or SMS — all integrated in one place.' },
      { icon: '✉️', title: 'Automated Email Notifications', desc: 'Trigger automatic emails for signups, events, follow-ups, assignments, and reminders using customizable templates.' },
      { icon: '📊', title: 'Dashboard & Analytics', desc: 'Visual dashboards for monitoring learner engagement, performance, and operational KPIs across the system.' },
      { icon: '⚙️', title: 'Repetitive Workflow Automation', desc: 'Automate repetitive admin tasks like enrollments, reminders, document collection, and payment reminders.' },
      { icon: '🔐', title: 'User Permission & Role Management', desc: 'Grant role-based access to admins, instructors, and students with fine-grained permission controls.' },
      { icon: '🟢', title: 'Business WhatsApp API Integration', desc: 'Enable direct two-way messaging with learners or leads via secure Business WhatsApp APIs.' },
      { icon: '☎️', title: 'Click to Call Integration', desc: 'Enable your team to initiate voice calls to users or leads with one click from the platform interface.' },
      { icon: '📱', title: 'SMS API Integration', desc: 'Send instant alerts, reminders, and confirmations to students or parents using SMS gateway integration.' },
      { icon: '🔒', title: 'Secured SMTP Email Integration', desc: 'Ensure high deliverability of emails through secure and authenticated SMTP setups.' },
      { icon: '🧾', title: 'Purchase Order Management', desc: 'Track and manage purchase orders, course enrollments, or bulk registrations in a single module.' },
      { icon: '🔁', title: 'AMC & Renewal Management', desc: 'Monitor course renewal dates, AMC contracts, and subscription cycles with automatic renewal alerts.' },
      { icon: '📅', title: 'Event & Meeting Calendar', desc: 'Organize and manage classes, meetings, training sessions, and parent-teacher interactions using a unified calendar.' },
    ],
    process: [
      { step: '01', title: 'Requirements Analysis', desc: 'Understand your learning goals, user personas, content types, and integration requirements.' },
      { step: '02', title: 'Platform Design', desc: 'UX design focused on learner experience, admin efficiency, and mobile-first accessibility.' },
      { step: '03', title: 'Agile Development', desc: 'Sprint-based development with regular demos ensuring the platform meets your evolving needs.' },
      { step: '04', title: 'Integration & Configuration', desc: 'Set up CRM sync, WhatsApp API, SMS gateway, SMTP, and third-party integrations on AWS infrastructure.' },
      { step: '05', title: 'Launch & Support', desc: 'Managed go-live, user training, and ongoing platform support with real-time monitoring.' },
    ],
    caseStudy: {
      client: 'Educational Institution / Corporate Training Provider',
      challenge: 'Manual lead management, missed follow-ups, and fragmented communication causing poor enrollment rates and learner drop-off.',
      solution: 'Deployed the Rasta Infotech LMS with auto lead syncing, AI follow-up alerts, WhatsApp & SMS integration, role-based access, and a real-time analytics dashboard on AWS.',
      result: 'Zero lead leakage, significantly improved enrollment conversion rates, and fully automated admin workflows.',
      duration: 'Contact us for details',
    },
    faqs: [
      { q: 'Who is this LMS designed for?', a: 'Schools, institutions, corporate training programs, and government e-governance education initiatives of all sizes.' },
      { q: 'How does the LMS prevent lead leakage?', a: 'Through real-time syncing, intelligent routing, and activity tracking — ensuring every lead is captured and followed up automatically.' },
      { q: 'What communication channels are integrated?', a: 'WhatsApp (Business API), SMS, phone calls, and email (SMTP) — all accessible from within the platform.' },
      { q: 'Is the LMS hosted on secure infrastructure?', a: 'Yes, it is hosted on AWS ensuring top-tier performance, data safety, and reliability.' },
      { q: 'Can workflows be customized to our processes?', a: 'Yes, the platform supports fully customizable lead pipelines, role permissions, automation rules, and notification templates.' },
    ],
    whyChoose: 'Our LMS is designed to eliminate manual efforts, reduce lead leakage, and ensure consistent learner engagement through automation and AI. From auto-synced lead systems to communication integration with WhatsApp, SMS, and Email, we offer a plug-and-play solution with minimal setup and rapid user adoption. Hosted on secure AWS infrastructure, our LMS ensures top-tier performance, data safety, and reliability. With agile implementation, customizable workflows, and real-time alerts for follow-ups, Rasta Infotech provides a complete ecosystem for educational success.',
    technologies: 'Our LMS solution is built using modern technologies and integrated tools to offer unmatched functionality. We utilize secure cloud infrastructure (AWS), communication APIs (Business WhatsApp, SMS, SMTP), and AI-based reminders for follow-ups. The platform supports real-time dashboards, plug-in CRMs, and secure communication protocols. It\'s built using agile methodology, ensuring faster go-to-market and continuous improvement. Our modular, scalable architecture makes it ideal for institutions, corporates, and government initiatives alike.',
    relatedServices: ['ai', 'application', 'recruitment'],
  },
  cognitive: {
    icon: '🧠',
    title: 'Cognitive Services',
    tagline: 'Cognitive Services – Driving Intelligent Automation with AI & ML',
    desc: 'Advanced cognitive solutions leveraging AI, ML, and NLP to enable real-time personalization, automation, and predictive capabilities across industries.',
    longDesc: 'Cognitive services are transforming how businesses interact with customers, analyze data, and make decisions. By integrating artificial intelligence (AI), machine learning (ML), and natural language processing (NLP), organizations can create smarter applications that mimic human intelligence — enabling real-time personalization, automation, and predictive capabilities. At Rasta InfoTech, we deliver advanced cognitive solutions that help you leverage unstructured and structured data to drive innovation and operational excellence. Our services range from intelligent chatbots and recommendation engines to computer vision and sentiment analysis. Whether you\'re in retail, healthcare, finance, or logistics, we tailor AI solutions that align with your digital transformation goals. With our cognitive services, your business can become more proactive, data-driven, and customer-centric. Our NLP solutions help applications understand, interpret, and generate human language using state-of-the-art models like BERT, GPT, and spaCy. Our AI-powered computer vision builds applications that interpret visual data for facial recognition, object detection, OCR, and quality inspection. And our predictive ML models use historical data to forecast trends, customer behavior, maintenance cycles, and more.',
    image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&q=80',
    color: 'from-[#7C3AED] to-[#3385FF]',
    tags: ['NLP', 'Machine Learning', 'Computer Vision', 'MLOps', 'TensorFlow', 'PyTorch', 'OpenAI', 'Speech AI'],
    features: [
      { icon: '🗺️', title: 'AI Strategy & Consulting', desc: 'We help organizations define a tailored AI roadmap, assess readiness, and identify high-impact use cases aligned with their business goals.' },
      { icon: '🤖', title: 'Chatbot & Virtual Assistant Development', desc: 'Design and deploy intelligent, conversational agents powered by NLP to automate customer support, onboarding, FAQs, and internal service desks.' },
      { icon: '👁️‍🗨️', title: 'Computer Vision Applications', desc: 'Create smart vision systems for facial recognition, surveillance, OCR, quality control, inventory tracking, and healthcare diagnostics.' },
      { icon: '📈', title: 'Predictive Analytics & Forecasting', desc: 'Use historical data and real-time signals to predict customer behavior, optimize inventory, reduce churn, and prevent system failures.' },
      { icon: '🎤', title: 'Speech Recognition & Voice AI', desc: 'Implement voice-to-text, speech analytics, and voice-driven interfaces for IVRs, virtual assistants, transcription tools, and accessibility.' },
      { icon: '⚙️', title: 'Model Training, Deployment & MLOps', desc: 'Build, train, and deploy machine learning models using modern MLOps frameworks that support continuous integration, monitoring, and retraining.' },
    ],
    process: [
      { step: '01', title: 'AI Strategy & Use Case Definition', desc: 'Identify cognitive AI use cases with the highest business impact, assess data readiness, and define success metrics.' },
      { step: '02', title: 'Data Assessment & Preparation', desc: 'Evaluate available training data, identify gaps, and build pipelines using Apache Spark, Kafka, or BigQuery.' },
      { step: '03', title: 'Model Development & Training', desc: 'Build and train models using TensorFlow, PyTorch, or Scikit-learn following MLOps best practices for scalability and explainability.' },
      { step: '04', title: 'Integration & Deployment', desc: 'Deploy models via Docker/Kubernetes and integrate with your CRM, cloud infrastructure, or customer-facing platforms.' },
      { step: '05', title: 'Monitoring & Continuous Improvement', desc: 'Track model performance with MLFlow, Airflow, or SageMaker and retrain continuously with new data for sustained accuracy.' },
    ],
    caseStudy: {
      client: 'Enterprise Across Retail, Healthcare & Finance',
      challenge: 'Organizations struggling with unstructured data, manual decision-making, and slow customer response times across key touchpoints.',
      solution: 'Deployed tailored cognitive solutions — NLP chatbots for support automation, computer vision for quality inspection, and predictive ML models for churn prevention and forecasting.',
      result: 'Significant reduction in manual workload, faster decision-making, and measurable improvements in customer experience and operational efficiency.',
      duration: 'Contact us for details',
    },
    faqs: [
      { q: 'What cognitive services do you offer?', a: 'AI strategy consulting, NLP chatbots, computer vision, predictive analytics, speech AI, and end-to-end MLOps.' },
      { q: 'Which AI frameworks and platforms do you use?', a: 'Hugging Face, spaCy, TensorFlow, PyTorch, OpenCV, YOLO, Dialogflow, Amazon Lex, Azure Speech, and SageMaker.' },
      { q: 'Do you build custom AI models or use pre-trained ones?', a: 'We customize intelligent solutions based on your specific use case, data landscape, and performance goals — not just off-the-shelf models.' },
      { q: 'How do you ensure ethical and unbiased AI?', a: 'Our approach includes bias mitigation, explainability techniques, and governance compliance throughout the development lifecycle.' },
      { q: 'Can you integrate cognitive AI into our existing systems?', a: 'Yes, we integrate cognitive capabilities into your existing workflows, CRM systems, cloud infrastructure, or customer-facing platforms.' },
    ],
    whyChoose: 'At Rasta InfoTech, we combine deep industry knowledge with cutting-edge AI expertise to help businesses unlock the full potential of cognitive technologies. We don\'t just deploy pre-trained models — we customize intelligent solutions based on your specific use case, data landscape, and performance goals. Our team includes AI/ML engineers, data scientists, and NLP specialists who follow MLOps best practices to build scalable, secure, and explainable AI systems. We integrate cognitive capabilities into your existing workflows, CRM systems, cloud infrastructure, or customer-facing platforms — enhancing automation, efficiency, and insight generation. From ideation to deployment and monitoring, our approach ensures ethical AI usage, bias mitigation, and governance compliance. Whether you want to automate support with AI chatbots, identify anomalies in financial data, or classify medical images, we are your end-to-end cognitive technology partner.',
    technologies: 'We use a combination of open-source libraries and enterprise-grade platforms to develop robust cognitive applications. For natural language processing, we work with Hugging Face Transformers, spaCy, NLTK, and OpenAI APIs. Our machine learning models are built using TensorFlow, PyTorch, and Scikit-learn. In computer vision, we leverage OpenCV, YOLO, and Google Vision AI, and for voice-enabled applications, we use Dialogflow, Amazon Lex, and Microsoft Azure Speech. We deploy models using Docker and Kubernetes and integrate pipelines through MLFlow, Airflow, and SageMaker for efficient training, versioning, and monitoring. For data pipelines and analytics, we use Apache Spark, Kafka, and Google BigQuery. Our AI deployments follow secure DevOps and MLOps processes with continuous integration, A/B testing, and real-time model retraining.',
    relatedServices: ['ai', 'application', 'devops'],
  },
  cybersecurity: {
    icon: '🛡️',
    title: 'Cybersecurity Solutions',
    tagline: 'Cybersecurity – Safeguarding the Digital Frontier',
    desc: 'Comprehensive cybersecurity solutions to defend your digital assets from evolving threats through proactive defense strategies and cutting-edge technologies.',
    longDesc: 'Cybersecurity is the practice of defending computers, servers, mobile devices, electronic systems, networks, and data from malicious attacks. It encompasses a wide range of technologies, processes, and practices designed to protect digital assets from unauthorized access, damage, or theft. As cyber threats evolve in complexity and scale, cybersecurity has become a critical component of personal safety, business continuity, and national security. Our solutions empower individuals and organizations to stay resilient against digital threats through proactive defense strategies and cutting-edge technologies. We protect against malware — including viruses, worms, trojans, and ransomware — that compromise system integrity. Our phishing defense identifies and blocks fraudulent communications before they reach users. And our encryption and data privacy solutions secure sensitive information ensuring only authorized parties can access it.',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&q=80',
    color: 'from-[#DC2626] to-[#7C3AED]',
    tags: ['Firewall', 'SIEM', 'MFA', 'Endpoint Protection', 'Encryption', 'IAM', 'SOC', 'Zero Trust'],
    features: [
      { icon: '🌐', title: 'Network Security', desc: 'Protects internal and external networks from unauthorized access and attacks using firewalls, IDS/IPS, and secure configurations.' },
      { icon: '💻', title: 'Endpoint Protection', desc: 'Secures devices like laptops, smartphones, and servers against malware and unauthorized access.' },
      { icon: '🔍', title: 'Security Audits', desc: 'Comprehensive assessments to identify vulnerabilities and ensure compliance with industry standards.' },
      { icon: '🚨', title: 'Incident Response', desc: 'Rapid detection, containment, and recovery from security breaches and cyberattacks.' },
      { icon: '🔐', title: 'Data Encryption', desc: 'Implements strong encryption protocols to protect sensitive data in transit and at rest.' },
      { icon: '🎓', title: 'Cybersecurity Training', desc: 'Educates employees and users on best practices to recognize and prevent cyber threats.' },
      { icon: '🪪', title: 'Identity and Access Management', desc: 'Identifying, tracking, and managing authorized users\' access to a system, application, or IT instance.' },
      { icon: '🚫', title: 'Data Leakage Prevention', desc: 'Helps businesses improve security with DAM and vulnerability assessment.' },
      { icon: '🗄️', title: 'Database Security', desc: 'An entire set of context controls together with event logging and data shadowing printing.' },
      { icon: '📧', title: 'Email Security', desc: 'Value-added security with Anti-Virus solutions as one of our core email protection offerings.' },
      { icon: '🖥️', title: 'End Point Security', desc: 'Value-added distributors with Anti-Virus solutions being one of our core endpoint offerings.' },
      { icon: '🗑️', title: 'Enterprise Data Erasure', desc: 'Securely erase any drive, including complex SSDs, in PCs, laptops, and servers.' },
      { icon: '🔎', title: 'Exposure Management', desc: 'Integrate Identity & Access Management policies across all environments.' },
      { icon: '📋', title: 'Security Management', desc: 'Reviewing logs and setting up notifications to prove security and compliance benefits.' },
      { icon: '⚙️', title: 'Operations Management', desc: 'We provide upfront analysis and planning to use virtual resources efficiently.' },
      { icon: '⚖️', title: 'Risk & Compliance', desc: 'A comprehensive approach to effectively manage social engineering attacks and regulatory requirements.' },
      { icon: '🌍', title: 'Web Application Security', desc: 'Web application firewall to monitor your applications, instantly detect and prevent threats.' },
    ],
    process: [
      { step: '01', title: 'Security Assessment', desc: 'Comprehensive evaluation of your current security posture, vulnerabilities, and compliance gaps.' },
      { step: '02', title: 'Threat Modeling', desc: 'Identify and prioritize threats specific to your business, technology stack, and regulatory environment.' },
      { step: '03', title: 'Implementation', desc: 'Deploy security controls — firewalls, SIEM, MFA, encryption, IAM, and endpoint protection tools.' },
      { step: '04', title: 'Testing & Validation', desc: 'Penetration testing and red team exercises to validate all security controls before go-live.' },
      { step: '05', title: 'Continuous Monitoring', desc: 'Ongoing SOC monitoring, log review, incident response readiness, and regular security reviews.' },
    ],
    caseStudy: {
      client: 'Enterprise Across Finance, Healthcare & Retail',
      challenge: 'Organizations facing escalating cyber threats including phishing attacks, data breaches, ransomware, and compliance failures.',
      solution: 'Deployed end-to-end cybersecurity frameworks — network security, endpoint protection, IAM, data encryption, DLP, and 24/7 SOC monitoring using AI-enhanced threat detection.',
      result: 'Significantly reduced attack surface, zero successful breaches post-implementation, and full regulatory compliance achieved.',
      duration: 'Contact us for details',
    },
    faqs: [
      { q: 'What cybersecurity services do you offer?', a: 'Network security, endpoint protection, IAM, DLP, database security, email security, web application security, risk & compliance, and cybersecurity training.' },
      { q: 'How do you protect against phishing and malware?', a: 'Through email security gateways, endpoint protection, employee training, and AI-enhanced threat detection that identifies and blocks malicious activity in real time.' },
      { q: 'Do you help with compliance requirements?', a: 'Yes, we provide comprehensive risk & compliance services covering GDPR, ISO 27001, SOC 2, PCI DSS, and more.' },
      { q: 'What technologies do you use for cybersecurity?', a: 'Firewalls, antivirus, IDS/IPS, SIEM, MFA, VPNs, endpoint protection, encryption protocols, and AI/ML-powered threat detection.' },
      { q: 'Do you offer 24/7 security monitoring?', a: 'Yes, our SOC provides round-the-clock monitoring with real-time alerts, log review, and rapid incident response.' },
    ],
    whyChoose: 'At Rasta InfoTech, we understand that cybersecurity is more than just a technical necessity — it\'s a strategic imperative. Our team of experts designs and implements robust security frameworks that protect your digital assets from evolving threats. From securing enterprise networks to educating users on best practices, we offer comprehensive solutions tailored to your unique needs. With a focus on proactive defense, regulatory compliance, and scalable protection, we help you build a secure digital environment that fosters trust and resilience.',
    technologies: 'We utilize a wide array of cybersecurity technologies to deliver effective protection. Our stack includes firewalls, antivirus software, intrusion detection systems (IDS), security information and event management (SIEM), and advanced encryption protocols. We also integrate multi-factor authentication (MFA), virtual private networks (VPNs), and endpoint protection tools to ensure comprehensive coverage. By leveraging AI and machine learning, we enhance threat detection and automate response mechanisms, keeping your systems secure and agile.',
    relatedServices: ['devops', 'cloud', 'application'],
  },
  devops: {
    icon: '🤖',
    title: 'DevOps Automation Services',
    tagline: 'DevOps Automation – Accelerating Delivery, Enhancing Quality',
    desc: 'Streamline software development and IT operations by automating building, testing, releasing, and monitoring applications with modern DevOps practices.',
    longDesc: 'DevOps Automation Services are designed to streamline software development and IT operations by automating the processes of building, testing, releasing, and monitoring applications. With the increasing demand for faster delivery cycles, high availability, and improved collaboration, DevOps has emerged as a transformative methodology that bridges the gap between development and operations teams. At the core of DevOps is automation — the key to eliminating manual tasks, reducing errors, and enabling continuous integration and continuous deployment (CI/CD). Our DevOps Automation solutions empower organizations to deliver high-quality software quickly and reliably by leveraging modern tools, agile practices, and a culture of shared responsibility. We implement end-to-end CI/CD pipelines that automate the build, test, and deployment lifecycle. We provision and manage infrastructure using code-based tools like Terraform, Ansible, and CloudFormation for consistency and scalability. And we provide deep visibility into application performance through automated monitoring, alerting, and logging using Prometheus, Grafana, and ELK Stack.',
    image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=1200&q=80',
    color: 'from-[#0066FF] to-[#00C896]',
    tags: ['Jenkins', 'GitHub Actions', 'Docker', 'Kubernetes', 'Terraform', 'Ansible', 'Datadog', 'DevSecOps'],
    features: [
      { icon: '🔄', title: 'Continuous Integration & Delivery', desc: 'Build robust CI/CD pipelines that automate testing, integration, and deployment tasks to speed up delivery cycles and reduce release risks.' },
      { icon: '📦', title: 'Infrastructure as Code (IaC)', desc: 'Automate infrastructure provisioning and configuration through IaC frameworks, enabling repeatable environments across development, staging, and production.' },
      { icon: '⚙️', title: 'Configuration Management', desc: 'Use tools like Chef, Puppet, or Ansible to automate system configurations, enforce consistency, and eliminate configuration drift.' },
      { icon: '☁️', title: 'Cloud Automation', desc: 'Automate deployment and scaling in cloud platforms such as AWS, Azure, and GCP using serverless architectures and managed services.' },
      { icon: '🔒', title: 'DevSecOps Integration', desc: 'Embed security into every stage of your DevOps process with automated vulnerability scanning, compliance checks, and access controls.' },
      { icon: '📊', title: 'Monitoring & Incident Management', desc: 'Implement proactive monitoring and alerting to identify issues before they impact users. Integrate incident response workflows for rapid resolution.' },
      { icon: '🚀', title: 'Release Management & Rollbacks', desc: 'Enable reliable software releases with blue-green, canary deployments and automated rollback strategies in case of failure.' },
      { icon: '⚡', title: 'Performance Optimization', desc: 'Optimize your systems for speed, cost, and reliability by identifying bottlenecks through load testing, APM tools, and custom metrics.' },
    ],
    process: [
      { step: '01', title: 'Assessment & Discovery', desc: 'Evaluate current development and operations practices to identify bottlenecks, manual steps, and automation opportunities.' },
      { step: '02', title: 'Pipeline & Architecture Design', desc: 'Design optimal CI/CD pipeline architecture, toolchain selection, and container orchestration strategy.' },
      { step: '03', title: 'Implementation & Automation', desc: 'Build and configure CI/CD pipelines, IaC templates, containerization, DevSecOps controls, and monitoring dashboards.' },
      { step: '04', title: 'Migration & Integration', desc: 'Gradually migrate existing workloads to the new DevOps pipeline while integrating with Slack, JIRA, and collaboration tools.' },
      { step: '05', title: 'Training, Handover & Optimization', desc: 'Team training, documentation, knowledge transfer, and continuous performance optimization post-launch.' },
    ],
    caseStudy: {
      client: 'SaaS & Enterprise Software Companies',
      challenge: 'Long manual release cycles, frequent deployment failures, lack of visibility into system health, and siloed development and operations teams.',
      solution: 'Implemented end-to-end CI/CD pipelines using GitHub Actions and Jenkins, containerized all services with Docker and Kubernetes, and set up Prometheus and Grafana for observability.',
      result: 'Release cycles reduced from weeks to hours, 90% reduction in deployment failures, and full operational visibility across all environments.',
      duration: 'Contact us for details',
    },
    faqs: [
      { q: 'What DevOps tools do you work with?', a: 'Jenkins, GitLab CI, CircleCI, GitHub Actions for CI/CD; Docker and Kubernetes for containers; Terraform, Ansible, and Pulumi for IaC; Datadog, Prometheus, and New Relic for monitoring.' },
      { q: 'What is the difference between DevOps and DevSecOps?', a: 'DevSecOps embeds security into every stage of the DevOps pipeline — automated vulnerability scanning, compliance checks, and access controls are part of the delivery process from day one.' },
      { q: 'How long does a DevOps transformation take?', a: 'Basic CI/CD setup takes 2–4 weeks. A full DevOps transformation including IaC, containers, monitoring, and DevSecOps typically takes 3–6 months.' },
      { q: 'Can you automate our cloud infrastructure?', a: 'Yes, we automate deployment and scaling in AWS, Azure, and GCP using serverless architectures, managed services, and IaC frameworks.' },
      { q: 'Do you support blue-green and canary deployments?', a: 'Yes, we implement blue-green, canary, and rolling deployment strategies with automated rollback capabilities to ensure zero-downtime releases.' },
    ],
    whyChoose: 'At Rasta InfoTech, we go beyond conventional IT delivery by embedding automation at the heart of your DevOps journey. We recognize that speed, reliability, and agility are not just desirable — they are essential to modern business success. Our DevOps Automation Services are tailored to meet your specific business and technical goals, ensuring seamless collaboration across teams and faster time-to-market for your applications. Whether you\'re transforming legacy systems or building new cloud-native platforms, our certified DevOps engineers bring expertise in automation tooling, container orchestration, cloud infrastructure, and pipeline management to ensure operational excellence.',
    technologies: 'At Rasta InfoTech, we leverage a comprehensive DevOps tech stack to automate every aspect of your SDLC. Our toolchain includes Jenkins, GitLab CI, CircleCI, and GitHub Actions for CI/CD; Docker and Kubernetes for container orchestration; Terraform, Ansible, and Pulumi for Infrastructure as Code; and monitoring solutions like Datadog, Prometheus, and New Relic for observability. By integrating these tools with collaboration platforms like Slack and JIRA, we create transparent, traceable, and automated workflows that drive business value.',
    relatedServices: ['cloud', 'application', 'cybersecurity'],
  },
  ai: {
    icon: '✨',
    title: 'Artificial Intelligence (AI) Services',
    tagline: 'Transforming Businesses Through Intelligent AI Solutions',
    desc: 'Scalable and custom AI solutions that automate repetitive tasks, enhance customer experiences, and uncover insights from complex datasets.',
    longDesc: 'Artificial Intelligence (AI) is revolutionizing industries by empowering businesses with intelligent automation, data-driven insights, and human-like decision-making. From predictive analytics and recommendation engines to intelligent chatbots and computer vision, AI is unlocking new levels of efficiency, personalization, and innovation. At Rasta InfoTech, we deliver scalable and custom AI solutions that help businesses evolve into smarter, data-first organizations. Our AI services are designed to automate repetitive tasks, enhance customer experiences, and uncover insights from complex datasets. Whether you\'re just starting your AI journey or looking to scale existing capabilities, our team of AI engineers, data scientists, and strategists work with you to build, train, and deploy reliable and ethical AI models. We build intelligent ML systems that learn from historical and real-time data for accurate predictions using classification, clustering, regression, anomaly detection, and optimization algorithms. We leverage NLP with models like BERT, GPT, and custom LLMs for text classification, entity recognition, sentiment analysis, and language translation. And our computer vision services cover object detection, facial recognition, OCR, visual inspection, and image classification for healthcare, manufacturing, surveillance, and retail.',
    image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&q=80',
    color: 'from-[#7C3AED] to-[#00C896]',
    tags: ['Machine Learning', 'NLP', 'Computer Vision', 'Generative AI', 'LLMs', 'MLOps', 'TensorFlow', 'PyTorch'],
    features: [
      { icon: '🗺️', title: 'AI Consulting & Strategy', desc: 'We help businesses assess their AI readiness, identify impactful use cases, and create a roadmap that aligns with long-term objectives and ROI expectations.' },
      { icon: '🧠', title: 'Custom ML Model Development', desc: 'Build, train, and validate machine learning models for classification, regression, recommendation, and time-series forecasting based on your specific data.' },
      { icon: '🤖', title: 'AI-Powered Chatbots & Virtual Assistants', desc: 'Create intelligent conversational interfaces powered by NLP that automate support, sales, and customer interaction with contextual understanding and real-time response.' },
      { icon: '👁️', title: 'Computer Vision Solutions', desc: 'Deploy smart visual systems for image recognition, barcode scanning, automated defect detection, and facial authentication.' },
      { icon: '✍️', title: 'Generative AI Integration', desc: 'Use advanced LLMs to automate content generation, summarization, Q&A, code completion, and AI-driven personalization in apps and websites.' },
      { icon: '⚙️', title: 'AI Model Deployment & MLOps', desc: 'Deploy AI models in production using best practices for monitoring, retraining, version control, and performance tuning through robust MLOps workflows.' },
    ],
    process: [
      { step: '01', title: 'AI Strategy & Use Case Definition', desc: 'Assess AI readiness, evaluate data quality, and identify high-impact use cases aligned with your KPIs and ethical standards.' },
      { step: '02', title: 'Data Preparation & Engineering', desc: 'Build data pipelines using Apache Spark, Pandas, Kafka, and Airflow to clean, transform, and prepare training data.' },
      { step: '03', title: 'Model Development & Training', desc: 'Build and iterate models using TensorFlow, PyTorch, Keras, Scikit-learn, and Hugging Face Transformers with rigorous evaluation.' },
      { step: '04', title: 'Deployment & Integration', desc: 'Deploy on AWS SageMaker, Azure ML, Google Vertex AI, or custom Kubernetes clusters with REST API integration into your tech stack.' },
      { step: '05', title: 'Monitoring, Retraining & Optimization', desc: 'Continuously monitor model performance using MLFlow, track drift, retrain with new data, and optimize for accuracy and cost.' },
    ],
    caseStudy: {
      client: 'Enterprises Across E-Commerce, Finance & Healthcare',
      challenge: 'Low automation rates, poor personalization, manual decision-making, and inability to extract insights from large unstructured datasets.',
      solution: 'Deployed custom AI solutions — recommendation engines, NLP chatbots, computer vision inspection systems, and generative AI integrations — across business-critical workflows.',
      result: 'Significant uplift in automation, customer engagement, and operational efficiency with measurable ROI across all AI implementations.',
      duration: 'Contact us for details',
    },
    faqs: [
      { q: 'What AI services does Rasta InfoTech offer?', a: 'AI consulting, custom ML models, NLP chatbots, computer vision, generative AI integration, and end-to-end MLOps deployment.' },
      { q: 'Do you need large datasets to build AI models?', a: 'Not always. We use transfer learning, data augmentation, and fine-tuning to deliver accurate models even with limited data.' },
      { q: 'Can AI be integrated with our existing systems?', a: 'Yes, we expose AI models as REST APIs and integrate with your existing CRM, ERP, cloud infrastructure, or customer-facing platforms.' },
      { q: 'How do you ensure ethical and unbiased AI?', a: 'We build explainable, auditable, and privacy-compliant AI systems with bias mitigation and governance built into every model lifecycle.' },
      { q: 'What platforms do you deploy AI on?', a: 'AWS SageMaker, Azure Machine Learning, Google Vertex AI, and custom Kubernetes clusters — all with MLFlow and Docker for MLOps.' },
    ],
    whyChoose: 'At Rasta InfoTech, we help you go beyond AI experimentation and deliver real business value. Our end-to-end AI service model — spanning strategy, data preparation, model development, deployment, and ongoing optimization — ensures that your investment translates into scalable, sustainable results. We bring deep expertise in supervised and unsupervised learning, deep learning, reinforcement learning, and generative AI. Our team works closely with your business and data teams to develop models that align with your KPIs and ethical standards. We focus on delivering AI systems that are explainable, auditable, and compliant with privacy regulations. Whether you\'re looking to build an AI-powered chatbot, optimize your supply chain, detect fraud in financial transactions, or automate healthcare diagnostics, Rasta InfoTech ensures secure, high-performance AI integration across your tech stack.',
    technologies: 'Our AI solutions are powered by the industry\'s most trusted tools and platforms. For machine learning and deep learning, we use TensorFlow, PyTorch, Keras, Scikit-learn, and Hugging Face Transformers. Our data processing pipeline includes Apache Spark, Pandas, Kafka, and Airflow. For NLP and large language models (LLMs), we use OpenAI, Cohere, Google PaLM, and custom fine-tuned transformer models. We deploy AI solutions on AWS SageMaker, Azure Machine Learning, Google Vertex AI, and custom Kubernetes clusters with MLFlow and Docker. For computer vision, we rely on OpenCV, YOLOv5, Detectron2, and Google Vision AI. Our DevOps team ensures AI model deployment, monitoring, and governance through MLOps best practices, including CI/CD for ML, model versioning, and explainability.',
    relatedServices: ['devops', 'application', 'cloud'],
  },
  'digital-marketing': {
    icon: '📢',
    title: 'Digital Marketing Services',
    tagline: 'Elevate Your Brand Online',
    desc: 'SEO, SEM, social media marketing, content strategy, and AI-powered campaigns.',
    longDesc: 'Digital marketing encompasses all marketing efforts that use an electronic device or the internet. Businesses leverage digital channels such as search engines, social media, email, and websites to connect with current and prospective customers. In today\'s digital age, having a robust online presence is crucial for success. Digital marketing strategies help businesses reach a larger audience, engage with customers, and drive conversions. At Rasta InfoTech, we offer comprehensive digital marketing services that are tailored to your unique business needs. Our goal is to help you elevate your brand, increase visibility, and achieve measurable results.',
    image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=1200&q=80',
    color: 'from-[#0066FF] to-[#00C896]',
    tags: ['SEO', 'Google Ads', 'Social Media', 'Content Marketing'],
    features: [
      { icon: '🌐', title: 'Digital Marketing Services', desc: 'End-to-end digital marketing solutions to help businesses build a strong online presence, drive engagement, and boost ROI across multiple channels including SEO, PPC, social media, and content marketing.' },
      { icon: '🔍', title: 'Search Engine Optimization Services', desc: 'Enhance your website\'s visibility in organic search results with advanced SEO strategies, including keyword targeting, technical audits, and content optimization tailored for higher rankings.' },
      { icon: '📊', title: 'Social Media Optimization Services', desc: 'Improve your social media profiles for better reach and engagement. Our SMO services focus on enhancing bio, visuals, hashtags, and post timing to strengthen your brand identity.' },
      { icon: '📢', title: 'Social Media Advertising Services', desc: 'Run paid campaigns on platforms like Facebook, Instagram, and LinkedIn to reach highly targeted audiences and drive conversions through optimized ad creatives and strategic targeting.' },
      { icon: '🎯', title: 'Google Ads Services', desc: 'Launch and manage high-performing Google Ads campaigns across search, display, and YouTube to drive targeted traffic, increase conversions, and maximize ad spend efficiency.' },
      { icon: '🔗', title: 'Lead Generation Services', desc: 'Generate high-quality leads through multichannel strategies, including landing page funnels, gated content, paid ads, and email automation to fuel your sales pipeline.' },
      { icon: '📈', title: 'Search Engine Marketing Services', desc: 'Combine paid and organic search strategies to dominate search engine results pages (SERPs) using an integrated SEM approach that includes Google Ads, SEO, and remarketing.' },
      { icon: '📱', title: 'App Store Optimization Services', desc: 'Increase your mobile app\'s visibility and downloads through effective ASO techniques like keyword-rich titles, compelling descriptions, quality screenshots, and positive reviews.' },
      { icon: '📍', title: 'Local SEO Services', desc: 'Boost your local search presence with Google Business Profile optimization, local citations, geo-targeted keywords, and review management to drive foot traffic and local leads.' },
      { icon: '🔗', title: 'Backlink Building Services', desc: 'Enhance your domain authority and SEO rankings by acquiring high-quality, relevant backlinks through ethical link-building strategies such as guest posting and outreach.' },
      { icon: '🔄', title: 'Conversion Rate Optimization Services', desc: 'Improve your website\'s ability to turn visitors into customers using CRO tactics like A/B testing, heatmaps, behavioral analysis, and UI/UX enhancements.' },
      { icon: '📰', title: 'Press Release Services', desc: 'Distribute well-crafted press releases to major media outlets and news platforms to generate brand awareness, build credibility, and enhance SEO through authoritative links.' },
      { icon: '✍️', title: 'Content Writing Services', desc: 'Deliver high-quality, SEO-optimized content tailored to your brand\'s voice, including blogs, website copy, product descriptions, and technical articles.' },
      { icon: '📲', title: 'Mobile Ads Services', desc: 'Run targeted mobile advertising campaigns across apps, social media, and mobile web to engage users on smartphones and increase brand visibility and app installs.' },
      { icon: '📝', title: 'Content Marketing Services', desc: 'Attract and convert your audience with strategic content marketing that includes blog publishing, infographics, case studies, and video storytelling.' },
      { icon: '🎨', title: 'Native Ads Services', desc: 'Blend promotional content seamlessly into user experiences across platforms with native ads that are less intrusive and more engaging, increasing click-through and conversion rates.' },
      { icon: '🚀', title: 'Mobile App Promotion Services', desc: 'Promote your mobile app with targeted campaigns on app stores, influencer marketing, mobile display networks, and pre-launch buzz to boost installs and engagement.' },
      { icon: '🛒', title: 'Marketplace Ads Services', desc: 'Advertise directly on marketplaces like Amazon, Flipkart, or Etsy to improve product visibility and sales through sponsored listings and keyword-targeted ads.' },
    ],
    whyChoose: 'At Rasta InfoTech, we understand that digital marketing is not just about driving traffic—it\'s about creating meaningful connections with your audience. Our team of experienced marketers combines creativity, data-driven strategies, and cutting-edge technology to deliver results that matter. We take the time to understand your business goals, target audience, and competitive landscape to create customized marketing plans that drive growth. Whether you\'re looking to increase brand awareness, generate leads, or boost sales, our digital marketing services are designed to help you achieve your objectives.',
    technologies: 'At Rasta InfoTech, we leverage a wide range of digital marketing tools and technologies to optimize your campaigns and measure success. Our tech stack includes Google Analytics for performance tracking, SEMrush for SEO analysis, Hootsuite for social media management, Mailchimp for email marketing, and WordPress for content management. By integrating these tools with CRM systems like HubSpot and Salesforce, we create seamless workflows that enhance efficiency and drive results.',
    process: [
      { step: '01', title: 'Audit & Strategy', desc: 'Comprehensive audit of current digital presence and development of data-driven strategy.' },
      { step: '02', title: 'Campaign Setup', desc: 'Set up tracking, ad accounts, content calendar, and automation workflows.' },
      { step: '03', title: 'Execution', desc: 'Launch campaigns, publish content, and manage community engagement.' },
      { step: '04', title: 'Optimization', desc: 'Continuous A/B testing, bid optimization, and content refinement.' },
      { step: '05', title: 'Reporting', desc: 'Monthly performance reports with insights and recommendations.' },
    ],
    caseStudy: {
      client: 'B2B Software Company',
      challenge: 'The client had minimal online presence with 500 monthly organic visitors.',
      solution: 'We implemented comprehensive SEO and content marketing strategy with technical fixes and LinkedIn thought leadership.',
      result: '300% increase in organic traffic and 150% increase in qualified leads.',
      duration: 'Placeholder - to be updated by Rasta Infotech',
    },
    faqs: [
      { q: 'What digital marketing services do you offer?', a: 'We offer SEO, social media marketing, Google Ads, lead generation, content marketing, email marketing, app store optimization, local SEO, backlink building, CRO, press releases, and more.' },
      { q: 'How long does SEO take to show results?', a: 'Typically 3-6 months for significant organic traffic improvements, depending on competition and the current state of your website.' },
      { q: 'Do you manage social media accounts?', a: 'Yes, we manage LinkedIn, Instagram, Facebook, Twitter, and YouTube channels including content creation, community management, and paid advertising.' },
      { q: 'Can you run Google Ads campaigns?', a: 'Yes, our certified specialists manage search, display, YouTube, and shopping campaigns with a focus on maximizing ad spend efficiency and conversions.' },
      { q: 'How do you measure digital marketing ROI?', a: 'We track KPIs using Google Analytics, SEMrush, and custom dashboards, providing monthly performance reports with insights and recommendations.' },
    ],
    relatedServices: ['ai', 'application', 'cognitive'],
  },
  'enterprise-automation': {
    icon: '🔄',
    title: 'Enterprise Automation Services',
    tagline: 'Streamlining Business Operations with Enterprise Automation',
    desc: 'RPA, BPA, and intelligent automation to eliminate manual processes, reduce errors, and accelerate workflow execution across your enterprise.',
    longDesc: 'Enterprise automation is transforming the way businesses operate by eliminating manual processes, reducing human error, and accelerating workflow execution. By integrating technologies like robotic process automation (RPA), intelligent workflows, APIs, and low-code platforms, enterprises can significantly improve efficiency, agility, and scalability. At Rasta InfoTech, we specialize in delivering customized enterprise automation solutions that empower your organization to streamline complex operations, optimize resource allocation, and enable data-driven decision-making. Whether you want to automate finance functions, HR workflows, customer support, or supply chain processes, our automation experts help you design and implement end-to-end intelligent automation strategies. Let us help you evolve into a smart enterprise, where every process is optimized, connected, and measurable.',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&q=80',
    color: 'from-[#00C896] to-[#0066FF]',
    tags: ['RPA', 'BPA', 'Intelligent Automation', 'Low-Code', 'Workflow Orchestration'],
    features: [
      { icon: '🤖', title: 'Robotic Process Automation (RPA)', desc: 'We automate repetitive, rule-based tasks using UiPath, Automation Anywhere, and Power Automate. RPA bots handle data entry, invoice processing, email parsing, and system updates with speed and accuracy—freeing your team to focus on strategic work.' },
      { icon: '🔄', title: 'Business Process Automation (BPA)', desc: 'Our BPA services help organizations optimize entire business workflows through integrations, APIs, and orchestration engines. From approval processes to customer onboarding and order management, we streamline and automate complex workflows for improved efficiency.' },
      { icon: '⚡', title: 'Intelligent Automation (AI + RPA)', desc: 'By combining artificial intelligence with RPA, we enable cognitive automation that can handle unstructured data, make decisions, and learn over time. From reading scanned documents to analyzing customer sentiment, our intelligent bots bring smart automation to life.' },
      { icon: '📋', title: 'Automation Assessment & Strategy', desc: 'We evaluate your current workflows and identify high-impact automation opportunities to build a customized enterprise automation roadmap aligned with business objectives.' },
      { icon: '📄', title: 'Document Processing Automation', desc: 'Automate data extraction from scanned documents, PDFs, and emails using AI-powered OCR and NLP—ideal for finance, HR, legal, and logistics departments.' },
      { icon: '👥', title: 'Citizen Development & Low-Code Automation', desc: 'Enable business users to automate their own workflows using low-code/no-code platforms like Power Automate, Zoho Creator, and OutSystems under IT governance.' },
    ],
    process: [
      { step: '01', title: 'Automation Assessment & Strategy', desc: 'Evaluate current workflows, identify high-impact automation opportunities, and build a customized enterprise automation roadmap aligned with business objectives.' },
      { step: '02', title: 'RPA Implementation & Bot Development', desc: 'Design, develop, and deploy attended and unattended bots that automate repetitive tasks using UiPath and Automation Anywhere.' },
      { step: '03', title: 'Workflow Orchestration & Integration', desc: 'Streamline complex, multi-step workflows by connecting enterprise systems and automating handoffs using BPMN engines and integration platforms.' },
      { step: '04', title: 'Document Processing Automation', desc: 'Automate data extraction from scanned documents, PDFs, and emails using AI-powered OCR and NLP.' },
      { step: '05', title: 'Monitoring, Analytics & Optimization', desc: 'Implement real-time dashboards, performance reports, and audit logs to ensure visibility into every process and identify areas for continuous improvement.' },
      { step: '06', title: 'Citizen Development & Low-Code Automation', desc: 'Enable business users to automate workflows using low-code/no-code platforms under IT governance for scalable, self-service automation.' },
    ],
    caseStudy: {
      client: 'Financial Services Firm',
      challenge: 'The client had 15 employees spending 6 hours daily on manual data entry across multiple systems.',
      solution: 'We implemented UiPath RPA bots automating data extraction, validation, and entry across 5 systems.',
      result: '80% reduction in manual data entry and 99.9% accuracy.',
      duration: 'Placeholder - to be updated by Rasta Infotech',
    },
    faqs: [
      { q: 'What is enterprise automation?', a: 'Enterprise automation uses RPA, AI, and workflow tools to eliminate manual, repetitive business processes—improving speed, accuracy, and operational efficiency across departments.' },
      { q: 'Which RPA tools do you use?', a: 'UiPath, Automation Anywhere, Blue Prism, and Microsoft Power Automate for robotic process automation.' },
      { q: 'What processes can be automated?', a: 'Invoice processing, data entry, employee onboarding, document extraction, compliance reporting, customer support workflows, and order management.' },
      { q: 'What ROI can we expect?', a: 'Typically 200-300% ROI within the first year, with 70-90% reduction in processing time and near-zero error rates.' },
      { q: 'What platforms do you use for workflow automation?', a: 'Camunda, Appian, Kissflow, and ServiceNow for orchestration; Zapier, Workato, and MuleSoft for system integration.' },
    ],
    whyChoose: 'At Rasta InfoTech, we go beyond automating individual tasks—we help you reimagine your workflows from the ground up. Our team of automation architects, RPA developers, and business analysts work together to identify automation opportunities, reduce manual dependencies, and integrate your systems into a unified, intelligent ecosystem. We focus on scalable, secure, and business-aligned automation strategies that deliver measurable ROI. Whether you are looking to reduce operational costs, speed up customer response, or gain real-time visibility into processes, we partner with you through every stage—from discovery and implementation to optimization and governance.',
    technologies: 'Our automation solutions are built on robust, enterprise-grade technologies. For RPA: UiPath, Automation Anywhere, Blue Prism, and Microsoft Power Automate. Workflow orchestration: Camunda, Appian, Kissflow, and ServiceNow. Integration tools: Zapier, Workato, and MuleSoft. Intelligent automation: AWS AI Services, Azure Cognitive Services, Google Cloud AI, and OpenAI. All solutions support enterprise-grade security, scalability, and seamless integration with your existing ERP, CRM, and legacy systems.',
    relatedServices: ['ai', 'devops', 'application'],
  },
  grc: {
    icon: '⚖️',
    title: 'Governance, Risk & Compliance Services',
    tagline: 'Ensuring Integrity and Security Across Your Organization',
    desc: 'Comprehensive GRC services to manage risks, ensure regulatory compliance, and implement robust governance frameworks that protect your assets and uphold corporate integrity.',
    longDesc: 'Governance, Risk & Compliance (GRC) encompasses the strategies, processes, and tools used to manage and mitigate risks, ensure regulatory compliance, and uphold corporate governance standards. In today\'s complex business environment, effective GRC practices are essential for maintaining operational integrity, protecting assets, and achieving long-term success. At Rasta InfoTech, we offer comprehensive GRC services that help organizations navigate regulatory landscapes, identify and address risks, and implement robust governance frameworks. Our goal is to empower businesses with the insights and tools needed to make informed decisions, enhance security, and foster a culture of compliance.',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&q=80',
    color: 'from-[#7C3AED] to-[#DC2626]',
    tags: ['Risk Management', 'Compliance Audits', 'Corporate Governance', 'Policy Development', 'Regulatory Change'],
    features: [
      { icon: '🔒', title: 'Risk Management', desc: 'Identify, assess, and mitigate risks that could impact your organization\'s operations, reputation, and financial performance. Our services include risk assessments, risk mitigation strategies, and continuous monitoring to ensure proactive risk management.' },
      { icon: '📜', title: 'Compliance Management', desc: 'Ensure adherence to regulatory requirements and industry standards through comprehensive compliance management including audits, policy development, training programs, and ongoing monitoring to maintain compliance and avoid penalties.' },
      { icon: '🏛️', title: 'Corporate Governance', desc: 'Implement effective governance frameworks that promote transparency, accountability, and ethical behavior. Our services include board advisory, governance assessments, policy development, and stakeholder engagement to uphold governance standards.' },
      { icon: '📋', title: 'Policy Development', desc: 'Create and implement policies that align with regulatory requirements and industry best practices. Our services include policy drafting, reviews, and training to ensure consistent compliance and governance.' },
      { icon: '📊', title: 'Continuous Monitoring', desc: 'Implement continuous monitoring solutions to track and manage risks, compliance, and governance processes with real-time monitoring, data analytics, and reporting for proactive management.' },
      { icon: '🔄', title: 'Regulatory Change Management', desc: 'Navigate regulatory changes and ensure compliance with new requirements through regulatory analysis, impact assessments, and implementation plans to manage changes effectively.' },
    ],
    process: [
      { step: '01', title: 'Risk Assessments', desc: 'Conduct thorough risk assessments to identify potential threats and vulnerabilities, including risk analysis, prioritization, and mitigation strategies.' },
      { step: '02', title: 'Compliance Audits', desc: 'Perform comprehensive compliance audits to ensure adherence to regulatory requirements with policy reviews, gap analysis, and corrective action plans.' },
      { step: '03', title: 'Governance Frameworks', desc: 'Develop and implement effective governance frameworks that promote transparency, accountability, and ethical behavior across the organization.' },
      { step: '04', title: 'Training Programs', desc: 'Develop and deliver training programs that educate employees on risk management, compliance, and governance practices through workshops and e-learning modules.' },
      { step: '05', title: 'Stakeholder Engagement', desc: 'Engage with stakeholders to promote transparency and accountability through stakeholder analysis, communication strategies, and engagement plans.' },
      { step: '06', title: 'Continuous Monitoring', desc: 'Implement real-time monitoring, data analytics, and reporting to ensure proactive and ongoing management of risks, compliance, and governance.' },
    ],
    caseStudy: {
      client: 'Banking Institution',
      challenge: 'The client needed ISO 27001 certification to win enterprise contracts but had no formal ISMS.',
      solution: 'We implemented a complete ISMS including risk assessment, policy documentation, and audit preparation.',
      result: 'Full ISO 27001 certification achieved enabling 3 major enterprise contracts.',
      duration: 'Placeholder - to be updated by Rasta Infotech',
    },
    faqs: [
      { q: 'What GRC frameworks do you support?', a: 'ISO 27001, SOC 2, GDPR, PCI DSS, HIPAA, NIST, and industry-specific regulations.' },
      { q: 'How do you approach risk management?', a: 'We follow a structured methodology: identify, assess, prioritize, and treat risks with continuous monitoring to ensure proactive risk management.' },
      { q: 'Can you help with regulatory audits?', a: 'Yes, we perform comprehensive compliance audits including policy reviews, gap analysis, and corrective action plans across multiple frameworks.' },
      { q: 'Do you provide policy development services?', a: 'Yes, we draft, review, and train on policies aligned with regulatory requirements and industry best practices.' },
      { q: 'How do you handle regulatory change management?', a: 'We conduct regulatory analysis, impact assessments, and build implementation plans to ensure your organization stays ahead of new compliance requirements.' },
    ],
    whyChoose: 'At Rasta InfoTech, we understand that effective GRC practices are critical to achieving business success and maintaining stakeholder trust. Our team of experts brings deep knowledge and experience in risk management, compliance, and corporate governance. We work closely with our clients to develop customized GRC solutions that align with their unique needs and objectives. Whether you\'re navigating regulatory changes, managing risks, or enhancing governance frameworks, our GRC services provide the insights and tools needed to make informed decisions and drive sustainable growth.',
    technologies: 'At Rasta InfoTech, we leverage a wide range of GRC tools and technologies to optimize your risk management, compliance, and governance processes. Our tech stack includes risk assessment software, compliance management platforms, governance frameworks, and data analytics tools. By integrating these technologies with your existing systems, we create seamless workflows that enhance efficiency, ensure compliance, and drive business value.',
    relatedServices: ['cybersecurity', 'cloud', 'devops'],
  },
  infrastructure: {
    icon: '🏗️',
    title: 'Infrastructure Services',
    tagline: 'Modern, Scalable & Secure IT Infrastructure Services',
    desc: 'Cloud platforms, data centers, network architecture, and endpoint security — a robust and scalable infrastructure essential for operational success.',
    longDesc: 'In today\'s digital-first world, your IT infrastructure forms the backbone of business continuity, agility, and performance. From cloud platforms and data centers to network architecture and endpoint security, a robust and scalable infrastructure is essential for operational success. Rasta InfoTech delivers modern infrastructure services that empower businesses to scale seamlessly, reduce costs, ensure uptime, and secure their assets. Whether you\'re migrating workloads to the cloud, modernizing legacy infrastructure, or building hybrid environments, we design and manage IT ecosystems that are future-ready, agile, and secure. Our infrastructure experts partner with your team to ensure your foundational systems support innovation, growth, and resilience.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&q=80',
    color: 'from-[#0066FF] to-[#3385FF]',
    tags: ['Cloud Infrastructure', 'Hybrid Solutions', 'Network Security', 'IaC', 'Data Center'],
    features: [
      { icon: '☁️', title: 'Cloud Infrastructure', desc: 'We help organizations move to and scale on the cloud with services across AWS, Azure, and Google Cloud. Our solutions include cloud-native architecture, infrastructure provisioning, container orchestration, and hybrid cloud integration.' },
      { icon: '🛠️', title: 'On-Premise & Hybrid Solutions', desc: 'We modernize on-premise data centers and integrate them with public cloud to create secure, compliant, hybrid infrastructure environments that meet your specific business needs.' },
      { icon: '🧱', title: 'Network & Security Architecture', desc: 'Design and implement scalable, secure network topologies including firewalls, VPNs, zero trust, SD-WAN, and network segmentation to ensure secure connectivity across your enterprise.' },
      { icon: '🔄', title: 'Data Center Modernization', desc: 'Transform your legacy data center into a software-defined, cost-efficient, and secure environment using hyperconverged infrastructure and virtualization.' },
      { icon: '🛡️', title: 'Security Hardening & Compliance', desc: 'Implement layered security, identity access management (IAM), endpoint protection, and encryption policies that meet industry compliance standards.' },
      { icon: '⚙️', title: 'Automation & Infrastructure as Code', desc: 'Automate provisioning, updates, and scaling of infrastructure using IaC tools like Terraform, Ansible, and pipelines integrated into CI/CD workflows.' },
    ],
    process: [
      { step: '01', title: 'Cloud Infrastructure Setup & Migration', desc: 'Plan, execute, and manage cloud migrations, cloud-native builds, and infrastructure deployments on AWS, Azure, or GCP with minimal disruption.' },
      { step: '02', title: 'Data Center Modernization', desc: 'Transform legacy data centers into software-defined, cost-efficient, and secure environments using hyperconverged infrastructure and virtualization.' },
      { step: '03', title: 'Network Design & Implementation', desc: 'Architect, secure, and optimize internal and external networks for high availability, performance, and scalability across locations and users.' },
      { step: '04', title: 'Infrastructure Monitoring & Support', desc: '24/7 monitoring, alerting, incident management, and infrastructure health checks using automated tools and NOC specialists.' },
      { step: '05', title: 'Security Hardening & Compliance', desc: 'Implement layered security, IAM, endpoint protection, and encryption policies that meet industry compliance standards.' },
      { step: '06', title: 'Automation & Infrastructure as Code', desc: 'Automate provisioning, updates, and scaling using Terraform, Ansible, and CI/CD-integrated pipelines for consistent, repeatable infrastructure.' },
    ],
    caseStudy: {
      client: 'IT Services Company',
      challenge: 'Aging infrastructure with frequent outages affecting 500+ end users and no disaster recovery.',
      solution: 'We modernized the network, migrated servers to hybrid cloud, and implemented comprehensive DR.',
      result: '99.99% uptime achieved and 40% reduction in infrastructure costs.',
      duration: 'Placeholder - to be updated by Rasta Infotech',
    },
    faqs: [
      { q: 'What cloud platforms do you support?', a: 'AWS, Microsoft Azure, Google Cloud Platform, and Oracle Cloud — including cloud-native builds, migrations, and hybrid integrations.' },
      { q: 'Do you manage hybrid environments?', a: 'Yes, we design and manage secure hybrid environments that integrate on-premise data centers with public cloud platforms.' },
      { q: 'How do you ensure high availability?', a: 'Redundant architecture, load balancing, failover mechanisms, 24/7 monitoring, and automated alerting using tools like Prometheus, Grafana, and Datadog.' },
      { q: 'What IaC tools do you use?', a: 'Terraform, Ansible, and Pulumi for automated infrastructure provisioning, configuration management, and scaling.' },
      { q: 'Do you provide network security services?', a: 'Yes, including firewalls, VPNs, zero trust architecture, SD-WAN, network segmentation, and IAM using vendors like Cisco, Fortinet, and Palo Alto.' },
    ],
    whyChoose: 'Rasta InfoTech stands at the intersection of infrastructure modernization and digital transformation. We design, implement, and manage reliable IT foundations that deliver maximum uptime, agility, and business continuity. With a deep understanding of enterprise IT challenges, we offer tailored infrastructure services that reduce operational costs, mitigate risks, and optimize performance. Our approach blends ITIL-based practices, DevOps principles, and cloud-native tools to ensure your infrastructure is not only stable—but also dynamic, intelligent, and aligned with your business roadmap. We monitor, support, and continuously optimize your infrastructure for peak performance.',
    technologies: 'We work with top-tier platforms across all infrastructure layers. Cloud: AWS, Microsoft Azure, Google Cloud Platform, and Oracle Cloud. Infrastructure as Code: Terraform, Ansible, and Pulumi. Containers: Kubernetes, Docker, and OpenShift. Virtualization and on-prem: VMware, Hyper-V, and Nutanix. Network and security: Cisco, Fortinet, Palo Alto, Juniper, and SonicWall. Monitoring and observability: Prometheus, Grafana, ELK Stack, Datadog, and SolarWinds. All solutions integrate with your DevOps pipelines, CMDBs, and automation platforms.',
    relatedServices: ['cloud', 'cybersecurity', 'devops'],
  },
  'microsoft-coe': {
    icon: '🪟',
    title: 'Microsoft Center of Excellence (COE)',
    tagline: 'Driving Innovation and Excellence with Microsoft Technologies',
    desc: 'Comprehensive Microsoft COE services covering Azure, Office 365, Dynamics 365, and Power Platform to maximize your Microsoft investment and drive digital transformation.',
    longDesc: 'The Microsoft Center of Excellence (COE) is dedicated to leveraging Microsoft\'s suite of tools and technologies to drive innovation, enhance productivity, and achieve operational excellence. As businesses increasingly adopt digital transformation strategies, the need for specialized expertise in Microsoft solutions becomes paramount. At Rasta InfoTech, our Microsoft COE provides comprehensive services that encompass consulting, implementation, customization, and support for Microsoft products such as Azure, Office 365, Dynamics 365, and Power Platform. Our goal is to empower organizations with the capabilities to maximize their investment in Microsoft technologies and achieve sustainable growth.',
    image: 'https://images.unsplash.com/photo-1633419461186-7d40a38105ec?w=1200&q=80',
    color: 'from-[#0066FF] to-[#00C896]',
    tags: ['Azure', 'Office 365', 'Dynamics 365', 'Power Platform', 'Power BI'],
    features: [
      { icon: '☁️', title: 'Azure Cloud Services', desc: 'Harness the power of Microsoft Azure to build, deploy, and manage applications in the cloud. Our Azure services include cloud migration, infrastructure management, security, and compliance to ensure seamless and secure cloud operations.' },
      { icon: '💼', title: 'Dynamics 365 & CRM', desc: 'Optimize customer relationship management with Dynamics 365. Our services include implementation, customization, integration, and support for Dynamics 365 modules such as Sales, Customer Service, Marketing, and Finance.' },
      { icon: '🔧', title: 'Power Platform & Automation', desc: 'Automate business processes and workflows with Power Platform tools like Power Apps, Power Automate, and Power Virtual Agents. Our services include app development, workflow automation, and chatbot creation.' },
      { icon: '📊', title: 'Power BI Implementation', desc: 'Implement Power BI to transform data into actionable insights. Our services include data modeling, visualization, reporting, and integration with various data sources to drive informed decision-making.' },
      { icon: '📧', title: 'Office 365 Setup & Support', desc: 'Set up and support Office 365 tools like SharePoint, Teams, Exchange, and OneDrive to enhance collaboration and productivity. Our services include migration, customization, and ongoing support.' },
      { icon: '🔐', title: 'Security & Compliance', desc: 'Ensure the security and compliance of your Microsoft solutions with comprehensive security assessments, policy development, Microsoft Defender, Sentinel, and ongoing monitoring.' },
    ],
    process: [
      { step: '01', title: 'Azure Cloud Migration', desc: 'Migrate your applications and infrastructure to Microsoft Azure for enhanced scalability, security, and performance with cloud assessment, migration planning, execution, and post-migration support.' },
      { step: '02', title: 'Dynamics 365 Customization', desc: 'Customize Dynamics 365 modules for Sales, Customer Service, Marketing, and Finance to optimize CRM with implementation, integration, and support.' },
      { step: '03', title: 'Power Platform Development', desc: 'Develop and automate business processes with Power Apps, Power Automate, and Power Virtual Agents including app development, workflow automation, and chatbot creation.' },
      { step: '04', title: 'Office 365 Setup & Support', desc: 'Migrate, configure, and support SharePoint, Teams, Exchange, and OneDrive to enhance collaboration and productivity across your organization.' },
      { step: '05', title: 'Integration Services', desc: 'Integrate Microsoft solutions with your existing systems to create seamless workflows and enhance efficiency with integration planning, execution, and support.' },
      { step: '06', title: 'Training & Support', desc: 'Provide training materials, workshops, and ongoing support to help your team effectively use Microsoft tools and maximize adoption.' },
    ],
    caseStudy: {
      client: 'Professional Services Firm',
      challenge: 'Microsoft 365 licenses with minimal adoption — teams using email for everything.',
      solution: 'We implemented Teams, SharePoint, and Power Automate workflows with comprehensive training.',
      result: '50% productivity increase and 80% reduction in email volume.',
      duration: 'Placeholder - to be updated by Rasta Infotech',
    },
    faqs: [
      { q: 'What Microsoft technologies do you specialize in?', a: 'Azure, Office 365, Dynamics 365, Power Platform (Power Apps, Power Automate, Power BI), Teams, and SharePoint.' },
      { q: 'Can you migrate to Microsoft Azure?', a: 'Yes, we handle end-to-end Azure migrations including cloud assessment, migration planning, execution, and post-migration support.' },
      { q: 'Do you implement Dynamics 365?', a: 'Yes, we implement and customize Dynamics 365 modules including Sales, Customer Service, Marketing, and Finance.' },
      { q: 'What Power Platform services do you offer?', a: 'Power Apps development, Power Automate workflow automation, Power BI dashboards, and Power Virtual Agents chatbots.' },
      { q: 'Do you provide training and support?', a: 'Yes, we offer training materials, workshops, and ongoing support to help teams effectively use all Microsoft tools and maximize adoption.' },
    ],
    whyChoose: 'At Rasta InfoTech, we understand that leveraging Microsoft technologies requires specialized expertise and a strategic approach. Our Microsoft COE team consists of certified professionals with deep knowledge and experience in Microsoft solutions. We work closely with our clients to develop customized strategies that align with their business goals and drive innovation. Whether you\'re looking to migrate to the cloud, optimize data analytics, enhance collaboration, or automate processes, our Microsoft COE services provide the insights and tools needed to achieve excellence.',
    technologies: 'At Rasta InfoTech, we leverage a comprehensive suite of Microsoft tools and technologies to deliver effective solutions. Our tech stack includes Azure for cloud services, Power BI for data analytics, Office 365 for collaboration, Dynamics 365 for CRM and ERP, and Power Platform for automation. By integrating these tools with your existing systems, we create seamless workflows that enhance efficiency, ensure compliance, and drive business value.',
    relatedServices: ['cloud', 'devops', 'enterprise-automation'],
  },
  'agile-it': {
    icon: '📋',
    title: 'Agile IT Operations',
    tagline: 'Agile IT Ops – Adaptive, Scalable, and Efficient',
    desc: 'Bridging IT operations and agile development with CI/CD, infrastructure automation, real-time monitoring, and cross-functional collaboration for continuous business value.',
    longDesc: 'Agile IT Operations is a transformative approach that bridges the traditional divide between IT operations and agile software development. In today\'s fast-paced digital landscape, where organizations are expected to innovate rapidly while maintaining high levels of reliability, Agile IT Ops offers a solution that promotes adaptability, speed, and stability. By applying agile principles to IT service management, businesses can streamline workflows, break down departmental silos, and respond to changes with greater agility. At Rasta InfoTech, we recognize that IT operations are no longer just about maintenance—they\'re about delivering business value continuously and efficiently. Agile IT Ops involves collaborative cross-functional teams, continuous integration and delivery (CI/CD), infrastructure automation, real-time monitoring, and data-driven decision-making. With our extensive experience in DevOps, ITSM, and agile frameworks, we enable enterprises to transform their operations into intelligent, automated, and scalable systems.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80',
    color: 'from-[#00C896] to-[#7C3AED]',
    tags: ['CI/CD', 'DevOps', 'Monitoring & Observability', 'IaC', 'Agile Coaching'],
    features: [
      { icon: '🚀', title: 'Continuous Delivery Ops', desc: 'Agile IT Ops integrates Continuous Delivery into everyday workflows, allowing teams to build, test, and release software more frequently and reliably. With CI/CD pipelines, code changes are automatically tested and deployed, reducing human error and enhancing consistency across environments.' },
      { icon: '🔍', title: 'Monitoring & Observability', desc: 'Through real-time monitoring and telemetry, teams gain deep visibility into system health, user behavior, and application performance. Tools like Prometheus, Grafana, and ELK Stack help identify bottlenecks, detect anomalies, and prevent outages before end users are affected.' },
      { icon: '🤝', title: 'Collaborative IT Ops', desc: 'Agile IT Ops replaces traditional hand-offs between development, QA, and operations with unified cross-functional teams that share goals, responsibilities, and feedback loops. This promotes transparency, accelerates delivery cycles, and integrates operational considerations from the start.' },
      { icon: '⚙️', title: 'Infrastructure as Code (IaC)', desc: 'Using Terraform, Ansible, and AWS CloudFormation, we provision and manage infrastructure through code, enabling version control, repeatability, and cost optimization across all environments.' },
      { icon: '📦', title: 'Containerization & Orchestration', desc: 'We deploy, manage, and scale applications using Docker and Kubernetes, enabling better resource utilization and microservices architecture adoption across hybrid and multi-cloud environments.' },
      { icon: '🚨', title: 'Automated Incident Response', desc: 'We implement automated incident management systems integrated with PagerDuty or Opsgenie to reduce response time, eliminate manual escalation, and improve overall system reliability.' },
    ],
    process: [
      { step: '01', title: 'CI/CD Pipeline Setup', desc: 'Architect and implement robust continuous integration and delivery pipelines to automate testing, building, and deploying code—ensuring faster time-to-market and reduced manual effort.' },
      { step: '02', title: 'Infrastructure as Code (IaC)', desc: 'Provision and manage infrastructure through code using Terraform and Ansible, enabling version control, repeatability, and cost optimization across environments.' },
      { step: '03', title: 'Monitoring & Alerting', desc: 'Set up real-time monitoring and alert systems using Prometheus, Grafana, and Datadog to ensure high availability and quick incident resolution.' },
      { step: '04', title: 'DevOps & Agile Coaching', desc: 'Provide hands-on training, workshops, and consulting to help your teams adopt agile principles, streamline workflows, and build a lasting DevOps culture.' },
      { step: '05', title: 'Containerization & Orchestration', desc: 'Deploy, manage, and scale applications using Docker and Kubernetes for better resource utilization and microservices architecture adoption.' },
      { step: '06', title: 'Automated Incident Response', desc: 'Implement automated incident management integrated with PagerDuty or Opsgenie to reduce response time, eliminate manual escalation, and improve reliability.' },
    ],
    caseStudy: {
      client: 'Technology Company',
      challenge: 'The client had 18-month release cycles and poor alignment between IT and business stakeholders.',
      solution: 'We implemented Scrum across 8 development teams and deployed Jira for tracking.',
      result: '40% faster project delivery and on-time delivery rate increased from 40% to 85%.',
      duration: 'Placeholder - to be updated by Rasta Infotech',
    },
    faqs: [
      { q: 'What is Agile IT Operations?', a: 'A transformative approach that bridges IT operations and agile development using CI/CD, infrastructure automation, real-time monitoring, and cross-functional collaboration to deliver business value continuously.' },
      { q: 'What CI/CD tools do you use?', a: 'Jenkins, GitHub Actions, GitLab CI, and Azure DevOps for automated code integration and deployment.' },
      { q: 'What IaC tools do you support?', a: 'Terraform, Ansible, and AWS CloudFormation for consistent and repeatable environment provisioning.' },
      { q: 'How do you handle monitoring and observability?', a: 'We use Prometheus, Grafana, Datadog, New Relic, and Splunk for real-time insights into infrastructure health and application performance.' },
      { q: 'Do you provide DevOps and Agile coaching?', a: 'Yes, hands-on training, workshops, and consulting to help teams adopt agile principles and build a lasting DevOps culture.' },
    ],
    whyChoose: 'Rasta InfoTech is your trusted partner in building resilient, scalable, and forward-looking IT operations. Our Agile IT Ops services are designed to evolve with your business needs. By combining agile methodologies with operational excellence, we ensure your organization can quickly respond to market demands without compromising performance or stability. Our team brings hands-on expertise in automating infrastructure, setting up monitoring systems, integrating CI/CD pipelines, and fostering a DevOps culture. We don\'t just deliver tools—we drive cultural change and process improvement that lasts. Our services go beyond technology—they\'re about transforming mindsets, reducing time-to-market, increasing system reliability, and improving customer satisfaction.',
    technologies: 'We implement Agile IT Ops using a blend of modern, robust, and scalable technologies. CI/CD platforms: Jenkins, GitHub Actions, GitLab CI, and Azure DevOps. Infrastructure as Code: Terraform, Ansible, and AWS CloudFormation. Monitoring and observability: Prometheus, Grafana, Datadog, New Relic, and Splunk. Collaboration tools: Jira, Slack, and Confluence. Container orchestration: Kubernetes and Docker. Cloud platforms: AWS, Azure, and Google Cloud for hybrid or multi-cloud operational strategies.',
    relatedServices: ['devops', 'infrastructure', 'cloud'],
  },
  'product-engineering': {
    icon: '🔧',
    title: 'Product Engineering Services',
    tagline: 'Innovative Product Engineering Services to Accelerate Your Digital Vision',
    desc: 'End-to-end product engineering blending technology, design, and agility to bring ideas to life — from ideation and MVP to launch, scaling, and post-launch support.',
    longDesc: 'In today\'s digital economy, rapid innovation, scalability, and user-centric design are key to successful product development. Product engineering is more than just building software—it\'s a strategic process that blends technology, design, and agility to bring ideas to life faster and more efficiently. At Rasta InfoTech, we provide end-to-end product engineering services that help startups and enterprises transform concepts into market-ready solutions. From product ideation and architecture to development, testing, and post-launch support, we deliver full-lifecycle engineering services built on agile methodologies. Our experienced teams combine modern technologies, automation, and cross-functional collaboration to accelerate time-to-market, reduce development costs, and ensure product-market fit.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&q=80',
    color: 'from-[#3385FF] to-[#00C896]',
    tags: ['MVP Development', 'Platform Modernization', 'Cloud-Native', 'QA Automation', 'API Development'],
    features: [
      { icon: '🧩', title: 'End-to-End Product Development', desc: 'From concept to launch, we handle the complete lifecycle of your product including discovery, UI/UX, architecture, agile development, QA automation, DevOps, and go-to-market support for both MVPs and enterprise-grade platforms.' },
      { icon: '⚙️', title: 'Platform Modernization', desc: 'We help modernize legacy systems and transform them into scalable, cloud-native, API-driven platforms. Whether re-architecting monolithic apps or refactoring codebases, we ensure maintainability, performance, and seamless integration.' },
      { icon: '📲', title: 'User-Centered Design & Experience', desc: 'Our UI/UX experts design intuitive, responsive, and accessible interfaces that enhance user engagement and conversion. We conduct wireframing, prototyping, and usability testing to align every interaction with your brand vision.' },
      { icon: '☁️', title: 'Cloud-Native Architecture & DevOps', desc: 'Build scalable, resilient cloud-native applications with microservices architecture, containerization, infrastructure automation, and continuous delivery pipelines.' },
      { icon: '📱', title: 'Mobile Application Development', desc: 'Develop cross-platform or native mobile applications using React Native, Flutter, or Kotlin/Swift — designed for performance, UX, and seamless backend integration.' },
      { icon: '🧪', title: 'QA Engineering & Test Automation', desc: 'Ensure product stability with end-to-end testing solutions including unit, integration, regression, and performance testing — automated for CI/CD environments.' },
    ],
    process: [
      { step: '01', title: 'Product Ideation & MVP Development', desc: 'Collaborate to refine your idea, build product roadmaps, and deliver MVPs that validate key assumptions and user needs with rapid iteration cycles.' },
      { step: '02', title: 'Custom Software Product Engineering', desc: 'Design and develop tailored software products — from SaaS platforms and marketplaces to enterprise portals and mobile apps — optimized for performance and user experience.' },
      { step: '03', title: 'Cloud-Native Architecture & DevOps', desc: 'Build scalable, resilient cloud-native applications with microservices architecture, containerization, infrastructure automation, and continuous delivery pipelines.' },
      { step: '04', title: 'API Development & Third-Party Integrations', desc: 'Build secure, scalable REST or GraphQL APIs and integrate with third-party services, CRMs, ERPs, payment gateways, and messaging platforms for extensible functionality.' },
      { step: '05', title: 'QA Engineering & Test Automation', desc: 'End-to-end testing including unit, integration, regression, and performance testing — automated for CI/CD environments using Selenium, Cypress, Jest, Postman, and Playwright.' },
      { step: '06', title: 'Mobile Application Development', desc: 'Cross-platform or native mobile apps using React Native, Flutter, or Kotlin/Swift — designed for performance, UX, and seamless backend integration.' },
    ],
    caseStudy: {
      client: 'B2B SaaS Startup',
      challenge: 'The founding team had a strong product vision but no technical team and needed to launch quickly.',
      solution: 'We provided a dedicated product engineering team delivering the MVP in 8 weeks.',
      result: 'MVP launched on time, 500 beta users onboarded, and Series A funding secured.',
      duration: 'Placeholder - to be updated by Rasta Infotech',
    },
    faqs: [
      { q: 'What is product engineering?', a: 'A strategic, full-lifecycle process covering product ideation, UI/UX, architecture, agile development, QA automation, DevOps, and post-launch support to bring digital products to market.' },
      { q: 'How quickly can you build an MVP?', a: 'Typically 6-12 weeks depending on scope and complexity, with rapid iteration cycles to validate key assumptions.' },
      { q: 'What technologies do you use?', a: 'Frontend: React, Next.js, Angular, Vue.js. Backend: Node.js, .NET Core, Java Spring Boot, Python, Golang. Mobile: React Native, Flutter, Kotlin/Swift. Cloud: AWS, Azure, Google Cloud.' },
      { q: 'Can you modernize our legacy platform?', a: 'Yes, we re-architect monolithic applications into scalable, cloud-native, API-driven platforms ensuring maintainability and seamless integration.' },
      { q: 'Do you provide QA and test automation?', a: 'Yes, end-to-end testing including unit, integration, regression, and performance testing using Selenium, Cypress, Jest, Postman, and Playwright — automated for CI/CD.' },
    ],
    whyChoose: 'Rasta InfoTech is a trusted partner for digital product innovation. With a deep understanding of business strategy and emerging technologies, we help clients deliver future-ready products that scale. Our engineering process is guided by lean principles, agile execution, and quality-first thinking. We work in collaborative product pods composed of developers, designers, QA testers, DevOps engineers, and project managers. Our delivery model adapts to your business goals — whether you\'re launching an MVP, entering new markets, or scaling an existing platform. We bring a product mindset to every engagement, ensuring solutions that are technically sound, resonate with end users, and adapt to change quickly.',
    technologies: 'We use a modern and diverse technology stack to power high-performance digital products. Frontend: React, Next.js, Angular, and Vue.js. Backend: Node.js, .NET Core, Java Spring Boot, Python (Django, FastAPI), and Golang. APIs: RESTful and GraphQL. Containerization: Docker and Kubernetes. Databases: PostgreSQL, MongoDB, MySQL, Redis, and Firebase. DevOps: Jenkins, GitHub Actions, GitLab CI, and Azure DevOps. QA automation: Selenium, Cypress, Jest, Postman, and Playwright. Cloud: AWS, Azure, and Google Cloud.',
    relatedServices: ['application', 'devops', 'ai'],
  },
  xaap: {
    icon: '🗂️',
    title: 'Platforms & Protocols – XAAP',
    tagline: 'XAAP – Cross-Platform Innovation with Protocol Intelligence',
    desc: 'eXtensible Application Access Platform (XAAP) — a next-generation framework for building interoperable platforms and intelligent protocol-driven ecosystems across cloud, on-premise, and edge environments.',
    longDesc: 'XAAP (eXtensible Application Access Platform) represents a next-generation framework for building interoperable platforms and intelligent protocol-driven ecosystems. In today\'s connected world, enterprises must integrate a wide range of services, tools, APIs, and devices across various domains and environments. XAAP enables seamless communication between diverse systems—whether cloud-native, on-premise, or edge-based—by offering a unified platform driven by protocol intelligence, modular design, and security-first architecture. At Rasta InfoTech, we empower organizations to build scalable, flexible, and robust systems using the XAAP methodology. Whether you\'re streamlining cross-platform communication, accelerating application delivery, or ensuring compliance with industry-specific protocols, our XAAP-based solutions create a cohesive, interoperable environment that connects data, processes, and platforms into a single intelligent workflow.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&q=80',
    color: 'from-[#0066FF] to-[#7C3AED]',
    tags: ['Cross-Platform Integration', 'Protocol Architecture', 'Microservices', 'API Gateway', 'Event-Driven'],
    features: [
      { icon: '🌐', title: 'Cross-Platform Integration', desc: 'XAAP provides a seamless abstraction layer for integrating apps and services across mobile, web, desktop, IoT, and cloud environments. Business logic remains consistent regardless of platform or device while reducing friction from incompatible systems.' },
      { icon: '🔐', title: 'Protocol-Centric Architecture', desc: 'Our XAAP solutions follow a protocol-first approach, building systems compliant with MQTT, HTTP/2, gRPC, WebSockets, and REST — making data exchange more efficient, structured, and real-time across microservices and distributed components.' },
      { icon: '⚙️', title: 'Modular Microservices', desc: 'We adopt a service-oriented architecture promoting modularity and reusability. Each service functions independently within a secure, standardized protocol ecosystem — resulting in faster development, easier scaling, and isolated maintenance.' },
      { icon: '🔄', title: 'Event-Driven Architecture Setup', desc: 'Build reactive and scalable platforms using message brokers like Kafka or RabbitMQ to support real-time, asynchronous communication across services and distributed systems.' },
      { icon: '🔒', title: 'Security & Compliance Layering', desc: 'Implement robust authentication, encryption, and protocol-level security using JWT, OAuth2, TLS, and data protection best practices — with domain-specific compliance for finance, healthcare, and industrial standards.' },
      { icon: '🔁', title: 'Protocol Transformation & Interoperability', desc: 'Transform data between disparate protocols (e.g., XML to JSON, HL7 to FHIR) to ensure smooth communication between systems and third-party integrations across heterogeneous environments.' },
    ],
    process: [
      { step: '01', title: 'Protocol-Driven Application Design', desc: 'Build applications around well-defined, domain-specific protocols ensuring structured data flow and secure communication across all services.' },
      { step: '02', title: 'Custom API & Platform Engineering', desc: 'Develop custom APIs, SDKs, and developer portals with integrated access control, versioning, and monitoring features.' },
      { step: '03', title: 'Event-Driven Architecture Setup', desc: 'Build reactive, scalable platforms using Kafka or RabbitMQ to support real-time, asynchronous communication.' },
      { step: '04', title: 'Multi-Platform Synchronization', desc: 'Enable consistent data and user experience across mobile, web, desktop, and embedded systems through platform abstraction and centralized orchestration.' },
      { step: '05', title: 'Security & Compliance Layering', desc: 'Implement JWT, OAuth2, TLS, and domain-specific compliance standards — ISO 20022, FHIR, OPC-UA, or OpenID — for secure, auditable platforms.' },
      { step: '06', title: 'Protocol Transformation & Interoperability', desc: 'Transform data between disparate protocols and formats to ensure smooth communication between systems and third-party integrations.' },
    ],
    caseStudy: {
      client: 'Enterprise Technology Company',
      challenge: 'Monolithic architecture causing slow feature delivery and inability to scale individual components.',
      solution: 'We designed and implemented a XAAP-based composable architecture with microservices and API gateway.',
      result: '60% faster feature deployment and 70% reduction in deployment failures.',
      duration: 'Placeholder - to be updated by Rasta Infotech',
    },
    faqs: [
      { q: 'What is XAAP?', a: 'eXtensible Application Access Platform — a next-generation framework for building interoperable platforms and intelligent protocol-driven ecosystems across cloud, on-premise, and edge environments.' },
      { q: 'What protocols does XAAP support?', a: 'REST, GraphQL, MQTT, gRPC, WebSockets, CoAP, and SOAP — selected based on performance, latency, and security requirements.' },
      { q: 'What domain-specific standards do you support?', a: 'ISO 20022 for finance, HL7/FHIR for healthcare, OPC-UA for industrial automation, and OAuth2/OpenID for secure authorization.' },
      { q: 'What API gateway tools do you use?', a: 'Kong, Apigee, and AWS API Gateway to manage services, authenticate access, and route data securely.' },
      { q: 'How is XAAP deployed?', a: 'Solutions are containerized using Docker and orchestrated with Kubernetes for maximum portability and scaling, monitored via ELK, Prometheus, and Datadog.' },
    ],
    whyChoose: 'Rasta InfoTech is a trusted name when it comes to building enterprise-grade platforms with protocol intelligence at the core. Our XAAP-based solutions are not just about connecting systems—they\'re about orchestrating meaningful workflows, enforcing industry standards, and delivering measurable ROI. We bring deep technical knowledge of modern platforms, APIs, and communication protocols and apply them in a way that simplifies complexity for your business. With XAAP, we reduce data silos, increase automation, and enable organizations to quickly build, test, and launch applications across heterogeneous environments. Our commitment goes beyond delivery—we also guide your teams in adopting platform-centric thinking, improving system resilience, and ensuring long-term maintainability.',
    technologies: 'Our XAAP toolkit spans protocols including REST, GraphQL, MQTT, gRPC, WebSockets, CoAP, and SOAP. Platform layer: Spring Boot, Node.js, .NET Core, and Django REST Framework. API gateways: Kong, Apigee, and AWS API Gateway. Real-time data pipelines: Kafka, RabbitMQ, and Apache Pulsar. Domain standards: ISO 20022, FHIR, OPC-UA, and OAuth2/OpenID. Containerization: Docker and Kubernetes. Monitoring: ELK Stack, Prometheus, and Datadog.',
    relatedServices: ['application', 'devops', 'cloud'],
  },
  salesforce: {
    icon: '☁️',
    title: 'Salesforce Consulting and Services COE',
    tagline: 'Salesforce Consulting Services That Drive Connected Customer Experiences',
    desc: 'Tailored Salesforce consulting, implementation, customization, and managed services to transform customer experiences, automate workflows, and maximize CRM ROI — from startups to large enterprises.',
    longDesc: 'Salesforce is the world\'s leading CRM platform, empowering organizations to streamline sales, marketing, service, and operations with intelligent automation and a 360-degree view of customers. But to unlock its full potential, you need a strategic partner who understands both the technology and your business goals. At Rasta InfoTech, our Salesforce Center of Excellence (COE) delivers tailored consulting, implementation, customization, and managed services that help organizations get the most out of Salesforce. Whether you\'re starting a CRM journey, optimizing an existing org, or expanding with industry clouds, our certified Salesforce experts help you transform customer experiences, automate workflows, and maximize ROI. From startups to large enterprises, we deliver scalable Salesforce solutions aligned to your digital strategy.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80',
    color: 'from-[#00A1E0] to-[#0066FF]',
    tags: ['Sales Cloud', 'Service Cloud', 'Apex & LWC', 'MuleSoft', 'Einstein AI'],
    features: [
      { icon: '💼', title: 'Sales & Service Cloud Implementation', desc: 'We configure and customize Salesforce Sales Cloud and Service Cloud to streamline lead management, sales automation, case handling, and omnichannel support — improving deal closure rates and customer satisfaction with a unified platform.' },
      { icon: '⚙️', title: 'Custom Development with Apex & LWC', desc: 'Extend Salesforce capabilities with custom apps and components using Apex, Lightning Web Components (LWC), and Visualforce. We build scalable, secure, and performance-optimized customizations that fit your exact business logic.' },
      { icon: '🔗', title: 'Integration & Data Migration', desc: 'Seamlessly connect Salesforce with ERP, marketing, and external apps using REST/SOAP APIs, MuleSoft, or middleware tools. We also ensure clean, accurate, and secure data migration from legacy systems to Salesforce.' },
      { icon: '🚀', title: 'Salesforce Consulting & Strategy', desc: 'Assess your business needs and build a roadmap for Salesforce adoption, optimization, and digital transformation across departments — aligned to your CRM journey and growth goals.' },
      { icon: '🛠️', title: 'Managed Services & Admin Support', desc: 'Ongoing Salesforce support, administration, user training, and enhancements. SLA-based services for bug fixes, minor releases, and user management to keep your org running optimally.' },
      { icon: '🔄', title: 'Salesforce DevOps & Release Management', desc: 'Automate development pipelines, deployments, and org synchronization with Salesforce DX, Git, CI/CD workflows, and sandbox management best practices.' },
    ],
    process: [
      { step: '01', title: 'Salesforce Consulting & Strategy', desc: 'Assess your business needs and build a roadmap for Salesforce adoption, optimization, and digital transformation across departments.' },
      { step: '02', title: 'Implementation & Configuration', desc: 'Implement Salesforce Sales, Service, or Experience Cloud with out-of-the-box features, data models, workflows, security rules, and role hierarchies.' },
      { step: '03', title: 'Custom Development & AppExchange Solutions', desc: 'Build custom apps on the Salesforce platform — including AppExchange products, internal tools, or mobile apps using LWC and Apex.' },
      { step: '04', title: 'Data Migration & Integration', desc: 'Plan and execute secure data migrations from spreadsheets, CRMs, or ERPs. Integrate Salesforce with SAP, Oracle, HubSpot, or Microsoft Dynamics.' },
      { step: '05', title: 'Managed Services & Admin Support', desc: 'Ongoing Salesforce support, administration, user training, and enhancements with SLA-based services for bug fixes, releases, and user management.' },
      { step: '06', title: 'Salesforce DevOps & Release Management', desc: 'Automate development pipelines and deployments with Salesforce DX, Git, CI/CD workflows, and sandbox management best practices.' },
    ],
    caseStudy: {
      client: 'Enterprise Sales Team',
      challenge: 'No CRM system — sales reps using spreadsheets with no pipeline visibility.',
      solution: 'We implemented Salesforce Sales Cloud with workflow automation and ERP integration.',
      result: '45% increase in sales productivity and 30% improvement in forecast accuracy.',
      duration: 'Placeholder - to be updated by Rasta Infotech',
    },
    faqs: [
      { q: 'What Salesforce clouds do you implement?', a: 'Sales Cloud, Service Cloud, Marketing Cloud, Experience Cloud (Communities), Commerce Cloud, Field Service, and Salesforce Platform.' },
      { q: 'Do you provide custom Salesforce development?', a: 'Yes, custom Apex, Lightning Web Components (LWC), Visualforce, Salesforce Flow, and AppExchange solutions.' },
      { q: 'Can you integrate Salesforce with external systems?', a: 'Yes, using REST/SOAP APIs, MuleSoft, Dell Boomi, or Zapier with SAP, Oracle, HubSpot, Microsoft Dynamics, and more.' },
      { q: 'Do you offer Salesforce DevOps services?', a: 'Yes, with Salesforce DX, Git, Jenkins, and automated testing using Provar or Selenium for CI/CD and release management.' },
      { q: 'Do you provide managed services and admin support?', a: 'Yes, SLA-based ongoing support, administration, user training, bug fixes, and continuous enhancements.' },
    ],
    whyChoose: 'With a dedicated Salesforce Center of Excellence, Rasta InfoTech combines strategic insight with deep platform expertise to deliver Salesforce solutions that transform your business. Our consultants, developers, and architects follow agile methodologies, Salesforce best practices, and industry-aligned templates to deliver faster, smarter, and more sustainable outcomes. We bring experience across multiple Salesforce clouds — Sales, Service, Marketing, Experience, Field Service, and more. Whether it\'s CPQ implementation, Einstein AI insights, workflow automation, or mobile app development, we ensure end-to-end value from your investment. Partnering with us means gaining a trusted advisor who can scale with you across releases, org changes, and innovation cycles.',
    technologies: 'Our Salesforce COE is proficient across: Sales Cloud, Service Cloud, Marketing Cloud, Experience Cloud, and Commerce Cloud. Custom development: Apex, LWC, Visualforce, and SOQL. Automation: Salesforce Flow, Process Builder, and Approval Processes. Integration: MuleSoft, Dell Boomi, Zapier, and REST/SOAP APIs. Security: Salesforce Shield, Field-Level Security, and Role Hierarchies. Analytics: Einstein Analytics and Tableau CRM. DevOps: Salesforce DX, Git, Jenkins, and Provar/Selenium for automated testing.',
    relatedServices: ['application', 'enterprise-automation', 'devops'],
  },
  cloud: {
    icon: '🌐',
    title: 'Cloud Services',
    tagline: 'Cloud Solutions for Scalable, Secure & Agile Digital Transformation',
    desc: 'Comprehensive cloud services across AWS, Azure, and GCP — from migration and cloud-native development to DevOps automation, security, and 24/7 managed operations.',
    longDesc: 'Cloud services are the foundation of modern digital innovation. By migrating to the cloud, businesses gain access to scalable infrastructure, on-demand computing power, and advanced data management capabilities—all while reducing operational costs and improving service uptime. Whether you\'re looking to migrate legacy systems, build cloud-native applications, or enable hybrid infrastructure, cloud computing offers the flexibility and speed required for digital growth. At Rasta InfoTech, we provide comprehensive cloud services that accelerate your digital transformation journey. Our certified cloud experts design, deploy, and manage solutions on AWS, Microsoft Azure, Google Cloud Platform (GCP), and others. We specialize in cloud migration, application modernization, DevOps automation, and managed cloud services—ensuring your business remains agile, competitive, and ready for scale.',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1200&q=80',
    color: 'from-[#0066FF] to-[#00C896]',
    tags: ['Public Cloud', 'Private Cloud', 'Hybrid & Multi-Cloud', 'IaC', 'Cloud Security'],
    features: [
      { icon: '☁️', title: 'Public Cloud Services', desc: 'Public cloud platforms like AWS, Azure, and Google Cloud offer instant scalability, high availability, and flexible pricing. Ideal for businesses seeking fast innovation, reduced hardware dependency, and enterprise-grade security without physical infrastructure.' },
      { icon: '🏢', title: 'Private Cloud Deployment', desc: 'Private cloud solutions deliver dedicated infrastructure for enhanced control, compliance, and customization. Ideal for finance, healthcare, or government organizations requiring strict data governance and privacy while still benefiting from cloud agility.' },
      { icon: '🔗', title: 'Hybrid & Multi-Cloud Architecture', desc: 'Combine public cloud flexibility with private infrastructure control to optimize cost, improve disaster recovery, and ensure business continuity by distributing workloads across different cloud providers with seamless orchestration and real-time integration.' },
      { icon: '🚀', title: 'Cloud Migration & Assessment', desc: 'In-depth cloud readiness assessments and secure, low-downtime migrations from on-premises or legacy systems. We ensure business continuity throughout the transition with lift-and-shift, re-platforming, and re-architect strategies.' },
      { icon: '🛡️', title: 'Cloud Security & Compliance', desc: 'Protect cloud assets with advanced security frameworks, encryption, zero-trust policies, IAM, and regulatory compliance enforcement to meet HIPAA, GDPR, SOC 2, and PCI DSS standards.' },
      { icon: '📊', title: 'Managed Cloud Services & Optimization', desc: '24/7 managed services covering monitoring, alerting, cost control, performance tuning, scaling, patching, and backups — ensuring your cloud infrastructure remains fast, secure, and efficient.' },
    ],
    process: [
      { step: '01', title: 'Cloud Migration & Assessment', desc: 'Perform in-depth cloud readiness assessments and execute secure, low-downtime migrations from on-premises or legacy systems, ensuring business continuity throughout.' },
      { step: '02', title: 'Cloud-Native Application Development', desc: 'Build cloud-native apps that are scalable, resilient, and cost-efficient using serverless architecture and microservices to innovate faster and reduce technical debt.' },
      { step: '03', title: 'Infrastructure as Code (IaC) & Automation', desc: 'Achieve predictable, error-free deployments through infrastructure automation using Terraform, Pulumi, and AWS CloudFormation to accelerate provisioning and ensure consistency.' },
      { step: '04', title: 'DevOps & Continuous Delivery', desc: 'Design and implement CI/CD pipelines automating code builds, tests, deployments, and rollbacks for rapid and reliable software delivery across staging and production environments.' },
      { step: '05', title: 'Cloud Security & Compliance', desc: 'Implement advanced security frameworks, encryption, zero-trust policies, IAM, and compliance controls for HIPAA, GDPR, SOC 2, and PCI DSS standards.' },
      { step: '06', title: 'Managed Cloud Services & Optimization', desc: '24/7 managed services covering monitoring, alerting, cost control, performance tuning, scaling, patching, and backups for a fast, secure, and efficient cloud environment.' },
    ],
    caseStudy: {
      client: 'Healthcare Provider',
      challenge: 'Aging on-premise infrastructure with 99.2% uptime and high maintenance costs.',
      solution: 'We executed a phased migration to AWS with auto-scaling and HIPAA-compliant data management.',
      result: '60% reduction in infrastructure costs and 99.99% uptime.',
      duration: 'Placeholder - to be updated by Rasta Infotech',
    },
    faqs: [
      { q: 'Which cloud platforms do you support?', a: 'AWS, Microsoft Azure, Google Cloud Platform, Oracle Cloud, and multi-cloud and hybrid environments.' },
      { q: 'What IaC tools do you use?', a: 'Terraform, AWS CloudFormation, Pulumi, and Ansible for automated, repeatable cloud provisioning and configuration.' },
      { q: 'Can you reduce our cloud costs?', a: 'Yes, our FinOps practice using right-sizing, reserved instances, and architecture optimization typically reduces cloud spend by 30-50%.' },
      { q: 'How do you ensure cloud security and compliance?', a: 'Through IAM, RBAC, firewalls, WAF, encryption, and compliance auditing aligned to GDPR, HIPAA, SOC 2, and ISO 27001.' },
      { q: 'Do you offer 24/7 managed cloud services?', a: 'Yes, covering monitoring, alerting, cost control, performance tuning, scaling, patching, and backups across AWS, Azure, and GCP.' },
    ],
    whyChoose: 'Rasta InfoTech is a leading cloud solutions provider with deep expertise in cloud strategy, infrastructure automation, and application development. We offer customized cloud consulting services tailored to your business goals — whether you\'re launching a new SaaS product, migrating enterprise systems, or modernizing legacy applications. What sets us apart is our commitment to business outcomes. We align cloud adoption with your operational KPIs — reducing IT overhead, enhancing customer experiences, and accelerating time-to-market. Our DevOps and CI/CD practices ensure rapid delivery and minimal downtime, while our robust monitoring and security protocols safeguard your data and applications. With a proven track record across fintech, healthcare, retail, and logistics, Rasta InfoTech helps businesses of all sizes unlock the full potential of cloud technology.',
    technologies: 'Our cloud implementation stack covers AWS (EC2, S3, Lambda, RDS), Azure (App Services, Functions, Azure SQL), and GCP (App Engine, Cloud Storage, BigQuery). IaC: Terraform, AWS CloudFormation, and Ansible. Containers: Docker and Kubernetes (EKS, AKS, GKE). CI/CD: GitLab CI, Jenkins, GitHub Actions, and Azure DevOps. Monitoring: Prometheus, Grafana, ELK Stack, AWS CloudWatch, Azure Monitor, and Datadog. Security: IAM, RBAC, WAF, encryption, and compliance auditing for GDPR, HIPAA, and ISO 27001.',
    relatedServices: ['devops', 'infrastructure', 'cybersecurity'],
  },
  aws: {
    icon: '🟠',
    title: 'AWS Cloud Services',
    tagline: 'Scalable, Secure, and Future-Ready AWS Cloud Solutions',
    desc: 'End-to-end AWS cloud services — migration, cloud-native development, DevOps, security, and 24/7 managed operations — delivered by certified AWS architects and engineers.',
    longDesc: 'Amazon Web Services (AWS) is the most comprehensive and widely adopted cloud platform, trusted by millions of businesses to power their infrastructure, scale applications, and drive innovation. At Rasta InfoTech, we offer end-to-end AWS Cloud Services that help organizations modernize infrastructure, reduce operational costs, and enhance agility. Whether you\'re migrating to AWS, building cloud-native applications, or optimizing workloads, our certified AWS architects and DevOps engineers ensure a smooth and secure cloud journey. We combine technical expertise with industry best practices to deliver high-performance, resilient, and cost-effective AWS solutions tailored to your business goals.',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1200&q=80',
    color: 'from-[#FF9900] to-[#0066FF]',
    tags: ['Cloud Migration', 'Cloud-Native', 'Security & Compliance', 'DevOps', 'FinOps'],
    features: [
      { icon: '☁️', title: 'Cloud Migration & Modernization', desc: 'We assess your current IT environment and execute seamless migrations to AWS using proven frameworks. From lift-and-shift to re-platforming and refactoring, we modernize legacy systems for better performance and lower costs.' },
      { icon: '🧱', title: 'Cloud-Native Development', desc: 'Build and deploy cloud-native applications using serverless architecture, microservices, and containers on AWS. We use Lambda, ECS, EKS, and API Gateway to create scalable, event-driven solutions with faster release cycles.' },
      { icon: '🔒', title: 'Security, Compliance & Governance', desc: 'Secure AWS workloads with IAM, encryption, security groups, VPC configurations, and AWS WAF. We implement compliance frameworks (HIPAA, GDPR, ISO) and monitor using AWS Security Hub and GuardDuty.' },
      { icon: '🚀', title: 'AWS Migration Services', desc: 'Plan and execute smooth migration from on-prem or other clouds to AWS using the AWS Migration Acceleration Program (MAP) and our certified specialists.' },
      { icon: '⚙️', title: 'Application Modernization & DevOps', desc: 'Refactor and containerize applications, implement CI/CD pipelines, and accelerate deployment through AWS DevOps tools — CodePipeline, CodeDeploy, CloudFormation — and serverless infrastructure.' },
      { icon: '📊', title: 'Ongoing Optimization & Support', desc: 'Monitor, manage, and optimize AWS workloads for cost, performance, and reliability with 24/7 support, FinOps insights using AWS Budgets and Trusted Advisor, and proactive remediation.' },
    ],
    process: [
      { step: '01', title: 'AWS Cloud Consulting', desc: 'Define your AWS cloud strategy, assess readiness, and build a roadmap for cloud adoption and transformation aligned with business goals.' },
      { step: '02', title: 'Infrastructure Design & Deployment', desc: 'Architect and deploy secure, scalable, and cost-efficient cloud infrastructure using AWS best practices and automation with CloudFormation and Terraform.' },
      { step: '03', title: 'Application Modernization & DevOps', desc: 'Refactor and containerize applications, implement CI/CD pipelines, and accelerate deployment through AWS DevOps tools and serverless infrastructure.' },
      { step: '04', title: 'AWS Migration Services', desc: 'Execute smooth migrations from on-prem or other clouds to AWS using the AWS Migration Acceleration Program (MAP) and certified specialists.' },
      { step: '05', title: 'Security, Backup & Disaster Recovery', desc: 'Implement security-first architecture, data encryption, secure access policies, backup automation, and DR strategies to protect cloud workloads.' },
      { step: '06', title: 'Ongoing Optimization & Support', desc: 'Monitor, manage, and optimize AWS workloads 24/7 for cost, performance, and reliability with FinOps insights and proactive remediation.' },
    ],
    caseStudy: {
      client: 'E-Commerce Platform',
      challenge: 'Frequent outages during peak traffic with on-premise infrastructure unable to handle spikes.',
      solution: 'We migrated to AWS with auto-scaling EC2, CloudFront CDN, and RDS Multi-AZ.',
      result: '10x scalability with zero downtime and 40% reduction in infrastructure costs.',
      duration: 'Placeholder - to be updated by Rasta Infotech',
    },
    faqs: [
      { q: 'Are you an AWS partner?', a: 'Yes, we are an advanced AWS service provider with certified cloud architects, DevOps specialists, and security engineers.' },
      { q: 'What AWS services do you specialize in?', a: 'Compute: EC2, Lambda. Storage: S3, EBS, Glacier. Databases: RDS, DynamoDB, Redshift, Aurora. Containers: ECS, EKS, Fargate. Networking: VPC, Route 53, CloudFront. Security: IAM, Cognito, KMS, GuardDuty.' },
      { q: 'Can you help reduce AWS costs?', a: 'Yes, through right-sizing, reserved instances, savings plans, and FinOps practices using AWS Budgets and Trusted Advisor — typically 30-50% reduction.' },
      { q: 'Do you implement security and compliance on AWS?', a: 'Yes, using IAM, encryption, VPC configurations, AWS WAF, Security Hub, and GuardDuty — with compliance for HIPAA, GDPR, and ISO standards.' },
      { q: 'Do you offer 24/7 managed AWS services?', a: 'Yes, monitoring, patching, cost optimization, incident response, and proactive remediation around the clock.' },
    ],
    whyChoose: 'At Rasta InfoTech, we are an advanced AWS service provider with certified cloud architects, DevOps specialists, and security engineers. We\'ve helped organizations across industries accelerate their cloud transformation using AWS\'s robust ecosystem. Our approach combines deep domain knowledge, agile delivery, and cost optimization strategies to ensure tangible business outcomes. Whether you\'re starting with a single workload or transforming your entire IT estate, we bring automation, scalability, and reliability to your cloud initiatives. We prioritize operational excellence, security-first design, and continuous innovation through AWS native tools and best practices.',
    technologies: 'Compute and storage: EC2, Lambda, EBS, S3, and Glacier. Containers: ECS, EKS, Fargate, Docker, and Kubernetes. Databases: RDS (MySQL, PostgreSQL, Oracle), DynamoDB, Redshift, and Aurora. Networking: VPC, Route 53, API Gateway, Load Balancers, and CloudFront. DevOps: CloudFormation, CodePipeline, CodeDeploy, CloudWatch, and Terraform. Security: IAM, Cognito, KMS, Shield, GuardDuty, and Security Hub. Analytics & AI/ML: Athena, QuickSight, SageMaker, and Comprehend. Monitoring: AWS Budgets, Trusted Advisor, CloudTrail, and CloudWatch.',
    relatedServices: ['cloud', 'devops', 'cybersecurity'],
  },
  azure: {
    icon: '🔵',
    title: 'Microsoft Azure Cloud Services',
    tagline: 'Microsoft Azure – Build, Scale, and Transform with the Cloud',
    desc: 'Expert Azure cloud services — migration, IaaS/PaaS, DevOps, security, data analytics, hybrid cloud, and managed operations — tailored to accelerate your digital transformation.',
    longDesc: 'Microsoft Azure is a leading cloud computing platform that empowers organizations to build, deploy, and manage applications through Microsoft-managed data centers. Azure offers a comprehensive suite of IaaS, PaaS, and SaaS solutions. At Rasta InfoTech, we provide expert Azure cloud services designed to help businesses achieve scalability, flexibility, and innovation. From seamless cloud migration to robust infrastructure management and advanced analytics, our Azure solutions are tailored to meet the evolving needs of your enterprise. Embrace the power of the cloud with Azure to accelerate your digital transformation journey.',
    image: 'https://images.unsplash.com/photo-1633419461186-7d40a38105ec?w=1200&q=80',
    color: 'from-[#0078D4] to-[#0066FF]',
    tags: ['Azure Migration', 'IaaS & PaaS', 'Azure Security', 'Azure DevOps', 'Hybrid Cloud'],
    features: [
      { icon: '☁️', title: 'Azure Cloud Migration', desc: 'Seamlessly move workloads to Azure with minimal downtime and risk. We assess your infrastructure, create a migration roadmap, and ensure a smooth transition with performance, security, and cost-efficiency in mind.' },
      { icon: '🛡️', title: 'Azure Security & Compliance', desc: 'Protect your cloud environment with Azure\'s built-in security tools and our custom compliance solutions. We implement identity access management, encryption, threat protection, and policy compliance aligned with ISO, HIPAA, and GDPR.' },
      { icon: '📊', title: 'Azure Data & Analytics', desc: 'Unlock business insights with Azure\'s powerful data services. We help store, process, and analyze large datasets using Azure Synapse, Data Factory, Power BI, and Machine Learning to enable data-driven decision-making.' },
      { icon: '⚙️', title: 'Azure DevOps Integration', desc: 'Automate your software delivery pipeline using Azure DevOps. We implement CI/CD, source control, release pipelines, and infrastructure automation to accelerate deployment cycles.' },
      { icon: '🔗', title: 'Hybrid Cloud Solutions', desc: 'Integrate on-premises systems with Azure to create a seamless hybrid cloud environment using Azure Arc, ExpressRoute, and VPN Gateway for consistent operations across environments.' },
      { icon: '🔄', title: 'Backup & Disaster Recovery', desc: 'Ensure business continuity with Azure Backup and Site Recovery. We design DR strategies to protect critical workloads and data from disruptions.' },
    ],
    process: [
      { step: '01', title: 'Azure Cloud Assessment', desc: 'Evaluate your current IT landscape to identify cloud transformation opportunities including cost analysis, workload readiness, and architectural recommendations for Azure.' },
      { step: '02', title: 'Infrastructure as a Service (IaaS)', desc: 'Provision and manage virtual machines, storage, and networking on Azure with scalable, high-availability, and secure infrastructure environments.' },
      { step: '03', title: 'Platform as a Service (PaaS)', desc: 'Deploy and manage applications using Azure App Services, AKS, and databases like Azure SQL and Cosmos DB — without managing the underlying infrastructure.' },
      { step: '04', title: 'Azure DevOps Integration', desc: 'Automate software delivery with CI/CD pipelines, source control, release management, and infrastructure automation on Azure DevOps.' },
      { step: '05', title: 'Azure Identity & Access Management', desc: 'Secure your environment with Azure Active Directory, Multi-Factor Authentication, and RBAC to manage user access and identity protection.' },
      { step: '06', title: 'Monitoring & Optimization', desc: 'Continuously monitor and optimize Azure resources using Azure Monitor, Application Insights, and Cost Management to improve performance and reduce expenses.' },
    ],
    caseStudy: {
      client: 'Financial Services Company',
      challenge: 'Needed to meet strict regulatory requirements while modernizing infrastructure.',
      solution: 'We implemented Azure Government Cloud with Azure AD, Intune MDM, and Azure Security Center.',
      result: 'Full regulatory compliance and 35% reduction in IT management overhead.',
      duration: 'Placeholder - to be updated by Rasta Infotech',
    },
    faqs: [
      { q: 'Are you a Microsoft Azure partner?', a: 'Yes, we are a certified Microsoft Partner with Azure Solutions Architects, DevOps specialists, and security engineers.' },
      { q: 'What Azure services do you specialize in?', a: 'Azure DevOps, AKS, App Services, Azure SQL, Cosmos DB, Synapse, Data Factory, Power BI, Azure ML, Azure AD, and Security Center.' },
      { q: 'Can you migrate workloads to Azure?', a: 'Yes, using Azure Migrate with lift-and-shift, re-platforming, or re-architecture strategies — with minimal downtime and risk.' },
      { q: 'How do you handle Azure security and compliance?', a: 'We implement Azure AD, MFA, RBAC, encryption, Microsoft Defender, Sentinel, and compliance policies for ISO, HIPAA, and GDPR.' },
      { q: 'Do you support hybrid cloud with Azure?', a: 'Yes, using Azure Arc, ExpressRoute, and VPN Gateway to integrate on-premises systems with Azure for seamless hybrid operations.' },
    ],
    whyChoose: 'Rasta InfoTech is your trusted partner in deploying and managing Azure cloud solutions that drive innovation and efficiency. Our certified Azure professionals provide strategic guidance, architectural planning, and hands-on implementation tailored to your business objectives. We combine deep technical expertise with a customer-centric approach to ensure secure, scalable, and high-performance cloud environments. Whether you are starting your cloud journey or looking to optimize your existing Azure setup, we deliver end-to-end solutions that align with your digital goals.',
    technologies: 'We work across the Azure ecosystem using Azure DevOps for CI/CD, Azure Resource Manager for infrastructure management, Azure Monitor and Log Analytics for observability, and Azure Active Directory for identity services. We also integrate Terraform, GitHub Actions, and Ansible for enhanced automation. Key services: IaaS (VMs, storage, VNet), PaaS (App Services, AKS, Azure SQL, Cosmos DB), Data & Analytics (Synapse, Data Factory, Power BI, Azure ML), Security (Azure AD, Defender, Sentinel, KMS), and Hybrid (Azure Arc, ExpressRoute, VPN Gateway).',
    relatedServices: ['cloud', 'devops', 'microsoft-coe'],
  },
  vmware: {
    icon: '🖥️',
    title: 'VMware Tanzu Services',
    tagline: 'Modernize Applications & Infrastructure with VMware Tanzu Services',
    desc: 'Expert VMware Tanzu services for Kubernetes enablement, application modernization with Spring, DevSecOps automation, and 24/7 managed Tanzu platform operations.',
    longDesc: 'VMware Tanzu is a modern application platform that empowers enterprises to build, run, and manage cloud-native applications across Kubernetes environments. Tanzu accelerates application delivery, automates operations, and fosters DevOps collaboration — making it a core technology for modern digital transformation. At Rasta InfoTech, we offer expert VMware Tanzu services to help organizations embrace Kubernetes, containerization, and microservices at scale. Whether you are just starting your cloud-native journey or looking to optimize Kubernetes operations, our Tanzu-certified engineers guide you through application modernization, platform engineering, and lifecycle management. We help enterprises deliver software faster, with consistency, reliability, and full observability across environments.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&q=80',
    color: 'from-[#607078] to-[#0066FF]',
    tags: ['Kubernetes', 'Containerization', 'App Modernization', 'DevSecOps', 'Tanzu TAP'],
    features: [
      { icon: '🐳', title: 'Containerization & Kubernetes Enablement', desc: 'We containerize legacy and monolithic applications, prepare them for Kubernetes, and deploy on Tanzu Kubernetes Grid (TKG) with best practices for scalability, observability, and security.' },
      { icon: '🚀', title: 'Application Modernization with Spring', desc: 'Leverage the Spring ecosystem supported by Tanzu Application Service (TAS) to rebuild, refactor, or re-platform applications. Our Spring Boot experts accelerate modernization using reusable patterns and cloud-native principles.' },
      { icon: '⚙️', title: 'DevSecOps Automation & CI/CD Pipelines', desc: 'Enable GitOps and DevSecOps by implementing automated CI/CD pipelines using Tanzu Build Service, Tanzu Application Platform (TAP), and integrations with Jenkins, GitLab, or GitHub Actions.' },
      { icon: '🔭', title: 'Monitoring & Observability with Wavefront', desc: 'Gain end-to-end visibility into Kubernetes clusters and apps using Tanzu Observability (Wavefront) for proactive alerting, real-time insights, and SLA tracking.' },
      { icon: '🔒', title: 'CI/CD Pipeline Implementation with TAP', desc: 'Automate application delivery using Tanzu Application Platform, Build Service, and DevSecOps pipelines with policy enforcement and secure supply chains.' },
      { icon: '📊', title: 'Managed Tanzu Platform Services', desc: '24/7 platform management, updates, scaling, and support for Tanzu environments across hybrid and multi-cloud setups.' },
    ],
    process: [
      { step: '01', title: 'Tanzu Readiness Assessment', desc: 'Evaluate your infrastructure, applications, and DevOps maturity to identify best-fit Tanzu components and build a modernization roadmap.' },
      { step: '02', title: 'Kubernetes Setup & Cluster Management', desc: 'Deploy secure, production-grade Kubernetes clusters using Tanzu Kubernetes Grid (TKG) and manage them with Tanzu Mission Control (TMC).' },
      { step: '03', title: 'Application Containerization & Refactoring', desc: 'Containerize legacy applications using Docker and refactor them into microservices compatible with Kubernetes and Spring Boot.' },
      { step: '04', title: 'CI/CD Pipeline Implementation with TAP', desc: 'Automate application delivery using Tanzu Application Platform, Build Service, and DevSecOps pipelines with policy enforcement and secure supply chains.' },
      { step: '05', title: 'Monitoring & Observability with Wavefront', desc: 'Deploy Tanzu Observability for end-to-end visibility into Kubernetes clusters and apps with proactive alerting, insights, and SLA tracking.' },
      { step: '06', title: 'Managed Tanzu Platform Services', desc: '24/7 platform management, updates, scaling, and support for Tanzu environments across hybrid and multi-cloud setups.' },
    ],
    caseStudy: {
      client: 'Enterprise Software Company',
      challenge: 'Legacy monolithic applications on aging vSphere infrastructure with slow deployments.',
      solution: 'We implemented Tanzu Platform, containerized 20 applications, and established GitOps pipelines.',
      result: '70% faster application deployment and adoption of modern DevOps practices.',
      duration: 'Placeholder - to be updated by Rasta Infotech',
    },
    faqs: [
      { q: 'What is VMware Tanzu?', a: 'A modern application platform for building, running, and managing cloud-native applications across Kubernetes environments — accelerating delivery, automating operations, and enabling DevOps collaboration.' },
      { q: 'What Tanzu products do you work with?', a: 'Tanzu Kubernetes Grid (TKG), Tanzu Application Platform (TAP), Tanzu Build Service, Tanzu Mission Control (TMC), Tanzu Observability (Wavefront), Spring Boot, Harbor, and Carvel.' },
      { q: 'Can Tanzu work with existing VMware infrastructure?', a: 'Yes, Tanzu Kubernetes Grid integrates seamlessly with existing vSphere infrastructure and extends to public cloud and edge environments.' },
      { q: 'How does Tanzu support DevSecOps?', a: 'Through TAP\'s secure supply chain management, Tanzu Build Service for automated container builds, and GitOps integrations with Jenkins, GitLab, and GitHub Actions.' },
      { q: 'Do you provide ongoing Tanzu platform management?', a: 'Yes, 24/7 managed Tanzu platform services including updates, scaling, cluster management, and support across hybrid and multi-cloud setups.' },
    ],
    whyChoose: 'Rasta InfoTech combines deep expertise in cloud-native technologies, DevOps practices, and VMware Tanzu platforms to help businesses modernize efficiently and securely. Our VMware-certified professionals deliver customized Tanzu solutions for development, deployment, and platform automation. We emphasize standardization, developer productivity, and operational resilience. From Day 0 design to Day 2 operations and continuous optimization, we ensure your Tanzu deployment aligns with business goals. Our service catalog includes Tanzu Kubernetes Grid, Tanzu Mission Control, Tanzu Observability, and Tanzu Application Platform.',
    technologies: 'Tanzu Kubernetes Grid (TKG) for Kubernetes clusters across vSphere, public cloud, and edge. Tanzu Application Platform (TAP) for secure supply chain, CI/CD automation, and inner-loop development. Tanzu Build Service for automated container builds using Cloud Native Buildpacks. Tanzu Mission Control (TMC) for centralized Kubernetes lifecycle management. Tanzu Observability (Wavefront) for real-time metrics, logs, and tracing. Spring Boot and Spring Cloud for microservices. Harbor and Carvel for container image and configuration management. Integrations: Git, Jenkins, GitLab, Istio, Fluentd, and third-party security scanners.',
    relatedServices: ['devops', 'cloud', 'infrastructure'],
  },
  recruitment: {
    icon: '🎓',
    title: 'Recruitment & Staffing Solutions',
    tagline: '100% Placement Assurance — Your Career Guaranteed',
    desc: 'Premium recruitment and staffing with 100% placement assurance, AI-powered matching, and payroll management.',
    longDesc: 'Rasta Infotech Recruitment & Staffing vertical combines career development, technical training, and guaranteed placement. We have successfully placed 500+ students and professionals in top IT companies with an average package of 6.5 LPA. Our AI-powered matching engine connects the right talent with the right opportunities while our placement cell maintains relationships with 200+ hiring partners.',
    image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1200&q=80',
    color: 'from-[#00C896] to-[#0066FF]',
    tags: ['100% Placement', 'AI Matching', 'Payroll', 'Contract Hiring', 'Career Coaching'],
    features: [
      { icon: '🎯', title: '100% Placement Assurance', desc: 'Every student receives dedicated support until placed — no placement, no fee.' },
      { icon: '🤖', title: 'AI-Powered Job Matching', desc: 'Our AI matches candidates to opportunities based on skills and culture fit.' },
      { icon: '📚', title: 'Technical Training', desc: 'Industry-aligned training in Full Stack, DevOps, Data Science, Cloud, and Cybersecurity.' },
      { icon: '🎤', title: 'Interview Preparation', desc: 'Mock interviews with industry professionals and resume building.' },
      { icon: '💼', title: 'Enterprise Staffing', desc: 'Contract, contract-to-hire, and permanent staffing for IT roles.' },
      { icon: '💳', title: 'Payroll Management', desc: 'Complete payroll lifecycle management for contract staff.' },
    ],
    process: [
      { step: '01', title: 'Skills Assessment', desc: 'Comprehensive evaluation of technical and soft skills.' },
      { step: '02', title: 'Training & Upskilling', desc: 'Targeted training covering technical skills and interview preparation.' },
      { step: '03', title: 'Profile Building', desc: 'Resume optimization, LinkedIn enhancement, and personal branding.' },
      { step: '04', title: 'Job Matching', desc: 'AI-powered matching with opportunities from our 200+ partner network.' },
      { step: '05', title: 'Placement & Support', desc: 'Interview scheduling, offer negotiation, and post-placement support.' },
    ],
    caseStudy: {
      client: 'IT Graduate Batch 2024',
      challenge: 'A batch of 50 IT graduates with good theoretical knowledge but lacking industry-ready skills.',
      solution: 'We provided a 3-month intensive program covering full-stack development, mock interviews, and direct company referrals.',
      result: '100% placement rate with average package of 6.5 LPA and placements in top IT companies.',
      duration: 'Placeholder - to be updated by Rasta Infotech',
    },
    faqs: [
      { q: 'What does 100% placement assurance mean?', a: 'Every student receives dedicated support and referrals to our partner network until placed.' },
      { q: 'What companies do you place students in?', a: 'Infosys, TCS, Wipro, Cognizant, HCL, Capgemini, and 200+ more companies.' },
      { q: 'What training tracks do you offer?', a: 'Full Stack, DevOps, Data Science, Cloud, Cybersecurity, and SAP.' },
      { q: 'Do you offer enterprise staffing services?', a: 'Yes, contract hiring, permanent recruitment, and payroll management.' },
      { q: 'What post-placement support do you provide?', a: 'Career mentorship, upskilling, and growth tracking for 1 year post-placement.' },
    ],
    relatedServices: ['ai', 'application', 'devops'],
  },
}

const allServicesData = { ...servicesData, ...sapServicesData }

const relatedServiceNames: Record<string, string> = {
  'sap-consulting': 'SAP Consulting Services',
  'sap-implementation': 'SAP Implementation & Development',
  'sap-managed': 'SAP Managed Services',
  'sap-enterprise': 'SAP Enterprise Digital Transformation',
  'sap-data-migration': 'SAP Data Migration & Upgrade',
  'sap-staffing': 'SAP Staffing Services',
  'sap-ewm': 'SAP EWM',
  'sap-tm': 'SAP TM',
  'sap-yl': 'SAP YL',
  'sap-ibp': 'SAP IBP',
  'sap-spp-espp': 'SAP SPP & eSPP',
  'sap-business-data-cloud': 'SAP Business Data Cloud',
  'sap-analytics-cloud': 'SAP Analytics Cloud',
  'sap-datasphere': 'SAP Datasphere',
  'sap-s4hana': 'SAP S/4HANA',
  'sap-business-suite': 'SAP Business Suite',
  'rise-with-sap': 'RISE with SAP',
  'grow-with-sap': 'GROW with SAP',
  'sap-signavio': 'SAP Signavio',
  'sap-leanix': 'SAP LeanIX',
  'sap-activate': 'SAP Activate',
  'sap-btp': 'SAP BTP',
  'sap-green-token': 'SAP Green Token',
  'sap-sct': 'SAP SCT',
  'sap-sdx': 'SAP SDX',
  sap: 'SAP Consulting',
  application: 'Application Services',
  blockchain: 'Blockchain',
  lms: 'Learning Management System',
  cognitive: 'Cognitive Services',
  cybersecurity: 'Cyber Security',
  devops: 'DevOps Automation',
  ai: 'AI Services',
  'digital-marketing': 'Digital Marketing',
  'enterprise-automation': 'Enterprise Automation',
  grc: 'Governance, Risk & Compliance',
  infrastructure: 'Infrastructure Services',
  'microsoft-coe': 'Microsoft Center of Excellence (COE)',
  'agile-it': 'Agile IT Operations',
  'product-engineering': 'Product Engineering Services',
  xaap: 'Platforms & Protocols – XAAP',
  salesforce: 'Salesforce Consulting and Services COE',
  cloud: 'Cloud Services',
  aws: 'AWS Cloud Services',
  azure: 'Microsoft Azure Cloud Services',
  vmware: 'VMware Tanzu Services',
  recruitment: 'Recruitment & Staffing',
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

export default function ServiceDetail({ id }: { id: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const service = allServicesData[id]

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 pt-32">
        <div className="text-6xl mb-4">🔍</div>
        <h1 className="text-white font-black text-3xl mb-4">Service Not Found</h1>
        <p className="text-[#8892A4] mb-8">The service you are looking for does not exist.</p>
        <Link href="/services" className="px-6 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-[#0066FF] to-[#00C896]">
          View All Services
        </Link>
      </div>
    )
  }

  return (
    <section className="relative bg-[#0A1628] overflow-hidden">

      {/* Hero */}
      <div className="relative pt-32 pb-0 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={service.image} alt={service.title} className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A1628]/70 to-[#0A1628]" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="flex items-center gap-2 mb-6 text-sm flex-wrap">
            <Link href="/" className="text-[#8892A4] hover:text-white transition-colors">Home</Link>
            <span className="text-[#8892A4]">/</span>
            <Link href="/services" className="text-[#8892A4] hover:text-white transition-colors">Services</Link>
            <span className="text-[#8892A4]">/</span>
            <span className="text-white">{service.title}</span>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#0066FF]/30 bg-[#0066FF]/10 mb-6">
            <span className="text-2xl">{service.icon}</span>
            <span className="text-[#0066FF] text-sm font-semibold">{service.tags[0]}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4 max-w-3xl">
            {service.title}
          </h1>
          <p className={`text-lg font-semibold bg-gradient-to-r ${service.color} bg-clip-text text-transparent mb-4`}>
            {service.tagline}
          </p>
          <p className="text-[#8892A4] text-lg max-w-2xl leading-relaxed">
            {service.longDesc}
          </p>
        </div>
      </div>

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">

          {/* Main Content */}
          <div className="xl:col-span-2 space-y-12">

            {/* Tags */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="flex flex-wrap gap-2"
            >
              {service.tags.map((tag) => (
                <span key={tag} className={`px-4 py-2 rounded-full text-sm font-semibold text-white bg-gradient-to-r ${service.color}`}>
                  {tag}
                </span>
              ))}
            </motion.div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h2 className="text-2xl lg:text-3xl font-black text-white mb-8">
                What We{' '}
                <span className={`bg-gradient-to-r ${service.color} bg-clip-text text-transparent`}>Offer</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {service.features.map((feature, i) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2 + i * 0.08 }}
                    className="p-5 rounded-2xl border border-white/10 bg-white/5 hover:border-[#0066FF]/30 transition-all duration-300 group"
                  >
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center text-xl mb-3 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {feature.icon}
                    </div>
                    <h3 className="text-white font-bold text-base mb-2">{feature.title}</h3>
                    <p className="text-[#8892A4] text-sm leading-relaxed">{feature.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Why Choose Us */}
            {service.whyChoose && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="p-8 rounded-3xl border border-white/10 bg-white/5"
              >
                <h2 className="text-2xl lg:text-3xl font-black text-white mb-4">
                  Why Choose{' '}
                  <span className={`bg-gradient-to-r ${service.color} bg-clip-text text-transparent`}>Rasta InfoTech?</span>
                </h2>
                <p className="text-[#8892A4] text-base leading-relaxed">{service.whyChoose}</p>
              </motion.div>
            )}

            {/* Technologies */}
            {service.technologies && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.28 }}
                className="p-8 rounded-3xl border border-white/10 bg-white/5"
              >
                <h2 className="text-2xl lg:text-3xl font-black text-white mb-4">
                  Technologies &{' '}
                  <span className={`bg-gradient-to-r ${service.color} bg-clip-text text-transparent`}>Frameworks</span>
                </h2>
                <p className="text-[#8892A4] text-base leading-relaxed">{service.technologies}</p>
              </motion.div>
            )}

            {/* Process */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h2 className="text-2xl lg:text-3xl font-black text-white mb-8">
                Our{' '}
                <span className={`bg-gradient-to-r ${service.color} bg-clip-text text-transparent`}>Process</span>
              </h2>
              <div className="space-y-4">
                {service.process.map((step, i) => (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.4 + i * 0.08 }}
                    className="flex gap-5 p-5 rounded-2xl border border-white/10 bg-white/5 hover:border-[#0066FF]/30 transition-all duration-300"
                  >
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center text-white font-black text-lg shrink-0 shadow-lg`}>
                      {step.step}
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-base mb-1">{step.title}</h3>
                      <p className="text-[#8892A4] text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Case Study */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="relative p-8 rounded-3xl overflow-hidden border border-[#00C896]/20"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#00C896]/10 to-[#0066FF]/10" />
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-6">
                  <span className="w-2 h-2 rounded-full bg-[#00C896]" />
                  <span className="text-[#00C896] text-xs font-bold uppercase tracking-widest">Case Study</span>
                </div>
                <h2 className="text-white font-black text-2xl mb-6">{service.caseStudy.client}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div>
                    <p className="text-[#0066FF] text-xs font-bold uppercase tracking-wide mb-2">Challenge</p>
                    <p className="text-[#8892A4] text-sm leading-relaxed">{service.caseStudy.challenge}</p>
                  </div>
                  <div>
                    <p className="text-[#00C896] text-xs font-bold uppercase tracking-wide mb-2">Solution</p>
                    <p className="text-[#8892A4] text-sm leading-relaxed">{service.caseStudy.solution}</p>
                  </div>
                  <div>
                    <p className="text-yellow-400 text-xs font-bold uppercase tracking-wide mb-2">Result</p>
                    <p className="text-white text-sm font-bold leading-relaxed">{service.caseStudy.result}</p>
                    <p className="text-[#0066FF] text-xs mt-2">{service.caseStudy.duration}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* FAQs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <h2 className="text-2xl lg:text-3xl font-black text-white mb-8">
                Frequently Asked{' '}
                <span className={`bg-gradient-to-r ${service.color} bg-clip-text text-transparent`}>Questions</span>
              </h2>
              <FAQAccordion faqs={service.faqs} />
            </motion.div>

            {/* Related Services */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h2 className="text-2xl font-black text-white mb-6">Related Services</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {service.relatedServices.map((relId) => (
                  <Link
                    key={relId}
                    href={'/services/' + relId}
                    className="group p-4 rounded-xl border border-white/10 bg-white/5 hover:border-[#0066FF]/40 hover:bg-[#0066FF]/5 transition-all duration-300 flex items-center gap-3"
                  >
                    <span className="text-2xl">{allServicesData[relId]?.icon}</span>
                    <span className="text-[#8892A4] group-hover:text-white text-sm font-medium transition-colors duration-300">
                      {relatedServiceNames[relId]}
                    </span>
                    <svg className="w-4 h-4 text-[#0066FF] ml-auto group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

              {/* CTA Card */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="p-6 rounded-2xl border border-[#0066FF]/30 bg-gradient-to-br from-[#0066FF]/10 to-[#00C896]/10"
              >
                <h3 className="text-white font-black text-xl mb-2">Get Started Today</h3>
                <p className="text-[#8892A4] text-sm mb-5">Talk to our experts and get a free consultation.</p>
                <div className="space-y-3">
                  <a
                    href={'mailto:info@rastainfotech.com?subject=Enquiry about ' + service.title}
                    className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r ${service.color} hover:shadow-lg transition-all duration-300`}
                  >
                    Get Free Consultation
                  </a>
                  <a
                    href="tel:+919742507066"
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-bold text-white border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all duration-300"
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
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    WhatsApp Us
                  </a>
                </div>
              </motion.div>

              {/* SAP Services List — only on SAP pages */}
              {(id.startsWith('sap') || id === 'rise-with-sap' || id === 'grow-with-sap') && <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="p-6 rounded-2xl border border-white/10 bg-white/5"
              >
                {/* Our Services inside SAP */}
                <h3 className="text-white font-black text-sm mb-2 uppercase tracking-widest">Our SAP Services</h3>
                <div className="space-y-1 mb-5">
                  {(['sap', 'sap-consulting', 'sap-implementation', 'sap-managed', 'sap-enterprise', 'sap-data-migration', 'sap-staffing'] as string[]).map((sid) => (
                    <Link
                      key={sid}
                      href={'/services/' + sid}
                      className={`flex items-center gap-2 p-2 rounded-lg text-xs transition-all duration-200 ${
                        sid === id
                          ? 'text-white bg-[#0066FF]/20 border border-[#0066FF]/30'
                          : 'text-[#8892A4] hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <span>{allServicesData[sid]?.icon}</span>
                      {relatedServiceNames[sid]}
                      {sid === id && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#0066FF]" />}
                    </Link>
                  ))}
                </div>

                {/* SAP Solutions */}
                <h3 className="text-white font-black text-sm mb-2 uppercase tracking-widest border-t border-white/10 pt-4">SAP Solutions</h3>
                <div className="space-y-1 max-h-64 overflow-y-auto">
                  {(['sap-ewm', 'sap-tm', 'sap-yl', 'sap-ibp', 'sap-spp-espp', 'sap-business-data-cloud', 'sap-analytics-cloud', 'sap-datasphere', 'sap-s4hana', 'sap-business-suite', 'rise-with-sap', 'grow-with-sap', 'sap-signavio', 'sap-leanix', 'sap-activate', 'sap-btp', 'sap-green-token', 'sap-sct', 'sap-sdx'] as string[]).map((sid) => (
                    <Link
                      key={sid}
                      href={'/services/' + sid}
                      className={`flex items-center gap-2 p-2 rounded-lg text-xs transition-all duration-200 ${
                        sid === id
                          ? 'text-white bg-[#0066FF]/20 border border-[#0066FF]/30'
                          : 'text-[#8892A4] hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <span>{allServicesData[sid]?.icon}</span>
                      {relatedServiceNames[sid]}
                      {sid === id && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#0066FF]" />}
                    </Link>
                  ))}
                </div>
              </motion.div>}

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}