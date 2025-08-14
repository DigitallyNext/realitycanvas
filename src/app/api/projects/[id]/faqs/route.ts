import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await prisma.faq.deleteMany({ where: { projectId: id } });
    return NextResponse.json({ message: 'FAQs deleted' });
  } catch (error) {
    console.error('Delete FAQs error:', error);
    return NextResponse.json({ error: 'Failed to delete FAQs' }, { status: 500 });
  }
}
