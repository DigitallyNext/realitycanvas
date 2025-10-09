import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAllBlogPosts } from '@/lib/sanity/queries';

const BASE_URL = 'https://realitycanvas.vercel.app';

// Static pages that should be included in sitemap
const staticPages = [
  '',
  '/projects',
  '/blog',
  '/about',
  '/contact',
  '/services',
];

export async function GET() {
  try {
    // Fetch all projects from database
    const projects = await prisma.project.findMany({
      select: {
        slug: true,
        updatedAt: true,
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });

    // Fetch all blog posts from Sanity
    let blogPosts: Array<{ slug: string; publishedAt: string }> = [];
    try {
      const allBlogPosts = await getAllBlogPosts(100); // Get up to 100 blog posts
      blogPosts = allBlogPosts.map(post => ({
        slug: post.slug.current,
        publishedAt: post.publishedAt,
      }));
    } catch (error) {
      console.error('Error fetching blog posts for sitemap:', error);
      // Continue without blog posts if there's an error
    }

    // Generate sitemap XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticPages
    .map(
      (page) => `
  <url>
    <loc>${BASE_URL}${page}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${page === '' ? '1.0' : '0.8'}</priority>
  </url>`
    )
    .join('')}
  ${projects
    .map(
      (project) => `
  <url>
    <loc>${BASE_URL}/projects/${project.slug}</loc>
    <lastmod>${project.updatedAt.toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`
    )
    .join('')}
  ${blogPosts
    .map(
      (post) => `
  <url>
    <loc>${BASE_URL}/blog/${post.slug}</loc>
    <lastmod>${post.publishedAt}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`
    )
    .join('')}
</urlset>`;

    return new NextResponse(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600', // Cache for 1 hour
      },
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    
    // Return a basic sitemap with just static pages if there's an error
    const basicSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticPages
    .map(
      (page) => `
  <url>
    <loc>${BASE_URL}${page}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${page === '' ? '1.0' : '0.8'}</priority>
  </url>`
    )
    .join('')}
</urlset>`;

    return new NextResponse(basicSitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=300, s-maxage=300', // Shorter cache for error case
      },
    });
  }
}