import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { projectId, name, category, floor, areaSqFt } = body;

    if (!projectId || !name || !category) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const anchor = await prisma.anchorTenant.create({
      data: {
        projectId,
        name,
        category,
        floor: floor || null,
        areaSqFt: areaSqFt || null,
      },
    });

    return NextResponse.json(anchor, { status: 201 });
  } catch (error) {
    console.error('Create anchor error:', error);
    return NextResponse.json({ error: 'Failed to create anchor' }, { status: 500 });
  }
}
