import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await prisma.highlight.deleteMany({ where: { projectId: id } });
    return NextResponse.json({ message: 'Highlights deleted' });
  } catch (error) {
    console.error('Delete highlights error:', error);
    return NextResponse.json({ error: 'Failed to delete highlights' }, { status: 500 });
  }
}
