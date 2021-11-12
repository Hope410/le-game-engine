import EslingPlugin from 'eslint-webpack-plugin';
import HtmlPlugin from 'html-webpack-plugin';
import path from 'path';
import * as webpack from 'webpack';

const config: webpack.Configuration = {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@': path.resolve(__dirname, 'src/'),
    },
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HtmlPlugin({
      template: './public/index.html',
    }),
    new EslingPlugin({
      extensions: ['js', 'ts', 'tsx'],
    }),
  ],
};

export default config;
