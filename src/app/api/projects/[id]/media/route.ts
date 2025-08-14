import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await prisma.media.deleteMany({ where: { projectId: id } });
    return NextResponse.json({ message: 'Media deleted' });
  } catch (error) {
    console.error('Delete media error:', error);
    return NextResponse.json({ error: 'Failed to delete media' }, { status: 500 });
  }
}
