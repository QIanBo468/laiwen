module.exports = {
  // rules: [
  //   {
  //     test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
  //     loader: 'url-loader',
  //     options: {
  //       limit: 10000,
  //       name: utils.assetsPath('font/[name].[hash:7].[ext]')
  //     }
  //   }
  // ],
  // ...
  publicPath:"./",
  css: {
    loaderOptions: {
      sass: {
        data: '@import "@/assets/css/global.scss";'
      }
    }
  }
  // ...
}