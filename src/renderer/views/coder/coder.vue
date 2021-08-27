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
            <span class="content-wrapper" @click="toggleShowTables(db)" @dblclick="toggleShowTables(db)">
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
      <div @click="testConnect">测试数据库连接</div>
    </div>
  </div>
</template>

<script>
import VueScroll from 'vuescroll'
import IconSvg from '@/components/IconSvg/index'

import { getTableList } from '@/api/database'

export default {
  name: 'Index',
  components: {
    VueScroll,
    IconSvg
  },
  data() {
    return {
      databases: []
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
    getConfig() {

    },
    testConnect() {
    }
  }
}
</script>
<style lang="less">
.coder-app {
  width: 100%;
  height: 100%;
  display: flex;

  .database-container {
    width: 25%;
    display: flex;
    flex-direction: column;
    border-right: 1px solid #e8e8e8;

    .header {
      height: 50px;
      line-height: 50px;
    }

    .database-list {
      margin: 0;
      padding: 0 5px;

      li {
        margin: 0;
        padding: 5px 0;

        .switcher {
          width: 24px;
          height: 24px;
          font-size: 12px;
          color: #000000;
          vertical-align: top;
        }

        .content-wrapper {
          height: 24px;
          display: inline-flex;
          align-items: center;
          justify-content: center;

          .db-icon, .table-icon {
            width: 24px;
            height: 24px;
          }

          .content-title {

          }
        }

        .table-list {
          & > li:first-child {
            padding-top: 10px;
          }
        }
      }
    }
  }

  .coder-config-container {
    width: 75%;
  }
}
</style>
