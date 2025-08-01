import Link from 'next/link';
import PropertyCard from '../components/PropertyCard';
import { prisma } from '../lib/prisma';
import { Property } from '../generated/prisma';

export const dynamic = 'force-dynamic';

export default async function Home() {
  // Fetch properties from the database
  let properties: Property[] = [];
  
  try {
    // Try to fetch from database
    properties = await prisma.property.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  } catch (error) {
    console.error('Error fetching properties:', error);
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Featured Properties</h1>
        <Link
          href="/properties/new"
          className="px-4 py-2 rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add Property
        </Link>
      </div>

      {properties.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-xl font-medium text-gray-600 dark:text-gray-400">No properties found</h2>
          <p className="mt-2 text-gray-500 dark:text-gray-500">Add your first property to get started.</p>
          <div className="mt-6">
            <Link
              href="/properties/new"
              className="px-4 py-2 rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add Property
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}
    </div>
  );
}
