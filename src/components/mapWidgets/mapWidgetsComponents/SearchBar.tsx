import { useState } from "react";
import type { LatLngExpression } from "leaflet";
import { TextInput } from "../../ui/TextInput";
import { ButtonBase } from "../../ui/ButtonBase";
import { useSearchLocation } from "../../../hooks/useServiceLocation";
import { cn } from "../../../shared/utils/cn";

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
      className={cn(
        "flex flex-col gap-2 p-4 bg-white/90 backdrop-blur-sm shadow-xl border border-secondary-200",
        "relative w-full",
        "md:absolute md:top-4 md:right-4 md:w-72 md:z-[1000]",
        "rounded-xl",
      )}
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
