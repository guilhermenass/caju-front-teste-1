import { useQuery } from "@tanstack/react-query";
import { fetchAllRegistrations } from "~/api/registrations";
import { Registration } from "~/models/registration";

type UseAllRegistrationsData = {
  isLoading: boolean;
  data: Registration[] | undefined;
  error: unknown;
};

export function useAllRegistrations(): UseAllRegistrationsData {
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
