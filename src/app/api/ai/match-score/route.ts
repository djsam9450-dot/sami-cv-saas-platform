import { NextResponse } from "next/server";
import { generateStructuredCompletion } from "@/lib/openai";

interface MatchScore {
  overallMatch: number;
  skillsMatch: number;
  experienceMatch: number;
  keywordMatch: number;
  educationMatch: number;
  formattingMatch: number;
  atsCompatibility: number;
  recruiterReadiness: number;
  missingSkills: string[];
  missingKeywords: string[];
  summary: string;
}

export async function POST(request: Request) {
  try {
    const { resumeData, jobDescription, jobAnalysis } = await request.json();

    if (!resumeData || !jobDescription) {
      return NextResponse.json({ error: "Resume data and job description required" }, { status: 400 });
    }

    const systemPrompt = `You are an AI job match analyzer. Compare a candidate's CV against a job description and provide match scores.

IMPORTANT DISCLAIMER: Your scores are ESTIMATES based on the provided information only. They do not guarantee hiring success. Be transparent about this limitation.

Return a JSON with:
- overallMatch: Overall match percentage (0-100)
- skillsMatch: Skills alignment score (0-100)
- experienceMatch: Experience alignment score (0-100)
- keywordMatch: Keyword overlap score (0-100)
- educationMatch: Education requirement match (0-100)
- formattingMatch: Format/ATS compatibility score (0-100)
- atsCompatibility: ATS compatibility score (0-100)
- recruiterReadiness: How ready the CV is for recruiter review (0-100)
- missingSkills: Array of skills mentioned in JD but missing from CV
- missingKeywords: Array of important keywords missing
- summary: A brief 2-3 sentence summary of the match

Be honest and data-driven.`;

    const userPrompt = `Compare this CV against the job description:

CV Data: ${JSON.stringify(resumeData)}
Job Description: ${jobDescription}
Job Analysis: ${JSON.stringify(jobAnalysis || {})}

Provide match scores and analysis.`;

    const result = await generateStructuredCompletion<MatchScore>(systemPrompt, userPrompt, { temperature: 0.3 });

    return NextResponse.json({ result });
  } catch (error) {
    console.error("Match score error:", error);
    return NextResponse.json({ error: "Failed to calculate match score" }, { status: 500 });
  }
}
