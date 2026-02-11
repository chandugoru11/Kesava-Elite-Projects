
import { NavItem, CourseCategory, LMSResource } from './types.ts';
import { ASSETS } from './assets.ts';

export const COMPANY_INFO = {
  name: "KESHAVA ELITE PROJECTS PVT.LTD",
  brandName: "KESHAVA ELITE PROJECTS",
  logo: ASSETS.LOGOS.PRIMARY,
  cin: "U62099AP2023PTC110407",
  tagline: "Empowering Future Innovators Through Robotics & STEM Excellence",
  email: "info@keshavaeliteprojects.com",
  phone: "+91 7659867411",
  address: "Andhra Pradesh, India",
  mission: "To deliver accessible, industry-aligned, and project-based technology education through modern labs, expert mentorship, and innovation-driven learning.",
  vision: "To create India’s most impactful Robotics & STEM innovation ecosystem — empowering every student to become a creator of technology, not just a consumer.",
  philosophy: [
    "Learning by Building",
    "Innovation over Memorization",
    "Projects over Theory",
    "Industry over Outdated Curriculum",
    "Access for Every Student"
  ],
  trainingFeatures: [
    "Hands-on Projects",
    "Industry Case Studies",
    "Certification",
    "Internship Support",
    "Placement Assistance",
    "Startup Mentorship"
  ]
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
      { label: 'SaaS Products', path: '/services#saas' },
      { label: 'STEM & AI Robotics (K1-K12)', path: '/services#k12' }
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
        description: "Master modern web ecosystems from React UI to Spring Microservices.",
        duration: "6 Months",
        features: ["React 19", "Spring Boot", "Docker", "AWS"],
        modules: ["Frontend Architecture", "Backend Engineering", "DevOps basics", "API Security", "Database Scaling"],
        fullPrice: 24999, registrationFee: 2999
      },
      {
        id: "data-science",
        title: "Data Science",
        description: "Industrial data intelligence using predictive modeling.",
        duration: "6 Months",
        features: ["Python", "Pandas", "Scikit-Learn"],
        modules: ["Data Wrangling", "Statistical Analysis", "ML Models", "Data Visualization", "Big Data Processing"],
        fullPrice: 29999, registrationFee: 3999
      },
      {
        id: "ai",
        title: "Artificial Intelligence",
        description: "Frontier of computing: Neural nets and NLP.",
        duration: "5 Months",
        features: ["TensorFlow", "NLP", "Neural Nets"],
        modules: ["Deep Learning", "Generative AI", "Computer Vision", "Reinforcement Learning", "AI Ethics"],
        fullPrice: 34999, registrationFee: 4999
      },
      {
        id: "ml",
        title: "Machine Learning",
        description: "Building software that learns from industrial patterns.",
        duration: "4 Months",
        features: ["Supervised Learning", "Regression", "Clustering"],
        modules: ["Algorithmic Design", "Pattern Recognition", "Model Optimization", "Feature Engineering", "Neural Architecture"],
        fullPrice: 27999, registrationFee: 3999
      },
      {
        id: "cybersecurity",
        title: "Cybersecurity",
        description: "Protecting Industry 4.0 perimeters and data assets.",
        duration: "4 Months",
        features: ["Kali Linux", "Ethical Hacking", "SOC"],
        modules: ["Network Security", "Pen-Testing", "Incident Response", "Cloud Security", "Cryptography"],
        fullPrice: 32999, registrationFee: 4599
      },
      {
        id: "cloud",
        title: "Cloud Computing",
        description: "Scalable infrastructure management for enterprise tech.",
        duration: "4 Months",
        features: ["AWS", "Azure", "Serverless"],
        modules: ["Cloud Architecture", "Containerization", "Scaling Strategies", "Infrastructure as Code", "VPC & Networking"],
        fullPrice: 26999, registrationFee: 3499
      },
      {
        id: "quantum-ai",
        title: "Quantum AI Computing",
        description: "Next-gen computing paradigms combining Quantum theory and AI.",
        duration: "6 Months",
        features: ["Qubits", "Quantum Gates", "AI Hybrid"],
        modules: ["Quantum Circuits", "Hybrid Algorithms", "Quantum ML", "Physics of Computing", "Cryptography"],
        fullPrice: 45999, registrationFee: 6999
      },
      {
        id: "sw-testing",
        title: "Software Testing",
        description: "Comprehensive QA and Automation engineering.",
        duration: "3 Months",
        features: ["Selenium", "JMeter", "Unit Testing"],
        modules: ["Manual Testing", "Automation Frameworks", "Load Testing", "Security Testing", "CI/CD Integration"],
        fullPrice: 15999, registrationFee: 1999
      },
      {
        id: "python-dev",
        title: "Python Developer",
        description: "Complete backend mastery using Python and Django.",
        duration: "4 Months",
        features: ["Django", "FastAPI", "Automation"],
        modules: ["Advanced Python", "Asynchronous Programming", "Database Integration", "Scripting", "Web Frameworks"],
        fullPrice: 18999, registrationFee: 2499
      },
      {
        id: "data-analyst",
        title: "Data Analyst",
        description: "Interpreting complex data to drive business decisions.",
        duration: "4 Months",
        features: ["Excel", "SQL", "Tableau"],
        modules: ["Data Cleaning", "Statistical Modeling", "Business Intelligence", "Query Optimization", "Reporting"],
        fullPrice: 19999, registrationFee: 2499
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
        description: "Strategies for scaling startups and technical entities.",
        duration: "3 Months",
        features: ["Marketing", "Sales", "Strategy"],
        modules: ["Customer Acquisition", "Growth Hacking", "Operational Scaling", "Venture Capital", "Branding"],
        fullPrice: 19999, registrationFee: 2499
      },
      {
        id: "stock-market",
        title: "Stock Market & Investment Training",
        description: "Technical analysis and capital market protocols.",
        duration: "2 Months",
        features: ["Technical Analysis", "Options", "Forex"],
        modules: ["Price Action", "Derivative Strategies", "Risk Management", "Portfolio Balancing", "Market Psychology"],
        fullPrice: 12999, registrationFee: 1499
      }
    ]
  },
  {
    title: "Core Engineering",
    icon: "cpu",
    courses: [
      {
        id: "ai-robotics",
        title: "AI Robotics",
        description: "Combining Artificial Intelligence with mechanical robotics.",
        duration: "6 Months",
        features: ["Computer Vision", "ROS", "Kinematics"],
        modules: ["Sensing", "Actuation", "Robot Vision", "Navigation", "Path Planning"],
        fullPrice: 38999, registrationFee: 5999
      },
      {
        id: "iot",
        title: "Internet of Things (IoT)",
        description: "Master the ecosystem of connected industrial devices.",
        duration: "4 Months",
        features: ["MQTT", "Sensors", "Arduino"],
        modules: ["Sensor Interfacing", "Networking", "Cloud IoT", "Embedded C", "Security"],
        fullPrice: 24999, registrationFee: 3499
      },
      {
        id: "iort",
        title: "IoRT (Internet of Robotics Things)",
        description: "The intersection of IoT and Robotics for advanced automation.",
        duration: "5 Months",
        features: ["Swarm Intel", "Edge Computing", "IoRT Arch"],
        modules: ["Cloud Robotics", "Real-time Processing", "Communication Protocols", "Distributed Control", "Edge AI"],
        fullPrice: 36999, registrationFee: 5499
      },
      {
        id: "embedded",
        title: "Embedded Systems",
        description: "Firmware and Hardware-level engineering masters.",
        duration: "4 Months",
        features: ["ARM Cortex", "RTOS", "C++"],
        modules: ["Microcontroller Pro", "Device Drivers", "Kernel Programming", "IoT Protocols", "PCB Design"],
        fullPrice: 24999, registrationFee: 3499
      },
      {
        id: "drone-robotics",
        title: "Drone & Aerial Robotics",
        description: "UAV Design, flight dynamics, and autonomous missions.",
        duration: "4 Months",
        features: ["PX4", "ArduPilot", "ROS"],
        modules: ["Flight Control", "Telemetry Systems", "Drone Assembly", "Payload Integration", "Aerial Imaging"],
        fullPrice: 32999, registrationFee: 4999
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
