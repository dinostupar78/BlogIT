<script setup>
import Navbar from "@/components/Navbar.vue";
import Hero from "@/components/Hero.vue";
import Footer from "@/components/Footer.vue";


</script>

<template>
  <Navbar />
  <Hero />
  <div>
    <section class="section-block">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-md-6">
            <img src="../assets/images/blogitImage1.jpg" alt="Become a blogger" class="img-fluid img-padding" />
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
            <img src="../assets/images/blogitImage2.jpg" alt="About us" class="img-fluid img-padding" />
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
        <div class="row g-4">

          <div class="col-md-4">
            <div class="service-card h-100 p-4 text-center">
              <div class="icon-wrapper mb-4">
                <img src="../assets/images/blogitImageIpad.png" alt="Easy to use" />
              </div>
              <h5 class="service-title mb-3">Easy to use</h5>
              <p class="service-text mb-0">BlogIT is an easy site to write your stories</p>
            </div>
          </div>

          <div class="col-md-4">
            <div class="service-card h-100 p-4 text-center">
              <div class="icon-wrapper mb-4">
                <img src="../assets/images/blogitImageIphone.png" alt="For each device" />
              </div>
              <h5 class="service-title mb-3">For each device</h5>
              <p class="service-text mb-0">You can write your stories anytime, anywhere</p>
            </div>
          </div>

          <div class="col-md-4">
            <div class="service-card h-100 p-4 text-center">
              <div class="icon-wrapper mb-4">
                <img src="../assets/images/blogitImageMac.png" alt="And it's free!" />
              </div>
              <h5 class="service-title mb-3">And it's free!</h5>
              <p class="service-text mb-0">Sign up and become a part of the blogging community</p>
            </div>
          </div>

        </div>
      </div>
    </section>

  </div>
  <Footer />
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

  .service-card {
    transition: all 0.3s ease;
    border: none;
    border-radius: 15px;
    overflow: hidden;
    background: linear-gradient(145deg, #ffffff, #f3f3f3);
    box-shadow: 5px 5px 15px #d9d9d9, -5px -5px 15px #ffffff;

    &:hover {
      transform: translateY(-10px);
      box-shadow: 8px 8px 20px #d1d1d1, -8px -8px 20px #ffffff;
    }
  }

  .icon-wrapper {
    width: 80px;
    height: 80px;
    margin: 0 auto;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #fafafa, #eaeaea);

    img {
      max-width: 50%;
      height: auto;
    }
  }

  .service-title {
    color: #2d3748;
    font-weight: 600;
    font-size: 1.1rem;
  }

  .service-text {
    color: #718096;
    font-size: 0.95rem;
  }

  @media (max-width: 767px) {
    .service-card {
      padding: 2rem 1.5rem;
    }
  }
}

</style>
