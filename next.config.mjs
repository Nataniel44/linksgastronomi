const nextConfig = {
    reactStrictMode: false,
    compiler: {
        removeConsole: process.env.NODE_ENV === 'production',
        swcMinify: true,
        reactStrictMode: true,
    },

};

export default nextConfig;

