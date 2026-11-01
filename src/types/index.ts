export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'Ecosystem' | 'Platform' | 'Streaming' | 'Mobile & DB' | 'Systems & Automation';
  year: string;
  summary: string;
  description: string;
  architectureDetails: string[];
  techStack: string[];
  metrics?: { label: string; value: string }[];
  screenshotUrl: string;
  repoUrl?: string;
  liveUrl?: string;
  featured: boolean;
  role: string;
}

export interface ExpertiseCategory {
  id: string;
  title: string;
  shortDesc: string;
  description: string;
  coreTechnologies: string[];
  keyPractices: string[];
  focusAreas: string[];
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}
