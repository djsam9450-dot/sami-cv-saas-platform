"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "What makes CV Genius AI different from other CV builders?",
    answer: "CV Genius AI uses advanced AI to analyze job descriptions in real-time, detecting ATS keywords, required skills, and industry-specific criteria. Unlike traditional builders, our platform actively optimizes your CV for each specific job application, giving you a personalized match score and one-click optimization.",
  },
  {
    question: "Is my data secure and private?",
    answer: "Absolutely. We use enterprise-grade encryption for all data. Your CVs, cover letters, and personal information are never shared with third parties. We comply with GDPR and global privacy regulations. You can delete your data at any time.",
  },
  {
    question: "How accurate is the ATS score?",
    answer: "Our ATS scoring algorithm is based on extensive research of major ATS systems (Workday, Greenhouse, Lever, Taleo, etc.). While we achieve high accuracy, the score is an estimate based on best practices. ATS systems vary, and no tool can guarantee 100% compatibility with every system.",
  },
  {
    question: "Does the AI invent or fabricate information?",
    answer: "No. CV Genius AI only rewrites, optimizes, and formats the information you provide. It never invents work experience, education, certifications, or skills. All AI-generated content is based on your actual input.",
  },
  {
    question: "Can I use CV Genius AI for free?",
    answer: "Yes! Our free plan lets you create 3 CVs and 3 cover letters per day with access to basic templates and ATS scanning. Upgrade to Premium for unlimited documents, all templates, advanced AI optimization, and more.",
  },
  {
    question: "What file formats can I export to?",
    answer: "You can export your CV and cover letter as PDF (with preserved formatting), DOCX (editable in Word/Google Docs), TXT (plain text), HTML, and Markdown. Premium users also get advanced formatting options.",
  },
  {
    question: "How does the Cover Letter generator work?",
    answer: "Paste a job description, and our AI analyzes the company, role requirements, and your experience to generate a unique, personalized cover letter. Every letter is customized to the specific job — we never produce generic templates.",
  },
  {
    question: "Can I switch between templates after building my CV?",
    answer: "Yes! You can switch templates at any time with one click. Your content automatically reflows into the new template design. All 50+ templates support instant preview and switching.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4">
              <HelpCircle className="h-3.5 w-3.5" />
              FAQ
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              Frequently Asked{" "}
              <span className="gradient-text">Questions</span>
            </h2>
          </motion.div>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="rounded-2xl border bg-card overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-muted/50 transition-colors"
              >
                <span className="font-medium text-sm pr-4">{faq.question}</span>
                <ChevronDown
                  className={`h-5 w-5 text-muted-foreground transition-transform duration-200 shrink-0 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
