import { dialog, ipcMain } from 'electron'

import { CHOOSE_FILE, CHOOSE_FOLDER } from '#/constant'

export default function registerApis() {
  // 选择文件
  ipcMain.on(CHOOSE_FILE, (event, callbackId) => {
    dialog.showOpenDialog({
      properties: ['openFile']
    }).then(result => {
      if (result.filePaths.length > 0) {
        event.sender.send(CHOOSE_FILE, callbackId, result.filePaths[0])
      }
    })
  })
  // 选择文件夹
  ipcMain.on(CHOOSE_FOLDER, (event, callbackId) => {
    dialog.showOpenDialog({
      properties: ['openDirectory']
    }).then(result => {
      event.sender.send(CHOOSE_FOLDER, callbackId, result.filePaths[0])
    })
  })
}
