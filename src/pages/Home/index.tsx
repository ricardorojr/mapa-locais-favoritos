import { useState } from "react";
import MapWidget from "../../components/Map/MapWidget";
import type { FavoriteLocation } from "../../types/address";
import { ButtonBase } from "../../components/UI/ButtonBase";
import { EmptyState } from "../../components/Favorites/EmptyListFavorite";
import { FavoriteCard } from "../../components/Favorites/FavoriteCard";
import { StarIcon } from "../../assets/icons/StarIcon";
import { TrashIcon } from "../../assets/icons/TrashIcon";

export default function Home() {
  const getInitialFavorites = (): FavoriteLocation[] => {
    if (typeof window === "undefined") return [];

    const saved = localStorage.getItem("@MapApp:favorites");
    if (!saved) return [];

    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error("Erro ao carregar favoritos", e);
      return [];
    }
  };

  const [favorites, setFavorites] =
    useState<FavoriteLocation[]>(getInitialFavorites);
  const [focusCoords, setFocusCoords] = useState<[number, number] | null>(null);

  const handleSaveFavorite = (newLoc: FavoriteLocation) => {
    const isDuplicate = favorites.some((f) => f.address === newLoc.address);
    if (isDuplicate) return alert("Este local já está nos seus favoritos!");

    const updated = [newLoc, ...favorites];
    setFavorites(updated);
    localStorage.setItem("@MapApp:favorites", JSON.stringify(updated));
  };

  const removeFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = favorites.filter((f) => f.id !== id);
    setFavorites(updated);
    localStorage.setItem("@MapApp:favorites", JSON.stringify(updated));
  };

  const clearAllFavorites = () => {
    const confirm = window.confirm(
      "Tem certeza que deseja apagar TODOS os favoritos?",
    );

    if (confirm) {
      setFavorites([]);
      localStorage.removeItem("@MapApp:favorites");
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-secondary-50">
      <div className="h-[300]">
        <MapWidget onSave={handleSaveFavorite} focusCoords={focusCoords} />
      </div>

      <div className="p-8 bg-white shadow-inner flex-1">
        <div className="max-w-6xl mx-auto">
          <header className="flex justify-between items-center mb-6">
            {favorites.length > 0 && (
              <>
              <h3 className="flex items-center gap-2 font-bold text-secondary-900">
              <StarIcon size={24} />
               Meus Locais Favoritos
            </h3>
              <ButtonBase variant="danger" size="sm" onClick={clearAllFavorites}>
                  <TrashIcon size={16} className="text-white" />
                  Limpar Tudo
              </ButtonBase>
              
            </>
            )}
          </header>

          {favorites.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {favorites.map((fav) => (
                
                <FavoriteCard
                  key={fav.id}
                  favorite={fav}
                  onSelect={setFocusCoords}
                  onRemove={removeFavorite}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
