import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import type { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";

import ChangeView from "./MapComponent/ChangeView";
import ClickHandler from "./MapComponent/ClickHandler";
import SearchBar from "./MapComponent/SearchBar";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

const DEFAULT_POSITION: LatLngExpression = [-18.9186, -48.2772];
const DEFAULT_ZOOM = 13;

export default function MapWidget() {
  const [markerPosition, setMarkerPosition] = useState<LatLngExpression | null>(
    null,
  );

  return (
    <div className="h-[600px] w-full flex flex-row relative">
      <MapContainer
        center={DEFAULT_POSITION}
        zoom={DEFAULT_ZOOM}
        className="h-full w-full"
      >
        {markerPosition && <ChangeView center={markerPosition} />}

        <TileLayer
          attribution="© OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <ClickHandler onClick={(lat, lng) => setMarkerPosition([lat, lng])} />

        {markerPosition && (
          <Marker position={markerPosition}>
            {Array.isArray(markerPosition) ? (
              <Popup>
                Latitude: {markerPosition[0].toFixed(5)}, Longitude:{" "}
                {markerPosition[1].toFixed(5)}
              </Popup>
            ) : (
              <Popup>Local selecionado</Popup>
            )}
          </Marker>
        )}
      </MapContainer>

      <SearchBar onSearch={(pos) => setMarkerPosition(pos)} />
    </div>
  );
}
