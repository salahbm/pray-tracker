// This file is the entry point for Vercel serverless functions
// It imports the compiled serverless handler from the dist directory
module.exports = require('../dist/serverless').default;
