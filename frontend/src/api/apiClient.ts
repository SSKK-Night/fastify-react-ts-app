import axios, { AxiosRequestConfig } from 'axios';

const basicUser = process.env.React_APP_BASIC_USER
const basicPassword = process.env.React_APP_BASIC_USER

// 環境を手動で指定（true: 本番環境, false: 開発環境）
const isProduction = window.location.hostname !== 'localhost'; // "localhost"なら開発環境

const getBaseUrl = () => {
  return isProduction ? '/api' : 'http://localhost:3000'; // 本番環境なら '/api'、開発環境ならポート付きのURL
};

// Basic認証ヘッダーを本番環境でのみ返す
const getAuthHeader = () => {
  return isProduction ? { Authorization: `Basic ${btoa('${basicUser}:${basicPassword}')}` } : {};
};

// 共通APIクライアント
const apiClient = {
  get: async <T = any>(endpoint: string, config?: AxiosRequestConfig): Promise<T> => {
    const response = await axios.get<T>(`${getBaseUrl()}${endpoint}`, {
      ...config,
      headers: {
        ...config?.headers,
        ...getAuthHeader(), // 本番環境のみBasic認証を追加
      },
      withCredentials: true,
    });
    return response.data;
  },
  post: async <T = any>(endpoint: string, data: any, config?: AxiosRequestConfig): Promise<T> => {
    const response = await axios.post<T>(`${getBaseUrl()}${endpoint}`, data, {
      ...config,
      headers: {
        ...config?.headers,
        ...getAuthHeader(), // 本番環境のみBasic認証を追加
      },
      withCredentials: true,
    });
    return response.data;
  },
  put: async <T = any>(endpoint: string, data: any, config?: AxiosRequestConfig): Promise<T> => {
    const response = await axios.put<T>(`${getBaseUrl()}${endpoint}`, data, {
      ...config,
      headers: {
        ...config?.headers,
        ...getAuthHeader(), // 本番環境のみBasic認証を追加
      },
      withCredentials: true,
    });
    return response.data;
  },
  patch: async <T = any>(endpoint: string, data: any, config?: AxiosRequestConfig): Promise<T> => {
    const response = await axios.patch<T>(`${getBaseUrl()}${endpoint}`, data, {
      ...config,
      headers: {
        ...config?.headers,
        ...getAuthHeader(), // 本番環境のみBasic認証を追加
      },
      withCredentials: true,
    });
    return response.data;
  },
  delete: async <T = any>(endpoint: string, config?: AxiosRequestConfig): Promise<T> => {
    const response = await axios.delete<T>(`${getBaseUrl()}${endpoint}`, {
      ...config,
      headers: {
        ...config?.headers,
        ...getAuthHeader(), // 本番環境のみBasic認証を追加
      },
      withCredentials: true,
    });
    return response.data;
  },
};

export default apiClient;