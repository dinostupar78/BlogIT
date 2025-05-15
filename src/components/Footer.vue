<script setup>

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
            <li><a href="https://en.wikipedia.org/wiki/HTML">HTML</a></li>
            <li><a href="https://en.wikipedia.org/wiki/CSS">CSS</a></li>
            <li><a href="https://en.wikipedia.org/wiki/PHP">PHP</a></li>
            <li><a href="https://en.wikipedia.org/wiki/MySQL">MySQL</a></li>
          </ul>
        </div>

        <div class="col-md-3">
          <h6>Quick Links</h6>
          <ul class="footer-links">
            <li><a href="index.php">Home</a></li>
            <li><a href="login.php">User</a></li>
            <li><a href="blogs.php">Blogs</a></li>
            <li><a href="about.php">About</a></li>
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

</style>