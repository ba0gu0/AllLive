import * as api from '../api/request'
import * as play from '../api/play'
export const searchLiveByKey = ({ commit }) => {

  commit('setLoadStart')
  commit('cleanIndexData')
  api.loadLiveListByHot(
    (payload) => {
      commit('setMainLiveData', payload)
    }
  )
}

export const switchPlatform = ({ commit }, platformId) => {

  commit('setLoadStart')
  commit('cleanIndexData')
  commit('setPlatformId', platformId)
  api.loadLiveListByHot(
    (payload) => {
      commit('setMainLiveData', payload)
    }
  )
}

export const getLiveListByHot = ({ commit }) => {

  commit('setLoadStart')
  commit('cleanIndexData')
  api.loadLiveListByHot(
    (payload) => {
      commit('setMainLiveData', payload)
    }
  )
}

export const getLiveTypeList = ({ commit }) => {

  commit('setLoadStart')
  commit('cleanIndexData')
  commit('setShowLiveDataType', 1)
  api.loadLiveTypeList(
    (payload) => {
      commit('setMainLiveData', payload)
    }
  )
}

export const getLiveListByLiveType = ({ commit }, gameId) => {

  commit('setLoadStart')
  commit('cleanIndexData')
  commit('setGameTypeId', gameId)
  api.loadLiveListByLiveType(
    (payload) => {
      commit('setMainLiveData', payload)
    }
  )
}

export const loadMoreLiveList = ({ commit }, loadMoreType) => {

  commit('setLoadStart')
  if (loadMoreType == 'loadMoreByhot'){
    api.loadLiveListByHot(
        (payload) => {
        commit('setMainLiveData', payload)
      }
    )
  }else if (loadMoreType == 'loadMoreByLiveType'){
    api.loadLiveListByLiveType(
        (payload) => {
        commit('setMainLiveData', payload)
      }
    )
  }
}

export const getPlayLiveUrl = ({ commit }, liveData) => {
  commit('setLoadStart')
  commit('cleanIndexData')
  commit('setShowLiveDataType', 3)
  play.getPlayLiveUrl(
      liveData,
      (payload) => {
        commit('setPlayLiveData', payload)
      }
  )
}