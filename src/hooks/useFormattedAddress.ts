import type { AddressResponse } from "../types/address";

export function useFormattedAddress(
  reverseData: AddressResponse | undefined, 
  isFetching: boolean
) {
  if (isFetching) return ["Buscando endereço..."];
  
  if (!reverseData?.address) return ["Clique no mapa para localizar"];

  const { road, suburb, neighbourhood, city, state, country } = reverseData.address;

  const lines = [
    road ?? "",
    `Bairro: ${suburb ?? neighbourhood ?? ""}`,
    `Cidade: ${city ?? ""}`,
    `Estado: ${state ?? ""}`,
    `País: ${country ?? ""}`,
  ];

  return lines.filter((line) => {
    const parts = line.split(": ");
    if (line.includes(": ")) return parts[1] && parts[1].trim().length > 0;
    return line.trim().length > 0;
  });
}

