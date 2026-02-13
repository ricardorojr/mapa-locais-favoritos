import type { Coords, AddressResponse } from "../types/address";

const BASE_URL = "https://nominatim.openstreetmap.org";

export const locationService = {
  async searchByText(address: string): Promise<AddressResponse | undefined> {
  const response = await fetch(
    `${BASE_URL}/search?q=${encodeURIComponent(address)}&format=jsonv2&limit=1`,
    { headers: { "Accept-Language": "pt-BR" } }
  );

  if (!response.ok) throw new Error("Erro na busca");
  
  const [firstResult] = await response.json();
  return firstResult;
},

  async searchByCoords({ lat, lng }: Coords): Promise<AddressResponse> {
    const response = await fetch(
      `${BASE_URL}/reverse?lat=${lat}&lon=${lng}&format=jsonv2`,
      { headers: { "Accept-Language": "pt-BR" } },
    );
    if (!response.ok) throw new Error("Erro ao obter endereço");
    return await response.json();
  },
};
