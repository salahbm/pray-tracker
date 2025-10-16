const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const agent = async (url: string, options: RequestInit = {}) => {
  if (!API_BASE_URL) {
    throw new Error('API_BASE_URL is not defined');
  }

  const fullURL = `${API_BASE_URL}${url}`;

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
