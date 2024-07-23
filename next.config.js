/** @type {import('next').NextConfig} */

// export default nextConfig;
module.exports = {
  // async rewrites() {
  //   return [
  //     {
  //       source: "/external-api/:path*", // represents the pattern in next.js for all requests
  //       destination: `${process.env.NEXT_PUBLIC_API_URL}/api/:path*`, //represents server source
  //     },
  //   ];
  // },
  env: {
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  output: "standalone", //This will create a folder at .next/standalone which can then be deployed on its own without installing node_modules
};
