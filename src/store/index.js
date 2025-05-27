import { createStore } from 'vuex'
import { auth, db } from '../firebase/firebaseConfig'
import { doc, getDoc, updateDoc } from 'firebase/firestore'

export default createStore({
    state: {
        blogHTML: 'Write your blog post here...',
        blogTitle: '',
        blogPhotoName: '',
        blogPhotoURL: null,
        blogPhotoPreview: null,
        user:              null,
        profileId:         null,
        profileEmail:      null,
        profileFirstName:  null,
        profileLastName:   null,
        profileUsername:   null,
        profileInitials:   null,
        profileAdmin:      null
    },
    mutations: {
        updateUser(state, user) {
            state.user = user
        },
        setProfileAdmin(state, isAdmin) {
            state.profileAdmin = isAdmin
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
        changeFirstName(state, value) {
            state.profileFirstName = value
        },
        changeLastName(state, value) {
            state.profileLastName = value
        },
        changeUsername(state, value) {
            state.profileUsername = value
        }
    },
    actions: {
        async getCurrentUser({ commit }, user) {
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
            const token = await user.getIdTokenResult();
            const admin = token.claims.admin;
            commit('setProfileAdmin', admin);
        },
        async updateUserSettings({ commit, state }) {
            const uid = auth.currentUser?.uid
            if (!uid) {
                console.error('No user signed in!')
                return
            }

            const userDocRef = doc(db, 'users', uid)
            const userData = {
                firstName: state.profileFirstName,
                lastName: state.profileLastName,
                username: state.profileUsername
            }

            try {
                await updateDoc(userDocRef, userData)
                commit('setProfileInitials')
            } catch (error) {
                console.error('Error updating user settings:', error)
            }
        }
    }

})
