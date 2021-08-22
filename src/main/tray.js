import { Menu, Tray } from 'electron'
import { is } from 'electron-util'

const { join } = require('path')

export default function createTray(window) {
  let iconPath
  if (is.development) {
    iconPath = join(__dirname, '../public/icons/')
  } else {
    iconPath = ''
  }

  if (is.windows) {
    iconPath += 'tray.ico'
  } else if (is.macos) {
    iconPath += ''
  }

  const tray = new Tray(iconPath)
  const contextMenu = Menu.buildFromTemplate([
    {
      label: '显示窗口',
      click() {
        window.show()
      }
    },
    {
      label: '帮助文档',
      click: () => {
        process.nextTick(() => {
        })
      }
    }
  ])

  tray.on('click', () => {
    tray.popUpContextMenu(contextMenu)
  })
  tray.setContextMenu(contextMenu)
}
