import { useQuery } from "@tanstack/react-query";
import { fetchRegistrationsByDocument } from "~/api/registrations";
import { Registration } from "~/models/registration";

type UseRegistrationsByDocumentData = {
  isLoading: boolean;
  data: Registration[] | undefined;
  error: unknown;
};

export function useRegistrationsByDocument(
  document: string
): UseRegistrationsByDocumentData {
  const { data, isLoading, error } = useQuery({
    queryKey: ["registrationsByDocument", document],
    queryFn: () => fetchRegistrationsByDocument(document),
    enabled: !!document,
  });

  return {
    data,
    error,
    isLoading,
  };
}
