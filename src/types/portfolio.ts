export interface WrappedYear {
  year: number;
  gradient: string;        // CSS gradient string
  headline: string;        // e.g. "SWE Intern @ Capital One"
  stat: string;            // e.g. "You shipped 3 projects"
  company: string;
  role: string;
  points: string[];        // accomplishments as "tracks"
  icon: string;            // company logo path
  color: string;           // accent color for text
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  tags: { name: string; color: string }[];
  image: string;
  github?: string;
  live?: string;
  duration: string;        // "3 months" — shown as track duration
  featured?: boolean;
}

export interface SkillGenre {
  name: string;
  color: string;
  bgColor: string;
  skills: string[];
}

export interface Experience {
  title: string;
  company: string;
  date: string;
  points: string[];
  icon: string;
}
