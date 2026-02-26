import type { SkillGenre } from "@/types";

export const skillGenres: SkillGenre[] = [
  {
    name: "Frontend",
    color: "#61dafb",
    bgColor: "rgba(97, 218, 251, 0.15)",
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Three.js / R3F",
    ],
  },
  {
    name: "Backend",
    color: "#8cc84b",
    bgColor: "rgba(140, 200, 75, 0.15)",
    skills: [
      "Node.js",
      "Express",
      "FastAPI",
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "Prisma",
    ],
  },
  {
    name: "ML / AI",
    color: "#ff9f43",
    bgColor: "rgba(255, 159, 67, 0.15)",
    skills: [
      "Python",
      "PyTorch",
      "Scikit-learn",
      "Pandas / NumPy",
      "LLM Fine-tuning",
      "RAG Architectures",
      "Hugging Face",
    ],
  },
  {
    name: "DevOps / Tools",
    color: "#a29bfe",
    bgColor: "rgba(162, 155, 254, 0.15)",
    skills: [
      "Git / GitHub",
      "Docker",
      "AWS (EC2, S3, Lambda)",
      "Vercel",
      "CI/CD",
      "Linux",
    ],
  },
];
