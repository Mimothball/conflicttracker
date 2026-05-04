import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plane, AlertTriangle, Ship, TrendingUp, TrendingDown, Activity, Globe, Clock, Radio, Crosshair, Zap, Shield, BarChart3 } from 'lucide-react';
import type { AircraftState, ConflictEvent, TradeRoute, StockData } from '@/types';
import { getConflictStats } from '@/services/conflicts';
import { getTradeStats } from '@/services/tradeRoutes';
import { getStockStats } from '@/services/stocks';

interface HUDProps {
  aircraft: AircraftState[];
  conflicts: ConflictEvent[];
  tradeRoutes: TradeRoute[];
  stocks: StockData[];
  activeLayers: {
    aircraft: boolean;
    conflicts: boolean;
    trade: boolean;
    stocks: boolean;
  };
  onToggleLayer: (layer: 'aircraft' | 'conflicts' | 'trade' | 'stocks') => void;
  isLoading: boolean;
  lastUpdate: number | null;
}

function CurrentTime() {
  const [time, setTime] = useState(new Date());
  
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="flex items-center gap-2">
      <Clock className="w-4 h-4 text-green-400" />
      <span className="font-mono text-green-400 text-lg">
        {time.toISOString()}
      </span>
    </div>
  );
}

function TimeZones() {
  const [time, setTime] = useState(new Date());
  
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);
  
  const zones = [
    { label: 'UTC', offset: 0 },
    { label: 'NY', offset: -4 },
    { label: 'LON', offset: 1 },
    { label: 'TKY', offset: 9 },
    { label: 'DXB', offset: 4 },
    { label: 'HKG', offset: 8 },
    { label: 'SYD', offset: 10 },
  ];
  
  return (
    <div className="flex flex-wrap gap-x-3 gap-y-1">
      {zones.map(z => {
        const d = new Date(time.getTime() + z.offset * 3600000);
        return (
          <span key={z.label} className="font-mono text-xs">
            <span className="text-gray-500">{z.label}</span>
            <span className="text-green-400 ml-1">{d.toISOString().slice(11, 19)}</span>
          </span>
        );
      })}
    </div>
  );
}

export default function HUD({ aircraft, conflicts, tradeRoutes, stocks, activeLayers, onToggleLayer, isLoading, lastUpdate }: HUDProps) {
  const [selectedTab, setSelectedTab] = useState<'overview' | 'aircraft' | 'conflicts' | 'trade' | 'stocks'>('overview');
  const [selectedAircraft, setSelectedAircraft] = useState<AircraftState | null>(null);
  const [selectedConflict, setSelectedConflict] = useState<ConflictEvent | null>(null);
  const [flashUpdate, setFlashUpdate] = useState(false);

  const conflictStats = getConflictStats(conflicts);
  const tradeStats = getTradeStats();
  const stockStats = getStockStats(stocks);

  useEffect(() => {
    if (lastUpdate) {
      setFlashUpdate(true);
      setTimeout(() => setFlashUpdate(false), 500);
    }
  }, [lastUpdate]);

  const layerButtons = [
    { key: 'aircraft' as const, label: 'AIRCRAFT', icon: Plane, count: aircraft.length, color: 'text-yellow-400', borderColor: 'border-yellow-400', bgColor: 'bg-yellow-400/10' },
    { key: 'conflicts' as const, label: 'CONFLICTS', icon: AlertTriangle, count: conflicts.length, color: 'text-red-400', borderColor: 'border-red-400', bgColor: 'bg-red-400/10' },
    { key: 'trade' as const, label: 'TRADE ROUTES', icon: Ship, count: tradeRoutes.length, color: 'text-cyan-400', borderColor: 'border-cyan-400', bgColor: 'bg-cyan-400/10' },
    { key: 'stocks' as const, label: 'MARKETS', icon: BarChart3, count: stocks.length, color: 'text-green-400', borderColor: 'border-green-400', bgColor: 'bg-green-400/10' },
  ];

  return (
    <div className="fixed inset-0 z-10 pointer-events-none" style={{ fontFamily: '"Courier New", monospace' }}>
      {/* Scanline overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0,255,65,0.1) 1px, rgba(0,255,65,0.1) 2px)',
      }} />

      {/* --- TOP BAR --- */}
      <div className="absolute top-0 left-0 right-0 pointer-events-auto">
        <div className="bg-black/80 border-b border-green-400/30 px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Globe className="w-5 h-5 text-green-400" />
              <span className="font-mono text-green-400 text-sm tracking-wider">GLOBAL INTELLIGENCE COMMAND CENTER</span>
              <span className="text-gray-600">|</span>
              <span className="font-mono text-xs text-gray-400">LIVE FEED</span>
              {isLoading && <Activity className="w-3 h-3 text-yellow-400 animate-spin" />}
              {flashUpdate && <Zap className="w-3 h-3 text-green-400" />}
            </div>
            <CurrentTime />
          </div>
          <div className="mt-1 flex items-center justify-between">
            <TimeZones />
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-gray-500">LATENCY: <span className="text-green-400">24ms</span></span>
              <span className="font-mono text-xs text-gray-500">FPS: <span className="text-green-400">60</span></span>
              <span className="font-mono text-xs text-gray-500">CONN: <span className="text-green-400">SECURE</span></span>
              <Radio className="w-3 h-3 text-green-400 animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* --- LAYER TOGGLE BUTTONS (Left side) --- */}
      <div className="absolute left-4 top-24 flex flex-col gap-2 pointer-events-auto">
        {layerButtons.map(btn => (
          <button
            key={btn.key}
            onClick={() => onToggleLayer(btn.key)}
            className={`flex items-center gap-2 px-3 py-2 border rounded-sm font-mono text-xs transition-all duration-200 ${
              activeLayers[btn.key]
                ? `${btn.bgColor} ${btn.borderColor} ${btn.color} border`
                : 'border-gray-700 text-gray-600 hover:border-gray-500'
            }`}
          >
            <btn.icon className="w-3 h-3" />
            <span>{btn.label}</span>
            <span className={`ml-1 ${btn.color}`}>[{btn.count}]</span>
          </button>
        ))}
      </div>

      {/* --- TOP RIGHT: Quick Stats --- */}
      <div className="absolute right-4 top-24 w-72 pointer-events-auto">
        <div className="bg-black/85 border border-green-400/20 p-3">
          <div className="flex items-center gap-2 mb-2">
            <Crosshair className="w-3 h-3 text-green-400" />
            <span className="font-mono text-xs text-green-400">SITUATION BOARD</span>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-green-400/5 border border-green-400/20 p-2">
              <div className="font-mono text-xs text-gray-500">TRACKED AIRCRAFT</div>
              <div className="font-mono text-lg text-yellow-400">{aircraft.length.toLocaleString()}</div>
              <div className="font-mono text-[10px] text-gray-600">ADS-B/Mode S</div>
            </div>
            <div className="bg-red-400/5 border border-red-400/20 p-2">
              <div className="font-mono text-xs text-gray-500">ACTIVE CONFLICTS</div>
              <div className="font-mono text-lg text-red-400">{conflicts.length}</div>
              <div className="font-mono text-[10px] text-gray-600">{conflictStats.totalFatalities} casualties</div>
            </div>
            <div className="bg-cyan-400/5 border border-cyan-400/20 p-2">
              <div className="font-mono text-xs text-gray-500">TRADE ROUTES</div>
              <div className="font-mono text-lg text-cyan-400">{tradeRoutes.length}</div>
              <div className="font-mono text-[10px] text-gray-600">{tradeStats.chokepoints} chokepoints</div>
            </div>
            <div className="bg-green-400/5 border border-green-400/20 p-2">
              <div className="font-mono text-xs text-gray-500">MARKETS</div>
              <div className="font-mono text-lg text-green-400">{stocks.length}</div>
              <div className="font-mono text-[10px] text-gray-600">{stockStats.gainers} up / {stockStats.losers} down</div>
            </div>
          </div>

          <div className="mt-2 font-mono text-[10px] text-gray-600">
            LAST UPDATE: {lastUpdate ? new Date(lastUpdate).toISOString() : 'N/A'}
          </div>
          <div className="font-mono text-[10px] text-gray-600">
            DATA SOURCES: OpenSky, ACLED, UNCTAD, Yahoo Finance
          </div>
        </div>
      </div>

      {/* --- BOTTOM PANEL: Detailed Info --- */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-auto">
        <div className="bg-black/90 border-t border-green-400/30">
          {/* Tab buttons */}
          <div className="flex items-center gap-1 px-2 pt-1">
            {(['overview', 'aircraft', 'conflicts', 'trade', 'stocks'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`px-3 py-1 font-mono text-xs uppercase transition-all ${
                  selectedTab === tab
                    ? 'bg-green-400/20 text-green-400 border-t border-x border-green-400/30'
                    : 'text-gray-600 hover:text-gray-400'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="h-48 overflow-y-auto px-4 py-2">
            <AnimatePresence mode="wait">
              {selectedTab === 'overview' && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-4 gap-4"
                >
                  <div>
                    <div className="font-mono text-xs text-yellow-400 mb-1 flex items-center gap-1">
                      <Plane className="w-3 h-3" /> AIRSPACE STATUS
                    </div>
                    <div className="font-mono text-[10px] text-gray-400 space-y-0.5">
                      <div>Active flights: {aircraft.length}</div>
                      <div>Commercial: {aircraft.filter(a => a.category === 1 || a.category === 2).length}</div>
                      <div>Private: {aircraft.filter(a => a.category === 3).length}</div>
                      <div>Military: {aircraft.filter(a => a.category === 5 || a.category === 6).length}</div>
                      <div>Emergency: {aircraft.filter(a => a.squawk === '7500' || a.squawk === '7600' || a.squawk === '7700').length}</div>
                      <div>Avg altitude: {aircraft.length > 0 ? (aircraft.reduce((s, a) => s + (a.baro_altitude || 0), 0) / aircraft.length / 1000).toFixed(1) : 0}k ft</div>
                      <div>Avg speed: {aircraft.length > 0 ? (aircraft.reduce((s, a) => s + (a.velocity || 0), 0) / aircraft.length * 1.94384).toFixed(0) : 0} kts</div>
                    </div>
                  </div>
                  <div>
                    <div className="font-mono text-xs text-red-400 mb-1 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" /> CONFLICT ZONES
                    </div>
                    <div className="font-mono text-[10px] text-gray-400 space-y-0.5">
                      <div>Total events: {conflicts.length}</div>
                      <div>Fatalities (24h): {conflictStats.totalFatalities}</div>
                      <div>Countries affected: {conflictStats.activeRegions}</div>
                      <div>Battles: {conflictStats.byType['Battles'] || 0}</div>
                      <div>Violence vs Civilians: {conflictStats.byType['Violence against civilians'] || 0}</div>
                      <div>Explosions: {conflictStats.byType['Explosions/Remote violence'] || 0}</div>
                      <div>Protests: {conflictStats.byType['Protests'] || 0}</div>
                    </div>
                  </div>
                  <div>
                    <div className="font-mono text-xs text-cyan-400 mb-1 flex items-center gap-1">
                      <Ship className="w-3 h-3" /> MARITIME TRADE
                    </div>
                    <div className="font-mono text-[10px] text-gray-400 space-y-0.5">
                      <div>Active routes: {tradeRoutes.length}</div>
                      <div>Shipping lanes: {tradeStats.byType['shipping'] || 0}</div>
                      <div>Air cargo: {tradeStats.byType['air'] || 0}</div>
                      <div>Rail links: {tradeStats.byType['rail'] || 0}</div>
                      <div>Major chokepoints: {tradeStats.chokepoints}</div>
                      <div>Key corridors: Suez, Malacca, Hormuz, Panama</div>
                    </div>
                  </div>
                  <div>
                    <div className="font-mono text-xs text-green-400 mb-1 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" /> MARKET SNAPSHOT
                    </div>
                    <div className="font-mono text-[10px] text-gray-400 space-y-0.5">
                      <div>Instruments: {stocks.length}</div>
                      <div className="text-green-400">Advancing: {stockStats.gainers}</div>
                      <div className="text-red-400">Declining: {stockStats.losers}</div>
                      <div>Unchanged: {stockStats.unchanged}</div>
                      {stockStats.topGainer && (
                        <div>Top gainer: {stockStats.topGainer.ticker} +{stockStats.topGainer.changePercent.toFixed(2)}%</div>
                      )}
                      {stockStats.topLoser && (
                        <div>Top loser: {stockStats.topLoser.ticker} {stockStats.topLoser.changePercent.toFixed(2)}%</div>
                      )}
                      <div className="text-gray-500 mt-1">---</div>
                      <div>Markets: NYSE, NASDAQ, LSE, TSE, HKEX, SGX</div>
                    </div>
                  </div>
                </motion.div>
              )}

              {selectedTab === 'aircraft' && (
                <motion.div
                  key="aircraft"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-2 gap-4"
                >
                  <div>
                    <div className="font-mono text-xs text-yellow-400 mb-2">ACTIVE FLIGHTS (REAL-TIME ADS-B)</div>
                    <div className="max-h-36 overflow-y-auto">
                      <table className="w-full font-mono text-[10px]">
                        <thead className="text-gray-500">
                          <tr>
                            <th className="text-left">CALLSIGN</th>
                            <th className="text-left">ORIGIN</th>
                            <th className="text-right">ALT(ft)</th>
                            <th className="text-right">SPD(kts)</th>
                            <th className="text-right">HDG</th>
                            <th className="text-right">LAT</th>
                            <th className="text-right">LON</th>
                            <th className="text-left">SQUAWK</th>
                            <th className="text-right">UPDATED</th>
                          </tr>
                        </thead>
                        <tbody className="text-gray-400">
                          {aircraft.slice(0, 50).map((a, i) => (
                            <tr key={a.icao24 + i} className="hover:bg-yellow-400/10 cursor-pointer transition-colors" onClick={() => setSelectedAircraft(a)}>
                              <td className="text-yellow-400">{a.callsign || 'N/A'}</td>
                              <td>{a.origin_country}</td>
                              <td className="text-right">{a.baro_altitude ? Math.round(a.baro_altitude * 3.28084).toLocaleString() : 'N/A'}</td>
                              <td className="text-right">{a.velocity ? Math.round(a.velocity * 1.94384) : 'N/A'}</td>
                              <td className="text-right">{a.true_track ? Math.round(a.true_track) + '°' : 'N/A'}</td>
                              <td className="text-right">{a.latitude?.toFixed(4)}</td>
                              <td className="text-right">{a.longitude?.toFixed(4)}</td>
                              <td className={a.squawk === '7500' || a.squawk === '7600' || a.squawk === '7700' ? 'text-red-400' : ''}>{a.squawk || 'N/A'}</td>
                              <td className="text-right text-gray-600">{a.last_contact ? new Date(a.last_contact * 1000).toISOString().slice(11, 19) : 'N/A'}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div>
                    {selectedAircraft ? (
                      <div className="bg-yellow-400/5 border border-yellow-400/20 p-3">
                        <div className="font-mono text-xs text-yellow-400 mb-2">FLIGHT DETAILS: {selectedAircraft.callsign}</div>
                        <div className="font-mono text-[10px] text-gray-400 space-y-1">
                          <div>ICAO24: <span className="text-yellow-400">{selectedAircraft.icao24}</span></div>
                          <div>Callsign: <span className="text-yellow-400">{selectedAircraft.callsign || 'Unknown'}</span></div>
                          <div>Origin Country: {selectedAircraft.origin_country}</div>
                          <div>Position: {selectedAircraft.latitude?.toFixed(6)}, {selectedAircraft.longitude?.toFixed(6)}</div>
                          <div>Altitude (baro): {selectedAircraft.baro_altitude ? (selectedAircraft.baro_altitude * 3.28084).toFixed(0) + ' ft' : 'N/A'}</div>
                          <div>Altitude (geo): {selectedAircraft.geo_altitude ? (selectedAircraft.geo_altitude * 3.28084).toFixed(0) + ' ft' : 'N/A'}</div>
                          <div>Velocity: {selectedAircraft.velocity ? (selectedAircraft.velocity * 1.94384).toFixed(0) + ' kts' : 'N/A'}</div>
                          <div>Heading: {selectedAircraft.true_track?.toFixed(1)}°</div>
                          <div>Vertical Rate: {selectedAircraft.vertical_rate ? (selectedAircraft.vertical_rate * 196.85).toFixed(0) + ' fpm' : 'N/A'}</div>
                          <div>On Ground: {selectedAircraft.on_ground ? 'YES' : 'NO'}</div>
                          <div>Squawk: {selectedAircraft.squawk || 'N/A'}</div>
                          <div>Category: {selectedAircraft.category || 'N/A'}</div>
                          <div>Last Contact: {new Date(selectedAircraft.last_contact * 1000).toISOString()}</div>
                          <div>Position Source: {selectedAircraft.position_source === 0 ? 'ADS-B' : selectedAircraft.position_source === 1 ? 'ASTERIX' : selectedAircraft.position_source === 2 ? 'MLAT' : 'FLARM'}</div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-gray-600 font-mono text-[10px] flex items-center h-full justify-center">
                        Select an aircraft to view details
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {selectedTab === 'conflicts' && (
                <motion.div
                  key="conflicts"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-2 gap-4"
                >
                  <div>
                    <div className="font-mono text-xs text-red-400 mb-2">CONFLICT EVENTS (ACLED DATA)</div>
                    <div className="max-h-36 overflow-y-auto">
                      <table className="w-full font-mono text-[10px]">
                        <thead className="text-gray-500">
                          <tr>
                            <th className="text-left">ID</th>
                            <th className="text-left">DATE</th>
                            <th className="text-left">LOCATION</th>
                            <th className="text-left">COUNTRY</th>
                            <th className="text-left">TYPE</th>
                            <th className="text-left">ACTOR 1</th>
                            <th className="text-left">ACTOR 2</th>
                            <th className="text-right">FATAL</th>
                            <th className="text-left">NOTES</th>
                          </tr>
                        </thead>
                        <tbody className="text-gray-400">
                          {conflicts.map((c) => (
                            <tr key={c.event_id} className="hover:bg-red-400/10 cursor-pointer transition-colors" onClick={() => setSelectedConflict(c)}>
                              <td className="text-red-400">{c.event_id}</td>
                              <td>{c.event_date}</td>
                              <td>{c.location}</td>
                              <td>{c.country}</td>
                              <td>{c.event_type}</td>
                              <td className="max-w-[100px] truncate">{c.actor1}</td>
                              <td className="max-w-[100px] truncate">{c.actor2 || '-'}</td>
                              <td className="text-right text-red-400">{c.fatalities}</td>
                              <td className="max-w-[150px] truncate text-gray-500">{c.notes}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div>
                    {selectedConflict ? (
                      <div className="bg-red-400/5 border border-red-400/20 p-3">
                        <div className="font-mono text-xs text-red-400 mb-2">CONFLICT DETAIL: {selectedConflict.event_id}</div>
                        <div className="font-mono text-[10px] text-gray-400 space-y-1">
                          <div>Event ID: <span className="text-red-400">{selectedConflict.event_id}</span></div>
                          <div>Date: {selectedConflict.event_date}</div>
                          <div>Location: {selectedConflict.location}</div>
                          <div>Coordinates: {selectedConflict.latitude}, {selectedConflict.longitude}</div>
                          <div>Country: {selectedConflict.country}</div>
                          <div>Event Type: <span className="text-red-400">{selectedConflict.event_type}</span></div>
                          <div>Sub-Type: {selectedConflict.sub_event_type}</div>
                          <div>Actor 1: <span className="text-yellow-400">{selectedConflict.actor1}</span></div>
                          <div>Actor 2: <span className="text-yellow-400">{selectedConflict.actor2 || 'N/A'}</span></div>
                          <div className="text-red-400 text-sm">Fatalities: {selectedConflict.fatalities}</div>
                          <div className="mt-2 text-gray-500">{selectedConflict.notes}</div>
                          <div className="text-gray-600 mt-1">Source: ACLED (Armed Conflict Location & Event Data Project)</div>
                          <div className="text-gray-600">Timestamp: {new Date(selectedConflict.timestamp).toISOString()}</div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-gray-600 font-mono text-[10px] flex items-center h-full justify-center">
                        Select a conflict event to view details
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {selectedTab === 'trade' && (
                <motion.div
                  key="trade"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-3 gap-4"
                >
                  <div>
                    <div className="font-mono text-xs text-cyan-400 mb-2">SHIPPING LANES</div>
                    <div className="max-h-36 overflow-y-auto space-y-1">
                      {tradeRoutes.filter(r => r.type === 'shipping').map(r => (
                        <div key={r.id} className="font-mono text-[10px] text-gray-400 bg-cyan-400/5 border border-cyan-400/10 p-1.5">
                          <div className="text-cyan-400">{r.id}: {r.name}</div>
                          <div className="text-gray-500">{r.volume}</div>
                          <div className="text-gray-600 mt-0.5">{r.description}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="font-mono text-xs text-orange-400 mb-2">AIR CARGO</div>
                    <div className="max-h-36 overflow-y-auto space-y-1">
                      {tradeRoutes.filter(r => r.type === 'air').map(r => (
                        <div key={r.id} className="font-mono text-[10px] text-gray-400 bg-orange-400/5 border border-orange-400/10 p-1.5">
                          <div className="text-orange-400">{r.id}: {r.name}</div>
                          <div className="text-gray-500">{r.volume}</div>
                          <div className="text-gray-600 mt-0.5">{r.description}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="font-mono text-xs text-purple-400 mb-2">RAIL CORRIDORS</div>
                    <div className="max-h-36 overflow-y-auto space-y-1">
                      {tradeRoutes.filter(r => r.type === 'rail').map(r => (
                        <div key={r.id} className="font-mono text-[10px] text-gray-400 bg-purple-400/5 border border-purple-400/10 p-1.5">
                          <div className="text-purple-400">{r.id}: {r.name}</div>
                          <div className="text-gray-500">{r.volume}</div>
                          <div className="text-gray-600 mt-0.5">{r.description}</div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 font-mono text-[10px] text-gray-600">
                      <div className="text-gray-400 mb-1">MARITIME CHOKEPOINTS STATUS:</div>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-0.5">
                        <div><span className="text-green-400">●</span> Strait of Hormuz - OPEN</div>
                        <div><span className="text-yellow-400">●</span> Suez Canal - RESTRICTED</div>
                        <div><span className="text-green-400">●</span> Strait of Malacca - OPEN</div>
                        <div><span className="text-green-400">●</span> Panama Canal - OPEN</div>
                        <div><span className="text-red-400">●</span> Bab el-Mandeb - HIGH RISK</div>
                        <div><span className="text-green-400">●</span> Turkish Straits - OPEN</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {selectedTab === 'stocks' && (
                <motion.div
                  key="stocks"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-2 gap-4"
                >
                  <div>
                    <div className="font-mono text-xs text-green-400 mb-2">MARKET DATA (YAHOO FINANCE)</div>
                    <div className="max-h-36 overflow-y-auto">
                      <table className="w-full font-mono text-[10px]">
                        <thead className="text-gray-500">
                          <tr>
                            <th className="text-left">TICKER</th>
                            <th className="text-left">NAME</th>
                            <th className="text-right">PRICE</th>
                            <th className="text-right">CHG</th>
                            <th className="text-right">CHG%</th>
                            <th className="text-right">VOLUME</th>
                            <th className="text-right">HIGH</th>
                            <th className="text-right">LOW</th>
                            <th className="text-right">OPEN</th>
                            <th className="text-left">MKT CAP</th>
                          </tr>
                        </thead>
                        <tbody className="text-gray-400">
                          {stocks.map(s => (
                            <tr key={s.ticker} className="hover:bg-green-400/10 transition-colors">
                              <td className={s.change >= 0 ? 'text-green-400' : 'text-red-400'}>{s.ticker}</td>
                              <td className="max-w-[120px] truncate">{s.name}</td>
                              <td className="text-right">{s.price.toFixed(2)}</td>
                              <td className={`text-right ${s.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                {s.change >= 0 ? '+' : ''}{s.change.toFixed(2)}
                              </td>
                              <td className={`text-right ${s.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                {s.change >= 0 ? <TrendingUp className="w-3 h-3 inline" /> : <TrendingDown className="w-3 h-3 inline" />}
                                {s.changePercent.toFixed(2)}%
                              </td>
                              <td className="text-right">{(s.volume / 1000000).toFixed(1)}M</td>
                              <td className="text-right">{s.dayHigh.toFixed(2)}</td>
                              <td className="text-right">{s.dayLow.toFixed(2)}</td>
                              <td className="text-right">{s.open.toFixed(2)}</td>
                              <td>{s.marketCap}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div>
                    <div className="font-mono text-xs text-green-400 mb-2">MARKET SUMMARY</div>
                    <div className="font-mono text-[10px] text-gray-400 space-y-2">
                      <div className="flex items-center justify-between bg-green-400/5 border border-green-400/20 p-2">
                        <span>Advancing Issues</span>
                        <span className="text-green-400 text-lg">{stockStats.gainers}</span>
                      </div>
                      <div className="flex items-center justify-between bg-red-400/5 border border-red-400/20 p-2">
                        <span>Declining Issues</span>
                        <span className="text-red-400 text-lg">{stockStats.losers}</span>
                      </div>
                      <div className="flex items-center justify-between bg-yellow-400/5 border border-yellow-400/20 p-2">
                        <span>Unchanged</span>
                        <span className="text-yellow-400 text-lg">{stockStats.unchanged}</span>
                      </div>
                      <div className="flex items-center justify-between p-2">
                        <span>Total Volume</span>
                        <span className="text-gray-300">{(stockStats.totalVolume / 1000000000).toFixed(2)}B</span>
                      </div>
                      {stockStats.topGainer && (
                        <div className="bg-green-400/5 border border-green-400/10 p-2">
                          <div className="text-green-400">TOP GAINER: {stockStats.topGainer.ticker}</div>
                          <div>+{stockStats.topGainer.changePercent.toFixed(2)}% @ ${stockStats.topGainer.price.toFixed(2)}</div>
                        </div>
                      )}
                      {stockStats.topLoser && (
                        <div className="bg-red-400/5 border border-red-400/10 p-2">
                          <div className="text-red-400">TOP LOSER: {stockStats.topLoser.ticker}</div>
                          <div>{stockStats.topLoser.changePercent.toFixed(2)}% @ ${stockStats.topLoser.price.toFixed(2)}</div>
                        </div>
                      )}
                    </div>
                    <div className="mt-3 font-mono text-[10px] text-gray-600">
                      <div className="text-gray-400 mb-1">MARKET HOURS STATUS:</div>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-0.5">
                        <div><span className="text-green-400">●</span> NYSE - OPEN</div>
                        <div><span className="text-green-400">●</span> NASDAQ - OPEN</div>
                        <div><span className="text-green-400">●</span> LSE - OPEN</div>
                        <div><span className="text-red-400">●</span> TSE - CLOSED</div>
                        <div><span className="text-green-400">●</span> HKEX - OPEN</div>
                        <div><span className="text-green-400">●</span> SGX - OPEN</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* --- RIGHT SIDE: Mini Stock Ticker --- */}
      <div className="absolute right-4 bottom-56 w-72 pointer-events-auto">
        <div className="bg-black/85 border border-green-400/20 p-2">
          <div className="font-mono text-[10px] text-green-400 mb-1 flex items-center gap-1">
            <Shield className="w-3 h-3" /> LIVE TICKER
          </div>
          <div className="space-y-1 max-h-48 overflow-y-auto">
            {stocks.slice(0, 8).map(s => (
              <div key={s.ticker} className="flex items-center justify-between font-mono text-[10px]">
                <span className="text-gray-400 w-16">{s.ticker}</span>
                <span className="text-gray-300 w-16 text-right">{s.price.toFixed(2)}</span>
                <span className={`w-16 text-right ${s.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {s.change >= 0 ? '+' : ''}{s.changePercent.toFixed(2)}%
                </span>
                <span className="text-gray-600 w-12 text-right">{(s.volume / 1000000).toFixed(1)}M</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- LEFT BOTTOM: Conflict ticker --- */}
      <div className="absolute left-4 bottom-56 w-64 pointer-events-auto">
        <div className="bg-black/85 border border-red-400/20 p-2">
          <div className="font-mono text-[10px] text-red-400 mb-1 flex items-center gap-1">
            <AlertTriangle className="w-3 h-3" /> CONFLICT ALERTS
          </div>
          <div className="space-y-1 max-h-48 overflow-y-auto">
            {conflicts.slice(0, 10).map(c => (
              <div key={c.event_id} className="font-mono text-[10px] border-b border-red-400/10 pb-1">
                <div className="flex items-center justify-between">
                  <span className="text-red-400">{c.event_id}</span>
                  <span className="text-gray-600">{c.event_date}</span>
                </div>
                <div className="text-gray-400 truncate">{c.location}, {c.country}</div>
                <div className="text-gray-500 truncate">{c.actor1} vs {c.actor2 || 'N/A'}</div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">{c.event_type}</span>
                  <span className="text-red-400">{c.fatalities} dead</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- Loading overlay --- */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 pointer-events-auto">
          <div className="font-mono text-green-400 text-sm animate-pulse">
            <Activity className="w-5 h-5 inline mr-2" />
            UPDATING GLOBAL FEEDS...
          </div>
        </div>
      )}
    </div>
  );
}
