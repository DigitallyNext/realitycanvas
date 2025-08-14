import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

async function uniqueSlug(base: string) {
  let candidate = base || 'project';
  for (let i = 0; i < 5; i++) {
    const exists = await prisma.project.findFirst({ where: { slug: candidate } });
    if (!exists) return candidate;
    const suffix = Math.random().toString(36).slice(2, 6);
    candidate = `${base}-${suffix}`;
  }
  return `${base}-${Date.now().toString(36)}`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      title,
      description,
      address,
      featuredImage,
      galleryImages = [],
      subtitle,
      category = 'COMMERCIAL',
      status = 'PLANNED',
      locality,
      city,
      state,
      reraId,
      developerName,
      developerLogo,
      possessionDate,
      launchDate,
      latitude,
      longitude,
      currency = 'INR',
      bannerTitle,
      bannerSubtitle,
      bannerDescription,
      aboutTitle,
      aboutDescription,
      sitePlanImage,
      sitePlanTitle,
      sitePlanDescription,
      slug,
    } = body || {};

    if (!title || !description || !address || !featuredImage) {
      return NextResponse.json({ error: 'Missing required fields (title, description, address, featuredImage)' }, { status: 400 });
    }

    const baseSlug = slug ? slugify(slug) : slugify(title);
    const finalSlug = await uniqueSlug(baseSlug);

    const project = await prisma.project.create({
      data: {
        slug: finalSlug,
        title,
        subtitle: subtitle || null,
        description,
        category,
        status,
        reraId: reraId || null,
        developerName: developerName || null,
        developerLogo: developerLogo || null,
        possessionDate: possessionDate ? new Date(possessionDate) : null,
        launchDate: launchDate ? new Date(launchDate) : null,
        address,
        locality: locality || null,
        city: city || null,
        state: state || null,
        latitude: typeof latitude === 'number' ? latitude : null,
        longitude: typeof longitude === 'number' ? longitude : null,
        currency,
        featuredImage,
        galleryImages: Array.isArray(galleryImages) ? galleryImages : [],
        bannerTitle: bannerTitle || null,
        bannerSubtitle: bannerSubtitle || null,
        bannerDescription: bannerDescription || null,
        aboutTitle: aboutTitle || null,
        aboutDescription: aboutDescription || null,
        sitePlanImage: sitePlanImage || null,
        sitePlanTitle: sitePlanTitle || null,
        sitePlanDescription: sitePlanDescription || null,
      },
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error('Create project error:', error);
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        slug: true,
        title: true,
        subtitle: true,
        category: true,
        status: true,
        address: true,
        city: true,
        state: true,
        featuredImage: true,
        galleryImages: true,
        createdAt: true,
        minRatePsf: true,
        maxRatePsf: true,
      },
    });
    return NextResponse.json(projects);
  } catch (error) {
    console.error('List projects error:', error);
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}
