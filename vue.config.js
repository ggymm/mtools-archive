const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const vueConfig = {
  devServer: {
    port: 2222
  },
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  productionSourceMap: false,
  configureWebpack: {
    optimization: {
      splitChunks: {
        chunks: 'all',
        maxInitialRequests: Infinity,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
              return `npm.${packageName.replace('@', '')}`
            }
          }
        }
      }
    },
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
  pluginOptions: {
    electronBuilder: {
      outputDir: 'build',
      mainProcessFile: 'src/main/main.js',
      rendererProcessFile: 'src/renderer/main.js'
    }
  }
}

module.exports = vueConfig
