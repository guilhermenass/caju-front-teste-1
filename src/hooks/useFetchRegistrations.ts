import { useQuery } from "@tanstack/react-query";
import {
  fetchAllRegistrations
} from "~/api/registrations";
import { Registration } from "~/models/registration";

type UseFetchRegistrationsData = {
  isLoading: boolean;
  data: Registration[] | undefined;
  error: unknown;
};

export function useFetchRegistrations(): UseFetchRegistrationsData {
  const { data, isLoading, error } = useQuery({
    queryKey: ["registrations"],
    queryFn: fetchAllRegistrations,
  });

  return {
    data,
    error,
    isLoading,
  };
}
