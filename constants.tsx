
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
  },
  {
    id: '5',
    title: 'Useful Links: GitHub Repo for Project-X',
    type: 'link',
    url: 'https://github.com',
    category: 'IT Programs',
    date: '2023-09-25'
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
        description: "Master the tools and technologies to build responsive, dynamic web applications from scratch. This course covers front-end development with HTML, CSS, JavaScript, and React, along with back-end programming using Node.js, Express, and MongoDB.",
        duration: "6 Months",
        features: ["HTML5/CSS3/JS", "React.js & Next.js", "Node.js & Express", "MongoDB & SQL", "Project-based Learning"]
      },
      {
        id: "ai-ml",
        title: "Artificial Intelligence & ML",
        description: "Explore the frontiers of modern computing. This program covers neural networks, deep learning, natural language processing (NLP), and computer vision. Gain hands-on experience with industry-standard frameworks and real-world datasets.",
        duration: "5 Months",
        features: ["Neural Networks", "Deep Learning", "NLP & Computer Vision", "TensorFlow/PyTorch", "AI Ethics"]
      }
    ]
  },
  {
    title: "Business & Management",
    icon: "briefcase",
    courses: [
      {
        id: "digital-marketing",
        title: "Digital Marketing & Strategy",
        description: "Transform businesses in the digital age. Learn SEO, SEM, Social Media Marketing, and Content Strategy. Understand data-driven decision making and how to build high-converting marketing funnels for diverse industries.",
        duration: "4 Months",
        features: ["SEO & SEM Masterclass", "Social Media Strategy", "Email Marketing & Automation", "Performance Tracking", "Brand Identity Design"]
      },
      {
        id: "business-analytics",
        title: "Business Analytics & Data Science",
        description: "Bridging the gap between raw data and business insights. This course teaches you how to use statistics, SQL, and visualization tools like Tableau to drive strategic organizational decisions.",
        duration: "5 Months",
        features: ["Statistical Modeling", "SQL & Database Management", "Tableau/PowerBI Visualization", "Market Trend Forecasting", "Case Study Analysis"]
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
        description: "Comprehensive training on the design, programming, and maintenance of industrial robotic systems. Covers robot kinematics, PLC programming, and factory floor automation integration with Industry 4.0 standards.",
        duration: "6 Months",
        features: ["Robot Kinematics", "PLC & SCADA Programming", "Sensors & Actuators", "Factory Floor Integration", "Safety Standards (ISO)"]
      },
      {
        id: "embedded-iot",
        title: "Embedded Systems & IoT",
        description: "Build the next generation of smart connected devices. This program covers microcontrollers (STM32/ESP32), RTOS, protocol communication (MQTT/HTTP), and cloud integration for scalable IoT ecosystems.",
        duration: "5 Months",
        features: ["Microcontroller Architecture", "C/C++ for Embedded", "IoT Cloud Platforms", "Wireless Protocols (BLE/WiFi)", "Hardware Prototyping"]
      }
    ]
  }
];
