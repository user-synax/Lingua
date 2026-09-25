/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow LAN origin (phone + PC via IP) to use the dev server + HMR.
  // Update this if your PC's LAN IP changes (see `ipconfig`).
  allowedDevOrigins: ["10.184.38.12"],
};

export default nextConfig;
