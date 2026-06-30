"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Star, Sparkles, FileText, Zap } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border bg-card px-4 py-1.5 text-sm font-medium shadow-sm mb-8"
          >
            <Sparkles className="h-4 w-4 text-primary" />
            <span>AI-Powered CV & Cover Letter Platform</span>
            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <span className="text-muted-foreground">4.9/5 from 50K+ users</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-6"
          >
            Create{" "}
            <span className="gradient-text">ATS-Friendly CVs</span>
            <br />
            & Winning{" "}
            <span className="gradient-text">Cover Letters</span>
            <br />
            in Minutes
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed"
          >
            Our AI analyzes job descriptions, optimizes your CV for ATS systems, and generates
            personalized cover letters that hiring managers love. Land 3x more interviews.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <Link href="/dashboard">
              <Button size="xl" className="rounded-2xl shadow-xl shadow-primary/30 text-base">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/#templates">
              <Button variant="outline" size="xl" className="rounded-2xl text-base">
                View Templates
              </Button>
            </Link>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground"
          >
            {[
              "No credit card required",
              "ATS-optimized templates",
              "AI-powered writing",
              "Export to PDF & DOCX",
              "GDPR compliant",
            ].map((item) => (
              <span key={item} className="flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4 text-green-500" />
                {item}
              </span>
            ))}
          </motion.div>

          {/* Live Preview Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-16 mx-auto max-w-3xl"
          >
            <div className="glass rounded-2xl p-4 shadow-2xl shadow-black/10">
              <div className="bg-card rounded-xl border overflow-hidden">
                <div className="p-6 sm:p-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-14 w-14 rounded-full bg-primary/20 flex items-center justify-center">
                      <FileText className="h-7 w-7 text-primary" />
                    </div>
                    <div>
                      <div className="h-3 w-32 bg-muted rounded-full animate-pulse" />
                      <div className="h-2 w-48 bg-muted rounded-full mt-2 animate-pulse" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-2 bg-muted rounded-full w-3/4" />
                    <div className="h-2 bg-muted rounded-full w-full" />
                    <div className="h-2 bg-muted rounded-full w-5/6" />
                    <div className="h-2 bg-muted rounded-full w-2/3" />
                  </div>
                  <div className="mt-6 flex gap-3">
                    <div className="h-8 w-20 bg-primary/20 rounded-lg flex items-center justify-center">
                      <Zap className="h-4 w-4 text-primary" />
                    </div>
                    <div className="h-8 flex-1 bg-muted rounded-lg" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
