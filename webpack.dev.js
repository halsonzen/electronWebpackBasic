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
    module: {
        rules: [
            {
                test: /\.html$/,
                use: ["html-loader"]
            },
            {
                test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                use: {
                    loader: "file-loader",
                    options: {
                        name: "[name].[ext]",
                        outputPath: "./assets",
                        esModule: false
                    }
                }
            },
            {
                test: /\.(scss|sass)$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ]
            },
        ]
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