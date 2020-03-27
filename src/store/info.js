import firebase from 'firebase/app'

export default {
  state: {
    info: {}
  },
  mutations: {
    setInfo(state, info) {
      state.info = info
    },
    clearInfo(state) {
      state.info = {}
    }
  },
  actions: {
    async fetchData({dispatch, commit}) {
      try {
        const uid = await dispatch('getUid')
        const info = (await firebase.database().ref(`/users/${uid}/info`).once('value')).val() 
        commit('setInfo', info)
      } catch(e) {
        console(e)
        alert(e)
      }
    },
    async updateData({dispatch, commit}, toSet) {
      try {
        const uid = await dispatch('getUid')
        const data = {...toSet}
        await firebase.database().ref(`/users/${uid}/info`).update(data)
        commit('setInfo', data)
      } catch(e) {}
    }

  },
  getters: {
    info: s => s.info,
    profileInfo: s => !s.info.goal && !s.info.height
  }
}