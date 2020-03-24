const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require("path");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const common = require("./webpack.common");
const merge = require("webpack-merge");


module.exports =  merge(common, {
    mode: "production", 
    target: "electron-renderer",
    entry: {  //entry points of webpack 
        rendererProcess: "./src/rendererProcess.js",
    },   
    output: {
        filename: '[name].js', //output filenam
        path: path.resolve(__dirname, "dist") // path of the output file
    },
   
    plugins: [
        new HtmlWebpackPlugin({
            filename: "./index.html",
            template: "./src/app/template.html",
            chunks: ["rendererProcess"],   //Only include rendererProcess to the renderer.html
        }),
        new CleanWebpackPlugin()
    ],
});