const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.ejs$/i,
        use: ['html-loader', 'template-ejs-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.ejs',
    }),
  ]
}