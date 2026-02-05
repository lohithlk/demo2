
export interface VisualSection {
  title: string;
  description: string;
  imageUrl: string;
  layout: 'text-left' | 'text-right' | 'full';
  specs?: { label: string; value: string }[];
}

export interface Product {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  modelUrl?: string; // Optional URL for 3D model (.glb/.gltf)
  videoUrl?: string; // Optional URL for product video
  specs?: { label: string; value: string }[];
  features?: string[];
  details?: {
    title: string;
    items: { label: string; value: string }[];
  }[];
  visualSections?: VisualSection[];
}

export interface Payload {
  id: string;
  productId: string;
  type: 'surveillance' | 'mapping';
  title: string;
  description: string;
  imageUrl: string;
  modelUrl?: string;
  specs: { label: string; value: string }[];
  manufacturer?: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface StatItem {
  value: string;
  label: string;
}

export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
}

export interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  applicantName: string;
  email: string;
  coverLetter: string;
  resumeData?: string; // Base64 string of the resume file
  timestamp: string;
  status: 'pending' | 'reviewed' | 'rejected' | 'accepted';
}

export interface Leader {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
}

export interface NewsItem {
  id: string | number;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  content?: string;
  imageUrl?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  imageUrl: string;
  category: string;
  likes?: number;
  shares?: number;
}

export interface Partner {
  id: string;
  company: string;
  quote: string;
  logoUrl?: string;
}

export interface Hackathon {
  id: string;
  title: string;
  description: string;
  date: string;
  venue: string;
  prizePool: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  imageUrl: string;
  requirements?: string[];
}

export interface HackathonApplication {
  id: string;
  hackathonId: string;
  hackathonTitle: string;
  applicantName: string;
  email: string;
  teamName?: string;
  githubLink?: string;
  linkedinLink?: string;
  status: 'pending' | 'accepted' | 'rejected';
}

export interface PricingTier {
  label: string;
  limit: number;
  rate: number;
}

export interface PricingModel {
  [key: string]: PricingTier[];
}
