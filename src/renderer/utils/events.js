import { v4 as uuidv4 } from 'uuid'
import { requireFunc } from '@/utils/require'

const { ipcRenderer } = requireFunc('electron')

export function msgHandler(method, args) {
  return new Promise((resolve) => {
    const callbackId = uuidv4()
    const callback = (event, returnCallbackId, data) => {
      if (returnCallbackId === callbackId) {
        resolve(data)
        ipcRenderer.removeListener(method, callback)
      }
    }
    ipcRenderer.on(method, callback)
    ipcRenderer.send(method, callbackId, args)
  })
}

export function msgOn(method, callback) {
  ipcRenderer.on(method, callback)
}

export function msgOff(method, callback) {
  ipcRenderer.removeListener(method, callback)
}

export function msgSender(method, args) {
  ipcRenderer.send(method, args)
}
