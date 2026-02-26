import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "madlease",
    title: "MadLease",
    description: "Live student sublease platform for UW-Madison students",
    longDescription:
      "MadLease is a production sublease marketplace built for UW-Madison students. Features a Spring Boot backend with real-time RDS syncing, Redis caching, AWS S3 presigned uploads for listing photos, and a React frontend powered by TanStack Query. Currently live at madlease.net with real users.",
    tags: [
      { name: "Spring Boot", color: "#6db33f" },
      { name: "PostgreSQL", color: "#336791" },
      { name: "Redis", color: "#dc382d" },
      { name: "AWS S3", color: "#ff9900" },
      { name: "React", color: "#61dafb" },
    ],
    image: "/projects/madlease.png",
    github: "https://github.com/JustinKim13/madlease",
    live: "https://madlease.net",
    duration: "1+ yr",
    featured: true,
  },
  {
    id: "quizclash",
    title: "QuizClash",
    description: "AI-powered real-time multiplayer quiz platform",
    longDescription:
      "QuizClash generates quiz questions from any source — PDFs, YouTube videos, or text — using T5 transformers with MMR-based distractor synthesis and OCR for PDF extraction. WebSocket synchronization supports 100+ concurrent players on a Node.js/Express backend with a React frontend.",
    tags: [
      { name: "T5 Transformers", color: "#ff6b35" },
      { name: "Node.js", color: "#8cc84b" },
      { name: "WebSocket", color: "#010101" },
      { name: "React", color: "#61dafb" },
      { name: "Python", color: "#3776ab" },
    ],
    image: "/projects/quizclash.png",
    github: "https://github.com/JustinKim13/quizclash",
    duration: "2 mo",
    featured: true,
  },
  {
    id: "flixfinder",
    title: "FlixFinder",
    description: "AI-powered movie recommender using collaborative filtering",
    longDescription:
      "FlixFinder uses collaborative filtering and content-based ML models to recommend movies tailored to each user's taste profile. Users rate movies, the model updates in real time, and recommendations improve with each interaction. Integrated with the TMDB API for rich metadata.",
    tags: [
      { name: "Python", color: "#3776ab" },
      { name: "FastAPI", color: "#009688" },
      { name: "Scikit-learn", color: "#f7931e" },
      { name: "React", color: "#61dafb" },
    ],
    image: "/projects/flixfinder.png",
    github: "https://github.com/JustinKim13/flixfinder",
    duration: "6 wk",
    featured: true,
  },
  {
    id: "portfolio-v3",
    title: "Portfolio V3",
    description: "This site — Spotify-themed developer portfolio",
    longDescription:
      "The portfolio you're looking at right now. Built as a Spotify desktop app clone with real Spotify API integration. Features a Wrapped-style career timeline, Framer Motion animations, and live now-playing data from the Spotify API.",
    tags: [
      { name: "Next.js", color: "#ffffff" },
      { name: "GSAP", color: "#88ce02" },
      { name: "Framer Motion", color: "#0055ff" },
      { name: "TypeScript", color: "#3178c6" },
    ],
    image: "/projects/portfolio.png",
    github: "https://github.com/JustinKim13/portfolio-v3",
    live: "https://justinkim.dev",
    duration: "1 mo",
    featured: false,
  },
];
