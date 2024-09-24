module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/Hunter/' : '/',
  outputDir: 'dist',
  assetsDir: 'static',
  productionSourceMap: false,
  devServer: {
    port: 8080,
    open: true,
  },
};