<template>
  <div class="coder-app">
    <el-form ref="config" :model="config" size="medium" label-width="200px">
      <el-form-item label="数据库">
        <el-select v-model="config.databaseId" @change="handleDBChange">
          <el-option
            v-for="item in databases"
            :key="item['id']"
            :label="item['showName']"
            :value="item['id']"
          />
        </el-select>
        <el-button type="primary" @click="getDBList()">刷新</el-button>
      </el-form-item>
      <el-form-item label="数据表">
        <el-select v-model="config.tables" filterable multiple>
          <el-option
            v-for="table in tables"
            :key="table['tableName']"
            :label="table['tableName']"
            :value="table['tableName']"
          />
        </el-select>
        <el-button type="primary" @click="handleSelectAllTable(config.tables.length === 0)">{{ config.tables.length === 0 ? '全选' : '清空' }}</el-button>
      </el-form-item>
      <el-form-item label="生成配置">
        <div class="options">
          <div>
            <el-checkbox v-model="config.outputCover">覆盖存在文件</el-checkbox>
          </div>
          <div>
            <el-checkbox v-model="config.useLombok" disabled>使用Lombok</el-checkbox>
            <el-tooltip placement="top">
              <div slot="content">实体类继承父类，则自动插入填充功能应该写在父类中，所以禁用自动填充配置</div>
              <el-checkbox v-model="config.useParent">实体类继承父类</el-checkbox>
            </el-tooltip>
            <el-checkbox v-model="config.autoFill" :disabled="config.useParent">添加插入/更新自动填充注解</el-checkbox>
          </div>
          <div>
            <el-tooltip placement="top">
              <div slot="content">包含用户名称和生成时间</div>
              <el-checkbox v-model="config.autoClassComment" disabled>自动生成类注释</el-checkbox>
            </el-tooltip>
            <el-checkbox v-model="config.formatDateColumn">格式化时间格式字段</el-checkbox>
          </div>
          <div>
            <el-tooltip placement="top">
              <div slot="content">如果不使用，则包名使用小驼峰，文件名使用大驼峰</div>
              <el-checkbox v-model="config.useOriginTable" @change="handleCheckedAlert($event,'useOriginTable')">使用原始表名做包名和文件名</el-checkbox>
            </el-tooltip>
            <el-tooltip placement="top">
              <div slot="content">如果不使用，则使用小驼峰做字段名称</div>
              <el-checkbox v-model="config.useOriginColumn" @change="handleCheckedAlert($event,'useOriginColumn')">使用原始表列名做字段名称</el-checkbox>
            </el-tooltip>
          </div>
          <div>
            <el-checkbox v-model="config.genFrontEnd">生成前端代码</el-checkbox>
            <el-checkbox v-model="config.useCommentAsLabel">使用字段注释做前端标签值</el-checkbox>
          </div>
        </div>
      </el-form-item>
      <el-form-item>
        <div slot="label">
          <label>包名</label>
          <el-tooltip placement="top">
            <div slot="content">不需要保留结尾的点(.)</div>
            <i class="el-icon-question" />
          </el-tooltip>
        </div>
        <el-input v-model="config.package" spellcheck="false" />
      </el-form-item>
      <el-form-item v-if="config.useParent" label="父类完整包名">
        <el-input v-model="config.parentPackage" spellcheck="false" />
      </el-form-item>
      <el-form-item v-if="config.useParent" label="实体类排除字段">
        <el-input v-model="config.excludeColumn" spellcheck="false" />
      </el-form-item>
      <el-form-item v-if="config.autoFill" label="自动填充字段">
        <el-input v-model="config.autoFillColumn" spellcheck="false" />
      </el-form-item>
      <el-form-item label="生成位置">
        <el-input v-model="config.output" spellcheck="false" />
        <el-button type="primary" @click="handleChoosePath()">选择文件夹</el-button>
      </el-form-item>
      <el-form-item class="handler">
        <el-button type="primary" @click="handleGenCode">生成代码</el-button>
        <el-button type="primary">保存设置</el-button>
        <el-button type="success">打开生成文件夹</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { CHOOSE_FOLDER } from '#/constant'
import { msgHandler } from '@/utils/events'
import { getDBList, getTableList } from '@/api/database'
import { genCode } from '@/api/coder'

export default {
  name: 'Index',
  data() {
    return {
      databases: [],
      tables: [],
      query: {
        name: null
      },
      config: {
        databaseId: null,
        tables: [],
        package: 'com.ninelock.api',
        parentPackage: 'com.ninelock.core.base.BaseEntity',
        output: 'D:/Temp/mtools/',
        outputCover: true,
        useLombok: true,
        useParent: false,
        excludeColumn: 'create_time,create_id,creator,update_time,update_id,del_flag',
        autoFill: true,
        autoFillColumn: 'create_time,create_id,creator,update_time,update_id,del_flag',
        useOriginTable: false,
        useOriginColumn: false,
        formatDateColumn: true,
        autoClassComment: true,
        genFrontEnd: false,
        useCommentAsLabel: false
      }
    }
  },
  computed: {
    useParent: {
      get() {
        return this.config.useParent
      }
    }
  },
  watch: {
    useParent: function(val) {
      if (val) {
        this.config.autoFill = false
      }
    }
  },
  created() {
    this.getDBList()
  },
  methods: {
    async getDBList() {
      const { success, data } = await getDBList()
      if (success) {
        this.databases = data
      }
    },
    async handleDBChange(val) {
      const params = {
        databaseId: val
      }
      const { success, data } = await getTableList(params)
      if (success) {
        this.tables = data
      }
    },
    handleSelectAllTable(flag) {
      if (flag) {
        this.config.tables = []
        for (let i = 0, len = this.tables.length; i < len; i++) {
          this.config.tables.push(this.tables[i]['tableName'])
        }
      } else {
        this.config.tables = []
      }
    },
    handleCheckedAlert(value, type) {
      if (value) {
        switch (type) {
          case 'useOriginTable':
            this.$confirm('不建议使用原始表名，一般不符合Java规范', '提示', {
              confirmButtonText: '仍然选中',
              cancelButtonText: '取消选中',
              type: 'warning'
            }).then(() => {
            }).catch(() => {
              this.config['useOriginTable'] = false
            })
            break
          case 'useOriginColumn':
            this.$confirm('不建议使用原始字段名，一般不符合Java规范', '提示', {
              confirmButtonText: '仍然选中',
              cancelButtonText: '取消选中',
              type: 'warning'
            }).then(() => {
            }).catch(() => {
              this.config['useOriginColumn'] = false
            })
            break
        }
      }
      console.log(value, type)
    },
    async handleChoosePath() {
      this.config.output = await msgHandler(CHOOSE_FOLDER)
    },
    async handleGenCode() {
      const resp = await genCode(this.config)
      console.log(resp)
    }
  }
}
</script>
