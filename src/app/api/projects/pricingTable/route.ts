import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      projectId, 
      type, 
      reraArea, 
      price, 
      pricePerSqft, 
      availableUnits, 
      floorNumbers, 
      features 
    } = body;

    if (!projectId) {
      return NextResponse.json({ error: 'Project ID is required' }, { status: 400 });
    }

    const pricingTableEntry = await prisma.pricingTable.create({
      data: {
        projectId,
        type: type || '',
        reraArea: reraArea || '',
        price: price || '',
        pricePerSqft: pricePerSqft || null,
        availableUnits: availableUnits ? parseInt(availableUnits) : null,
        floorNumbers: floorNumbers || null,
        features: features || null,
      },
    });

    return NextResponse.json(pricingTableEntry);
  } catch (error) {
    console.error('Create pricing table entry error:', error);
    return NextResponse.json({ error: 'Failed to create pricing table entry' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get('projectId');

    if (!projectId) {
      return NextResponse.json({ error: 'Project ID is required' }, { status: 400 });
    }

    await prisma.pricingTable.deleteMany({
      where: { projectId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete pricing table entries error:', error);
    return NextResponse.json({ error: 'Failed to delete pricing table entries' }, { status: 500 });
  }
}
