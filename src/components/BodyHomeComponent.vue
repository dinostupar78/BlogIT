<script setup>
</script>

<template>
  <div>
    <section class="section-block">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-md-6">
            <img src="../assets/images/img1.jpg" alt="Become a blogger" class="img-fluid img-padding" />
          </div>
          <div class="col-md-6 text-block">
            <h3>Become a successful blogger</h3>
            <p>Everything you need in one place</p>
            <a href="login.php" class="btn btn-outline-dark">Create your free BlogIT blog today</a>
          </div>
        </div>
      </div>
    </section>

    <section class="section-block ">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-md-6">
            <img src="../assets/images/img2.jpg" alt="About us" class="img-fluid img-padding" />
          </div>
          <div class="col-md-6 text-block">
            <h3>Everything about us</h3>
            <p>Everything you need to know about us is in one place</p>
            <a href="about.php" class="btn btn-outline-dark">Find Here</a>
          </div>
        </div>
      </div>
    </section>

    <section id="home-icons" class="py-5">
      <div class="container">

        <div class="row mb-4">
          <div class="col-md-4">
            <div class="card text-dark text-center">
              <div class="card-body">
                <img src="../assets/images/ipad.png" alt="Easy to use" />
                <h5 class="card-title">Easy to use</h5>
                <p class="card-text">BlogIT is an easy site to write your stories</p>
              </div>
            </div>
          </div>

          <div class="col-md-4">
            <div class="card text-dark text-center">
              <div class="card-body">
                <img src="../assets/images/iphone.png" alt="For each device" />
                <h5 class="card-title">For each device</h5>
                <p class="card-text">You can write your stories anytime, anywhere</p>
              </div>
            </div>
          </div>

          <div class="col-md-4">
            <div class="card text-dark text-center">
              <div class="card-body">
                <img src="../assets/images/imac.png" alt="And it's free!" />
                <h5 class="card-title">And it's free!</h5>
                <p class="card-text">Sign up and become a part of the blogging community</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.section-block {
  padding: 100px 0;
  min-height: 400px;

  .img-padding {
    padding-top: 30px;
  }

  .text-block {
    h3 {
      margin-bottom: 10px;
    }

    p {
      margin-bottom: 15px;
    }

    .btn {
      margin-top: 10px;
    }
  }
}

#home-icons {
  .card {
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 10px;
    transition: transform 0.3s ease-in-out;
    padding: 20px;

    img {
      margin-bottom: 15px;
      width: 50px;
      height: auto;
    }

    .card-title {
      font-weight: bold;
      font-size: 18px;
    }

    .card-text {
      font-size: 15px;
    }
  }
}
</style>
