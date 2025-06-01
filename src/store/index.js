import { createStore } from 'vuex'
import { auth, db } from '../firebase/firebaseConfig'
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore'
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

export default createStore({
    state: {
        blogPosts: [],
        postLoaded: null,
        blogHTML: '',
        blogTitle: '',
        blogCategory: '',
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
        loading:           false,
    },
    getters: {
        blogPostsCards(state){
            return state.blogPosts.slice(0, 3);
        },
        blogPostsFeed(state){
            return state.blogPosts.slice(3, 6);
        }
    },
    mutations: {
        setLoading(state, value) {
            state.loading = value
        },
        prependBlogPost(state, post) {
            state.blogPosts.unshift(post)
        },
        newBlogPost(state, value) {
            state.blogHTML = value;
        },
        updateBlogTitle(state, value) {
            state.blogTitle = value;
        },
        updateBlogCategory(state, category) {
            state.blogCategory = category;
        },
        setBlogState(state, value) {
            state.blogTitle = value.blogTitle;
            state.blogHTML = value.blogHTML;
            state.blogCategory = value.category;
            state.blogPhotoName = value.blogPhotoName;
            state.blogPhotoURL = value.blogCoverPhoto;
            state.blogPhotoPreview = value.blogPhotoPreview;


        },
        filterBlogPost(state, value) {
            state.blogPosts = state.blogPosts.filter(post => post.blogID !== value);
        },
        fileNameChange(state, value) {
            state.blogPhotoName = value;
        },
        createFileURL(state, value) {
            state.blogPhotoURL = value;
        },
        updateBlogPhotoURL(state, url) {
            state.blogPhotoURL = url;
        },
        openPhotoPreview(state) {
            state.blogPhotoPreview = !state.blogPhotoPreview;
        },
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
        async getCurrentUser({ commit }) {
            const user = auth.currentUser;
            if (!user) {
                console.error('No user signed in!');
                return;
            }

            const uid = user.uid;
            const userDocRef = doc(db, 'users', uid)
            const snapshot   = await getDoc(userDocRef)

            if (!snapshot.exists()) {
                console.error('User document not found!')
                return
            }

            commit('setProfileInfo', snapshot)
            commit('setProfileInitials')

        },
        async updateUserSettings({ commit, state }) {
            const user = auth.currentUser;
            if (!user) {
                console.error('No user signed in!');
                return;
            }

            const userDocRef = doc(db, 'users', user.uid)
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
        },
        async getPost({ state }) {
            try {
                const postsCol = collection(db, 'blogPosts');
                const postsQuery = query(postsCol, orderBy('date', 'desc'));
                const snapshot = await getDocs(postsQuery);
                snapshot.forEach(docSnap => {
                    if (!state.blogPosts.some(p => p.blogID === docSnap.id)) {
                        const d = docSnap.data();
                        state.blogPosts.push({
                            blogID:          docSnap.id,
                            blogHTML:        d.blogHTML,
                            blogTitle:       d.blogTitle,
                            blogCoverPhoto:  d.blogCoverPhoto,
                            blogPhotoName:   d.blogCoverPhotoName,
                            category:        d.category,
                            blogDate:        d.date,
                            authorName:      d.authorName,

                        });
                    }
                });

                state.postLoaded = true;
                console.log(state.blogPosts);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        },
        async updatePost({ commit }, post) {
            const postRef = doc(db, 'blogPosts', post.blogID)

            const firestorePayload = {
                blogHTML:             post.blogHTML,
                blogTitle:            post.blogTitle,
                blogCoverPhoto:       post.blogCoverPhoto,
                blogCoverPhotoName:   post.blogCoverPhotoName,  // your Firestore field
                category:             post.category,
                date:                 post.date,
                authorName:           post.authorName
            }
            await updateDoc(postRef, firestorePayload)

            const newPost = {
                blogID:          post.blogID,
                blogHTML:        post.blogHTML,
                blogTitle:       post.blogTitle,
                blogCoverPhoto:  post.blogCoverPhoto,
                blogCoverPhotoName:   post.blogCoverPhotoName,
                category:        post.category,
                authorName:      post.authorName,
                blogDate:        post.date
            }

            commit('filterBlogPost', post.blogID)
            commit('prependBlogPost', newPost)
        },
        async deletePost({commit}, postId){
            const postRef = doc(db, 'blogPosts', postId)
            await deleteDoc(postRef)
            commit('filterBlogPost', postId)

        }
    }


})
