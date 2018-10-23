module.exports = {
  entry: {
    app: "./src/app.js",
    slider: "./docs/add-slider.js"
  },
  output: {
    filename: "[name]-bundle.js",
    path: require("path").resolve(__dirname, "build"),
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: ["env"]
        }
      }
    ]
  }
};
