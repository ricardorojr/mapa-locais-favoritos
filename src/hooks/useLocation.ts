import { useQuery, useMutation } from "@tanstack/react-query";
import { locationService } from "../services/locationService";

export function useReverseLocation(lat?: number, lng?: number) {
  return useQuery({
    queryKey: ["location", lat, lng],
    queryFn: () => locationService.searchByCoords(lat!, lng!),
    enabled: !!lat && !!lng, 
    staleTime: 1000 * 60 * 10,
  });
}

export function useSearchLocation() {
  return useMutation({
    mutationFn: (query: string) => locationService.searchByText(query),
  });
}

