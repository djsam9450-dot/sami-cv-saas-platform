"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/layout/header";
import { toast } from "sonner";
import {
  Mail,
  Sparkles,
  Building2,
  User,
  Briefcase,
  Globe,
  Download,
  Eye,
  Copy,
  RefreshCw,
} from "lucide-react";

export default function CoverLetterBuilderPage() {
  const [form, setForm] = useState({
    jobTitle: "",
    companyName: "",
    hiringManager: "",
    jobDescription: "",
    companyWebsite: "",
    country: "",
    experienceLevel: "",
    purpose: "",
  });

  const [coverLetter, setCoverLetter] = useState<{ subject: string; body: string; closing: string } | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const updateField = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const generateCoverLetter = async () => {
    if (!form.jobDescription || !form.jobTitle) {
      toast.error("Job title and description are required");
      return;
    }
    setIsGenerating(true);
    try {
      const res = await fetch("/api/ai/generate-cover-letter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.body) {
        setCoverLetter(data);
        toast.success("Cover letter generated!");
      } else {
        toast.error("Failed to generate cover letter");
      }
    } catch {
      toast.error("Failed to generate cover letter");
    } finally {
      setIsGenerating(false);
    }
  };

  const optimizeCoverLetter = async () => {
    if (!coverLetter) return;
    toast.promise(
      fetch("/api/ai/generate-cover-letter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, currentLetter: coverLetter.body }),
      }).then((r) => r.json()),
      {
        loading: "Optimizing...",
        success: (data) => {
          if (data.body) setCoverLetter(data);
          return "Optimized!";
        },
        error: "Failed to optimize",
      }
    );
  };

  return (
    <>
      <Header />
      <main className="pt-20 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Top Bar */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold">Cover Letter Builder</h1>
              <p className="text-sm text-muted-foreground">Generate personalized cover letters with AI</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setShowPreview(!showPreview)} className="rounded-xl">
                <Eye className="h-4 w-4 mr-2" />
                {showPreview ? "Hide Preview" : "Preview"}
              </Button>
              {coverLetter && (
                <>
                  <Button variant="outline" size="sm" onClick={optimizeCoverLetter} className="rounded-xl">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Optimize
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-xl">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </>
              )}
            </div>
          </div>

          <div className={`grid gap-6 ${showPreview && coverLetter ? "lg:grid-cols-2" : ""}`}>
            {/* Input Form */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Mail className="h-5 w-5 text-primary" />
                  Cover Letter Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5">
                      Job Title <span className="text-destructive">*</span>
                    </label>
                    <Input
                      placeholder="e.g. Software Engineer"
                      value={form.jobTitle}
                      onChange={(e) => updateField("jobTitle", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">
                      Company Name <span className="text-destructive">*</span>
                    </label>
                    <Input
                      placeholder="e.g. Google"
                      value={form.companyName}
                      onChange={(e) => updateField("companyName", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Hiring Manager</label>
                    <Input
                      placeholder="e.g. Jane Smith (optional)"
                      value={form.hiringManager}
                      onChange={(e) => updateField("hiringManager", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Country</label>
                    <Input
                      placeholder="e.g. United States"
                      value={form.country}
                      onChange={(e) => updateField("country", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Experience Level</label>
                    <Input
                      placeholder="e.g. Senior, Mid-Level, Entry"
                      value={form.experienceLevel}
                      onChange={(e) => updateField("experienceLevel", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Company Website</label>
                    <Input
                      placeholder="e.g. https://google.com"
                      value={form.companyWebsite}
                      onChange={(e) => updateField("companyWebsite", e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5">
                    Job Description <span className="text-destructive">*</span>
                  </label>
                  <Textarea
                    placeholder="Paste the full job description here..."
                    value={form.jobDescription}
                    onChange={(e) => updateField("jobDescription", e.target.value)}
                    className="min-h-[200px]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5">Purpose / Notes</label>
                  <Textarea
                    placeholder="Any specific points you want to emphasize..."
                    value={form.purpose}
                    onChange={(e) => updateField("purpose", e.target.value)}
                    className="min-h-[80px]"
                  />
                </div>

                <Button
                  onClick={generateCoverLetter}
                  loading={isGenerating}
                  size="lg"
                  className="w-full rounded-xl shadow-lg shadow-primary/25"
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  Generate Cover Letter
                </Button>
              </CardContent>
            </Card>

            {/* Preview */}
            {showPreview && coverLetter && (
              <Card className="h-fit sticky top-24">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-base">Cover Letter Preview</CardTitle>
                  <Button variant="ghost" size="icon" onClick={() => navigator.clipboard.writeText(coverLetter.body)}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-xl p-6 bg-white dark:bg-card min-h-[500px]">
                    <p className="text-sm font-semibold mb-4">{coverLetter.subject}</p>
                    <p className="text-xs text-muted-foreground mb-4">
                      Dear {form.hiringManager || "Hiring Manager"},
                    </p>
                    <div className="text-xs leading-relaxed whitespace-pre-wrap text-foreground">
                      {coverLetter.body}
                    </div>
                    <p className="text-xs text-muted-foreground mt-4">{coverLetter.closing || "Sincerely"},</p>
                    <p className="text-xs font-medium mt-2">[Your Name]</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Generated Result */}
            {coverLetter && !showPreview && (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-base">Generated Cover Letter</CardTitle>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={() => navigator.clipboard.writeText(coverLetter.body)}>
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={generateCoverLetter} className="rounded-xl">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Regenerate
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-xl p-6 bg-white dark:bg-card">
                    <p className="text-sm font-semibold mb-4">{coverLetter.subject}</p>
                    <p className="text-sm text-muted-foreground mb-4">
                      Dear {form.hiringManager || "Hiring Manager"},
                    </p>
                    <div className="text-sm leading-relaxed whitespace-pre-wrap">
                      {coverLetter.body}
                    </div>
                    <p className="text-sm text-muted-foreground mt-4">{coverLetter.closing || "Sincerely"},</p>
                    <p className="text-sm font-medium mt-2">[Your Name]</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
