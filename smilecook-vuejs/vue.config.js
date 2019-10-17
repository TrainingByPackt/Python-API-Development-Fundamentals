module.exports = {
  devServer: {
    proxy: {
      '/api/': {
        target: 'https://smilecook.herokuapp.com/',
        pathRewrite: { '^/api/': '' }
      }
    }
  }
};
