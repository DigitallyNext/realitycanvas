import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Generate a unique file name to prevent collisions
    const fileExtension = file.name.split('.').pop();
    const fileName = `${uuidv4()}.${fileExtension}`;
    
    // Convert file to ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();
    const fileBuffer = new Uint8Array(arrayBuffer);

    // Check if bucket exists and create it if it doesn't
    const { data: buckets, error: listBucketsError } = await supabaseAdmin.storage.listBuckets();
    
    if (listBucketsError) {
      console.error('Error listing buckets:', listBucketsError);
      return NextResponse.json(
        { error: 'Failed to check storage buckets' },
        { status: 500 }
      );
    }
    
    const bucketExists = buckets.some(bucket => bucket.name === 'property-images');
    
    if (!bucketExists) {
      console.log('Creating property-images bucket...');
      const { error: bucketError } = await supabaseAdmin.storage.createBucket('property-images', {
        public: true
      });
      
      if (bucketError) {
        console.error('Error creating bucket:', bucketError);
        return NextResponse.json(
          { error: 'Failed to create storage bucket' },
          { status: 500 }
        );
      }
      console.log('Bucket created successfully');
    }
    
    // Upload to Supabase Storage
    const { error } = await supabase.storage
      .from('property-images')
      .upload(fileName, fileBuffer, {
        contentType: file.type,
        upsert: false,
      });

    if (error) {
      console.error('Supabase storage error:', error);
      return NextResponse.json(
        { error: 'Failed to upload image' },
        { status: 500 }
      );
    }

    // Get the public URL for the uploaded file
    const { data: { publicUrl } } = supabase.storage
      .from('property-images')
      .getPublicUrl(fileName);

    return NextResponse.json({ url: publicUrl }, { status: 200 });
  } catch (error) {
    console.error('Error uploading image:', error);
    return NextResponse.json(
      { error: 'Failed to process image upload' },
      { status: 500 }
    );
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};