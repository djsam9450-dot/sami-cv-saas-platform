import { NextResponse } from "next/server";
import { generateStructuredCompletion } from "@/lib/openai";

interface OptimizationResult {
  professionalSummary: string;
  experience: Array<{
    id: string;
    description: string;
    highlights: string[];
  }>;
  skills: Array<{ id: string; name: string; category: string }>;
  changes: {
    keywordsAdded: number;
    sentencesImproved: number;
    grammarFixed: number;
    formattingChanges: number;
    sectionsOptimized: number;
  };
  beforeScores: {
    ats: number;
    match: number;
    readability: number;
    keyword: number;
  };
  afterScores: {
    ats: number;
    match: number;
    readability: number;
    keyword: number;
  };
}

export async function POST(request: Request) {
  try {
    const { resumeData, jobDescription } = await request.json();

    if (!resumeData) {
      return NextResponse.json({ error: "Resume data required" }, { status: 400 });
    }

    const systemPrompt = `You are an expert CV optimizer. Improve the provided CV data for ATS compatibility and recruiter appeal.

CRITICAL RULES:
- NEVER invent or fabricate work experience, education, certifications, skills, or achievements
- ONLY rewrite, rephrase, and optimize what the user actually provides
- Improve wording, grammar, and impact
- Add relevant ATS keywords naturally from the job description
- Replace weak verbs with strong action verbs
- Quantify achievements where possible (if numbers are provided)
- Improve readability and formatting
- Maintain truthful, factual accuracy

Return a JSON object with the optimized CV sections and change metrics.`;

    const userPrompt = `Optimize this CV:

Resume Data: ${JSON.stringify(resumeData)}
Job Description: ${jobDescription || "Not provided"}

Return the optimized version with before/after score estimates. Do NOT invent any information that isn't in the original data.`;

    const result = await generateStructuredCompletion<OptimizationResult>(systemPrompt, userPrompt, { temperature: 0.4 });

    return NextResponse.json({ result });
  } catch (error) {
    console.error("Optimize CV error:", error);
    return NextResponse.json({ error: "Failed to optimize CV" }, { status: 500 });
  }
}
