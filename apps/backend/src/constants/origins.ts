const ALLOWED_ORIGINS =
  process.env.NODE_ENV === 'production'
    ? ['https://pray-tracker.onrender.com', 'https://pray-tracker.vercel.app']
    : ['*'];

export default ALLOWED_ORIGINS;
