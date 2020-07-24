<template>
  <div id="app">
    <el-row>
      <el-container>
        <el-col :span="4">
          <el-aside width="100%">
            <Logo />
            <Aside />
          </el-aside>
        </el-col>
        <el-col :span="20">
          <el-container>
            <el-header height="120px">
              <Search />
              <Header />
            </el-header>
            <el-main style="padding: 10px;">
              <Main />
            </el-main>
          </el-container>
        </el-col>
      </el-container>
    </el-row>
  </div>
</template>

<script>
  import Aside from './components/aside'
  import Header from './components/header'
  import Main from './components/main'
  import Search from './components/search'
  import Logo from './components/logo'
  import store from './store/index'

  export default {
    name: 'App',
    components: {
      Aside, Header, Search, Logo, Main
    },
    mounted: function () {
      window.onresize = () => {
          return (() => {
            store.state.screenHeight = document.body.clientHeight
            store.state.screenWidth = document.body.clientWidth
            // console.log(document.body.clientHeight, store.state.screenHeight)
          })()
      }
    },
    created: function () {
      store.dispatch('switchPlatform', '1')
    }
  }
</script>

<style>
  #app {
    font-size: larger;
    height: 100%;
    padding: 0;
    margin: 0;
    font-family: Helvetica;
    text-align: center;
  }
</style>