export function mergeAuthTokenCookies(
  cookies: { name: string; value: string }[],
) {
  const prefix = 'sb-';
  const merged: Record<string, string[]> = {};

  cookies.forEach(({ name, value }) => {
    if (name.startsWith(prefix) && name.includes('auth-token')) {
      const base = name.split('.')[0];
      if (!merged[base]) merged[base] = [];
      merged[base].push(value);
    }
  });

  return Object.entries(merged).map(([base, parts]) => ({
    name: base,
    value: parts.join(''),
  }));
}

export function safeParseBase64Cookie(base64: string) {
  try {
    const raw = base64.replace(/^base64-/, '');
    const decoded = Buffer.from(raw, 'base64').toString('utf-8');
    return JSON.parse(decoded);
  } catch (err) {
    console.error('Invalid base64 cookie:', err);
    return null;
  }
}
