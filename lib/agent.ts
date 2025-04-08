import { API_BASE_URL } from '@/constants/config';

export const agent = async (url: string, options?: RequestInit) => {
  const fullURL = `${API_BASE_URL}${url}`;

  const headers: HeadersInit = {
    'Content-Type': 'application/json; charset=utf-8',
    ...(options?.headers || {}),
  };

  const response = await fetch(fullURL, {
    ...options,
    credentials: 'omit', // Correct for Expo apps
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw {
      status: response.status,
      code: errorData.code,
      message: errorData.message || 'Unknown error message',
      details: errorData.details || 'Unknown error',
    };
  }

  return await response.json();
};
