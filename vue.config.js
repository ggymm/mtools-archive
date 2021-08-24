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
      rendererProcessFile: 'src/renderer/main.js',
      builderOptions: {
        appId: 'com.ggymm.mtools',
        productName: 'mtools',
        copyright: 'Copyright © 2021',
        directories: {
          output: './build'
        },
        win: {
          target: [
            {
              target: 'nsis',
              arch: [
                'x64'
              ]
            }
          ]
        },
        nsis: {
          oneClick: false,
          allowElevation: true,
          allowToChangeInstallationDirectory: true,
          createDesktopShortcut: true,
          createStartMenuShortcut: true
        }
      }
    }
  }
}

module.exports = vueConfig
