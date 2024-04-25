/** @type {import('next').NextConfig} */

module.exports = {
    reactStrictMode: true,
    env: {
      OPENAI_API_KEY: process.env.OPENAI_API_KEY,
      AI_API_KEY: process.env.AI_API_KEY,
    }
  }