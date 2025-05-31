<script >
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";


export default{
  computed: {

  },
  components: {
    Footer,
    Navbar,
  },
  data() {
    return{
      post: null,
      currentBlog: null,
    }
  },
  async created(){
    if (!this.$store.state.blogPosts.length) {
      await this.$store.dispatch("getPost");
    }
    this.post = this.$store.state.blogPosts.find(
        p => p.blogID === this.$route.params.blogid
    );
    this.loading = false;
  }

}

</script>

<template>
  <Navbar />

  <main class="post-view">
    <!-- Main logic: render post if it exists -->
    <article v-if="post" class="container">
      <h1 class="post-title">{{ post.blogTitle }}</h1>

      <div class="post-meta">
        <span class="post-category">{{ post.category }}</span> •
        <span class="post-date">
          {{ new Date(post.blogDate).toLocaleDateString("en-us", {dateStyle: "long"}) }}
        </span> •
        <span class="post-author">By {{ post.authorName || "Unknown" }}</span>
      </div>

      <img
          v-if="post.blogCoverPhoto"
          :src="post.blogCoverPhoto"
          alt="Cover photo"
          class="post-image"
      />

      <div class="post-content ql-editor" v-html="post.blogHTML"></div>
    </article>

    <!-- Fallback if post not found -->
    <div v-else class="error">Sorry, that post was not found.</div>
  </main>

  <Footer />
</template>

<style lang="scss">


</style>