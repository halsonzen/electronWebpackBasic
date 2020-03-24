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
};