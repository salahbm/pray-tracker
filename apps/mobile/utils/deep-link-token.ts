import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_PREFIX = 'reset_token_visited_';
const TOKEN_EXPIRY_HOURS = 24;

interface TokenData {
  visited: boolean;
  timestamp: number;
}

/**
 * Check if a reset password token has been visited
 * @param token - The reset password token
 * @returns true if token was visited within the expiry period
 */
export async function isTokenVisited(token: string): Promise<boolean> {
  try {
    const storageKey = `${TOKEN_PREFIX}${token}`;
    const data = await AsyncStorage.getItem(storageKey);

    if (!data) {
      return false;
    }

    const parsed: TokenData = JSON.parse(data);
    const hoursSinceVisited = (Date.now() - parsed.timestamp) / (1000 * 60 * 60);

    // If token expired, clean it up
    if (hoursSinceVisited >= TOKEN_EXPIRY_HOURS) {
      await AsyncStorage.removeItem(storageKey);
      return false;
    }

    return parsed.visited;
  } catch {
    return false;
  }
}

/**
 * Mark a reset password token as visited
 * @param token - The reset password token
 */
export async function markTokenAsVisited(token: string): Promise<void> {
  try {
    const storageKey = `${TOKEN_PREFIX}${token}`;
    const data: TokenData = {
      visited: true,
      timestamp: Date.now(),
    };
    await AsyncStorage.setItem(storageKey, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to mark token as visited:', error);
  }
}

/**
 * Clear a specific token from storage
 * @param token - The reset password token
 */
export async function clearToken(token: string): Promise<void> {
  try {
    const storageKey = `${TOKEN_PREFIX}${token}`;
    await AsyncStorage.removeItem(storageKey);
  } catch (error) {
    console.error('Failed to clear token:', error);
  }
}

/**
 * Clean up all expired tokens
 */
export async function cleanupExpiredTokens(): Promise<void> {
  try {
    const allKeys = await AsyncStorage.getAllKeys();
    const tokenKeys = allKeys.filter(key => key.startsWith(TOKEN_PREFIX));

    for (const key of tokenKeys) {
      const data = await AsyncStorage.getItem(key);
      if (data) {
        try {
          const parsed: TokenData = JSON.parse(data);
          const hoursSinceVisited = (Date.now() - parsed.timestamp) / (1000 * 60 * 60);

          if (hoursSinceVisited >= TOKEN_EXPIRY_HOURS) {
            await AsyncStorage.removeItem(key);
          }
        } catch {
          // If parsing fails, remove the corrupted data
          await AsyncStorage.removeItem(key);
        }
      }
    }
  } catch (error) {
    console.error('Failed to cleanup expired tokens:', error);
  }
}
