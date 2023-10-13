const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const webpack = require('webpack');
require('dotenv').config({ path: './.env' }); 

module.exports = {
    entry : path.resolve(__dirname,"..","../src/client/index.tsx"),
    resolve : {
        extensions : ['.tsx','.ts','.js','.jsx']
    },
    module : {
        rules : [
            {
                test : /\.(ts|js)x?$/,
                exclude : /node_modules/,
                use : [
                    {
                        loader : 'babel-loader'
                    }
                ]
            },
            {
              test: /\.css$/,
              use: ['style-loader', 'css-loader'],
            },
            {
              test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
              type: 'asset/resource',
            },
            {
              test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
              type: 'asset/inline',
            },
        ]
    },
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    },
    output: {
        path: path.resolve(__dirname, '..', './build'),
        filename: 'bundle.js',
    },
    mode: 'production',
    plugins: [
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname, '..', '../src/client/index.html')
        }),
        new webpack.DefinePlugin({
            "process.env": JSON.stringify(process.env),
        }),
    ]
};