module.exports = {
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/
        }
      ]
    }
  }
}
