export const DATA = {
  name: "Pavan Kumar B S",
  title: [
    "Cybersecurity & AI Engineer",
    "Threat Detection Developer",
    "Blockchain & Cryptography Builder",
    "Secure Systems Architect"
  ],
  tagline: "Building secure, intelligent, and decentralized systems through Cybersecurity, Artificial Intelligence, and Blockchain technologies.",
  bio: "I am a Bachelor of Technology in Computer Science student at Garden City University (CGPA 7.60/10.0), specializing in Cybersecurity, AI/ML, and Blockchain. I have practical experience in threat detection, vulnerability assessment, incident response, network security monitoring, machine learning, cryptography, secure system design, and blockchain authentication. I focus on engineering resilient systems that are secure by design, mathematically verifiable, and built for real-world impact.",
  location: "Bengaluru, Karnataka, India",
  email: "bs.pavankumar2005@gmail.com",
  phone: "9035661991",
  github: "github.com/BSP7",
  linkedin: "linkedin.com/in/b-s-pavan-kumar20051407/",
  stats: [
    { label: "CGPA", value: "7.60" },
    { label: "Projects Completed", value: "10+" },
    { label: "Certifications", value: "6" },
    { label: "Hackathons", value: "2" },
  ],
  education: {
    institution: "Garden City University, Bengaluru",
    degree: "Bachelor of Technology in Computer Science",
    duration: "Oct 2023 – Jul 2027",
    cgpa: "7.60 / 10.0"
  },
  skills: [
    {
      cat: "Security & Networking",
      icon: "Shield",
      desc: "Network security monitoring, vulnerability assessment, SIEM log analysis, and incident response fundamentals.",
      items: [
        { name: "Network Security Fundamentals", level: 92 },
        { name: "Vulnerability Assessment", level: 88 },
        { name: "Incident Response Fundamentals", level: 85 },
        { name: "SIEM & Log Monitoring", level: 86 },
        { name: "Wireshark", level: 90 },
        { name: "Nmap", level: 88 },
        { name: "Cryptography Fundamentals", level: 90 }
      ]
    },
    {
      cat: "Programming",
      icon: "Code2",
      desc: "Core languages for building performant security tooling, backend APIs, and smart contracts.",
      items: [
        { name: "Python", level: 94 },
        { name: "JavaScript", level: 90 },
        { name: "TypeScript", level: 86 },
        { name: "Solidity", level: 88 }
      ]
    },
    {
      cat: "AI / Machine Learning",
      icon: "Brain",
      desc: "Threat classification models, behavioral anomaly detection, computer vision, and NLP.",
      items: [
        { name: "Machine Learning", level: 90 },
        { name: "NLP (Natural Language Processing)", level: 84 },
        { name: "Computer Vision", level: 80 },
        { name: "Deep Learning", level: 82 }
      ]
    },
    {
      cat: "Blockchain",
      icon: "Link2",
      desc: "Smart contracts on Ethereum, decentralized authentication, and zero-knowledge cryptography.",
      items: [
        { name: "Ethereum", level: 88 },
        { name: "Smart Contracts", level: 90 },
        { name: "Web3.js", level: 85 },
        { name: "Zero-Knowledge Proofs", level: 84 }
      ]
    },
    {
      cat: "Cloud & Tools",
      icon: "Cloud",
      desc: "Infrastructure deployment, containerization, version control, and security workflows.",
      items: [
        { name: "AWS", level: 82 },
        { name: "Docker", level: 85 },
        { name: "Git", level: 92 },
        { name: "GitHub", level: 92 }
      ]
    },
    {
      cat: "Data Science",
      icon: "BarChart3",
      desc: "Data processing, predictive analytics, and statistical modeling for security telemetry.",
      items: [
        { name: "Data Analysis", level: 90 },
        { name: "Data Visualization", level: 88 },
        { name: "Predictive Analytics", level: 85 },
        { name: "Pandas", level: 90 },
        { name: "NumPy", level: 88 },
        { name: "Matplotlib", level: 86 }
      ]
    },
    {
      cat: "Soft Skills & Professional",
      icon: "Shield",
      desc: "Core professional strengths for engineering execution and cross-team collaboration.",
      items: [
        { name: "Attention to Detail", level: 95 },
        { name: "Problem-Solving", level: 92 },
        { name: "Responsiveness", level: 90 },
        { name: "Cross-Functional Collaboration", level: 88 },
        { name: "Time Management", level: 90 }
      ]
    }
  ],
  projects: [
    {
      id: "shadow-intent",
      title: "Shadow Intent",
      subtitle: "AI-Driven Real-Time Threat Detection Platform",
      period: "Mar 2026 – Present",
      type: "Personal Project",
      domains: "Cybersecurity, AI, Threat Detection, Machine Learning",
      desc: "An AI-driven platform for real-time threat detection and incident response. Implemented machine learning to identify suspicious network and user activity. Features a secure monitoring architecture with access logging, automated alerting, and parallelized backend processing that reduced security-event detection latency by approximately 30%.",
      architecture: "Python / Machine Learning inference pipeline with parallelized event queue, real-time heuristic anomaly detection, and automated threat triage alerts.",
      highlights: [
        "Reduced security-event detection latency by ~30% through optimized parallelization",
        "Uses threat modeling and anomaly detection for proactive defense",
        "Secure monitoring architecture with access logging & automated alerting"
      ],
      tech: ["Python", "Machine Learning", "AI", "Cybersecurity", "Threat Detection", "Parallelization"],
      github: "https://github.com/BSP7",
      demo: "https://github.com/BSP7",
      simType: "threat-detector",
      accent: "#10b981",
      threatScenarios: [
        { name: "SQL Injection Probe", type: "Web Exploit", payload: "' OR 1=1 -- -", confidence: 98.4, severity: "Critical", status: "Blocked & Quarantined (Latency: 14ms, -30% fast path)" },
        { name: "Brute Force SSH Attempt", type: "Auth Abuse", payload: "128 failed attempts in 4.2s (User: root)", confidence: 96.1, severity: "High", status: "IP Rate-Limited & Alert Dispatched" },
        { name: "DDoS Syn Flood Packet", type: "Network Volumetric", payload: "24,000 SYN packets/sec from subnet 192.168.4.0/24", confidence: 99.2, severity: "Critical", status: "Traffic Dropped via Heuristic Filter" },
        { name: "Standard API Request", type: "Normal Traffic", payload: "GET /api/v1/user/profile (200 OK)", confidence: 2.1, severity: "Safe", status: "Allowed" }
      ]
    },
    {
      id: "wallet-trust-auth",
      title: "Wallet Trust Auth",
      subtitle: "Blockchain Identity Authentication System",
      period: "Feb 2026",
      type: "Hackathon Project",
      domains: "Ethereum, Smart Contracts, Cryptography, Decentralized Identity",
      desc: "A blockchain-based identity authentication system built on Ethereum. Generates unique cryptographic hash keys for protecting sensitive identity data while preventing data leakage. Implements decentralized verification mechanisms to improve transparency and eliminate single points of failure.",
      architecture: "Ethereum smart contracts, Keccak-256 cryptographic identity hashing, and decentralized verification mechanisms ensuring zero leakage of sensitive identity attributes.",
      highlights: [
        "Cryptographic hash-key generation for protecting sensitive identity data",
        "Designed to prevent data leakage with tamper-proof verification",
        "Decentralized mechanisms eliminating single points of failure"
      ],
      tech: ["Ethereum", "Smart Contracts", "Cryptography", "Blockchain", "Web3.js"],
      github: "https://github.com/BSP7",
      demo: "https://github.com/BSP7",
      simType: "crypto-verifier",
      accent: "#06b6d4"
    },
    {
      id: "zero-knowledge-kyc",
      title: "Zero-Knowledge Proof KYC System",
      subtitle: "Privacy-Preserving Decentralized KYC Platform",
      period: "Apr 2026",
      type: "Hackathon Project — FUSION-X Hackathon, Presidency University",
      domains: "Blockchain, Smart Contracts, Authentication Systems, Zero-Knowledge Proofs",
      desc: "A decentralized KYC verification platform developed during a 36-hour hackathon at Presidency University. Implements Zero-Knowledge Proofs to enable identity verification without exposing sensitive user information. Engineered secure authentication workflows focused on privacy and presented the live solution to the FUSION-X Hackathon judging panel.",
      architecture: "36-hour hackathon prototype combining zk-SNARK constraint proofs, Ethereum smart contracts, and privacy-preserving credential attestations.",
      highlights: [
        "Developed during a 36-hour hackathon at Presidency University (FUSION-X)",
        "Implemented Zero-Knowledge Proofs to verify identity with zero PII exposure",
        "Successfully presented working solution to judging panel"
      ],
      tech: ["Blockchain", "Smart Contracts", "Authentication Systems", "Zero-Knowledge Proofs", "Cryptography"],
      github: "https://github.com/BSP7",
      demo: "https://github.com/BSP7",
      simType: "zkp-prover",
      accent: "#8b5cf6"
    }
  ],
  certs: [
    {
      id: "cert-1",
      name: "Introduction to Cybersecurity",
      org: "Certification",
      year: "2024",
      category: "Cybersecurity",
      credentialUrl: "https://github.com/BSP7",
      accent: "#10b981"
    },
    {
      id: "cert-2",
      name: "Blockchain Specialization",
      org: "Certification",
      year: "2024",
      category: "Blockchain",
      credentialUrl: "https://github.com/BSP7",
      accent: "#f59e0b"
    },
    {
      id: "cert-3",
      name: "Web3 and Blockchain Fundamentals",
      org: "Certification",
      year: "2024",
      category: "Blockchain",
      credentialUrl: "https://github.com/BSP7",
      accent: "#8b5cf6"
    },
    {
      id: "cert-4",
      name: "Data Science Essentials with Python",
      org: "Certification",
      year: "2024",
      category: "Data Science",
      credentialUrl: "https://github.com/BSP7",
      accent: "#ef4444"
    },
    {
      id: "cert-5",
      name: "An Introduction to Design Thinking",
      org: "Certification",
      year: "2024",
      category: "Design & Engineering",
      credentialUrl: "https://github.com/BSP7",
      accent: "#06b6d4"
    },
    {
      id: "cert-6",
      name: "Software Testing and Automation",
      org: "Certification",
      year: "2024",
      category: "Software Engineering",
      credentialUrl: "https://github.com/BSP7",
      accent: "#3b82f6"
    }
  ],
  hackathons: [
    {
      event: "Inceptrix 2.0 Hackathon",
      institution: "Jain (Deemed-to-be University)",
      result: "Top 20 Teams Finalist",
      year: "2026",
      project: "Wallet Trust Auth",
      desc: "Built a blockchain-based identity authentication system using Ethereum and cryptographic hash-keys to prevent data leakage and eliminate single points of failure."
    },
    {
      event: "FUSION-X Hackathon",
      institution: "Presidency University",
      result: "36-Hour Hackathon Project Showcase",
      year: "2026",
      project: "Zero-Knowledge Proof Based KYC Verification System",
      desc: "Developed and presented a decentralized KYC verification platform using Zero-Knowledge Proofs to verify identity without exposing sensitive information."
    }
  ],
  timeline: [
    {
      year: "Oct 2023",
      title: "Started B.Tech in Computer Science",
      org: "Garden City University, Bengaluru",
      category: "Education",
      desc: "Commenced undergraduate studies focusing on computer science, secure systems, algorithms, and mathematics (Maintained 7.60 CGPA)."
    },
    {
      year: "2024",
      title: "Cybersecurity & Data Science Certifications",
      org: "Independent Research & Industry Certifications",
      category: "Milestone",
      desc: "Completed certifications in Cybersecurity, Data Science with Python, Design Thinking, and Software Testing & Automation."
    },
    {
      year: "2025",
      title: "Blockchain & Web3 Security Specialization",
      org: "Blockchain Specialization & Web3 Fundamentals",
      category: "Milestone",
      desc: "Focused on Ethereum, Solidity smart contracts, EVM internals, and zero-knowledge cryptographic authentication."
    },
    {
      year: "Feb 2026",
      title: "Wallet Trust Auth & Inceptrix 2.0",
      org: "Jain (Deemed-to-be University)",
      category: "Hackathons",
      desc: "Developed Ethereum blockchain identity authentication system with cryptographic hash-key generation, placing in the Top 20."
    },
    {
      year: "Apr 2026",
      title: "FUSION-X Hackathon (36-Hour Sprint)",
      org: "Presidency University",
      category: "Hackathons",
      desc: "Engineered and presented the Zero-Knowledge Proof Based KYC Verification System to the academic & industry judging panel."
    },
    {
      year: "Mar 2026 – Present",
      title: "Shadow Intent — AI Threat Detection Platform",
      org: "Advanced Personal Project",
      category: "Projects",
      desc: "Architected real-time threat detection engine with parallelized processing, reducing incident detection latency by approximately 30%."
    },
    {
      year: "Jul 2027",
      title: "Expected B.Tech Graduation",
      org: "Garden City University, Bengaluru",
      category: "Education",
      desc: "Graduating with Bachelor of Technology in Computer Science (Targeting roles in Cybersecurity, AI Security, and Blockchain)."
    }
  ]
};
