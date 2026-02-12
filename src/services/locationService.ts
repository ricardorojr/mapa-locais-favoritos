const BASE_URL = "https://nominatim.openstreetmap.org";


export const locationService = {
    
  async searchByText(query: string) {
    const url = `${BASE_URL}/search?q=${encodeURIComponent(query)}&polygon_geojson=1&format=jsonv2&limit=1`;
    
    const response = await fetch(
      url,
      { 
        headers: { 
          "Accept-Language": "pt-BR",
          "User-Agent": "MeuApp/1.0"
        } 
      }
    );

    if (!response.ok) throw new Error("Erro na busca");
    
    const data = await response.json();
    return data.length > 0 ? data[0] : null;
  },

  async searchByCoords(lat: number, lng: number) {
    const response = await fetch(
      `${BASE_URL}/reverse?lat=${lat}&lon=${lng}&format=jsonv2`,
      { headers: { "Accept-Language": "pt-BR" } }
    );
    if (!response.ok) throw new Error("Erro ao obter endereço");
    return await response.json();
  }
};

