#!/usr/bin/env zx

import { $, cd } from 'zx'
import { join } from 'path'
import { copyFileSync, constants } from 'fs'

const project_path = 'C:/Product/mtools'
const bqb_path = 'D:/Code/github/ChineseBQB'

// 首先更新表情包
cd(bqb_path)
await $`git pull`

// 拷贝索引文件到固定位置
await copyFileSync(
  join(bqb_path, 'chinesebqb_v2fy.json'),
  join(project_path, 'src/renderer/assets/chinesebqb_v2fy.json'),
  constants.COPYFILE_FICLONE
)

