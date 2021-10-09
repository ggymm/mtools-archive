'use strict'
import { app, protocol, dialog, ipcMain, BrowserWindow } from 'electron'
import { is } from 'electron-util'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'

import log from 'electron-log'

import registerApis from './events'
import createAppWindow from './app'
import createTray from './tray'

let mainWindow

log.transports.file.resolvePath = function() {
  return 'log/mtools.log'
}

const isSingleInstance = app.requestSingleInstanceLock()
if (!isSingleInstance) {
  app.quit()
  process.exit(0)
  dialog.showErrorBox(
    '启动失败',
    '请检查是否已经打开了一个客户端！(code:020)'
  )
} else {
  app.setAppUserModelId('mtools工具箱')
  app.disableHardwareAcceleration()
  app.allowRendererProcessReuse = false
  app.setPath('userData', `${app.getAppPath()}/userData`)
  protocol.registerSchemesAsPrivileged([
    { scheme: 'app', privileges: { secure: true, standard: true }}
  ])
}

async function createWindow() {
  mainWindow = new BrowserWindow({
    show: true,
    width: 800,
    height: 480,
    frame: false,
    maximizable: false,
    fullscreenable: false,
    webPreferences: {
      devTools: true,
      webviewTag: true,
      webSecurity: false,
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      backgroundThrottling: false
    }
  })

  if (is.development) {
    await mainWindow.loadURL(`${process.env.WEBPACK_DEV_SERVER_URL}#/index`)
    // mainWindow.webContents.openDevTools({ mode: 'bottom' })
  } else {
    createProtocol('app')
    await mainWindow.loadURL('app://./index.html#/index')
    // mainWindow.webContents.openDevTools({ mode: 'bottom' })
  }

  mainWindow.once('ready-to-show', () => {
    // mainWindow.show()
    // mainWindow.focus()
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  mainWindow.webContents.on('devtools-opened', () => {
    mainWindow.focus()
    setImmediate(() => {
      mainWindow.focus()
    })
  })

  // 打开关闭开发者工具
  ipcMain.on('mtools:toggle-devtools', () => {
    mainWindow.webContents.toggleDevTools()
  })
  // 打开关闭开发者工具
  ipcMain.on('mtools:toggle-devtools-app', (event) => {
    BrowserWindow.fromWebContents(event.sender).webContents.toggleDevTools()
  })
  // 最小化
  ipcMain.on('mtools:minimize', (event) => {
    BrowserWindow.fromWebContents(event.sender).minimize()
  })
  // 隐藏
  ipcMain.on('mtools:hide', (event) => {
    BrowserWindow.fromWebContents(event.sender).hide()
  })
  // 退出
  ipcMain.on('mtools:exit', () => {
    app.exit()
  })
  // 创建窗口
  ipcMain.on('mtools:open-app', async(event, args) => {
    await createAppWindow(args)
  })
  // 关闭窗口
  ipcMain.on('mtools:close', (event) => {
    BrowserWindow.fromWebContents(event.sender).destroy()
  })
}

const readyFunction = async() => {
  await createWindow()
  registerApis()
  createTray(mainWindow)
}

app.on('ready', readyFunction)

app.on('activate', async() => {
  if (mainWindow === null && app.isReady()) {
    await createWindow()
  }
})

app.on('second-instance', () => {
  if (mainWindow) {
    if (mainWindow.isMinimized()) {
      mainWindow.restore()
    }
    mainWindow.focus()
  }
})

app.on('window-all-closed', () => {
  if (!is.macos) {
    app.quit()
  }
})
app.on('will-quit', () => {
  // 取消注册快捷键
})

if (is.development) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
