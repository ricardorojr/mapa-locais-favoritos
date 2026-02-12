import { useQuery, useMutation } from "@tanstack/react-query";
import { locationService } from "../services/locationService";

export function useReverseLocation(lat?: number, long?: number) {
  return useQuery({
    queryKey: ["location", lat, long],
    queryFn: () => locationService.searchByCoords({ lat: lat!, long: long! }),
    enabled: !!lat && !!long, 
    staleTime: 1000 * 60 * 10,
  });
}

export function useSearchLocation() {
  return useMutation({
    mutationFn: (address: string) => locationService.searchByText(address),
  });
}

