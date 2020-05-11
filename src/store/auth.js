import firebase from 'firebase/app'
import Vue from 'vue'

export default {
  actions: {
    async register({commit, dispatch}, credentials) {
      try {
        const email = credentials.email
        const password = credentials.password
        const firstName = credentials.firstName
        const lastName = credentials.lastName
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        const uid = await dispatch('getUid')
        await firebase.database().ref(`/users/${uid}/info`).set({firstName, lastName})

      } catch (e) {
        console.log(e)
        let errorCode = e.code
        let errorMessage = e.message

        if (errorCode === 'auth/email-already-in-use') {
          Vue.toasted.show (
            errorMessage, {
            icon: 'exclamation-triangle'
          })
        }
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
          console.log(error)
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
          console.log(e)
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
