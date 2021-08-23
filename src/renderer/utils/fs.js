import { requireFunc } from '../utils/require'
const fs = requireFunc('fs')
const path = requireFunc('path')

// [同步] 检查文件/目录是否存在
export const isExist = filePath => {
  return fs.existsSync(path.resolve(filePath))
}
