<template>
  <div class="emoji-app">
    <div class="search-key">
      <el-input v-model="search" />
    </div>
    <div class="emoji-list">
      <el-col v-for="(emoji, index) in emojiList" :key="index" :span="4" class="emoji">
        <el-card :body-style="{ padding: '0px' }">
          <el-image :id="`image-${index}`" :src="emoji['url']" fit="contain">
            <div slot="placeholder" class="image-slot">
              加载中<span class="dot">...</span>
            </div>
          </el-image>
          <div class="handle">
            <el-button type="primary" size="mini" @click="download(index)">下载</el-button>
            <el-button type="primary" size="mini" @click="copyToClipboard(index)">复制</el-button>
          </div>
          <div class="title">
            <span>{{ emoji["name"] }}</span>
          </div>
        </el-card>
      </el-col>
    </div>
  </div>
</template>

<script>
import debounce from '@/utils/debounce'
import { $ } from '@/utils/dom'
import { requireFunc } from '@/utils/require'
import { data } from '@/assets/chinesebqb_v2fy.json'

const { clipboard, nativeImage } = requireFunc('electron')

export default {
  name: 'Index',
  data() {
    return {
      search: null,
      emojiList: []
    }
  },
  watch: {
    search: function(val) {
      console.log(val)
      const runSearch = debounce((curr) => {
        this.emojiList = []
        for (let i = 0, len = data.length; i < len; i++) {
          const { name } = data[i]
          if (name.toLowerCase().indexOf(curr) > 0) {
            this.emojiList.push(data[i])
          }
        }
      }, 200)

      runSearch(val)
    }
  },
  methods: {
    copyToClipboard(index) {
      const image = $(`#image-${index}`)

      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')

      const img = new Image(image.naturalWidth, image.naturalHeight)
      img.crossOrigin = 'Anonymous'
      img.src = image.src

      img.onload = () => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        canvas.width = img.width
        canvas.height = img.height
        ctx.drawImage(img, 0, 0)
        const dataURL = canvas.toDataURL('image/png')

        clipboard.writeImage(nativeImage.createFromDataURL(dataURL))

        this.$message({ message: '复制成功', type: 'success' })
      }
    },
    download(index) {
      console.log(index)
    }
  }
}
</script>
<style lang="less">
.emoji-app {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;

  .search-key {
    padding: 20px;
  }

  .emoji-list {
    height: 100%;
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    overflow: auto;

    .emoji {
      margin: 10px;
      width: 200px;

      .el-card {
        height: 100%;

        .el-image {
          width: 100%;
          height: 100%;
        }

        .handle {
          display: flex;
          justify-content: center;
          padding: 12px;
        }

        .title {
          display: flex;
          padding: 12px;
          font-size: 14px;

          span {
            word-break: break-all;
          }
        }
      }
    }
  }
}
</style>

