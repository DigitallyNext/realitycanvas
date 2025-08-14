import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { projectId, level, title, imageUrl, details, sortOrder } = body;

    if (!projectId || !level || !imageUrl) {
      return NextResponse.json({ error: 'Missing required fields (projectId, level, imageUrl)' }, { status: 400 });
    }

    const floorPlan = await prisma.floorPlan.create({
      data: {
        projectId,
        level,
        title: title || null,
        imageUrl,
        details: details || null,
        sortOrder: sortOrder || 0,
      },
    });

    return NextResponse.json(floorPlan, { status: 201 });
  } catch (error) {
    console.error('Create floor plan error:', error);
    return NextResponse.json({ error: 'Failed to create floor plan' }, { status: 500 });
  }
}
