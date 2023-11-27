/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        openAiKey: process.env.OPENAI_API_KEY,
    },
}

module.exports = nextConfig
