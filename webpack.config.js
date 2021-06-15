"use strict"
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

function resolve (dir) {
      return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    app: "./src/main.js"
  },
  devServer: { hot: true },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
  ],
  resolve: {
      extensions: ['.js', '.vue'],
      alias: {
          "vue$": "vue/dist/vue.esm.js",
          "@": resolve('src'),
      } 
  }
}
