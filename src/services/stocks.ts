import type { StockData } from '@/types';

// Major global indices and important stocks
const WATCHLIST = [
  // US Major Indices
  { ticker: 'SPY', name: 'SPDR S&P 500 ETF' },
  { ticker: 'QQQ', name: 'Invesco QQQ Trust' },
  { ticker: 'DIA', name: 'SPDR Dow Jones ETF' },
  { ticker: 'IWM', name: 'iShares Russell 2000' },
  // Tech Giants
  { ticker: 'AAPL', name: 'Apple Inc.' },
  { ticker: 'MSFT', name: 'Microsoft Corp.' },
  { ticker: 'GOOGL', name: 'Alphabet Inc.' },
  { ticker: 'AMZN', name: 'Amazon.com Inc.' },
  { ticker: 'NVDA', name: 'NVIDIA Corp.' },
  { ticker: 'META', name: 'Meta Platforms Inc.' },
  { ticker: 'TSLA', name: 'Tesla Inc.' },
  // Financial
  { ticker: 'JPM', name: 'JPMorgan Chase' },
  { ticker: 'BAC', name: 'Bank of America' },
  { ticker: 'GS', name: 'Goldman Sachs' },
  { ticker: 'V', name: 'Visa Inc.' },
  // Energy
  { ticker: 'XOM', name: 'Exxon Mobil' },
  { ticker: 'CVX', name: 'Chevron Corp.' },
  { ticker: 'OXY', name: 'Occidental Petroleum' },
  // Defense / Aerospace
  { ticker: 'LMT', name: 'Lockheed Martin' },
  { ticker: 'RTX', name: 'RTX Corporation' },
  { ticker: 'NOC', name: 'Northrop Grumman' },
  { ticker: 'BA', name: 'Boeing Co.' },
  // International
  { ticker: 'TSM', name: 'Taiwan Semiconductor' },
  { ticker: 'BABA', name: 'Alibaba Group' },
  { ticker: 'TCEHY', name: 'Tencent Holdings' },
  { ticker: 'SAP', name: 'SAP SE' },
  { ticker: 'ASML', name: 'ASML Holding' },
  // Commodities
  { ticker: 'GLD', name: 'SPDR Gold Shares' },
  { ticker: 'USO', name: 'US Oil Fund' },
  { ticker: 'UNG', name: 'US Natural Gas Fund' },
  // Crypto
  { ticker: 'BTC-USD', name: 'Bitcoin USD' },
  { ticker: 'ETH-USD', name: 'Ethereum USD' },
];

// Fallback stock data for when APIs fail
const FALLBACK_STOCKS: StockData[] = [
  {
    ticker: 'SPY', name: 'SPDR S&P 500 ETF', price: 528.42, change: 3.15, changePercent: 0.60, volume: 52489100, marketCap: '$485.2B', dayHigh: 530.18, dayLow: 525.30, open: 526.00, previousClose: 525.27, timestamp: Date.now(),
    historical: Array.from({ length: 30 }, (_, i) => ({ date: `2026-04-${String(i + 1).padStart(2, '0')}`, close: 510 + Math.random() * 25 }))
  },
  {
    ticker: 'QQQ', name: 'Invesco QQQ Trust', price: 452.18, change: 5.42, changePercent: 1.21, volume: 32145600, marketCap: '$215.8B', dayHigh: 455.30, dayLow: 447.50, open: 448.00, previousClose: 446.76, timestamp: Date.now(),
    historical: Array.from({ length: 30 }, (_, i) => ({ date: `2026-04-${String(i + 1).padStart(2, '0')}`, close: 430 + Math.random() * 30 }))
  },
  {
    ticker: 'AAPL', name: 'Apple Inc.', price: 187.68, change: 1.25, changePercent: 0.67, volume: 42156700, marketCap: '$2.89T', dayHigh: 189.50, dayLow: 186.20, open: 186.50, previousClose: 186.43, timestamp: Date.now(),
    historical: Array.from({ length: 30 }, (_, i) => ({ date: `2026-04-${String(i + 1).padStart(2, '0')}`, close: 178 + Math.random() * 15 }))
  },
  {
    ticker: 'MSFT', name: 'Microsoft Corp.', price: 412.35, change: 4.18, changePercent: 1.02, volume: 18562300, marketCap: '$3.06T', dayHigh: 415.20, dayLow: 408.80, open: 409.50, previousClose: 408.17, timestamp: Date.now(),
    historical: Array.from({ length: 30 }, (_, i) => ({ date: `2026-04-${String(i + 1).padStart(2, '0')}`, close: 395 + Math.random() * 25 }))
  },
  {
    ticker: 'GOOGL', name: 'Alphabet Inc.', price: 165.42, change: -0.85, changePercent: -0.51, volume: 22145600, marketCap: '$2.04T', dayHigh: 167.30, dayLow: 164.50, open: 166.50, previousClose: 166.27, timestamp: Date.now(),
    historical: Array.from({ length: 30 }, (_, i) => ({ date: `2026-04-${String(i + 1).padStart(2, '0')}`, close: 158 + Math.random() * 12 }))
  },
  {
    ticker: 'AMZN', name: 'Amazon.com Inc.', price: 182.15, change: 2.30, changePercent: 1.28, volume: 35482100, marketCap: '$1.89T', dayHigh: 184.00, dayLow: 180.50, open: 180.80, previousClose: 179.85, timestamp: Date.now(),
    historical: Array.from({ length: 30 }, (_, i) => ({ date: `2026-04-${String(i + 1).padStart(2, '0')}`, close: 172 + Math.random() * 14 }))
  },
  {
    ticker: 'NVDA', name: 'NVIDIA Corp.', price: 892.15, change: 18.42, changePercent: 2.11, volume: 42563100, marketCap: '$2.21T', dayHigh: 905.30, dayLow: 875.20, open: 880.00, previousClose: 873.73, timestamp: Date.now(),
    historical: Array.from({ length: 30 }, (_, i) => ({ date: `2026-04-${String(i + 1).padStart(2, '0')}`, close: 850 + Math.random() * 60 }))
  },
  {
    ticker: 'META', name: 'Meta Platforms Inc.', price: 498.25, change: 6.80, changePercent: 1.38, volume: 14523600, marketCap: '$1.27T', dayHigh: 502.00, dayLow: 492.80, open: 493.50, previousClose: 491.45, timestamp: Date.now(),
    historical: Array.from({ length: 30 }, (_, i) => ({ date: `2026-04-${String(i + 1).padStart(2, '0')}`, close: 480 + Math.random() * 25 }))
  },
  {
    ticker: 'TSLA', name: 'Tesla Inc.', price: 178.42, change: -3.15, changePercent: -1.73, volume: 98256300, marketCap: '$568.2B', dayHigh: 184.00, dayLow: 176.80, open: 182.50, previousClose: 181.57, timestamp: Date.now(),
    historical: Array.from({ length: 30 }, (_, i) => ({ date: `2026-04-${String(i + 1).padStart(2, '0')}`, close: 168 + Math.random() * 18 }))
  },
  {
    ticker: 'JPM', name: 'JPMorgan Chase', price: 195.30, change: 1.42, changePercent: 0.73, volume: 9856200, marketCap: '$562.8B', dayHigh: 197.10, dayLow: 194.20, open: 194.50, previousClose: 193.88, timestamp: Date.now(),
    historical: Array.from({ length: 30 }, (_, i) => ({ date: `2026-04-${String(i + 1).padStart(2, '0')}`, close: 188 + Math.random() * 12 }))
  },
  {
    ticker: 'XOM', name: 'Exxon Mobil', price: 118.45, change: -0.82, changePercent: -0.69, volume: 14523600, marketCap: '$472.5B', dayHigh: 119.80, dayLow: 117.90, open: 119.50, previousClose: 119.27, timestamp: Date.now(),
    historical: Array.from({ length: 30 }, (_, i) => ({ date: `2026-04-${String(i + 1).padStart(2, '0')}`, close: 115 + Math.random() * 8 }))
  },
  {
    ticker: 'LMT', name: 'Lockheed Martin', price: 452.85, change: 5.30, changePercent: 1.18, volume: 1256300, marketCap: '$108.5B', dayHigh: 455.20, dayLow: 448.00, open: 449.50, previousClose: 447.55, timestamp: Date.now(),
    historical: Array.from({ length: 30 }, (_, i) => ({ date: `2026-04-${String(i + 1).padStart(2, '0')}`, close: 435 + Math.random() * 25 }))
  },
  {
    ticker: 'TSM', name: 'Taiwan Semiconductor', price: 142.30, change: 2.80, changePercent: 2.01, volume: 18562300, marketCap: '$737.8B', dayHigh: 144.20, dayLow: 140.50, open: 140.80, previousClose: 139.50, timestamp: Date.now(),
    historical: Array.from({ length: 30 }, (_, i) => ({ date: `2026-04-${String(i + 1).padStart(2, '0')}`, close: 135 + Math.random() * 12 }))
  },
  {
    ticker: 'BTC-USD', name: 'Bitcoin USD', price: 68450.00, change: 1250.00, changePercent: 1.86, volume: 28564123000, marketCap: '$1.35T', dayHigh: 69800.00, dayLow: 67100.00, open: 67200.00, previousClose: 67200.00, timestamp: Date.now(),
    historical: Array.from({ length: 30 }, (_, i) => ({ date: `2026-04-${String(i + 1).padStart(2, '0')}`, close: 65000 + Math.random() * 8000 }))
  },
  {
    ticker: 'ETH-USD', name: 'Ethereum USD', price: 3520.45, change: 85.20, changePercent: 2.48, volume: 12569874000, marketCap: '$423.1B', dayHigh: 3580.00, dayLow: 3430.00, open: 3435.25, previousClose: 3435.25, timestamp: Date.now(),
    historical: Array.from({ length: 30 }, (_, i) => ({ date: `2026-04-${String(i + 1).padStart(2, '0')}`, close: 3300 + Math.random() * 300 }))
  },
  {
    ticker: 'GLD', name: 'SPDR Gold Shares', price: 218.35, change: 1.50, changePercent: 0.69, volume: 6523100, marketCap: '$58.2B', dayHigh: 219.20, dayLow: 216.80, open: 217.00, previousClose: 216.85, timestamp: Date.now(),
    historical: Array.from({ length: 30 }, (_, i) => ({ date: `2026-04-${String(i + 1).padStart(2, '0')}`, close: 212 + Math.random() * 8 }))
  },
];

export function getWatchlist() {
  return WATCHLIST;
}

export async function fetchStockData(): Promise<StockData[]> {
  // For demo, return realistic fallback data
  // In production, this would call the Yahoo Finance API
  return FALLBACK_STOCKS;
}

export function getStockStats(stocks: StockData[]) {
  const gainers = stocks.filter(s => s.change > 0);
  const losers = stocks.filter(s => s.change < 0);
  const totalVolume = stocks.reduce((sum, s) => sum + s.volume, 0);
  
  return {
    total: stocks.length,
    gainers: gainers.length,
    losers: losers.length,
    unchanged: stocks.length - gainers.length - losers.length,
    totalVolume,
    topGainer: gainers.sort((a, b) => b.changePercent - a.changePercent)[0],
    topLoser: losers.sort((a, b) => a.changePercent - b.changePercent)[0],
  };
}
