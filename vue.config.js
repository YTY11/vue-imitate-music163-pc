module.exports = {
  devServer: {
    // 配置代理解决跨域问题
    proxy: {
      '/headline': { // 匹配所有以 '/headline'开头的请求路径
        target: 'http://is.snssdk.com/', // 代理目标的基础路径
        changeOrigin: true,
        pathRewrite: { '^/headline': '' } // 替换规则 /headline 替换成 http://is.snssdk.com/
      },
      '/music': { // 匹配所有以 '/headline'开头的请求路径
        target: 'http://music.api.yty1999.top:9996/', // 代理目标的基础路径
        changeOrigin: true,
        pathRewrite: { '^/music': '' } // 替换规则 /headline 替换成 http://is.snssdk.com/
      }
    }
  },
  configureWebpack: config => {
    // 生产环境取消 console.log
    if (process.env.NODE_ENV === 'production') {
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
    }
  }
}
