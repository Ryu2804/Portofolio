export type ProjectCategory = "MACHINE LEARNING" | "SOFTWARE ENGINEERING";

export interface Project {
  id: string;
  stage: string;
  category: ProjectCategory;
  categoryLabel: string;
  score: string;
  romId: string;
  title: string;
  description: string;
  year: string;
  client: string;
  icon: string;
  coverGradient: string;
  badgeClass: string;
  /** Opsional: foto sampul, cth "/projects/namafile.jpg" (file di public/). Kosongkan untuk pakai ikon. */
  image?: string;
  /** Opsional: URL case study (GitHub/demo/artikel) untuk tombol VIEW CASE. */
  caseUrl?: string;
}

export const PROFILE = {
  name: "Benedictus Ryu Gunawan",
  major: "Artificial Intelligence Engineering",
  role: "LEAD CREATIVE OPERATOR",
  rank: "Artificial Intelligence Researcher",
  bio: "Equipped with 9+ years crafting tactile visual identities, high-impact poster systems, and retro-futurist interfaces for pioneering creators.",
  projectsCompleted: "142 STAGES",
  hiScore: "999,990 PTS",
  status: "OPEN FOR CONTRACT",
  email: "benedictusryugunawan@gmail.com",
  githubUsername: "Ryu2804", 
  instagram: "https://www.instagram.com/benedictus.ryu/",
  linkedin: "https://www.linkedin.com/in/benedictus-ryu-gunawan-644238374/",
  kaggle: "https://www.kaggle.com/benedictusryugunawan",
} as const;

export const PROJECTS: Project[] = [
  {
    id: "garden-bunga",
    stage: "STAGE 01 • SPEECH AI",
    category: "MACHINE LEARNING",
    categoryLabel: "SPEECH SYNTHESIS",
    score: "Best Implementation",
    romId: "#001-TTS",
    title: "GARDEN BUNGA",
    description:
      "An efficient hybrid sequence modeling system for Indonesian speech synthesis using multilingual knowledge transfer.",
    year: "2025",
    client: "Laboratory of Intelligent Computing and Vision",
    icon: "record_voice_over",
    coverGradient: "from-[#d23f40] via-[#974721] to-[#360f00]",
    badgeClass: "bg-primary text-on-primary",
    image: "/projects/GardenBunga.png",
    caseUrl: "https://masterzaff.github.io/gardenbunga/",
  },
  {
    id: "SiLaju",
    stage: "STAGE 02 • COMPUTER VISION",
    category: "SOFTWARE ENGINEERING",
    categoryLabel: "VISION & GNN",
    score: "Third Place",
    romId: "#002-RDM",
    title: "SiLaju - Sistem Pelaporan Jalan Umum",
    description:
      "A ResNet-based road damage classification system combined with a Graph Neural Network to prioritize efficient road maintenance.",
    year: "2026",
    client: "DINACOM 11.0",
    icon: "add_road",
    coverGradient: "from-[#ff996c] via-[#974721] to-[#772f09]",
    badgeClass: "bg-secondary text-on-secondary",
    image: "/projects/SiLaju.png",
    caseUrl: "https://github.com/orgs/SILAJU-Hackathon/repositories",
  },
  {
    id: "post-disaster-segmentation",
    stage: "STAGE 03 • DISASTER AI",
    category: "MACHINE LEARNING",
    categoryLabel: "SELF-SUPERVISED VISION",
    score: "Second Place",
    romId: "#003-SSL",
    title: "POST-DISASTER SEGMENTATION",
    description:
      "A Siamese self-supervised learning model for segmenting damaged areas after disasters, evaluated against the xBD paper baseline.",
    year: "2026",
    client: "Unity #14",
    icon: "satellite_alt",
    coverGradient: "from-[#eec063] via-[#946f18] to-[#261900]",
    badgeClass: "bg-tertiary-container text-on-tertiary-container",
    image: "/projects/DisasterSegmentation.png",
    caseUrl: "https://github.com/alfiwillianz/buildings/tree/main",
  },
  {
    id: "SiTukang",
    stage: "STAGE 04 • GENERATIVE AI",
    category: "SOFTWARE ENGINEERING",
    categoryLabel: "MOBILE RAG",
    score: "Third Place",
    romId: "#004-RAG",
    title: "SiTukang - Sistem Pemesanan Tukang",
    description:
      "A low-latency Retrieval-Augmented Generation pipeline integrated into a mobile application to support customer-worker peer-to-peer interactions.",
    year: "2026",
    client: "GUNADARMA CODE WEEK 2.0",
    icon: "smart_toy",
    coverGradient: "from-[#ffb3ae] via-[#d23f40] to-[#410005]",
    badgeClass: "bg-primary-container text-on-primary-container",
    image: "/projects/SiTukang.png",
    caseUrl: "https://github.com/orgs/UCGW-Hackathon/repositories",
  },
];

export interface SkillCategory {
  id: string;
  title: string;
  icon: string;
  level: string;
  skills: string[];
  accentClass: string;
}

// ← Edit skill kamu di sini: tambah/kurangi kategori & isi skills per bidang
export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "ml",
    title: "Data Science & Machine Learning",
    icon: "neurology",
    level: "LVL 87",
    skills: [
      "Python",
      "PyTorch",
      "Scikit-learn",
      "OpenCV",
      "YOLO",
      "LoRA / LoRA+",
      "BitsAndBytes",
      "Hugging Face",
    ],
    accentClass: "bg-primary text-on-primary",
  },
  {
    id: "Software Engineering",
    title: "Software Engineering",
    icon: "dns",
    level: "LVL 77",
    skills: [
      "Golang-Gin",
      "Python FastAPI",
      "GORM",
      "PostgreSQL", 
      "Github Actions", 
      "Docker", 
      "TypeScript", 
      "Next.js", 
    ],
    accentClass: "bg-secondary text-on-secondary",
  },
  {
    id: "algo-math",
    title: "Algorithm & Mathematics",
    icon: "calculate",
    level: "LVL 75",
    skills: [
      "Data Structures",
      "Linear Algebra",
      "Statistics",
      "Optimization",
      "Probability",
      "Calculus",
      "Computational Intelligence",
      "Discrete Mathemeatics",
      "Algorithm Design & Analysis"
    ],
    accentClass: "bg-tertiary-container text-on-tertiary-container",
  },
];

export interface Achievement {
  id: string;
  badge: string;
  points: string;
  title: string;
  issuer: string;
  year: string;
  description: string;
  icon: string;
  coverGradient: string;
  badgeClass: string;
  /** Opsional: foto sampul, cth "/competition/juara.jpg" (file di public/). Kosongkan untuk pakai ikon. */
  image?: string;
}

// ← Edit achievements kamu di sini
export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "unity-14-runner-up",
    badge: "2ND PLACE",
    points: "+1000 PTS",
    title: "Data Mining Competition UNITY#14",
    issuer: "YOGYAKARTA STATE UNIVERSITY",
    year: "2026",
    description:
      "Developed a Siamese self-supervised learning model for post-disaster damage segmentation, achieving a 6% average improvement over the xBD paper baseline.",
    icon: "emoji_events",
    coverGradient: "from-[#eec063] via-[#946f18] to-[#261900",
    badgeClass: "bg-tertiary-container text-on-tertiary-container",
    image: "/competition/unity.jpeg",
  },
  {
    id: "dinacom-11-third-place",
    badge: "3RD PLACE",
    points: "+750 PTS",
    title: "Hackathon DINACOM 11.0",
    issuer: "DIAN NUSWANTORO UNIVERSITY",
    year: "2026",
    description:
      "Built a ResNet-based road damage classifier with 97% accuracy and a Graph Neural Network to prioritize road maintenance.",
    icon: "military_tech",
    coverGradient: "from-[#ffb3ae] via-[#d23f40] to-[#410005]",
    badgeClass: "bg-primary text-on-primary",
    image: "/competition/dinacom.jpeg",
  },
  {
    id: "gunadarma-code-week-third-place",
    badge: "3RD PLACE",
    points: "+600 PTS",
    title: "Gunadarma Code Week 2.0",
    issuer: "GUNADARMA UNIVERSITY",
    year: "2026",
    description:
      "Integrated a low-latency Retrieval-Augmented Generation pipeline into a mobile application for customer-worker peer-to-peer support.",
    icon: "workspace_premium",
    coverGradient: "from-[#ff996c] via-[#974721] to-[#772f09]",
    badgeClass: "bg-secondary text-on-secondary",
    image: "/competition/GCW.JPG"
  },
  {
    id: "statistic-explore-finalist",
    badge: "FINALIST",
    points: "+400 PTS",
    title: "Big Data Challenge Statistic Explore",
    issuer: "UNIVERSITAS SYIAH KUALA",
    year: "2025",
    description:
      "Ranked third in the qualifier stage with a 0.421838 private Macro-F1 score by addressing severe missing data and class imbalance.",
    icon: "leaderboard",
    coverGradient: "from-[#d23f40] via-[#974721] to-[#360f00]",
    badgeClass: "bg-primary-container text-on-primary-container",
    image: "/competition/statexplore.png",
  },
  {
    id: "kcvanguard-best-implementation",
    badge: "BEST PROJECT",
    points: "+300 PTS",
    title: "KCVanguard Implementation Project",
    issuer: "INTELLIGENT COMPUTING AND VISION LABORATORY",
    year: "2026",
    description:
      "Received the Best Implementation Project recognition for Garden Bunga, an efficient Indonesian speech synthesis system using multilingual knowledge transfer.",
    icon: "verified",
    coverGradient: "from-[#ffb596] via-[#ff996c] to-[#79310b]",
    badgeClass: "bg-secondary-container text-on-secondary-container",
    image: "/competition/kcvanguard.webp",
  },
];

export const FILTERS = ["ALL", "MACHINE LEARNING", "SOFTWARE ENGINEERING"] as const;
export type Filter = (typeof FILTERS)[number];
