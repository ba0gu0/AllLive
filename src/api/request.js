import * as huya from './huya'
import * as douyu from './douyu'
import * as qie from './qie'
import * as cc from './cc'
import * as bilibili from './bilibili'
import * as kuaishou from './kuaishou'

import store from '../store/index'


export function loadLiveListByHot(fc) {

  switchFunction(0, fc)

}

export function loadLiveListByLiveType(fc) {

  switchFunction(1, fc)

}

export function loadLiveTypeList(fc) {

  switchFunction(2, fc)

}

function switchFunction(fid, fc) {

  const data = store.state
  // console.log(data)

  switch (data.platformId) {
    case '0' :
      console.log('Hots')
      break
    case '1' :
      console.log('虎牙直播')
      switch (fid) {
        case 0 :
          huya.getAllLiveListByHot(data.loadPageNum, fc)
          break
        case 1 :
          // console.log(data.gameTypeId, typeof(data.loadPageNum))
          huya.getAllLiveListByLiveType(data.gameTypeId, data.loadPageNum, fc)
          break
        case 2 :
          huya.getAllLiveTypeList(fc)
          break
      }
      break
    case '2' :
      console.log('斗鱼直播')
      switch (fid) {
        case 0 :
          // console.log(data.loadPageNum)
          douyu.getAllLiveListByHot(data.loadPageNum, fc)
          break
        case 1 :
          // console.log(data.gameTypeId, data.loadPageNum)
          douyu.getAllLiveListByLiveType(data.gameTypeId, data.loadPageNum, fc)
          break
        case 2 :
          douyu.getAllLiveTypeList(fc)
          break
      }
      break
    case '3' :
      console.log('企鹅电竞')
      switch (fid) {
        case 0 :
          // console.log(data.loadPageNum)
          qie.getAllLiveListByHot(data.loadPageNum, fc)
          break
        case 1 :
          // console.log(data.gameTypeId, data.loadPageNum)
          qie.getAllLiveListByLiveType(data.gameTypeId, data.loadPageNum, fc)
          break
        case 2 :
          qie.getAllLiveTypeList(fc)
          break
      }
      break
    case '4' :
      console.log('CC直播')
      switch (fid) {
        case 0 :
          // console.log(data.loadPageNum)
          cc.getAllLiveListByHot(data.loadPageNum, fc)
          break
        case 1 :
          // console.log(data.gameTypeId, data.loadPageNum)
          cc.getAllLiveListByLiveType(data.gameTypeId, data.loadPageNum, fc)
          break
        case 2 :
          cc.getAllLiveTypeList(fc)
          break
      }
      break
    case '5' :
      console.log('哔哩哔哩')
      switch (fid) {
        case 0 :
          // console.log(data.loadPageNum)
          bilibili.getAllLiveListByHot(data.loadPageNum, fc)
          break
        case 1 :
          // console.log(data.gameTypeId, data.loadPageNum)
          bilibili.getAllLiveListByLiveType(data.gameTypeId, data.loadPageNum, fc)
          break
        case 2 :
          bilibili.getAllLiveTypeList(fc)
          break
      }
      break
    case '6' :
      console.log('快手直播')
      switch (fid) {
        case 0 :
          // console.log(data.loadPageNum)
          kuaishou.getAllLiveListByHot(data.loadPageNum, fc)
          break
        case 1 :
          // console.log(data.gameTypeId, data.loadPageNum)
          kuaishou.getAllLiveListByLiveType(data.gameTypeId, data.loadPageNum, fc)
          break
        case 2 :
          kuaishou.getAllLiveTypeList(fc)
          break
      }
      break
    case '7' :
      console.log('抖音直播')
      switch (fid) {
        case 0 :
          // console.log(data.loadPageNum)
          qie.getAllLiveListByHot(data.loadPageNum, fc)
          break
        case 1 :
          // console.log(data.gameTypeId, data.loadPageNum)
          qie.getAllLiveListByLiveType(data.gameTypeId, data.loadPageNum, fc)
          break
        case 2 :
          qie.getAllLiveTypeList(fc)
          break
      }
      break
  }
}