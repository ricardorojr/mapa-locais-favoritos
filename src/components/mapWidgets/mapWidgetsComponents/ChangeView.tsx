import { useEffect } from "react";
import { useMap } from "react-leaflet";
import type { LatLngExpression, LatLngBoundsExpression } from "leaflet";

interface ChangeViewProps {
  center: LatLngExpression;
  bounds?: number[][] | null;
}

export default function ChangeView({ center, bounds }: ChangeViewProps) {
  const map = useMap();

  useEffect(() => {
    if (bounds && bounds.length > 0) {
      map.fitBounds(bounds as LatLngBoundsExpression, {
        padding: [20, 20],
        maxZoom: 16,
      });
    } else if (center) {
      map.setView(center, 15);
    }
  }, [center, bounds, map]);

  return null;
}
