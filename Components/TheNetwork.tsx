"use client";

import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from "react-simple-maps";
import type { GeographiesProps } from "react-simple-maps";

// ---------------------------------------------------------------------------
// npm install react-simple-maps d3-geo
// (+ npm install -D @types/react-simple-maps)
//
// This is how the real PolarGrid site actually renders this component: a
// static, hand-styled SVG map (via react-simple-maps / d3-geo), not a real
// WebGL map. Node positions are true lat/lng projected with d3's Mercator
// projection, so it's geographically accurate, but coverage "halos" are
// fixed-pixel-radius circles (not real geo-circles) and there's no pan/zoom —
// matching the reference exactly.
// ---------------------------------------------------------------------------

interface NetworkNode {
  id: string;
  name: string;
  lat: number;
  lng: number;
  active: boolean;
  /** stagger (seconds) for the pulsing ring animation on active nodes */
  pulseDelay?: number;
  /** label placement, matching the reference's per-node hand-tuned offsets */
  labelAnchor: "start" | "end";
  labelDx: number;
  labelDy: number;
}

const NETWORK_NODES: NetworkNode[] = [
  { id: "vancouver", name: "Vancouver", lat: 49.2827, lng: -123.1207, active: true, pulseDelay: 0, labelAnchor: "end", labelDx: -8, labelDy: -10 },
  { id: "calgary", name: "Calgary", lat: 51.0447, lng: -114.0719, active: false, labelAnchor: "start", labelDx: 8, labelDy: -10 },
  { id: "portland", name: "Portland", lat: 45.5152, lng: -122.6784, active: false, labelAnchor: "end", labelDx: -8, labelDy: -10 },
  { id: "sanfrancisco", name: "San Francisco", lat: 37.7749, lng: -122.4194, active: false, labelAnchor: "end", labelDx: -8, labelDy: 14 },
  { id: "losangeles", name: "Los Angeles", lat: 34.0522, lng: -118.2437, active: false, labelAnchor: "end", labelDx: -8, labelDy: 14 },
  { id: "phoenix", name: "Phoenix", lat: 33.4484, lng: -112.074, active: false, labelAnchor: "start", labelDx: 8, labelDy: 14 },
  { id: "denver", name: "Denver", lat: 39.7392, lng: -104.9903, active: false, labelAnchor: "start", labelDx: 8, labelDy: -10 },
  { id: "dallas", name: "Dallas", lat: 32.7767, lng: -96.797, active: false, labelAnchor: "start", labelDx: 8, labelDy: -10 },
  { id: "sanantonio", name: "San Antonio", lat: 29.4241, lng: -98.4936, active: false, labelAnchor: "start", labelDx: 8, labelDy: 14 },
  { id: "chicago", name: "Chicago", lat: 41.8781, lng: -87.6298, active: false, labelAnchor: "start", labelDx: 8, labelDy: -10 },
  { id: "toronto", name: "Toronto", lat: 43.6532, lng: -79.3832, active: true, pulseDelay: 1, labelAnchor: "start", labelDx: 8, labelDy: 14 },
  { id: "montreal", name: "Montreal", lat: 45.5019, lng: -73.5674, active: true, pulseDelay: 1.5, labelAnchor: "start", labelDx: 8, labelDy: -10 },
  { id: "newyork", name: "New York", lat: 40.7128, lng: -74.006, active: false, labelAnchor: "start", labelDx: 8, labelDy: -10 },
  { id: "atlanta", name: "Atlanta", lat: 33.749, lng: -84.388, active: false, labelAnchor: "start", labelDx: 8, labelDy: -10 },
  { id: "tampa", name: "Tampa", lat: 27.9506, lng: -82.4572, active: false, labelAnchor: "start", labelDx: 8, labelDy: 14 },
];

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";
const TEAL = "#00d4aa";
// ISO-3166 numeric ids for the countries we want to render
const NA_COUNTRY_FILL: Record<string, string> = {
  "840": "#1e1e2a", // United States
  "124": "#23232f", // Canada
  "484": "#191924", // Mexico
  "044": "#191924", // Bahamas
};

export default function NetworkCoverageMapSVG() {
  return (
    <div
      style={{
        width: "100%",
        background: "#0F0F12",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: 16,
        overflow: "hidden",
        fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        color: "#eef1f6",
        boxShadow: "0 24px 60px rgba(0,0,0,0.45)",
      }}
    >
      <style>{`
        @keyframes polargrid-live-ring {
          0%   { r: 4; stroke-opacity: 0.9; }
          70%  { r: 11; stroke-opacity: 0; }
          100% { r: 11; stroke-opacity: 0; }
        }
        .pg-live-ring {
          animation-name: polargrid-live-ring;
          animation-duration: 2.5s;
          animation-timing-function: ease-out;
          animation-iteration-count: infinite;
        }
      `}</style>

      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          padding: "20px 24px",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span
            style={{
              width: 9,
              height: 9,
              borderRadius: 3,
              background: "linear-gradient(135deg, #E91E8C, #ff5fa8)",
              transform: "rotate(45deg)",
              flexShrink: 0,
            }}
          />
          <span style={{ fontSize: 14, fontWeight: 600, letterSpacing: 0.4 }}>
            POLAR<span style={{ fontWeight: 800, color: "#E91E8C" }}>GRID</span>
          </span>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 13, fontWeight: 600 }}>Network Coverage Map</div>
          <div style={{ marginTop: 3, fontSize: 11, color: "rgba(255,255,255,0.4)" }}>
            15 Edge Nodes &middot; P95 Latency &lt; 30ms
          </div>
        </div>
      </div>

      <div style={{ position: "relative", width: "100%", background: "rgb(20,20,28)" }}>
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{ center: [-99, 40], scale: 820 }}
          width={960}
          height={500}
          style={{ width: "100%", height: "auto", display: "block" }}
        >
          <ZoomableGroup zoom={1} center={[-99, 40]}>
            <Geographies geography={GEO_URL}>
              {({ geographies }: Parameters<NonNullable<GeographiesProps["children"]>>[0]) =>
                geographies
                  .filter((geo) => NA_COUNTRY_FILL[geo.id as string])
                  .map((geo) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={NA_COUNTRY_FILL[geo.id as string] ?? "#1e1e2a"}
                      stroke="rgba(255,255,255,0.09)"
                      strokeWidth={0.5}
                      style={{
                        default: { outline: "none" },
                        hover: { outline: "none" },
                        pressed: { outline: "none" },
                      }}
                    />
                  ))
              }
            </Geographies>

            {/* coverage halos — fixed pixel radius, drawn under every marker */}
            {NETWORK_NODES.map((node) => (
              <Marker key={`halo-${node.id}`} coordinates={[node.lng, node.lat]}>
                <circle r={63} fill={TEAL} fillOpacity={0.08} stroke="none" />
              </Marker>
            ))}

            {/* node markers */}
            {NETWORK_NODES.map((node) => (
              <Marker key={node.id} coordinates={[node.lng, node.lat]}>
                {node.active && (
                  <circle
                    className="pg-live-ring"
                    r={6}
                    fill="none"
                    stroke={TEAL}
                    strokeWidth={1.2}
                    opacity={0}
                    style={{ animationDelay: `${node.pulseDelay ?? 0}s` }}
                  />
                )}
                <circle
                  r={node.active ? 4 : 2.8}
                  fill={TEAL}
                  fillOpacity={node.active ? 1 : 0.6}
                  stroke={node.active ? "rgba(0,212,170,0.35)" : "none"}
                  strokeWidth={node.active ? 3.5 : 0}
                />
                <text
                  textAnchor={node.labelAnchor}
                  x={node.labelDx}
                  y={node.labelDy}
                  style={{
                    fontSize: node.active ? 8.5 : 7,
                    fontFamily: "Helvetica, Arial, sans-serif",
                    fontWeight: node.active ? 700 : 400,
                    fill: node.active ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.52)",
                    pointerEvents: "none",
                    textShadow: "rgba(0,0,0,0.9) 0px 0px 5px, rgba(0,0,0,0.6) 0px 0px 10px",
                  }}
                >
                  {node.name}
                </text>
              </Marker>
            ))}
          </ZoomableGroup>
        </ComposableMap>

        <div
          style={{
            position: "absolute",
            left: 16,
            bottom: 16,
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            gap: 6,
            padding: "12px 16px",
            background: "rgba(14,14,20,0.85)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 12,
            fontSize: 11,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: TEAL }} />
            <span style={{ color: "rgba(255,255,255,0.6)" }}>Edge Node</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                border: `1px solid ${TEAL}`,
                opacity: 0.5,
              }}
            />
            <span style={{ color: "rgba(255,255,255,0.6)" }}>&lt; 30ms P95 Coverage Zone</span>
          </div>
        </div>
      </div>
    </div>
  );
}
