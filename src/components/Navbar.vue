<script setup>

import { ref, onMounted, onUnmounted } from 'vue'
const isScrolled = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <nav :class="['navbar navbar-expand-lg fixed-top', { 'navbar-scrolled': isScrolled }]">
    <div class="container">
      <router-link class="navbar-brand d-flex align-items-center gap-2" :to="{ name: 'Home' }">
        <img src="../assets/images/blogitLogo.png" class="logo-img" />
        <span>BLOGIT</span>
      </router-link>
      <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ms-auto align-items-center">
          <li class="nav-item">
            <router-link class="nav-link active" :to="{ name: 'Home' }">Home</router-link>
          </li>
<!--          <li class="nav-item">-->
<!--            <router-link class="nav-link" :to="{ name: 'Add Blog' }">Add Blog</router-link>-->
<!--          </li>-->
<!--          <li class="nav-item">-->
<!--            <router-link class="nav-link" :to="{ name: 'About' }">About</router-link>-->
<!--          </li>-->
<!--          <li class="nav-item">-->
<!--            <router-link class="nav-link" :to="{ name: 'Contact' }">Contact</router-link>-->
<!--          </li>-->
          <li class="nav-item ms-lg-3">
            <button class="social-pill">
              <img src="../assets/images/blogitIcon.png" alt="User Icon" class="social-pill__icon" />
              Login/Register
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>


<script setup>
</script>

<style scoped lang="scss">
.navbar {
  background: transparent;
  transition: background-color 0.3s, box-shadow 0.3s;
  padding: 0.5rem 1rem;

  &.navbar-scrolled {
    background: #26272b;
    box-shadow: 0 2px 10px rgba(0,0,0,0.15);
  }
}

.navbar-brand {
  color: #fff;
  font-weight: bold;
  letter-spacing: 2px;
  text-decoration: none;

  &:hover,
  &:focus,
  &:active {
    color: #fff;
    text-decoration: none;
    opacity: 1;
    filter: none;
  }
}

.logo-img {
  height: 40px;
  width: auto;
  margin-right: -6px;
  filter: none;
  transition: none;
}

.navbar-nav {
  .nav-item {
    & + .nav-item { margin-left: 0.5rem; }

    .nav-link {
      color: #fff;
      padding: 0.5rem 0.5rem;
      text-transform: uppercase;
      font-size: 1rem;
      transition: color 0.2s;

      &.active,
      &:hover {
        color: #0d6efd;
      }
    }
  }
}

.navbar-toggler {
  border: none;
}

.navbar-toggler-icon {
  filter: invert(1);
}

.social-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem 1rem;
  border: none;
  border-radius: 30px;
  background: #fff;
  color: #333;
  font-size: 0.9rem;
  font-weight: 500;
  transition: transform 0.2s, box-shadow 0.2s;

  &__icon {
    width: 1rem;
    height: 1rem;
    object-fit: contain;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  }
}

@media (max-width: 991px) {
  .navbar {
    background: #26272b;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
  }

  .navbar-nav {
    .nav-item.ms-lg-3 {
      width: 100%;
      text-align: center;

      .social-pill {
        width: 80%;
        max-width: 300px;
        justify-content: center;
        margin: 0 auto;
      }
    }
  }
}




</style>
