const BETTER_AUTH_URL = process.env.BETTER_AUTH_URL;
const BETTER_AUTH_SECRET = process.env.BETTER_AUTH_SECRET;
const PUBLIC_API_PORT = process.env.PUBLIC_API_PORT;

if (!BETTER_AUTH_URL) {
  throw new Error('BETTER_AUTH_URL is not defined');
}
if (!BETTER_AUTH_SECRET) {
  throw new Error('BETTER_AUTH_SECRET is not defined');
}
if (!PUBLIC_API_PORT) {
  throw new Error('PUBLIC_API_PORT is not defined');
}

export const env = {
  BETTER_AUTH_URL,
  BETTER_AUTH_SECRET,
  PUBLIC_API_PORT,
};
