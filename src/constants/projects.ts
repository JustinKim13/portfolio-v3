import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "madlease",
    title: "MadLease",
    description: "Live student sublease platform for UW-Madison students",
    longDescription:
      "MadLease is a production sublease marketplace built for UW-Madison students. Features a Spring Boot backend with AES-256-GCM encrypted real-time messaging, AWS S3 presigned uploads, Firebase Auth with Google OAuth, and a React frontend powered by TanStack Query. Live at madlease.net.",
    tags: [
      { name: "Spring Boot", color: "#6db33f" },
      { name: "PostgreSQL", color: "#336791" },
      { name: "AWS S3", color: "#ff9900" },
      { name: "React", color: "#61dafb" },
      { name: "Docker", color: "#2496ed" },
    ],
    image: "/projects/madlease.png",
    live: "https://madlease.net",
    duration: "1+ yr",
    featured: true,
  },
  {
    id: "quizclash",
    title: "QuizClash",
    description: "AI-powered real-time multiplayer quiz platform",
    longDescription:
      "QuizClash generates quiz questions from any source — PDFs, YouTube videos, or text — using T5 transformers with MMR-based distractor synthesis, Whisper for audio transcription, and Tesseract OCR for scanned PDFs. WebSocket synchronization supports 40+ concurrent players on a Node.js/Express backend with a React frontend. Achieved 77% relevance precision in question quality testing.",
    tags: [
      { name: "T5 Transformers", color: "#ff6b35" },
      { name: "Node.js", color: "#8cc84b" },
      { name: "WebSocket", color: "#f7df1e" },
      { name: "React", color: "#61dafb" },
      { name: "AWS S3", color: "#ff9900" },
    ],
    image: "/projects/quizclash.png",
    github: "https://github.com/JustinKim13/ml_quizmaker",
    live: "https://devpost.com/software/quizclash",
    duration: "2 mo",
    featured: true,
  },
  {
    id: "llm-from-scratch",
    title: "LLM From Scratch",
    description: "Transformer-based language model built from first principles",
    longDescription:
      "A transformer-based large language model built entirely from scratch in PyTorch — no high-level abstractions. Implements tokenization, multi-head self-attention, positional encoding, and the full training loop from first principles. Built to deeply understand the mechanics behind modern LLMs before working with them at scale.",
    tags: [
      { name: "PyTorch", color: "#ee4c2c" },
      { name: "Python", color: "#3776ab" },
      { name: "Transformers", color: "#ff9f43" },
    ],
    image: "/projects/llm.webp",
    github: "https://github.com/JustinKim13/LLM-from-scratch",
    duration: "Ongoing",
    featured: false,
  },
  {
    id: "flixfinder",
    title: "FlixFinder",
    description: "Full-stack movie recommender with content-based filtering",
    longDescription:
      "FlixFinder is a full-stack movie review and recommendation app. Users rate movies and the recommendation engine uses Scikit-Learn cosine similarity to surface personalized suggestions — never recommending movies already in the user's list. Built with Django REST Framework, PostgreSQL, and a React frontend.",
    tags: [
      { name: "Django", color: "#44b78b" },
      { name: "PostgreSQL", color: "#336791" },
      { name: "Scikit-learn", color: "#f7931e" },
      { name: "React", color: "#61dafb" },
    ],
    image: "/projects/flixfinder.png",
    github: "https://github.com/JustinKim13/Movie-Review-Rec-App",
    live: "https://movie-review-rec-app-5dee.vercel.app",
    duration: "6 wk",
    featured: true,
  },
  {
    id: "core-ml",
    title: "Core ML Implementations",
    description: "ML algorithms built from scratch — no sklearn",
    longDescription:
      "From-scratch Python implementations of 4 core ML algorithms using only NumPy — no scikit-learn. Linear regression covers both gradient descent (MSE loss, manual weight updates) and the closed-form normal equation. Also implements PCA via eigendecomposition, hierarchical clustering with dendrogram analysis, and Naive Bayes text classification. Each implementation derives directly from the underlying math rather than calling library abstractions.",
    tags: [
      { name: "Python", color: "#3776ab" },
      { name: "NumPy", color: "#4dabcf" },
      { name: "PyTorch", color: "#ee4c2c" },
    ],
    image: "/projects/core-ml.webp",
    github: "https://github.com/JustinKim13/Core-ML-Implementations",
    duration: "10 wk",
    featured: true,
  },
];
