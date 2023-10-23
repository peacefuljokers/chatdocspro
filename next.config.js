/** @type {import('next').NextConfig} */
//zzz-added to solve aws-crt issue
const webpack = require("webpack");
const nextConfig = {

  async headers() {
    return [
        {
            // matching all API routes https://blog.logrocket.com/using-cors-next-js-handle-cross-origin-requests/
            source: "/api/:path*",
            headers: [
                { key: "Access-Control-Allow-Credentials", value: "true" },
                { key: "Access-Control-Allow-Origin", value: "*" }, // replace this your actual origin such as "http://localhost:3000"
                { key: "Access-Control-Allow-Methods", value: "PUT,POST,DELETE,GET" },
                { key: "Access-Control-Allow-Headers", value: "*" },
            ]
        }
    ]
},


    webpack: (config, options) => {
        config.module.rules.push({
        test: /\.node$/,
        loader: 'node-loader',
        })
    
        return config
    },

/*        webpack: (config, {buildId, dev, isServer, defaultLoaders, webpack}) => {
        config.externals.push({
            '@aws-sdk/signature-v4-multi-region': 'commonjs @aws-sdk/signature-v4-multi-region',
        })

        return config
    },  */ 
/*     webpack: (config) => {
        config.module.rules.push({
          type: 'javascript/auto',
          resolve: {
            fullySpecified: false,
          },
        });
        return config;
      }, */
/*       webpack: (config, { isServer, nextRuntime, webpack }) => {
        // Avoid AWS SDK Node.js require issue
        if (isServer && nextRuntime === 'nodejs')
            config.plugins.push(
                new webpack.IgnorePlugin({ resourceRegExp: /^aws-crt$/ })
            )
            return config; 
    }, */
    eslint: {
        ignoreDuringBuilds: true,
        },
    typescript: {
        ignoreBuildErrors: true,
        },  
        
}

module.exports = nextConfig
