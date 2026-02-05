
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
        title: "Full Stack Web Development",
        description: "Master modern front-end (React) and robust back-end (Spring Boot) ecosystems.",
        duration: "6 Months",
        features: ["React & Next.js", "Spring Boot", "Cloud Deployment"],
        modules: ["Web Arch", "React Patterns", "Microservices", "DevOps"],
        outcomes: ["Senior Web Engineer", "Full Stack Consultant"],
        fullPrice: 24999,
        registrationFee: 2999
      },
      {
        id: "cyber-security",
        title: "Ethical Hacking",
        description: "Comprehensive penetration testing and network security training.",
        duration: "5 Months",
        fullPrice: 32000,
        registrationFee: 4999
      }
    ]
  },
  {
    title: "Core Engineering",
    icon: "cpu",
    courses: [
      {
        id: "robotics-automation",
        title: "Industrial Robotics",
        description: "Hands-on training with 6-DOF robotic arms and Industry 4.0 standards.",
        duration: "6 Months",
        fullPrice: 34999,
        registrationFee: 5999
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
