"use client";

import { motion } from "framer-motion";
import { ClipboardList, Wand2, FileCheck, Send } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: ClipboardList,
    title: "Paste Job Description",
    description: "Copy and paste any job description. Our AI instantly detects the role, industry, required skills, and ATS keywords.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    number: "02",
    icon: Wand2,
    title: "AI Builds Your CV",
    description: "Enter your experience and our AI generates a professional, ATS-optimized CV tailored specifically to the job.",
    color: "from-purple-500 to-pink-500",
  },
  {
    number: "03",
    icon: FileCheck,
    title: "Review & Optimize",
    description: "See your ATS score, keyword matches, and get smart suggestions. One click to optimize everything automatically.",
    color: "from-green-500 to-teal-500",
  },
  {
    number: "04",
    icon: Send,
    title: "Download & Apply",
    description: "Export as PDF, DOCX, or TXT. Your CV and cover letter are perfectly formatted and ready to send.",
    color: "from-orange-500 to-red-500",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 sm:py-32 bg-muted/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4">
              Simple Process
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              How It{" "}
              <span className="gradient-text">Works</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              From job description to interview-ready CV in under 5 minutes.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="relative"
            >
              <div className="text-center">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} text-white shadow-lg mb-4`}>
                  <step.icon className="h-7 w-7" />
                </div>
                <div className="text-4xl font-bold text-muted-foreground/20 mb-2">{step.number}</div>
                <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[calc(50%+3rem)] w-[calc(100%-6rem)]">
                  <div className="border-t-2 border-dashed border-muted-foreground/20 w-full" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
