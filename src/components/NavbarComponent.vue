<template>
  <div>
    <nav class="navbar navbar-expand-lg fixed-top">
      <div class="container">
        <a class="navbar-brand" href="#">BlogIT</a>
        <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ms-auto text-center">
            <li class="nav-item">
              <a class="nav-link active" href="#">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">About</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Portfolio</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Services</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Contact</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

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
              src="https://i.postimg.cc/bNQp0RDW/1.jpg"
              class="d-block w-100"
              alt="First slide"
          />
          <div class="carousel-caption d-none d-md-block">
            <h5>Slider One Item</h5>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime,
              nulla, tempore. Deserunt excepturi quas vero.
            </p>
          </div>
        </div>
        <div class="carousel-item">
          <img
              src="https://i.postimg.cc/pVzg3LWn/2.jpg"
              class="d-block w-100"
              alt="Second slide"
          />
          <div class="carousel-caption d-none d-md-block">
            <h5>Slider Two Item</h5>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime,
              nulla, tempore. Deserunt excepturi quas vero.
            </p>
          </div>
        </div>
        <div class="carousel-item">
          <img
              src="https://i.postimg.cc/0y2F6Gpp/3.jpg"
              class="d-block w-100"
              alt="Third slide"
          />
          <div class="carousel-caption d-none d-md-block">
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
  </div>
</template>

<script setup>
</script>

<style scoped lang="scss">
.navbar {
  background: transparent;
}

.navbar-brand {
  color: #fff !important;
  font-size: 25px;
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 2px;
}

.navbar-nav .nav-link {
  color: #fff !important;
  padding: 0.2rem 1rem;
  text-transform: uppercase;
  transition: color 0.2s;
}

.navbar-nav .nav-link.active,
.navbar-nav .nav-link:focus,
.navbar-nav .nav-link:hover {
  color: #0d6efd !important;
}

.navbar-toggler {
  border: none;
}

.navbar-toggler-icon {
  filter: invert(1);
}

.carousel-item img {
  width: 100%;
  height: 100vh;
  object-fit: cover;
}

.carousel-caption {
  bottom: 20%;

  h5 {
    font-size: 45px;
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-bottom: 0.5rem;
  }

  p {
    width: 75%;
    margin: auto;
    font-size: 18px;
    line-height: 1.9;
  }
}
</style>
