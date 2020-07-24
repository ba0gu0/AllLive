import axios from 'axios'
import MD5 from 'crypto-js/md5'

export function getAllLiveListByHot(page, fc){
  axios.get('https://www.douyu.com/gapi/rkc/directory/mixList/0_0/' + page)
  .then(function (response) {
    console.log('Load DouYu All Live List Data By Hot !')
    var loadPageOver = page == response.data.data.pgcnt ? true : false
    var payload ={
      page: parseInt(page) + 1,
      mainLiveData: convertData(response.data.data.rl),
      loadPageOver: loadPageOver
    }
    fc(payload)
  })
  .catch(

  )
}

export function getAllLiveListByLiveType(liveTypeId, page, fc){
  axios.get('https://www.douyu.com/gapi/rkc/directory/mixList/2_' + liveTypeId + '/' + page)
  .then(function (response) {
    // console.log(response)
    console.log('Load DouYu Type Live Data By Live Type !')
    var loadPageOver = page == response.data.data.pgcnt ? true : false

    var payload ={
      page: parseInt(page) + 1,
      mainLiveData: convertData(response.data.data.rl),
      loadPageOver: loadPageOver
    }
    fc(payload)
  })
  .catch(

  )
}

export function getAllLiveTypeList(fc){
  axios.get('https://www.douyu.com/directory')
  .then(function (response) {
    // console.log(response)
    console.log('Load DouYu Live Type List OK !')
    var payload = {
      page: 0,
      mainLiveData: regexGameType(response.data),
      loadPageOver: true
    }
    fc(payload)
  })
  .catch(

  )
}

export async function getPlayLiveUrl(liveData, fc) {

  const rid = liveData.roomId.toString()
  const time = new Date()
  const tt = time.getTime()
  const auth = MD5(rid + tt).toString()

  const params = new URLSearchParams();
  params.append('rid', rid);
  params.append('did', '10000000000000000000000000001501');
  const response = await axios.post("https://playweb.douyucdn.cn/lapi/live/hlsH5Preview/" + rid, params,{
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'rid': rid,
      'time': tt,
      'auth': auth
    }
  })
  console.log('Get douyu live stream url ok !')
  liveData.playUrl = regexStreamUrl(response.data.data)
  fc(liveData)

}


function regexGameType(bodyData) {
  var re = new RegExp(
      '{"cate2Name":"(.*?)","cate2Icon":"(.*?)","cate2Url":".*?"count":.*?,"hot":.*?,"cate1Id":.*?,"cate2Id":(.*?),"isDisplay":1}', "g")
  var payload = []
  var regexResult
  while ((regexResult = re.exec(bodyData))){
    payload.push({
      gameId: regexResult[3],
      imageUrl: regexResult[2],
      gameName: regexResult[1]
    })
  }
  return payload
}

function regexStreamUrl(bodyData)  {
  const payload = {}
  if (!bodyData.rtmp_live){
    return {v2k: ''}
  }
  const re = new RegExp('^[0-9a-zA-Z]+', 'ig')
  const strreamName = re.exec(bodyData.rtmp_live)[0]
  payload.v2k = 'http://tx2play1.douyucdn.cn/live/' + strreamName + '.flv?uuid='
  payload.v1080p = 'http://tx2play1.douyucdn.cn/live/' + strreamName + '_2000p.flv?uuid='
  payload.v720p = 'http://tx2play1.douyucdn.cn/live/' + strreamName + '_1500.flv?uuid='
  payload.v360p = 'http://tx2play1.douyucdn.cn/live/' + strreamName + '_550.flv?uuid='

  return payload
}

function convertData(liveList) {
  var mainLiveData = []
  for (var _ of liveList){
    var tempData = {}
    tempData.roomId = _.rid
    tempData.screenshot = _.rs16
    tempData.roomName = _.rn
    tempData.nick = _.nn
    tempData.avatar180 = 'https://apic.douyucdn.cn/upload/' + _.av + '_middle.jpg'
    tempData.totalCount = _.ol
    tempData.gameFullName = _.c2name
    tempData.playUrl = []
    mainLiveData.push(tempData)
  }
  return mainLiveData
}
/*
https://www.douyu.com/gapi/rkc/directory/mixList/0_0/1

https://www.douyu.com/directory

{"cate2Name":"(.*?)","cate2Icon":"(.*?)","cate2Url":".*?"count":.*?,"hot":.*?,"cate1Id":.*?,"cate2Id":(.*?),"isDisplay":1}

https://www.douyu.com/gapi/rkc/directory/mixList/2_3/1


 */