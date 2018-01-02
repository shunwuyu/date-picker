const path = require('path');
module.exports = {
  entry: {
    'tqb-date-picker': './app/main.js'
  },
  output: {
    // 通配符
    filename: '[name].bundle.js',
    // window  Linux 路径不同
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  devtool: 'source-map',
  watch: true,
  watchOptions: {
    ignored: /node_modules|dist|build|docs|css/,
    poll: 1000
  }
};