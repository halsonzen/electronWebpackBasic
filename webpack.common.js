const path = require("path");

module.exports = {
    target: 'electron-renderer',
    entry: {  //entry points of webpack 
        mainProcess: "./src/mainProcess.js"
    },   
    output: {
        filename: '[name].js', //output filenam
        path: path.resolve(__dirname, "dist") // path of the output file
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
   
};