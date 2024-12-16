/** @type {import('next').NextConfig} */

// export default nextConfig;
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: `${process.env.IMAGE_HOST_NAME}`,
        port: "",
        // pathname: "/account123/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        // pathname: "/account123/**",
      },
      {
        // this is needed only for dummy/ placeholder images, can be removed once no longer needed
        protocol: "https",
        hostname: "images.pexels.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
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
