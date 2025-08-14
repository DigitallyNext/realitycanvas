import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

export class SupabaseStorageService {
  private bucketName = 'property-images'; // Match your existing Supabase bucket

  async uploadImage(file: File, folder: string = 'projects'): Promise<string> {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;

      // Try uploading to the bucket
      const { data, error } = await supabase.storage
        .from(this.bucketName)
        .upload(fileName, file);

      if (error) {
        console.error('Storage error:', error);
        // If bucket doesn't exist, try with a fallback approach
        if (error.message.includes('Bucket not found')) {
          console.warn('Bucket not found, trying alternative storage...');
          // For now, return a placeholder and inform user
          throw new Error('Storage bucket not configured. Please check Supabase setup.');
        }
        throw error;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from(this.bucketName)
        .getPublicUrl(fileName);

      return publicUrl;
    } catch (error) {
      console.error('Upload error:', error);
      throw new Error(`Failed to upload image: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async uploadMultipleImages(files: File[], folder: string = 'projects'): Promise<string[]> {
    try {
      const uploadPromises = files.map(file => this.uploadImage(file, folder));
      return await Promise.all(uploadPromises);
    } catch (error) {
      console.error('Multiple upload error:', error);
      throw new Error('Failed to upload images');
    }
  }

  async uploadVideo(file: File, folder: string = 'videos'): Promise<string> {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;

      const { data, error } = await supabase.storage
        .from(this.bucketName)
        .upload(fileName, file);

      if (error) {
        console.error('Storage error:', error);
        if (error.message.includes('Bucket not found')) {
          throw new Error('Storage bucket not configured. Please check Supabase setup.');
        }
        throw error;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from(this.bucketName)
        .getPublicUrl(fileName);

      return publicUrl;
    } catch (error) {
      console.error('Video upload error:', error);
      throw new Error(`Failed to upload video: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async deleteImage(url: string): Promise<void> {
    try {
      // Extract file path from URL
      const urlParts = url.split('/');
      const fileName = urlParts[urlParts.length - 1];
      const folder = urlParts[urlParts.length - 2];
      const filePath = `${folder}/${fileName}`;

      const { error } = await supabase.storage
        .from(this.bucketName)
        .remove([filePath]);

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Delete error:', error);
      throw new Error('Failed to delete image');
    }
  }

  getPublicUrl(path: string): string {
    const { data } = supabase.storage
      .from(this.bucketName)
      .getPublicUrl(path);
    
    return data.publicUrl;
  }
}

export const storageService = new SupabaseStorageService();
