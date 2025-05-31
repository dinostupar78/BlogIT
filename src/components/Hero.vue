<script>

</script>

<template>
  <div
      id="carouselExampleIndicators"
      class="carousel slide"
      data-bs-ride="carousel">
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
        <div class="carousel-caption ">
          <h5>Slider One Item</h5>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime,
            nulla, tempore. Deserunt excepturi quas vero.
          </p>
        </div>
      </div>
      <div class="carousel-item">
        <img
            src="../assets/images/blogitImageBg2.jpg"
            class="d-block w-100"
            alt="Second slide"
        />
        <div class="carousel-caption ">
          <h5>Slider Two Item</h5>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime,
            nulla, tempore. Deserunt excepturi quas vero.
          </p>
        </div>
      </div>
      <div class="carousel-item">
        <img
            src="../assets/images/blogitImageBg3.jpg"
            class="d-block w-100"
            alt="Third slide"
        />
        <div class="carousel-caption ">
          <h5>Slider Three Item</h5>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime,
            nulla, tempore. Deserunt excepturi quas vero.
          </p>
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
  filter: brightness(0.6);
}

.carousel-caption {
  bottom: 20%;

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

@media (max-width: 992px) {
  .carousel-item img {
    height: 70vh;
  }

  .carousel-caption {
    bottom: 18%;  /* move it up just a little */

    h5 {
      font-size: calc(1.25rem + 1vw);
    }

    p {
      font-size: calc(0.9rem + 0.5vw);
      width: 90%;
    }
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
}

</style>