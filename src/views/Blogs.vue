<script>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';

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
          image: "https://media.istockphoto.com/id/1345527119/video/graphical-modern-digital-world-news-studio-loop-background.jpg?s=640x640&k=20&c=cr1SYYf7Dix-TgBqiYRLquAmi7TgEE3oZcMUExQ25QY="
        },
        {
          name: "Tech",
          image: "https://img.freepik.com/free-photo/programming-background-with-person-working-with-codes-computer_23-2150010130.jpg"
        },
        {
          name: "Health",
          image: "https://media.istockphoto.com/id/1441759606/photo/happy-sportswoman-with-earbuds-running-in-the-park.jpg?s=612x612&w=0&k=20&c=_RHiYpQFiZRxESWzCsr8k9SsOr-T-Qj3OcpINB1aVrg="
        },
        {
          name: "Lifestyle",
          image: "https://img.freepik.com/free-photo/face-hair-lifestyle-person-background_1157-3981.jpg"
        },
        {
          name: "Finance",
          image: "https://cdn.dribbble.com/userupload/43316533/file/original-0b6bc285d7735953c1d5db136ff97953.png?resize=1024x682&vertical=center"
        },
        {
          name: "Relationships",
          image: "https://images.squarespace-cdn.com/content/v1/5d533f3bb35a660001611ed6/1393d527-3a37-4f4c-b37b-e7e120e12667/Building+a+Happy%2C+Healthy+Relationship+That+Lasts.png"
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