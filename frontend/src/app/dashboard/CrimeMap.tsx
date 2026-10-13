"use client";

import { MapContainer, TileLayer, Marker, Popup, Tooltip, } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";


type CrimeArticle = {
  id: string;
  title: string;
  source: string;
  published_on: string;
  location: string;
  crime_type: string;
  url: string;
  is_reviewed: boolean;
};

type CrimeMapProps = {
  place?: string;
  articles: CrimeArticle[];
};


const CHENNAI_LOCATIONS: Record<string, [number, number]> = {
  Adyar: [13.0012, 80.2565],
  Ambattur: [13.1143, 80.1548],
  "Anna Nagar": [13.0878, 80.2081],
  Avadi: [13.1147, 80.1098],
  "Besant Nagar": [13.0003, 80.2668],
  Chengalpattu: [12.6819, 79.9888],
  Chengalpet: [12.6819, 79.9888],
  Chromepet: [12.9516, 80.1462],
  Chintadripet: [13.0732, 80.2695],
  Egmore: [13.0732, 80.2609],
  Guindy: [13.0067, 80.2206],
  Kodambakkam: [13.0518, 80.2210],
  Madhavaram: [13.1480, 80.2310],
  Medavakkam: [12.9229, 80.1926],
  Mylapore: [13.0339, 80.2676],
  Nanganallur: [12.9784, 80.1847],
  Nungambakkam: [13.0569, 80.2425],
  Pallavaram: [12.9675, 80.1491],
  Perambur: [13.1075, 80.2336],
  Porur: [13.0359, 80.1565],
  Royapettah: [13.0526, 80.2636],
  Saidapet: [13.0213, 80.2231],
  Sholinganallur: [12.9010, 80.2279],
  Tambaram: [12.9249, 80.1000],
  "T. Nagar": [13.0418, 80.2341],
  "T Nagar": [13.0418, 80.2341],
  Teynampet: [13.0410, 80.2560],
  Thiruvanmiyur: [12.9830, 80.2594],
  Triplicane: [13.0588, 80.2756],
  Velachery: [12.9750, 80.2212],
};

const markerIcon = L.divIcon({
  className: "crime-map-marker",
  html: '<div style="width:14px;height:14px;border-radius:50%;background:#FFE200;border:2px solid #222;box-shadow:0 0 0 4px rgba(255,226,0,.25)"></div>',
  iconSize: [14, 14],
  iconAnchor: [7, 7],
});

function getCoordinates(location: string): [number, number] | undefined {
  const normalized = location.trim().toLowerCase().replace(/[.\s]/g, "");

  const entry = Object.entries(CHENNAI_LOCATIONS).find(
    ([name]) =>
      name.toLowerCase().replace(/[.\s]/g, "") === normalized
  );

  return entry?.[1];
}


export default function CrimeMap({ place = "Chennai", articles }: CrimeMapProps) {
  const coordinates = CHENNAI_LOCATIONS[place] ?? [13.0827, 80.2707];

  const visibleArticles = articles.filter((article) => {
    if (!article.is_reviewed) return false;
    if (!getCoordinates(article.location)) return false;

    if (place !== "Chennai") {
      return (
        article.location.trim().toLowerCase() ===
        place.trim().toLowerCase()
      );
    }

    return true;
  });

  return (

    <MapContainer
      key={place}
      center={coordinates}
      zoom={place === "Chennai" ? 11 : 13}
      scrollWheelZoom={true}
      style={{ height: "450px", width: "100%", borderRadius: "12px" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      
      {visibleArticles.map((article) => {
        const position = getCoordinates(article.location);

        if (!position) return null;

        return (
          <Marker key={article.id} position={position} icon={markerIcon}>
            <Tooltip>{article.location}</Tooltip>
            <Popup>
              <div style={{ maxWidth: "240px" }}>
                <strong>{article.crime_type}</strong>
                <p>{article.title}</p>
                <p>{article.location} · {article.published_on}</p>
                <p>{article.source}</p>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read original report ↗
                </a>
              </div>
            </Popup>
          </Marker>
        );
      })}

    </MapContainer>
  );
}