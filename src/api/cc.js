import axios from 'axios'

export function getAllLiveListByHot(page, fc){
  axios.get('https://cc.163.com/api/category/live/', {
    params: {
      format: 'json',
      start: (page - 1) * 120,
      size: 120,
    }
  })
  .then(function (response) {
    // console.log(response)
    console.log('Load CC All Live List Data By Hot !')
    var loadPageOver = response.data.lives.length < 120 ? true : false

    var payload ={
      page: parseInt(page) + 1,
      mainLiveData: convertData(response.data.lives),
      loadPageOver: loadPageOver
    }
    fc(payload)
  })
  .catch(

  )
}

export function getAllLiveListByLiveType(liveTypeId, page, fc){
  axios.get('https://cc.163.com/api/category/' + liveTypeId + '/', {
    params: {
      format: 'json',
      tag_id: '0',
      start: (page - 1) * 120,
      size: '120'
    }
  })
  .then(function (response) {
    // console.log(response)
    console.log('Load CC Type Live Data By Live Type !')
    var loadPageOver = response.data.lives.length < 120 ? true : false

    var payload ={
      page: parseInt(page) + 1,
      mainLiveData: convertData(response.data.lives),
      loadPageOver: loadPageOver
    }
    fc(payload)
  })
  .catch(

  )
}

export function getAllLiveTypeList(fc){
  axios.get('https://cc.163.com/category/')
  .then(function (response) {
    // console.log(response.data)
    console.log('Load CC Live Type List OK !')
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

export function getPlayLiveUrl(liveData, fc) {
  console.log('Get cc live stream url ok !')
  fc(liveData)
}

function regexGameType(bodyData) {
  var re = new RegExp('<a href="/category/(.*?)/" class=.*?<img src="(.*?)" class="category-poster"/></div></div><p class="category-name nick" title="(.*?)">', "g")
  var payload = []
  var regexResult
  while ((regexResult = re.exec(bodyData))){
    payload.push({
      gameId: regexResult[1],
      imageUrl: regexResult[2],
      gameName: regexResult[3]
    })
  }
  return payload
}


function convertData(liveList) {
  var mainLiveData = []
  for (var _ of liveList){
    var tempData = {}
    tempData.screenshot = _.cover
    tempData.roomName = _.title
    tempData.nick = _.nickname
    tempData.avatar180 = _.purl
    tempData.totalCount = _.hot_score
    tempData.gameFullName = _.gamename.substr(0,6)
    tempData.roomId = _.cuteid
    tempData.playUrl = {}
    if (!_.stream_list){
      continue
    }
    if (_.stream_list.medium){
      tempData.playUrl.v2k = 'https://pull.cc.netease.com/pushstation/' + _.stream_list.medium.streamname + '.flv?' + _.stream_list.medium.CDN_FMT.ws
      tempData.playUrl.v1080p = 'https://pull.cc.netease.com/pushstation/' + _.stream_list.medium.streamname + '.flv?' + _.stream_list.medium.CDN_FMT.ws
    }
    if (_.stream_list.original){
      tempData.playUrl.v720p = 'https://pull.cc.netease.com/pushstation/' + _.stream_list.original.streamname + '.flv?' + _.stream_list.original.CDN_FMT.ws
    }
    if (_.stream_list.low) {
      tempData.playUrl.v320p = 'https://pull.cc.netease.com/pushstation/' + _.stream_list.low.streamname + '.flv?' + _.stream_list.low.CDN_FMT.ws
    }
    mainLiveData.push(tempData)
  }
  return mainLiveData
}





/*
https://cc.163.com/api/category/live/?format=json&start=0&size=120


https://cc.163.com/category/


<a href="/category/(.*?)/" class=.*?<img src=".*?" class="category-poster"/></div></div><p class="category-name nick" title="(.*?)">

https://cc.163.com/api/category/3/?format=json&tag_id=0&start=0&size=120


live https://pull.cc.netease.com/pushstation/06d7c931d1c49a659dd512240737.flv?wsSecret=72c847e9d79d8d47c44c7eb8031bf885&wsTime=5ebcb1ba

https://pull.cc.netease.com/pushstation/ liveData.stream_list.original.streamname / liveData.stream_list.original.CDN_FMT.ws
 */