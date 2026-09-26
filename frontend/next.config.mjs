/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow LAN origin (phone + PC via IP) to use the dev server + HMR.
  // Update this if your PC's LAN IP changes (see `ipconfig`).
  allowedDevOrigins: ["10.184.38.12"],
  // Same-origin API proxy: the browser only ever talks to this host, so
  // auth cookies stay first-party and stick on any domain (localhost,
  // LAN IP, or the production deployment). The real API base is a
  // server-side env var, never baked into client JS.
  // Local dev default: http://localhost:5000. Production: set BACKEND_URL
  // on the host (e.g. Vercel project env).
  async rewrites() {
    const backend = process.env.BACKEND_URL || "http://localhost:5000";
    return [{ source: "/api/:path*", destination: `${backend}/api/:path*` }];
  },
};

export default nextConfig;
