export const CHOOSE_FILE = 'mtools:choose-file-dialog'
export const CHOOSE_FOLDER = 'mtools:choose-folder-dialog'

export const apps = {
  coder: {
    icon: 'coder',
    title: '代码生成器',
    window: { width: 1000, height: 800, frame: true }
  },
  json: {
    icon: 'json',
    title: 'JSON工具集',
    window: { width: 1200, height: 900, frame: true }
  },
  develop: {
    icon: 'develop',
    title: '开发工具集',
    window: { width: 800, height: 600, frame: true }
  },
  postman: {
    icon: 'postman',
    title: '接口调试工具',
    window: { width: 1200, height: 900, minWidth: 1200, minHeight: 600, frame: true }
  },
  redis: {
    icon: 'redis-cli',
    title: 'Redis连接工具',
    window: { width: 1200, height: 900, minWidth: 1200, minHeight: 600, frame: true }
  },
  video: {
    icon: 'video',
    title: '音视频工具箱',
    window: { width: 800, height: 600, frame: true }
  },
  magnet: {
    icon: 'magnet',
    title: '磁力链接搜索',
    window: { width: 1200, height: 600, frame: true }
  }
}
