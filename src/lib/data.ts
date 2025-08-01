import { Property } from '../generated/prisma';

// Sample property data
export const sampleProperties: Property[] = [
  {
    id: '1',
    title: 'Modern Apartment with Ocean View',
    description: 'Luxurious 2-bedroom apartment with stunning ocean views, modern amenities, and a prime location near shopping and dining.',
    price: 450000,
    address: '123 Coastal Drive, Miami, FL',
    imageUrls: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?q=80&w=2070&auto=format&fit=crop'
    ],
    createdAt: new Date()
  },
  {
    id: '2',
    title: 'Spacious Family Home',
    description: 'Beautiful 4-bedroom family home with large backyard, updated kitchen, and finished basement in a quiet neighborhood.',
    price: 675000,
    address: '456 Maple Street, Portland, OR',
    imageUrls: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop'
    ],
    createdAt: new Date()
  },
  {
    id: '3',
    title: 'Downtown Loft',
    description: 'Stylish industrial loft in the heart of downtown with high ceilings, exposed brick, and modern finishes.',
    price: 525000,
    address: '789 Urban Avenue, Chicago, IL',
    imageUrls: [
      'https://images.unsplash.com/photo-1560448075-bb485b067938?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?q=80&w=2070&auto=format&fit=crop'
    ],
    createdAt: new Date()
  },
  {
    id: '4',
    title: 'Mountain Retreat',
    description: 'Cozy 3-bedroom cabin with breathtaking mountain views, wood-burning fireplace, and private hiking trails.',
    price: 395000,
    address: '101 Pine Ridge Road, Aspen, CO',
    imageUrls: [
      'https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=2065&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop'
    ],
    createdAt: new Date()
  },
  {
    id: '5',
    title: 'Luxury Beachfront Villa',
    description: 'Exclusive 5-bedroom beachfront villa with infinity pool, private beach access, and panoramic ocean views.',
    price: 1250000,
    address: '222 Shoreline Drive, Malibu, CA',
    imageUrls: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=2070&auto=format&fit=crop'
    ],
    createdAt: new Date()
  },
  {
    id: '6',
    title: 'Historic Brownstone',
    description: 'Charming 3-bedroom brownstone with original hardwood floors, crown molding, and updated systems in a historic district.',
    price: 850000,
    address: '333 Heritage Lane, Boston, MA',
    imageUrls: [
      'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=2070&auto=format&fit=crop'
    ],
    createdAt: new Date()
  }
];