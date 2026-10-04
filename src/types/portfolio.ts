export interface ExpertiseMarqueeItem {
  id: string;
  title: string;
  category: string;
  badge: string;
  accent: 'cyan' | 'orange' | 'violet' | 'blue';
  description: string;
  iconName: string;
}

export interface ServiceItem {
  id: string; // e.g. "01"
  title: string;
  slug: string;
  summary: string;
  description: string;
  deliverables: string[];
  keyTools: string[];
  impactFocus: string;
}

export interface ProjectCaseStudy {
  challenge: string;
  objective: string;
  approach: string[];
  workDelivered: string[];
  results: {
    stat: string;
    label: string;
    verifiedNote?: string;
  }[];
  toolsUsed: string[];
  keyLearnings: string;
  verifiedStatus: string;
}

export interface ProjectItem {
  id: string; // "01", "02", "03"
  slug: string;
  title: string;
  brand: string;
  category: string;
  headline: string;
  description: string;
  tags: string[];
  externalUrl?: string;
  externalLabel?: string;
  accentColor: string;
  badge: string;
  caseStudy: ProjectCaseStudy;
  visualPreview: {
    primaryTitle: string;
    primarySubtitle: string;
    subItem1: { title: string; subtitle: string };
    subItem2: { title: string; subtitle: string };
  };
}

export interface ExperienceItem {
  id: string;
  organization: string;
  role: string;
  period: string;
  arrangement: 'Remote' | 'Hybrid' | 'On-site' | 'In-person' | 'Remote / Hybrid' | 'On-site / Hybrid';
  location: string;
  roleType: string;
  overview: string;
  responsibilities: string[];
  skillsDemonstrated: string[];
  highlights?: { stat: string; label: string }[];
  websiteUrl?: string;
  verificationNote?: string;
  isLeadershipOrCampus?: boolean;
}

export interface SkillGroup {
  id: string;
  title: string;
  iconName: string;
  description: string;
  skills: string[];
}

export interface VerifiedTool {
  name: string;
  category: string;
  proficiencyLevel: 'Core Workflow' | 'Advanced Execution' | 'Practical Application';
  highlight: string;
}

export interface CreativeItem {
  id: string;
  title: string;
  category: 'LinkedIn Carousels' | 'SEO & GEO Explainers' | 'Social Media Creatives' | 'Marketing Campaigns' | 'E-commerce Listings' | 'Website Projects' | 'Event Graphics';
  format: string;
  description: string;
  headlineTag: string;
  tags: string[];
  toolsUsed: string[];
  presentationNote?: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  location: string;
  period: string;
  credentialNote?: string;
}

export interface CertificationItem {
  title: string;
  issuer: string;
  issueDate: string;
  credentialUrl: string;
  credentialId?: string;
  topics: string[];
}
