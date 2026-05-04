import type { TradeRoute } from '@/types';

// Major global trade routes - sourced from UNCTAD and maritime commerce data
// These are the world's busiest shipping corridors
export const TRADE_ROUTES: TradeRoute[] = [
  // Trans-Pacific Routes
  {
    id: 'TP-001',
    name: 'Asia-North America (Trans-Pacific Eastbound)',
    type: 'shipping',
    volume: '$578B annual trade value',
    description: 'Busiest container shipping route - connects Chinese manufacturing to US West Coast ports',
    waypoints: [
      [31.1443, 121.8083], // Shanghai
      [35.0, 140.0],       // Tokyo Bay approach
      [40.0, 160.0],       // North Pacific transit
      [37.7749, -122.4194], // San Francisco
      [33.7362, -118.2922], // Los Angeles/Long Beach
    ],
  },
  {
    id: 'TP-002',
    name: 'Asia-North America (Trans-Pacific Westbound)',
    type: 'shipping',
    volume: '$412B annual trade value',
    description: 'Return route carrying US agricultural exports, scrap metal, and consumer goods backfill',
    waypoints: [
      [33.7362, -118.2922], // Los Angeles/Long Beach
      [21.3, -157.8],       // Honolulu (refueling)
      [35.0, 160.0],        // Central Pacific
      [35.6762, 139.6503],  // Tokyo
      [31.1443, 121.8083],  // Shanghai
    ],
  },
  {
    id: 'TP-003',
    name: 'Southeast Asia-US West Coast',
    type: 'shipping',
    volume: '$189B annual trade value',
    description: 'Electronics, textiles, and machinery from Vietnam, Thailand, Malaysia to US',
    waypoints: [
      [1.2644, 103.8228],   // Singapore
      [10.7769, 106.7009],  // Ho Chi Minh City
      [13.7563, 100.5018],  // Bangkok
      [25.0, 150.0],        // Central Pacific
      [37.7749, -122.4194], // San Francisco
    ],
  },
  // Trans-Atlantic Routes
  {
    id: 'TA-001',
    name: 'Europe-North America (Trans-Atlantic Westbound)',
    type: 'shipping',
    volume: '$487B annual trade value',
    description: 'Luxury goods, pharmaceuticals, automotive parts, and machinery to North America',
    waypoints: [
      [51.5074, -0.1278],   // London
      [51.0, -10.0],        // Irish Sea / Bay of Biscay
      [45.0, -40.0],        // Mid-Atlantic
      [40.7128, -74.0060],  // New York
      [42.3601, -71.0589],  // Boston
    ],
  },
  {
    id: 'TA-002',
    name: 'Europe-North America (Trans-Atlantic Eastbound)',
    type: 'shipping',
    volume: '$356B annual trade value',
    description: 'US energy exports, agricultural products, and consumer goods to Europe',
    waypoints: [
      [40.7128, -74.0060],  // New York
      [39.2904, -76.6122],  // Baltimore
      [45.0, -50.0],        // North Atlantic
      [50.0, -5.0],         // English Channel approach
      [51.5074, -0.1278],   // London
      [53.5511, 9.9937],    // Hamburg
    ],
  },
  // Asia-Europe Routes (via Suez)
  {
    id: 'SE-001',
    name: 'Suez Canal Route (Asia-Europe)',
    type: 'shipping',
    volume: '$1.02T annual trade value',
    description: "12% of global trade passes through Suez - primary Asia-Europe corridor",
    waypoints: [
      [31.1443, 121.8083],  // Shanghai
      [1.2644, 103.8228],   // Singapore
      [6.9271, 79.8612],    // Colombo
      [26.0, 57.0],         // Strait of Hormuz
      [29.9773, 32.5323],   // Suez Canal (South)
      [30.4583, 32.3531],   // Suez Canal (North)
      [31.2001, 29.9187],   // Alexandria
      [37.9838, 23.7275],   // Piraeus (Athens)
      [51.5074, -0.1278],   // London
      [53.5511, 9.9937],    // Hamburg
      [56.9496, 24.1052],   // Riga
    ],
  },
  {
    id: 'SE-002',
    name: 'Suez Return Route (Europe-Asia)',
    type: 'shipping',
    volume: '$687B annual trade value',
    description: 'European automotive, machinery, and chemicals eastbound through Suez',
    waypoints: [
      [53.5511, 9.9937],    // Hamburg
      [51.5074, -0.1278],   // London
      [31.2001, 29.9187],   // Port Said
      [29.9773, 32.5323],   // Suez (South)
      [12.5, 55.0],         // Gulf of Aden
      [6.9271, 79.8612],    // Colombo
      [1.2644, 103.8228],   // Singapore
      [31.1443, 121.8083],  // Shanghai
    ],
  },
  // Cape of Good Hope Route (Suez alternative)
  {
    id: 'CP-001',
    name: 'Cape Route (Asia-Europe via Africa)',
    type: 'shipping',
    volume: '$234B annual trade value (surge capacity)',
    description: 'Alternative to Suez for ultra-large vessels; became primary route during 2024 Red Sea crisis',
    waypoints: [
      [31.1443, 121.8083],  // Shanghai
      [1.2644, 103.8228],   // Singapore
      [-20.0, 70.0],        // Indian Ocean transit
      [-35.0, 25.0],        // Cape of Good Hope approach
      [-34.3568, 18.4739],  // Cape of Good Hope
      [-25.0, 5.0],         // South Atlantic
      [38.7223, -9.1393],   // Lisbon
      [51.5074, -0.1278],   // London
      [53.5511, 9.9937],    // Hamburg
    ],
  },
  // Strait of Malacca Routes
  {
    id: 'SM-001',
    name: 'Strait of Malacca (Asia-Middle East)',
    type: 'shipping',
    volume: '$2.8T annual trade value',
    description: "World's busiest maritime chokepoint - 80% of China's energy imports transit here",
    waypoints: [
      [31.1443, 121.8083],  // Shanghai
      [22.3193, 114.1694],  // Hong Kong
      [1.2644, 103.8228],   // Singapore (Malacca entry)
      [2.8, 101.2],         // Strait of Malacca
      [3.5952, 98.6722],    // Medan
      [6.9271, 79.8612],    // Colombo
      [6.0, 80.0],          // Indian Ocean
      [25.2048, 55.2708],   // Dubai
      [26.0, 50.5],         // Bahrain
    ],
  },
  // Panama Canal Route
  {
    id: 'PC-001',
    name: 'Panama Canal (Asia-US East Coast)',
    type: 'shipping',
    volume: '$270B annual trade value',
    description: 'Primary route for Asian goods to US East Coast and Gulf ports',
    waypoints: [
      [31.1443, 121.8083],  // Shanghai
      [35.6762, 139.6503],  // Tokyo
      [21.3, -157.8],       // Hawaii
      [8.0, -140.0],        // Pacific transit
      [8.5, -79.0],         // Panama Canal (Pacific)
      [9.25, -80.0],        // Panama Canal (Caribbean)
      [18.4655, -66.1057],  // San Juan
      [40.7128, -74.0060],  // New York
      [25.7617, -80.1918],  // Miami
      [29.7604, -95.3698],  // Houston
    ],
  },
  // North Sea / Baltic Routes
  {
    id: 'NS-001',
    name: 'Baltic Sea Trade Route',
    type: 'shipping',
    volume: '$89B annual trade value',
    description: 'Energy, timber, and manufactured goods between Baltic states and Western Europe',
    waypoints: [
      [59.3293, 18.0686],   // Stockholm
      [59.4370, 24.7536],   // Tallinn
      [56.9496, 24.1052],   // Riga
      [54.6872, 25.2797],   // Vilnius
      [54.3520, 18.6466],   // Gdansk
      [55.6761, 12.5683],   // Copenhagen
      [53.5511, 9.9937],    // Hamburg
      [51.9244, 4.4777],    // Rotterdam
    ],
  },
  // LNG / Energy Routes
  {
    id: 'EN-001',
    name: 'Qatar-Europe LNG Route',
    type: 'shipping',
    volume: '78M tonnes LNG annually',
    description: 'Liquefied natural gas from Qatar to European markets via Suez Canal',
    waypoints: [
      [25.2854, 51.5310],   // Doha (Qatar)
      [26.0, 52.0],         // Persian Gulf
      [26.0, 57.0],         // Strait of Hormuz
      [29.9773, 32.5323],   // Suez Canal
      [35.0, 20.0],         // Eastern Mediterranean
      [37.9838, 23.7275],   // Piraeus
      [44.4056, 8.9463],    // Genoa
      [51.5074, -0.1278],   // London (Isle of Grain)
    ],
  },
  {
    id: 'EN-002',
    name: 'US Gulf-Europe LNG Route',
    type: 'shipping',
    volume: '62M tonnes LNG annually',
    description: 'US shale gas exports to Europe - fastest growing energy corridor post-2022',
    waypoints: [
      [29.7604, -95.3698],  // Houston
      [29.0, -89.0],        // Gulf of Mexico
      [25.0, -80.0],        // Florida Strait
      [40.0, -50.0],        // Atlantic transit
      [50.0, -10.0],        // Celtic Sea
      [51.5074, -0.1278],   // London
      [51.4416, 3.5739],    // Zeebrugge (Belgium)
      [53.3489, -6.2603],   // Dublin
    ],
  },
  {
    id: 'EN-003',
    name: 'Russia-China Oil Route (ESPO)',
    type: 'shipping',
    volume: '80M tonnes oil annually',
    description: 'Eastern Siberia-Pacific Ocean pipeline terminus to Chinese refineries',
    waypoints: [
      [42.8, 132.9],        // Kozmino (pipeline terminus)
      [35.0, 130.0],        // Sea of Japan
      [31.2304, 121.4737],  // Shanghai
      [38.9140, 117.2009],  // Tianjin
      [39.0398, 125.7625],  // Nampo (North Korea bypass)
    ],
  },
  // Africa Trade Routes
  {
    id: 'AF-001',
    name: 'Europe-West Africa Route',
    type: 'shipping',
    volume: '$67B annual trade value',
    description: 'European manufactured goods to West Africa; return with raw materials, cocoa, oil',
    waypoints: [
      [51.5074, -0.1278],   // London
      [44.4056, 8.9463],    // Genoa
      [36.8065, 10.1815],   // Tunis
      [33.8869, 35.5131],   // Beirut
      [14.7167, -17.4677],  // Dakar
      [6.5244, 3.3792],     // Lagos
      [5.6037, -0.1870],    // Accra
      [4.8156, 7.0498],     // Port Harcourt
    ],
  },
  {
    id: 'AF-002',
    name: 'Asia-East Africa Route',
    type: 'shipping',
    volume: '$45B annual trade value',
    description: 'Chinese infrastructure exports, textiles to East Africa; coffee, minerals return',
    waypoints: [
      [31.1443, 121.8083],  // Shanghai
      [1.2644, 103.8228],   // Singapore
      [-6.0, 72.0],         // Indian Ocean
      [-4.0435, 39.6682],   // Mombasa
      [-6.7924, 39.2083],   // Dar es Salaam
      [-33.9249, 18.4241],  // Cape Town
    ],
  },
  // South America Routes
  {
    id: 'SA-001',
    name: 'Asia-South America (East Coast)',
    type: 'shipping',
    volume: '$112B annual trade value',
    description: 'Chinese manufacturing exports; return with soy, iron ore, copper, beef',
    waypoints: [
      [31.1443, 121.8083],  // Shanghai
      [-20.0, 110.0],       // Indian Ocean
      [-35.0, 20.0],        // Cape of Good Hope
      [-23.0, -5.0],        // South Atlantic
      [-23.9618, -46.3322], // Santos (Sao Paulo)
      [-34.6037, -58.3816], // Buenos Aires
      [-22.9068, -43.1729], // Rio de Janeiro
      [-33.4489, -70.6693], // Valparaiso
    ],
  },
  {
    id: 'SA-002',
    name: 'US-South America Route',
    type: 'shipping',
    volume: '$234B annual trade value',
    description: 'US exports to Latin America via Gulf and East Coast ports',
    waypoints: [
      [29.7604, -95.3698],  // Houston
      [25.7617, -80.1918],  // Miami
      [9.25, -80.0],        // Panama Canal
      [-0.1807, -78.4678],  // Quito
      [-12.0464, -77.0428], // Lima
      [-33.4489, -70.6693], // Valparaiso
    ],
  },
  // Australia / Oceania Routes
  {
    id: 'OC-001',
    name: 'Asia-Australia Route',
    type: 'shipping',
    volume: '$156B annual trade value',
    description: 'Iron ore, coal, LNG from Australia to Asia; manufactured goods return',
    waypoints: [
      [31.1443, 121.8083],  // Shanghai
      [22.3193, 114.1694],  // Hong Kong
      [1.2644, 103.8228],   // Singapore
      [-6.0, 110.0],        // Java Sea
      [-31.9505, 115.8605], // Perth
      [-33.8688, 151.2093], // Sydney
      [-27.4698, 153.0251], // Brisbane
    ],
  },
  // Arctic Routes (Northern Sea Route - seasonal)
  {
    id: 'AR-001',
    name: 'Northern Sea Route (Arctic)',
    type: 'shipping',
    volume: '35M tonnes annually (growing)',
    description: 'Shorter Asia-Europe route via Russian Arctic - ice-free season expanding due to climate change',
    waypoints: [
      [35.6762, 139.6503],  // Tokyo
      [42.0, 140.0],        // Hokkaido
      [60.0, 170.0],        // Bering Strait
      [70.0, 170.0],        // Chukchi Sea
      [75.0, 140.0],        // East Siberian Sea
      [75.0, 100.0],        // Kara Sea
      [70.0, 60.0],         // Barents Sea
      [69.6492, 18.9553],   // Tromso
      [59.3293, 18.0686],   // Stockholm
    ],
  },
  // Major Air Cargo Routes
  {
    id: 'AC-001',
    name: 'Hong Kong-Memphis (FedEx Hub)',
    type: 'air',
    volume: '4.2M tonnes air freight annually',
    description: "World's busiest air cargo corridor - FedEx superhub connection",
    waypoints: [
      [22.3193, 114.1694],  // Hong Kong
      [35.0, 140.0],        // Tokyo approach
      [60.0, -170.0],       // Aleutian Islands
      [45.0, -120.0],       // US West Coast
      [35.0424, -89.9787],  // Memphis (FedEx)
    ],
  },
  {
    id: 'AC-002',
    name: 'Dubai-Frankfurt Air Cargo',
    type: 'air',
    volume: '2.8M tonnes air freight annually',
    description: 'Emirates SkyCargo hub connecting Middle East to European distribution',
    waypoints: [
      [25.2048, 55.2708],   // Dubai
      [35.0, 45.0],         // Middle East transit
      [41.0082, 28.9784],   // Istanbul
      [50.0379, 8.5622],    // Frankfurt
    ],
  },
  // Rail Routes (Belt and Road)
  {
    id: 'RR-001',
    name: 'China-Europe Railway Express (Yixinou)',
    type: 'rail',
    volume: '$65B annual trade value',
    description: 'Belt and Road rail corridor - faster than sea, cheaper than air',
    waypoints: [
      [29.8683, 121.5440],  // Yiwu
      [34.3416, 108.9398],  // Xi'an
      [43.2220, 76.8512],   // Almaty
      [51.1605, 71.4704],   // Astana
      [55.7558, 37.6173],   // Moscow
      [54.6872, 25.2797],   // Vilnius
      [52.5200, 13.4050],   // Berlin
      [51.4416, 3.5739],    // Zeebrugge
      [51.9229, 4.4792],    // Rotterdam
      [48.8566, 2.3522],    // Paris
      [51.5074, -0.1278],   // London
    ],
  },
  {
    id: 'RR-002',
    name: 'China-Laos-Thailand Rail',
    type: 'rail',
    volume: '$12B annual trade value',
    description: 'Newest Belt and Road rail link connecting Kunming to Bangkok via Laos',
    waypoints: [
      [25.0389, 102.7183],  // Kunming
      [22.0, 102.0],        // Yunnan-Laos border
      [17.9757, 102.6331],  // Vientiane
      [13.7563, 100.5018],  // Bangkok
    ],
  },
  // Additional critical chokepoints
  {
    id: 'CP-002',
    name: 'Strait of Hormuz (Oil Corridor)',
    type: 'shipping',
    volume: '21% of global oil consumption transits here',
    description: "World's most important oil chokepoint - Iran's maritime influence",
    waypoints: [
      [25.2048, 55.2708],   // Dubai
      [26.0, 56.0],         // UAE coast
      [26.5, 56.3],         // Strait of Hormuz
      [27.0, 56.5],         // Iranian side
      [29.0, 50.0],         // Persian Gulf north
    ],
  },
  {
    id: 'CP-003',
    name: 'Bab el-Mandeb Strait',
    type: 'shipping',
    volume: '$1T+ annual trade value',
    description: 'Critical chokepoint between Red Sea and Gulf of Aden - Yemen conflict hotspot',
    waypoints: [
      [12.6, 43.4],         // Gulf of Aden
      [12.8, 44.0],         // Bab el-Mandeb
      [13.5, 42.9],         // Red Sea entrance
      [20.0, 38.0],         // Red Sea transit
    ],
  },
  {
    id: 'CP-004',
    name: 'Turkish Straits (Bosphorus/Dardanelles)',
    type: 'shipping',
    volume: '3% of global oil supply',
    description: 'Only passage between Black Sea and Mediterranean - strategic NATO interest',
    waypoints: [
      [41.0082, 28.9784],   // Istanbul
      [41.2, 29.0],         // Bosphorus
      [40.5, 27.0],         // Sea of Marmara
      [40.3, 26.6],         // Dardanelles
      [39.5, 26.0],         // Aegean Sea
    ],
  },
  {
    id: 'CP-005',
    name: 'Denmark Straits (Kattegat/Skagerrak)',
    type: 'shipping',
    volume: 'Baltic Sea access corridor',
    description: 'Critical NATO chokepoint controlling Baltic Sea naval access',
    waypoints: [
      [55.6761, 12.5683],   // Copenhagen
      [56.0, 11.0],         // Kattegat
      [57.7, 10.0],         // Skagerrak
      [58.0, 6.0],          // North Sea
    ],
  },
];

export function getTradeRoutes(): TradeRoute[] {
  return TRADE_ROUTES;
}

export function getTradeStats() {
  const byType: Record<string, number> = {};
  TRADE_ROUTES.forEach(r => {
    byType[r.type] = (byType[r.type] || 0) + 1;
  });
  
  return {
    total: TRADE_ROUTES.length,
    byType,
    chokepoints: TRADE_ROUTES.filter(r => r.volume.includes('chokepoint') || r.id.startsWith('CP-')).length,
    majorCorridors: TRADE_ROUTES.filter(r => r.type === 'shipping').length,
  };
}
