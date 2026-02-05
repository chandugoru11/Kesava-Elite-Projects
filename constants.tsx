
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
        features: ["React & Next.js", "Java Spring Boot", "PostgreSQL", "System Design"],
        fullPrice: 24999,
        registrationFee: 2999
      },
      {
        id: "ai-ml",
        title: "Artificial Intelligence & ML",
        description: "Comprehensive study of neural networks, computer vision, and predictive modeling.",
        duration: "5 Months",
        features: ["TensorFlow", "Deep Learning", "NLP", "Python for Data Science"],
        fullPrice: 29999,
        registrationFee: 4999
      },
      {
        id: "cyber-security",
        title: "Cyber Security & Ethical Hacking",
        description: "Protecting digital infrastructure through advanced penetration testing and security protocols.",
        duration: "4 Months",
        features: ["Pen-Testing", "Network Security", "Vulnerability Assessment", "SOC Operations"],
        fullPrice: 19999,
        registrationFee: 1999
      },
      {
        id: "data-science",
        title: "Data Science & Big Data",
        description: "Analyze massive datasets and build predictive models using statistical computing and AI.",
        duration: "6 Months",
        features: ["Pandas & NumPy", "Scikit-Learn", "Big Data Tools", "Data Visualization"],
        fullPrice: 27999,
        registrationFee: 3999
      },
      {
        id: "cloud-computing",
        title: "Cloud Architecture (AWS/Azure)",
        description: "Design and deploy scalable, reliable, and secure applications in the cloud.",
        duration: "4 Months",
        features: ["AWS/Azure Services", "Serverless Computing", "Cloud Security", "Cost Optimization"],
        fullPrice: 22999,
        registrationFee: 2499
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
        features: ["Agile/Scrum", "Market Analysis", "User Personas", "A/B Testing"],
        fullPrice: 15999,
        registrationFee: 999
      },
      {
        id: "digital-marketing",
        title: "Digital Marketing & Strategy",
        description: "Advanced performance marketing, SEO, and brand identity transformation.",
        duration: "4 Months",
        features: ["Advanced SEO", "PPC Management", "Content Strategy", "Social Media ROI"],
        fullPrice: 12999,
        registrationFee: 999
      },
      {
        id: "financial-modeling",
        title: "Financial Modeling & Valuation",
        description: "Master Excel for complex financial forecasting and company valuation techniques.",
        duration: "3 Months",
        features: ["DCF Analysis", "Excel Mastery", "Equity Research", "M&A Basics"],
        fullPrice: 14999,
        registrationFee: 1499
      },
      {
        id: "entrepreneurship",
        title: "Startup & Entrepreneurship",
        description: "From idea to scale: Business models, fundraising, and operational excellence for founders.",
        duration: "4 Months",
        features: ["Business Canvas", "Venture Capital", "Lean Startup", "Sales Strategy"],
        fullPrice: 17999,
        registrationFee: 1999
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
        features: ["Robot Programming", "PLC/SCADA", "Computer Vision", "Safety Protocols"],
        fullPrice: 34999,
        registrationFee: 5999
      },
      {
        id: "ev-tech",
        title: "EV Technology & BMS",
        description: "The future of automotive engineering: battery systems, motor control, and charging tech.",
        duration: "6 Months",
        features: ["BMS Engineering", "Electric Powertrain", "Vehicle Dynamics", "Charging Infrastructure"],
        fullPrice: 32999,
        registrationFee: 4999
      },
      {
        id: "drone-tech",
        title: "Drone Technology & UAV",
        description: "Design, build, and fly autonomous drones with GIS and industrial mapping capabilities.",
        duration: "4 Months",
        features: ["Flight Controllers", "UAV Simulation", "DGCA Regulations", "Drone Hardware"],
        fullPrice: 28999,
        registrationFee: 3499
      },
      {
        id: "vlsi-design",
        title: "VLSI Design & Embedded Systems",
        description: "Hardware description languages and chip design for the semiconductor industry.",
        duration: "6 Months",
        features: ["Verilog HDL", "FPGA Interfacing", "CMOS Circuits", "RTL Coding"],
        fullPrice: 38999,
        registrationFee: 6999
      }
    ]
  }
];
