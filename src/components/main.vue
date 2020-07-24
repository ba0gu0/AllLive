<template>
  <div>
    <div
      :style="{overflow: 'auto', height: (screenHeight - 145) + 'px'}"
      element-loading-text="拼命加载中"
      v-loading="loading &&	 mainLiveData.length == 0 && showLiveDataType != 3"
    >

      <div v-if="showLiveDataType == 0" >
        <el-row v-infinite-scroll="loadMoreLiveList" infinite-scroll-disabled="disabled">
          <el-col :span="6" v-for="liveData in mainLiveData" :key="liveData.id">
            <div>
              <el-card class="livecrad" :style="{ height: (screenWidth / 6.4)  + 'px'}" :body-style="{ padding: '0px' }" shadow="hover">
                <div  @click="getPlayLiveUrl(liveData)" class="playimg" :style="{height: (screenWidth / 6.4 - 60) + 'px'}">
                  <i class="el-icon-video-play" :style="{ 'font-size': (screenWidth / 6.4 - 120) + 'px'}"></i>
                </div>
                <el-image class="liveimage" :style="{ height: (screenWidth / 6.4 - 60) + 'px'}" :src="liveData.screenshot" fit="cover" lazy>
                  <div slot="error" class="loaderrorimage">
                    <i class="el-icon-loading"></i>
                  </div>
                </el-image>

                <div>
                  <div class="livetitle">
                    <span>{{ liveData.roomName }}</span>
                  </div>
                  <div class="liveauthor">
                    <div class="avator" >
                      <el-avatar size="small" :src="liveData.avatar180"></el-avatar>
                    </div>
                    <span class="nick">{{ liveData.nick }}</span>
                    <div class="hot">
                      <i class="el-icon-view"></i>
                      &nbsp;
                      <span>{{ (liveData.totalCount/10000).toFixed(2) }}万</span>
                      <span class="gametype">{{ liveData.gameFullName }}</span>
                    </div>
                  </div>
                </div>
              </el-card>
            </div>

          </el-col>
        </el-row>
      </div>
      <div v-else-if="showLiveDataType == 1">
        <el-row>
          <el-col :span="4" v-for="liveData in mainLiveData" :key="liveData.id">
            <div @click="getLiveListByLiveType(liveData.gameId)" :index="liveData.gameId">
              <el-card v-if="platformId == 3 || platformId == 4 || platformId == 6" class="typecard" :style="{ height: (screenWidth / 7 * 1.3)  + 'px'}" :body-style="{ padding: '0px' }" shadow="hover">
                <el-image class="typeimage" :style="{ height: (screenWidth / 7 * 1.3 - 30)  + 'px'}" :src="liveData.imageUrl" fit="cover"  lazy>
                  <div slot="error" class="loaderrorimage">
                    <i class="el-icon-loading"></i>
                  </div>
                </el-image>
                <div class="typename">
                  <span>{{ liveData.gameName }}</span>
                </div>
              </el-card>
              <el-card v-else class="typecard" :style="{ height: (screenWidth / 7.5)  + 'px'}" :body-style="{ padding: '0px' }" shadow="hover">
                <el-image class="typeimage" :style="{ height: (screenWidth / 7.5 - 30)  + 'px'}" :src="liveData.imageUrl" fit="cover"  lazy>
                  <div slot="error" class="loaderrorimage">
                    <i class="el-icon-loading"></i>
                  </div>
                </el-image>
                <div class="typename">
                  <span>{{ liveData.gameName }}</span>
                </div>
              </el-card>
            </div>
          </el-col>
        </el-row>
      </div>
      <div v-else-if="showLiveDataType == 2">
      </div>
      <div v-else-if="showLiveDataType == 3" style="height: 100%" class="playlivediv">
        <div class="playtitle">
          <div style="float: left; margin-left: 5px">
            <el-avatar size="large" :src="playLiveData.avatar180"></el-avatar>
          </div>
          <div style="margin-left: 10px;width: 100%;">
            <div>
              <span>{{ playLiveData.roomName }}</span>
            </div>
            <div style="width: 100%; color: darkgrey;">
              <span>{{ playLiveData.nick }}</span>
              <div style="float: right;">
                <i class="el-icon-view"></i>
                &nbsp;&nbsp;&nbsp;
                <span>{{ (playLiveData.totalCount/10000).toFixed(2) }}万</span>
                <span style="margin: 0 10px 0 10px; color: darkorange">{{ playLiveData.gameFullName }}</span>
              </div>
            </div>
          </div>
        </div>
        <div id="dplayer" >
          <img :src="playLiveData.screenshot">
          <i class="icoimg" @click.once="play()">
            <img :src="require('../assets/images/play.png')" style="height: 100%;width: 100%;">
          </i>
        </div>
      </div>
      <div v-if="noMore && showLiveDataType != 3" style="height: 20px" @click="open">
        <i slot="error" class="el-icon-loading"></i>
        <span slot="error" style="color: darkgrey; margin: 10px;">  没有更多了!</span>
      </div>
      <el-progress v-if="loading &&	mainLiveData.length > 0 && showLiveDataType != 3" :percentage="percentage"></el-progress>
    </div>
  </div>

</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import flvjs from 'flv.js'
  import DPlayer from 'dplayer'
  import store from '../store/index'

  window.flvjs = flvjs

  export default {
    computed: {
      noMore () {
        // console.log(this)
        return this.loadPageOver
      },
      disabled () {
        // console.log(this.loading)
        return this.loading || this.noMore
      },
      ...mapState([
        'platformId',
        'mainLiveData',
        'loadPageOver',
        'loading',
        'percentage',
        'loadMoreType',
        'showLiveDataType',
        'screenHeight',
        'screenWidth',
        'playLiveData'
      ]),
    },
    methods: mapActions({
      loadMoreLiveList (dispatch) {
        dispatch('loadMoreLiveList', this.loadMoreType)
      },
      getLiveListByLiveType(dispatch, gameId) {
        dispatch('getLiveListByLiveType', gameId)
      },
      getPlayLiveUrl(dispatch, liveData){
        dispatch('getPlayLiveUrl', liveData)
      },
      play() {
        const data = store.state
        data.Player = new DPlayer({
          container: document.getElementById('dplayer'),
          live: true,
          autoplay: true,
          screenshot: true,
          airplay: true,
          preload: true,
          volume: 0.5,
          logo: require('../assets/images/logo.png'),
          mutex	: true,
          video: {
            pic: this.playLiveData.screenshot,
            url: openStreamUrl(this.playLiveData.playUrl),
            type: 'flv',
          },
          pluginOptions: {
            flv: {
              mediaDataSource: {
              },
              config: {

              },
            },
          },
        })
        data.Player.play()
      },
      // play(){
      //   const data = store.state
      //   if (flvjs.isSupported()) {
      //     var videoElement = document.getElementById('player')
      //     // console.log(this.playLiveData.playUrl.v1080p)
      //     data.flvPlayer = flvjs.createPlayer({
      //         type: 'flv',
      //         url: openStreamUrl(this.playLiveData.playUrl)
      //     });
      //     data.flvPlayer.attachMediaElement(videoElement);
      //     data.flvPlayer.load();
      //     data.flvPlayer.play();
      //   }
      // },
      open(){
        this.$notify.success({
          title: '警告',
          message: '已经加载完了, 没有更多了!',
          showClose: false,
          position: 'bottom-right'
        });
      },
    })
  }

  function openStreamUrl(playUrl) {
    if (playUrl.v2k){
      return playUrl.v2k
    } else if (playUrl.v1080p){
      return playUrl.v1080p
    }else if (playUrl.v720p){
      return playUrl.v720p
    }else if (playUrl.v360p){
      return playUrl.v360p
    }
  }
</script>


<style>

  .typecard {
    border-radius: 10px;
    margin: 10px;
  }
  .typecard:hover {
    color: darkorange;
  }
  .typeimage {
    width: 100%;
  }
  .typename {
    text-align: center;
  }


  .livecrad {
    text-align: left;
    margin: 5px;
  }
  .livecrad:hover .playimg i{
    display: block;
  }
  .livecrad:hover .liveimage{
    filter: blur(1px);
  }
  .livecrad:hover .livetitle{
    color: #909399;
  }
  .playimg {
    position: absolute;
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 24%;
    color: azure;
  }
  .playimg i{
    display: none;
  }
  .liveimage {
    width: 100%;
    border-radius: 10px;
  }
  .loaderrorimage {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    font-size: 50px;
  }
  .livetitle {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: bold;
    margin-left: 5px;
    line-height: 25px;
    font-size: 13px;
    text-align: left;
  }
  .liveauthor {
    margin: 0px 5px;
    line-height: 28px;
    font-size: 11px;
    color: darkgrey;
  }
  .avator {
    float: left;
  }
  .nick{
    margin-left: 3px;
  }
  .hot {
    float: right;
  }
  .gametype {
    margin-left: 5px;
    color: coral;
  }

  .playlivediv:hover .playtitle{
    display: flex;
  }
  .playtitle {
    width: 40%;
    height: 10%;
    border-radius: 10px;
    background-color: black;
    margin: 10px 0 0 20px;
    display: none;
    position: absolute;
    z-index: 10;
    opacity: 0.8;
    color: white;
    font-size: large;
    align-items: center;
    text-align: left;
  }
  #dplayer {
    width: 100%;
    height: 100%;
    background-color: white;
  }
  #dplayer img {
    width: 100%;
    height: 100%;
  }
  .icoimg {
    position: absolute;
    top: 45%;
    left: 55%;
    width: 150px;
    height: 150px;
  }
</style>