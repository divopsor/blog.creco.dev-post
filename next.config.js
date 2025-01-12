/** @type {import('next').NextConfig} */
module.exports = (phase, { defaultConfig }) => {
  const nextConfig = {
    trailingSlash: true,
    ...(process.env.LOCAL === 'true' ? {} : { output: 'export' }),
    // ...defaultConfig,
    reactStrictMode: true,
    swcMinify: true,
    basePath: "/post",
    typescript: {
      // !! WARN !!
      // Dangerously allow production builds to successfully complete even if
      // your project has type errors.
      // !! WARN !!
      ignoreBuildErrors: true,
    },
    eslint: {
      // Warning: This allows production builds to successfully complete even if
      // your project has ESLint errors.
      ignoreDuringBuilds: true,
    },
    redirects: process.env.LOCAL === 'true' ? async () => {
      return [
        {
          source: '/',
          destination: '/post',
          permanent: false,
          basePath: false,
        },
        {
          source: '/favicon.ico',
          destination: 'https://blog.creco.dev/favicon.ico',
          permanent: false,
          basePath: false,
        },
      ]
    }: null,
    rewrites: process.env.LOCAL === 'true' ? async () => {
      return [
        {
          source: '/github-api/api/:slug*',
          destination: 'https://app.divops.kr/github-api/api/:slug*', // Matched parameters can be used in the destination
          basePath: false,
        },
        {
          source: '/api/:slug*',
          destination: 'https://app.divops.kr/api/:slug*', // Matched parameters can be used in the destination
          basePath: false,
        },
      ];
    }: null,
  };

  return nextConfig;
};
