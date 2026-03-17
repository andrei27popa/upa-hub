'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { ProtectedUnit } from '@/lib/data';

interface CityData {
  name: string;
  region: string;
  cx: string;
  cy: string;
}

const cities: CityData[] = [
  { name: 'București', region: 'București', cx: '55%', cy: '65%' },
  { name: 'Cluj-Napoca', region: 'Cluj', cx: '40%', cy: '30%' },
  { name: 'Timișoara', region: 'Timiș', cx: '18%', cy: '45%' },
  { name: 'Iași', region: 'Iași', cx: '75%', cy: '25%' },
  { name: 'Constanța', region: 'Constanța', cx: '80%', cy: '60%' },
  { name: 'Brașov', region: 'Brașov', cx: '50%', cy: '45%' },
  { name: 'Sibiu', region: 'Sibiu', cx: '38%', cy: '45%' },
];

function getColorByCount(count: number): string {
  if (count === 0) return '#CBD5E1';
  if (count === 1) return '#93C5FD';
  if (count === 2) return '#3B82F6';
  return '#1D4ED8';
}

function getGlowByCount(count: number): string {
  if (count === 0) return 'rgba(203,213,225,0.3)';
  if (count === 1) return 'rgba(147,197,253,0.5)';
  if (count === 2) return 'rgba(59,130,246,0.5)';
  return 'rgba(29,78,216,0.6)';
}

interface RomaniaMapProps {
  units: ProtectedUnit[];
  onRegionClick?: (region: string) => void;
}

export default function RomaniaMap({ units, onRegionClick }: RomaniaMapProps) {
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const router = useRouter();

  function getUnitsForRegion(region: string): ProtectedUnit[] {
    return units.filter(u => u.region === region);
  }

  function handleClick(region: string) {
    if (onRegionClick) {
      onRegionClick(region);
    } else {
      router.push(`/unitati-protejate?region=${encodeURIComponent(region)}`);
    }
  }

  const hoveredUnits = hoveredCity ? getUnitsForRegion(hoveredCity) : [];

  return (
    <div className="relative w-full">
      {/* Legend */}
      <div className="flex items-center gap-4 mb-4 text-sm text-text-light flex-wrap">
        <span className="font-semibold text-text">Legendă:</span>
        {[
          { color: '#CBD5E1', label: '0 unități' },
          { color: '#93C5FD', label: '1 unitate' },
          { color: '#3B82F6', label: '2 unități' },
          { color: '#1D4ED8', label: '3+ unități' },
        ].map(item => (
          <span key={item.label} className="flex items-center gap-1.5">
            <span
              className="w-3.5 h-3.5 rounded-full inline-block border border-white/50"
              style={{ backgroundColor: item.color }}
            />
            {item.label}
          </span>
        ))}
      </div>

      {/* Map container */}
      <div className="relative w-full aspect-[16/10] bg-gradient-to-br from-surface to-surface-dark rounded-2xl border border-border overflow-hidden">
        <svg
          viewBox="0 0 800 500"
          className="w-full h-full"
          role="img"
          aria-label="Harta interactivă a României cu unitățile protejate"
        >
          {/* Romania outline - simplified polygon */}
          <path
            d="M 80,180 L 120,120 L 180,80 L 260,60 L 340,50 L 420,40 L 500,50 L 560,70 L 620,60 L 700,80 L 740,120 L 750,180 L 730,240 L 700,280 L 680,320 L 650,350 L 600,370 L 560,350 L 520,340 L 480,350 L 440,370 L 380,380 L 320,370 L 260,350 L 200,320 L 150,280 L 110,240 L 80,200 Z"
            fill="none"
            stroke="#94A3B8"
            strokeWidth="2"
            strokeLinejoin="round"
            opacity="0.5"
          />
          {/* Filled area */}
          <path
            d="M 80,180 L 120,120 L 180,80 L 260,60 L 340,50 L 420,40 L 500,50 L 560,70 L 620,60 L 700,80 L 740,120 L 750,180 L 730,240 L 700,280 L 680,320 L 650,350 L 600,370 L 560,350 L 520,340 L 480,350 L 440,370 L 380,380 L 320,370 L 260,350 L 200,320 L 150,280 L 110,240 L 80,200 Z"
            fill="url(#mapGradient)"
            opacity="0.15"
          />
          <defs>
            <radialGradient id="mapGradient" cx="50%" cy="50%" r="60%">
              <stop offset="0%" stopColor="#2563EB" />
              <stop offset="100%" stopColor="#10B981" />
            </radialGradient>
          </defs>

          {/* City dots */}
          {cities.map(city => {
            const regionUnits = getUnitsForRegion(city.region);
            const count = regionUnits.length;
            const color = getColorByCount(count);
            const glow = getGlowByCount(count);
            const cxNum = (parseFloat(city.cx) / 100) * 800;
            const cyNum = (parseFloat(city.cy) / 100) * 500;
            const isHovered = hoveredCity === city.region;

            return (
              <g key={city.region}>
                {/* Pulsing ring for cities with units */}
                {count > 0 && (
                  <motion.circle
                    cx={cxNum}
                    cy={cyNum}
                    r={16}
                    fill="none"
                    stroke={color}
                    strokeWidth={2}
                    initial={{ opacity: 0.6, r: 12 }}
                    animate={{ opacity: [0.6, 0, 0.6], r: [12, 24, 12] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                  />
                )}

                {/* Main dot */}
                <motion.circle
                  cx={cxNum}
                  cy={cyNum}
                  r={count > 0 ? 10 : 6}
                  fill={color}
                  stroke="white"
                  strokeWidth={2}
                  style={{ cursor: 'pointer', filter: isHovered ? `drop-shadow(0 0 8px ${glow})` : 'none' }}
                  whileHover={{ scale: 1.4 }}
                  onMouseEnter={(e) => {
                    setHoveredCity(city.region);
                    const svg = (e.target as SVGElement).closest('svg');
                    if (svg) {
                      const rect = svg.getBoundingClientRect();
                      setTooltipPos({
                        x: (cxNum / 800) * rect.width,
                        y: (cyNum / 500) * rect.height,
                      });
                    }
                  }}
                  onMouseLeave={() => setHoveredCity(null)}
                  onClick={() => handleClick(city.region)}
                  role="button"
                  aria-label={`${city.name}: ${count} ${count === 1 ? 'unitate protejată' : 'unități protejate'}`}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') handleClick(city.region);
                  }}
                />

                {/* Count badge */}
                {count > 0 && (
                  <motion.g
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    <rect
                      x={cxNum - 10}
                      y={cyNum - 30}
                      width={20}
                      height={18}
                      rx={9}
                      fill={color}
                      stroke="white"
                      strokeWidth={1.5}
                    />
                    <text
                      x={cxNum}
                      y={cyNum - 18}
                      textAnchor="middle"
                      fill="white"
                      fontSize="11"
                      fontWeight="bold"
                    >
                      {count}
                    </text>
                  </motion.g>
                )}

                {/* City name label */}
                <text
                  x={cxNum}
                  y={cyNum + (count > 0 ? 24 : 18)}
                  textAnchor="middle"
                  fill="#64748B"
                  fontSize="11"
                  fontWeight="500"
                  style={{ pointerEvents: 'none' }}
                >
                  {city.name}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Tooltip */}
        <AnimatePresence>
          {hoveredCity && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 5 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.15 }}
              className="absolute z-20 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-border p-4 min-w-[200px] pointer-events-none"
              style={{
                left: `${tooltipPos.x}px`,
                top: `${tooltipPos.y - 10}px`,
                transform: 'translate(-50%, -100%)',
              }}
            >
              <p className="font-bold text-text text-sm mb-1">
                {cities.find(c => c.region === hoveredCity)?.name}
              </p>
              <p className="text-text-light text-xs mb-2">
                {hoveredUnits.length} {hoveredUnits.length === 1 ? 'unitate protejată' : 'unități protejate'}
              </p>
              {hoveredUnits.length > 0 && (
                <ul className="space-y-1">
                  {hoveredUnits.map(u => (
                    <li key={u.id} className="text-xs text-primary-light font-medium flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary inline-block" />
                      {u.name}
                    </li>
                  ))}
                </ul>
              )}
              <p className="text-[10px] text-text-lighter mt-2">Click pentru detalii</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
