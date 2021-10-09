import { is } from 'electron-util'
import { Notification } from 'electron'

const { spawn } = require('child_process')
const { join } = require('path')
const net = require('net')

let check, interval
const checkStatus = () => {
  new Promise((resolve, reject) => {
    const server = net.createServer().listen(44966)
    server.on('listening', function() {
      server.close()
      reject()
    })
    server.on('error', function(err) {
      if (err.code === 'EADDRINUSE') {
        resolve()
      }
    })
  }).then(() => {
    showNotification('后台服务已启动')
    clearInterval(interval)
  }).catch(() => {
    if (check > 3) {
      clearInterval(interval)
    }
    check += 1
  })
}

let notification
const showNotification = (body) => {
  if (notification) {
    notification.close()
  } else {
    notification = new Notification()
  }
  notification.body = body
  notification.silent = true
  notification.show()
}

let subprocess
export function backendStart() {
  showNotification('后台服务正在启动')
  let appExec, appPath
  if (is.development) {
    appPath = join(__dirname, '../public/backend/')
    appExec = join(__dirname, '../public/backend/mtools-backend.exe')
  } else {
    appPath = join(__dirname, '../backend/')
    appExec = join(__dirname, '../backend/mtools-backend.exe')
  }

  if (subprocess) {
    subprocess.kill()
  }
  subprocess = spawn(appExec, ['--app-path', appPath])

  interval = setInterval(checkStatus, 2000)
}

export function backendStop() {
  if (interval) {
    clearInterval(interval)
  }
  if (subprocess) {
    subprocess.kill()
  }
}

export function backendStatus() {
  new Promise((resolve) => {
    const server = net.createServer().listen(44966)
    server.on('listening', function() {
      server.close()
      resolve('后台服务已停止')
    })
    server.on('error', function(err) {
      if (err.code === 'EADDRINUSE') {
        resolve('后台服务已启动')
      }
    })
  }).then((status) => {
    showNotification(status)
  })
}

