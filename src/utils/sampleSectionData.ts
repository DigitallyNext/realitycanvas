// Sample data for each section of the project creation process

export const sampleBasicInfo = {
  title: "M3M Jewel Commercial Complex",
  subtitle: "Premium commercial development in the heart of Gurgaon",
  description: "M3M Jewel is a state-of-the-art commercial complex offering premium retail and office spaces with world-class amenities and strategic location advantages.",
  category: "COMMERCIAL",
  status: "UNDER_CONSTRUCTION",
  address: "Sector 25, Golf Course Extension Road",
  city: "Gurgaon",
  state: "Haryana",
  reraId: "RC/REP/HARERA/GGM/2023/123456",
  developerName: "M3M Group",
  possessionDate: "2025-12-31"
};

export const sampleHighlights = [
  { label: "Prime Location", icon: "📍" },
  { label: "World-Class Architecture", icon: "🏗️" },
  { label: "24/7 Security", icon: "🛡️" },
  { label: "Ample Parking", icon: "🚗" },
  { label: "Modern Infrastructure", icon: "🏢" }
];

export const sampleAmenities = [
  { category: "SECURITY", name: "24/7 CCTV Surveillance", details: "Complete security coverage", icon: "🎥" },
  { category: "PARKING", name: "Multi-Level Parking", details: "Covered parking for 500+ vehicles", icon: "🚗" },
  { category: "CONNECTIVITY", name: "High-Speed Internet", details: "Fiber optic connectivity", icon: "🌐" },
  { category: "FACILITIES", name: "Food Court", details: "Multiple dining options", icon: "🍽️" },
  { category: "FACILITIES", name: "Conference Rooms", details: "Fully equipped meeting spaces", icon: "📊" }
];

export const sampleUnits = [
  { unitNumber: "G-001", type: "RETAIL", floor: "Ground Floor", areaSqFt: 800, ratePsf: 15000, priceTotal: 12000000, availability: "AVAILABLE" },
  { unitNumber: "G-002", type: "RETAIL", floor: "Ground Floor", areaSqFt: 1200, ratePsf: 15000, priceTotal: 18000000, availability: "AVAILABLE" },
  { unitNumber: "F1-001", type: "OFFICE", floor: "First Floor", areaSqFt: 1500, ratePsf: 12000, priceTotal: 18000000, availability: "HOLD" },
  { unitNumber: "F2-001", type: "OFFICE", floor: "Second Floor", areaSqFt: 2000, ratePsf: 10000, priceTotal: 20000000, availability: "AVAILABLE" }
];

export const sampleFloorPlans = [
  { level: "Ground Floor", title: "Retail Spaces", imageUrl: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800", details: "Premium retail spaces with high ceiling and modern fixtures" },
  { level: "First Floor", title: "Office Spaces", imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800", details: "Flexible office layouts with natural lighting" },
  { level: "Second Floor", title: "Corporate Offices", imageUrl: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800", details: "Executive office suites with premium amenities" }
];

export const samplePricingTable = [
  { type: "Ground Floor Retail", reraArea: "800-1200 Sq.ft", price: "₹12-18 Cr", pricePerSqft: "₹15,000/sq.ft", availableUnits: 12, floorNumbers: "GF" },
  { type: "First Floor Office", reraArea: "1500-2000 Sq.ft", price: "₹18-24 Cr", pricePerSqft: "₹12,000/sq.ft", availableUnits: 8, floorNumbers: "1F" },
  { type: "Second Floor Office", reraArea: "2000-3000 Sq.ft", price: "₹20-30 Cr", pricePerSqft: "₹10,000/sq.ft", availableUnits: 6, floorNumbers: "2F" }
];

export const sampleAnchors = [
  { name: "McDonald's", category: "FOOD_BEVERAGE", floor: "Ground Floor", areaSqFt: 1200, status: "CONFIRMED", icon: "🍟" },
  { name: "Starbucks", category: "FOOD_BEVERAGE", floor: "Ground Floor", areaSqFt: 800, status: "OPERATING", icon: "☕" },
  { name: "Tech Corp India", category: "CORPORATE", floor: "Second Floor", areaSqFt: 3000, status: "CONFIRMED", icon: "💻" }
];

export const sampleNearbyPoints = [
  { type: "METRO", name: "Huda City Centre Metro", distanceKm: 2.5, travelTimeMin: 8 },
  { type: "MALL", name: "Ambience Mall", distanceKm: 1.2, travelTimeMin: 5 },
  { type: "HOSPITAL", name: "Fortis Hospital", distanceKm: 3.0, travelTimeMin: 12 },
  { type: "SCHOOL", name: "DPS Gurgaon", distanceKm: 1.8, travelTimeMin: 7 }
];

export const sampleFaqs = [
  { question: "What are the payment options available?", answer: "We offer flexible payment plans including down payment with installments, full payment with discounts, and bank financing options with pre-approved loans." },
  { question: "Is there a maintenance fee?", answer: "Yes, there is a quarterly maintenance fee of ₹8-12 per sq.ft that covers common area upkeep, security, housekeeping, and basic amenities." },
  { question: "When is the expected completion date?", answer: "The project is scheduled for completion by December 2025, with phased handovers beginning from October 2025." },
  { question: "What are the rental yields expected?", answer: "Based on current market trends, rental yields are expected to be 8-12% annually for retail spaces and 6-10% for office spaces." }
];

export const sampleVideos = {
  videoUrl: "https://sample-videos.com/project-walkthrough.mp4",
  videoUrls: [
    "https://sample-videos.com/amenities-tour.mp4",
    "https://sample-videos.com/location-overview.mp4"
  ]
};

export const sampleLocation = {
  latitude: 28.4595,
  longitude: 77.0266,
  sitePlanImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200",
  sitePlanTitle: "Project Location Map",
  sitePlanDescription: "Strategic location with excellent connectivity to major landmarks"
};

// Helper function to get sample data by section
export function getSampleDataBySection(sectionId: string) {
  switch (sectionId) {
    case 'basic':
      return sampleBasicInfo;
    case 'features':
      return { highlights: sampleHighlights, amenities: sampleAmenities };
    case 'units':
      return sampleUnits;
    case 'floorplans':
      return sampleFloorPlans;
    case 'pricing':
      return samplePricingTable;
    case 'anchors':
      return sampleAnchors;
    case 'location':
      return { nearbyPoints: sampleNearbyPoints, ...sampleLocation };
    case 'faqs':
      return sampleFaqs;
    case 'videos':
      return sampleVideos;
    default:
      return null;
  }
}
