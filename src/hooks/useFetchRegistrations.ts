import { useEffect, useState } from "react";
import {
  fetchAllRegistrations,
  fetchRegistrationsByDocument,
} from "~/api/registrations";
import { Registration } from "~/models/registration";

type UseFetchRegistrationsData = {
  loading: boolean;
  data: Registration[] | undefined;
  fetchData: (document?: string) => Promise<void>;
  error: unknown;
};

export function useFetchRegistrations(): UseFetchRegistrationsData {
  const [data, setData] = useState<Registration[]>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  async function fetchData(document?: string) {
    try {
      const response = document
        ? await fetchRegistrationsByDocument(document)
        : await fetchAllRegistrations();
      setData(response);
      setLoading(false);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return {
    data,
    error,
    loading,
    fetchData,
  };
}
