import { IconType } from 'react-icons';
import { 
  FaHome, FaMapMarkerAlt, FaStar, FaBuilding, FaLock, FaCar, 
  FaSwimmingPool, FaDumbbell, FaTree, FaMoneyBillWave, FaLink, 
  FaTrophy, FaWifi, FaShieldAlt, FaSubway, FaSchool, FaShoppingCart,
  FaUtensils, FaHospital, FaUniversity, FaCity, FaMountain, FaSun,
  FaWater, FaUmbrellaBeach, FaGem, FaHeart, FaRegHeart, FaKey,
  FaRuler, FaCalendarAlt, FaParking, FaChair, FaBed, FaBath,
  FaSnowflake, FaFire, FaWind, FaLeaf, FaRecycle, FaSolarPanel,
  FaChargingStation, FaAccessibleIcon, FaBabyCarriage, FaDog,
  FaCamera, FaVideo, FaLaptop, FaTv, FaGamepad, FaCouch, FaTable,
  FaShower, FaToilet, FaHotTub, FaSwimmer, FaRunning,
  FaBiking, FaHiking, FaGolfBall, FaBasketballBall, FaFootballBall,
  FaVolleyballBall, FaTableTennis, FaChess, FaGuitar,
  FaMusic, FaBook, FaTheaterMasks, FaPaintBrush, FaPalette, FaTools,
  FaHammer, FaWrench, FaScrewdriver, FaRulerCombined, FaRulerVertical,
  FaRulerHorizontal, FaCompass, FaDrawPolygon, FaVectorSquare, FaCube,
  FaCubes, FaLayerGroup, FaColumns, FaWindowMaximize, FaWindowRestore,
  FaDoorOpen, FaDoorClosed, 
  FaUmbrella, FaFan, FaLightbulb, FaPlug, FaThermometerHalf, FaThermometerFull,
  FaThermometerEmpty, FaThermometerQuarter, FaThermometerThreeQuarters,
  FaWallet, FaCreditCard, FaMoneyCheck, FaMoneyCheckAlt, FaHandHoldingUsd,
  FaHandHoldingHeart, FaHandshake, FaFileContract, FaFileSignature, FaFileInvoiceDollar,
  FaFileAlt, FaFilePdf, FaFileWord, FaFileExcel, FaFilePowerpoint, FaFileImage,
  FaFileVideo, FaFileAudio, FaFileArchive, FaFileCode, FaFileMedical, FaFilePrescription,
  FaFileUpload, FaFileDownload, FaFileImport, FaFileExport, FaFileCsv
} from 'react-icons/fa';

import {
  MdOutlineApartment, MdOutlineHouse, MdOutlineVilla, MdOutlineCorporateFare,
  MdOutlineLocationOn, MdOutlineLocationCity, MdOutlineBedroomParent, MdOutlineBathroom,
  MdOutlineKitchen, MdOutlineLiving, MdOutlineDining, MdOutlineYard, MdOutlinePool,
  MdOutlineSecurity, MdOutlineLocalParking, MdOutlineNature,
  MdOutlineAttachMoney, MdOutlineWifi,  MdOutlineShield, MdOutlineDirectionsSubway,
  MdOutlineSchool, MdOutlineShoppingCart, MdOutlineRestaurant, MdOutlineLocalHospital,
  MdOutlineAccountBalance, MdOutlineLandscape, MdOutlineWbSunny,
  MdOutlineWater, MdOutlineBeachAccess, MdOutlineDiamond, MdOutlineFavorite, MdOutlineFavoriteBorder,
  MdOutlineKey, MdOutlineSquareFoot, MdOutlineCalendarToday, MdOutlineLocalCafe, MdOutlineChair,
  MdOutlineBed, MdOutlineBathtub, MdOutlineAcUnit, MdOutlineLocalFireDepartment, MdOutlineAir,
  MdOutlineEco, MdOutlineRecycling, MdOutlineSolarPower, MdOutlineEvStation, MdOutlineAccessible,
  MdOutlineChildCare, MdOutlinePets, MdOutlineCamera, MdOutlineVideocam, MdOutlineLaptop,
  MdOutlineTv, MdOutlineSportsEsports, MdOutlineWeekend, MdOutlineTableRestaurant, 
  MdOutlineShower, MdOutlineWc, MdOutlineHotTub, MdOutlineDirectionsRun,
  MdOutlineDirectionsBike, MdOutlineHiking, MdOutlineSportsGolf, MdOutlineSportsBasketball,
  MdOutlineSportsFootball, MdOutlineSportsVolleyball, MdOutlineSportsTennis, MdOutlineSportsHandball,
  MdOutlineSportsKabaddi, MdOutlineTheaterComedy, MdOutlineMusicNote, MdOutlineMenuBook,
  MdOutlineBrush, MdOutlineColorLens, MdOutlineHandyman, MdOutlineConstruction,
  MdOutlineBuild, MdOutlineArchitecture, MdOutlineSquare, MdOutlineRectangle, MdOutlineWindow,
  MdOutlineElevator, MdOutlineStairs, MdOutlineBalcony, MdOutlineUmbrella,
  MdOutlineLightbulb, MdOutlinePower, MdOutlineDeviceThermostat, MdOutlineAccountBalanceWallet,
  MdOutlineCreditCard, MdOutlinePayments, MdOutlineVolunteerActivism,
  MdOutlineHandshake, MdOutlineDescription, MdOutlineInsertDriveFile, MdOutlinePictureAsPdf,
  MdOutlineDocumentScanner, MdOutlineUpload, MdOutlineDownload, MdOutlineImportExport
} from 'react-icons/md';

// Define categories for better organization
const categories = {
  property: [
    { keywords: ['home', 'house', 'property', 'residential'], icon: MdOutlineHouse },
    { keywords: ['apartment', 'flat', 'condo', 'condominium'], icon: MdOutlineApartment },
    { keywords: ['villa', 'bungalow', 'cottage'], icon: MdOutlineVilla },
    { keywords: ['corporate', 'commercial', 'office', 'business'], icon: MdOutlineCorporateFare },
    { keywords: ['building', 'tower', 'complex', 'development'], icon: FaBuilding },
  ],
  location: [
    { keywords: ['location', 'address', 'place', 'spot', 'site'], icon: MdOutlineLocationOn },
    { keywords: ['city', 'urban', 'downtown', 'metropolitan'], icon: MdOutlineLocationCity },
    { keywords: ['map', 'pin', 'marker', 'position', 'area'], icon: FaMapMarkerAlt },
    { keywords: ['proximity', 'nearby', 'close', 'convenient'], icon: MdOutlineLocationOn },
    { keywords: ['central', 'heart', 'core', 'middle'], icon: FaMapMarkerAlt },
  ],
  rooms: [
    { keywords: ['bedroom', 'master', 'sleep'], icon: MdOutlineBedroomParent },
    { keywords: ['bathroom', 'bath', 'shower', 'toilet'], icon: MdOutlineBathroom },
    { keywords: ['kitchen', 'cooking', 'culinary'], icon: MdOutlineKitchen },
    { keywords: ['living', 'lounge', 'family room'], icon: MdOutlineLiving },
    { keywords: ['dining', 'eat', 'meal'], icon: MdOutlineDining },
  ],
  outdoor: [
    { keywords: ['garden', 'yard', 'lawn', 'outdoor', 'landscape'], icon: MdOutlineYard },
    { keywords: ['pool', 'swimming', 'water'], icon: MdOutlinePool },
    { keywords: ['balcony', 'terrace', 'patio', 'deck'], icon: MdOutlineBalcony },
    { keywords: ['view', 'vista', 'panorama', 'scenic'], icon: FaMountain },
    { keywords: ['beach', 'shore', 'coast', 'seaside'], icon: MdOutlineBeachAccess },
  ],
  amenities: [
    { keywords: ['security', 'safe', 'guard', 'protection'], icon: MdOutlineSecurity },
    { keywords: ['parking', 'garage', 'car', 'vehicle'], icon: MdOutlineLocalParking },
    { keywords: ['nature', 'green', 'park', 'environment'], icon: MdOutlineNature },
    { keywords: ['wifi', 'internet', 'connectivity', 'network'], icon: MdOutlineWifi },
  ],
  quality: [
    { keywords: ['premium', 'luxury', 'high-end', 'upscale', 'exclusive'], icon: FaStar },
    { keywords: ['modern', 'contemporary', 'new', 'updated'], icon: MdOutlineApartment },
    { keywords: ['secure', 'safe', 'protected', 'gated'], icon: FaLock },
    { keywords: ['diamond', 'gem', 'jewel', 'treasure'], icon: MdOutlineDiamond },
  ],
  financial: [
    { keywords: ['investment', 'return', 'value', 'appreciation'], icon: FaMoneyBillWave },
    { keywords: ['affordable', 'budget', 'economical', 'cost-effective'], icon: MdOutlineAttachMoney },
    { keywords: ['price', 'cost', 'rate', 'fee'], icon: MdOutlineAttachMoney },
    { keywords: ['payment', 'financing', 'mortgage', 'loan'], icon: MdOutlineCreditCard },
    { keywords: ['deal', 'bargain', 'offer', 'opportunity'], icon: MdOutlineHandshake },
  ],
  transportation: [
    { keywords: ['transit', 'transport', 'commute', 'travel'], icon: MdOutlineDirectionsSubway },
    { keywords: ['subway', 'metro', 'underground', 'train'], icon: MdOutlineDirectionsSubway },
    { keywords: ['bus', 'public transport', 'shuttle'], icon: FaSubway },
    { keywords: ['access', 'accessibility', 'reachable'], icon: MdOutlineAccessible },
    { keywords: ['highway', 'expressway', 'freeway', 'road'], icon: FaCar },
  ],
  neighborhood: [
    { keywords: ['school', 'education', 'academy', 'college'], icon: MdOutlineSchool },
    { keywords: ['shopping', 'retail', 'mall', 'store'], icon: MdOutlineShoppingCart },
    { keywords: ['restaurant', 'dining', 'cafe', 'eatery'], icon: MdOutlineRestaurant },
    { keywords: ['hospital', 'medical', 'healthcare', 'clinic'], icon: MdOutlineLocalHospital },
    { keywords: ['university', 'campus', 'institution'], icon: MdOutlineAccountBalance },
  ],
  environment: [
    { keywords: ['sunny', 'bright', 'light', 'sunshine'], icon: MdOutlineWbSunny },
    { keywords: ['water', 'lake', 'river', 'stream'], icon: MdOutlineWater },
    { keywords: ['mountain', 'hill', 'peak', 'elevation'], icon: FaMountain },
    { keywords: ['forest', 'woods', 'trees', 'natural'], icon: FaTree },
    { keywords: ['eco', 'green', 'sustainable', 'environmental'], icon: MdOutlineEco },
  ],
  features: [
    { keywords: ['spacious', 'large', 'roomy', 'generous'], icon: MdOutlineSquareFoot },
    { keywords: ['new', 'brand new', 'newly built', 'fresh'], icon: FaKey },
    { keywords: ['renovated', 'remodeled', 'updated', 'upgraded'], icon: FaTools },
    { keywords: ['furnished', 'equipped', 'fitted', 'decorated'], icon: MdOutlineWeekend },
    { keywords: ['smart', 'intelligent', 'automated', 'tech'], icon: FaLaptop },
  ],
  utilities: [
    { keywords: ['air conditioning', 'cooling', 'ac', 'hvac'], icon: MdOutlineAcUnit },
    { keywords: ['heating', 'warm', 'heat', 'thermal'], icon: MdOutlineLocalFireDepartment },
    { keywords: ['ventilation', 'air', 'airflow', 'breeze'], icon: MdOutlineAir },
    { keywords: ['solar', 'renewable', 'energy', 'power'], icon: MdOutlineSolarPower },
    { keywords: ['electric', 'electricity', 'power', 'charging'], icon: MdOutlineEvStation },
  ],
  lifestyle: [
    { keywords: ['family', 'kid-friendly', 'children'], icon: MdOutlineChildCare },
    { keywords: ['pet', 'pet-friendly', 'animal', 'dog'], icon: MdOutlinePets },
    { keywords: ['entertainment', 'leisure', 'recreation'], icon: MdOutlineTheaterComedy },
    { keywords: ['community', 'social', 'neighborhood'], icon: FaHandshake },
    { keywords: ['private', 'exclusive', 'secluded', 'intimate'], icon: FaLock },
  ]
};

// Flatten the categories for easier searching
const allKeywordMappings = Object.values(categories).flat();

/**
 * Find the most appropriate icon based on the highlight title
 * @param title The highlight title to match against
 * @returns An icon component from react-icons
 */
export function findIconForTitle(title: string): IconType {
  if (!title) return MdOutlineHouse; // Default icon
  
  const lowercaseTitle = title.toLowerCase();
  
  // First try exact matches
  for (const mapping of allKeywordMappings) {
    for (const keyword of mapping.keywords) {
      if (lowercaseTitle === keyword) {
        return mapping.icon;
      }
    }
  }
  
  // Then try partial matches
  for (const mapping of allKeywordMappings) {
    for (const keyword of mapping.keywords) {
      if (lowercaseTitle.includes(keyword)) {
        return mapping.icon;
      }
    }
  }
  
  // Check if any keyword is part of the title
  for (const mapping of allKeywordMappings) {
    for (const keyword of mapping.keywords) {
      const words = lowercaseTitle.split(/\s+/);
      if (words.some(word => keyword.includes(word) && word.length > 3)) {
        return mapping.icon;
      }
    }
  }
  
  // Default fallback
  return MdOutlineHouse;
}

/**
 * Get a list of all available icons in string format for dropdown selection
 * @returns An array of icon strings in the format 'library:name'
 */
export function getAllIcons(): string[] {
  const icons: string[] = [];
  
  // Add icons from our categories
  Object.entries(categories).forEach(([category, mappings]) => {
    mappings.forEach(mapping => {
      // Use .name instead of .displayName to get the icon's function name
      const iconName = (mapping.icon as any).name || '';
      let prefix = '';
      if (iconName.startsWith('MdOutline')) {
        prefix = 'md';
      } else if (iconName.startsWith('Fa')) {
        prefix = 'fa';
      }

      if (prefix) {
        // Convert the icon name to kebab case for the value
        // Example: MdOutlineHouse -> md:house, FaMoneyBillWave -> fa:money-bill-wave
        let name = '';
        if (prefix === 'md') {
          name = iconName.replace('MdOutline', '').toLowerCase();
        } else {
          name = iconName.replace('Fa', '').replace(/([A-Z])/g, '-$1').toLowerCase();
          if (name.startsWith('-')) {
            name = name.substring(1);
          }
        }
        icons.push(`${prefix}:${name}`);
      }
    });
  });
  
  // Remove duplicates and sort
  return [...new Set(icons)].sort();
}
