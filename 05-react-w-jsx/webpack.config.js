const webpack = require('webpack');
const path = require('path');

module.exports = {
    mode: "production",
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "./dist/assets"),
        filename: "bundle.js",
        sourceMapFilename: "bundle.map"
    },
    devtool: "#source-map",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                    presets: ['env', 'stage-0', 'react']
                }
            }
        ]
    }
}