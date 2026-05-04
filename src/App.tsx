import { useState, useEffect, useCallback, useRef } from 'react';
import Globe from '@/components/Globe';
import HUD from '@/components/HUD';
import { fetchAircraftStates } from '@/services/aircraft';
import { fetchConflictData } from '@/services/conflicts';
import { getTradeRoutes } from '@/services/tradeRoutes';
import { fetchStockData } from '@/services/stocks';
import type { AircraftState, ConflictEvent, TradeRoute, StockData } from '@/types';
import './App.css';

function App() {
  const [aircraft, setAircraft] = useState<AircraftState[]>([]);
  const [conflicts, setConflicts] = useState<ConflictEvent[]>([]);
  const [tradeRoutes] = useState<TradeRoute[]>(getTradeRoutes());
  const [stocks, setStocks] = useState<StockData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<number | null>(null);
  const [activeLayers, setActiveLayers] = useState({
    aircraft: true,
    conflicts: true,
    trade: true,
    stocks: true,
  });
  
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const toggleLayer = useCallback((layer: 'aircraft' | 'conflicts' | 'trade' | 'stocks') => {
    setActiveLayers(prev => ({ ...prev, [layer]: !prev[layer] }));
  }, []);

  const loadAllData = useCallback(async () => {
    setIsLoading(true);
    
    try {
      // Fetch aircraft data from OpenSky API
      const aircraftData = await fetchAircraftStates();
      if (aircraftData?.states) {
        setAircraft(aircraftData.states);
      }

      // Fetch conflict data
      const conflictData = await fetchConflictData();
      setConflicts(conflictData);

      // Fetch stock data
      const stockData = await fetchStockData();
      setStocks(stockData);

      setLastUpdate(Date.now());
    } catch (error) {
      console.error('Data loading error:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial load and polling
  useEffect(() => {
    loadAllData();
    
    // Poll every 15 seconds for real-time updates
    intervalRef.current = setInterval(loadAllData, 15000);
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [loadAllData]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* 3D Globe */}
      <Globe
        aircraft={aircraft}
        conflicts={conflicts}
        tradeRoutes={tradeRoutes}
        stocks={stocks}
        activeLayers={activeLayers}
      />
      
      {/* HUD Overlay */}
      <HUD
        aircraft={aircraft}
        conflicts={conflicts}
        tradeRoutes={tradeRoutes}
        stocks={stocks}
        activeLayers={activeLayers}
        onToggleLayer={toggleLayer}
        isLoading={isLoading}
        lastUpdate={lastUpdate}
      />
    </div>
  );
}

export default App;
