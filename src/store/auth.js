import firebase from 'firebase/app'
import Vue from 'vue'

export default {
  actions: {
    async register({dispatch}, {email, password, firstName, lastName}) {
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .catch(function(error) {
          let errorCode = error.code
          let errorMessage = error.message

          if (errorCode === 'auth/email-already-in-use') {
            Vue.toasted.show (
              errorMessage, {
              icon: 'exclamation-triangle'
            })
          }
        })
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        const uid = await dispatch('getUid')
        await firebase.database().ref(`/users/${uid}/info`).set({
          firstName,
          lastName
        })
      } catch (e) {
        commit('setError')
        throw e
      } 
    },
    getUid() {
      const user = firebase.auth().currentUser
      return user ? user.uid : null
    },
    async login({commit}, {email, password}) {
      firebase.auth().signInWithEmailAndPassword(email, password)
        .catch(function(error) {
          let errorCode = error.code
          let errorMessage = error.message

          if (errorCode === 'auth/wrong-password') {
            Vue.toasted.show (
              errorMessage, {
              icon: 'exclamation-triangle'
            })
          } else if (errorCode === 'auth/user-not-found') {
            Vue.toasted.show (
              errorMessage, {
              icon: 'exclamation-triangle'
            })
          } else if (errorCode === 'auth/too-many-requests') {
            Vue.toasted.show (
              errorMessage, {
              icon: 'exclamation-triangle'
            })
          }
        })
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
      } catch(e) {
          commit('setError')
          throw e
      }
    },
    async logout({commit}) {
      await firebase.auth().signOut()
      commit('clearInfo')
    },
    async updatePassword({commit}, email) {
      try {
        await firebase.auth().sendPasswordResetEmail(email)
      } catch(e) {
        commit('setError')
        throw e
      }
    }
  }
}
