const path = require("path");

module.exports = {
    output: {
        path: path.resolve(__dirname, "../static/client/js/"),
        filename: "main.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                // exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.css$/,
                // exclude: /node_modules/,
                use: ["style-loader", "css-loader"]
            }
        ]
    },
    optimization: { minimize: true }
}
