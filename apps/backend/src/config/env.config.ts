const BETTER_AUTH_URL = process.env.BETTER_AUTH_URL;
const BETTER_AUTH_SECRET = process.env.BETTER_AUTH_SECRET;
const PUBLIC_API_PORT = process.env.PUBLIC_API_PORT;

const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID;
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY;
const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID;
const R2_BUCKET = process.env.R2_BUCKET;

const EMAIL_HOST = process.env.EMAIL_HOST;
const EMAIL_PORT = process.env.EMAIL_PORT;
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;

if (!BETTER_AUTH_URL) {
  throw new Error('BETTER_AUTH_URL is not defined');
}
if (!BETTER_AUTH_SECRET) {
  throw new Error('BETTER_AUTH_SECRET is not defined');
}
if (!PUBLIC_API_PORT) {
  throw new Error('PUBLIC_API_PORT is not defined');
}
if (!R2_ACCESS_KEY_ID) {
  throw new Error('R2_ACCESS_KEY_ID is not defined');
}
if (!R2_SECRET_ACCESS_KEY) {
  throw new Error('R2_SECRET_ACCESS_KEY is not defined');
}
if (!R2_ACCOUNT_ID) {
  throw new Error('R2_ACCOUNT_ID is not defined');
}
if (!R2_BUCKET) {
  throw new Error('R2_BUCKET is not defined');
}
if (!EMAIL_HOST) {
  throw new Error('EMAIL_HOST is not defined');
}
if (!EMAIL_PORT) {
  throw new Error('EMAIL_PORT is not defined');
}
if (!EMAIL_USER) {
  throw new Error('EMAIL_USER is not defined');
}
if (!EMAIL_PASS) {
  throw new Error('EMAIL_PASS is not defined');
}

export const env = {
  BETTER_AUTH_URL,
  BETTER_AUTH_SECRET,
  PUBLIC_API_PORT,
  R2_ACCESS_KEY_ID,
  R2_SECRET_ACCESS_KEY,
  R2_ACCOUNT_ID,
  R2_BUCKET,
  EMAIL_HOST,
  EMAIL_PORT,
  EMAIL_USER,
  EMAIL_PASS,
};
