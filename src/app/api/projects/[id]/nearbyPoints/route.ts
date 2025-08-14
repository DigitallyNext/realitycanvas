import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await prisma.nearbyPoint.deleteMany({ where: { projectId: id } });
    return NextResponse.json({ message: 'Nearby points deleted' });
  } catch (error) {
    console.error('Delete nearby points error:', error);
    return NextResponse.json({ error: 'Failed to delete nearby points' }, { status: 500 });
  }
}
