import { ORIGIN } from '@/constants/config';

export const agent = async (url: string, options?: RequestInit) => {
  const fullURL = `${ORIGIN}${url}`;

  const headers: HeadersInit = {
    'Content-Type': 'application/json; charset=utf-8',
  };

  const response = await fetch(fullURL, {
    ...options,
    credentials: 'omit',
    headers,
  });

  const text = await response.text(); // avoid direct json crash

  if (!response.ok) {
    let errorData;
    try {
      errorData = JSON.parse(text);
    } catch {
      errorData = { message: 'Invalid JSON', details: text };
    }

    throw {
      status: response.status,
      code: errorData.code || 'API_ERROR',
      message: errorData.message || 'Unknown error',
      details: errorData.details || 'Unknown error',
    };
  }

  return JSON.parse(text);
};
