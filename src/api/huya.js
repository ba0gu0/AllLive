import axios from 'axios'

export function getAllLiveListByHot(page, fc){
  axios.get('https://www.huya.com/cache.php', {
    params: {
      m: 'LiveList',
      do: 'getLiveListByPage',
      tagAll: 0,
      page: page
    }
  })
  .then(function (response) {
    // console.log(response)
    console.log('Load Huya All Live List Data By Hot !')
    var loadPageOver = response.data.data.page == response.data.data.totalPage ? true : false
    var payload ={
      page: response.data.data.page += 1,
      mainLiveData: response.data.data.datas,
      loadPageOver: loadPageOver
    }
    fc(payload)
  })
  .catch(

  )
}

export function getAllLiveListByLiveType(liveTypeId, page, fc){
  axios.get('https://www.huya.com/cache.php',{
    params: {
      m: 'LiveList',
      do: 'getLiveListByPage',
      gameId: liveTypeId,
      tagAll: 0,
      page: page
    }
  })
  .then(function (response) {
    // console.log(response)
    console.log('Load Huya Type Live Data By Live Type !')
    var loadPageOver = response.data.data.page == response.data.data.totalPage ? true : false
    var payload = {
      page: response.data.data.page += 1,
      mainLiveData: response.data.data.datas,
      loadPageOver: loadPageOver
    }
    fc(payload)
  })
  .catch(

  )
}

export function getAllLiveTypeList(fc){
  axios.get('https://www.huya.com/g')
  .then(function (response) {
    // console.log(response)
    console.log('Load Huya Live Type List OK !')
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
  liveData.playUrl = {}
  const response = await axios.get('https://www.huya.com/' + liveData.profileRoom)
  console.log('Get huya live stream url ok !')
  liveData.playUrl = regexStreamUrl(response.data)
  fc(liveData)
}

function regexGameType(bodyData) {
  var re = new RegExp('<a class="g-gameCard-link" href=".*?" data-gid="(.*?)" target="_blank">.*?<img class="g-gameCard-img" src="(.*?)" alt=(.*?)data-default-img="84x84"', "sg")
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

function regexStreamUrl(bodyData) {
  var re = new RegExp('"stream": "(.*?)"', "sg")
  var payload = {}
  var regexResult = re.exec(bodyData)[1]
  var streamInfo = JSON.parse(atob(regexResult)).data[0].gameStreamInfoList[0]

  payload.v2k = streamInfo.sFlvUrl + '/' + streamInfo.sStreamName + '_10000.flv?' + streamInfo.sHlsAntiCode.replace(/&amp;/g, '&')
  payload.v1080p = streamInfo.sFlvUrl + '/' + streamInfo.sStreamName + '_4000.flv?' + streamInfo.sHlsAntiCode.replace(/&amp;/g, '&')
  payload.v720p = streamInfo.sFlvUrl + '/' + streamInfo.sStreamName + '_2000.flv?' + streamInfo.sHlsAntiCode.replace(/&amp;/g, '&')
  payload.v360p = streamInfo.sFlvUrl + '/' + streamInfo.sStreamName + '_500.flv?' + streamInfo.sHlsAntiCode.replace(/&amp;/g, '&')

  return payload
}

/*

https://www.huya.com/cache.php?m=LiveList&do=getLiveListByPage&tagAll=0&page=1

https://www.huya.com/g

<a class="g-gameCard-link" href=".*?" data-gid="(.*?)" target="_blank">.*?<img class="g-gameCard-img" src="(.*?)" alt=(.*?)data-default-img="84x84"


https://www.huya.com/cache.php?m=LiveList&do=getLiveListByPage&gameId=2165&tagAll=0&page=2

 */