"use client";

import { motion } from "framer-motion";
import { templates, templateCategories } from "@/lib/templates";
import { Sparkles, Star, Crown } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function TemplatesShowcase() {
  const featuredTemplates = templates.slice(0, 12);

  return (
    <section id="templates" className="py-24 sm:py-32 bg-muted/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4">
              <Sparkles className="h-3.5 w-3.5" />
              Premium Templates
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              50+ Stunning{" "}
              <span className="gradient-text">Templates</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Professionally designed, ATS-friendly templates for every industry and career level.
            </p>
          </motion.div>
        </div>

        {/* Category Pills */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-2 justify-center mb-12"
        >
          {templateCategories.slice(0, 10).map((cat) => (
            <span
              key={cat.id}
              className="px-4 py-2 rounded-full bg-card border text-sm font-medium hover:border-primary/30 hover:bg-primary/5 cursor-pointer transition-colors"
            >
              {cat.name}
            </span>
          ))}
          <span className="px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary cursor-pointer">
            +{templateCategories.length - 10} more
          </span>
        </motion.div>

        {/* Template Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {featuredTemplates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.03 }}
              className="group cursor-pointer"
            >
              <div
                className="relative rounded-2xl border bg-card overflow-hidden aspect-[3/4] mb-3 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/30 transition-all duration-300"
                style={{ backgroundColor: template.thumbnailColor }}
              >
                {/* Template thumbnail preview */}
                <div className="absolute inset-0 p-4 flex flex-col gap-2">
                  <div className="h-3 w-2/3 rounded-full bg-white/20" />
                  <div className="h-2 w-full rounded-full bg-white/10" />
                  <div className="h-2 w-5/6 rounded-full bg-white/10" />
                  <div className="h-2 w-3/4 rounded-full bg-white/10" />
                  <div className="mt-2 h-1.5 w-1/3 rounded-full bg-white/20" />
                  <div className="h-1.5 w-full rounded-full bg-white/10" />
                  <div className="h-1.5 w-4/5 rounded-full bg-white/10" />
                  <div className="h-1.5 w-2/3 rounded-full bg-white/10" />
                  <div className="mt-2 h-1.5 w-1/4 rounded-full bg-white/20" />
                  <div className="h-1.5 w-full rounded-full bg-white/10" />
                </div>

                {/* Premium badge */}
                {template.isPremium && (
                  <div className="absolute top-2 right-2">
                    <Badge variant="premium" className="text-[10px] px-1.5 py-0">
                      <Crown className="h-2.5 w-2.5 mr-0.5" />
                      PRO
                    </Badge>
                  </div>
                )}

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white text-sm font-medium">Use Template</span>
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

        <div className="text-center mt-10">
          <span className="text-sm text-muted-foreground">
            And {templates.length - featuredTemplates.length}+ more templates available for every industry
          </span>
        </div>
      </div>
    </section>
  );
}
