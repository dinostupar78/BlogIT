<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
export default{
  name: 'BlogPreview',
  components: {
    Navbar,
    Footer
  },
  computed: {
    blogTitle() {
      return this.$store.state.blogTitle;
    },
    blogCategory() {
      return this.$store.state.blogCategory;
    },
    blogHTML() {
      return this.$store.state.blogHTML;
    },
    blogCoverPhoto() {
      return this.$store.state.blogPhotoURL;
    },
    postDate() {
      const d = new Date(this.$store.state.blogDate || Date.now());
      return d.toLocaleDateString();
    },
    author() {
      return this.$store.state.profileUsername || 'Unknown';
    }
  },
}
</script>

<template>
  <Navbar/>
  <article class="post-view">
    <div class="container">
      <h1 class="post-title">{{ blogTitle }}</h1>

      <div class="post-meta">
        <span class="post-category">{{ blogCategory }}</span>
        •
        <span class="post-date">{{ new Date(postDate).toLocaleDateString("en-us", {dateStyle: "long"}) }}</span>
        •
        <span class="post-author">By {{ author }}</span>
      </div>

      <img
          v-if="blogCoverPhoto"
          :src="blogCoverPhoto"
          alt="Cover Photo"
          class="post-image"
      />

      <div class="post-content ql-editor" v-html="blogHTML"></div>
    </div>
  </article>
  <Footer/>
</template>


<style lang="scss">
.post-view {
  background: #fff;
  color: #333;
  line-height: 1.6;
  font-family: 'Arial', sans-serif;
  margin-top: 60px;
  margin-bottom: 60px;

  .container {
    max-width: 720px;
    margin: 0 auto;
    padding: 3rem 1rem;

    .post-title {
      font-size: 2.5rem;
      font-weight: 300;
      margin-bottom: 0.75rem;
    }

    .post-meta {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      font-size: 0.9rem;
      margin-bottom: 1.5rem;

      .post-category {
        background: #505f79;
        color: #fff;
        padding: 4px 10px;
        border-radius: 4px;
        text-transform: uppercase;
        font-size: 0.75rem;
        font-weight: 600;
      }

      .post-date,
      .post-author {
        color: #888;
      }
    }

    .post-image {
      width: 100%;
      height: auto;
      margin-bottom: 1.5rem;
      border-radius: 4px;
      object-fit: cover;
      margin: 2rem 0;
    }

    .post-content {
      font-size: 1rem;
      color: #444;

      p {
        margin-bottom: 1.2rem;
      }

      h2, h3, h4 {
        margin: 1.8rem 0 1rem;
        font-weight: 400;
      }

      img {
        max-width: 100%;
        margin: 1.2rem 0;
      }

      blockquote {
        padding: 1rem;
        border-left: 4px solid #ccc;
        background: #f4f4f4;
        margin: 1.2rem 0;
      }

      pre {
        background: #2d2d2d;
        color: #e8e8e8;
        padding: 1rem;
        border-radius: 4px;
        overflow-x: auto;
        margin: 1.2rem 0;
      }

      ul, ol {
        margin: 1rem 0 1rem 1.5rem;
      }
    }
  }
}

</style>