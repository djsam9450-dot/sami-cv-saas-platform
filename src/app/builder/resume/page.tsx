"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resumeDataSchema, type ResumeData } from "@/lib/validation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/layout/header";
import { toast } from "sonner";
import {
  User,
  FileText,
  Briefcase,
  GraduationCap,
  Wrench,
  FolderGit2,
  Award,
  Languages,
  Heart,
  Link2,
  Plus,
  Trash2,
  GripVertical,
  Copy,
  Save,
  Eye,
  ChevronDown,
  ChevronUp,
  Sparkles,
  BarChart3,
  Download,
  Undo2,
  Redo2,
} from "lucide-react";

type SectionKey = keyof ResumeData;

const sectionConfig: { key: SectionKey; label: string; icon: React.ElementType; description: string }[] = [
  { key: "personalInfo", label: "Personal Info", icon: User, description: "Name, contact, and links" },
  { key: "professionalSummary", label: "Professional Summary", icon: FileText, description: "Brief career overview" },
  { key: "experience", label: "Work Experience", icon: Briefcase, description: "Your employment history" },
  { key: "education", label: "Education", icon: GraduationCap, description: "Academic background" },
  { key: "skills", label: "Skills", icon: Wrench, description: "Technical and soft skills" },
  { key: "projects", label: "Projects", icon: FolderGit2, description: "Portfolio projects" },
  { key: "certifications", label: "Certifications", icon: Award, description: "Professional certifications" },
  { key: "languages", label: "Languages", icon: Languages, description: "Language proficiencies" },
  { key: "awards", label: "Awards", icon: Award, description: "Honors and awards" },
  { key: "volunteerExperience", label: "Volunteer", icon: Heart, description: "Community involvement" },
  { key: "references", label: "References", icon: Link2, description: "Professional references" },
];

function getDefaultResumeData(): ResumeData {
  return {
    personalInfo: { fullName: "", email: "", phone: "", location: "", linkedin: "", github: "", website: "", portfolio: "" },
    professionalSummary: "",
    experience: [],
    education: [],
    skills: [],
    projects: [],
    certifications: [],
    languages: [],
    awards: [],
    volunteerExperience: [],
    references: [],
  };
}

export default function ResumeBuilderPage() {
  const [activeSection, setActiveSection] = useState<SectionKey>("personalInfo");
  const [resumeData, setResumeData] = useState<ResumeData>(getDefaultResumeData);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [history, setHistory] = useState<ResumeData[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Auto-save
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSaving(true);
      setTimeout(() => {
        setIsSaving(false);
        toast.success("Auto-saved", { duration: 2000 });
      }, 500);
    }, 3000);

    return () => clearTimeout(timer);
  }, [resumeData]);

  const updateField = useCallback((section: SectionKey, value: unknown) => {
    setResumeData((prev) => {
      const newData = { ...prev, [section]: value };
      setHistory((h) => [...h.slice(0, historyIndex + 1), newData]);
      setHistoryIndex((i) => i + 1);
      return newData;
    });
  }, [historyIndex]);

  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex((i) => i - 1);
      setResumeData(history[historyIndex - 1]);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex((i) => i + 1);
      setResumeData(history[historyIndex + 1]);
    }
  };

  const handleAIOptimize = async () => {
    toast.promise(
      fetch("/api/ai/optimize-cv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeData }),
      }).then((r) => r.json()),
      {
        loading: "Optimizing your CV...",
        success: (data) => {
          if (data.result) {
            setResumeData((prev) => ({ ...prev, ...data.result, personalInfo: prev.personalInfo }));
          }
          return "CV optimized successfully!";
        },
        error: "Failed to optimize CV",
      }
    );
  };

  const activeConfig = sectionConfig.find((s) => s.key === activeSection);

  return (
    <>
      <Header />
      <main className="pt-20 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Top Bar */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold">Resume Builder</h1>
              <p className="text-sm text-muted-foreground">
                {isSaving ? "Saving..." : "All changes auto-saved"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={undo} disabled={historyIndex <= 0} className="rounded-xl">
                <Undo2 className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={redo} disabled={historyIndex >= history.length - 1} className="rounded-xl">
                <Redo2 className="h-4 w-4" />
              </Button>
              <div className="w-px h-6 bg-border mx-1" />
              <Button variant="outline" size="sm" onClick={() => setShowPreview(!showPreview)} className="rounded-xl">
                <Eye className="h-4 w-4 mr-2" />
                {showPreview ? "Hide Preview" : "Preview"}
              </Button>
              <Button size="sm" onClick={handleAIOptimize} className="rounded-xl shadow-lg shadow-primary/25">
                <Sparkles className="h-4 w-4 mr-2" />
                Optimize CV
              </Button>
              <Button variant="outline" size="sm" className="rounded-xl">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          <div className={`grid gap-6 ${showPreview ? "lg:grid-cols-2" : "lg:grid-cols-[280px_1fr]"}`}>
            {/* Section Navigation */}
            <Card className="h-fit">
              <CardHeader>
                <CardTitle className="text-base">Sections</CardTitle>
              </CardHeader>
              <CardContent className="p-2">
                <nav className="space-y-0.5">
                  {sectionConfig.map((section) => {
                    const isActive = activeSection === section.key;
                    const Icon = section.icon;
                    const hasContent = Array.isArray(resumeData[section.key])
                      ? (resumeData[section.key] as unknown[]).length > 0
                      : resumeData[section.key] && typeof resumeData[section.key] === "object"
                      ? Object.values(resumeData[section.key] as Record<string, unknown>).some((v) => v)
                      : !!resumeData[section.key];

                    return (
                      <button
                        key={section.key}
                        onClick={() => setActiveSection(section.key)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all ${
                          isActive
                            ? "bg-primary/10 text-primary font-medium"
                            : "hover:bg-muted text-muted-foreground"
                        }`}
                      >
                        <Icon className="h-4 w-4 shrink-0" />
                        <span className="text-sm flex-1">{section.label}</span>
                        {hasContent && <div className="h-1.5 w-1.5 rounded-full bg-green-500" />}
                      </button>
                    );
                  })}
                </nav>
              </CardContent>
            </Card>

            {/* Editor */}
            <div className="space-y-4">
              {activeSection === "personalInfo" && (
                <PersonalInfoEditor data={resumeData.personalInfo} onChange={(v) => updateField("personalInfo", v)} />
              )}
              {activeSection === "professionalSummary" && (
                <SummaryEditor
                  value={resumeData.professionalSummary || ""}
                  onChange={(v) => updateField("professionalSummary", v)}
                />
              )}
              {activeSection === "experience" && (
                <ListEditor
                  title="Work Experience"
                  items={resumeData.experience}
                  onChange={(v) => updateField("experience", v)}
                  fields={[
                    { key: "title", label: "Job Title", type: "text" },
                    { key: "company", label: "Company", type: "text" },
                    { key: "location", label: "Location", type: "text" },
                    { key: "startDate", label: "Start Date", type: "text" },
                    { key: "endDate", label: "End Date", type: "text" },
                    { key: "description", label: "Description", type: "textarea" },
                  ]}
                />
              )}
              {activeSection === "education" && (
                <ListEditor
                  title="Education"
                  items={resumeData.education}
                  onChange={(v) => updateField("education", v)}
                  fields={[
                    { key: "school", label: "School", type: "text" },
                    { key: "degree", label: "Degree", type: "text" },
                    { key: "field", label: "Field of Study", type: "text" },
                    { key: "startDate", label: "Start Date", type: "text" },
                    { key: "endDate", label: "End Date", type: "text" },
                    { key: "gpa", label: "GPA", type: "text" },
                  ]}
                />
              )}
              {activeSection === "skills" && (
                <SkillsEditor
                  items={resumeData.skills}
                  onChange={(v) => updateField("skills", v)}
                />
              )}
              {activeSection === "projects" && (
                <ListEditor
                  title="Projects"
                  items={resumeData.projects}
                  onChange={(v) => updateField("projects", v)}
                  fields={[
                    { key: "name", label: "Project Name", type: "text" },
                    { key: "description", label: "Description", type: "textarea" },
                    { key: "url", label: "URL", type: "text" },
                  ]}
                />
              )}
              {activeSection === "certifications" && (
                <ListEditor
                  title="Certifications"
                  items={resumeData.certifications}
                  onChange={(v) => updateField("certifications", v)}
                  fields={[
                    { key: "name", label: "Certification Name", type: "text" },
                    { key: "issuer", label: "Issuer", type: "text" },
                    { key: "date", label: "Date", type: "text" },
                  ]}
                />
              )}
              {activeSection === "languages" && (
                <ListEditor
                  title="Languages"
                  items={resumeData.languages}
                  onChange={(v) => updateField("languages", v)}
                  fields={[
                    { key: "name", label: "Language", type: "text" },
                    { key: "proficiency", label: "Proficiency", type: "text" },
                  ]}
                />
              )}
              {activeSection === "awards" && (
                <ListEditor
                  title="Awards"
                  items={resumeData.awards}
                  onChange={(v) => updateField("awards", v)}
                  fields={[
                    { key: "name", label: "Award Name", type: "text" },
                    { key: "issuer", label: "Issuer", type: "text" },
                    { key: "date", label: "Date", type: "text" },
                    { key: "description", label: "Description", type: "textarea" },
                  ]}
                />
              )}
              {activeSection === "volunteerExperience" && (
                <ListEditor
                  title="Volunteer Experience"
                  items={resumeData.volunteerExperience}
                  onChange={(v) => updateField("volunteerExperience", v)}
                  fields={[
                    { key: "role", label: "Role", type: "text" },
                    { key: "organization", label: "Organization", type: "text" },
                    { key: "startDate", label: "Start Date", type: "text" },
                    { key: "endDate", label: "End Date", type: "text" },
                    { key: "description", label: "Description", type: "textarea" },
                  ]}
                />
              )}
              {activeSection === "references" && (
                <ListEditor
                  title="References"
                  items={resumeData.references}
                  onChange={(v) => updateField("references", v)}
                  fields={[
                    { key: "name", label: "Name", type: "text" },
                    { key: "title", label: "Title", type: "text" },
                    { key: "company", label: "Company", type: "text" },
                    { key: "email", label: "Email", type: "text" },
                    { key: "phone", label: "Phone", type: "text" },
                  ]}
                />
              )}
            </div>

            {/* Preview */}
            {showPreview && (
              <Card className="h-fit sticky top-24">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    Live Preview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResumePreview data={resumeData} />
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

// Sub-components

function PersonalInfoEditor({ data, onChange }: { data: ResumeData["personalInfo"]; onChange: (v: ResumeData["personalInfo"]) => void }) {
  const fields = [
    { key: "fullName", label: "Full Name", placeholder: "John Doe" },
    { key: "email", label: "Email", placeholder: "john@example.com", type: "email" },
    { key: "phone", label: "Phone", placeholder: "+1 (555) 123-4567" },
    { key: "location", label: "Location", placeholder: "New York, NY" },
    { key: "linkedin", label: "LinkedIn URL", placeholder: "https://linkedin.com/in/..." },
    { key: "github", label: "GitHub URL", placeholder: "https://github.com/..." },
    { key: "website", label: "Website", placeholder: "https://..." },
    { key: "portfolio", label: "Portfolio URL", placeholder: "https://..." },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <User className="h-5 w-5 text-primary" />
          Personal Information
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {fields.map((field) => (
          <div key={field.key} className={field.key === "fullName" ? "sm:col-span-2" : ""}>
            <label className="block text-sm font-medium mb-1.5">{field.label}</label>
            <Input
              type={field.type || "text"}
              placeholder={field.placeholder}
              value={(data as Record<string, string>)[field.key] || ""}
              onChange={(e) => onChange({ ...data, [field.key]: e.target.value })}
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function SummaryEditor({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [loading, setLoading] = useState(false);

  const generateSummary = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/ai/generate-summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentSummary: value }),
      });
      const data = await res.json();
      if (data.summary) onChange(data.summary);
      toast.success("Summary generated!");
    } catch {
      toast.error("Failed to generate summary");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          Professional Summary
        </CardTitle>
        <Button size="sm" variant="outline" onClick={generateSummary} loading={loading} className="rounded-xl">
          <Sparkles className="h-4 w-4 mr-2" />
          AI Generate
        </Button>
      </CardHeader>
      <CardContent>
        <Textarea
          placeholder="Write a brief professional summary..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="min-h-[150px]"
        />
      </CardContent>
    </Card>
  );
}

function ListEditor({
  title,
  items,
  onChange,
  fields,
}: {
  title: string;
  items: Array<Record<string, unknown> & { id: string }>;
  onChange: (items: Array<Record<string, unknown> & { id: string }>) => void;
  fields: Array<{ key: string; label: string; type: "text" | "textarea" }>;
}) {
  const addItem = () => {
    const newItem = { id: crypto.randomUUID() } as Record<string, unknown> & { id: string };
    fields.forEach((f) => {
      newItem[f.key] = "";
    });
    onChange([...items, newItem]);
  };

  const removeItem = (id: string) => {
    onChange(items.filter((item) => item.id !== id));
  };

  const updateItem = (id: string, key: string, value: string) => {
    onChange(items.map((item) => (item.id === id ? { ...item, [key]: value } : item)));
  };

  const duplicateItem = (id: string) => {
    const item = items.find((i) => i.id === id);
    if (item) {
      onChange([...items, { ...item, id: crypto.randomUUID() }]);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">{title}</CardTitle>
        <Button size="sm" onClick={addItem} className="rounded-xl">
          <Plus className="h-4 w-4 mr-2" />
          Add
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <AnimatePresence>
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="border rounded-xl p-4 relative"
            >
              <div className="absolute top-3 right-3 flex items-center gap-1">
                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => duplicateItem(item.id)}>
                  <Copy className="h-3.5 w-3.5" />
                </Button>
                <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => removeItem(item.id)}>
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {fields.map((field) => (
                  <div key={field.key} className={field.type === "textarea" ? "sm:col-span-2" : ""}>
                    <label className="block text-xs font-medium mb-1 text-muted-foreground">{field.label}</label>
                    {field.type === "textarea" ? (
                      <Textarea
                        value={(item[field.key] as string) || ""}
                        onChange={(e) => updateItem(item.id, field.key, e.target.value)}
                        className="min-h-[80px]"
                      />
                    ) : (
                      <Input
                        value={(item[field.key] as string) || ""}
                        onChange={(e) => updateItem(item.id, field.key, e.target.value)}
                      />
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {items.length === 0 && (
          <p className="text-center text-sm text-muted-foreground py-8">
            No items yet. Click &ldquo;Add&rdquo; to get started.
          </p>
        )}
      </CardContent>
    </Card>
  );
}

function SkillsEditor({
  items,
  onChange,
}: {
  items: Array<{ id: string; name: string; level?: string; category?: string }>;
  onChange: (items: Array<{ id: string; name: string; level?: string; category?: string }>) => void;
}) {
  const [newSkill, setNewSkill] = useState("");
  const [newCategory, setNewCategory] = useState("");

  const addSkill = () => {
    if (!newSkill.trim()) return;
    onChange([...items, { id: crypto.randomUUID(), name: newSkill.trim(), category: newCategory || undefined }]);
    setNewSkill("");
  };

  const removeSkill = (id: string) => {
    onChange(items.filter((s) => s.id !== id));
  };

  const categories = [...new Set(items.map((s) => s.category).filter(Boolean))];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Wrench className="h-5 w-5 text-primary" />
          Skills
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 mb-4">
          <Input
            placeholder="Add a skill..."
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
          />
          <Input
            placeholder="Category (optional)"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="max-w-[150px]"
          />
          <Button onClick={addSkill} size="sm" className="rounded-xl">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {items.map((skill) => (
            <Badge key={skill.id} variant="secondary" className="gap-1 pr-1">
              {skill.name}
              <button onClick={() => removeSkill(skill.id)} className="ml-1 hover:text-destructive">
                ×
              </button>
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function ResumePreview({ data }: { data: ResumeData }) {
  return (
    <div className="border rounded-xl p-6 bg-white dark:bg-card min-h-[600px] text-sm">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold">{data.personalInfo.fullName || "Your Name"}</h2>
        <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 mt-1 text-xs text-muted-foreground">
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
        </div>
      </div>

      {/* Summary */}
      {data.professionalSummary && (
        <div className="mb-4">
          <h3 className="text-xs font-bold uppercase tracking-wider mb-2 border-b pb-1">Professional Summary</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">{data.professionalSummary}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div className="mb-4">
          <h3 className="text-xs font-bold uppercase tracking-wider mb-2 border-b pb-1">Experience</h3>
          {data.experience.map((exp) => (
            <div key={exp.id} className="mb-2">
              <div className="flex justify-between">
                <span className="font-medium text-xs">{exp.title}</span>
                <span className="text-xs text-muted-foreground">{exp.startDate} - {exp.endDate || "Present"}</span>
              </div>
              <p className="text-xs font-medium text-muted-foreground">{exp.company}</p>
              {exp.description && <p className="text-xs text-muted-foreground mt-0.5">{exp.description}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <div className="mb-4">
          <h3 className="text-xs font-bold uppercase tracking-wider mb-2 border-b pb-1">Education</h3>
          {data.education.map((edu) => (
            <div key={edu.id} className="mb-1">
              <span className="font-medium text-xs">{edu.degree} in {edu.field}</span>
              <p className="text-xs text-muted-foreground">{edu.school}</p>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <div className="mb-4">
          <h3 className="text-xs font-bold uppercase tracking-wider mb-2 border-b pb-1">Skills</h3>
          <div className="flex flex-wrap gap-1">
            {data.skills.map((s) => (
              <span key={s.id} className="text-xs bg-muted px-2 py-0.5 rounded-full">{s.name}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
