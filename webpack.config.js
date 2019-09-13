const path = require('path');

const config = {
  entry: {
    demo: './demo/demo.js',
  },
  output: {
    path: path.resolve(__dirname, 'demo'),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js', 'jsx'],
  },
  performance: {
    hints: false
  },
  mode: 'production'
};

module.exports = config;
