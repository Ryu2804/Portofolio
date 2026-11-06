export type ProjectCategory = "MACHINE LEARNING" | "SOFTWARE ENGINEERING";

export interface Project {
  id: string;
  stage: string;
  category: ProjectCategory;
  score: string;
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
  email: "benedictusryugunawan@gmail.com",
  githubUsername: "Ryu2804", 
  instagram: "https://www.instagram.com/benedictus.ryu/",
  linkedin: "https://www.linkedin.com/in/benedictus-ryu-gunawan-644238374/",
  kaggle: "https://www.kaggle.com/benedictusryugunawan",
  location: "Surabaya, Indonesia",
} as const;

export const PROJECTS: Project[] = [
  {
    id: "garden-bunga",
    stage: "STAGE 01 • SPEECH AI",
    category: "MACHINE LEARNING",
    score: "Best Implementation",
    title: "GARDEN BUNGA",
    description:
      "An efficient hybrid sequence modeling system for Indonesian speech synthesis using multilingual knowledge transfer.",
    year: "2025",
    client: "Laboratory of Intelligent Computing and Vision",
    icon: "record_voice_over",
    coverGradient: "from-[#315b8c] via-[#23436a] to-[#413333]",
    badgeClass: "bg-primary text-on-primary",
    image: "/projects/GardenBunga.png",
    caseUrl: "https://masterzaff.github.io/gardenbunga/",
  },
  {
    id: "SiLaju",
    stage: "STAGE 02 • COMPUTER VISION",
    category: "SOFTWARE ENGINEERING",
    score: "Third Place",
    title: "SiLaju - Sistem Pelaporan Jalan Umum",
    description:
      "A ResNet-based road damage classification system combined with a Graph Neural Network to prioritize efficient road maintenance.",
    year: "2026",
    client: "DINACOM 11.0 (1st in qualifiers)",
    icon: "add_road",
    coverGradient: "from-[#f2765e] via-[#c9533d] to-[#413333]",
    badgeClass: "bg-secondary text-on-secondary",
    image: "/projects/SiLaju.png",
    caseUrl: "https://github.com/orgs/SILAJU-Hackathon/repositories",
  },
  {
    id: "post-disaster-segmentation",
    stage: "STAGE 03 • DISASTER AI",
    category: "MACHINE LEARNING",
    score: "Second Place",
    title: "POST-DISASTER SEGMENTATION",
    description:
      "A Siamese self-supervised learning model for segmenting damaged areas after disasters, evaluated against the xBD paper baseline.",
    year: "2026",
    client: "Unity #14",
    icon: "satellite_alt",
    coverGradient: "from-[#413333] via-[#315b8c] to-[#23436a]",
    badgeClass: "bg-tertiary-container text-on-tertiary-container",
    image: "/projects/DisasterSegmentation.png",
    caseUrl: "https://github.com/alfiwillianz/buildings/tree/main",
  },
  {
    id: "SiTukang",
    stage: "STAGE 04 • GENERATIVE AI",
    category: "SOFTWARE ENGINEERING",
    score: "Third Place",
    title: "SiTukang - Sistem Pemesanan Tukang",
    description:
      "A low-latency Retrieval-Augmented Generation pipeline integrated into a mobile application to support customer-worker peer-to-peer interactions.",
    year: "2026",
    client: "GUNADARMA CODE WEEK 2.0",
    icon: "smart_toy",
    coverGradient: "from-[#f7a592] via-[#f2765e] to-[#413333]",
    badgeClass: "bg-primary-container text-on-primary-container",
    image: "/projects/SiTukang.png",
    caseUrl: "https://github.com/orgs/UCGW-Hackathon/repositories",
  },
  {
    id: "indfood-clustering",
    stage: "STAGE 05 • REPRESENTATION LEARNING",
    category: "MACHINE LEARNING",
    score: "Best Implementation",
    title: "INDFOOD CLUSTERING",
    description:
      "Unsupervised clustering of 15 Indonesian local dishes with DINO features, UMAP, and K-Means: silhouette 0.6714, Davies-Bouldin 0.4707, trustworthiness 0.9639.",
    year: "2026",
    client: "Lab Based Education, ICV Lab",
    icon: "ramen_dining",
    coverGradient: "from-[#f7a592] via-[#f2765e] to-[#413333]",
    badgeClass: "bg-secondary text-on-secondary",
    image: "/projects/IndFood.png",
    caseUrl: "https://github.com/salsa-hanaa/indFood-clustering",
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
    coverGradient: "from-[#413333] via-[#315b8c] to-[#23436a]",
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
    coverGradient: "from-[#f7a592] via-[#f2765e] to-[#413333]",
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
    coverGradient: "from-[#f2765e] via-[#c9533d] to-[#413333]",
    badgeClass: "bg-secondary text-on-secondary",
    image: "/competition/GCW.JPG"
  },
  {
    id: "hology-9-fifth-place",
    badge: "5TH PLACE",
    points: "+500 PTS",
    title: "HOLOGY 9.0 Holomine Competition",
    issuer: "FACULTY OF COMPUTER SCIENCE, BRAWIJAYA UNIVERSITY",
    year: "2026",
    description:
      "Placed fifth in the Holomine data mining competition by solving real-world paddy field segmentation.",
    icon: "emoji_events",
    coverGradient: "from-[#315b8c] via-[#23436a] to-[#413333]",
    badgeClass: "bg-primary text-on-primary",
    image: "/competition/HOLOGY.png",
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
    coverGradient: "from-[#315b8c] via-[#23436a] to-[#413333]",
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
    coverGradient: "from-[#315b8c] via-[#f2765e] to-[#413333]",
    badgeClass: "bg-secondary-container text-on-secondary-container",
    image: "/competition/kcvanguard.webp",
  },
];

// From the CV (public/CV.pdf), newest first in each list
export interface TimelineEntry {
  id: string;
  role: string;
  org: string;
  period: string;
  points: string[];
}

export const WORK: TimelineEntry[] = [
  {
    id: "quzuu",
    role: "Backend Developer & Data Engineer",
    org: "Quzuu Indonesia",
    period: "Nov 2025 – now",
    points: [
      "Built a reliable ETL migration pipeline that moved 50,000+ questions with data integrity and consistency.",
      "Resolved 50+ technical tickets with Agile methodology, keeping delivery continuous.",
    ],
  },
];

export const ORGANIZATIONS: TimelineEntry[] = [
  {
    id: "hmtc-apprentice",
    role: "Research and Technology Department Apprentice",
    org: "HMTC ITS",
    period: "Oct 2026 – now",
    points: ["Works on the department's programs: Elite TC Champions, PKTI-TD, and SkenaIT."],
  },
  {
    id: "avalon",
    role: "Data Science and Artificial Intelligence Division",
    org: "Avalon AI Community",
    period: "Nov 2025 – now",
    points: [
      "Builds final projects on road prioritization with Graph Neural Networks and frontier computer vision.",
      "Qualified through 3 Avalon exams: Math for Machine Learning, Computer Vision, and GAN-Diffusion.",
    ],
  },
];

export const VOLUNTEERING: TimelineEntry[] = [
  {
    id: "ise-academy",
    role: "Data Science Mentor",
    org: "ISE! Academy ITS",
    period: "Sep 2026",
    points: [
      "Judged final projects from 74 teams, over 200 participants.",
      "Mentored 10+ teams through hands-on projects.",
    ],
  },
  {
    id: "schematics",
    role: "Data Science Competition Staff",
    org: "Schematics ITS",
    period: "May 2026 – now",
    points: [
      "Designed and evaluated the contest, with measures against cheating and data leakage.",
      "Worked with the other staff on the competition format and rules.",
      "Scraped data from the web and checked its quality for the qualification stage.",
    ],
  },
  {
    id: "elite-tc",
    role: "Volunteer, Elite TC Champions",
    org: "Research and Technology Department, HMTC ITS",
    period: "May 2026 – now",
    points: ["Keeps the latest competition information up to date."],
  },
];

export const EDUCATION: TimelineEntry[] = [
  {
    id: "its",
    role: "Artificial Intelligence Engineering (B.Sc.)",
    org: "Institut Teknologi Sepuluh Nopember",
    period: "Aug 2025 – now",
    points: [
      "GPA 4.00 / 4.00",
      "Focus: Artificial Intelligence, Data Science, Backend Development",
      "Assistant lecturer, EA234102 Fundamental Programming",
    ],
  },
  {
    id: "petra5",
    role: "Physics, Chemistry, Informatics, Advanced Mathematics",
    org: "Petra 5 Senior High School",
    period: "Jun 2022 – Jun 2025",
    points: [
      "Highest achiever in Advanced Mathematics and in Informatics",
      "Surabaya representative, National Science Olympiad in Informatics (OSN), East Java level",
    ],
  },
];

export const FILTERS = ["ALL", "MACHINE LEARNING", "SOFTWARE ENGINEERING"] as const;
export type Filter = (typeof FILTERS)[number];
