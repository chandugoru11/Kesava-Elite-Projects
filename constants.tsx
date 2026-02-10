
import { NavItem, CourseCategory, LMSResource } from './types.ts';
import { ASSETS } from './assets.ts';

export const COMPANY_INFO = {
  name: "KESHAVA ELITE PROJECTS PVT.LTD",
  brandName: "KESHAVA ELITE PROJECTS",
  logo: ASSETS.LOGOS.PRIMARY,
  cin: "U62099AP2023PTC110407",
  tagline: "ROBOTICS & TECHNOLOGY",
  email: "info@keshavaeliteprojects.in",
  phone: "+91 7659867411",
  address: "Andhra Pradesh, India",
  mission: "To create India’s most impactful Robotics & STEM innovation ecosystem — empowering every student to become a creator of technology.",
  vision: "Building the foundation of technology education in India through industrial-grade excellence and accessible innovation.",
};

export const NAVIGATION_LINKS: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  { 
    label: 'Services', 
    path: '/services',
    children: [
      { label: 'STEM Labs', path: '/services#stem-labs' },
      { label: 'CoE Hubs', path: '/services#coe' },
      { label: 'SaaS Products', path: '/services#saas' }
    ]
  },
  { label: 'For Schools', path: '/for-schools' },
  { label: 'Courses', path: '/courses' },
  { label: 'Impact', path: '/impact' },
  { label: 'Contact', path: '/contact' },
];

export const COURSE_DATA: CourseCategory[] = [
  {
    title: "Information Technology",
    icon: "terminal",
    courses: [
      {
        id: "full-stack",
        title: "Full-Stack Development",
        description: "End-to-end web architecture training. Master modern frontend and robust backend ecosystems.",
        duration: "6 Months",
        features: ["React 19", "Spring Boot", "Docker", "AWS", "CI/CD"],
        modules: ["Responsive UI with Tailwind", "State Management (Redux/Context)", "Microservices Architecture", "Cloud Deployment", "Database Performance Tuning"],
        outcomes: ["Senior Web Developer", "Full Stack Engineer"],
        fullPrice: 24999,
        registrationFee: 2999
      },
      {
        id: "data-science",
        title: "Data Science",
        description: "Transform raw data into strategic intelligence using statistical modeling and predictive analysis.",
        duration: "6 Months",
        features: ["Python Pro", "Pandas", "Matplotlib", "Statistics", "Deep Learning"],
        modules: ["Statistical Inference", "Data Wrangling", "Exploratory Data Analysis", "Big Data Handling", "Model Deployment"],
        outcomes: ["Data Scientist", "Insight Analyst"],
        fullPrice: 29999,
        registrationFee: 3999
      },
      {
        id: "ai",
        title: "Artificial Intelligence",
        description: "Study the frontier of computing. Neural networks, NLP, and intelligent agent design.",
        duration: "5 Months",
        features: ["TensorFlow", "PyTorch", "NLP", "Neural Nets"],
        modules: ["Supervised Learning", "Deep Neural Networks", "Natural Language Processing", "Reinforcement Learning", "Computer Vision Basics"],
        outcomes: ["AI Researcher", "Machine Learning Engineer"],
        fullPrice: 34999,
        registrationFee: 4999
      },
      {
        id: "ml",
        title: "Machine Learning",
        description: "Implementing algorithms that enable software to automatically learn from and predict patterns.",
        duration: "4 Months",
        features: ["Scikit-Learn", "Regression", "Clustering", "XGBoost"],
        modules: ["Linear Regression", "Decision Trees", "SVM & Kernels", "Ensemble Methods", "Model Evaluation"],
        outcomes: ["ML Engineer", "Data Analyst"],
        fullPrice: 27999,
        registrationFee: 3999
      },
      {
        id: "power-bi",
        title: "Power BI",
        description: "Master business intelligence visualization to drive corporate decision-making processes.",
        duration: "2 Months",
        features: ["DAX", "Data Modeling", "Dashboarding"],
        modules: ["Data Connectivity", "Advanced DAX Formulas", "Visual Storytelling", "Power BI Service Admin", "Integration with Excel"],
        outcomes: ["BI Developer", "Business Analyst"],
        fullPrice: 14999,
        registrationFee: 1999
      },
      {
        id: "app-dev",
        title: "App Development",
        description: "Build high-performance native and cross-platform mobile applications.",
        duration: "4 Months",
        features: ["Flutter", "React Native", "Firebase"],
        modules: ["UI/UX Mobile Patterns", "Native API Integration", "State Management", "App Store Optimization", "Backend Integration"],
        outcomes: ["Mobile App Developer"],
        fullPrice: 22999,
        registrationFee: 2999
      },
      {
        id: "cybersecurity",
        title: "Cybersecurity",
        description: "Protect digital assets and master the art of ethical hacking and perimeter defense.",
        duration: "4 Months",
        features: ["Kali Linux", "Pen-Testing", "Network Security"],
        modules: ["Footprinting & Reconnaissance", "Network Vulnerabilities", "Web Application Attacks", "Cryptography", "SOC Operations"],
        outcomes: ["Security Analyst", "Ethical Hacker"],
        fullPrice: 32999,
        registrationFee: 4599
      },
      {
        id: "cloud-computing",
        title: "Cloud Computing",
        description: "Architect and manage scalable infrastructure on the world's leading cloud platforms.",
        duration: "4 Months",
        features: ["AWS", "Azure", "Serverless"],
        modules: ["Cloud Infrastructure Setup", "Storage & Database Services", "Identity & Access Management", "Cloud Cost Optimization", "Hybrid Cloud Design"],
        outcomes: ["Cloud Architect", "DevOps Engineer"],
        fullPrice: 26999,
        registrationFee: 3499
      },
      {
        id: "quantum-ai",
        title: "Quantum AI Computing",
        description: "The next evolution of AI. Fusion of quantum mechanics and neural architectures.",
        duration: "6 Months",
        features: ["Qiskit", "Quantum Circuits", "Hybrid Models"],
        modules: ["Quantum Mechanics Basics", "Qubit Manipulation", "Quantum Algorithms", "Hybrid Quantum-Classical AI", "Future Tech Roadmap"],
        outcomes: ["Quantum Researcher", "Advanced AI Specialist"],
        fullPrice: 45999,
        registrationFee: 7999
      },
      {
        id: "software-testing",
        title: "Software Testing",
        description: "Ensuring elite standards in software quality through manual and automated testing.",
        duration: "3 Months",
        features: ["Selenium", "JUnit", "Performance Testing"],
        modules: ["Test Planning", "Automation Scripting", "API Testing (Postman)", "Load & Stress Testing", "Bug Lifecycle Management"],
        outcomes: ["QA Engineer", "Automation Tester"],
        fullPrice: 15999,
        registrationFee: 1999
      },
      {
        id: "python-dev",
        title: "Python Developer",
        description: "Master the most versatile language for automation, web development, and scripting.",
        duration: "3 Months",
        features: ["Django", "Flask", "Automation Scripts"],
        modules: ["Core Python Syntax", "Advanced OOP in Python", "Web Frameworks", "Scripting for Automation", "Third-party Integrations"],
        outcomes: ["Python Developer", "Backend Engineer"],
        fullPrice: 16999,
        registrationFee: 1999
      },
      {
        id: "data-analyst",
        title: "Data Analyst",
        description: "Bridge the gap between business questions and data-driven answers.",
        duration: "4 Months",
        features: ["SQL Pro", "Excel Advanced", "Tableau"],
        modules: ["SQL Queries & Joins", "Excel Modeling", "Data Presentation", "Business Reporting", "Cleaning Large Datasets"],
        outcomes: ["Data Analyst", "Operations Manager"],
        fullPrice: 19999,
        registrationFee: 2499
      }
    ]
  },
  {
    title: "Business & Management",
    icon: "briefcase",
    courses: [
      {
        id: "business-growth",
        title: "Business Growth Specialist",
        description: "Learn to scale technical organizations and SaaS products using modern growth hacking.",
        duration: "3 Months",
        features: ["Strategy", "Growth Hacking", "Sales Ops"],
        modules: ["Market Entry Strategy", "Sales Funnel Optimization", "Customer Acquisition Cost", "Branding for Tech", "Operational Scaling"],
        outcomes: ["Growth Manager", "Strategic Consultant"],
        fullPrice: 18999,
        registrationFee: 2499
      },
      {
        id: "stock-market",
        title: "Stock Market & Investment Training",
        description: "Financial literacy and advanced technical analysis for global capital markets.",
        duration: "2 Months",
        features: ["Technical Analysis", "Derivatives", "Risk Management"],
        modules: ["Introduction to Equity", "Candlestick Patterns", "Options Strategies", "Portfolio Management", "Psychology of Trading"],
        outcomes: ["Financial Advisor", "Technical Trader"],
        fullPrice: 12999,
        registrationFee: 1499
      }
    ]
  },
  {
    title: "Core Courses",
    icon: "cpu",
    courses: [
      {
        id: "ai-robotics",
        title: "AI Robotics",
        description: "Designing intelligent machines that can sense and act within complex physical environments.",
        duration: "6 Months",
        features: ["ROS2", "Computer Vision", "Control Systems"],
        modules: ["Robotic Kinematics", "Sensor Fusion", "Path Planning", "Mobile Robotics", "Industrial Robot Arms"],
        outcomes: ["Robotics Engineer", "Control Systems Architect"],
        fullPrice: 38999,
        registrationFee: 5999
      },
      {
        id: "iot",
        title: "Internet of Things (IoT)",
        description: "Building the connected world through smart sensors, actuators, and cloud connectivity.",
        duration: "4 Months",
        features: ["ESP32", "MQTT", "Node-RED"],
        modules: ["Microcontroller Prototyping", "Wireless Protocols", "Cloud Monitoring", "IoT Security", "Edge Computing"],
        outcomes: ["IoT Developer", "Hardware Architect"],
        fullPrice: 19999,
        registrationFee: 2499
      },
      {
        id: "iort",
        title: "IoRT (Internet of Robotics Things)",
        description: "The synthesis of IoT and Robotics. Distributed intelligence in robotic systems.",
        duration: "5 Months",
        features: ["Swarm Intelligence", "Cloud Robotics", "Real-time Telemetry"],
        modules: ["Distributed Robotic Control", "Multi-Agent Systems", "Networked Robots", "Remote Teleoperation", "Collaborative Robots (Cobots)"],
        outcomes: ["IoRT Specialist", "Automation Engineer"],
        fullPrice: 28999,
        registrationFee: 4599
      },
      {
        id: "embedded-systems",
        title: "Embedded Systems",
        description: "Designing the brains of modern electronic devices using hardware-level programming.",
        duration: "4 Months",
        features: ["C/C++", "RTOS", "Device Drivers"],
        modules: ["Architecture Basics", "Memory Management", "Peripheral Interfacing (I2C/SPI)", "RTOS Kernels", "Low-power Design"],
        outcomes: ["Embedded Developer", "Firmware Engineer"],
        fullPrice: 21999,
        registrationFee: 2999
      },
      {
        id: "drone-robotics",
        title: "Drone & Aerial Robotics",
        description: "Aero-dynamic principles and autonomous flight mission design for industrial UAVs.",
        duration: "3 Months",
        features: ["ArduPilot", "Mission Planner", "UAV Build"],
        modules: ["Flight Dynamics", "UAV Assembly & Calibrations", "Autonomous Waypoint Missions", "Aerial Photogrammetry", "Regulations & Safety"],
        outcomes: ["UAV Pilot", "Aerial Systems Engineer"],
        fullPrice: 31999,
        registrationFee: 4999
      }
    ]
  }
];

export const MOCK_RESOURCES: LMSResource[] = [
  {
    id: '1',
    title: 'Intro to Full Stack Architecture',
    type: 'video',
    url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: ASSETS.GALLERY.PLACEHOLDER_BASE + "it/400/225",
    category: 'Information Technology',
    date: '2023-10-15'
  }
];
