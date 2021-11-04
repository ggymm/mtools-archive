import fs from 'fs'
import path from 'path'
import { shell } from 'electron'

// [同步] 检查文件/目录是否存在
export const isExist = filePath => {
  return fs.existsSync(path.resolve(filePath))
}

export const openFolder = async folder => {
  await shell.openPath(folder)
}

export const downloadFile = (args) => {
  const { url, targetDir } = args
  console.log(url)
  console.log(targetDir)
}
