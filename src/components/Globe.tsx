import { useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';
import type { AircraftState, ConflictEvent, TradeRoute, StockData } from '@/types';

interface GlobeProps {
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
}

// Financial center coordinates for 3D stock visualization
const FINANCIAL_CENTERS = [
  { city: 'New York', lat: 40.7128, lon: -74.0060, region: 'US' },
  { city: 'London', lat: 51.5074, lon: -0.1278, region: 'EU' },
  { city: 'Tokyo', lat: 35.6762, lon: 139.6503, region: 'APAC' },
  { city: 'Shanghai', lat: 31.2304, lon: 121.4737, region: 'APAC' },
  { city: 'Singapore', lat: 1.3521, lon: 103.8198, region: 'APAC' },
  { city: 'Frankfurt', lat: 50.1109, lon: 8.6821, region: 'EU' },
  { city: 'Dubai', lat: 25.2048, lon: 55.2708, region: 'MENA' },
  { city: 'Sao Paulo', lat: -23.5505, lon: -46.6333, region: 'LATAM' },
  { city: 'Sydney', lat: -33.8688, lon: 151.2093, region: 'APAC' },
  { city: 'Mumbai', lat: 19.0760, lon: 72.8777, region: 'APAC' },
  { city: 'Toronto', lat: 43.6532, lon: -79.3832, region: 'US' },
  { city: 'Zurich', lat: 47.3769, lon: 8.5417, region: 'EU' },
];

// Color palette
const COLORS = {
  ocean: 0x000000,
  grid: 0x00ff41,
  gridDim: 0x004d14,
  aircraft: 0xffdd00,
  aircraftGlow: 0xffaa00,
  conflict: 0xff0040,
  conflictGlow: 0xff2040,
  trade: 0x00ccff,
  tradeDim: 0x006688,
  stockUp: 0x00ff88,
  stockDown: 0xff4466,
  stockNeutral: 0xffff00,
  atmosphere: 0x00ff41,
};

function latLonToVector3(lat: number, lon: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

function createTextSprite(text: string, color: string, size: number = 16): THREE.Sprite {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;
  const fontSize = size * 2;
  canvas.width = text.length * fontSize * 0.6;
  canvas.height = fontSize * 1.5;
  
  ctx.font = `bold ${fontSize}px "Courier New", monospace`;
  ctx.fillStyle = color;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, canvas.width / 2, canvas.height / 2);
  
  const texture = new THREE.CanvasTexture(canvas);
  const material = new THREE.SpriteMaterial({ map: texture, transparent: true, depthTest: false });
  const sprite = new THREE.Sprite(material);
  sprite.scale.set(canvas.width / 80, canvas.height / 80, 1);
  
  return sprite;
}

export default function Globe({ aircraft, conflicts, tradeRoutes, stocks, activeLayers }: GlobeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const frameRef = useRef<number>(0);
  const aircraftGroupRef = useRef<THREE.Group>(new THREE.Group());
  const conflictGroupRef = useRef<THREE.Group>(new THREE.Group());
  const tradeGroupRef = useRef<THREE.Group>(new THREE.Group());
  const stockGroupRef = useRef<THREE.Group>(new THREE.Group());
  const rotationRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const isDragging = useRef(false);
  const lastMouse = useRef({ x: 0, y: 0 });
  const globeGroupRef = useRef<THREE.Group>(new THREE.Group());

  const GLOBE_RADIUS = 5;

  const updateAircraftMarkers = useCallback(() => {
    const group = aircraftGroupRef.current;
    // Remove old markers
    while (group.children.length > 0) {
      const child = group.children[0];
      if (child instanceof THREE.Mesh || child instanceof THREE.Sprite) {
        child.geometry?.dispose();
        (child.material as THREE.Material)?.dispose();
      }
      group.remove(child);
    }

    if (!activeLayers.aircraft) return;

    const validAircraft = aircraft.filter(a => a.latitude && a.longitude).slice(0, 300);
    
    validAircraft.forEach((a, i) => {
      const pos = latLonToVector3(a.latitude!, a.longitude!, GLOBE_RADIUS + 0.05);
      
      // Aircraft dot
      const geometry = new THREE.SphereGeometry(0.03, 6, 6);
      const material = new THREE.MeshBasicMaterial({ color: COLORS.aircraft });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.copy(pos);
      
      // Add callsign label for some aircraft
      if (a.callsign && i % 8 === 0) {
        const label = createTextSprite(a.callsign, '#ffdd00', 10);
        const labelPos = pos.clone().multiplyScalar(1.08);
        label.position.copy(labelPos);
        label.name = `aircraft-label-${i}`;
        group.add(label);
      }
      
      group.add(mesh);
    });
  }, [aircraft, activeLayers.aircraft]);

  const updateConflictMarkers = useCallback(() => {
    const group = conflictGroupRef.current;
    while (group.children.length > 0) {
      const child = group.children[0];
      if (child instanceof THREE.Mesh || child instanceof THREE.Sprite || child instanceof THREE.Points) {
        child.geometry?.dispose();
        (child.material as THREE.Material)?.dispose();
      }
      group.remove(child);
    }

    if (!activeLayers.conflicts) return;

    conflicts.forEach((c, i) => {
      const pos = latLonToVector3(c.latitude, c.longitude, GLOBE_RADIUS + 0.06);
      const severity = Math.min(c.fatalities / 50, 1);
      const size = 0.04 + severity * 0.06;
      
      // Pulsing sphere for conflict
      const geometry = new THREE.SphereGeometry(size, 8, 8);
      const material = new THREE.MeshBasicMaterial({
        color: COLORS.conflict,
        transparent: true,
        opacity: 0.7 + Math.sin(Date.now() * 0.003 + i) * 0.3,
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.copy(pos);
      mesh.name = `conflict-${i}`;
      
      // Location label
      if (i % 3 === 0) {
        const label = createTextSprite(`${c.location} (${c.fatalities})`, '#ff0040', 10);
        const labelPos = pos.clone().multiplyScalar(1.12);
        label.position.copy(labelPos);
        group.add(label);
      }
      
      group.add(mesh);
    });
  }, [conflicts, activeLayers.conflicts]);

  const updateTradeRoutes = useCallback(() => {
    const group = tradeGroupRef.current;
    while (group.children.length > 0) {
      const child = group.children[0];
      if (child instanceof THREE.Line || child instanceof THREE.Mesh || child instanceof THREE.Sprite) {
        child.geometry?.dispose();
        (child.material as THREE.Material)?.dispose();
      }
      group.remove(child);
    }

    if (!activeLayers.trade) return;

    tradeRoutes.forEach((route, ri) => {
      if (route.waypoints.length < 2) return;

      // Create curved path along globe surface
      const points: THREE.Vector3[] = [];
      for (let i = 0; i < route.waypoints.length - 1; i++) {
        const start = latLonToVector3(route.waypoints[i][0], route.waypoints[i][1], GLOBE_RADIUS + 0.03);
        const end = latLonToVector3(route.waypoints[i + 1][0], route.waypoints[i + 1][1], GLOBE_RADIUS + 0.03);
        
        // Create intermediate points for smooth curve
        const segments = 20;
        for (let j = 0; j < segments; j++) {
          const t = j / segments;
          const point = new THREE.Vector3().lerpVectors(start, end, t);
          point.normalize().multiplyScalar(GLOBE_RADIUS + 0.03 + Math.sin(t * Math.PI) * 0.3);
          points.push(point);
        }
      }
      // Add final point
      const last = route.waypoints[route.waypoints.length - 1];
      points.push(latLonToVector3(last[0], last[1], GLOBE_RADIUS + 0.03));

      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineBasicMaterial({
        color: route.type === 'air' ? 0xffaa00 : route.type === 'rail' ? 0xff6600 : COLORS.trade,
        transparent: true,
        opacity: route.type === 'shipping' ? 0.5 : 0.7,
      });
      const line = new THREE.Line(geometry, material);
      group.add(line);

      // Route name label at midpoint
      if (ri % 2 === 0) {
        const midIdx = Math.floor(points.length / 2);
        const label = createTextSprite(route.name.split('(')[0].trim(), '#00ccff', 9);
        const labelPos = points[midIdx].clone().multiplyScalar(1.1);
        label.position.copy(labelPos);
        group.add(label);
      }
    });
  }, [tradeRoutes, activeLayers.trade]);

  const updateStockVisualization = useCallback(() => {
    const group = stockGroupRef.current;
    while (group.children.length > 0) {
      const child = group.children[0];
      if (child instanceof THREE.Mesh || child instanceof THREE.Sprite) {
        child.geometry?.dispose();
        (child.material as THREE.Material)?.dispose();
      }
      group.remove(child);
    }

    if (!activeLayers.stocks) return;

    FINANCIAL_CENTERS.forEach((center, ci) => {
      const basePos = latLonToVector3(center.lat, center.lon, GLOBE_RADIUS + 0.08);
      
      // Get related stocks for this center
      const relatedStocks = stocks.filter((_, i) => i % FINANCIAL_CENTERS.length === ci);
      if (relatedStocks.length === 0) return;

      const avgChange = relatedStocks.reduce((sum, s) => sum + s.changePercent, 0) / relatedStocks.length;
      const barHeight = Math.max(0.1, Math.abs(avgChange) * 0.3);
      const isPositive = avgChange >= 0;

      // Create 3D bar
      const geometry = new THREE.BoxGeometry(0.08, barHeight, 0.08);
      const color = isPositive ? COLORS.stockUp : COLORS.stockDown;
      const material = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.85,
      });
      const bar = new THREE.Mesh(geometry, material);
      
      const barPos = basePos.clone().multiplyScalar(1 + barHeight / 2 / GLOBE_RADIUS);
      bar.position.copy(barPos);
      bar.lookAt(new THREE.Vector3(0, 0, 0));
      bar.rotateX(Math.PI / 2);
      group.add(bar);

      // City label
      const label = createTextSprite(
        `${center.city} ${avgChange >= 0 ? '+' : ''}${avgChange.toFixed(2)}%`,
        isPositive ? '#00ff88' : '#ff4466',
        10
      );
      const labelPos = basePos.clone().multiplyScalar(1 + barHeight / GLOBE_RADIUS + 0.05);
      label.position.copy(labelPos);
      group.add(label);
    });
  }, [stocks, activeLayers.stocks]);

  // Initialize Three.js scene
  useEffect(() => {
    if (!containerRef.current) return;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      60,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 14;
    camera.position.y = 4;
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Main globe group
    const globeGroup = globeGroupRef.current;
    scene.add(globeGroup);

    // --- Black Ocean Sphere ---
    const oceanGeometry = new THREE.SphereGeometry(GLOBE_RADIUS, 64, 64);
    const oceanMaterial = new THREE.MeshBasicMaterial({
      color: COLORS.ocean,
      transparent: true,
      opacity: 0.95,
    });
    const ocean = new THREE.Mesh(oceanGeometry, oceanMaterial);
    globeGroup.add(ocean);

    // --- Green Grid Lines ---
    const gridGroup = new THREE.Group();
    globeGroup.add(gridGroup);

    // Latitude lines (parallels)
    for (let lat = -80; lat <= 80; lat += 10) {
      const curvePoints: THREE.Vector3[] = [];
      for (let lon = -180; lon <= 180; lon += 2) {
        curvePoints.push(latLonToVector3(lat, lon, GLOBE_RADIUS + 0.005));
      }
      const geometry = new THREE.BufferGeometry().setFromPoints(curvePoints);
      const material = new THREE.LineBasicMaterial({
        color: lat === 0 ? COLORS.grid : COLORS.gridDim,
        transparent: true,
        opacity: lat === 0 ? 0.6 : 0.2,
      });
      gridGroup.add(new THREE.Line(geometry, material));
    }

    // Longitude lines (meridians)
    for (let lon = -180; lon < 180; lon += 10) {
      const curvePoints: THREE.Vector3[] = [];
      for (let lat = -90; lat <= 90; lat += 2) {
        curvePoints.push(latLonToVector3(lat, lon, GLOBE_RADIUS + 0.005));
      }
      const geometry = new THREE.BufferGeometry().setFromPoints(curvePoints);
      const material = new THREE.LineBasicMaterial({
        color: lon === 0 ? COLORS.grid : COLORS.gridDim,
        transparent: true,
        opacity: lon === 0 ? 0.6 : 0.2,
      });
      gridGroup.add(new THREE.Line(geometry, material));
    }

    // --- Atmosphere Glow ---
    const atmosGeometry = new THREE.SphereGeometry(GLOBE_RADIUS * 1.15, 64, 64);
    const atmosMaterial = new THREE.MeshBasicMaterial({
      color: COLORS.atmosphere,
      transparent: true,
      opacity: 0.03,
      side: THREE.BackSide,
    });
    const atmosphere = new THREE.Mesh(atmosGeometry, atmosMaterial);
    globeGroup.add(atmosphere);

    // --- Outer Glow Ring ---
    const ringGeometry = new THREE.RingGeometry(GLOBE_RADIUS * 1.3, GLOBE_RADIUS * 1.35, 64);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: COLORS.grid,
      transparent: true,
      opacity: 0.08,
      side: THREE.DoubleSide,
    });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.lookAt(camera.position);
    scene.add(ring);

    // Add data groups to globe
    globeGroup.add(aircraftGroupRef.current);
    globeGroup.add(conflictGroupRef.current);
    globeGroup.add(tradeGroupRef.current);
    globeGroup.add(stockGroupRef.current);

    // --- Stars Background ---
    const starsGeometry = new THREE.BufferGeometry();
    const starsCount = 3000;
    const positions = new Float32Array(starsCount * 3);
    for (let i = 0; i < starsCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 200;
    }
    starsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const starsMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.05, transparent: true, opacity: 0.6 });
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

    // --- Mouse/Touch Controls ---
    const handleMouseDown = (e: MouseEvent) => {
      isDragging.current = true;
      lastMouse.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      const deltaX = e.clientX - lastMouse.current.x;
      const deltaY = e.clientY - lastMouse.current.y;
      rotationRef.current.targetY += deltaX * 0.005;
      rotationRef.current.targetX += deltaY * 0.005;
      rotationRef.current.targetX = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, rotationRef.current.targetX));
      lastMouse.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDragging.current = false;
    };

    const handleWheel = (e: WheelEvent) => {
      const zoomSpeed = 0.02;
      camera.position.z += e.deltaY * zoomSpeed;
      camera.position.z = Math.max(7, Math.min(30, camera.position.z));
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging.current = true;
        lastMouse.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging.current || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - lastMouse.current.x;
      const deltaY = e.touches[0].clientY - lastMouse.current.y;
      rotationRef.current.targetY += deltaX * 0.005;
      rotationRef.current.targetX += deltaY * 0.005;
      lastMouse.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const handleTouchEnd = () => {
      isDragging.current = false;
    };

    const container = containerRef.current;
    container.addEventListener('mousedown', handleMouseDown);
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('mouseleave', handleMouseUp);
    container.addEventListener('wheel', handleWheel);
    container.addEventListener('touchstart', handleTouchStart);
    container.addEventListener('touchmove', handleTouchMove);
    container.addEventListener('touchend', handleTouchEnd);

    // --- Animation Loop ---
    const animate = (time?: number) => {
      frameRef.current = requestAnimationFrame(animate);

      // Smooth rotation
      rotationRef.current.x += (rotationRef.current.targetX - rotationRef.current.x) * 0.05;
      rotationRef.current.y += (rotationRef.current.targetY - rotationRef.current.y) * 0.05;

      // Auto-rotate slowly when not dragging
      if (!isDragging.current) {
        rotationRef.current.targetY += 0.0003;
      }

      globeGroup.rotation.x = rotationRef.current.x;
      globeGroup.rotation.y = rotationRef.current.y;

      // Pulse conflict markers
      if (time !== undefined) {
        conflictGroupRef.current.children.forEach((child, i) => {
          if (child instanceof THREE.Mesh && child.name.startsWith('conflict-')) {
            const mat = child.material as THREE.MeshBasicMaterial;
            mat.opacity = 0.5 + Math.sin(time * 0.002 + i * 0.5) * 0.4;
          }
        });
      }

      // Update ring to face camera
      ring.lookAt(camera.position);

      renderer.render(scene, camera);
    };

    frameRef.current = requestAnimationFrame(animate);

    // Handle resize
    const handleResize = () => {
      if (!container || !camera || !renderer) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frameRef.current);
      container.removeEventListener('mousedown', handleMouseDown);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('mouseleave', handleMouseUp);
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Update markers when data changes
  useEffect(() => {
    updateAircraftMarkers();
  }, [updateAircraftMarkers]);

  useEffect(() => {
    updateConflictMarkers();
  }, [updateConflictMarkers]);

  useEffect(() => {
    updateTradeRoutes();
  }, [updateTradeRoutes]);

  useEffect(() => {
    updateStockVisualization();
  }, [updateStockVisualization]);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1,
        cursor: isDragging.current ? 'grabbing' : 'grab',
      }}
    />
  );
}
