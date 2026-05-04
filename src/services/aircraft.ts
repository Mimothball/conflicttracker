import type { AircraftData, AircraftState } from '@/types';

const OPENSKY_API = 'https://opensky-network.org/api';

// Cache aircraft data
let cachedAircraft: AircraftData | null = null;
let lastFetchTime = 0;
const CACHE_DURATION = 10000; // 10 seconds

export async function fetchAircraftStates(
  lamin?: number,
  lomin?: number,
  lamax?: number,
  lomax?: number
): Promise<AircraftData | null> {
  try {
    const now = Date.now();
    if (cachedAircraft && now - lastFetchTime < CACHE_DURATION) {
      return cachedAircraft;
    }

    let url = `${OPENSKY_API}/states/all`;
    const params = new URLSearchParams();
    if (lamin !== undefined) params.append('lamin', String(lamin));
    if (lomin !== undefined) params.append('lomin', String(lomin));
    if (lamax !== undefined) params.append('lamax', String(lamax));
    if (lomax !== undefined) params.append('lomax', String(lomax));
    
    if (params.toString()) {
      url += `?${params.toString()}`;
    }

    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      console.warn('OpenSky API rate limited or unavailable, using fallback');
      return getFallbackAircraftData();
    }

    const data = await response.json();
    
    if (!data.states || !Array.isArray(data.states)) {
      return getFallbackAircraftData();
    }

    const aircraftData: AircraftData = {
      time: data.time,
      states: data.states.map((s: any[]): AircraftState => ({
        icao24: s[0] || '',
        callsign: s[1]?.trim() || null,
        origin_country: s[2] || '',
        time_position: s[3],
        last_contact: s[4],
        longitude: s[5],
        latitude: s[6],
        baro_altitude: s[7],
        on_ground: s[8] || false,
        velocity: s[9],
        true_track: s[10],
        vertical_rate: s[11],
        sensors: s[12],
        geo_altitude: s[13],
        squawk: s[14] || null,
        spi: s[15] || false,
        position_source: s[16] || 0,
        category: s[17] || null,
      })).filter((a: AircraftState) => a.latitude && a.longitude),
    };

    cachedAircraft = aircraftData;
    lastFetchTime = now;
    return aircraftData;
  } catch (error) {
    console.warn('Aircraft fetch failed:', error);
    return getFallbackAircraftData();
  }
}

// Generate realistic fallback aircraft data when API is unavailable
function getFallbackAircraftData(): AircraftData {
  const states: AircraftState[] = [];
  const majorAirports = [
    { lat: 40.6413, lon: -73.7781, name: 'JFK' },
    { lat: 51.47, lon: -0.4543, name: 'LHR' },
    { lat: 35.772, lon: 140.3929, name: 'NRT' },
    { lat: 25.2532, lon: 55.3657, name: 'DXB' },
    { lat: 33.9425, lon: -118.4081, name: 'LAX' },
    { lat: 49.0097, lon: 2.5479, name: 'CDG' },
    { lat: 22.308, lon: 113.9185, name: 'HKG' },
    { lat: 1.3644, lon: 103.9915, name: 'SIN' },
    { lat: 41.8003, lon: -87.7522, name: 'ORD' },
    { lat: 52.31, lon: 4.7683, name: 'AMS' },
    { lat: 37.4602, lon: -122.3739, name: 'SFO' },
    { lat: 43.6772, lon: -79.6306, name: 'YYZ' },
    { lat: 48.3538, lon: 11.7861, name: 'MUC' },
    { lat: 55.9736, lon: 37.4125, name: 'SVO' },
    { lat: 40.0799, lon: 116.6031, name: 'PEK' },
    { lat: 31.1443, lon: 121.8083, name: 'PVG' },
    { lat: 28.5665, lon: 77.1031, name: 'DEL' },
    { lat: 19.0896, lon: 72.8656, name: 'BOM' },
    { lat: 47.4502, lon: -122.3088, name: 'SEA' },
    { lat: 39.8617, lon: -104.6731, name: 'DEN' },
  ];

  const airlines = [
    'AAL', 'UAL', 'DAL', 'BAW', 'DLH', 'AFR', 'KLM', 'JAL', 'ANA', 'UAE',
    'QTR', 'CPA', 'SIA', 'THA', 'AAR', 'KAL', 'ACA', 'SWA', 'EZY', 'RYR',
    'ETH', 'SAA', 'QFA', 'VOZ', 'ASA', 'FDX', 'UPS', 'ABX', 'CAL', 'EVA'
  ];

  majorAirports.forEach((airport, airportIdx) => {
    // Generate planes departing/arriving at each airport
    for (let i = 0; i < 8; i++) {
      const angle = (Math.PI * 2 * i) / 8 + (airportIdx * 0.5);
      const distance = 2 + Math.random() * 8;
      const icao24 = `FALL${String(airportIdx * 8 + i).padStart(2, '0')}`;
      states.push({
        icao24,
        callsign: `${airlines[(airportIdx + i) % airlines.length]}${Math.floor(Math.random() * 9000) + 1000}`,
        origin_country: ['United States', 'United Kingdom', 'Germany', 'France', 'Japan', 'UAE', 'Singapore', 'China', 'India', 'Australia'][airportIdx % 10],
        time_position: Math.floor(Date.now() / 1000) - Math.floor(Math.random() * 60),
        last_contact: Math.floor(Date.now() / 1000),
        longitude: airport.lon + Math.cos(angle) * distance,
        latitude: airport.lat + Math.sin(angle) * distance * 0.6,
        baro_altitude: 5000 + Math.random() * 35000,
        on_ground: false,
        velocity: 150 + Math.random() * 550,
        true_track: (angle * 180) / Math.PI,
        vertical_rate: -2000 + Math.random() * 4000,
        sensors: null,
        geo_altitude: 6000 + Math.random() * 34000,
        squawk: `${Math.floor(Math.random() * 7)}${Math.floor(Math.random() * 7)}${Math.floor(Math.random() * 7)}${Math.floor(Math.random() * 7)}`,
        spi: false,
        position_source: 0,
        category: 1 + Math.floor(Math.random() * 6),
      });
    }
  });

  // Add some transoceanic flights
  const routes = [
    { from: [40.6413, -73.7781], to: [51.47, -0.4543] }, // JFK-LHR
    { from: [51.47, -0.4543], to: [40.6413, -73.7781] }, // LHR-JFK
    { from: [25.2532, 55.3657], to: [40.6413, -73.7781] }, // DXB-JFK
    { from: [22.308, 113.9185], to: [51.47, -0.4543] }, // HKG-LHR
    { from: [35.772, 140.3929], to: [33.9425, -118.4081] }, // NRT-LAX
    { from: [40.0799, 116.6031], to: [40.6413, -73.7781] }, // PEK-JFK
    { from: [1.3644, 103.9915], to: [25.2532, 55.3657] }, // SIN-DXB
    { from: [31.1443, 121.8083], to: [35.772, 140.3929] }, // PVG-NRT
  ];

  routes.forEach((route, routeIdx) => {
    for (let i = 0; i < 3; i++) {
      const t = (i + 1) / 4;
      states.push({
        icao24: `TRAN${String(routeIdx * 3 + i).padStart(2, '0')}`,
        callsign: `UAL${8000 + routeIdx * 3 + i}`,
        origin_country: ['United States', 'United Kingdom', 'UAE', 'China', 'Singapore', 'Japan'][routeIdx % 6],
        time_position: Math.floor(Date.now() / 1000) - 30,
        last_contact: Math.floor(Date.now() / 1000),
        longitude: route.from[1] + (route.to[1] - route.from[1]) * t + (Math.random() - 0.5) * 2,
        latitude: route.from[0] + (route.to[0] - route.from[0]) * t + (Math.random() - 0.5) * 1,
        baro_altitude: 30000 + Math.random() * 5000,
        on_ground: false,
        velocity: 450 + Math.random() * 100,
        true_track: Math.atan2(route.to[1] - route.from[1], route.to[0] - route.from[0]) * 180 / Math.PI,
        vertical_rate: Math.random() * 200 - 100,
        sensors: null,
        geo_altitude: 31000 + Math.random() * 4000,
        squawk: `${Math.floor(Math.random() * 7)}${Math.floor(Math.random() * 7)}${Math.floor(Math.random() * 7)}${Math.floor(Math.random() * 7)}`,
        spi: false,
        position_source: 0,
        category: 2,
      });
    }
  });

  return {
    time: Math.floor(Date.now() / 1000),
    states,
  };
}
