import * as React from 'react';
import * as styles from './GlobeSection.module.css';

const WORLD_DATA_URL =
  'https://raw.githubusercontent.com/martynafford/natural-earth-geojson/refs/heads/master/110m/physical/ne_110m_land.json';

const ROTATION_SPEED = 0.3;

function pointInPolygon(point, polygon) {
  const [x, y] = point;
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const [xi, yi] = polygon[i];
    const [xj, yj] = polygon[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi)
      inside = !inside;
  }
  return inside;
}

function pointInFeature(point, feature) {
  const { geometry } = feature;
  if (geometry.type === 'Polygon') {
    if (!pointInPolygon(point, geometry.coordinates[0])) return false;
    for (let i = 1; i < geometry.coordinates.length; i++) {
      if (pointInPolygon(point, geometry.coordinates[i])) return false;
    }
    return true;
  }
  if (geometry.type === 'MultiPolygon') {
    for (const polygon of geometry.coordinates) {
      if (pointInPolygon(point, polygon[0])) {
        let inHole = false;
        for (let i = 1; i < polygon.length; i++) {
          if (pointInPolygon(point, polygon[i])) {
            inHole = true;
            break;
          }
        }
        if (!inHole) return true;
      }
    }
  }
  return false;
}

function generateDotsInPolygon(feature, d3, dotSpacing = 16) {
  const dots = [];
  const bounds = d3.geoBounds(feature);
  const [[minLng, minLat], [maxLng, maxLat]] = bounds;
  const stepSize = dotSpacing * 0.08;
  for (let lng = minLng; lng <= maxLng; lng += stepSize) {
    for (let lat = minLat; lat <= maxLat; lat += stepSize) {
      const pt = [lng, lat];
      if (pointInFeature(pt, feature)) dots.push(pt);
    }
  }
  return dots;
}

const Globe3D = ({ globeStateRef }) => {
  const containerRef = React.useRef(null);

  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let cancelled = false;
    let animTimer = null;

    async function init() {
      const d3 = await import('d3');
      if (cancelled) return;

      const canvas = document.createElement('canvas');
      canvas.style.cssText =
        'width:100%;height:100%;border-radius:50%;cursor:grab;display:block;';
      el.appendChild(canvas);

      const context = canvas.getContext('2d');
      const cw = el.offsetWidth;
      const ch = el.offsetHeight;
      const baseRadius = Math.min(cw, ch) / 2 - 2;

      const dpr = window.devicePixelRatio || 1;
      canvas.width = cw * dpr;
      canvas.height = ch * dpr;
      context.scale(dpr, dpr);

      const projection = d3
        .geoOrthographic()
        .scale(baseRadius)
        .translate([cw / 2, ch / 2])
        .clipAngle(90);

      const path = d3.geoPath().projection(projection).context(context);

      const allDots = [];
      let landFeatures = null;
      const rotation = [0, -20];

      function render() {
        context.clearRect(0, 0, cw, ch);
        const currentScale = projection.scale();
        const scaleFactor = currentScale / baseRadius;

        context.beginPath();
        context.arc(cw / 2, ch / 2, currentScale, 0, 2 * Math.PI);
        context.fillStyle = '#050505';
        context.fill();
        context.strokeStyle = 'rgba(255,255,255,0.15)';
        context.lineWidth = 1.5 * scaleFactor;
        context.stroke();

        if (landFeatures) {
          const graticule = d3.geoGraticule();
          context.beginPath();
          path(graticule());
          context.strokeStyle = '#ffffff';
          context.lineWidth = 0.5 * scaleFactor;
          context.globalAlpha = 0.08;
          context.stroke();
          context.globalAlpha = 1;

          context.beginPath();
          landFeatures.features.forEach((f) => path(f));
          context.strokeStyle = 'rgba(255,255,255,0.2)';
          context.lineWidth = 0.8 * scaleFactor;
          context.stroke();

          allDots.forEach((dot) => {
            const proj = projection([dot.lng, dot.lat]);
            if (
              proj &&
              proj[0] >= 0 &&
              proj[0] <= cw &&
              proj[1] >= 0 &&
              proj[1] <= ch
            ) {
              context.beginPath();
              context.arc(proj[0], proj[1], 1.2 * scaleFactor, 0, 2 * Math.PI);
              context.fillStyle = '#888888';
              context.fill();
            }
          });
        }

        const grad = context.createRadialGradient(
          cw * 0.38,
          ch * 0.38,
          currentScale * 0.1,
          cw / 2,
          ch / 2,
          currentScale,
        );
        grad.addColorStop(0, 'rgba(255,255,255,0.04)');
        grad.addColorStop(0.5, 'transparent');
        grad.addColorStop(1, 'rgba(0,0,0,0.5)');
        context.beginPath();
        context.arc(cw / 2, ch / 2, currentScale, 0, 2 * Math.PI);
        context.fillStyle = grad;
        context.fill();
      }

      function tick() {
        const gs = globeStateRef.current;
        if (gs.nudgeVel > 0.01) {
          rotation[0] += gs.nudgeVel * 3;
          gs.nudgeVel *= 0.95;
          projection.rotate(rotation);
          render();
        } else if (gs.spinning) {
          rotation[0] += ROTATION_SPEED;
          projection.rotate(rotation);
          render();
        }
      }

      canvas.addEventListener('pointerdown', (e) => {
        globeStateRef.current.spinning = false;
        const startX = e.clientX;
        const startY = e.clientY;
        const startRot = [...rotation];
        canvas.style.cursor = 'grabbing';

        const onMove = (me) => {
          const dx = me.clientX - startX;
          const dy = me.clientY - startY;
          rotation[0] = startRot[0] + dx * 0.4;
          rotation[1] = Math.max(-90, Math.min(90, startRot[1] - dy * 0.4));
          projection.rotate(rotation);
          render();
        };

        const onUp = () => {
          canvas.style.cursor = 'grab';
          window.removeEventListener('pointermove', onMove);
          window.removeEventListener('pointerup', onUp);
          setTimeout(() => {
            globeStateRef.current.spinning = true;
          }, 50);
        };

        window.addEventListener('pointermove', onMove);
        window.addEventListener('pointerup', onUp);
      });

      try {
        const resp = await fetch(WORLD_DATA_URL);
        const data = await resp.json();
        if (cancelled) return;

        landFeatures = data;
        data.features.forEach((feature) => {
          const dots = generateDotsInPolygon(feature, d3, 16);
          dots.forEach(([lng, lat]) => allDots.push({ lng, lat }));
        });
        render();
        animTimer = d3.timer(tick);
      } catch (err) {
        console.error('Globe data load error:', err);
      }
    }

    init();

    return () => {
      cancelled = true;
      if (animTimer) animTimer.stop();
      while (el.firstChild) el.removeChild(el.firstChild);
    };
  }, [globeStateRef]);

  return <div ref={containerRef} className={styles.globeContainer} />;
};

export default Globe3D;
