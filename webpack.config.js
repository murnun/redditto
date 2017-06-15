// Imports
const path              = require('path');
const LiveReloadPlugin  = require('webpack-livereload-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack           = require('webpack');

/*
* Webpack config
*/
const config = {
  entry: path.resolve(__dirname, 'resources/js/app.js'),
  output: { path: path.resolve(__dirname, 'public/js/'), filename: 'app.js' },
  watch:true,
  resolve:{
    extensions: ['.js','.jsx']
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('css-loader!sass-loader')
      }
    ]
  },
  plugins: [
    new LiveReloadPlugin({appendScriptTag:true}),
    new ExtractTextPlugin({filename:'../css/main.css', allChunks: true})
  ]
};

module.exports = config;
