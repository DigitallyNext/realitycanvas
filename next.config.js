/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      
      'images.unsplash.com',
      'xsgljyuvykzfzvqwgtev.supabase.co', // Wildcard pattern for all Supabase URLs
      // Or use a wildcard like:
      'supabase.co',
    
    ],
  },
};

module.exports = nextConfig;