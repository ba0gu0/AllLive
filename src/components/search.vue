<template>
  <div>
    <el-row class="search">
      <el-col :span="5">
        <p> </p>
      </el-col>
      <el-col :span="10">
        <el-form @submit.native.prevent>
          <el-input v-model="liveKey" placeholder="搜索关键字..."
                    :rules="[{ required: true, message: '搜索内容不能为空!'},]">
          </el-input>
        </el-form>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" icon="el-icon-search" @click="searchLiveByKey">搜索</el-button>
      </el-col>
    </el-row>
  </div>
</template>


<script>
  import { mapActions } from 'vuex'

  export default {
    name: 'Search',
    data() {
      return {
        liveKey: ''
      }
    },
    methods: mapActions({
      searchLiveByKey (dispatch) {
        if (this.liveKey != ''){
          dispatch('searchLiveByKey', this.liveKey)
          this.liveKey = ''
        }
      }
    })
  }

</script>


<style>
  .search {
    margin: 10px 0px;
  }
</style>