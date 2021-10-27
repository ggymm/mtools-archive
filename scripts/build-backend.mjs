#!/usr/bin/env zx

import { $, cd } from 'zx'
import { join } from 'path'
import { copyFileSync, constants } from 'fs'

const mtools = 'C:\\Product\\mtools'
const backend = 'C:\\Product\\mtools-backend'

// 打包
cd(backend)
await $`go build -ldflags "-s -w" -o _build\\release\\`

// 压缩
cd(join(backend, '_build'))
await $`upx -9 release\\mtools-backend.exe`

// 拷贝数据库
copyFileSync(
  join(backend, 'mtools-backend.db'),
  join(mtools, 'public', 'backend', 'mtools-backend.db'),
  constants.COPYFILE_FICLONE
)
// 拷贝服务端文件
copyFileSync(
  join(backend, '_build', 'release', 'mtools-backend.exe'),
  join(mtools, 'public', 'backend', 'mtools-backend.exe'),
  constants.COPYFILE_FICLONE
)
