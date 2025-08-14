/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Prefer remotePatterns for flexibility (protocol + host + path)
    remotePatterns: [
      // Unsplash (all paths)
      new URL('https://images.unsplash.com/**'),

      // Supabase storage buckets (your project)
      new URL('https://xsgljyuvykzfzvqwgtev.supabase.co/**'),
      // Generic supabase domain (if you truly pull from other supabase projects)
      new URL('https://*.supabase.co/**'),

      // Pexels
      new URL('https://images.pexels.com/**'),

      // Wikimedia
      new URL('https://upload.wikimedia.org/**'),

      // Your specific site throwing the error earlier
      new URL('https://m3mjewel.commercial-gurgaon.in/**'),

      // Example placeholder
      new URL('https://example.com/**'),

      // M3M Jewel
      new URL('https://www.m3mproperties.com/floorplan/**'),

      // M3M Jewel New
      new URL('https://m3mjewel.commercial-gurgaon.in/img/**'),

       
    ],
  },

  webpack: (config) => {
    // Keep as-is unless you need custom rules/plugins
    return config;
  },
};

module.exports = nextConfig;
