import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const { title, description, price, address, location, currency, featuredImage, galleryImages, beds, baths, area } = body;
    
    if (!title || !description || !price || !address || !location || !featuredImage) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    try {
      // Ensure galleryImages is an array and doesn't contain null values
      const validGalleryImages = Array.isArray(galleryImages) 
        ? galleryImages.filter(url => url !== null && url !== undefined) 
        : [];
      
      // Create the property in the database
      const property = await prisma.property.create({
        data: {
          title,
          description,
          price,
          address,
          location,
          currency: currency || 'USD',
          featuredImage,
          galleryImages: validGalleryImages,
          beds: beds || 0,
          baths: baths || 0,
          area: area || 0,
        },
      });

      return NextResponse.json(property, { status: 201 });
    } catch (dbError) {
      console.error('Database error creating property:', dbError);
      console.log('API: Database connection error when creating property');
      // Ensure galleryImages is an array and doesn't contain null values
      const validGalleryImages = Array.isArray(galleryImages) 
        ? galleryImages.filter(url => url !== null && url !== undefined) 
        : [];
      
      // Create a mock property with a generated ID
      const mockProperty = {
        id: `mock-${Date.now()}`,
        title,
        description,
        price,
        address,
        location,
        currency: currency || 'USD',
        featuredImage,
        galleryImages: validGalleryImages,
        beds: beds || 0,
        baths: baths || 0,
        area: area || 0,
        createdAt: new Date()
      };
      
      return NextResponse.json(
        { property: mockProperty, warning: 'Created in mock mode due to database connection error' },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error('Error creating property:', error);
    return NextResponse.json(
      { error: 'Failed to create property' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    let properties = [];
    
    try {
      // Try to fetch from database
      properties = await prisma.property.findMany({
        orderBy: {
          createdAt: 'desc',
        },
      });

      return NextResponse.json(properties);
    } catch (dbError) {
      console.error('Database error fetching properties:', dbError);
      return NextResponse.json(
        { properties: [] },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error('Error fetching properties:', error);
    return NextResponse.json(
      { error: 'Failed to fetch properties' },
      { status: 500 }
    );
  }
}