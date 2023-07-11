const path = require('path');
const webpack = require('webpack');
const express = require('express');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

const devtool = process.env.NODE_ENV !== 'production' ? 'source-map' : '';

module.exports = {
   entry: './index.js',
   output: {
      path: path.join(__dirname, '../dist'),
      publicPath: '/',
      filename: 'bundle.js',
   },
   devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 7000,
    historyApiFallback: true,
   },
   devtool,
   module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
         {
           loader: 'babel-loader',
           options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: {
                    browsers: ['defaults']
                  },
                  useBuiltIns: 'usage',
                  modules: false,
                  corejs: 3
                }
              ]
            ]
          }
         }
       ],
      },
      {
         test: /\.css$/i,
         use: ['style-loader', 'css-loader'],
      },
      {
      test: /\.(png|jpe?g|gif|svg)$/i,
      use: [
         {
            loader: 'file-loader',
         },
      ],
      }
    ]   
   },
   plugins:[
      new HtmlWebpackPlugin({
         template: 'index.html',
         meta: {viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'},
         hash: true,
         title: 'Fingerprint Authentication',
      }),
      new webpack.HotModuleReplacementPlugin()
    //   new webpack.DefinePlugin({
    //      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    //      'process.env.API_END_POINT': JSON.stringify(process.env.API_END_POINT)
    //   }),
   ]
}