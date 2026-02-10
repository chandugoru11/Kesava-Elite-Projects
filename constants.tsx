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
        id: "power-bi",
        title: "Power BI",
        description: "Advanced business intelligence and data visualization.",
        duration: "3 Months",
        features: ["DAX", "SQL", "Dashboarding"],
        modules: ["Data Connectivity", "Advanced DAX", "Visual Storytelling", "Power BI Service", "Enterprise Reporting"],
        fullPrice: 15999, registrationFee: 1999
      },
      {
        id: "app-dev",
        title: "App Development",
        description: "Cross-platform mobile engineering with Flutter and React Native.",
        duration: "4 Months",
        features: ["Flutter", "React Native", "Firebase"],
        modules: ["Native Integration", "State Management", "App Store Protocol", "UI/UX Mobile", "Backend Connectivity"],
        fullPrice: 22999, registrationFee: 2999
      }
    ]
  },
  {
    title: "Core Engineering",
    icon: "cpu",
    courses: [
      {
        id: "vlsi",
        title: "VLSI Design",
        description: "Very Large Scale Integration and Chip Design Protocol.",
        duration: "6 Months",
        features: ["Verilog", "Cadence", "FPGA"],
        modules: ["Digital Logic", "CMOS Fabrication", "System Verilog", "Physical Design", "Testing & Verification"],
        fullPrice: 38999, registrationFee: 5999
      },
      {
        id: "industrial-automation",
        title: "Industrial Automation",
        description: "Master PLC, SCADA, and Industrial IoT for Industry 4.0.",
        duration: "5 Months",
        features: ["PLC", "SCADA", "HMI"],
        modules: ["Ladder Logic", "Field Instrumentation", "Distributed Control", "Motion Control", "System Integration"],
        fullPrice: 34999, registrationFee: 4999
      },
      {
        id: "ev-tech",
        title: "Electric Vehicle Tech",
        description: "Design and engineering of Electric Vehicle systems.",
        duration: "5 Months",
        features: ["MATLAB", "BMS", "Powertrain"],
        modules: ["Battery Management", "Motor Controllers", "Charging Infra", "Vehicle Dynamics", "Thermal Management"],
        fullPrice: 35999, registrationFee: 5499
      },
      {
        id: "embedded",
        title: "Embedded Systems",
        description: "Firmware and Hardware-level engineering.",
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
      },
      {
        id: "solidworks",
        title: "SolidWorks Design",
        description: "Advanced 3D Modeling and Industrial Simulation.",
        duration: "3 Months",
        features: ["3D Modeling", "FEA", "Simulation"],
        modules: ["Sketching & Part Design", "Assembly Modeling", "Technical Drawing", "Stress Analysis", "Sheet Metal Design"],
        fullPrice: 18999, registrationFee: 2499
      },
      {
        id: "autocad",
        title: "AutoCAD (2D & 3D)",
        description: "Professional drafting and structural documentation.",
        duration: "3 Months",
        features: ["Drafting", "Rendering", "Blueprinting"],
        modules: ["Geometric Design", "Architectural Drawing", "3D Rendering", "Structural Annotation", "Plotting Protocols"],
        fullPrice: 14999, registrationFee: 1999
      }
    ]
  },
  {
    title: "Finance & Management",
    icon: "briefcase",
    courses: [
      {
        id: "stock-market",
        title: "Stock Market & Trading",
        description: "Technical analysis and capital market protocols.",
        duration: "2 Months",
        features: ["Technical Analysis", "Options", "Forex"],
        modules: ["Price Action", "Derivative Strategies", "Risk Management", "Portfolio Balancing", "Market Psychology"],
        fullPrice: 12999, registrationFee: 1499
      },
      {
        id: "business-growth",
        title: "Business Growth Expert",
        description: "Strategies for scaling startups and technical entities.",
        duration: "3 Months",
        features: ["Marketing", "Sales", "Strategy"],
        modules: ["Customer Acquisition", "Growth Hacking", "Operational Scaling", "Venture Capital", "Branding"],
        fullPrice: 19999, registrationFee: 2499
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