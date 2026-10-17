/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: "/blog/walmart-marketplace", destination: "/blog/amazon-kanalstrategie-marken", permanent: true },
      { source: "/en/blog/walmart-marketplace", destination: "/en/blog/amazon-kanalstrategie-marken", permanent: true },
      { source: "/blog/amazon-awd-us-logistik", destination: "/blog/inventar-cashflow", permanent: true },
      { source: "/en/blog/amazon-awd-us-logistik", destination: "/en/blog/inventar-cashflow", permanent: true },
      { source: "/blog/alexa-for-shopping-ki-suche", destination: "/blog/amazon-ki-kaufagenten", permanent: true },
      { source: "/en/blog/alexa-for-shopping-ki-suche", destination: "/en/blog/amazon-ki-kaufagenten", permanent: true },
    ];
  },
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mdkzd29bnpshwsig.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;
