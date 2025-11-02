import { NextRequest, NextResponse } from 'next/server';
import { databaseWarmup } from '@/lib/database-warmup';
import { revalidatePath } from 'next/cache';

export async function POST(request: NextRequest) {
  const startedAt = Date.now();

  // Basic protection: require admin secret in production
  const adminSecret = process.env.ADMIN_SECRET;
  const provided = request.headers.get('x-admin-secret') || '';
  if (process.env.NODE_ENV === 'production') {
    if (!adminSecret || provided !== adminSecret) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  try {
    const warmedDb = await databaseWarmup.ensureReady();

    const origin = new URL(request.url).origin;
    const results: Array<{ endpoint: string; status: number; ok: boolean; duration: number }> = [];

    // Prime projects list cache
    const projectsUrl = `${origin}/api/projects?limit=12`;
    const pStart = Date.now();
    const pRes = await fetch(projectsUrl, { cache: 'no-store' });
    results.push({ endpoint: projectsUrl, status: pRes.status, ok: pRes.ok, duration: Date.now() - pStart });

    // Prime trending cache
    const trendingUrl = `${origin}/api/projects/trending?limit=12`;
    const tStart = Date.now();
    const tRes = await fetch(trendingUrl, { cache: 'no-store' });
    results.push({ endpoint: trendingUrl, status: tRes.status, ok: tRes.ok, duration: Date.now() - tStart });

    // Revalidate homepage path to pick up fresh data if ISR stale
    try {
      revalidatePath('/');
    } catch {}

    return NextResponse.json({
      warmedDb,
      warmedCaches: results,
      totalDurationMs: Date.now() - startedAt,
    }, {
      headers: { 'Cache-Control': 'no-store' }
    });
  } catch (error) {
    console.error('Warm caches error:', error);
    return NextResponse.json({ error: 'Warm caches failed' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  // Allow GET for convenience (calls POST handler logic)
  return POST(request);
}