import { NextResponse } from "next/server";
import { getRecommendedTemplates, getRecommendedCoverLetterTemplates, getTemplateById } from "@/lib/templates";

export async function POST(request: Request) {
  try {
    const { jobCategory } = await request.json();

    if (!jobCategory) {
      return NextResponse.json({ error: "Job category required" }, { status: 400 });
    }

    const resumeRecommendations = getRecommendedTemplates(jobCategory);
    const coverLetterRecommendations = getRecommendedCoverLetterTemplates(jobCategory);

    return NextResponse.json({
      resumeRecommendations: resumeRecommendations.map((t) => ({
        id: t.id,
        name: t.name,
        rating: t.rating,
        category: t.category,
        isPremium: t.isPremium,
        thumbnailColor: t.thumbnailColor,
        reason: getRecommendationReason(t.id, jobCategory),
      })),
      coverLetterRecommendations: coverLetterRecommendations.map((name, i) => ({
        name,
        rating: 5 - i * 0.5,
      })),
    });
  } catch (error) {
    console.error("Recommendations error:", error);
    return NextResponse.json({ error: "Failed to get recommendations" }, { status: 500 });
  }
}

function getRecommendationReason(templateId: string, jobCategory: string): string {
  const reasons: Record<string, Record<string, string>> = {
    "ats-modern": { default: "Highest ATS compatibility score — passes all major systems with 98%+ success rate" },
    "cs-warm": { default: "Warm, approachable design perfect for customer-facing roles" },
    "cs-pro": { default: "Professional layout with emphasis on communication and service skills" },
    "corp-blue": { default: "Trustworthy, professional blue theme ideal for corporate environments" },
    "pro-classic": { default: "Timeless design that works across all industries and ATS systems" },
    "eng-tech": { default: "Technical layout optimized for engineering and IT roles with skill matrices" },
    "modern-gradient": { default: "Modern, eye-catching design that stands out while remaining ATS-friendly" },
    "minimal-air": { default: "Clean, uncluttered design that lets your content shine" },
  };

  const templateReasons = reasons[templateId];
  if (templateReasons) {
    return templateReasons[jobCategory.toLowerCase()] || templateReasons.default;
  }
  return "Excellent match for this role category based on recruiter preferences and industry standards";
}
