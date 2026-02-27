import type { SkillGenre } from "@/types";

export const skillGenres: SkillGenre[] = [
  {
    name: "Languages",
    color: "#61dafb",
    bgColor: "rgba(97, 218, 251, 0.15)",
    skills: [
      "Python",
      "Java",
      "JavaScript",
      "TypeScript",
      "C",
      "SQL",
      "HTML5",
      "CSS",
    ],
  },
  {
    name: "Libraries / Frameworks",
    color: "#1db954",
    bgColor: "rgba(29, 185, 84, 0.15)",
    skills: [
      "React",
      "Spring Boot",
      "Node / Express",
      "PostgreSQL",
      "Flask",
      "PyTorch",
      "Angular",
      "Scikit-Learn",
    ],
  },
  {
    name: "Developer Tools",
    color: "#a29bfe",
    bgColor: "rgba(162, 155, 254, 0.15)",
    skills: [
      "Git",
      "Docker",
      "AWS (S3, EC2, IAM)",
      "Postman",
      "Jira",
      "WireMock",
      "Pub/Sub",
    ],
  },
  {
    name: "AI Systems & Tooling",
    color: "#ff9f43",
    bgColor: "rgba(255, 159, 67, 0.15)",
    skills: [
      "Agentic Dev Workflows",
      "Hugging Face",
      "RAG Pipelines",
      "Vector Embeddings",
      "Fine-tuning / SFT",
      "LangChain",
      "vLLM",
    ],
  },
];
