import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { projectId, name, planType, schedule, taxes, charges, notes } = body;

    if (!projectId || !name) {
      return NextResponse.json({ error: 'Missing required fields (projectId, name)' }, { status: 400 });
    }

    const pricingPlan = await prisma.pricingPlan.create({
      data: {
        projectId,
        name,
        planType: planType || 'CLP',
        schedule: schedule || null,
        taxes: Array.isArray(taxes) ? taxes : [],
        charges: Array.isArray(charges) ? charges : [],
        notes: notes || null,
      },
    });

    return NextResponse.json(pricingPlan, { status: 201 });
  } catch (error) {
    console.error('Create pricing plan error:', error);
    return NextResponse.json({ error: 'Failed to create pricing plan' }, { status: 500 });
  }
}
