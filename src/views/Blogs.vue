<script>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import newsImage from '../assets/images/blogitImage3.jpg';
import techImage from '../assets/images/blogitImage4.png';
import healthImage from '../assets/images/blogitImage5.jpg';
import lifestyleImage from '../assets/images/blogitImage6.png';
import financeImage from '../assets/images/blogitImage7.jpg';
import relationshipsImage from '../assets/images/blogitImage8.png';


export default{
  name: 'CategoryCard',
  components: {
    Navbar,
    Footer
  },
  data() {
    return {
      categories: [
        {
          name: "News",
          image: newsImage
        },
        {
          name: "Tech",
          image: techImage
        },
        {
          name: "Health",
          image: healthImage
        },
        {
          name: "Lifestyle",
          image: lifestyleImage
        },
        {
          name: "Finance",
          image: financeImage
        },
        {
          name: "Relationships",
          image: relationshipsImage
        },
      ]
    };
  }
}

</script>

<template>
  <div class="page">
    <Navbar />
    <main class="main-content">
      <section class="category-section">
        <div class="category-grid">
          <router-link
              v-for="cat in categories"
              :key="cat.name"
              :to="`/category/${cat.name.toLowerCase()}`"
              class="category-card"
              :style="{ backgroundImage: `url(${cat.image})` }"
          >
            <div class="overlay">
              <span class="label">{{ cat.name }}</span>
            </div>
          </router-link>
        </div>
      </section>
    </main>
    <Footer />
  </div>
</template>


<style  lang="scss">
body {
  background: #ebecf0;
  margin: 0;
  padding: 0;
  font-family: "Open Sans", sans-serif;
}

.page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  margin-top: 75px;
}

.main-content {
  flex: 1;
}

.category-section {
  padding: 4rem 1rem;
  display: flex;
  justify-content: center;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  width: 100%;
  max-width: 1200px;
}

.category-card {
  position: relative;
  height: 250px;
  border-radius: 10px;
  overflow: hidden;
  background-size: cover;
  background-position: center;
  transition: transform 0.4s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);

    .overlay {
      background-color: rgba(0, 0, 0, 0.4);
    }
  }

  .overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.25);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.3s ease;

    .label {
      color: #fff;
      font-size: 1.6rem;
      font-weight: 700;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.6);
    }
  }
}



</style>