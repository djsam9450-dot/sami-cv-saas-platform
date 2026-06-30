"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Software Engineer at Google",
    avatar: "SC",
    content: "CV Genius AI completely transformed my job search. After using their AI-optimized CV, I got callbacks from 4 out of 5 FAANG companies. The ATS analysis is incredibly accurate.",
    rating: 5,
  },
  {
    name: "Marcus Johnson",
    role: "Marketing Director",
    avatar: "MJ",
    content: "The cover letter generator is mind-blowing. Each letter feels genuinely personalized to the company. I landed my dream role at a Fortune 500 company within two weeks.",
    rating: 5,
  },
  {
    name: "Elena Rodriguez",
    role: "Healthcare Administrator",
    avatar: "ER",
    content: "As someone changing careers, I was lost about how to tailor my CV. The AI job detection engine identified exactly what skills to highlight. Incredibly intuitive platform.",
    rating: 5,
  },
  {
    name: "David Park",
    role: "Finance Analyst at JP Morgan",
    avatar: "DP",
    content: "The template library is gorgeous and actually ATS-friendly. I tested my CV through multiple ATS systems and it passed every single one. Worth every penny.",
    rating: 5,
  },
  {
    name: "Amara Okafor",
    role: "UX Designer",
    avatar: "AO",
    content: "I was skeptical about AI writing my CV but the results were better than what I'd write myself. It phrased things in ways I never would have thought of. Pure genius.",
    rating: 5,
  },
  {
    name: "James Wilson",
    role: "Sales Manager",
    avatar: "JW",
    content: "The real-time ATS score while editing is a game-changer. I can see exactly how my changes affect my match percentage. Landed 3 interviews in the first week.",
    rating: 4,
  },
];

export function Testimonials() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4">
              Testimonials
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              Loved by{" "}
              <span className="gradient-text">50,000+</span> Job Seekers
            </h2>
            <p className="text-lg text-muted-foreground">
              Join thousands of professionals who landed their dream jobs with CV Genius AI.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="rounded-2xl border bg-card p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < testimonial.rating ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground/30"
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm text-foreground leading-relaxed mb-4">
                &ldquo;{testimonial.content}&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-4 border-t">
                <div className="h-10 w-10 rounded-full gradient-primary flex items-center justify-center text-white text-sm font-semibold">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
