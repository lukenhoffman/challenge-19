const path = require('path');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
  entry: './client/src/index.js',
  output: {
    path: __dirname + '/client/dist',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'] // assuming React is being used
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './client/src/index.html'
    }),
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
    }),
    new WebpackPwaManifest({
      filename: 'manifest.json',
      inject: true,
      fingerprints: false,
      name: 'Text Editor PWA',
      short_name: 'Editor',
      description: 'A text editor that works offline.',
      background_color: '#ffffff',
      theme_color: '#000000',
      icons: [
        {
          src: path.resolve('client/src/assets/icon.png'),
          sizes: [192, 512],
          destination: path.join('assets', 'icons')
        }
      ]
    })
  ]
};
