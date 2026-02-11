import { useMapEvents } from "react-leaflet";

interface ClickHandlerProps {
  onClick: (lat: number, lng: number) => void;
}

export default function ClickHandler({ onClick }: ClickHandlerProps) {
  useMapEvents({
    click(e) {
      onClick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}
