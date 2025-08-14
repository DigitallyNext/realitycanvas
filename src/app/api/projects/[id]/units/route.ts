import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const units = await prisma.unit.findMany({
      where: { projectId: id },
      orderBy: [{ floor: 'asc' }, { unitNumber: 'asc' }],
    });
    return NextResponse.json(units);
  } catch (error) {
    console.error('List units error:', error);
    return NextResponse.json({ error: 'Failed to fetch units' }, { status: 500 });
  }
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();

    const {
      unitNumber,
      type,
      floor,
      areaSqFt,
      frontageFt,
      ceilingHeightFt,
      fitOutStatus,
      nearAnchor = false,
      isCorner = false,
      visibilityScore,
      ventilationReady,
      priceTotal,
      ratePsf,
      leaseModel,
      lockInMonths,
      escalationPct,
      availability = 'AVAILABLE',
      notes,
      configurationId,
    } = body || {};

    if (!unitNumber || !type || !floor || typeof areaSqFt !== 'number') {
      return NextResponse.json({ error: 'Missing required fields (unitNumber, type, floor, areaSqFt)' }, { status: 400 });
    }

    const unit = await prisma.unit.create({
      data: {
        projectId: id,
        configurationId: configurationId || null,
        unitNumber,
        type,
        floor,
        areaSqFt,
        frontageFt: typeof frontageFt === 'number' ? frontageFt : null,
        ceilingHeightFt: typeof ceilingHeightFt === 'number' ? ceilingHeightFt : null,
        fitOutStatus: fitOutStatus || null,
        nearAnchor,
        isCorner,
        visibilityScore: typeof visibilityScore === 'number' ? visibilityScore : null,
        ventilationReady: typeof ventilationReady === 'boolean' ? ventilationReady : null,
        priceTotal: typeof priceTotal === 'number' ? priceTotal : null,
        ratePsf: typeof ratePsf === 'number' ? ratePsf : null,
        leaseModel: leaseModel || null,
        lockInMonths: typeof lockInMonths === 'number' ? lockInMonths : null,
        escalationPct: typeof escalationPct === 'number' ? escalationPct : null,
        availability,
        notes: notes || null,
      },
    });

    return NextResponse.json(unit, { status: 201 });
  } catch (error) {
    console.error('Create unit error:', error);
    return NextResponse.json({ error: 'Failed to create unit' }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await prisma.unit.deleteMany({ where: { projectId: id } });
    return NextResponse.json({ message: 'Units deleted' });
  } catch (error) {
    console.error('Delete units error:', error);
    return NextResponse.json({ error: 'Failed to delete units' }, { status: 500 });
  }
}