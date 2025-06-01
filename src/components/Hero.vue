<script>

</script>

<template>
  <div
      id="carouselExampleIndicators"
      class="carousel slide"
      data-bs-ride="carousel"
      data-bs-interval="5000">

    <div class="carousel-indicators">
      <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="0"
          class="active"
          aria-current="true"
          aria-label="Slide 1"
      ></button>
      <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="1"
          aria-label="Slide 2"
      ></button>
      <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="2"
          aria-label="Slide 3"
      ></button>
    </div>
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img
            src="../assets/images/blogitImageBg1.jpg"
            class="d-block w-100"
            alt="First slide"
        />
        <div class="carousel-caption">
          <h5>Welcome to BlogIT</h5>
          <p>
            Discover the latest articles, stories and inspiration
            from the world of lifestyle, technology and personal growth.
          </p>
          <router-link to="/blogs" class="carousel-btn mt-3">
            Start Blogging Now
          </router-link>
        </div>
      </div>
      <div class="carousel-item">
        <img
            src="../assets/images/blogitImageBg2.jpg"
            class="d-block w-100"
            alt="Second slide"
        />
        <div class="carousel-caption ">
          <h5>Become a successful blogger</h5>
          <p>
            Everything you need in one place
          </p>
          <router-link to="/blogs" class="carousel-btn mt-3">
            Create Your Blog Today
          </router-link>
        </div>
      </div>
      <div class="carousel-item">
        <img
            src="../assets/images/blogitImageBg3.jpg"
            class="d-block w-100"
            alt="Third slide"
        />
        <div class="carousel-caption ">
          <h5>Everything about us</h5>
          <p>
            Everything you need to know about us is on one place
          </p>
          <router-link to="/about" class="carousel-btn mt-3">
            Find Here
          </router-link>
        </div>
      </div>
    </div>
    <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="prev"
    >
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="next"
    >
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>

</template>

<style scoped lang="scss">
.carousel-item img {
  width: 100%;
  height: 100vh;
  object-fit: cover;
  object-position: center;
  filter: brightness(0.4);
}

.carousel-caption {
  bottom: 25%;
  transform: translateY(-20px);
  font-family: "Times New Roman", serif;

  h5 {
    font-size: calc(1.5rem + 1vw);
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-bottom: 0.5rem;
  }

  p {
    font-size: calc(1rem + 0.5vw);
    width: 75%;
    margin: auto;
    line-height: 1.9;
  }
}

.carousel-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.4rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 0.5rem;
  background-color: #ffffff;
  color: #26272b;
  text-decoration: none;
  transition: background 0.3s, color 0.3s, transform 0.2s;
}

.carousel-btn:hover {
  background-color: #0d6efd;
  color: #ffffff;
  transform: scale(1.05);
}

.carousel-btn:active {
  transform: scale(0.98);
}

@media (max-width: 992px) {
  .carousel-item img {
    height: 70vh;
  }

  .carousel-caption {
    bottom: 20%;

    h5 {
      font-size: calc(1.25rem + 1vw);
    }

    p {
      font-size: calc(0.9rem + 0.5vw);
      width: 90%;
    }
  }
  .carousel-btn {
    font-size: 1rem;
    padding: 0.5rem 1.25rem;
  }
}

@media (max-width: 576px) {
  .carousel-item img {
    height: 50vh;
  }

  .carousel-caption {
    bottom: 10%;

    h5 {
      font-size: 1.5rem;
      letter-spacing: 1px;
    }

    p {
      font-size: 1rem;
      width: 100%;
      line-height: 1.6;
      padding: 0 1rem;
    }
  }

  .carousel-btn {
    font-size: 0.85rem;
    padding: 0.5rem 1rem;

  }
}

</style>