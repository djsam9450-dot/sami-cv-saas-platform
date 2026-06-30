import { z } from "zod";

export const personalInfoSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().optional(),
  location: z.string().optional(),
  linkedin: z.string().url().optional().or(z.literal("")),
  github: z.string().url().optional().or(z.literal("")),
  website: z.string().url().optional().or(z.literal("")),
  portfolio: z.string().url().optional().or(z.literal("")),
  profilePhoto: z.string().optional(),
});

export const experienceSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Job title is required"),
  company: z.string().min(1, "Company is required"),
  location: z.string().optional(),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  current: z.boolean().optional(),
  description: z.string().optional(),
  highlights: z.array(z.string()).optional(),
});

export const educationSchema = z.object({
  id: z.string(),
  school: z.string().min(1, "School is required"),
  degree: z.string().min(1, "Degree is required"),
  field: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  gpa: z.string().optional(),
  highlights: z.array(z.string()).optional(),
});

export const skillSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Skill name is required"),
  level: z.enum(["Beginner", "Intermediate", "Advanced", "Expert"]).optional(),
  category: z.string().optional(),
});

export const projectSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Project name is required"),
  description: z.string().optional(),
  url: z.string().url().optional().or(z.literal("")),
  highlights: z.array(z.string()).optional(),
  technologies: z.array(z.string()).optional(),
});

export const resumeDataSchema = z.object({
  personalInfo: personalInfoSchema,
  professionalSummary: z.string().optional(),
  experience: z.array(experienceSchema).default([]),
  education: z.array(educationSchema).default([]),
  skills: z.array(skillSchema).default([]),
  projects: z.array(projectSchema).default([]),
  certifications: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      issuer: z.string().optional(),
      date: z.string().optional(),
      url: z.string().optional(),
    })
  ).default([]),
  languages: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      proficiency: z.string().optional(),
    })
  ).default([]),
  awards: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      issuer: z.string().optional(),
      date: z.string().optional(),
      description: z.string().optional(),
    })
  ).default([]),
  volunteerExperience: z.array(
    z.object({
      id: z.string(),
      role: z.string(),
      organization: z.string(),
      startDate: z.string().optional(),
      endDate: z.string().optional(),
      description: z.string().optional(),
    })
  ).default([]),
  references: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      title: z.string().optional(),
      company: z.string().optional(),
      email: z.string().email().optional().or(z.literal("")),
      phone: z.string().optional(),
    })
  ).default([]),
});

export type ResumeData = z.infer<typeof resumeDataSchema>;
export type PersonalInfo = z.infer<typeof personalInfoSchema>;
