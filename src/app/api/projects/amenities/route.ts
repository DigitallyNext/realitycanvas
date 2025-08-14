import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { projectId, category, name, details } = body;

    if (!projectId || !category || !name) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const amenity = await prisma.amenity.create({
      data: {
        projectId,
        category,
        name,
        details: details || null,
      },
    });

    return NextResponse.json(amenity, { status: 201 });
  } catch (error) {
    console.error('Create amenity error:', error);
    return NextResponse.json({ error: 'Failed to create amenity' }, { status: 500 });
  }
}
