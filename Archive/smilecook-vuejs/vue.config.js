module.exports = {
  lintOnSave: false,
  devServer: {
    proxy: {
      '/api/': {
        target: 'http://127.0.0.1:5000/',
        // target: 'https://smile-cook-api.herokuapp.com/',
        pathRewrite: { '^/api/': '' }
      }
    }
  }
}
