import { createStore } from 'vuex'
import { auth, db } from '../firebase/firebaseConfig'
import { doc, getDoc } from 'firebase/firestore'



export default createStore({
    state: {
        user:              null,
        profileId:         null,
        profileEmail:      null,
        profileFirstName:  null,
        profileLastName:   null,
        profileUsername:   null,
        profileInitials:   null,
    },
    mutations: {
        updateUser(state, user) {
            state.user = user
        },
        setProfileInfo(state, doc) {
            const d = doc.data()
            state.profileId = doc.id
            state.profileEmail = d.email
            state.profileFirstName = d.firstName
            state.profileLastName = d.lastName
            state.profileUsername = d.username
        },
        setProfileInitials(state) {
            state.profileInitials =
                state.profileFirstName.match(/\b\S/g).join('') +
                state.profileLastName.match(/\b\S/g).join('')
        },
    },
    actions: {
        async getCurrentUser({ commit }) {
            const uid = auth.currentUser?.uid
            if (!uid) {
                console.error('No user signed in!')
                return
            }

            const userDocRef = doc(db, 'users', uid)
            const snapshot   = await getDoc(userDocRef)

            if (!snapshot.exists()) {
                console.error('User document not found!')
                return
            }

            commit('setProfileInfo', snapshot)
            commit('setProfileInitials')
        }
    }

})
