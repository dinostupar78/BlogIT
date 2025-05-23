<script>
import { auth } from './firebase/firebaseConfig'
import { onAuthStateChanged } from 'firebase/auth';
import Loading from '@/components/Loading.vue';

export default {
  name: 'App',
  components: { Loading },
  data() {
    return { isLoading: false };
  },
  created() {
    onAuthStateChanged(auth, async (user) => {
      this.$store.commit('updateUser', user)

      if (user) {
        await this.$store.dispatch('getCurrentUser')
        console.log('✅ Vuex email:', this.$store.state.profileEmail)
      }
    })
  },
};
</script>

<template>
  <router-view />
<!--  <Loading v-if="isLoading" />-->
</template>

