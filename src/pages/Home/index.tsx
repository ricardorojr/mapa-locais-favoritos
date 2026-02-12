import { useState } from "react";
import MapWidget from "../../components/Map/MapWidget";
import type { FavoriteLocation } from "../../types/address";

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
    <div className="flex flex-col w-full min-h-screen bg-slate-50">
      <div className="h-[500px]">
        <MapWidget onSave={handleSaveFavorite} focusCoords={focusCoords} />
      </div>
      <div className="p-8 bg-white shadow-inner flex-1">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            ⭐ Meus Locais Favoritos ({favorites.length})
          </h2>
          {favorites.length === 0 ? (
            <div className="text-center py-10 border-2 border-dashed border-slate-200 rounded-xl">
              <p className="text-slate-400">
                Nenhum favorito salvo. Use o mapa acima para encontrar e salvar
                locais!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {favorites.map((fav) => (
                <div
                  key={fav.id}
                  onClick={() => setFocusCoords(fav.coords)}
                  className="p-4 border rounded-xl bg-white shadow-sm hover:border-emerald-500 cursor-pointer transition-all active:scale-[0.98]"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-emerald-800 line-clamp-1">
                      {fav.name}
                    </h3>
                    <button
                      onClick={(e) => removeFavorite(fav.id, e)}
                      className="text-slate-300 hover:text-red-500 transition-colors"
                    >
                      ✕
                    </button>
                  </div>
                  <p className="text-xs text-slate-500 leading-tight line-clamp-2">
                    {fav.address}
                  </p>
                </div>
              ))}
            </div>
          )}
          {favorites.length > 0 && (
            <button
              onClick={clearAllFavorites}
              className="text-xs font-semibold text-red-500 hover:bg-red-50 px-3 py-2 rounded-lg transition-colors border border-red-100"
            >
              🗑️ Limpar Tudo
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
