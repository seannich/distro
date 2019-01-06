const path = require('path');

module.exports = {
    context: __dirname,
    entry: './src/index.js',
    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env'],
                    plugins: [
                        '@babel/plugin-syntax-dynamic-import',
                    ],
                },
            },
        ],
    },
    output: {
        path: path.join(__dirname, 'build'),
        publicPath: '/build/',
        filename: 'distro.min.js',
    },
};
