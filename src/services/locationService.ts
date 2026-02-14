import type { Coords, AddressResponse } from "../types/address";
import { createAppError } from "../core/errors";
import { httpClient } from "../core/httpClient";

const BASE_URL = import.meta.env.VITE_API_URL;

export const searchByAddress = async (
  address: string,
  signal?: AbortSignal
): Promise<AddressResponse> => {

  const data = await httpClient.get<AddressResponse[]>(
    `${BASE_URL}/search?q=${encodeURIComponent(address)}&format=jsonv2&limit=1`,
    signal
  );

  if (!Array.isArray(data) || data.length === 0) {
    throw createAppError("Endereço não encontrado.", "LOCATION_NOT_FOUND");
  }

  return data[0];
};

export const searchByCoords = async (
  { lat, lng }: Coords,
  signal?: AbortSignal
): Promise<AddressResponse> => {

  const data = await httpClient.get<AddressResponse | { error: string }>(
    `${BASE_URL}/reverse?lat=${lat}&lon=${lng}&format=jsonv2`,
    signal
  );

  if ("error" in data) {
    throw createAppError("Endereço inválido.", "LOCATION_NOT_FOUND");
  }

  return data;
};
