"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/layout/header";
import {
  FileText,
  Mail,
  Plus,
  Sparkles,
  TrendingUp,
  Clock,
  Star,
  FolderOpen,
  Download,
  Settings,
  Search,
  Bell,
  ChevronRight,
  BarChart3,
  Target,
  FileCheck,
  Zap,
  Layout,
} from "lucide-react";

const quickActions = [
  { icon: FileText, label: "New CV", href: "/builder/resume", color: "bg-blue-500/10 text-blue-500", desc: "Create ATS-optimized CV" },
  { icon: Mail, label: "Cover Letter", href: "/builder/cover-letter", color: "bg-purple-500/10 text-purple-500", desc: "Personalized letter" },
  { icon: Sparkles, label: "Create Both", href: "/builder/both", color: "bg-pink-500/10 text-pink-500", desc: "CV + Cover Letter" },
];

const recentDocs = [
  { id: "1", title: "Software Engineer CV - Google", type: "cv", updatedAt: "2 hours ago", score: 92 },
  { id: "2", title: "Cover Letter - Stripe Application", type: "cover-letter", updatedAt: "5 hours ago", score: 88 },
  { id: "3", title: "Product Manager CV", type: "cv", updatedAt: "1 day ago", score: 85 },
  { id: "4", title: "Cover Letter - Apple", type: "cover-letter", updatedAt: "2 days ago", score: 91 },
];

const stats = [
  { icon: FileCheck, label: "CVs Created", value: "12", color: "text-blue-500" },
  { icon: Mail, label: "Cover Letters", value: "8", color: "text-purple-500" },
  { icon: Download, label: "Downloads", value: "20", color: "text-green-500" },
  { icon: BarChart3, label: "Avg ATS Score", value: "89%", color: "text-orange-500" },
];

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <Header />
      <main className="pt-20 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Welcome Section */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Welcome back 👋</h1>
              <p className="text-muted-foreground mt-1">Create and manage your CVs and cover letters</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="rounded-xl">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </Button>
              <Link href="/dashboard/settings">
                <Button variant="outline" size="icon" className="rounded-xl">
                  <Settings className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8"
          >
            {quickActions.map((action) => (
              <Link key={action.label} href={action.href}>
                <Card className="hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 transition-all duration-300 cursor-pointer group">
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className={`h-12 w-12 rounded-xl ${action.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <action.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{action.label}</h3>
                      <p className="text-sm text-muted-foreground">{action.desc}</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                  </CardContent>
                </Card>
              </Link>
            ))}
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8"
          >
            {stats.map((stat) => (
              <Card key={stat.label}>
                <CardContent className="p-4 flex items-center gap-3">
                  <div className={`h-10 w-10 rounded-xl bg-muted flex items-center justify-center`}>
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </motion.div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Documents */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Recent Documents</CardTitle>
                    <CardDescription>Your recently created CVs and cover letters</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="h-9 w-48 rounded-xl border bg-background pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                    </div>
                    <Button variant="outline" size="sm" className="rounded-xl">
                      <FolderOpen className="h-4 w-4 mr-2" />
                      Folders
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {recentDocs.map((doc) => (
                      <div
                        key={doc.id}
                        className="flex items-center gap-4 p-3 rounded-xl hover:bg-muted/50 transition-colors cursor-pointer group"
                      >
                        <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${
                          doc.type === "cv" ? "bg-blue-500/10" : "bg-purple-500/10"
                        }`}>
                          {doc.type === "cv" ? (
                            <FileText className="h-5 w-5 text-blue-500" />
                          ) : (
                            <Mail className="h-5 w-5 text-purple-500" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium truncate">{doc.title}</h4>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {doc.updatedAt}
                          </div>
                        </div>
                        {doc.score && (
                          <Badge variant={doc.score >= 90 ? "success" : "secondary"} className="text-xs">
                            {doc.score}% ATS
                          </Badge>
                        )}
                        <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 text-center">
                    <Link href="/dashboard/documents">
                      <Button variant="ghost" size="sm" className="text-muted-foreground">
                        View All Documents
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Templates */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Popular Templates</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {["ATS Modern", "Corporate Blue", "Creative Color", "Minimal Air", "Executive Gold"].map((t) => (
                    <div key={t} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                      <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary/80 to-purple-500/80" />
                      <div>
                        <p className="text-sm font-medium">{t}</p>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                          <span className="text-xs text-muted-foreground">4.8</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* ATS Reports */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Recent ATS Reports</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { name: "Software Engineer CV", score: 92, date: "2h ago" },
                    { name: "Product Manager CV", score: 85, date: "1d ago" },
                  ].map((report) => (
                    <div key={report.name} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium truncate">{report.name}</p>
                        <p className="text-xs text-muted-foreground">{report.date}</p>
                      </div>
                      <Badge variant={report.score >= 90 ? "success" : "warning"}>
                        {report.score}%
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Quick Tips */}
              <Card className="gradient-primary text-white border-0">
                <CardContent className="p-6">
                  <Zap className="h-8 w-8 mb-3" />
                  <h3 className="font-bold text-lg mb-1">Upgrade to Premium</h3>
                  <p className="text-sm text-white/80 mb-4">
                    Get unlimited CVs, all templates, advanced AI optimization, and more.
                  </p>
                  <Button variant="secondary" className="w-full rounded-xl bg-white text-primary hover:bg-white/90">
                    Upgrade Now
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
