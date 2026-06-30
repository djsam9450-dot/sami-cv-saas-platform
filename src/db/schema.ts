import {
  pgTable,
  text,
  timestamp,
  uuid,
  integer,
  boolean,
  jsonb,
  pgEnum,
} from "drizzle-orm/pg-core";

export const planEnum = pgEnum("plan", ["free", "premium"]);
export const roleEnum = pgEnum("role", ["user", "admin"]);

export const users = pgTable("users", {
  id: text("id").primaryKey(), // Clerk user ID
  email: text("email").notNull(),
  name: text("name"),
  avatarUrl: text("avatar_url"),
  plan: planEnum("plan").default("free").notNull(),
  role: roleEnum("role").default("user").notNull(),
  cvCountToday: integer("cv_count_today").default(0).notNull(),
  coverLetterCountToday: integer("cover_letter_count_today").default(0).notNull(),
  lastResetDate: text("last_reset_date"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const resumes = pgTable("resumes", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  templateId: text("template_id"),
  folderId: uuid("folder_id").references(() => folders.id, { onDelete: "set null" }),
  data: jsonb("data").default({}).notNull(),
  atsScore: integer("ats_score"),
  isFavorite: boolean("is_favorite").default(false).notNull(),
  version: integer("version").default(1).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const resumeVersions = pgTable("resume_versions", {
  id: uuid("id").defaultRandom().primaryKey(),
  resumeId: uuid("resume_id").notNull().references(() => resumes.id, { onDelete: "cascade" }),
  data: jsonb("data").default({}).notNull(),
  version: integer("version").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const coverLetters = pgTable("cover_letters", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  templateId: text("template_id"),
  folderId: uuid("folder_id").references(() => folders.id, { onDelete: "set null" }),
  data: jsonb("data").default({}).notNull(),
  isFavorite: boolean("is_favorite").default(false).notNull(),
  version: integer("version").default(1).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const folders = pgTable("folders", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  color: text("color"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const templates = pgTable("templates", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category").notNull(),
  description: text("description"),
  thumbnailUrl: text("thumbnail_url"),
  isPremium: boolean("is_premium").default(false).notNull(),
  colors: jsonb("colors").default([]).notNull(),
  fonts: jsonb("fonts").default([]).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const atsAnalyses = pgTable("ats_analyses", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  resumeId: uuid("resume_id").references(() => resumes.id, { onDelete: "cascade" }),
  coverLetterId: uuid("cover_letter_id").references(() => coverLetters.id, { onDelete: "cascade" }),
  jobDescription: text("job_description"),
  overallScore: integer("overall_score"),
  formattingScore: integer("formatting_score"),
  keywordScore: integer("keyword_score"),
  grammarScore: integer("grammar_score"),
  readabilityScore: integer("readability_score"),
  experienceScore: integer("experience_score"),
  educationScore: integer("education_score"),
  skillsScore: integer("skills_score"),
  professionalismScore: integer("professionalism_score"),
  recruiterFriendlinessScore: integer("recruiter_friendliness_score"),
  matchScore: integer("match_score"),
  missingKeywords: jsonb("missing_keywords").default([]).notNull(),
  suggestions: jsonb("suggestions").default([]).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const jobAnalyses = pgTable("job_analyses", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  jobTitle: text("job_title"),
  jobDescription: text("job_description"),
  analysis: jsonb("analysis").default({}).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const chatMessages = pgTable("chat_messages", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  role: text("role").notNull(), // 'user' or 'assistant'
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const notifications = pgTable("notifications", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  message: text("message").notNull(),
  type: text("type").notNull(), // 'autosave', 'optimization', 'download', 'ats_score'
  isRead: boolean("is_read").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
