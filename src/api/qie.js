import axios from 'axios'

export function getAllLiveListByHot(page, fc){
  axios.get('https://share.egame.qq.com/cgi-bin/pgg_live_async_fcgi', {
    params: {
      param: '{"key":{"module":"pgg_live_read_ifc_mt_svr","method":"get_pc_live_list","param":{"appid":"hot","page_num":' + page + ',"page_size":120,"tag_id":0,"tag_id_str":""}}}',
      app_info: '{"platform":4,"terminal_type":2,"egame_id":"egame_official","imei":"","version_code":"9.9.9.9","version_name":"9.9.9.9","ext_info":{"_qedj_t":"","ALG-flag_type":"","ALG-flag_pos":""},"pvid":"241846784020042123"}',
      g_tk: '',
      pgg_tk: '',
      tt: 1,
      _t: 1587992676245
    }
  })
  .then(function (response) {
    // console.log(response)
    console.log('Load Qie All Live List Data By Hot !')
    var loadPageOver = response.data.data.key.retBody.data.is_get_over == 1 ? true : false

    var payload ={
      page: parseInt(page) + 1,
      mainLiveData: convertData(response.data.data.key.retBody.data.live_data.live_list),
      loadPageOver: loadPageOver
    }
    fc(payload)
  })
  .catch(

  )
}

export function getAllLiveListByLiveType(liveTypeId, page, fc){
  axios.get('https://share.egame.qq.com/cgi-bin/pgg_live_async_fcgi', {
    params: {
      param: '{"key":{"module":"pgg_live_read_ifc_mt_svr","method":"get_pc_live_list","param":{"appid":"' + liveTypeId + '","page_num":' + page  + ',"page_size":40,"tag_id":0,"tag_id_str":""}}}',
      app_info: '{"platform":4,"terminal_type":2,"egame_id":"egame_official","imei":"","version_code":"9.9.9.9","version_name":"9.9.9.9","ext_info":{"_qedj_t":"","ALG-flag_type":"","ALG-flag_pos":""},"pvid":"241846784020043715"}',
      g_tk: '',
      pgg_tk: '',
      tt: 1,
      _t: 1587992676245
    }
  })
  .then(function (response) {
    // console.log(response)
    console.log('Load Qie Type Live Data By Live Type !')
    var loadPageOver = response.data.data.key.retBody.data.is_get_over == 1 ? true : false

    var payload ={
      page: parseInt(page) + 1,
      mainLiveData: convertData(response.data.data.key.retBody.data.live_data.live_list),
      loadPageOver: loadPageOver
    }
    fc(payload)
  })
  .catch(

  )
}

export function getAllLiveTypeList(fc){
  axios.get('https://egame.qq.com/gamelist')
  .then(function (response) {
    // console.log(response.data)
    console.log('Load Qie Live Type List OK !')
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

  const response = await axios.get('https://txpcdn.liveplay.egame.qq.com')
  console.log('Get qie live stream url ok !')
  liveData.playUrl = {
      'v2k': 'https://' + response.data.sug[0] + '/txpcdn.liveplay.egame.qq.com/live/3954_' + liveData.roomId + '.xs',
      'v1080p': 'https://' + response.data.sug[0] + '/txpcdn.liveplay.egame.qq.com/live/3954_' + liveData.roomId + '4000.xs',
      'v720p': 'https://' + response.data.sug[0] + '/txpcdn.liveplay.egame.qq.com/live/3954_' + liveData.roomId + '1200.xs',
      'v360p': 'https://' + response.data.sug[0] + '/txpcdn.liveplay.egame.qq.com/live/3954_' + liveData.roomId + '500.xs',
    }
  fc(liveData)

}

function regexGameType(bodyData) {
  var re = new RegExp('<a href="/livelist\\?layoutid=(.*?)" target="_blank" title="(.*?)" data-v-61357d2b><span class="img-content" data-v-61357d2b><img src="(.*?)" alt=', "g")
  var payload = []
  var regexResult
  while ((regexResult = re.exec(bodyData))){
    payload.push({
      gameId: regexResult[1],
      imageUrl: regexResult[3],
      gameName: regexResult[2]
    })
  }
  return payload
}


function convertData(liveList) {
  var mainLiveData = []
  for (var _ of liveList){
    var tempData = {}
    tempData.screenshot = _.program_res.cover_url
    tempData.roomName = _.title
    tempData.nick = _.anchor_name
    tempData.avatar180 = _.anchor_face_url
    tempData.totalCount = _.online
    tempData.gameFullName = _.appname
    tempData.roomId = _.anchor_id
    tempData.playUrl = []
    mainLiveData.push(tempData)
  }
  return mainLiveData
}


/*

https://share.egame.qq.com/cgi-bin/pgg_live_async_fcgi?param=%7B%22key%22:%7B%22module%22:%22pgg_live_read_ifc_mt_svr%22,%22method%22:%22get_pc_live_list%22,%22param%22:%7B%22appid%22:%22hot%22,%22page_num%22:1,%22page_size%22:120,%22tag_id%22:0,%22tag_id_str%22:%22%22%7D%7D%7D&app_info=%7B%22platform%22:4,%22terminal_type%22:2,%22egame_id%22:%22egame_official%22,%22imei%22:%22%22,%22version_code%22:%229.9.9.9%22,%22version_name%22:%229.9.9.9%22,%22ext_info%22:%7B%22_qedj_t%22:%22%22,%22ALG-flag_type%22:%22%22,%22ALG-flag_pos%22:%22%22%7D,%22pvid%22:%22241846784020042123%22%7D&g_tk=&pgg_tk=&tt=1&_t=1587992676245


https://egame.qq.com/gamelist

<a href="/livelist\\?layoutid=(.*?)" target="_blank" title="(.*?)" data-v-61357d2b><span class="img-content" data-v-61357d2b><img src="(.*?)" alt=


https://share.egame.qq.com/cgi-bin/pgg_live_async_fcgi?param=%7B%22key%22:%7B%22module%22:%22pgg_live_read_ifc_mt_svr%22,%22method%22:%22get_pc_live_list%22,%22param%22:%7B%22appid%22:%222000000133%22,%22page_num%22:1,%22page_size%22:40,%22tag_id%22:0,%22tag_id_str%22:%22%22%7D%7D%7D&app_info=%7B%22platform%22:4,%22terminal_type%22:2,%22egame_id%22:%22egame_official%22,%22imei%22:%22%22,%22version_code%22:%229.9.9.9%22,%22version_name%22:%229.9.9.9%22,%22ext_info%22:%7B%22_qedj_t%22:%22%22,%22ALG-flag_type%22:%22%22,%22ALG-flag_pos%22:%22%22%7D,%22pvid%22:%22241846784020043715%22%7D&g_tk=&pgg_tk=&tt=1&_t=1587992676245



请求 https://txpcdn.liveplay.egame.qq.com

获取cdn地址

https://fc4419239d90ff2096a5ac2b6d605cd3.v.smtcdns.net/txpcdn.liveplay.egame.qq.com/live/3954_526644026.xs

3954_526644026.xs 10M/最高画质
3954_526644026_4000.xs 4M
3954_526644026_1200.xs 高清
3954_526644026_500.xs 流畅


https://share.egame.qq.com/cgi-bin/pgg_live_async_fcgi?param={"key":{"module":"pgg_live_read_ifc_mt_svr","method":"get_pc_live_list","param":{"appid":"1104466820","page_num":3,"page_size":40,"tag_id":0,"tag_id_str":""}}}&app_info={"platform":4,"terminal_type":2,"egame_id":"egame_official","imei":"","version_code":"9.9.9.9","version_name":"9.9.9.9","ext_info":{"_qedj_t":"","ALG-flag_type":"","ALG-flag_pos":""},"pvid":"241846784020042714"}&g_tk=&pgg_tk=&tt=1&_t=1587992676245


https://16cc7fb20c2a55321ff03698010ec1c7.v.smtcdns.net/txpcdn.liveplay.egame.qq.com/live/3954_663002.xs
*/