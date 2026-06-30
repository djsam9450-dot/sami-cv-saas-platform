"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  BarChart3,
  Sparkles,
  Target,
  FileCheck,
  AlertTriangle,
  Lightbulb,
  TrendingUp,
  Wand2,
} from "lucide-react";

interface ATSScores {
  overall: number;
  formatting: number;
  keywords: number;
  grammar: number;
  readability: number;
  experience: number;
  education: number;
  skills: number;
  professionalism: number;
  recruiterFriendliness: number;
}

export default function ATSAnalysisPage() {
  const [jobDescription, setJobDescription] = useState("");
  const [resumeText, setResumeText] = useState("");
  const [scores, setScores] = useState<ATSScores | null>(null);
  const [missingKeywords, setMissingKeywords] = useState<Array<{ keyword: string; reason: string; category: string }>>([]);
  const [suggestions, setSuggestions] = useState<Array<{ title: string; description: string; priority: string }>>([]);
  const [loading, setLoading] = useState(false);

  const analyze = async () => {
    if (!resumeText) {
      toast.error("Please enter your CV text");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/ai/ats-analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resumeData: { professionalSummary: resumeText },
          jobDescription,
        }),
      });
      const data = await res.json();
      if (data.analysis) {
        const a = data.analysis;
        setScores({
          overall: a.overallScore,
          formatting: a.formattingScore,
          keywords: a.keywordScore,
          grammar: a.grammarScore,
          readability: a.readabilityScore,
          experience: a.experienceScore,
          education: a.educationScore,
          skills: a.skillsScore,
          professionalism: a.professionalismScore,
          recruiterFriendliness: a.recruiterFriendlinessScore,
        });
        setMissingKeywords(a.missingKeywords || []);
        setSuggestions(a.suggestions || []);
        toast.success("Analysis complete!");
      }
    } catch {
      toast.error("Analysis failed");
    } finally {
      setLoading(false);
    }
  };

  const ScoreCircle = ({ value, label, size = "md" }: { value: number; label: string; size?: "sm" | "md" | "lg" }) => {
    const dimensions = size === "lg" ? "w-28 h-28" : size === "sm" ? "w-16 h-16" : "w-20 h-20";
    const textSize = size === "lg" ? "text-2xl" : size === "sm" ? "text-sm" : "text-lg";
    const strokeWidth = size === "lg" ? 8 : size === "sm" ? 4 : 6;
    const radius = size === "lg" ? 48 : size === "sm" ? 26 : 34;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (value / 100) * circumference;
    const color = value >= 90 ? "#22c55e" : value >= 75 ? "#f59e0b" : value >= 60 ? "#f97316" : "#ef4444";

    return (
      <div className="flex flex-col items-center">
        <div className={`relative ${dimensions}`}>
          <svg className="w-full h-full -rotate-90" viewBox={`0 0 ${radius * 2 + strokeWidth * 2} ${radius * 2 + strokeWidth * 2}`}>
            <circle
              cx={radius + strokeWidth}
              cy={radius + strokeWidth}
              r={radius}
              fill="none"
              stroke="currentColor"
              strokeWidth={strokeWidth}
              className="text-muted/20"
            />
            <circle
              cx={radius + strokeWidth}
              cy={radius + strokeWidth}
              r={radius}
              fill="none"
              stroke={color}
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`${textSize} font-bold`}>{value}%</span>
          </div>
        </div>
        <span className="text-xs text-muted-foreground mt-1.5 text-center">{label}</span>
      </div>
    );
  };

  return (
    <>
      <Header />
      <main className="pt-20 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold">ATS Analysis</h1>
            <p className="text-muted-foreground">Analyze your CV against job descriptions</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileCheck className="h-5 w-5 text-primary" />
                  Your CV Content
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Paste your CV text here..."
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  className="min-h-[200px]"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Job Description (optional)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Paste the job description for keyword matching..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  className="min-h-[200px]"
                />
              </CardContent>
            </Card>
          </div>

          <div className="text-center mb-8">
            <Button size="lg" onClick={analyze} loading={loading} className="rounded-xl shadow-lg shadow-primary/25">
              <BarChart3 className="h-4 w-4 mr-2" />
              Analyze My CV
            </Button>
          </div>

          {scores && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Score Circles */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">ATS Scores</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap justify-center gap-6">
                    <ScoreCircle value={scores.overall} label="Overall" size="lg" />
                    <ScoreCircle value={scores.formatting} label="Formatting" size="sm" />
                    <ScoreCircle value={scores.keywords} label="Keywords" size="sm" />
                    <ScoreCircle value={scores.grammar} label="Grammar" size="sm" />
                    <ScoreCircle value={scores.readability} label="Readability" size="sm" />
                    <ScoreCircle value={scores.experience} label="Experience" size="sm" />
                    <ScoreCircle value={scores.skills} label="Skills" size="sm" />
                    <ScoreCircle value={scores.professionalism} label="Professional" size="sm" />
                    <ScoreCircle value={scores.recruiterFriendliness} label="Recruiter" size="sm" />
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Missing Keywords */}
                {missingKeywords.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-yellow-500" />
                        Missing Keywords
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {missingKeywords.map((kw) => (
                        <div key={kw.keyword} className="flex items-start gap-3 p-3 rounded-xl bg-muted/50">
                          <div>
                            <Badge variant="outline" className="mb-1">{kw.keyword}</Badge>
                            <p className="text-xs text-muted-foreground">{kw.reason}</p>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                )}

                {/* Suggestions */}
                {suggestions.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Lightbulb className="h-5 w-5 text-yellow-500" />
                        Suggested Improvements
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {suggestions.map((s, i) => (
                        <div key={i} className="flex items-start gap-3 p-3 rounded-xl border">
                          <div className={`h-2 w-2 rounded-full mt-1.5 shrink-0 ${
                            s.priority === "high" ? "bg-red-500" : s.priority === "medium" ? "bg-yellow-500" : "bg-blue-500"
                          }`} />
                          <div>
                            <p className="text-sm font-medium">{s.title}</p>
                            <p className="text-xs text-muted-foreground">{s.description}</p>
                          </div>
                          <Button size="sm" variant="outline" className="ml-auto shrink-0 rounded-xl">
                            <Wand2 className="h-3 w-3 mr-1" />
                            Fix
                          </Button>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </>
  );
}
