import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await prisma.anchorTenant.deleteMany({ where: { projectId: id } });
    return NextResponse.json({ message: 'Anchors deleted' });
  } catch (error) {
    console.error('Delete anchors error:', error);
    return NextResponse.json({ error: 'Failed to delete anchors' }, { status: 500 });
  }
}
