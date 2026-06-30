import OpenAI from "openai";

let openai: OpenAI | null = null;

export function getOpenAI(): OpenAI {
  if (!openai) {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error("OPENAI_API_KEY is required");
    }
    openai = new OpenAI({ apiKey });
  }
  return openai;
}

export async function generateCompletion(
  systemPrompt: string,
  userPrompt: string,
  options?: { temperature?: number; maxTokens?: number; model?: string }
): Promise<string> {
  const client = getOpenAI();
  const response = await client.chat.completions.create({
    model: options?.model || "gpt-4o-mini",
    temperature: options?.temperature ?? 0.7,
    max_tokens: options?.maxTokens || 2000,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
  });

  return response.choices[0]?.message?.content || "";
}

export async function generateStructuredCompletion<T>(
  systemPrompt: string,
  userPrompt: string,
  options?: { temperature?: number; model?: string }
): Promise<T> {
  const client = getOpenAI();
  const response = await client.chat.completions.create({
    model: options?.model || "gpt-4o-mini",
    temperature: options?.temperature ?? 0.3,
    max_tokens: 4000,
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
  });

  const content = response.choices[0]?.message?.content || "{}";
  return JSON.parse(content) as T;
}
