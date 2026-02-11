import { useState } from "react";
import type { LatLngExpression } from "leaflet";
import { MyInput } from "../../UI/MyInput";
import { MyButton } from "../../UI/MyButton";

interface SearchBarProps {
  onSearch: (pos: LatLngExpression) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleSearch = async () => {
    if (!query) return;
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`;
    const res = await fetch(url);
    const data = await res.json();
    if (data && data.length > 0) {
      const lat = parseFloat(data[0].lat);
      const lon = parseFloat(data[0].lon);
      onSearch([lat, lon]);
    } else {
      alert("Local não encontrado!");
    }
  };

  return (
    <div className="flex flex-col gap-2 p-4 bg-white/90 backdrop-blur-sm shadow-lg rounded-xl absolute top-4 right-4 z-[1000] w-72 border border-slate-200">
      <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
        Buscar Localização
      </h3>
      <MyInput
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Ex: Uberlândia, MG"
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      />
      <MyButton onClick={handleSearch}>Buscar</MyButton>
    </div>
  );
}
