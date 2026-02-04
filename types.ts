
export interface NavItem {
  label: string;
  path: string;
  children?: NavItem[];
}

export interface ServiceDetail {
  title: string;
  description: string;
  items: string[];
}

export interface ImpactStat {
  label: string;
  value: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}
