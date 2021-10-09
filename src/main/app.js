import { BrowserWindow, Menu } from 'electron'
import { is } from 'electron-util'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'

import { backendStart, backendStatus, backendStop } from './events/backend'

const appWindows = new Set()
const appWindowTitles = new Set()

export default async function createAppWindow(args) {
  if (appWindowTitles.has(args.title)) {
    appWindows.forEach((window) => {
      if (window.webContents.getTitle() === args.title) {
        if (window.isMinimized()) {
          window.restore()
        }
        window.focus()
      }
    })
  } else {
    let appWindow = new BrowserWindow({
      show: true,
      width: args.width,
      height: args.height,
      minWidth: args.minWidth || args.width,
      minHeight: args.minHeight || args.height,
      title: args.title,
      frame: args.frame,
      webPreferences: {
        webviewTag: true,
        webSecurity: false,
        nodeIntegration: true,
        contextIsolation: false
      }
    })

    if (args.maximize) {
      appWindow.maximize()
    }

    if (args.path === 'coder') {
      const coderMenu = [
        {
          label: '启动后台服务',
          click: function() {
            backendStart()
          }
        },
        {
          label: '停止后台服务',
          click: function() {
            backendStop()
          }
        },
        {
          label: '检查后台服务',
          click: function() {
            backendStatus()
          }
        }
      ]

      appWindow.setMenu(Menu.buildFromTemplate(coderMenu))
    } else {
      if (args.frame) {
        appWindow.setMenu(null)
      }
    }

    if (is.development) {
      await appWindow.loadURL(`${process.env.WEBPACK_DEV_SERVER_URL}#/${args.path}`)
      // appWindow.webContents.openDevTools({ mode: 'undocked' })
    } else {
      createProtocol('app')
      await appWindow.loadURL(`app://./index.html#/${args.path}`)
    }

    appWindow.on('closed', () => {
      appWindow = null
      appWindows.delete(appWindows)
      appWindowTitles.delete(args.title)
    })

    appWindows.add(appWindow)
    appWindowTitles.add(args.title)
  }
}
