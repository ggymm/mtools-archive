<template>
  <div class="postman-app">
    <div class="pane-group vertical">
      <div class="pane-container">
        <div ref="main" class="pane">
          <div class="pane-content">
            <div class="pane-group horizontal">
              <div class="pane-container">
                <div ref="aside" class="pane">
                  <div class="pane-content">
                    <div class="requester-left-sidebar-wrapper">
                      <div class="requester-sidebar-horizontal-header">
                        <div class="requester-sidebar-horizontal-header__left-container">
                          <iconpark-icon name="workspace" />
                          <span style="font-size: 14px; margin-left: 8px">我的工作空间</span>
                        </div>
                        <div class="requester-sidebar-horizontal-header__right-container">
                          <el-button size="mini">新建</el-button>
                          <el-button size="mini">导入</el-button>
                        </div>
                      </div>
                      <div class="requester-left-sidebar-container">
                        <div class="requester-left-sidebar-tabs">
                          <div class="list-container">
                            <div
                              v-for="tab in tabs"
                              :key="tab.key"
                              :class="{'active': tab.key === currentTab}"
                              class="requester-left-sidebar-tab"
                              @click="chooseTab(tab)"
                            >
                              <iconpark-icon :name="tab.icon" />
                              <span class="requester-left-sidebar-tab-title" :title="tab.title">{{ tab.title }}</span>
                            </div>
                          </div>
                        </div>
                        <div class="requester-left-sidebar">
                          <div class="collection-sidebar">
                            <div class="collection-sidebar-menu">
                              <i class="el-icon-plus" @click="showEditCollection(-1)" />
                              <el-input v-model="searchCollection" size="mini" style="margin: 0 4px" />
                              <el-dropdown trigger="click" size="small">
                                <span class="el-dropdown-link">
                                  <i class="el-icon-more-outline" />
                                </span>
                                <el-dropdown-menu slot="dropdown">
                                  <el-dropdown-item>打开回收站</el-dropdown-item>
                                </el-dropdown-menu>
                              </el-dropdown>
                            </div>
                            <vue-scroll :ops="{ bar: { background: '#c1c1c1', size: '4px' } }">
                              <el-tree
                                :data="collectionTree"
                                :props="defaultProps"
                                :highlight-current="true"
                                :expand-on-click-node="false"
                                @node-click="handleCollectionClick"
                              >
                                <span slot-scope="{ node, data }" class="collection-list-item">
                                  <span class="collection-sidebar-list-item-icon-wrapper">
                                    <iconpark-icon v-if="data['type'] === 'collection'" name="folder" />
                                  </span>
                                  <span class="collection-sidebar-list-item-label">{{ node['label'] }}</span>
                                  <span class="collection-sidebar-list-item-actions">
                                    <el-dropdown trigger="click" size="small" @command="handleCollectionNodeCommand">
                                      <span class="el-dropdown-link">
                                        <i class="el-icon-more-outline" />
                                      </span>
                                      <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item :command="{method: 'showEditCollection', params: data['id']}">添加文件夹</el-dropdown-item>
                                        <el-dropdown-item>添加测试接口</el-dropdown-item>
                                        <el-dropdown-item divided>重命名</el-dropdown-item>
                                        <el-dropdown-item>复制</el-dropdown-item>
                                        <el-dropdown-item>导出</el-dropdown-item>
                                        <el-dropdown-item>删除</el-dropdown-item>
                                      </el-dropdown-menu>
                                    </el-dropdown>
                                  </span>
                                </span>
                              </el-tree>
                            </vue-scroll>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="pane-resize-handle ns" style="touch-action: none;">
                  <div class="pane-resize-handle__body" />
                </div>
              </div>
              <div class="pane-container">
                主面板
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="pane-container">
        底部控制台
      </div>
    </div>
    <el-dialog title="文件夹" :visible.sync="collectionFormVisible">
      <el-form :model="collection" size="small" label-width="80px">
        <el-form-item label="名称">
          <el-input v-model="collection.label" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="collectionFormVisible = false">取 消</el-button>
        <el-button size="small" type="primary" :loading="collectionLoading" @click="editCollection">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import VueScroll from 'vuescroll'

import { getCollectionTree, createCollection } from '@/api/postman'

export default {
  name: 'Index',
  components: {
    VueScroll
  },
  data() {
    return {
      tabs: [
        {
          'key': 'collections',
          'icon': 'collections',
          'title': '接口测试'
        },
        {
          'key': 'environments',
          'icon': 'environments',
          'title': '环境'
        },
        {
          'key': 'mock-servers',
          'icon': 'mock-servers',
          'title': '模拟服务'
        },
        {
          'key': 'history',
          'icon': 'history',
          'title': '历史'
        }
      ],
      currentTab: '',
      searchCollection: '',
      defaultProps: {
        label: 'label',
        children: 'children'
      },
      collectionTree: [],
      collectionFormVisible: false,
      collection: {
        id: null,
        parentId: null,
        label: null
      },
      collectionLoading: false
    }
  },
  async mounted() {
    this.autoStyle()
    window.onresize = () => {
      return (() => {
        this.autoStyle()
      })()
    }
    // 默认选中
    this.chooseTab(this.tabs[0])
    await this.getCollectionTree()
  },
  methods: {
    /* 初始化*/
    autoStyle() {
      this.$refs.main.style.width = `${window.innerWidth}px`
      this.$refs.main.style.height = `${window.innerHeight - 30}px`

      this.$refs.aside.style.width = '380px'
      this.$refs.aside.style.height = `${window.innerHeight - 30}px`
    },
    /* 请求接口*/
    async getCollectionTree() {
      const { success, data } = await getCollectionTree()
      if (success) {
        this.collectionTree = data
      }
    },
    async editCollection() {
      // 保存或者更新
      this.collectionLoading = true
      const { success, data } = await createCollection(this.collection)
      this.collectionLoading = false
      if (success) {
        this.collectionFormVisible = false
      } else {
        // 需要提示
        console.log(data)
      }
    },
    /* 响应界面事件*/
    chooseTab(tab) {
      this.currentTab = tab.key
    },
    showEditCollection(parentId) {
      this.collection.parentId = parentId
      this.collectionFormVisible = true
    },
    handleCollectionClick() {
    },
    handleCollectionNodeCommand(command) {
      if (command) {
        const { method, params } = command
        const methods = this.$options.methods
        methods[method].call(this, params)
      }
    }
  }
}
</script>
