
export default {
  setPlatformId (state, platformId) {
    state.platformId = platformId
  },
  setShowLiveDataType(state, typeId){
    state.showLiveDataType = typeId
    state.loadMoreType = 'loadMoreByLiveType'
  },

  setGameTypeId(state, gameTypeId){
    state.gameTypeId = gameTypeId
    state.loadMoreType = 'loadMoreByLiveType'
  },

  cleanIndexData(state){

    state.showLiveDataType = '0'
    state.loadPageNum = 1
    state.mainLiveData = []
    state.playLiveData = []
    state.loadMoreType = 'loadMoreByhot'
    if(state.Player){
      state.Player.destroy()
      state.Player = null
    }
  },

  setMainLiveData(state, payload) {

    state.mainLiveData = [...state.mainLiveData , ...payload.mainLiveData]
    state.loadPageNum = payload.page
    state.loadPageOver = payload.loadPageOver
    state.loading = false

  },

  setPlayLiveData(state, payload){
    state.playLiveData = payload
    state.loadPageOver = payload.loadPageOver
    state.loading = false
  },

  setLoadStart(state){
    state.loading = true
    state.percentage = Math.floor(Math.random() * 51 + 40)
  }
}
