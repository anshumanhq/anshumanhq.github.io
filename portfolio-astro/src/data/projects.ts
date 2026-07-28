export interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  github?: string;
  live?: string;
  image?: string;
  category: string;
  featured: boolean;
  commercial: boolean;
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'UPTAC Seat Predictor',
    description: 'Free web tool for UPTAC aspirants to predict college and branch chances using 3 years of official cutoff data. No sign-up required.',
    tech: ['Python', 'JavaScript', 'JSON', 'HTML/CSS'],
    github: 'https://github.com/anshumanhq/anshumanhq.github.io/tree/main/tools/uptacpredictor',
    live: 'tools/uptacpredictor/',
    image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=600&h=350&fit=crop&auto=format',
    category: 'Utility',
    featured: true,
    commercial: false,
  },
  {
    id: 2,
    title: 'StudyAI',
    description: 'AI-powered learning platform with real-time chat, visual knowledge mapping, and Stripe/Razorpay payment integration.',
    tech: ['Flask', 'Gemini API', 'LangChain', 'Stripe'],
    github: 'https://github.com/anshumanhq/StudyAI',
    image: 'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=600&h=350&fit=crop&auto=format',
    category: 'AI',
    featured: true,
    commercial: false,
  },
  {
    id: 3,
    title: 'CBT School Portal',
    description: 'Computer Based Testing system with hardware-locked licensing, admin dashboard, student client, and automated result processing. Sold to 6+ educational institutions.',
    tech: ['Python', 'Flask', 'PyInstaller', 'SQLite'],
    github: 'https://github.com/anshumanhq/CBT-School-Portal',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&h=350&fit=crop&auto=format',
    category: 'Web App',
    featured: true,
    commercial: true,
  },
];
