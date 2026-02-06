
import { NavItem, CourseCategory, LMSResource } from './types';
import { ASSETS } from './assets';

export const API_BASE_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:9090' 
  : 'https://keshava-elite-api.onrender.com'; // Optimized for common hosting

export const NAVIGATION_LINKS: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  { 
    label: 'Services', 
    path: '/services',
    children: [
      { label: 'STEM Labs', path: '/services#stem-labs' },
      { label: 'CoE Hubs', path: '/services#coe' },
      { label: 'K-12 Robotics', path: '/services#k12' }
    ]
  },
  { label: 'For Schools', path: '/for-schools' },
  { label: 'Courses', path: '/courses' },
  { label: 'Impact', path: '/impact' },
  { label: 'Contact', path: '/contact' },
];

export const COMPANY_INFO = {
  name: "KESHAVA ELITE PROJECTS PVT.LTD",
  brandName: "KESHAVA ELITE PROJECTS",
  logo: ASSETS.LOGOS.PRIMARY,
  cin: "U62099AP2023PTC110407",
  tagline: "ROBOTICS & TECHNOLOGY",
  email: "info@keshavaeliteprojects.in",
  phone: "+91 7659867411",
  address: "Andhra Pradesh, India",
};

export const COURSE_DATA: CourseCategory[] = [
  {
    title: "Information Technology",
    icon: "terminal",
    courses: [
      {
        id: "full-stack",
        title: "Full Stack Development",
        description: "Master modern front-end (React) and robust back-end (Spring Boot) ecosystems. Learn to build scalable enterprise applications.",
        duration: "6 Months",
        features: ["React & Next.js", "Spring Boot", "Cloud Deployment"],
        modules: ["Web Architecture", "Frontend (React/TS)", "Backend (Spring/SQL)", "DevOps & AWS"],
        outcomes: ["Full Stack Engineer", "Senior Web Developer", "Tech Lead"],
        fullPrice: 24999,
        registrationFee: 2999
      },
      {
        id: "data-science",
        title: "Data Science",
        description: "Comprehensive data analysis using Python, R, and statistical modeling for enterprise decision making.",
        duration: "6 Months",
        features: ["Pandas & NumPy", "Statistics", "Predictive Analytics"],
        modules: ["Data Wrangling", "Statistical Analysis", "Data Visualization", "Big Data Basics"],
        outcomes: ["Data Scientist", "Business Analyst", "Data Engineer"],
        fullPrice: 28999,
        registrationFee: 3499
      },
      {
        id: "ai-ml",
        title: "Artificial Intelligence & ML",
        description: "Build intelligent systems and neural networks. Deep dive into computer vision and natural language processing.",
        duration: "6 Months",
        features: ["TensorFlow", "Deep Learning", "Neural Networks"],
        modules: ["ML Algorithms", "Neural Architecture", "NLP", "Computer Vision"],
        outcomes: ["AI Researcher", "ML Specialist", "Automation Engineer"],
        fullPrice: 34999,
        registrationFee: 4999
      },
      {
        id: "cyber-security",
        title: "Cybersecurity",
        description: "Comprehensive penetration testing, network security, and digital forensics training following industry security standards.",
        duration: "5 Months",
        features: ["Kali Linux", "Network Security", "Pen-Testing"],
        modules: ["Intro to InfoSec", "Network Security", "Web App Hacking", "Digital Forensics"],
        outcomes: ["Security Analyst", "Penetration Tester", "SOC Analyst"],
        fullPrice: 32000,
        registrationFee: 4999
      },
      {
        id: "cloud-computing",
        title: "Cloud Computing",
        description: "Master AWS, Azure, and Google Cloud infrastructure and serverless architecture.",
        duration: "4 Months",
        features: ["AWS/Azure/GCP", "Kubernetes", "Serverless"],
        modules: ["Cloud Infrastructure", "Virtualization", "Containerization", "Cloud Security"],
        outcomes: ["Cloud Architect", "DevOps Engineer", "SysAdmin"],
        fullPrice: 25999,
        registrationFee: 2499
      },
      {
        id: "power-bi",
        title: "Power BI & Data Viz",
        description: "Transform raw data into impactful visual stories and interactive business dashboards.",
        duration: "2 Months",
        features: ["DAX Queries", "Dashboard Design", "Data Modeling"],
        modules: ["Data Connectivity", "Viz Principles", "DAX Mastery", "Report Publishing"],
        outcomes: ["BI Developer", "Reporting Analyst", "Data Storyteller"],
        fullPrice: 12999,
        registrationFee: 1499
      },
      {
        id: "app-development",
        title: "Mobile App Development",
        description: "Build high-performance native and cross-platform mobile apps for iOS and Android.",
        duration: "5 Months",
        features: ["React Native", "Flutter", "App Store Publishing"],
        modules: ["Mobile UI/UX", "Native Modules", "State Management", "API Integration"],
        outcomes: ["Mobile App Developer", "UI/UX Designer", "Product Engineer"],
        fullPrice: 22999,
        registrationFee: 2999
      },
      {
        id: "quantum-ai",
        title: "Quantum AI Computing",
        description: "An advanced look into the future of computation combining Quantum mechanics with AI.",
        duration: "6 Months",
        features: ["Qiskit", "Quantum Algorithms", "Future Tech"],
        modules: ["Quantum Mechanics", "Q-Bits", "Quantum ML", "Error Correction"],
        outcomes: ["Quantum Developer", "Advanced Researcher", "Algorithm Specialist"],
        fullPrice: 45000,
        registrationFee: 9999
      },
      {
        id: "software-testing",
        title: "Software Testing",
        description: "Master manual and automated testing frameworks to ensure software excellence.",
        duration: "3 Months",
        features: ["Selenium", "JMeter", "Unit Testing"],
        modules: ["STLC", "Automation Frameworks", "Performance Testing", "Bug Lifecycle"],
        outcomes: ["QA Engineer", "SDET", "Test Automation Lead"],
        fullPrice: 15999,
        registrationFee: 1999
      },
      {
        id: "python-dev",
        title: "Python Developer",
        description: "Deep dive into Python programming for automation, scripting, and web backends.",
        duration: "3 Months",
        features: ["Django/Flask", "Automation", "PyTest"],
        modules: ["Core Python", "Data Structures", "Web Frameworks", "Scripting"],
        outcomes: ["Backend Developer", "Automation Engineer", "Python Specialist"],
        fullPrice: 14999,
        registrationFee: 1999
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
        description: "Learn scaling strategies, digital marketing, and modern business management.",
        duration: "4 Months",
        features: ["Market Analysis", "Scaling Frameworks", "Growth Hacking"],
        modules: ["Strategy Design", "Digital Marketing", "Financial Management", "Sales Ops"],
        outcomes: ["Business Consultant", "Growth Manager", "Entrepreneur"],
        fullPrice: 20000,
        registrationFee: 2499
      },
      {
        id: "stock-market",
        title: "Stock Market & Investment",
        description: "Professional training in technical analysis, fundamental analysis, and portfolio management.",
        duration: "3 Months",
        features: ["Live Trading", "Risk Management", "Portfolio Strategy"],
        modules: ["Technical Analysis", "Derivatives", "Fundamental Analysis", "Algo Trading"],
        outcomes: ["Certified Trader", "Portfolio Manager", "Investment Advisor"],
        fullPrice: 18000,
        registrationFee: 2499
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
        description: "Integrate Artificial Intelligence with robotics for autonomous operation and decision making.",
        duration: "6 Months",
        features: ["ROS2", "Computer Vision", "Autonomous Systems"],
        modules: ["Robot Kinematics", "AI for Robots", "Sensor Fusion", "Path Planning"],
        outcomes: ["Robotics Engineer", "AI Specialist", "Control Systems Lead"],
        fullPrice: 34999,
        registrationFee: 5999
      },
      {
        id: "iot",
        title: "Internet of Things (IoT)",
        description: "Design the brain of smart devices using Arduino, Raspberry Pi, and ESP32.",
        duration: "4 Months",
        features: ["Micro-controllers", "IoT Protocols", "PCB Prototyping"],
        modules: ["Circuit Theory", "C/C++ for Embedded", "Sensors & Actuators", "IoT Cloud Connect"],
        outcomes: ["Embedded Developer", "IoT Solutions Architect", "Hardware Engineer"],
        fullPrice: 22000,
        registrationFee: 2999
      },
      {
        id: "iort",
        title: "IoRT (Internet of Robotics Things)",
        description: "The convergence of IoT and Robotics. Networking autonomous robots for smart industrial applications.",
        duration: "6 Months",
        features: ["Networked Robotics", "Swarm Intelligence", "Cloud Robotics"],
        modules: ["IoRT Architecture", "Communication Stacks", "Distributed Control", "Fleet Management"],
        outcomes: ["IoRT Architect", "Industrial Automation Lead", "System Specialist"],
        fullPrice: 38000,
        registrationFee: 6499
      },
      {
        id: "embedded-systems",
        title: "Embedded Systems",
        description: "Professional training on low-level hardware programming and real-time operating systems.",
        duration: "5 Months",
        features: ["RTOS", "ARM Architecture", "Firmware Dev"],
        modules: ["Microprocessor Design", "Memory Management", "RTOS Fundamentals", "Driver Dev"],
        outcomes: ["Firmware Engineer", "Embedded Systems Dev", "Hardware Lead"],
        fullPrice: 25000,
        registrationFee: 3499
      },
      {
        id: "drone-robotics",
        title: "Drone & Aerial Robotics",
        description: "Master drone building, flight mechanics, and autonomous navigation.",
        duration: "3 Months",
        features: ["UAV Design", "Flight Control Systems", "Autonomous Flight"],
        modules: ["Aero Dynamics", "UAV Assembly", "Autonomous Navigation", "Payload Integration"],
        outcomes: ["Drone Pilot", "UAV Designer", "Aerial Surveyor"],
        fullPrice: 19999,
        registrationFee: 2499
      }
    ]
  },
  {
    title: "STEM Foundation (K-12)",
    icon: "settings",
    courses: [
      {
        id: "junior-robotics",
        title: "Junior Robotics & Logic",
        description: "Specially designed for school students (Grades 1-8). Focuses on logic building using visual block coding.",
        duration: "12 Months",
        features: ["Block Coding", "Basic Electronics", "LEGO Spike/EV3"],
        modules: ["Logical Thinking", "Building Blocks", "Intro to Sensors", "My First Project"],
        outcomes: ["Logic Mastery", "Creative Problem Solving", "Tech Readiness"],
        fullPrice: 14999,
        registrationFee: 1999
      },
      {
        id: "ai-basics-schools",
        title: "AI & Computer Vision for Schools",
        description: "Introduction to Artificial Intelligence for high schoolers. Build face-tracking systems.",
        duration: "6 Months",
        features: ["Face Detection", "Voice Recognition", "Scratch AI"],
        modules: ["What is AI?", "Pattern Recognition", "Voice AI", "Ethical AI Concepts"],
        outcomes: ["Tech Literate Student", "AI Project Lead", "Future Coder"],
        fullPrice: 12000,
        registrationFee: 1499
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
  },
  {
    id: '2',
    title: 'Industrial Robotics Safety Guide',
    type: 'pdf',
    url: '#',
    category: 'Core Engineering',
    date: '2023-11-20'
  },
  {
    id: '3',
    title: 'IoT Protocols Cheat Sheet',
    type: 'pdf',
    url: '#',
    category: 'Core Engineering',
    date: '2024-01-05'
  }
];
