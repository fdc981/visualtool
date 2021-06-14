const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
  entry: {
    app: "./src/main.js"
  },
  module: {
    rules: [
      // ... other rules
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  plugins: [
    // make sure to include the plugin!
    new VueLoaderPlugin()
  ]
}
