module.exports = {
  entry: {
    app: "./src/app.js",
    slider: "./docs/add-slider.js"
  },
  output: {
    filename: "./build/[name]-bundle.js"
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
