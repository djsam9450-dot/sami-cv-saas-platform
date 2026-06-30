import { NextResponse } from "next/server";
import { generateCompletion } from "@/lib/openai";

export async function POST(request: Request) {
  try {
    const { experience, skills, jobDescription, currentSummary } = await request.json();

    const systemPrompt = `You are a professional CV writer who creates compelling, ATS-optimized professional summaries. 

Rules:
- ONLY use information the user provides - NEVER invent experience, education, certifications, or skills
- Write in professional, active voice
- Use strong action verbs
- Keep it to 3-5 sentences
- Include relevant keywords from the job description naturally
- Focus on achievements and impact
- Make it specific and unique, never generic`;

    const userPrompt = `Write a professional summary for a CV based on:
    
Experience: ${experience || "Not provided"}
Skills: ${skills || "Not provided"}
Current Summary (if any): ${currentSummary || "None"}
Job Description (for keyword targeting): ${jobDescription || "Not provided"}

Write only the summary paragraph, no other text.`;

    const summary = await generateCompletion(systemPrompt, userPrompt, { temperature: 0.7, maxTokens: 500 });

    return NextResponse.json({ summary: summary.trim() });
  } catch (error) {
    console.error("Generate summary error:", error);
    return NextResponse.json({ error: "Failed to generate summary" }, { status: 500 });
  }
}
