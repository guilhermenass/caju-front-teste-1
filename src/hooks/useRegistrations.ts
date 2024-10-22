import { useQuery } from "@tanstack/react-query";
import {
  fetchAllRegistrations,
  fetchRegistrationsByDocument,
} from "~/api/registrations";
import { Registration } from "~/models/registration";

type USeRegistrationsData = {
  isLoading: boolean;
  data: Registration[] | undefined;
  error: unknown;
};

export function useRegistrations(document: string): USeRegistrationsData {
  const { data, isLoading } = useQuery({
    queryKey: ["registrations"],
    queryFn: fetchAllRegistrations,
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ["registrationsByDocument", document],
    queryFn: () => fetchRegistrationsByDocument(document),
    enabled: false,
  });

  return {
    data,
    error,
    isLoading,
  };
}
