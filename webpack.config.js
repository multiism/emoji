module.exports = {
  entry: {
    app: "./src/app.js",
    slider: "./docs/add-slider.js"
  },
  output: {
    filename: "./build/[name]-bundle.js"
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['env']
        }
      }
    ]
  }
};