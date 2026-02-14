import { useQuery, useMutation } from "@tanstack/react-query";
import { searchByAddress, searchByCoords } from "../services/locationService";

export function useReverseLocation(lat?: number, lng?: number) {
  return useQuery({
    queryKey: ["location", lat, lng],
    queryFn: () => searchByCoords({ lat: lat!, lng: lng! }),
    enabled: !!lat && !!lng, 
    staleTime: 1000 * 60 * 10,
  });
}

export function useSearchLocation() {
  return useMutation({
    mutationFn: (address: string) => searchByAddress(address),
  });
}

