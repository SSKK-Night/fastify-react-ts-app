// src/hooks/useCsrfToken.ts
import { useState, useEffect } from 'react';
import apiClient from '../../api/apiClient';

interface CsrfResponse {
  csrfToken: string;
}

export const useCsrfToken = () => {
  const [csrfToken, setCsrfToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        // const data: CsrfResponse = await apiClient.get('/task-genre/csrf-token');
        const data: CsrfResponse = await apiClient.get('/auth/csrf-token');

        if (data && data.csrfToken) {
          setCsrfToken(data.csrfToken);
        } else {
          setError('CSRFトークンがレスポンスに含まれていません');
        }
      } catch (error) {
        console.error('CSRFトークンの取得エラー:', error);
        setError('CSRFトークンの取得に失敗しました');
      }
    };

    fetchCsrfToken();
  }, []);

  return { csrfToken, error };
};