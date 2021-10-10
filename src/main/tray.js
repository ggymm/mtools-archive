import { Menu, Tray } from 'electron'
import { is } from 'electron-util'

import createAppWindow from './app'
import { apps } from '#/constant'

const { join } = require('path')

async function openApp(key) {
  const { title, window } = apps[key]
  await createAppWindow({
    title: title,
    path: key, frame: window.frame,
    width: window.width, height: window.height
  })
}

let tray

export default function createTray(window) {
  let iconPath
  if (is.development) {
    iconPath = join(__dirname, '../public/icons/')
  } else {
    iconPath = join(__dirname, '../icons/')
  }

  if (is.windows) {
    iconPath += 'tray.ico'
  } else if (is.macos) {
    iconPath += ''
  }

  tray = new Tray(iconPath)
  const contextMenu = Menu.buildFromTemplate([
    {
      label: '显示窗口',
      click() {
        window.show()
      }
    },
    {
      label: '代码生成器',
      async click() {
        await openApp('coder')
      }
    },
    {
      label: 'JSON工具集',
      async click() {
        await openApp('json')
      }
    },
    {
      label: '开发工具集',
      async click() {
        await openApp('develop')
      }
    },
    {
      label: '斗图表情包',
      async click() {
        await openApp('emoji')
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
