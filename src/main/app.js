import { BrowserWindow } from 'electron'
import { is } from 'electron-util'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'

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
      minWidth: args.width,
      minHeight: args.height,
      title: args.title,
      frame: args.frame,
      webPreferences: {
        webSecurity: false,
        nodeIntegration: true,
        contextIsolation: false
      }
    })

    if (args.frame) {
      appWindow.setMenu(null)
    }

    if (is.development) {
      await appWindow.loadURL(`${process.env.WEBPACK_DEV_SERVER_URL}#/${args.path}`)
      appWindow.webContents.openDevTools({ mode: 'bottom' })
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
