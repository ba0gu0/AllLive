import axios from 'axios'

export function getAllLiveListByHot(page, fc){
  axios.get('https://api.live.bilibili.com/room/v1/Area/getListByAreaID?areaId=0&sort=online&pageSize=40&page=' + page)
  .then(function (response) {
    // console.log(response)
    console.log('Load bilibili All Live List Data By Hot !')
    var loadPageOver = response.data.data.length < 40 ? true : false

    var payload ={
      page: parseInt(page) + 1,
      mainLiveData: convertData(response.data.data),
      loadPageOver: loadPageOver
    }
    fc(payload)
  })
  .catch(

  )
}

export function getAllLiveListByLiveType(liveTypeId, page, fc){
  axios.get('https://api.live.bilibili.com/room/v3/area/getRoomList?platform=web&page_size=40&tag_version=1&' + liveTypeId + '&page=' + page)
  .then(function (response) {
    // console.log(response)
    console.log('Load bilibili Type Live Data By Live Type !')
    var loadPageOver = response.data.data.list.length < 40 ? true : false

    var payload ={
      page: parseInt(page) + 1,
      mainLiveData: convertData(response.data.data.list),
      loadPageOver: loadPageOver
    }
    fc(payload)
  })
  .catch(

  )
}

export async function getAllLiveTypeList(fc){
  console.log('Load BiLiBiLi Live Type List OK !')
  var mainLiveData = []
  for (var _ of [2, 3, 6, 1, 5, 4]){
    var res = await axios.get('https://live.bilibili.com/p/eden/area-tags?parentAreaId=' + _ + '&areaId=0')
    mainLiveData = [...mainLiveData, ...regexGameType(res.data)]
  }
  var payload = {
    page: 0,
    mainLiveData: mainLiveData,
    loadPageOver: true
  }
  fc(payload)
}

export async function getPlayLiveUrl(liveData, fc) {

  var response = await axios.get('https://api.live.bilibili.com/xlive/web-room/v1/playUrl/playUrl?cid=' + liveData.roomId + '&qn=10000&platform=web')
  liveData.playUrl.v2k = response.data.data.durl[0].url
  response = await axios.get('https://api.live.bilibili.com/xlive/web-room/v1/playUrl/playUrl?cid=' + liveData.roomId + '&qn=400&platform=web')
  liveData.playUrl.v1080p = response.data.data.durl[0].url
  response = await axios.get('https://api.live.bilibili.com/xlive/web-room/v1/playUrl/playUrl?cid=' + liveData.roomId + '&qn=250&platform=web')
  liveData.playUrl.v720p = response.data.data.durl[0].url
  response = await axios.get('https://api.live.bilibili.com/xlive/web-room/v1/playUrl/playUrl?cid=' + liveData.roomId + '&qn=150&platform=web')
  liveData.playUrl.v360p = response.data.data.durl[0].url
  console.log('Get bilibili live stream url ok !')
  fc(liveData)
}

function regexGameType(bodyData) {

  var re = new RegExp('<a href="//live\\.bilibili\\.com/p/eden/area-tags\\?parentAreaId=(\\d+)&amp;areaId=(\\d+)#/\\d+/\\d+" data-v-1bf6dfab><button class="tag tag-default" data-v-8b4f9214 data-v-1bf6dfab><span data-v-8b4f9214>(.*?)</span></button></a>', "sg")
  var payload = []
  var regexResult
  while ((regexResult = re.exec(bodyData))){
    var liveTypeId = 'parent_area_id=' + regexResult[1] + '&area_id=' + regexResult[2]
    payload.push({
      gameId: liveTypeId,
      imageUrl: '1',
      gameName: regexResult[3]
    })
  }
  return payload

}



function convertData(liveList) {
  var mainLiveData = []
  for (var _ of liveList){
    var tempData = {}
    tempData.screenshot = _.system_cover
    tempData.roomName = _.title
    tempData.nick = _.uname
    tempData.avatar180 = _.face
    tempData.totalCount = _.online
    tempData.gameFullName = _.area_v2_name
    tempData.roomId = _.roomid
    tempData.playUrl = []
    mainLiveData.push(tempData)
  }
  return mainLiveData
}







// https://api.live.bilibili.com/room/v1/room/get_user_recommend?page=1&page_size=30