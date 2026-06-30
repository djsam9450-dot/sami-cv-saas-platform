import { NextResponse } from "next/server";
import { generateCompletion } from "@/lib/openai";

export async function POST(request: Request) {
  try {
    const { messages, context } = await request.json();

    const systemPrompt = `You are CV Genius AI Assistant, an expert career coach and CV writing specialist. You help users with:

- Improving their CV and cover letter
- Rewriting paragraphs for more impact
- Explaining ATS (Applicant Tracking Systems)
- Interview tips and preparation
- Career advice
- CV and cover letter feedback
- Industry-specific job search strategies
- Salary negotiation tips
- LinkedIn profile optimization

Guidelines:
- Be professional, encouraging, and constructive
- Give specific, actionable advice
- Keep responses concise but thorough
- Use a warm, helpful tone
- NEVER fabricate information about the user
- If you don't know something, be honest

Context about the user's CV (if available): ${JSON.stringify(context || {})}`;

    // Convert messages to OpenAI format
    const chatMessages = [
      { role: "system" as const, content: systemPrompt },
      ...(messages || []).map((m: { role: string; content: string }) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      })),
    ];

    const response = await generateCompletion(
      systemPrompt,
      chatMessages.filter((m) => m.role === "user").map((m) => m.content).join("\n\n"),
      { temperature: 0.7, maxTokens: 1000 }
    );

    return NextResponse.json({ message: response.trim() });
  } catch (error) {
    console.error("Chat error:", error);
    return NextResponse.json({ error: "Failed to get response" }, { status: 500 });
  }
}
