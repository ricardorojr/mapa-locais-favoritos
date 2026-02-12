import { useState } from "react";
import type { LatLngExpression } from "leaflet";
import { MyInput } from "../../UI/MyInput";
import { MyButton } from "../../UI/MyButton";
import { useSearchLocation } from "../../../hooks/useLocation";

interface SearchBarProps {
  onSearch: (pos: LatLngExpression, label: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [notFound, setNotFound] = useState(false);

  const { mutateAsync: searchLocation, isPending } = useSearchLocation();

  const handleSearch = async () => {
    if (!query.trim()) return;
    setNotFound(false);

    try {
      const data = await searchLocation(query);

      if (data) {
        const lat = parseFloat(data.lat);
        const lon = parseFloat(data.lon);
        onSearch([lat, lon], data.display_name);
        setQuery("");
      } else {
        setNotFound(true);
      }
    } catch (error) {
      console.error(error);
      setNotFound(true);
    }
  };

  return (
    <div className="flex flex-col gap-2 p-4 bg-white/90 backdrop-blur-sm shadow-xl rounded-xl absolute top-4 right-4 z-[1000] w-72 border border-slate-200">
      <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
        Buscar Localização
      </h3>

      <MyInput
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          if (notFound) setNotFound(false);
        }}
        placeholder="Rua, Cidade, UF..."
        disabled={isPending}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        errorMessage="Endereço não encontrado. Tente novamente."
        error={notFound}
      />

      <div className="mt-1">
        <MyButton
          onClick={handleSearch}
          className="w-full"
          disabled={isPending}
        >
          {isPending ? "Buscando..." : "Buscar"}
        </MyButton>
      </div>
    </div>
  );
}
