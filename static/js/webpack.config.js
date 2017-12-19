/**
 * create by lingqiang  2017.7.7
 */
'use strict';

var fs = require('fs');
var path = require('path');
var assetsViews = require('./assets-views');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");  //css单独打包


module.exports = {
  entry: {
    'app': ['babel-polyfill', './app.js']
  },                 //打包的js
  devServer: {
    contentBase: "../../",  //以public为根目录提供文件
    historyApiFallback: true,
    inline: true,
    port: 8888
  },
  resolve: {
    modules: [
      path.resolve(__dirname, 'common'),
      path.resolve(__dirname, 'util'),
      'node_modules'
    ],
    extensions: ['.js', '.json', '.jsx'],
    mainFiles: ["index"]
  },
  output: {                                            //输出信息
    path: path.resolve(__dirname, './build'), //线上路径'./build/'
    filename: 'lingqiang-[name]-[chunkhash].js',
    chunkFilename:'lingqiang-[name]-[id].[chunkhash:8].bundle.js',
    publicPath: '/static/js/build/'
  },

  module: {                                         //处理jsx的编译
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: [
          path.resolve(__dirname, 'node_modules')
        ],
        enforce: "pre",
        use: {
            loader:"babel-loader",
            options:{
                cacheDirectory:true
            }
        }
      },
        {
            test: /\.(jpg|png|gif|eot|woff|ttf|svg)$/,
            use: {
                loader: "file-loader",
                options:{
                    name:"[path][hash].[ext]",
                    publicPath:'/static/js/build/'
                }
            }
        },
      {
        test: /\.(css|scss)$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: "css-loader",
            },
            {
              loader: "sass-loader"
            }],
          fallback: "style-loader",
          publicPath: "/build"
        })
      }
    ]
  },
  //此处定义全局变量。
  plugins: [
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('./build/vendor-manifest.json')
    }),
    assetsViews({
      from: './views/',
      to: '../../'
    }),
    new ExtractTextPlugin({
      filename: "style.css",
      disable: false,
      allChunks: true
    })
  ]
};