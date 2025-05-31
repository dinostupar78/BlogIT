<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "About",
  components: {
    Navbar,
    Footer
  },
  data() {
    return {};
  },
  mounted() {
    // Any initialization logic can go here
  },
  methods: {
    // Define any methods if needed
  }
};
</script>

<template>
  <div id="app">
    <Navbar />
    <main class="main-content">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<style scoped lang="scss">
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
}
</style>