const path = require('path');
const fs = require('fs');

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
                    ...JSON.parse(fs.readFileSync('.babelrc')),
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
