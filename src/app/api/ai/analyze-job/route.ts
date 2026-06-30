import { NextResponse } from "next/server";
import { generateStructuredCompletion } from "@/lib/openai";

interface JobAnalysis {
  jobTitle: string;
  industry: string;
  department: string;
  careerLevel: string;
  employmentType: string;
  requiredSkills: string[];
  preferredSkills: string[];
  softSkills: string[];
  hardSkills: string[];
  atsKeywords: string[];
  educationRequirement: string;
  experienceRequirement: string;
  requiredCertifications: string[];
  salaryRange: string | null;
  recommendedResumeStyle: string;
  recommendedCoverLetterStyle: string;
  keyResponsibilities: string[];
  companyCulture: string;
}

export async function POST(request: Request) {
  try {
    const { jobTitle, jobDescription } = await request.json();

    if (!jobDescription && !jobTitle) {
      return NextResponse.json({ error: "Job title or description required" }, { status: 400 });
    }

    const systemPrompt = `You are an expert HR analyst and career coach. Analyze the job title and/or job description provided and extract structured information. Return a JSON object with these fields:
- jobTitle: The detected job title
- industry: The industry (tech, finance, healthcare, etc.)
- department: The department (engineering, marketing, sales, etc.)
- careerLevel: Entry Level, Mid Level, Senior, Lead, Manager, Director, VP, C-Suite
- employmentType: Full-time, Part-time, Contract, Freelance, Internship
- requiredSkills: Array of required technical/hard skills
- preferredSkills: Array of preferred/nice-to-have skills
- softSkills: Array of soft skills mentioned or implied
- hardSkills: Array of hard/technical skills
- atsKeywords: Array of important keywords for ATS optimization
- educationRequirement: Required education level
- experienceRequirement: Years of experience required
- requiredCertifications: Array of certifications mentioned
- salaryRange: Salary range if mentioned, otherwise null
- recommendedResumeStyle: Best resume template style (ats-friendly, modern, corporate, creative, etc.)
- recommendedCoverLetterStyle: Best cover letter style (professional, formal, creative, etc.)
- keyResponsibilities: Array of key job responsibilities
- companyCulture: Brief description of company culture hints from the description

Be thorough and extract as much as possible. If something isn't mentioned, use "Not specified" or empty array as appropriate.`;

    const userPrompt = `Analyze this job:\n\nJob Title: ${jobTitle || "Not provided"}\n\nJob Description: ${jobDescription || "Not provided"}`;

    const analysis = await generateStructuredCompletion<JobAnalysis>(systemPrompt, userPrompt, { temperature: 0.3 });

    return NextResponse.json({ analysis });
  } catch (error) {
    console.error("Job analysis error:", error);
    return NextResponse.json({ error: "Failed to analyze job" }, { status: 500 });
  }
}
