import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import type { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import type { FavoriteLocation } from "../../types/address";

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

L.Marker.prototype.options.icon = DefaultIcon;

const DEFAULT_POSITION: LatLngExpression = [-18.9186, -48.2772];

interface MapWidgetProps {
  onSave: (location: FavoriteLocation) => void;
  focusCoords: [number, number] | null;
}

export default function MapWidget({ onSave, focusCoords }: MapWidgetProps) {
  const [markerPosition, setMarkerPosition] = useState<[number, number] | null>(
    null,
  );
  const [manualAddress, setManualAddress] = useState<string>("");
  const { data: reverseData, isFetching } = useReverseLocation(
    markerPosition?.[0],
    markerPosition?.[1],
  );

  const markerRef = useRef<L.Marker>(null);

  const handleSearchResult = (pos: LatLngExpression) => {
    setMarkerPosition(pos as [number, number]);
    setManualAddress("");
  };

  const updateLocation = (coords: [number, number]) => {
  setManualAddress("");
  setMarkerPosition(coords);
};

  const displayAddress = isFetching
    ? ["Buscando endereço..."]
    : reverseData?.address
      ? [
          `${reverseData.address.road ?? ""}`,
          `Bairro: ${reverseData.address.suburb ?? reverseData.address.neighbourhood ?? ""}`,
          `Cidade: ${reverseData.address.city ?? ""}`,
          `Estado: ${reverseData.address.state ?? ""}`,
          `País: ${reverseData.address.country ?? ""}`,
        ].filter((line) => line.length > 0 && !line.endsWith(": "))
      : manualAddress
        ? [manualAddress]
        : ["Clique no mapa para localizar"];

  useEffect(() => {
    if (markerRef.current) {
      const timer = setTimeout(() => {
        markerRef.current?.openPopup();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [markerPosition, reverseData]);

  useEffect(() => {
  if (focusCoords) {
    requestAnimationFrame(() => {
      updateLocation(focusCoords);
    });
  }
}, [focusCoords]);

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

        <ClickHandler onClick={(lat, lng) => updateLocation([lat, lng])} />

        {markerPosition && (
          <Marker position={markerPosition} ref={markerRef}>
            <Popup
              autoPan={true}
              closeOnClick={false}
              key={`popup-${markerPosition[0]}-${markerPosition[1]}`}
            >
              <div className="text-sm p-1 max-w-[200px]">
                <strong className="text-emerald-700 block mb-1">
                  Localização:
                </strong>
                <p className="text-slate-600 leading-tight">
                  {isFetching
                    ? "Buscando endereço..."
                    : displayAddress.map((addr, i) => (
                        <span key={i}>
                          {addr}
                          <br />
                        </span>
                      ))}
                </p>
                {!isFetching && (
                  <button
                    onClick={() =>
                      onSave({
                        id: crypto.randomUUID(),
                        name: displayAddress[0] || "Local Selecionado",
                        address: displayAddress.join(", "),
                        coords: markerPosition,
                      })
                    }
                    className="mt-2 w-full bg-emerald-600 text-white rounded py-1.5 text-xs font-bold"
                  >
                    ⭐ Salvar Favorito
                  </button>
                )}
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>

      <SearchBar onSearch={handleSearchResult} />
    </div>
  );
}
