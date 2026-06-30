import { NextResponse } from "next/server";
import { generateCompletion } from "@/lib/openai";

export async function POST(request: Request) {
  try {
    const {
      jobTitle,
      companyName,
      hiringManager,
      jobDescription,
      experience,
      skills,
      education,
      industry,
      experienceLevel,
    } = await request.json();

    if (!jobDescription || !jobTitle) {
      return NextResponse.json({ error: "Job title and description required" }, { status: 400 });
    }

    const systemPrompt = `You are an expert cover letter writer who creates personalized, compelling cover letters that feel genuinely human-written.

CRITICAL RULES:
- NEVER use generic phrases like "I am writing to apply for..."
- NEVER use clichés like "I am a perfect fit" or "I have always been passionate about..."
- Start with a strong, unique hook specific to the company and role
- Reference specific details from the job description
- Connect the candidate's actual experience to the role's requirements
- Use confident, warm, professional tone
- Keep to 3-4 paragraphs max
- ONLY use information the user provides - never invent experience
- Mention the company by name
- End with a confident call to action
- Make every letter unique and personal

Format: Return a valid JSON with { subject: string, body: string, closing: string }`;

    const userPrompt = `Write a personalized cover letter for:

Job Title: ${jobTitle}
Company: ${companyName || "the company"}
Hiring Manager: ${hiringManager || "Hiring Manager"}
Job Description: ${jobDescription}
Industry: ${industry || "Not specified"}
Experience Level: ${experienceLevel || "Not specified"}

Candidate's Experience: ${experience || "Not provided"}
Candidate's Skills: ${skills || "Not provided"}
Candidate's Education: ${education || "Not provided"}

Make it unique and specific. Do NOT use generic templates.`;

    const response = await generateCompletion(systemPrompt, userPrompt, { temperature: 0.8, maxTokens: 1500 });

    // Parse the JSON response
    try {
      const parsed = JSON.parse(response);
      return NextResponse.json(parsed);
    } catch {
      // If JSON parsing fails, return as plain body
      return NextResponse.json({
        subject: `Application for ${jobTitle} at ${companyName || "your company"}`,
        body: response.trim(),
        closing: "Sincerely",
      });
    }
  } catch (error) {
    console.error("Generate cover letter error:", error);
    return NextResponse.json({ error: "Failed to generate cover letter" }, { status: 500 });
  }
}
