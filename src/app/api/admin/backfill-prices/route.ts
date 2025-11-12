import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { parseIndianPriceRangeToMinMax } from '@/lib/price';

export async function POST(req: NextRequest) {
  try {
    const adminSecret = process.env.ADMIN_SECRET;
    const provided = req.headers.get('x-admin-secret');
    if (!adminSecret || provided !== adminSecret) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const limit = Math.min(500, Math.max(1, parseInt(searchParams.get('limit') || '200')));

    // Ensure columns exist before attempting backfill
    const cols = await prisma.$queryRaw<{ column_name: string }[]>`
      SELECT column_name FROM information_schema.columns
      WHERE table_name = 'Project' AND column_name IN ('priceMin', 'priceMax')
    `;
    const hasMin = cols.some(c => c.column_name === 'priceMin');
    const hasMax = cols.some(c => c.column_name === 'priceMax');
    if (!hasMin) {
      return NextResponse.json({ error: 'priceMin column missing. Deploy schema first.' }, { status: 400 });
    }

    // Pull projects that need backfill via raw SQL
    const projects = await prisma.$queryRaw<{ id: string; slug: string; basePrice: string | null }[]>`
      SELECT id, slug, "basePrice"
      FROM "Project"
      WHERE "priceMin" IS NULL OR ${hasMax ? Prisma.sql`"priceMax" IS NULL` : Prisma.sql`FALSE`}
      ORDER BY "updatedAt" DESC
      LIMIT ${limit}
    `;

    if (!projects.length) {
      return NextResponse.json({ updated: 0, message: 'No projects require backfill' });
    }

    let updated = 0;
    for (const p of projects) {
      const { min, max } = parseIndianPriceRangeToMinMax(p.basePrice || undefined);
      // Only update when we have at least a min value
      if (min !== null) {
        // Use raw SQL update to avoid schema typing issues during rollout
        await prisma.$executeRaw`
          UPDATE "Project"
          SET "priceMin" = ${min}, "priceMax" = ${max ?? min}
          WHERE id = ${p.id}
        `;
        updated++;
      }
    }

    return NextResponse.json({ updated, remainingHint: 'Call again to process more.' });
  } catch (error) {
    console.error('Backfill prices error:', error);
    return NextResponse.json({ error: 'Failed to backfill prices' }, { status: 500 });
  }
}