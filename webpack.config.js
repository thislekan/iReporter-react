const webpack = require('webpack');
const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const MomentLocalePlugin = require('moment-locales-webpack-plugin');

const htmlPlugin = new HtmlWebPackPlugin({
  template: './src/index.html',
  filename: './index.html',
  title: 'iReporter-v1',
});

const dotenvPlugin = new Dotenv();
const envLoaderPlugin = new webpack.DefinePlugin({
  'process.env.API_URL': JSON.stringify(process.env.API_URL),
  'process.env.GOOGLE_API_KEY': JSON.stringify(process.env.GOOGLE_API_KEY),
});
const usedMomemntPlugin = new MomentLocalePlugin();

module.exports = {
  entry: './src/index.jsx',
  plugins: [htmlPlugin, dotenvPlugin, envLoaderPlugin, usedMomemntPlugin],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.jsx', '.js', '.json', '.css'],
  },
  module: {
    rules: [
      {
        loader: ['babel-loader', 'eslint-loader'],
        test: /\.js$/,
        exclude: /node_modules/,
      },
      {
        loader: ['babel-loader', 'eslint-loader'],
        test: /\.jsx$/,
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader'],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader'],
      },
    ],
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, './dist'),
    historyApiFallback: true,
  },
};
