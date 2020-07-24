import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)

const state = {
  screenWidth: document.body.clientWidth,

  screenHeight: document.body.clientHeight,

  platformId: '0',

  loadPageNum: 1,

  gameTypeId: '1',

  showLiveDataType: '0',

  loadPageOver: false,
  // 加载完成
  loadMoreType: 'loadMoreByhot',

  loading: false,

  percentage: 67,
  // 正在加载数据，显示loading
  mainLiveData: [
    /*
      {
      'id': '1',
      'liveIImageUrl': 'https:////live-cover.msstatic.com/huyalive/',
      'liveTitle': 'LNG vs WE  LPL春季赛',
      'liveCompere': '英雄联盟赛事的直播',
      'liveAvatarUrl': 'https://huyaimg.msstatic.com/avatar/',
      'hots': '735.4万',
      'liveClass': '英雄联盟'
      }
    */
  ],
  playLiveData: {

  },
  flvPlayer: null
//  主窗口数据
}

export default new Vuex.Store({
  state,
  actions,
  mutations
})

