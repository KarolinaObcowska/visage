/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXTAUTH_SECRET: 'zleEcVCZWLLMMUXXBS2GiY5oxXjEDAhAaqWZLqzkS3M=',
    NEXTAUTH_URL: 'http://localhost:3000',
  },
  headers: [
    { key: 'Access-Control-Allow-Credentials', value: 'true' },
    { key: 'Access-Control-Allow-Origin', value: 'http://localhost:3000' },
    {
      key: 'Access-Control-Allow-Methods',
      value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
    },
    {
      key: 'Access-Control-Allow-Headers',
      value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
    },
  ],
}

module.exports = nextConfig
