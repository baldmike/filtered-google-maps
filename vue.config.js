module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
      ? '/filtered-google-maps/'
      : '/'
  }