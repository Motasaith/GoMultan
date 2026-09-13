import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Placeholder photos. Remove these once you use your own images from /public.
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "fastly.picsum.photos" },
    ],
  },
};

export default nextConfig;

// Lets `next dev` use Cloudflare bindings (R2, images, env vars) locally.
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
