<template>
  <div>
    <el-row>
      <el-menu  mode="horizontal" style="margin-top: 0px">
        <el-col :span="8">
          <el-menu-item index="0" @click="getLiveListByHot">热门</el-menu-item>
        </el-col>
        <el-col :span="8">
          <el-menu-item index="1" @click="getLiveTypeList">分类</el-menu-item>
        </el-col>
        <el-col :span="8">
          <el-menu-item index="2" disabled @click="getLiveListByHot">视频</el-menu-item>
        </el-col>
      </el-menu>
    </el-row>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    name: 'Header',
    methods: mapActions({
      getLiveListByHot (dispatch) {
        dispatch('getLiveListByHot')
      },
      getLiveTypeList (dispatch){
        dispatch('getLiveTypeList')
      }
    })
  }

</script>

<style>

</style>