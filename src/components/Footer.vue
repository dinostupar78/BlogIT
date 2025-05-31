<script>

export default {
  name: "Footer",
  data() {
    return {};
  },
  methods: {
    handleHomeClick() {
      if (this.$route.name === 'Home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        this.$router.push({ name: 'Home' });
      }
    }
  }
};

</script>

<template>
  <footer class="blogit-footer">
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <h6 id="about">About</h6>
          <p class="text-justify">
            <i>BlogIT WANTS TO BE SIMPLE</i> - BlogIT is a free platform for writing your own stories.
          </p>
        </div>

        <div class="col-md-3">
          <h6>Categories</h6>
          <ul class="footer-links">
            <li><router-link to="/category/news" @click.prevent="handleHomeClick">News</router-link></li>
            <li><router-link to="/category/tech">Tech</router-link></li>
            <li><router-link to="/category/health">Health</router-link></li>
            <li><router-link to="/category/lifestyle">Lifestyle</router-link></li>
            <li><router-link to="/category/finance">Finance</router-link></li>
            <li><router-link to="/category/relationships">Relationships</router-link></li>

          </ul>
        </div>

        <div class="col-md-3">
          <h6>Quick Links</h6>
          <ul class="footer-links">
            <li>
              <router-link
                  to="/"
                  class="footer-home-link"
                  @click.prevent="handleHomeClick"
              >Home</router-link>
            </li>
            <li>
              <router-link to="/blogs">Blogs</router-link>
            </li>
            <li>
              <router-link to="/about">About</router-link>
            </li>
            <li v-if="$store.state.user">
              <router-link to="/create-post">Create Blog</router-link>
            </li>
            <li v-else>
              <router-link to="/login">Sign In</router-link>
            </li>
          </ul>
        </div>
      </div>
      <hr>
      <div class="row">
        <div class="col-md-8 col-sm-6">
          <p class="copyright-text">Copyright &copy; 2025 All Rights Reserved by BlogIT.</p>
        </div>
      </div>
    </div>
  </footer>

</template>

<style scoped lang="scss">
.blogit-footer {
  background-color: #26272b;
  color: #bbb;
  padding: 45px 0 20px;
  font-size: 15px;
  line-height: 24px;

  h6 {
    color: #fff;
    font-size: 16px;
    text-transform: uppercase;
    margin-bottom: 20px;
    letter-spacing: 2px;
  }

  p {
    color: #bbb;
  }

  .footer-links {
    list-style: none;
    padding-left: 0;

    li {
      margin-bottom: 5px;

      a {
        color: #bbb;
        text-decoration: none;
        transition: color 0.3s;

        &:hover {
          color: #0d6efd;
        }
      }
    }
  }

  hr {
    border-top: 1px solid #bbb;
  }

  .copyright-text {
    margin: 0;
    font-size: 14px;
  }
}

@media (max-width: 768px) {
  .footer-links a.router-link-active,
  .footer-links a.router-link-exact-active {
    color: #bbb !important;
    cursor: default;
  }

  .footer-links a:focus,
  .footer-links a:active {
    color: #bbb !important;
    outline: none;
    box-shadow: none;
  }
}

</style>