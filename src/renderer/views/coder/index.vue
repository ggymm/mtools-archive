<template>
  <div class="coder-app">
    <el-tabs>
      <el-tab-pane label="Java代码生成">
        <el-form ref="javaConfig" :model="javaConfig" size="small" label-width="160px">
          <el-form-item label="数据库">
            <el-select v-model="javaConfig.databaseId" @change="handleDBChange($event, 'java')">
              <el-option
                v-for="item in databases"
                :key="item['id']"
                :label="item['showName']"
                :value="item['id']"
              />
            </el-select>
            <el-button type="primary" @click="getDBList()">刷新数据库</el-button>
          </el-form-item>
          <el-form-item label="数据表">
            <el-select v-model="javaConfig.tables" filterable multiple>
              <el-option
                v-for="table in javaTables"
                :key="table['tableName']"
                :label="table['tableName']"
                :value="table['tableName']"
              />
            </el-select>
            <el-button type="primary" @click="handleSelectAllTable('java',javaConfig, javaConfig.tables.length === 0)">
              {{ javaConfig.tables.length === 0 ? '选择全部表' : '清空所选表' }}
            </el-button>
          </el-form-item>
          <el-form-item label="生成位置">
            <el-input v-model="javaConfig.output" spellcheck="false" />
            <el-button type="primary" @click="handleChoosePath(javaConfig)">选择文件夹</el-button>
          </el-form-item>
          <el-form-item label="生成配置">
            <div class="options">
              <div>
                <el-checkbox v-model="javaConfig.outputCover">覆盖存在文件</el-checkbox>
                <el-checkbox v-model="javaConfig.onlyEntity">只生成实体类和Mapper</el-checkbox>
              </div>
              <div>
                <el-checkbox v-model="javaConfig.useLombok" disabled>使用Lombok</el-checkbox>
                <el-tooltip placement="top">
                  <div slot="content">实体类继承父类，则自动插入填充功能应该写在父类中，所以禁用自动填充配置</div>
                  <el-checkbox v-model="javaConfig.useParent">实体类继承父类</el-checkbox>
                </el-tooltip>
                <el-checkbox v-model="javaConfig.autoFill" :disabled="javaConfig.useParent">添加插入/更新自动填充注解</el-checkbox>
              </div>
              <div>
                <el-tooltip placement="top">
                  <div slot="content">包含用户名称和生成时间</div>
                  <el-checkbox v-model="javaConfig.autoClassComment" disabled>自动生成类注释</el-checkbox>
                </el-tooltip>
                <el-checkbox v-model="javaConfig.formatDateColumn">格式化时间格式字段</el-checkbox>
              </div>
              <div>
                <el-tooltip placement="top">
                  <div slot="content">如果不使用，则包名使用小驼峰，文件名使用大驼峰</div>
                  <el-checkbox v-model="javaConfig.useOriginTable" @change="handleCheckedAlert($event,'useOriginTable')">使用原始表名做包名和文件名</el-checkbox>
                </el-tooltip>
                <el-tooltip placement="top">
                  <div slot="content">如果不使用，则使用小驼峰做字段名称</div>
                  <el-checkbox v-model="javaConfig.useOriginColumn" @change="handleCheckedAlert($event,'useOriginColumn')">使用原始表列名做字段名称</el-checkbox>
                </el-tooltip>
              </div>
              <div>
                <el-checkbox v-model="javaConfig.genFrontEnd">生成前端代码</el-checkbox>
                <el-checkbox v-model="javaConfig.useCommentAsLabel">使用字段注释做前端标签值</el-checkbox>
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
            <el-input v-model="javaConfig.package" spellcheck="false" />
          </el-form-item>
          <el-form-item label="父类完整包名">
            <el-input v-model="javaConfig.parentPackage" :disabled="!javaConfig.useParent" spellcheck="false" />
          </el-form-item>
          <el-form-item label="实体类排除字段">
            <el-input v-model="javaConfig.excludeColumn" :disabled="!javaConfig.useParent" spellcheck="false" />
          </el-form-item>
          <el-form-item label="自动填充字段">
            <el-input v-model="javaConfig.autoFillColumn" :disabled="!javaConfig.autoFill" spellcheck="false" />
          </el-form-item>
          <el-form-item class="handler">
            <el-button type="primary" :loading="generateJavaLoading" @click="handleGenJavaCode">生成代码</el-button>
            <el-button type="primary">保存设置</el-button>
            <el-button type="success">打开生成文件夹</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="Go代码生成">
        <el-form ref="goConfig" :model="goConfig" size="small" label-width="160px">
          <el-form-item label="数据库">
            <el-select v-model="goConfig.databaseId" @change="handleDBChange($event, 'go')">
              <el-option
                v-for="item in databases"
                :key="item['id']"
                :label="item['showName']"
                :value="item['id']"
              />
            </el-select>
            <el-button type="primary" @click="getDBList()">刷新数据库</el-button>
          </el-form-item>
          <el-form-item label="数据表">
            <el-select v-model="goConfig.tables" filterable multiple>
              <el-option
                v-for="table in goTables"
                :key="table['tableName']"
                :label="table['tableName']"
                :value="table['tableName']"
              />
            </el-select>
            <el-button type="primary" @click="handleSelectAllTable('go',goConfig,goConfig.tables.length === 0)">
              {{ goConfig.tables.length === 0 ? '选择全部表' : '清空所选表' }}
            </el-button>
          </el-form-item>
          <el-form-item label="生成位置">
            <el-input v-model="goConfig.output" spellcheck="false" />
            <el-button type="primary" @click="handleChoosePath(goConfig)">选择文件夹</el-button>
          </el-form-item>
          <el-form-item class="handler">
            <el-button type="primary" :loading="generateGoLoading" @click="handleGenGoCode">生成代码</el-button>
            <el-button type="primary">保存设置</el-button>
            <el-button type="success">打开生成文件夹</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { CHOOSE_FOLDER } from '#/constant'
import { msgHandler } from '@/utils/events'
import { getDBList, getTableList } from '@/api/database'
import { generateJavaCode, generateGoCode } from '@/api/coder'

export default {
  name: 'Index',
  data() {
    return {
      databases: [],
      javaTables: [],
      goTables: [],
      javaConfig: {
        databaseId: null,
        tables: [],
        package: 'com.ninelock.api',
        parentPackage: 'com.ninelock.core.base.BaseEntity',
        output: 'D:/Temp/mtools/',
        outputCover: true,
        onlyEntity: false,
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
      },
      generateJavaLoading: false,
      goConfig: {
        databaseId: null,
        tables: [],
        output: 'D:/Temp/mtools/',
        outputCover: true
      },
      generateGoLoading: false
    }
  },
  computed: {
    useParent: {
      get() {
        return this.javaConfig.useParent
      }
    }
  },
  watch: {
    useParent: function(val) {
      if (val) {
        this.javaConfig.autoFill = false
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
    async handleDBChange(val, type) {
      switch (type) {
        case 'java':
          if (this.javaConfig.tables.length > 0) {
            this.javaConfig.tables = []
          }
          break
        case 'go':
          if (this.goConfig.tables.length > 0) {
            this.goConfig.tables = []
          }
          break
      }
      const params = {
        databaseId: val
      }
      const { success, data } = await getTableList(params)
      if (success) {
        switch (type) {
          case 'java':
            this.javaTables = data
            break
          case 'go':
            this.goTables = data
            break
        }
      }
    },
    handleSelectAllTable(type, config, flag) {
      if (flag) {
        const tables = type === 'java' ? this.javaTables : this.goTables
        config.tables = []
        for (let i = 0, len = tables.length; i < len; i++) {
          config.tables.push(tables[i]['tableName'])
        }
      } else {
        config.tables = []
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
              this.javaConfig['useOriginTable'] = false
            })
            break
          case 'useOriginColumn':
            this.$confirm('不建议使用原始字段名，一般不符合Java规范', '提示', {
              confirmButtonText: '仍然选中',
              cancelButtonText: '取消选中',
              type: 'warning'
            }).then(() => {
            }).catch(() => {
              this.javaConfig['useOriginColumn'] = false
            })
            break
        }
      }
      console.log(value, type)
    },
    async handleChoosePath(config) {
      config.output = await msgHandler(CHOOSE_FOLDER)
    },
    async handleGenJavaCode() {
      this.generateJavaLoading = true
      const { success, data } = await generateJavaCode(this.javaConfig)
      this.generateJavaLoading = false
      if (success) {
        this.$message({
          message: '生成代码成功，请打开文件夹查看',
          type: 'success'
        })
      } else {
        console.log(data)
      }
    },
    async handleGenGoCode() {
      this.generateGoLoading = true
      const { success, data } = await generateGoCode(this.goConfig)
      this.generateGoLoading = false
      if (success) {
        this.$message({
          message: '生成代码成功，请打开文件夹查看',
          type: 'success'
        })
      } else {
        console.log(data)
      }
    }
  }
}
</script>
<style lang="less">
.coder-app {
  width: 100%;
  height: 100%;
  display: flex;

  .el-tabs {
    flex: 1;
    padding: 12px 100px 20px 40px;

    .el-form {
      flex: 1;

      .el-form-item__content {
        display: flex;

        .el-select {
          flex: 1;

          .el-select__tags {
            max-height: 60px;
            overflow: auto;
          }
        }

        .el-button {
          margin-left: 16px;
        }
      }

      .options {
        div {
          margin-bottom: 10px;
        }
      }

      .handler {
        .el-button:first-child {
          margin: 0;
        }
      }
    }
  }
}
</style>
