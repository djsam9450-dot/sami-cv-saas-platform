import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: "CV Genius AI - Create ATS-Friendly CVs & Winning Cover Letters",
  description:
    "AI-powered platform to create professional ATS-friendly CVs and personalized cover letters in minutes. Land more interviews with optimized resumes.",
  keywords: ["CV builder", "resume builder", "cover letter", "ATS", "AI resume", "job application"],
  openGraph: {
    title: "CV Genius AI - Create ATS-Friendly CVs & Winning Cover Letters",
    description: "AI-powered platform to create professional CVs and cover letters in minutes.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background text-foreground antialiased min-h-screen">
        <ThemeProvider>
          {children}
          <Toaster
            position="bottom-right"
            toastOptions={{
              className: "rounded-xl border bg-card text-card-foreground shadow-lg",
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
