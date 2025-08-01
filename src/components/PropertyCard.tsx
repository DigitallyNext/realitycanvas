import Image from 'next/image';
import Link from 'next/link';
import { Property } from '../generated/prisma';

type PropertyCardProps = {
  property: Property;
};

export default function PropertyCard({ property }: PropertyCardProps) {
  // Use the featured image as the main display image
  const mainImage = property.featuredImage || '/placeholder-property.svg';

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden dark:bg-gray-800">
      <div className="relative h-48 w-full">
        <Image
          src={mainImage}
          alt={property.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{property.title}</h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">{property.address}</p>
        <p className="text-indigo-600 dark:text-indigo-400 font-bold text-xl mb-2">
          ${property.price.toLocaleString()}
        </p>
        <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-2 mb-4">
          {property.description}
        </p>
        <Link 
          href={`/properties/${property.id}`}
          className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}