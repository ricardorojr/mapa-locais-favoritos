import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import type { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import type { FavoriteLocation } from "../../types/address";

import ChangeView from "./MapComponents/ChangeView";
import ClickHandler from "./MapComponents/ClickHandler";
import SearchBar from "./MapComponents/SearchBar";
import { useReverseLocation } from "../../hooks/useLocation";
import { LocationPopup } from "./MapComponents/LocationPopup";
import { useFormattedAddress } from "../../hooks/useFormattedAddress";

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

interface MapWidgetProps {
  onSave: (location: FavoriteLocation) => void;
  focusCoords: [number, number] | null;
}

export default function MapWidget({ onSave, focusCoords }: MapWidgetProps) {
  const [markerPosition, setMarkerPosition] = useState<[number, number] | null>(null);
  const markerRef = useRef<L.Marker>(null);

  const { data: reverseData, isFetching } = useReverseLocation(
    markerPosition?.[0], 
    markerPosition?.[1]
  );

  const addressLines = useFormattedAddress(reverseData, isFetching);

  const updateLocation = (coords: [number, number]) => {
    setMarkerPosition(coords);
  };

  useEffect(() => {
    if (focusCoords) requestAnimationFrame(() => updateLocation(focusCoords));
  }, [focusCoords]);

  useEffect(() => {
    if (markerRef.current) {
      const timer = setTimeout(() => markerRef.current?.openPopup(), 100);
      return () => clearTimeout(timer);
    }
  }, [markerPosition, reverseData]);

  return (
    <div className="h-[80vh] w-full flex flex-row relative border rounded-xl overflow-hidden shadow-lg border-secondary-200">
      <MapContainer center={DEFAULT_POSITION} zoom={13} className="h-full w-full z-0">
        {markerPosition && <ChangeView center={markerPosition} />}
        
        <TileLayer 
          attribution='&copy; OpenStreetMap' 
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
        />

        <ClickHandler onClick={(lat, lng) => updateLocation([lat, lng])} />

        {markerPosition && (
          <Marker position={markerPosition} ref={markerRef}>
            <Popup autoPan key={`popup-${markerPosition[0]}-${markerPosition[1]}`}>
              <LocationPopup 
                addressLines={addressLines}
                isFetching={isFetching}
                onSave={() => onSave({
                  id: crypto.randomUUID(),
                  name: addressLines[0] || "Local Selecionado",
                  address: addressLines.join(", "),
                  coords: markerPosition,
                })}
              />
            </Popup>
          </Marker>
        )}
      </MapContainer>

      <SearchBar onSearch={(pos) => updateLocation(pos as [number, number])} />
    </div>
  );
}
