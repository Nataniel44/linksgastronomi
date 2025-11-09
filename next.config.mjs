const nextConfig = {
    reactStrictMode: false,
    compiler: {
        removeConsole: process.env.NODE_ENV === 'production',
    },

};

export default nextConfig;

