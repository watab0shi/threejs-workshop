const path = require('path');

const srcPath = path.resolve(__dirname, '../src');
const pubPath = path.resolve(__dirname, '../public');

module.exports = {
  mode: 'development',
  entry: {
    common: srcPath + '/index.js',
  },
  output: {
    path: pubPath + '/resource/js',
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env']
            ]
          }
        }
      },
      {
        test: /\.vert|\.frag|\.glsl/,
        use: {
          loader: 'webpack-glsl-loader'
        }
      }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          name: 'vendor',
          chunks: 'initial',
          enforce: true
        }
      }
    }
  }
};