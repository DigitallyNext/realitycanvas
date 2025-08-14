import { NextRequest, NextResponse } from 'next/server';
import { geminiService } from '@/lib/gemini';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, data } = body;

    switch (type) {
      case 'description':
        const description = await geminiService.generateProjectDescription(data);
        return NextResponse.json({ success: true, content: description });

      case 'highlights':
        const highlights = await geminiService.generateHighlights(data);
        return NextResponse.json({ success: true, content: highlights });

      case 'faqs':
        const faqs = await geminiService.generateFAQs(data);
        return NextResponse.json({ success: true, content: faqs });

      case 'amenities':
        const amenities = await geminiService.generateAmenities(data.category);
        return NextResponse.json({ success: true, content: amenities });

      default:
        return NextResponse.json({ success: false, error: 'Invalid type' }, { status: 400 });
    }
  } catch (error) {
    console.error('AI Generation error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate content' },
      { status: 500 }
    );
  }
}
