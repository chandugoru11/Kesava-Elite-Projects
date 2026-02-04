
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
      { label: 'IT Programs', path: '/courses#it' },
      { label: 'Business & Management', path: '/courses#business' },
      { label: 'Core Engineering', path: '/courses#core' }
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
    category: 'IT Programs',
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
  },
  {
    id: '3',
    title: 'React Hooks Deep Dive - Recorded Session',
    type: 'video',
    url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: 'https://picsum.photos/id/2/400/225',
    category: 'IT Programs',
    date: '2023-10-10'
  },
  {
    id: '4',
    title: 'Curriculum PDF for STEM K12',
    type: 'pdf',
    url: '#',
    category: 'Services',
    date: '2023-09-28'
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
        description: "Master front-end (React) and back-end (Node/Java) development with modern database architectures.",
        duration: "6 Months",
        features: ["React & Next.js", "Java Spring Boot", "PostgreSQL", "System Design", "Cloud Deployment"]
      },
      {
        id: "ai-ml",
        title: "Artificial Intelligence & ML",
        description: "Comprehensive study of neural networks, computer vision, and predictive modeling.",
        duration: "5 Months",
        features: ["TensorFlow", "Deep Learning", "NLP", "Python for Data Science", "AI Ethics"]
      },
      {
        id: "cyber-security",
        title: "Cyber Security & Ethical Hacking",
        description: "Protecting digital infrastructure through advanced penetration testing and security protocols.",
        duration: "4 Months",
        features: ["Pen-Testing", "Network Security", "Vulnerability Assessment", "SOC Operations", "Governance"]
      },
      {
        id: "devops",
        title: "DevOps & SRE Excellence",
        description: "Learn to automate infrastructure and manage CI/CD pipelines at scale.",
        duration: "4 Months",
        features: ["Docker & K8s", "Jenkins/GitHub Actions", "Terraform", "Monitoring", "Cloud Architecture"]
      },
      {
        id: "ui-ux",
        title: "UI/UX & Product Design",
        description: "User-centric design thinking for high-impact digital products and mobile apps.",
        duration: "3 Months",
        features: ["Figma Mastery", "User Research", "Wireframing", "Prototyping", "Design Systems"]
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
        description: "The complete roadmap from ideation to successful product launch and lifecycle management.",
        duration: "3 Months",
        features: ["Agile/Scrum", "Market Analysis", "User Personas", "A/B Testing", "Go-To-Market"]
      },
      {
        id: "digital-marketing",
        title: "Digital Marketing & Strategy",
        description: "Advanced performance marketing, SEO, and brand identity transformation.",
        duration: "4 Months",
        features: ["Advanced SEO", "PPC Management", "Content Strategy", "Social Media ROI", "Analytics"]
      },
      {
        id: "fintech",
        title: "Fintech & Blockchain Strategy",
        description: "Navigating the intersection of finance and technology using decentralized ledgers.",
        duration: "4 Months",
        features: ["Blockchain Basics", "Smart Contracts", "Digital Wallets", "RegTech", "Defi Ecosystems"]
      },
      {
        id: "supply-chain",
        title: "Supply Chain 4.0 & Logistics",
        description: "Modernizing global supply chains using AI, IoT, and automated logistics systems.",
        duration: "5 Months",
        features: ["Inventory Automation", "IoT in SCM", "Global Logistics", "Procurement", "Sustainability"]
      }
    ]
  },
  {
    title: "Core Engineering",
    icon: "rocket",
    courses: [
      {
        id: "industrial-robotics",
        title: "Industrial Robotics & Automation",
        description: "Hands-on training with 6-DOF arms, PLC systems, and Industry 4.0 automation standards.",
        duration: "6 Months",
        features: ["Robot Programming", "PLC/SCADA", "Computer Vision", "Safety Protocols", "Factory Automation"]
      },
      {
        id: "ev-tech",
        title: "EV Technology & BMS",
        description: "The future of automotive engineering: battery systems, motor control, and charging tech.",
        duration: "6 Months",
        features: ["BMS Engineering", "Electric Powertrain", "Vehicle Dynamics", "Charging Infrastructure", "CAN Bus"]
      },
      {
        id: "drone-tech",
        title: "Aerospace & Drone Technology",
        description: "Design, assembly, and autonomous programming of UAVs for commercial and industrial use.",
        duration: "4 Months",
        features: ["Aerodynamics", "Flight Controllers", "Autonomous Navigation", "GIS Mapping", "DGCA Regulations"]
      },
      {
        id: "embedded-iot",
        title: "Embedded Systems & IoT Hub",
        description: "Developing smart connected devices using advanced microcontrollers and cloud sync.",
        duration: "5 Months",
        features: ["ESP32/STM32", "RTOS", "MQTT Protocols", "Edge Computing", "Hardware Design"]
      },
      {
        id: "vlsi",
        title: "VLSI Design & Semiconductor",
        description: "Mastering the design of complex integrated circuits and chip architecture.",
        duration: "6 Months",
        features: ["Verilog/VHDL", "FPGA Programming", "CMOS Design", "Physical Design", "Testing"]
      }
    ]
  }
];
