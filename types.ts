export interface NavItem {
  label: string;
  path: string;
  children?: NavItem[];
}

export interface User {
  name: string;
  email: string;
  isLoggedIn: boolean;
}

export interface LMSResource {
  id: string;
  title: string;
  type: 'video' | 'link' | 'pdf';
  url: string;
  thumbnail?: string;
  category: string;
  date: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  duration?: string;
  features?: string[];
  modules?: string[];
  outcomes?: string[];
  syllabusUrl?: string;
  fullPrice: number;
  registrationFee: number;
}

export interface CourseCategory {
  title: string;
  icon: string;
  courses: Course[];
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}