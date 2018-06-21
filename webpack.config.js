const dev = process.env.NODE_ENV !== 'production';
const path = require('path');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const plugins = [
    new FriendlyErrorsWebpackPlugin(),
    new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css'
    })
];

if (!dev) {
    plugins.push(new BundleAnalyzerPlugin( {
        analyzerMode: 'static',
        reportFilename: 'webpack-report.html',
        openAnalyzer: false,
    }));
}

module.exports = {
    mode: dev ? 'development' : 'production',
    context: path.join(__dirname, 'src'),
    devtool: dev ? 'none' : 'source-map',
    entry: {
        app: ['babel-polyfill', './client.js'],
    },
    resolve: {
        modules: [
            path.resolve('./src'),
            'node_modules',
        ],
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader'
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ],
                // test: /\.scss$/,
                // use: ExtractTextPlugin.extract({
                //     fallback: 'style-loader',
                //     use: [
                //         { loader: 'css-loader', 
                //             options: {
                //                 importLoaders: 1,
                //                 modules: true,
                //                 localIdentName: '[sha512:hash:base64:7]',
                //                 sourceMap: true
                //             }
                //         },
                //         { loader: 'sass-loader', options: {sourceMap: true} }
                //     ]
                // }),
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
    },
    plugins,
};