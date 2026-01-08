function normalizeDayUtc(dateStr: string) {
  return new Date(`${dateStr}T00:00:00.000Z`);
}

function clamp012(v: number): 0 | 1 | 2 {
  if (v <= 0) return 0;
  if (v === 1) return 1;
  return 2;
}

async function withSerializableRetry<T>(
  fn: () => Promise<T>,
  retries = 5,
): Promise<T> {
  let lastErr: any;
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (e: any) {
      lastErr = e;

      // Retry on serialization conflicts or transaction timeout errors
      const shouldRetry =
        e?.code === 'P2034' || // Serialization conflict
        e?.message?.includes('Unable to start a transaction') || // Transaction timeout
        e?.message?.includes('Transaction API error');

      if (shouldRetry && i < retries - 1) {
        // Exponential backoff: 10ms, 20ms, 40ms, 80ms
        const delay = Math.min(10 * Math.pow(2, i), 100);
        console.log(
          `[RETRY ${i + 1}/${retries}] Transaction conflict, retrying in ${delay}ms...`,
        );
        await new Promise((resolve) => setTimeout(resolve, delay));
        continue;
      }

      throw e;
    }
  }
  throw lastErr;
}

export { normalizeDayUtc, clamp012, withSerializableRetry };
