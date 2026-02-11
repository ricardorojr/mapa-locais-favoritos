import { useMap } from "react-leaflet";
import type { LatLngExpression } from "leaflet";

interface ChangeViewProps {
  center: LatLngExpression;
}

export default function ChangeView({ center }: ChangeViewProps) {
  const map = useMap();
  map.setView(center, 14);
  return null;
}
