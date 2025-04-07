// next.config.js
const withTM = require('next-transpile-modules')(['antd', '@ant-design/icons']);

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    webpack: (config) => {
        config.resolve.alias = {
            ...config.resolve.alias,
            'rc-util/es': 'rc-util/lib',  // Fix Ant Design SSR issues
            'rc-pagination/es': 'rc-pagination/lib',  // Fix pagination issues
        };
        return config;
    },
};

module.exports = withTM(nextConfig);
