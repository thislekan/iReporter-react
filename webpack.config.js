const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

const htmlPlugin = new HtmlWebPackPlugin({
  template: './src/index.html',
  filename: './index.html',
  title: 'iReporter-v1',
});

module.exports = {
  entry: './src/index.jsx',
  plugins: [htmlPlugin],
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
      // {
      //   test: /\.s?css$/,
      //   use: ['style-loader', 'css-loader', 'sass-loader'],
      // },
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
