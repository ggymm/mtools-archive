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
    entry: {
      app: resolve('src/renderer/app.js')
    },
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
        '@': resolve('src/renderer'),
        '#': resolve('src/common')
      }
    }
  },
  pluginOptions: {
    electronBuilder: {
      chainWebpackMainProcess: config => {
        config.resolve.alias
          .set('@', resolve('src/renderer'))
          .set('#', resolve('src/common'))
      },
      outputDir: 'build',
      mainProcessFile: 'src/main/main.js',
      mainProcessWatch: [
        'src/main/**/*'
      ],
      rendererProcessFile: 'src/renderer/app.js',
      builderOptions: {
        appId: 'com.ggymm.mtools',
        productName: 'mtools',
        copyright: 'Copyright © 2021',
        asar: true,
        directories: {
          output: 'build'
        },
        extraResources: [
          {
            from: 'public/icons/',
            to: './icons/'
          },
          {
            from: 'public/backend/',
            to: './backend/'
          }
        ],
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
