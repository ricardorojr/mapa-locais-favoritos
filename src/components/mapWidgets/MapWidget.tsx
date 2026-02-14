import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import type { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import type { FavoriteLocation } from "../../types/address";

import ChangeView from "./mapWidgetsComponents/ChangeView";
import ClickHandler from "./mapWidgetsComponents/ClickHandler";
import SearchBar from "./mapWidgetsComponents/SearchBar";
import { useReverseLocation } from "../../hooks/useServiceLocation";
import { LocationPopup } from "./mapWidgetsComponents/LocationPopup";
import { useFormattedAddress } from "../../hooks/useFormattedAddress";
import { ModalSaveLocation } from "../ui/ModalSaveLocation";

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
  onSave: (location: FavoriteLocation) => boolean;
  focusCoords: [number, number] | null;
}

export default function MapWidget({ onSave, focusCoords }: MapWidgetProps) {
  const [markerPosition, setMarkerPosition] = useState<[number, number] | null>(
    null,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const markerRef = useRef<L.Marker>(null);
  const [mapBounds, setMapBounds] = useState<number[][] | null>(null);

  const { data: reverseData, isFetching } = useReverseLocation(
    markerPosition?.[0],
    markerPosition?.[1],
  );

  const addressLines = useFormattedAddress(reverseData, isFetching);

  const updateLocation = (coords: [number, number], bounds?: number[][]) => {
    setMarkerPosition(coords);
    setMapBounds(bounds || null);
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

  const handleConfirmSave = (chosenName: string): boolean => {
    if (markerPosition) {
      return onSave({
        id: crypto.randomUUID(),
        name: chosenName,
        address: addressLines.join(", "),
        coords: markerPosition,
      });
    }
    return false;
  };

  return (
    <div className="flex flex-col md:relative md:h-[80vh] w-full border rounded-xl overflow-hidden shadow-lg border-secondary-200">
      <div className="h-96 md:h-full w-full z-0 relative">
        <MapContainer
          center={DEFAULT_POSITION}
          zoom={13}
          className="h-full w-full"
        >
          {markerPosition && (
            <ChangeView center={markerPosition} bounds={mapBounds} />
          )}
          
          <TileLayer
            attribution="&copy; OpenStreetMap"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <ClickHandler onClick={(lat, lng) => updateLocation([lat, lng])} />

          {markerPosition && (
            <Marker position={markerPosition} ref={markerRef}>
              <Popup
                autoPan
                key={`popup-${markerPosition[0]}-${markerPosition[1]}`}
              >
                <LocationPopup
                  addressLines={addressLines}
                  isFetching={isFetching}
                  onSave={() => setIsModalOpen(true)}
                  disabled={!reverseData}
                  
                />
              </Popup>
            </Marker>
          )}
        </MapContainer>
      </div>
      <SearchBar onSearch={(pos, bounds) => updateLocation(pos as [number, number], bounds)} />
      <ModalSaveLocation
        isOpen={isModalOpen}
        coords={markerPosition}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmSave}
      />
    </div>
  );
}
