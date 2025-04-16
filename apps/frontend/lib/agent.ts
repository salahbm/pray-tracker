import { ORIGIN } from '@/constants/config';

export const agent = async (url: string, options: RequestInit = {}) => {
  if (!ORIGIN) {
    throw new Error('API_BASE_URL is not defined in environment variables');
  }

  const fullURL = `${ORIGIN}${url}`;

  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json; charset=utf-8',
  };

  const mergedHeaders: HeadersInit = {
    ...defaultHeaders,
    ...(options.headers || {}),
  };

  const response = await fetch(fullURL, {
    ...options,
    credentials: 'omit',
    headers: mergedHeaders,
  });

  const text = await response.text();

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
