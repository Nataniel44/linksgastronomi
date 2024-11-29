// next.config.js
module.exports = {
    webpack(config) {
        config.resolve.alias = {
            ...config.resolve.alias,
            '@': path.resolve(__dirname),  // Asumiendo que '@' se refiere al directorio raíz del proyecto
        };
        return config;
    },
};
