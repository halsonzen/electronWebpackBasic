const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require("path");
const common = require("./webpack.common");
const merge = require("webpack-merge");
const { spawn } = require('child_process');

module.exports = merge(common, {
    mode: "development", // no minify 
    devtool: "none",
    target: 'electron-renderer',
    entry: {  //entry points of webpack 
        rendererProcess: "./src/rendererProcess.js",
    },
    
    plugins: [
        new HtmlWebpackPlugin({
            filename: "./index.html",
            template: "./src/app/template.html",
            chunks: ["rendererProcess"],   //Only include rendererProcess to the renderer.html
        }),
    ],
    devServer: {
        contentBase: [
            path.resolve(__dirname, "app"),
        ],
        before: () => {            
            // console.log(process);  
            spawn(
                'electron',
                ['. --development'],
                { shell: true, env: process.env, stdio: 'inherit' }
            )
        }
    }
});