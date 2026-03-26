/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'yuno-all-hands-survey.vercel.app' }
    ]
  }
}
module.exports = nextConfig
