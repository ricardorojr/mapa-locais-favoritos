import { useState } from "react";
import type { LatLngExpression } from "leaflet";
import { TextInput } from "../../UI/TextInput";
import { ButtonBase } from "../../UI/ButtonBase";
import { useSearchLocation } from "../../../hooks/useLocation";

interface SearchBarProps {
  onSearch: (pos: LatLngExpression, label: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [value, setValue] = useState("");
  const [notFound, setNotFound] = useState(false);

  const { mutateAsync: searchLocation, isPending } = useSearchLocation();

  const handleSearch = async () => {
    if (!value.trim()) return;
    setNotFound(false);

    try {
      const data = await searchLocation(value);

      if (data) {
        const lat = parseFloat(data.lat);
        const lon = parseFloat(data.lon);
        onSearch([lat, lon], data.display_name);
        setValue("");
      } else {
        setNotFound(true);
      }
    } catch (error) {
      console.error(error);
      setNotFound(true);
    }
  };

  return (
    <div
      className="flex flex-col gap-2 p-4 bg-white/90 backdrop-blur-sm shadow-xl 
        rounded-xl absolute top-4 right-4 z-map-overlay w-72 border border-secondary-200"
    >
      <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
        Buscar Localização
      </h3>

      <TextInput
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          if (notFound) setNotFound(false);
        }}
        placeholder="Rua, Cidade, UF..."
        disabled={isPending}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        errorMessage="Endereço não encontrado. Tente novamente."
        error={notFound}
      />

      <ButtonBase
        onClick={handleSearch}
        className="w-full"
        isLoading={isPending}
        variant="primary"
        disabled={!value}
        size="md"
      >
        Buscar
      </ButtonBase>
    </div>
  );
}
