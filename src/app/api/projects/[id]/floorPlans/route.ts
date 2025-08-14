import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await prisma.floorPlan.deleteMany({ where: { projectId: id } });
    return NextResponse.json({ message: 'Floor plans deleted' });
  } catch (error) {
    console.error('Delete floor plans error:', error);
    return NextResponse.json({ error: 'Failed to delete floor plans' }, { status: 500 });
  }
}
