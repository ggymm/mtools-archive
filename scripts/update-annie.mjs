#!/usr/bin/env zx

import axios from 'axios'
import fs from 'fs'

import ProgressBar from 'progress'
import StreamZip from 'node-stream-zip'
import tunnel from 'tunnel'

console.log('更新视频下载工具annie, Github: https://github.com/iawia002/annie')

const apiLatestRelease = 'https://api.github.com/repos/iawia002/annie/releases/latest'
const { data } = await axios.get(apiLatestRelease)

console.log('判断本地的annie版本是否为最新')
const version = 'public/annie/version'
if (!fs.existsSync(version)) {
  fs.writeFileSync(version, '0')
}
const currentVersion = fs.readFileSync(version, 'utf-8')
const latestVersion = data['tag_name']
if (currentVersion === latestVersion) {
  console.log('无新版本')
  process.exit(0)
}
console.log(`存在最新版本: ${latestVersion}`)

console.log('获取版本信息')
let asset = ''
for (let i = 0; i < data.assets.length; i++) {
  const { name } = data.assets[i]
  if (name.endsWith('Windows_64-bit.zip')) {
    asset = data.assets[i]
  }
}
console.log(JSON.stringify(asset, {}, 2))

console.log('下载最新文件(使用代理下载)')
const response = await axios.get(asset['browser_download_url'], {
  method: 'GET',
  responseType: 'stream',
  httpsAgent: tunnel.httpsOverHttp({
    proxy: {
      host: '127.0.0.1',
      port: '9910'
    }
  })
})

const zipName = `public/annie/${asset['name']}`
const writer = fs.createWriteStream(zipName)
const totalLength = response.headers['content-length']
const progressBar = new ProgressBar(`${asset['name']} :bar :percent :etas`, {
  width: 48,
  complete: '█',
  incomplete: '░',
  renderThrottle: 1,
  total: parseInt(totalLength)
})
response.data.pipe(writer)
await response.data.on('data', (chunk) => {
  progressBar.tick(chunk.length)
})

writer.on('finish', () => {
  console.log('写入最新版本信息')
  fs.writeFileSync(version, latestVersion)
  console.log('解压下载文件')
  const zip = new StreamZip({
    file: zipName,
    storeEntries: true
  })
  zip.on('ready', () => {
    zip.extract(null, 'public/annie/', err => {
      console.log(err ? '文件解压失败' : '文件解压成功')
      zip.close()
    })
  })
  fs.rmSync(zipName)
})
