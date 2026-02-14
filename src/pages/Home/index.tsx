import { useState } from "react";
import MapWidget from "../../components/mapWidgets/MapWidget";
import { ButtonBase } from "../../components/UI/ButtonBase";
import { EmptyState } from "../../components/favorites/EmptyListFavorite";
import { FavoriteCard } from "../../components/favorites/FavoriteCard";
import { StarIcon } from "../../assets/icons/StarIcon";
import { ModalBase } from "../../components/UI/ModalBase";
import { TrashIcon } from "../../assets/icons/TrashIcon";
import { useFavorites } from "../../hooks/useFavorites";

export default function Home() {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [focusCoords, setFocusCoords] = useState<[number, number] | null>(null);
  
  const { 
    favorites, 
    handleSaveFavorite, 
    removeFavorite, 
    clearFavorites 
  } = useFavorites();

  const handleConfirmClear = () => {
    clearFavorites();
    setIsConfirmOpen(false);
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-secondary-50">
      <div className="50vh">
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
                
                <ButtonBase 
                  variant="danger" 
                  size="sm" 
                  onClick={() => setIsConfirmOpen(true)}
                >
                  <TrashIcon size={16} className="text-white" />
                  Limpar Tudo
                </ButtonBase>

                <ModalBase isOpen={isConfirmOpen} onClose={() => setIsConfirmOpen(false)}>
                  <div className="text-center p-4">
                    <h3 className="text-secondary-600 text-lg font-bold">
                      Você tem certeza que deseja apagar todos os favoritos?
                    </h3>
                    <p className="text-sm text-secondary-600 my-4">
                      Esta ação não pode ser desfeita.
                    </p>
                    <div className="flex gap-3">
                      <ButtonBase 
                        variant="outline" 
                        className="flex-1" 
                        onClick={() => setIsConfirmOpen(false)}
                      >
                        Cancelar
                      </ButtonBase>
                      <ButtonBase 
                        variant="danger" 
                        className="flex-1" 
                        onClick={handleConfirmClear}
                      >
                        Confirmar
                      </ButtonBase>
                    </div>
                  </div>
                </ModalBase>
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
