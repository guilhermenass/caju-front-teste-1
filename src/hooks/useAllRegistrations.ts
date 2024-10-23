import { useQuery } from "@tanstack/react-query";
import { fetchAllRegistrations } from "~/api/registrations";
import { Registration } from "~/models/registration";

type UseAllRegistrationsData = {
  isLoading: boolean;
  data: Registration[] | undefined;
  error: unknown;
  refetch: () => void
};

export function useAllRegistrations(): UseAllRegistrationsData {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["registrations"],
    queryFn: fetchAllRegistrations,
  });

  return {
    data,
    error,
    isLoading,
    refetch
  };
}
