// Aircraft types from OpenSky API
export interface AircraftState {
  icao24: string;
  callsign: string | null;
  origin_country: string;
  time_position: number | null;
  last_contact: number;
  longitude: number | null;
  latitude: number | null;
  baro_altitude: number | null;
  on_ground: boolean;
  velocity: number | null;
  true_track: number | null;
  vertical_rate: number | null;
  sensors: number[] | null;
  geo_altitude: number | null;
  squawk: string | null;
  spi: boolean;
  position_source: number;
  category: number | null;
}

export interface AircraftData {
  time: number;
  states: AircraftState[] | null;
}

// Conflict types from ACLED
export interface ConflictEvent {
  event_id: string;
  event_date: string;
  year: number;
  latitude: number;
  longitude: number;
  location: string;
  country: string;
  event_type: string;
  sub_event_type: string;
  actor1: string;
  actor2: string | null;
  fatalities: number;
  notes: string;
  timestamp: number;
}

// Trade route types
export interface TradeRoute {
  id: string;
  name: string;
  type: 'shipping' | 'air' | 'rail';
  waypoints: [number, number][]; // [lat, lon] pairs
  volume: string;
  description: string;
}

// Stock types
export interface StockData {
  ticker: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: string;
  dayHigh: number;
  dayLow: number;
  open: number;
  previousClose: number;
  timestamp: number;
  historical: { date: string; close: number }[];
}

// Globe marker types
export interface GlobeMarker {
  id: string;
  lat: number;
  lon: number;
  type: 'aircraft' | 'conflict' | 'trade' | 'stock';
  color: string;
  size: number;
  data: any;
  label?: string;
}

// UI State
export interface DashboardState {
  selectedLayer: 'all' | 'aircraft' | 'conflicts' | 'trade' | 'stocks';
  isLoading: boolean;
  lastUpdate: number | null;
  aircraftCount: number;
  conflictCount: number;
  tradeRouteCount: number;
  stockCount: number;
}
