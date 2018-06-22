const dev = process.env.NODE_ENV !== "production";
const path = require( "path" );
const { BundleAnalyzerPlugin } = require( "webpack-bundle-analyzer" );
const FriendlyErrorsWebpackPlugin = require( "friendly-errors-webpack-plugin" );
const MiniCssExtractPlugin = require( "mini-css-extract-plugin" );

const plugins = [
    new FriendlyErrorsWebpackPlugin(),
    new MiniCssExtractPlugin( {
        filename: "styles.css",
        chunkFilename: "[id].css",
    } ),
];

if ( !dev ) {
    plugins.push( new BundleAnalyzerPlugin( {
        analyzerMode: "static",
        reportFilename: "webpack-report.html",
        openAnalyzer: false,
    } ) );
}

module.exports = {
    mode: dev ? "development" : "production",
    context: path.join( __dirname, "" ),
    devtool: dev ? "none" : "source-map",
    entry: {
        app: [ "babel-polyfill", "./src/client.js" ],
    },
    resolve: {
        modules: [
            path.resolve( "./src" ),
            "node_modules",
        ],
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: "babel-loader",
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            camelCase: true,
                            importLoader: true,
                            localIdentName: "[sha512:hash:base64:7]",
                            modules: true,
                        },
                    },
                    "sass-loader",
                ],
            },
            {
                test: /\.css$/,
                use: [ "style-loader", "css-loader" ],
            },
        ],
    },
    output: {
        path: path.resolve( __dirname, "dist" ),
        filename: "[name].bundle.js",
    },
    plugins,
};
