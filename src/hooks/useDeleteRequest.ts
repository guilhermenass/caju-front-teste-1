import { AxiosResponse } from 'axios';
import { useState } from 'react';
import instance from '~/api/axios';

interface UseDeleteRequest<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  sendDeleteRequest: (url: string) => Promise<void>;
}

const useDeleteRequest = <T extends {}>(): UseDeleteRequest<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const sendDeleteRequest = async (url: string): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const response: AxiosResponse<T> = await instance.delete(url);
      setData(response.data);
    } catch (err: any) {
      setError(err.response?.data || 'Network error');
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, sendDeleteRequest };
};

export default useDeleteRequest;
