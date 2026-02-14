import type { FavoriteLocation } from "../../types/address";
import { cn } from "../../shared/utils/cn";

interface FavoriteCardProps {
  favorite: FavoriteLocation;
  onSelect: (coords: [number, number]) => void;
  onRemove: (id: string, e: React.MouseEvent) => void;
}

export function FavoriteCard({
  favorite,
  onSelect,
  onRemove,
}: FavoriteCardProps) {
  return (
    <div
      onClick={() => onSelect(favorite.coords)}
      className={cn(
        "p-4 border rounded-xl bg-white shadow-sm transition-all active:scale-[0.98] cursor-pointer",
        "border-secondary-200 hover:border-primary-500",
      )}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-bold text-primary-700 line-clamp-1">
          {favorite.name}
        </h3>
        <button
          onClick={(e) => onRemove(favorite.id, e)}
          className="text-secondary-900 hover:text-alert-danger transition-colors p-1"
        >
          ✕
        </button>
      </div>
      <p className="text-xs text-secondary-600 leading-tight line-clamp-2">
        {favorite.address}
      </p>
      <div className="flex gap-3 pt-3 border-t border-secondary-100">
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-secondary-400 uppercase tracking-tighter">
            Latitude
          </span>
          <span className="text-xs font-mono text-secondary-700">
            {favorite.coords[0].toFixed(6)}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-secondary-400 uppercase tracking-tighter">
            Longitude
          </span>
          <span className="text-xs font-mono text-secondary-700">
            {favorite.coords[1].toFixed(6)}
          </span>
        </div>
      </div>
    </div>
  );
}
