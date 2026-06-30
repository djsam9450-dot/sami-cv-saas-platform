"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { templates, templateCategories, type Template } from "@/lib/templates";
import { Star, Crown, Search, Sparkles, SlidersHorizontal } from "lucide-react";

export default function TemplatesPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showPremiumOnly, setShowPremiumOnly] = useState(false);

  const filtered = templates.filter((t) => {
    if (selectedCategory && t.category !== selectedCategory) return false;
    if (showPremiumOnly && !t.isPremium) return false;
    if (search && !t.name.toLowerCase().includes(search.toLowerCase()) && !t.category.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <>
      <Header />
      <main className="pt-24 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4">
                <Sparkles className="h-3.5 w-3.5" />
                Template Library
              </span>
              <h1 className="text-3xl sm:text-4xl font-bold mb-4">
                50+ Premium <span className="gradient-text">Templates</span>
              </h1>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Professionally designed, ATS-friendly templates for every industry and career level
              </p>
            </motion.div>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search templates..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 rounded-xl"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={selectedCategory === null ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(null)}
                className="rounded-xl"
              >
                All
              </Button>
              {templateCategories.slice(0, 8).map((cat) => (
                <Button
                  key={cat.id}
                  variant={selectedCategory === cat.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(cat.id)}
                  className="rounded-xl"
                >
                  {cat.name}
                </Button>
              ))}
              <Button
                variant={showPremiumOnly ? "premium" : "outline"}
                size="sm"
                onClick={() => setShowPremiumOnly(!showPremiumOnly)}
                className="rounded-xl"
              >
                <Crown className="h-3.5 w-3.5 mr-1" />
                Premium
              </Button>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filtered.map((template, index) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.02 }}
                className="group cursor-pointer"
              >
                <div
                  className="relative rounded-2xl border bg-card overflow-hidden aspect-[3/4] mb-3 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/30 transition-all duration-300"
                  style={{ backgroundColor: template.thumbnailColor }}
                >
                  <div className="absolute inset-0 p-4 flex flex-col gap-2">
                    <div className="h-3 w-2/3 rounded-full bg-white/20" />
                    <div className="h-2 w-full rounded-full bg-white/10" />
                    <div className="h-2 w-5/6 rounded-full bg-white/10" />
                    <div className="h-2 w-3/4 rounded-full bg-white/10" />
                    <div className="mt-2 h-1.5 w-1/3 rounded-full bg-white/20" />
                    <div className="h-1.5 w-full rounded-full bg-white/10" />
                    <div className="h-1.5 w-4/5 rounded-full bg-white/10" />
                    <div className="h-1.5 w-2/3 rounded-full bg-white/10" />
                  </div>

                  {template.isPremium && (
                    <div className="absolute top-2 right-2">
                      <Badge variant="premium" className="text-[10px] px-1.5 py-0">
                        <Crown className="h-2.5 w-2.5 mr-0.5" /> PRO
                      </Badge>
                    </div>
                  )}

                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button size="sm" variant="secondary" className="rounded-xl">
                      Use Template
                    </Button>
                  </div>

                  {/* Color dots */}
                  <div className="absolute bottom-2 left-2 flex gap-1">
                    {template.colors.slice(0, 3).map((color) => (
                      <div key={color} className="h-2.5 w-2.5 rounded-full border border-white/30" style={{ backgroundColor: color }} />
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-1 mb-0.5">
                    <h4 className="text-xs font-semibold truncate">{template.name}</h4>
                    {template.rating >= 4.5 && (
                      <Star className="h-3 w-3 text-yellow-500 fill-yellow-500 shrink-0" />
                    )}
                  </div>
                  <p className="text-[10px] text-muted-foreground capitalize">{template.category.replace("-", " ")}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground">No templates found matching your criteria</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
