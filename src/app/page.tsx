"use client";

import { useEffect, useState } from "react";
// Homepage Components
import {
  HeroSection,
  PropertySearchSection,
  BenefitsSection,
  FeaturedProjectsSection,
  ServicesSection,
  NewsletterSection,
  ContactSection,
} from "@/components/homepage";
// import Adventure from "@/components/homepage/Adventure";
// import Developer from "@/components/homepage/Developer";
import Sections from "@/components/homepage/Sections";
import Newsletter from "@/components/homepage/Newsletter";

// Define the Property type based on the Prisma schema
type Project = {
  id: string;
  slug: string;
  title: string;
  subtitle?: string | null;
  category: 'COMMERCIAL' | 'RETAIL_ONLY' | 'MIXED_USE' | 'RESIDENTIAL';
  status: 'PLANNED' | 'UNDER_CONSTRUCTION' | 'READY';
  address: string;
  city?: string | null;
  state?: string | null;
  featuredImage: string;
  createdAt: string;
  minRatePsf?: string | null;
  maxRatePsf?: string | null;
};

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [contactSubmitting, setContactSubmitting] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);

  useEffect(() => {
    async function fetchProjects() {
      try {
        console.log("Fetching projects from API...");
        const timestamp = new Date().getTime();
        const response = await fetch(`/api/projects?t=${timestamp}`, { 
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
          }
        });

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        console.log("Projects API response:", data);

        // Ensure data is an array
        if (Array.isArray(data)) {
          setProjects(data);
        } else {
          console.error('Projects API did not return an array:', data);
          setProjects([]);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
        setProjects([]);
      } finally {
        setProjectsLoading(false);
      }
    }

    fetchProjects();
  }, []);



  const handleContactChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setContactForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitting(true);

    // Simulate API call
    try {
      // In a real app, you would send this data to your backend
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setContactSuccess(true);
      setContactForm({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error submitting contact form:", error);
    } finally {
      setContactSubmitting(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col pt-16 bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Hero Section */}
      <HeroSection />

      {/* Property Search Section */}
      {/* <PropertySearchSection /> */}

      {/* Benefits Section */}
      <BenefitsSection />

      {/* Featured Projects Section */}
      <FeaturedProjectsSection projects={projects} loading={projectsLoading} />

      {/* Trending Projects Section - handled by Sections component */}

      {/* Adventure Section */}
      {/* <Adventure /> */}

      {/* Developer Section */}
      {/* <Developer /> */}

      {/* Services Section */}
      <ServicesSection />

      {/* Newsletter Section */}
      <NewsletterSection />

      {/* Sections Section */}
      <Sections projects={projects} loading={projectsLoading} />

      {/* Newsletter Section */}
      <Newsletter />

      {/* Contact Section */}
      {/* <ContactSection
        contactForm={contactForm}
        contactSubmitting={contactSubmitting}
        contactSuccess={contactSuccess}
        onFormChange={handleContactChange}
        onFormSubmit={handleContactSubmit}
      /> */}
    </main>
  );
}