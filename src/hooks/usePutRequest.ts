import { useState } from 'react';
import  { AxiosRequestConfig, AxiosResponse } from 'axios';
import instance from '~/api/axios';
import { updateRegistration } from '~/api/registrations';

interface UsePutRequest<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  sendPutRequest: (url: string, body: T, config?: AxiosRequestConfig) => Promise<void>;
}

const usePutRequest = <T extends {}>(): UsePutRequest<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const sendPutRequest = async (url: string, body: T): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const response = await updateRegistration(url, body);
      setData(response);
    } catch (err: any) {
      setError(err.response?.data || 'Network error');
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, sendPutRequest };
};

export default usePutRequest;
