import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { TaskEntity } from 'types';

interface RequestConfig {
  url: string;
  method?: string;
  body?: {};
}

export const useHttp = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();
  const token = Cookies.get('access_token');

  const sendRequest = useCallback(
    async (
      requestConfig: RequestConfig,
      applyData: (data: TaskEntity[]) => void
    ) => {
      setIsLoading(true);
      setError('');
      try {
        const response = await fetch(requestConfig.url, {
          method: requestConfig.method ? requestConfig.method : 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          credentials: 'include',
          body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
        });

        if (response.status === 401) {
          navigate('/');
        } else {
          const data = await response.json();
          applyData(data);
        }
      } catch (err) {
        setError('Something went wrong! Try again later.');
      }
      setIsLoading(false);
    },
    []
  );

  return {
    isLoading,
    error,
    sendRequest,
    setError,
  };
};
