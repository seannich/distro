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
                }
            },
        ]
    },
    output: {
        path: __dirname + '/build/',
        publicPath: '/build/',
        filename: 'distro.min.js'
    },
};