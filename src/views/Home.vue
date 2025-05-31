<script >
import Navbar from "@/components/Navbar.vue";
import Hero from "@/components/Hero.vue";
import Footer from "@/components/Footer.vue";
import BlogCard from "@/components/BlogCard.vue";
import {auth, db} from '@/firebase/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

export default {
  name: 'Home',
  components: {
    BlogCard,
    Navbar,
    Hero,
    Footer
  },
  mounted() {
    this.$store.dispatch('getPost')

    onAuthStateChanged(auth, async user => {
      if (user) {
        try {
          const userSnap = await getDoc(
              doc(db, 'users', user.uid)
          );
          if (userSnap.exists() && userSnap.data().admin === true) {
            this.isAdmin = true;
          } else {
            this.isAdmin = false;
          }
        } catch (err) {
          console.error('Error checking admin field:', err);
          this.isAdmin = false;
        }
      } else {
        this.isAdmin = false;
      }
    });
  },
  data() {
    return {
      isEditing: false,
      isAdmin: false
    };
  },
  methods: {
  },
  computed: {
    recentPosts() {
      return this.$store.getters.blogPostsFeed
    }

  }
}


</script>

<template>
  <Navbar />
  <Hero />
  <div>


    <div class="blog-card-wrap">
      <div class="container">
        <h3>View More Recent Blogs</h3>
        <div class="toggle-edit-container" v-if="isAdmin">
          <span class="toggle-label">Toggle Editing Post</span>
          <label class="switch">
            <input type="checkbox" v-model="isEditing" />
            <span class="slider"></span>
          </label>
        </div>
        <div class="blog-cards">
          <BlogCard
              v-for="post in recentPosts"
              :key="post.blogID"
              :post-id="post.blogID"
              :title="post.blogTitle"
              :date="post.blogDate"
              :author="post.authorName"
              :tag="post.category"
              :image="post.blogCoverPhoto"
              :author-name="post.authorName"
              :editing="isEditing"
          />
        </div>
      </div>
    </div>

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

.blog-card-wrap {
  h3 {
    font-weight: 300;
    font-size: 30px;
    text-align: center;
    font-family: "Times New Roman", serif;
    margin-top: 2rem;
    margin-bottom: 1.5rem;
  }

  .blog-cards {
    display: grid;
    gap: 1.5rem;
    grid-template-columns: repeat(auto-fit, minmax(275px, 1fr));
    overflow-x: unset;
    align-items: start;
    margin-bottom: 64px;
  }

  .toggle-edit-container {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1rem;
  }

  .toggle-label {
    font-family: "Times New Roman", serif;
    font-size: 20px;
    color: #333;
  }

  .switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 30px;
  }

  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #303030;
    transition: 0.4s;
    border-radius: 34px;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 22px;
    width: 22px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }

  .switch input:checked + .slider {
    background-color: #4CAF50;
  }

  .switch input:checked + .slider:before {
    transform: translateX(30px);
  }

  @media (max-width: 600px) {
    .toggle-edit-container {
      justify-content: center;
      gap: 0.5rem;
    }

    .toggle-label {
      font-size: 18px;
      text-align: center;
    }

    .switch {
      width: 50px;
      height: 26px;
    }

    .slider:before {
      height: 18px;
      width: 18px;
      left: 4px;
      bottom: 4px;
    }

    .switch input:checked + .slider:before {
      transform: translateX(24px);
    }
  }
}

</style>
