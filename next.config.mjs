/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['www.apple.com'],
    },
};

module.exports = {
    env: {
        NEXTAUTH_URL: process.env.VERCEL_URL
            ? `https://${process.env.VERCEL_URL}`
            : 'http://localhost:3000',
    },
};

export default nextConfig;
