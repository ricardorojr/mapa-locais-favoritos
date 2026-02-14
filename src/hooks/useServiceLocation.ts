import { useQuery, useMutation } from "@tanstack/react-query";
import { searchByAddress, searchByCoords } from "../services/locationService";
import type { AppError } from "../shared/errors/app-error";
import type { AddressResponse } from "../types/address";
import { useGlobalError } from "../shared/errors/error-provider/error-context";
import { useEffect, useRef } from "react";

export function useReverseLocation(lat?: number, lng?: number) {
  const { showError } = useGlobalError();
  const errorShownRef = useRef(false);

  const query = useQuery<AddressResponse, AppError>({
    queryKey: ["location", lat, lng],
    queryFn: () => searchByCoords({ lat: lat!, lng: lng! }),
    enabled: lat !== undefined && lng !== undefined,
    staleTime: 1000 * 60 * 10,
    retry: false,
  });

  useEffect(() => {
    if (query.error && !errorShownRef.current) {
      showError(query.error.message);
      errorShownRef.current = true;
    }

    if (!query.error) {
      errorShownRef.current = false;
    }
  }, [query.error, showError]);

  return query;
}

export function useSearchLocation() {
  const { showError } = useGlobalError();

  return useMutation<AddressResponse, AppError, string>({
    mutationFn: (address: string) => searchByAddress(address),
    onError: (error) => {
      showError(error.message);
    },
  });
}
