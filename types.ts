export interface VideoProject {
  id: string;
  title: string;
  thumbnailUrl: string;
  videoUrl: string; // YouTube URL
  views?: string;
  category: 'short' | 'long';
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company?: string;
  avatarUrl: string;
  quote: string;
  rating: number;
}

export interface NavItem {
  id: string;
  label: string;
}