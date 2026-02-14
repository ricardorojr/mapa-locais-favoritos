import { useCallback, useState } from "react";
import type { FavoriteLocation } from "../types/address";

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteLocation[]>(() => {
    if (typeof window === "undefined") return [];
    const saved = localStorage.getItem("@MapApp:favorites");
    try {
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const handleSaveFavorite = useCallback((newLocation: FavoriteLocation) => {
    let isNew = true;

    setFavorites((prev) => {
      if (prev.some((f) => f.address === newLocation.address)) {
        isNew = false;
        return prev;
      }
      const updated = [newLocation, ...prev];
      localStorage.setItem("@MapApp:favorites", JSON.stringify(updated));
      return updated;
    });

    return isNew;
  }, []);

  const removeFavorite = useCallback((id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setFavorites((prev) => {
      const updated = prev.filter((f) => f.id !== id);
      localStorage.setItem("@MapApp:favorites", JSON.stringify(updated));
      return updated;
    });
  }, []);

  const clearFavorites = useCallback(() => {
    setFavorites([]);
    localStorage.removeItem("@MapApp:favorites");
  }, []);

  return { favorites, handleSaveFavorite, removeFavorite, clearFavorites };
}
