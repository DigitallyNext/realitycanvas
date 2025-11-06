export default function Head() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.realtycanvas.in';
  const url = `${baseUrl}/projects`;
  const title = 'Gurgaon Real Estate Projects | Residential & Commercial Listings | Realty Canvas';
  const description = 'Explore selected residential and commercial projects in Gurgaon with filters by status and budget. Book site visits, compare amenities, and receive verified legal support with Realty Canvas.';
  const keywords = 'Gurgaon real estate projects, residential projects, commercial projects, under construction, ready to move, Gurgaon';

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={url} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="Realty Canvas" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />

      <meta name="robots" content="index,follow" />
    </>
  );
}