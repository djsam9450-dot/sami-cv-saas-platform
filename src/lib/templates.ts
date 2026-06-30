export interface TemplateCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface TemplateFont {
  family: string;
  category: "serif" | "sans-serif" | "monospace";
}

export interface Template {
  id: string;
  name: string;
  category: string;
  description: string;
  isPremium: boolean;
  rating: number;
  colors: string[];
  fonts: TemplateFont[];
  thumbnailColor: string;
}

export const templateCategories: TemplateCategory[] = [
  { id: "ats-friendly", name: "ATS Friendly", description: "Optimized for applicant tracking systems", icon: "FileCheck" },
  { id: "corporate", name: "Corporate", description: "Professional and business-oriented", icon: "Building2" },
  { id: "executive", name: "Executive", description: "Senior leadership and C-suite", icon: "Crown" },
  { id: "minimal", name: "Minimal", description: "Clean and understated designs", icon: "Minus" },
  { id: "modern", name: "Modern", description: "Contemporary and fresh layouts", icon: "Sparkles" },
  { id: "creative", name: "Creative", description: "Bold and artistic designs", icon: "Palette" },
  { id: "professional", name: "Professional", description: "Traditional and polished", icon: "Briefcase" },
  { id: "academic", name: "Academic", description: "Research and education focused", icon: "GraduationCap" },
  { id: "finance", name: "Finance", description: "Banking and financial sector", icon: "Landmark" },
  { id: "marketing", name: "Marketing", description: "Marketing and brand roles", icon: "Megaphone" },
  { id: "sales", name: "Sales", description: "Sales and business development", icon: "TrendingUp" },
  { id: "engineering", name: "Engineering", description: "Technical and engineering roles", icon: "Wrench" },
  { id: "healthcare", name: "Healthcare", description: "Medical and health professions", icon: "HeartPulse" },
  { id: "it", name: "IT", description: "Information technology", icon: "Monitor" },
  { id: "customer-service", name: "Customer Service", description: "Support and service roles", icon: "Headphones" },
  { id: "hospitality", name: "Hospitality", description: "Hotels and tourism", icon: "Hotel" },
  { id: "government", name: "Government", description: "Public sector roles", icon: "Shield" },
  { id: "legal", name: "Legal", description: "Law and legal professions", icon: "Scale" },
  { id: "education", name: "Education", description: "Teaching and academia", icon: "BookOpen" },
  { id: "graduate", name: "Graduate", description: "Entry-level and new grads", icon: "UserCheck" },
  { id: "internship", name: "Internship", description: "Internship applications", icon: "Rocket" },
  { id: "freelancer", name: "Freelancer", description: "Independent professionals", icon: "Zap" },
];

function makeTemplate(
  id: string,
  name: string,
  category: string,
  description: string,
  isPremium: boolean,
  rating: number,
  colors: string[],
  fonts: string[],
  thumbnailColor: string
): Template {
  return {
    id,
    name,
    category,
    description,
    isPremium,
    rating,
    colors,
    fonts: fonts.map((f) => ({ family: f, category: f.includes("Serif") || f.includes("Times") || f.includes("Georgia") ? "serif" as const : f.includes("Mono") || f.includes("Courier") ? "monospace" as const : "sans-serif" as const })),
    thumbnailColor,
  };
}

export const templates: Template[] = [
  // ATS Friendly (8)
  makeTemplate("ats-modern", "ATS Modern", "ats-friendly", "Clean, scannable layout optimized for all ATS systems", false, 5, ["#1a1a2e", "#16213e", "#0f3460"], ["Inter", "System UI"], "#1a1a2e"),
  makeTemplate("ats-classic", "ATS Classic", "ats-friendly", "Traditional ATS-friendly format with clear hierarchy", false, 4.5, ["#2d2d2d", "#4a4a4a", "#666666"], ["Arial", "Georgia"], "#2d2d2d"),
  makeTemplate("ats-pro", "ATS Pro", "ats-friendly", "Professional ATS-optimized with keyword emphasis", true, 5, ["#1e293b", "#334155", "#475569"], ["Inter", "Calibri"], "#1e293b"),
  makeTemplate("ats-simple", "ATS Simple", "ats-friendly", "Minimal ATS design with maximum compatibility", false, 4, ["#333333", "#555555", "#777777"], ["Helvetica", "Arial"], "#333333"),
  makeTemplate("ats-bold", "ATS Bold", "ats-friendly", "Bold headers that ATS systems love to parse", true, 4.5, ["#0f172a", "#1e293b", "#3b82f6"], ["Inter", "Roboto"], "#0f172a"),
  makeTemplate("ats-clean", "ATS Clean", "ats-friendly", "Crystal clear structure for perfect parsing", false, 4.5, ["#18181b", "#27272a", "#3f3f46"], ["Inter", "Segoe UI"], "#18181b"),
  makeTemplate("ats-smart", "ATS Smart", "ats-friendly", "Intelligent layout with keyword optimization zones", true, 4.5, ["#0c0a09", "#1c1917", "#44403c"], ["Lato", "Inter"], "#0c0a09"),
  makeTemplate("ats-elite", "ATS Elite", "ats-friendly", "Premium ATS template with enhanced scannability", true, 5, ["#020617", "#0f172a", "#1d4ed8"], ["Inter", "System UI"], "#020617"),

  // Corporate (5)
  makeTemplate("corp-blue", "Corporate Blue", "corporate", "Trustworthy blue-themed corporate design", false, 4.5, ["#1e3a5f", "#2c5282", "#3182ce"], ["Lato", "Merriweather"], "#1e3a5f"),
  makeTemplate("corp-navy", "Corporate Navy", "corporate", "Professional navy with gold accents", true, 4.5, ["#0a1929", "#001e3c", "#b8860b"], ["Inter", "Playfair Display"], "#0a1929"),
  makeTemplate("corp-gray", "Corporate Gray", "corporate", "Elegant gray-scale corporate layout", false, 4, ["#374151", "#4b5563", "#6b7280"], ["Inter", "Lora"], "#374151"),
  makeTemplate("corp-green", "Corporate Green", "corporate", "Fresh corporate green for finance and consulting", true, 4, ["#064e3b", "#047857", "#059669"], ["Lato", "Inter"], "#064e3b"),
  makeTemplate("corp-white", "Corporate White", "corporate", "Clean white corporate with subtle accents", false, 4.5, ["#111827", "#374151", "#3b82f6"], ["Inter", "Georgia"], "#111827"),

  // Executive (3)
  makeTemplate("executive-gold", "Executive Gold", "executive", "Premium gold-accented executive template", true, 5, ["#1a1a1a", "#2d2d2d", "#d4af37"], ["Playfair Display", "Inter"], "#1a1a1a"),
  makeTemplate("executive-dark", "Executive Dark", "executive", "Sophisticated dark theme for senior leaders", true, 5, ["#0a0a0a", "#1a1a1a", "#c9a961"], ["Cormorant Garamond", "Lato"], "#0a0a0a"),
  makeTemplate("executive-classic", "Executive Classic", "executive", "Timeless executive layout with refined typography", true, 4.5, ["#1c1917", "#292524", "#78716c"], ["Georgia", "Inter"], "#1c1917"),

  // Minimal (4)
  makeTemplate("minimal-air", "Minimal Air", "minimal", "Light and airy minimal design", false, 4.5, ["#fafafa", "#e5e5e5", "#404040"], ["Inter", "DM Sans"], "#fafafa"),
  makeTemplate("minimal-line", "Minimal Line", "minimal", "Clean lines with subtle separators", false, 4, ["#ffffff", "#f5f5f5", "#262626"], ["DM Sans", "Inter"], "#ffffff"),
  makeTemplate("minimal-dot", "Minimal Dot", "minimal", "Minimal with elegant dot accents", true, 4.5, ["#ffffff", "#fafafa", "#171717"], ["Space Grotesk", "Inter"], "#ffffff"),
  makeTemplate("minimal-mono", "Minimal Mono", "minimal", "Monochromatic minimal with emphasis on whitespace", false, 4, ["#ffffff", "#e5e5e5", "#171717"], ["Inter", "Helvetica"], "#ffffff"),

  // Modern (5)
  makeTemplate("modern-gradient", "Modern Gradient", "modern", "Vibrant gradient accents on modern layout", true, 5, ["#4f46e5", "#7c3aed", "#a855f7"], ["Inter", "Poppins"], "#4f46e5"),
  makeTemplate("modern-split", "Modern Split", "modern", "Split panel modern design with sidebar", true, 4.5, ["#0f172a", "#3b82f6", "#f8fafc"], ["Poppins", "Inter"], "#0f172a"),
  makeTemplate("modern-card", "Modern Card", "modern", "Card-based modern layout with shadows", false, 4.5, ["#ffffff", "#f1f5f9", "#0284c7"], ["Inter", "Space Grotesk"], "#ffffff"),
  makeTemplate("modern-neon", "Modern Neon", "modern", "Neon accent modern design for tech roles", true, 4, ["#0a0a0a", "#00ff88", "#222222"], ["Space Grotesk", "Inter"], "#0a0a0a"),
  makeTemplate("modern-glass", "Modern Glass", "modern", "Glassmorphism-inspired modern template", true, 5, ["#ffffff", "#f0f0f0", "#6366f1"], ["Inter", "Plus Jakarta Sans"], "#ffffff"),

  // Creative (4)
  makeTemplate("creative-color", "Creative Color", "creative", "Bold and colorful creative template", true, 4.5, ["#ff6b6b", "#4ecdc4", "#45b7d1"], ["Poppins", "Caveat"], "#ff6b6b"),
  makeTemplate("creative-brush", "Creative Brush", "creative", "Artistic design for creative professionals", true, 4, ["#2d1b69", "#e86389", "#ffd700"], ["Raleway", "Playfair Display"], "#2d1b69"),
  makeTemplate("creative-grid", "Creative Grid", "creative", "Grid-based creative layout for designers", true, 4, ["#111111", "#ff4444", "#f5f5f5"], ["Montserrat", "Inter"], "#111111"),
  makeTemplate("creative-wave", "Creative Wave", "creative", "Flowing creative design with organic shapes", true, 4.5, ["#0c0c1d", "#7c3aed", "#06b6d4"], ["Quicksand", "Inter"], "#0c0c1d"),

  // Professional (4)
  makeTemplate("pro-classic", "Professional Classic", "professional", "Timeless professional design for any industry", false, 4.5, ["#1a1a2e", "#16213e", "#e94560"], ["Lora", "Inter"], "#1a1a2e"),
  makeTemplate("pro-serif", "Professional Serif", "professional", "Serif-forward design for traditional industries", false, 4, ["#2c1810", "#4a3728", "#8b6914"], ["Georgia", "Arial"], "#2c1810"),
  makeTemplate("pro-clean", "Professional Clean", "professional", "Spotless professional layout with perfect spacing", true, 4.5, ["#ffffff", "#f8fafc", "#0f172a"], ["Inter", "Merriweather"], "#ffffff"),
  makeTemplate("pro-bold", "Professional Bold", "professional", "Confident bold professional design", true, 4, ["#171717", "#262626", "#dc2626"], ["Inter", "Lato"], "#171717"),

  // Academic (2)
  makeTemplate("academic-traditional", "Academic Traditional", "academic", "Traditional academic CV format", false, 4, ["#2d3748", "#4a5568", "#718096"], ["Times New Roman", "Arial"], "#2d3748"),
  makeTemplate("academic-modern", "Academic Modern", "academic", "Modern academic with research emphasis", true, 4.5, ["#1a202c", "#2d3748", "#4299e1"], ["Inter", "Georgia"], "#1a202c"),

  // Finance (2)
  makeTemplate("finance-blue", "Finance Blue", "finance", "Conservative finance with navy accents", false, 4.5, ["#0a1628", "#1a2a4a", "#2563eb"], ["Inter", "Georgia"], "#0a1628"),
  makeTemplate("finance-dark", "Finance Dark", "finance", "Dark finance template for banking", true, 4, ["#0f0f0f", "#1a1a1a", "#d4af37"], ["Lato", "Playfair Display"], "#0f0f0f"),

  // Marketing (2)
  makeTemplate("marketing-bold", "Marketing Bold", "marketing", "Bold marketing template with impact", true, 4, ["#ff6b35", "#f7c59f", "#2b2d42"], ["Poppins", "Inter"], "#ff6b35"),
  makeTemplate("marketing-clean", "Marketing Clean", "marketing", "Clean marketing layout with data emphasis", false, 4, ["#ffffff", "#f0f4f8", "#e11d48"], ["Inter", "DM Sans"], "#ffffff"),

  // Sales (2)  
  makeTemplate("sales-impact", "Sales Impact", "sales", "High-impact sales template with numbers focus", true, 4, ["#1a1a2e", "#e94560", "#0f3460"], ["Inter", "Montserrat"], "#1a1a2e"),
  makeTemplate("sales-pro", "Sales Pro", "sales", "Professional sales layout with achievement emphasis", false, 4, ["#ffffff", "#f0f0f0", "#2563eb"], ["Lato", "Inter"], "#ffffff"),

  // Engineering (3)
  makeTemplate("eng-tech", "Engineering Tech", "engineering", "Technical layout for engineering roles", false, 4.5, ["#0d1117", "#161b22", "#58a6ff"], ["JetBrains Mono", "Inter"], "#0d1117"),
  makeTemplate("eng-clean", "Engineering Clean", "engineering", "Clean technical layout with skill matrices", true, 4.5, ["#ffffff", "#f6f8fa", "#0969da"], ["Inter", "Fira Code"], "#ffffff"),
  makeTemplate("eng-dark", "Engineering Dark", "engineering", "Dark mode engineering template", true, 4, ["#0a0e14", "#1a1f2b", "#39bae6"], ["Inter", "JetBrains Mono"], "#0a0e14"),

  // Healthcare (2)
  makeTemplate("health-compassion", "Healthcare Compassion", "healthcare", "Warm and professional healthcare design", true, 4, ["#1a3a4a", "#2d6a8a", "#48cae4"], ["Inter", "Merriweather"], "#1a3a4a"),
  makeTemplate("health-clean", "Healthcare Clean", "healthcare", "Clean medical professional layout", false, 4.5, ["#ffffff", "#e8f4f8", "#0077b6"], ["Inter", "Lora"], "#ffffff"),

  // IT (2)
  makeTemplate("it-modern", "IT Modern", "it", "Modern IT template with tech aesthetic", false, 4.5, ["#0f172a", "#1e293b", "#38bdf8"], ["Inter", "Fira Code"], "#0f172a"),
  makeTemplate("it-dark", "IT Dark", "it", "Dark theme IT professional template", true, 4, ["#09090b", "#18181b", "#22c55e"], ["JetBrains Mono", "Inter"], "#09090b"),

  // Customer Service (2)
  makeTemplate("cs-warm", "Customer Service Warm", "customer-service", "Warm and approachable CS template", false, 4, ["#7c2d12", "#9a3412", "#fb923c"], ["Inter", "Lato"], "#7c2d12"),
  makeTemplate("cs-pro", "Customer Service Pro", "customer-service", "Professional customer service layout", true, 4, ["#1e293b", "#334155", "#f59e0b"], ["Inter", "DM Sans"], "#1e293b"),

  // Hospitality (2)
  makeTemplate("hosp-elegant", "Hospitality Elegant", "hospitality", "Elegant hospitality industry template", true, 4, ["#2d1b4e", "#4a2d6e", "#c9a961"], ["Playfair Display", "Inter"], "#2d1b4e"),
  makeTemplate("hosp-warm", "Hospitality Warm", "hospitality", "Warm and inviting hospitality layout", false, 4, ["#5c3d2e", "#8b5e3c", "#f4a460"], ["Lora", "Inter"], "#5c3d2e"),

  // Government (1)
  makeTemplate("gov-classic", "Government Classic", "government", "Formal government application template", false, 4, ["#1a1a2e", "#2d2d44", "#4a6741"], ["Times New Roman", "Arial"], "#1a1a2e"),

  // Legal (2)
  makeTemplate("legal-classic", "Legal Classic", "legal", "Traditional legal professional template", false, 4.5, ["#1a1a1a", "#333333", "#8b0000"], ["Times New Roman", "Georgia"], "#1a1a1a"),
  makeTemplate("legal-modern", "Legal Modern", "legal", "Modern legal template with classic touches", true, 4, ["#0f172a", "#1e293b", "#b45309"], ["Inter", "Lora"], "#0f172a"),

  // Education (2)
  makeTemplate("edu-warm", "Education Warm", "education", "Warm education professional template", false, 4, ["#2d4a3e", "#3d6a52", "#8fbc8f"], ["Inter", "Georgia"], "#2d4a3e"),
  makeTemplate("edu-modern", "Education Modern", "education", "Modern education layout with impact", true, 4, ["#1e3a5f", "#2c5282", "#63b3ed"], ["Inter", "Merriweather"], "#1e3a5f"),

  // Graduate (2)
  makeTemplate("grad-fresh", "Graduate Fresh", "graduate", "Fresh graduate template for entry level", false, 4.5, ["#ffffff", "#f0f9ff", "#0284c7"], ["Inter", "DM Sans"], "#ffffff"),
  makeTemplate("grad-bold", "Graduate Bold", "graduate", "Bold graduate template to stand out", true, 4, ["#ffffff", "#f5f5f5", "#7c3aed"], ["Poppins", "Inter"], "#ffffff"),

  // Internship (2)
  makeTemplate("intern-bright", "Internship Bright", "internship", "Bright and eager internship template", false, 4, ["#ffffff", "#fef3c7", "#d97706"], ["Inter", "Lato"], "#ffffff"),
  makeTemplate("intern-pro", "Internship Pro", "internship", "Professional internship application layout", true, 4, ["#ffffff", "#f0f9ff", "#2563eb"], ["Inter", "DM Sans"], "#ffffff"),

  // Freelancer (2)
  makeTemplate("freelance-portfolio", "Freelancer Portfolio", "freelancer", "Portfolio-style freelancer template", true, 4.5, ["#18181b", "#27272a", "#a855f7"], ["Space Grotesk", "Inter"], "#18181b"),
  makeTemplate("freelance-creative", "Freelancer Creative", "freelancer", "Creative freelancer template with flair", true, 4, ["#ffffff", "#fafafa", "#ec4899"], ["Poppins", "Inter"], "#ffffff"),
];

export function getTemplateById(id: string): Template | undefined {
  return templates.find((t) => t.id === id);
}

export function getTemplatesByCategory(categoryId: string): Template[] {
  return templates.filter((t) => t.category === categoryId);
}

export function getRecommendedTemplates(jobCategory: string): Template[] {
  const categoryMap: Record<string, string[]> = {
    "customer service": ["ats-modern", "cs-warm", "cs-pro", "corp-blue", "pro-classic"],
    "call center": ["ats-modern", "cs-warm", "cs-pro", "corp-blue", "pro-classic"],
    "software engineer": ["eng-tech", "eng-clean", "eng-dark", "modern-gradient", "it-modern"],
    "developer": ["eng-tech", "eng-clean", "modern-gradient", "it-modern", "minimal-air"],
    "designer": ["creative-color", "creative-grid", "modern-gradient", "creative-wave", "modern-glass"],
    "marketing": ["marketing-bold", "marketing-clean", "modern-gradient", "creative-color", "corp-green"],
    "sales": ["sales-impact", "sales-pro", "corp-blue", "pro-bold", "modern-split"],
    "finance": ["finance-blue", "finance-dark", "corp-navy", "corp-blue", "executive-gold"],
    "healthcare": ["health-compassion", "health-clean", "pro-clean", "corp-white", "academic-modern"],
    "executive": ["executive-gold", "executive-dark", "executive-classic", "corp-navy", "pro-bold"],
    "legal": ["legal-classic", "legal-modern", "pro-serif", "corp-navy", "executive-classic"],
    "education": ["edu-warm", "edu-modern", "academic-modern", "academic-traditional", "pro-clean"],
    "engineering": ["eng-tech", "eng-clean", "eng-dark", "modern-gradient", "it-modern"],
    "it": ["it-modern", "it-dark", "eng-tech", "modern-neon", "modern-glass"],
    "hospitality": ["hosp-elegant", "hosp-warm", "cs-warm", "pro-clean", "corp-white"],
    "government": ["gov-classic", "pro-classic", "ats-classic", "corp-gray", "pro-serif"],
  };

  const category = jobCategory.toLowerCase();
  const templateIds = categoryMap[category] || ["ats-modern", "corp-blue", "pro-classic", "modern-card", "minimal-air"];
  return templateIds.map((id) => getTemplateById(id)).filter(Boolean) as Template[];
}

export function getRecommendedCoverLetterTemplates(jobCategory: string): string[] {
  const categoryMap: Record<string, string[]> = {
    "customer service": ["Professional", "Formal Business", "Customer Service", "Corporate"],
    "call center": ["Professional", "Formal Business", "Customer Service", "Corporate"],
    "software engineer": ["Modern Tech", "Clean Professional", "Creative", "Minimal"],
    "developer": ["Modern Tech", "Clean Professional", "Creative", "Minimal"],
    "designer": ["Creative", "Modern", "Portfolio Style", "Minimal"],
    "marketing": ["Creative", "Bold", "Professional", "Modern"],
    "sales": ["Professional", "Bold", "Results-Focused", "Corporate"],
    "finance": ["Formal Business", "Traditional", "Professional", "Conservative"],
    "healthcare": ["Compassionate", "Professional", "Clean", "Traditional"],
    "executive": ["Executive", "Formal Business", "Professional", "Traditional"],
    "legal": ["Formal Business", "Traditional", "Professional", "Conservative"],
    "education": ["Professional", "Warm", "Traditional", "Clean"],
    "engineering": ["Clean Professional", "Technical", "Modern", "Minimal"],
    "it": ["Modern Tech", "Technical", "Clean Professional", "Minimal"],
    "hospitality": ["Warm Professional", "Customer-Focused", "Elegant", "Clean"],
    "government": ["Formal", "Traditional", "Professional", "Conservative"],
  };

  return categoryMap[jobCategory.toLowerCase()] || ["Professional", "Clean Professional", "Modern", "Formal Business"];
}
