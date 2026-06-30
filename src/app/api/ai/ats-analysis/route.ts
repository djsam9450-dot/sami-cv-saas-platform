import { NextResponse } from "next/server";
import { generateStructuredCompletion } from "@/lib/openai";

interface ATSAnalysis {
  overallScore: number;
  formattingScore: number;
  keywordScore: number;
  grammarScore: number;
  readabilityScore: number;
  experienceScore: number;
  educationScore: number;
  skillsScore: number;
  professionalismScore: number;
  recruiterFriendlinessScore: number;
  missingKeywords: Array<{ keyword: string; reason: string; category: string }>;
  suggestions: Array<{ title: string; description: string; priority: "high" | "medium" | "low"; category: string }>;
  strengths: string[];
  weaknesses: string[];
}

export async function POST(request: Request) {
  try {
    const { resumeData, jobDescription } = await request.json();

    if (!resumeData) {
      return NextResponse.json({ error: "Resume data required" }, { status: 400 });
    }

    const systemPrompt = `You are an expert ATS (Applicant Tracking System) analyst. Analyze the provided CV/resume data and return a detailed JSON analysis.

The JSON must have exactly this structure:
{
  "overallScore": number (0-100),
  "formattingScore": number (0-100),
  "keywordScore": number (0-100),
  "grammarScore": number (0-100),
  "readabilityScore": number (0-100),
  "experienceScore": number (0-100),
  "educationScore": number (0-100),
  "skillsScore": number (0-100),
  "professionalismScore": number (0-100),
  "recruiterFriendlinessScore": number (0-100),
  "missingKeywords": [{ "keyword": "string", "reason": "string explaining why this keyword matters", "category": "skills" | "technologies" | "certifications" | "action-verbs" | "experience" }],
  "suggestions": [{ "title": "string", "description": "string with specific actionable advice", "priority": "high" | "medium" | "low", "category": "formatting" | "content" | "keywords" | "structure" | "grammar" }],
  "strengths": ["string"],
  "weaknesses": ["string"]
}

Be honest but constructive. Score based on industry standards for ATS compatibility.`;

    const userPrompt = `Analyze this CV data for ATS compatibility:
    
Resume Data: ${JSON.stringify(resumeData)}
Job Description (optional, for keyword matching): ${jobDescription || "Not provided"}

Return a thorough analysis with specific, actionable feedback.`;

    const analysis = await generateStructuredCompletion<ATSAnalysis>(systemPrompt, userPrompt, { temperature: 0.3 });

    return NextResponse.json({ analysis });
  } catch (error) {
    console.error("ATS analysis error:", error);
    return NextResponse.json({ error: "Failed to analyze CV" }, { status: 500 });
  }
}
