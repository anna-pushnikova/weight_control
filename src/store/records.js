import firebase from 'firebase/app'

export default {
  actions: {
    async createRecord({dispatch}, record) {
      try {  
        const uid = await dispatch('getUid')
        await firebase.database().ref(`/users/${uid}/records`).push(record)
      } catch(e) {
        commit('setError')
        throw e
      } 
    },
    async fetchRecords({dispatch}) {
      try {
        const uid = await dispatch('getUid')
        const records = (await firebase.database().ref(`/users/${uid}/records`).once('value')).val() || {}
        return Object.keys(records).map(function(key) {
          return {
            date: records[key].date,
            weight: records[key].weight,
            change: records[key].change,
            id: key
          }
        })
      } catch (e) {
        commit('setError')
        throw e
      }
    }, 
    async updateRecord({dispatch}, {id, date, weight, change}) {
      try {
        const uid = await dispatch('getUid')
        await firebase.database().ref(`/users/${uid}/records`).child(id).update({date, weight, change})
      } catch(e) {
        commit('setError')
        throw e
      }
    },
    async deleteRecord({dispatch}, {id}) {
      try {
        const uid = await dispatch('getUid')
        await firebase.database().ref(`/users/${uid}/records`).child(id).remove()
      } catch(e) {
        commit('setError')
        throw e
      }
    }

  }
}