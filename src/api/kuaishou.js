import axios from 'axios'

export function getAllLiveListByHot(page, fc){
  axios.post('https://live.kuaishou.com/m_graphql', {
    operationName:"LiveCardQuery",
    variables:{
      type:"DQRM",
      currentPage:page,
      pageSize:60
    },
    query:"query LiveCardQuery($gameId: String, $type: String, $heroType: String, $heroName: String, $currentPage: Int, $pageSize: Int) {\n  liveCardList(gameId: $gameId, type: $type, heroType: $heroType, heroName: $heroName, currentPage: $currentPage, pageSize: $pageSize) {\n    list {\n      user {\n        id\n        avatar\n        name\n        __typename\n      }\n      watchingCount\n      poster\n      coverUrl\n      caption\n      id\n      playUrls {\n        quality\n        url\n        __typename\n      }\n      quality\n      gameInfo {\n        category\n        name\n        pubgSurvival\n        type\n        kingHero\n        __typename\n      }\n      hasRedPack\n      liveGuess\n      expTag\n      __typename\n    }\n    totalPage\n    __typename\n  }\n}\n"
  })
  .then(function (response) {
    console.log('Load kuaishou All Live List Data By Hot !')

    var loadPageOver = response.data.data.liveCardList.totalPage <= page ? true : false
    var payload ={
      page: parseInt(page) + 1,
      mainLiveData: convertData(response.data.data.liveCardList.list),
      loadPageOver: loadPageOver
    }
    fc(payload)
  })
  .catch(
  )
}

export function getAllLiveListByLiveType(liveTypeId, page, fc){
  axios.post('https://live.kuaishou.com/m_graphql', {
    "operationName":"LiveCardQuery",
    "variables":{
      "type":liveTypeId.categoryAbbr,
      "gameId":liveTypeId.categoryId,
      "currentPage":page,
      "pageSize":60
    },
    "query":"query LiveCardQuery($gameId: String, $type: String, $heroType: String, $heroName: String, $currentPage: Int, $pageSize: Int) {\n  liveCardList(gameId: $gameId, type: $type, heroType: $heroType, heroName: $heroName, currentPage: $currentPage, pageSize: $pageSize) {\n    list {\n      user {\n        id\n        avatar\n        name\n        __typename\n      }\n      watchingCount\n      poster\n      coverUrl\n      caption\n      id\n      playUrls {\n        quality\n        url\n        __typename\n      }\n      quality\n      gameInfo {\n        category\n        name\n        pubgSurvival\n        type\n        kingHero\n        __typename\n      }\n      hasRedPack\n      liveGuess\n      expTag\n      __typename\n    }\n    totalPage\n    __typename\n  }\n}\n"
  })
  .then(function (response) {
    // console.log(response)
    console.log('Load kuaishou Type Live Data By Live Type !')
    var loadPageOver = response.data.data.liveCardList.totalPage <= page ? true : false

    var payload ={
      page: parseInt(page) + 1,
      mainLiveData: convertData(response.data.data.liveCardList.list),
      loadPageOver: loadPageOver
    }
    fc(payload)
  })
  .catch(

  )
}

export function getAllLiveTypeList(fc){
  axios.get('https://live.kuaishou.com/cate/')
  .then(function (response) {
    // console.log(response)
    console.log('Load kuaishou Live Type List OK !')
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
  console.log('Get kuaishou live stream url ok !')
  fc(liveData)
}

function regexGameType(bodyData) {
  var re = new RegExp('{"categoryId":"(\\d+)","categoryAbbr":"(\\w+)","title":"(.*?)","src":"(.*?)","__typename":"Category"}', "g")
  var payload = []
  var regexResult
  while ((regexResult = re.exec(bodyData))){
    payload.push({
      gameId: {categoryId: regexResult[1], categoryAbbr: regexResult[2]},
      imageUrl: regexResult[4].replace(/\\u002F/g, '/'),
      gameName: regexResult[3]
    })
  }
  return payload
}


function convertData(liveList) {
  var mainLiveData = []
  for (var _ of liveList){
    var tempData = {}
    tempData.screenshot = _.poster
    tempData.roomName = _.caption ? _.caption : _.user.name
    tempData.nick = _.user.name
    tempData.avatar180 = _.user.avatar
    tempData.totalCount = parseInt(_.watchingCount)
    tempData.gameFullName = _.gameInfo.name
    tempData.playUrl = {}
    for (var playData of _.playUrls)
    switch (playData.quality) {
      case 'blueRay':
        tempData.playUrl.v2k = playData.url
        break
      case 'super':
        tempData.playUrl.v1080p = playData.url
        break
      case 'high':
        tempData.playUrl.v720p = playData.url
        break
      case 'standard':
        tempData.playUrl.v360p = playData.url
        break
    }
    mainLiveData.push(tempData)
  }
  return mainLiveData
}
/*
"playUrls": [
{
"quality": "blueRay",
"url": "https://ali-adaptive.pull.yximgs.com/gifshow/4xBUBy2E9kE.flv?auth_key=1592030333-0-0-819d7958a797c7cc61eb40849c6d77c4&highTraffic=1&oidc=alihb",
"__typename": "FlvPlayUrl"
},
{
"quality": "super",
"url": "https://ali-adaptive.pull.yximgs.com/gifshow/4xBUBy2E9kE_hd4000.flv?auth_key=1592030333-0-0-2170acd1e1720f96324c2f69da0461b5&tsc=origin&highTraffic=1&oidc=alihb",
"__typename": "FlvPlayUrl"
},
{
"quality": "high",
"url": "https://ali-adaptive.pull.yximgs.com/gifshow/4xBUBy2E9kE_hd2000.flv?auth_key=1592030333-0-0-865e25281c4f7c89d8bf88d7420d8da0&tsc=origin&highTraffic=1&oidc=alihb",
"__typename": "FlvPlayUrl"
},
{
"quality": "standard",
"url": "https://ali-adaptive.pull.yximgs.com/gifshow/4xBUBy2E9kE_sd1000.flv?auth_key=1592030333-0-0-0e02bfbb1e15624737482890a60c292a&tsc=origin&highTraffic=1&oidc=alihb",
"__typename": "FlvPlayUrl"
}
],
"qu

 */