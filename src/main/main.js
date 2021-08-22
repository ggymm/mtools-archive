'use strict'

import { app, protocol, dialog, ipcMain, BrowserWindow } from 'electron'
import { is } from 'electron-util'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import createTray from './tray'

let mainWindow

const isSingleInstance = app.requestSingleInstanceLock()
if (!isSingleInstance) {
  app.quit()
  process.exit(0)
  dialog.showErrorBox(
    '启动失败',
    '请检查是否已经打开了一个客户端！(code:020)'
  )
} else {
  app.disableHardwareAcceleration()
  app.allowRendererProcessReuse = false
  app.setPath('userData', `${app.getAppPath()}/userData`)
  protocol.registerSchemesAsPrivileged([
    { scheme: 'app', privileges: { secure: true, standard: true }}
  ])
}

const readyFunction = async() => {
  await createWindow()
  await registerListener()
  createTray(mainWindow)
}

async function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 480,
    show: false,
    frame: false,
    maximizable: false,
    fullscreenable: false,
    webPreferences: {
      devTools: true,
      webSecurity: false,
      nodeIntegration: true,
      contextIsolation: true,
      enableRemoteModule: true,
      backgroundThrottling: false
    }
  })

  if (is.development) {
    await mainWindow.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    mainWindow.webContents.openDevTools({ mode: 'undocked' })
  } else {
    createProtocol('app')
    await mainWindow.loadURL('app://./index.html')
  }

  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
    mainWindow.focus()
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
}

function registerListener() {
  // 创建窗口
  ipcMain.on('mtools:open-app', async(e, args) => {
    console.log(args)
  })
  // 打开关闭开发者工具
  ipcMain.on('mtools:toggle-devtools', () => {
    mainWindow.webContents.toggleDevTools()
  })
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
