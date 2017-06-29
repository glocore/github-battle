let webpack = require('webpack');
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');

let config = {
  entry: './app/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index_bundle.js',
    publicPath: '/'
  },

  module: {
    rules: [
      {test: /\.css$/, use: ['style-loader', 'css-loader']},
      {test: /\.(js)$/, use: 'babel-loader'}
    ]
  },

  devServer: {
    historyApiFallback: true
  },

  plugins: [new HtmlWebpackPlugin({
    template: 'app/index.html'
  })]
};

if(process.env.NODE_ENV === 'production') {
  config.plugins.push(
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }
      }),
      
      new webpack.optimize.UglifyJsPlugin
  )
}

module.exports = config;