<script>
import { auth } from './firebase/firebaseConfig'
import { onAuthStateChanged } from 'firebase/auth';
import { mapState } from 'vuex'
import Loading from '@/components/Loading.vue';


export default {
  name: 'App',
  components: {
    Loading
  },
  computed: {
    ...mapState(['loading'])
  },
  async created() {

    onAuthStateChanged(auth, async (user) => {
      this.$store.commit('updateUser', user)

      if (user) {
        await this.$store.dispatch('getCurrentUser', user)
      }
    });
    this.$store.dispatch('getPost');
  },

};
</script>

<template>
  <Loading v-if="loading" />
  <router-view />
</template>

