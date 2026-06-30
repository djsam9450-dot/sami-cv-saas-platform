"use client";

import { motion } from "framer-motion";
import {
  FileCheck,
  Sparkles,
  Target,
  MessageSquare,
  Shield,
  Download,
  Palette,
  Zap,
  BarChart3,
  Globe,
  Lock,
  Users,
  TrendingUp,
} from "lucide-react";

const features = [
  {
    icon: FileCheck,
    title: "ATS-Optimized Templates",
    description: "50+ templates designed by HR experts to pass applicant tracking systems with 98%+ compatibility.",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    icon: Sparkles,
    title: "AI Resume Generator",
    description: "Generate professional summaries, bullet points, and skill descriptions that recruiters love.",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
  {
    icon: Target,
    title: "AI Job Detection",
    description: "Our AI automatically detects job requirements, keywords, and ATS criteria from any job description.",
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  {
    icon: MessageSquare,
    title: "Personalized Cover Letters",
    description: "Every cover letter is uniquely crafted for the specific job, company, and your experience.",
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
  },
  {
    icon: BarChart3,
    title: "ATS Score Analysis",
    description: "Real-time ATS scoring with detailed breakdowns for formatting, keywords, skills, and readability.",
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",
  },
  {
    icon: Zap,
    title: "One-Click Optimization",
    description: "Instantly optimize your entire CV for a specific job — improve wording, keywords, and structure.",
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
  },
  {
    icon: Palette,
    title: "Premium Templates",
    description: "Beautiful, customizable templates with color schemes, fonts, and layout options for every industry.",
    color: "text-indigo-500",
    bgColor: "bg-indigo-500/10",
  },
  {
    icon: Download,
    title: "Multi-Format Export",
    description: "Download your CV and cover letter as PDF, DOCX, TXT, HTML, or Markdown with preserved formatting.",
    color: "text-teal-500",
    bgColor: "bg-teal-500/10",
  },
  {
    icon: TrendingUp,
    title: "AI Match Score",
    description: "Compare your CV against job descriptions to see exactly how well you match each position.",
    color: "text-red-500",
    bgColor: "bg-red-500/10",
  },
  {
    icon: Globe,
    title: "Multi-Language Support",
    description: "Create CVs and cover letters for jobs worldwide with region-specific formatting and conventions.",
    color: "text-cyan-500",
    bgColor: "bg-cyan-500/10",
  },
  {
    icon: Lock,
    title: "Privacy First",
    description: "Your data is encrypted and private. We never share your information with third parties.",
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Share and collaborate on CVs with career coaches, mentors, and recruiters in real time.",
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4">
              <Sparkles className="h-3.5 w-3.5" />
              Everything You Need
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              Supercharged with AI for{" "}
              <span className="gradient-text">Maximum Impact</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              From intelligent job matching to one-click optimization, CV Genius AI gives you
              every tool needed to land your dream job.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="group relative rounded-2xl border bg-card p-6 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 transition-all duration-300"
            >
              <div className={`${feature.bgColor} w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <feature.icon className={`h-6 w-6 ${feature.color}`} />
              </div>
              <h3 className="font-semibold text-base mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
