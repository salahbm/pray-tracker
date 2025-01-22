import AsyncStorage from '@react-native-async-storage/async-storage';

import { API_BASE_URL } from '@/constants/config';

export const agent = async (url: string, options?: RequestInit) => {
  try {
    const fullURL = `${API_BASE_URL}${url}`;

    const accessToken = await AsyncStorage.getItem('ACCESS_TOKEN');

    const headers: HeadersInit = {
      'Content-Type': 'application/json; charset=utf-8',
      ...(options?.headers || {}),
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    };

    const response = await fetch(fullURL, {
      ...options,
      credentials: 'omit', // 'include' is browser-specific; omit is safer for Expo.
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
  } catch (error) {
    console.log(error);
    throw error;
  }
};
