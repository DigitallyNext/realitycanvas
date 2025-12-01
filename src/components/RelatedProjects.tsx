"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";

type Project = {
  id: string;
  slug: string;
  title: string;
  subtitle?: string | null;
  category: "COMMERCIAL" | "RESIDENTIAL" | "MIXED_USE" | "RETAIL_ONLY";
  status: "PLANNED" | "UNDER_CONSTRUCTION" | "READY";
  address: string;
  city?: string | null;
  state?: string | null;
  featuredImage: string;
  createdAt: string; // Match ProjectCard expectation exactly
  basePrice?: string | null;
  minRatePsf?: string | null;
  maxRatePsf?: string | null;
};

interface RelatedProjectsProps {
  currentSlug: string;
  city?: string | null;
  category?: string | null;
  limit?: number;
}

export default function RelatedProjects({
  currentSlug,
  city = "",
  category = "",
  limit = 3,
}: RelatedProjectsProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function fetchRelated() {
      try {
        const params = new URLSearchParams();
        params.set("page", "1");
        if (city) params.set("city", city);
        if (category) params.set("category", category);

        const res = await fetch(`/api/projects?${params.toString()}`, {
          headers: { Accept: "application/json" },
          cache: "default",
        });
        if (!res.ok) throw new Error(`Failed: ${res.status}`);
        const data = await res.json();
        const allRaw: any[] = (data.projects || []) as any[];
        // Normalize to ProjectCard's expected shape
        const all: Project[] = allRaw.map((p) => ({
          id: p.id,
          slug: p.slug,
          title: p.title,
          subtitle: p.subtitle ?? null,
          category: p.category,
          status: p.status,
          address: p.address,
          city: p.city ?? null,
          state: p.state ?? null,
          featuredImage: p.featuredImage,
          createdAt: typeof p.createdAt === "string"
            ? p.createdAt
            : (p.createdAt ? new Date(p.createdAt).toISOString() : new Date().toISOString()),
          basePrice: p.basePrice ?? null,
          minRatePsf: p.minRatePsf ?? null,
          maxRatePsf: p.maxRatePsf ?? null,
        }));
        // Filter out current slug and take top N
        const filtered = all.filter((p) => p.slug !== currentSlug).slice(0, limit);
        if (isMounted) setProjects(filtered);
      } catch (err) {
        console.error("Error fetching related projects", err);
        if (isMounted) setProjects([]);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    fetchRelated();
    return () => {
      isMounted = false;
    };
  }, [currentSlug, city, category, limit]);

  if (loading) {
    return (
      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Related Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm animate-pulse h-[320px]" />
          ))}
        </div>
      </div>
    );
  }

  if (!projects.length) return null;

  return (
    <div className="mt-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Related Projects</h2>
        <Link href="/projects" className="text-blue-600 dark:text-blue-400 hover:underline">
          View all projects →
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
