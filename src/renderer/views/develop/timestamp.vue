<template>
  <el-form ref="javaConfig" size="medium" label-width="120px">
    <el-form-item label="当前时间戳">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-button type="text" @click="chooseTimestamp">{{ currentTimestamp }}</el-button>
        </el-col>
      </el-row>
    </el-form-item>
    <el-form-item label="时间戳">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input v-model="timestamp.value" />
        </el-col>
        <el-col :span="3">
          <el-select v-model="timestamp.unit">
            <el-option label="秒" value="second" />
            <el-option label="毫秒" value="millisecond" />
          </el-select>
        </el-col>
        <el-col :span="3">
          <el-button style="width: 100%" type="primary" @click="toDatetime">转换</el-button>
        </el-col>
        <el-col :span="8">
          <el-input v-model="timestamp.datetime" />
        </el-col>
      </el-row>
    </el-form-item>
    <el-form-item label="时间">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-date-picker v-model="datetime.value" style="width: 100%;" type="datetime" />
        </el-col>
        <el-col :span="3">
          <el-button style="width: 100%" type="primary" @click="toTimestamp">转换</el-button>
        </el-col>
        <el-col :span="8">
          <el-input v-model="datetime.timestamp" />
        </el-col>
        <el-col :span="3">
          <el-select v-model="datetime.unit">
            <el-option label="秒" value="second" />
            <el-option label="毫秒" value="millisecond" />
          </el-select>
        </el-col>
      </el-row>
    </el-form-item>
  </el-form>
</template>

<script>
import dayjs from 'dayjs'

export default {
  name: 'Timestamp',
  data() {
    return {
      timer: null,
      currentTimestamp: null,
      timestamp: {
        value: null,
        unit: 'second',
        datetime: null
      },
      datetime: {
        value: null,
        unit: 'second',
        timestamp: null
      }
    }
  },
  mounted() {
    if (!this.timer) {
      setInterval(() => {
        this.currentTimestamp = new Date().getTime()
      }, 1000)
    }
  },
  methods: {
    chooseTimestamp() {
      this.timestamp.value = this.currentTimestamp
      this.timestamp.unit = 'millisecond'
    },
    toDatetime() {
      switch (this.timestamp.unit) {
        case 'second':
          this.timestamp.datetime = dayjs.unix(this.timestamp.value)
            .format('YYYY-MM-DD HH:mm:ss')
          break
        case 'millisecond':
          this.timestamp.datetime = dayjs(this.timestamp.value)
            .format('YYYY-MM-DD HH:mm:ss')
          break
      }
    },
    toTimestamp() {
      switch (this.datetime.unit) {
        case 'second':
          this.datetime.timestamp = dayjs(this.datetime.value).unix()
          break
        case 'millisecond':
          this.datetime.timestamp = dayjs(this.datetime.value).valueOf()
          break
      }
    }
  }
}
</script>
