import * as huya from './huya'
import * as douyu from './douyu'
import * as qie from './qie'
import * as cc from './cc'
import * as bilibili from './bilibili'
import * as kuaishou from './kuaishou'

import store from '../store/index'


export function getPlayLiveUrl(liveData, fc) {

  switchFunction(liveData, fc)

}

function switchFunction(liveData, fc) {

  const data = store.state

  switch (data.platformId) {
    case '0' :
      break
    case '1' :
      console.log('虎牙直播')
      huya.getPlayLiveUrl(liveData, fc)
      break
    case '2' :
      console.log('斗鱼直播')
      douyu.getPlayLiveUrl(liveData, fc)
      break
    case '3' :
      console.log('企鹅电竞')
      qie.getPlayLiveUrl(liveData, fc)
      break
    case '4' :
      console.log('CC直播')
      cc.getPlayLiveUrl(liveData, fc)
      break
    case '5' :
      console.log('哔哩哔哩')
      bilibili.getPlayLiveUrl(liveData, fc)
      break
    case '6' :
      console.log('快手直播')
      kuaishou.getPlayLiveUrl(liveData, fc)
      break
    case '7' :
      console.log('抖音直播')
      break
  }
}