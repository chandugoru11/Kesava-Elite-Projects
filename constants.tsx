
import { NavItem } from './types';

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
  { label: 'Partners', path: '/partners' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Careers', path: '/careers' },
  { label: 'Contact', path: '/contact' },
];

export const COMPANY_INFO = {
  name: "KESHAVA ELITE PROJECTS PVT.LTD",
  cin: "U62099AP2023PTC110407",
  tagline: "Empowering Future Innovators Through Robotics & STEM Excellence",
  email: "info@keshavaeliteprojects.com",
  phone: "+91 7659867411",
  address: "Andhra Pradesh, India",
};
