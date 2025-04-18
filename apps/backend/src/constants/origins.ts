const ALLOWED_ORIGINS =
  process.env.NODE_ENV === 'production'
    ? 'https://pray-tracker.onrender.com'
    : '*';

export default ALLOWED_ORIGINS;
