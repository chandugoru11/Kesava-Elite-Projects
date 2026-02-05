
import { NavItem, CourseCategory, LMSResource } from './types';

export const NAVIGATION_LINKS: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  { 
    label: 'Services', 
    path: '/services',
    children: [
      { label: 'STEM Labs', path: '/services#stem-labs' },
      { label: 'CoE', path: '/services#coe' },
      { label: 'STEM & AI Robotics (K1–K12)', path: '/services#k12' }
    ]
  },
  { label: 'For Schools', path: '/for-schools' },
  { 
    label: 'Courses', 
    path: '/courses',
    children: [
      { label: 'Information Technology', path: '/courses' },
      { label: 'Core Engineering', path: '/courses' },
      { label: 'Drone & Aviation', path: '/courses' },
      { label: 'Business & Management', path: '/courses' }
    ]
  },
  { label: 'Impact', path: '/impact' },
  { label: 'Contact', path: '/contact' },
];

export const COMPANY_INFO = {
  name: "KESHAVA ELITE PROJECTS PVT.LTD",
  brandName: "KESHAVA ELITE PROJECTS",
  logo: "https://r2itechlabs.com/assets/img/logo.png",
  cin: "U62099AP2023PTC110407",
  tagline: "ROBOTICS & TECHNOLOGY",
  email: "info@keshavaeliteprojects.in",
  phone: "+91 7659867411",
  address: "Andhra Pradesh, India",
};

export const MOCK_RESOURCES: LMSResource[] = [
  {
    id: '1',
    title: 'Introduction to Full Stack Architecture',
    type: 'video',
    url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: 'https://picsum.photos/id/0/400/225',
    category: 'Information Technology',
    date: '2023-10-15'
  },
  {
    id: '2',
    title: 'Advanced Robotics: SLAM Navigation',
    type: 'video',
    url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: 'https://picsum.photos/id/1/400/225',
    category: 'Core Engineering',
    date: '2023-10-12'
  }
];

export const COURSE_DATA: CourseCategory[] = [
  {
    title: "Information Technology",
    icon: "terminal",
    courses: [
      {
        id: "full-stack",
        title: "Full Stack Web Development",
        description: "Master modern front-end (React/Next.js) and robust back-end (Java/Node) ecosystems with industrial cloud deployment.",
        duration: "6 Months",
        features: ["React & Next.js", "Spring Boot", "AWS Deployment", "System Design"],
        modules: ["Intro to Web Arch", "Advanced React Patterns", "Microservices Architecture", "DevOps & CI/CD Hub"],
        outcomes: ["Senior Web Engineer", "Full Stack Consultant", "Cloud Solutions Architect"],
        syllabusUrl: "#",
        fullPrice: 24999,
        registrationFee: 2999
      },
      {
        id: "cyber-security",
        title: "Ethical Hacking & Cyber Security",
        description: "Comprehensive penetration testing, network security, and digital forensics training for elite security roles.",
        duration: "5 Months",
        features: ["Penetration Testing", "Network Defense", "Cryptography", "Incident Response"],
        modules: ["Reconnaissance & Mapping", "Exploit Development", "Web App Vulnerabilities", "Governance & Compliance"],
        outcomes: ["Security Analyst", "Penetration Tester", "Cyber Forensics Expert"],
        syllabusUrl: "#",
        fullPrice: 32000,
        registrationFee: 4999
      },
      {
        id: "data-science",
        title: "Data Science & Predictive AI",
        description: "Transform raw data into strategic insights using advanced statistical models and neural networks.",
        duration: "6 Months",
        features: ["Python for Data", "TensorFlow", "Big Data (Hadoop)", "Visual Analytics"],
        modules: ["Statistical Foundations", "Machine Learning Pipelines", "Deep Learning Models", "Big Data Engineering"],
        outcomes: ["Data Scientist", "ML Engineer", "Business Intelligence Lead"],
        syllabusUrl: "#",
        fullPrice: 35000,
        registrationFee: 5000
      }
    ]
  },
  {
    title: "Drone & Aviation Tech",
    icon: "rocket",
    courses: [
      {
        id: "uav-design",
        title: "UAV Design & Engineering",
        description: "Specialized training on unmanned aerial vehicles, aerodynamics, and autonomous flight control systems.",
        duration: "4 Months",
        features: ["Aerodynamics", "Flight Controllers", "Autonomous Navigation", "Payload Integration"],
        modules: ["Intro to UAV Mechanics", "Propulsion & Power Systems", "Autonomous Mission Planning", "DGCA Drone Regulations"],
        outcomes: ["Drone Engineer", "Flight Operations Manager", "UAV Software Dev"],
        syllabusUrl: "#",
        fullPrice: 39999,
        registrationFee: 6999
      },
      {
        id: "precision-agri-drone",
        title: "Drone in Precision Agriculture",
        description: "Applying UAV technology to modern farming for crop monitoring, spraying, and mapping.",
        duration: "3 Months",
        features: ["Multispectral Imaging", "GIS Mapping", "Crop Analysis", "Spraying Systems"],
        modules: ["Agri-Drone Fundamentals", "Imaging & Data Post-Processing", "Precision Spraying Logic", "Smart Farming Integration"],
        outcomes: ["Agri-Tech Consultant", "GIS Mapping Specialist", "Agri-Drone Pilot"],
        syllabusUrl: "#",
        fullPrice: 28000,
        registrationFee: 3500
      }
    ]
  },
  {
    title: "IoT & Embedded Systems",
    icon: "cpu",
    courses: [
      {
        id: "embedded-iot",
        title: "Embedded Systems & IoT Hub",
        description: "Interfacing hardware with software using microcontrollers and cloud-based industrial IoT protocols.",
        duration: "4 Months",
        features: ["Arduino/ESP32", "Raspberry Pi", "MQTT Protocols", "Edge Computing"],
        modules: ["Circuit Designing", "C/C++ for Embedded", "IoT Cloud Integration", "Industrial Sensor Networks"],
        outcomes: ["Embedded Developer", "IoT Solutions Engineer", "Smart Systems Architect"],
        syllabusUrl: "#",
        fullPrice: 18999,
        registrationFee: 1999
      },
      {
        id: "ev-tech",
        title: "EV Technology & BMS Design",
        description: "Engineering training for Electric Vehicles, focusing on Battery Management Systems and Motor Control.",
        duration: "5 Months",
        features: ["Battery Chemistry", "BMS Logic", "EV Powertrain", "Charging Infrastructure"],
        modules: ["Electric Vehicle Basics", "Battery Pack Design", "Motor & Drive Controllers", "EV Standards & Safety"],
        outcomes: ["EV Powertrain Engineer", "BMS Designer", "Charging Infrastructure Expert"],
        syllabusUrl: "#",
        fullPrice: 42000,
        registrationFee: 8000
      }
    ]
  },
  {
    title: "Core Engineering",
    icon: "settings",
    courses: [
      {
        id: "industrial-robotics",
        title: "Industrial Robotics & Automation",
        description: "Hands-on training with 6-DOF robotic arms, PLC systems, and Industry 4.0 automation standards.",
        duration: "6 Months",
        features: ["Robot Programming", "PLC/SCADA", "Computer Vision", "Safety Protocols"],
        modules: ["Kinematics & Dynamics", "PLC Advanced Logic", "Vision Guided Robotics", "Factory Automation Architecture"],
        outcomes: ["Automation Engineer", "Robotics Technician", "Industry 4.0 Specialist"],
        syllabusUrl: "#",
        fullPrice: 34999,
        registrationFee: 5999
      },
      {
        id: "cad-cam-adv",
        title: "Advanced CAD/CAM Engineering",
        description: "Master industrial design using SolidWorks and CATIA with focus on precision manufacturing.",
        duration: "4 Months",
        features: ["3D Modeling", "FEA Analysis", "CNC Programming", "Rapid Prototyping"],
        modules: ["Mechanical Design Basics", "Surface Modeling", "Structural Simulation", "CAM Toolpath Planning"],
        outcomes: ["Design Engineer", "Product Stylist", "CAM Specialist"],
        syllabusUrl: "#",
        fullPrice: 22000,
        registrationFee: 2500
      }
    ]
  },
  {
    title: "Business & Management",
    icon: "briefcase",
    courses: [
      {
        id: "product-management",
        title: "Elite Product Management",
        description: "The complete roadmap from ideation to successful product launch and lifecycle management in tech.",
        duration: "3 Months",
        features: ["Agile/Scrum", "Market Analysis", "User Personas", "A/B Testing"],
        modules: ["Idea Validation Hub", "Product Strategy", "Agile Execution", "Growth & Metrics Analytics"],
        outcomes: ["Product Manager", "Business Analyst", "Tech Startup Founder"],
        syllabusUrl: "#",
        fullPrice: 15999,
        registrationFee: 999
      },
      {
        id: "digital-marketing-elite",
        title: "Strategic Digital Marketing",
        description: "Master the art of digital growth through SEO, SEM, and data-driven content strategies.",
        duration: "3 Months",
        features: ["SEO / SEM", "Content Strategy", "Ad Analytics", "Social Engineering"],
        modules: ["Brand Identity Design", "Performance Marketing", "Consumer Behavior Logic", "Elite Campaign Design"],
        outcomes: ["Growth Manager", "Digital Strategist", "Marketing Analytics Lead"],
        syllabusUrl: "#",
        fullPrice: 12500,
        registrationFee: 500
      }
    ]
  }
];
