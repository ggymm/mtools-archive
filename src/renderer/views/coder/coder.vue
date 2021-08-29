<template>
  <div class="coder-app no-drag">
    <div class="database-container">
      <div class="header">
        头部
      </div>
      <vue-scroll :ops="{ bar: { background: '#c1c1c1', size: '8px' } }">
        <ul class="database-list">
          <li v-for="(db, i) in databases" :key="i">
            <span class="switcher inline-center" @click="toggleShowTables(db)">
              <icon-svg :type="db.open ? 'caret-down' : 'caret-right'" />
            </span>
            <span class="content-wrapper" @dblclick="toggleShowTables(db)">
              <span class="db-icon inline-center"><icon-svg type="database" /></span>
              <span class="content-title" :title="db['database_name']" v-html="db['database_name']" />
            </span>
            <ul v-if="db.open" class="table-list">
              <li v-for="(table, j) in db['tables']" :key="j">
                <span class="content-wrapper">
                  <span class="table-icon"><icon-svg type="table" /></span>
                  <span class="title" :title="table['table_name']" v-html="table['table_name']" />
                </span>
              </li>
            </ul>
          </li>
        </ul>
      </vue-scroll>
    </div>
    <div class="coder-config-container">
      <form class="form w-720">
        <div class="form-item row">
          <div class="form-item-label col-4"><label>表名</label></div>
          <div class="form-item-control-wrapper col-14">
            <input v-model="config.table" type="text" class="form-item-control input" readonly>
          </div>
        </div>
        <div class="form-item row">
          <div class="form-item-label col-4"><label>包名</label></div>
          <div class="form-item-control-wrapper col-14">
            <input v-model="config.package" type="text" class="form-item-control input">
          </div>
        </div>
        <div class="form-item row">
          <div class="form-item-label col-4"><label>生成位置</label></div>
          <div class="form-item-control-wrapper col-14">
            <input v-model="config.output" type="text" class="form-item-control input">
          </div>
          <button class="btn btn-primary" type="button" @click="handleChoosePath()">选择位置</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import VueScroll from 'vuescroll'
import IconSvg from '@/components/IconSvg/index'

import { CHOOSE_FOLDER } from '#/constant'
import { msgHandler } from '@/utils/events'
import { getTableList } from '@/api/database'

export default {
  name: 'Index',
  components: {
    VueScroll,
    IconSvg
  },
  data() {
    return {
      databases: [],
      config: {
        table: '',
        package: '',
        output: ''
      }
    }
  },
  created() {
    this.getTableList()
  },
  methods: {
    getTableList() {
      getTableList().then(response => {
        const { success, data } = response
        if (success) {
          this.databases = data
        }
      })
    },
    toggleShowTables(db) {
      db['open'] = !db['open']
    },
    handleChoosePath() {
      msgHandler(CHOOSE_FOLDER).then(response => {
        console.log(response)
      })
    }
  }
}
</script>
