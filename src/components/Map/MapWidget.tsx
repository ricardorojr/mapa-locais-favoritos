import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import type { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

import ChangeView from "./MapComponent/ChangeView";
import ClickHandler from "./MapComponent/ClickHandler";
import SearchBar from "./MapComponent/SearchBar";
import { useReverseLocation } from "../../hooks/useLocation";

const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Isso aplica o ícone para todos os marcadores do projeto
L.Marker.prototype.options.icon = DefaultIcon;

const DEFAULT_POSITION: LatLngExpression = [-18.9186, -48.2772];

export default function MapWidget() {
  const [markerPosition, setMarkerPosition] = useState<[number, number] | null>(null);
  const [manualAddress, setManualAddress] = useState<string>("");
  const { data: reverseData, isFetching } = useReverseLocation(
    markerPosition?.[0],
    markerPosition?.[1],
  );

  const handleMapClick = (lat: number, lng: number) => {
    setManualAddress("");
    setMarkerPosition([lat, lng]);
  };

  const handleSearchResult = (pos: LatLngExpression, label: string) => {
    setMarkerPosition(pos as [number, number]);
    setManualAddress(label);
  };

  const displayAddress = isFetching
    ? "Buscando endereço..."
    : manualAddress ||
      reverseData?.display_name ||
      "Clique no mapa para localizar";

  return (
    <div className="h-[600px] w-full flex flex-row relative border rounded-xl overflow-hidden shadow-lg">
      <MapContainer
        center={DEFAULT_POSITION}
        zoom={13}
        className="h-full w-full z-0"
      >
        {markerPosition && <ChangeView center={markerPosition} />}

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <ClickHandler onClick={handleMapClick} />

        {markerPosition && (
          <Marker position={markerPosition}>
            <Popup key={displayAddress}>
              <div className="text-sm p-1 max-w-[200px]">
                <strong className="text-emerald-700 block mb-1">
                  Localização:
                </strong>
                <p className="text-slate-600 leading-tight">{displayAddress}</p>
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>

      <SearchBar onSearch={handleSearchResult} />
    </div>
  );
}
