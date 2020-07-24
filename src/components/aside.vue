<template>
  <div class="menu" :style="{height: (screenHeight - 125) + 'px'}">
    <el-menu>
      <el-menu-item v-for="platform in platformList" :key="platform.id" :index="platform.id" @click="switchPlatform">
        <span slot="title">{{ platform.name }}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>

  import { mapState, mapActions } from 'vuex'

  export default {
    name: 'Aside',
    data (){
      return {
        platformList: [
          // {id: '0', name: 'Hot'},
          {id: '1', name: '虎牙直播'},
          {id: '2', name: '斗鱼直播'},
          {id: '3', name: '企鹅电竞'},
          {id: '4', name: 'CC直播'},
          {id: '5', name: '哔哩哔哩'},
          {id: '6', name: '快手直播'},
          // {id: '7', name: '抖音直播'},
        ]
      }
    },
    computed: {
      ...mapState([
        'screenHeight',
        'screenWidth'
      ]),
    },
    methods: mapActions({
      switchPlatform (dispatch, event) {
        dispatch('switchPlatform', event.index)
      }
    })
  }

</script>

<style>
  .menu {
    display: -webkit-flex;
    display: flex;
    align-items: center;
  }
  .el-menu {
    margin-top: 10%;
    width: 100%;
  }

</style>