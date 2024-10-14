/** @type {import('next').NextConfig} */

// export default nextConfig;
module.exports = {
  // use for production
  // async rewrites() {
  //   return [
  //     {
  //       source: "/external-api/:path*", // represents the pattern in next.js for all requests
  //       destination: `${process.env.NEXT_PUBLIC_API_URL}/api/:path*`, //represents server source
  //     },
  //   ];
  // },

  // async rewrites() {
  //   return [
  //     {
  //       source: "/api/:path*",
  //       destination: "http://localhost:8000/:path*", // Proxy to Django backend
  //     },
  //   ];
  // },
  output: "standalone", //This will create a folder at .next/standalone which can then be deployed on its own without installing node_modules
};
