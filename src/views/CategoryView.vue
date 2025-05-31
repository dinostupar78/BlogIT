<script>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import BlogCard from '@/components/BlogCard.vue'
import {auth, db} from '@/firebase/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

export default {
  name: 'CategoryView',
  components: {
    Navbar,
    Footer,
    BlogCard
  },
  props: ['name'],
  data() {
    return {
      isEditing: false,
      isAdmin: false
    }
  },
  computed: {
    formattedName() {
      return this.name.charAt(0).toUpperCase() + this.name.slice(1).toLowerCase();
    },
    filteredPosts() {
      return this.$store.state.blogPosts.filter(
          post => post.category?.toLowerCase() === this.name.toLowerCase()
      )
    }
  },
  mounted() {
    if (!this.$store.state.blogPosts.length) {
      this.$store.dispatch('getPost')
    }

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
  }
}

</script>

<template>
  <div class="page">
    <Navbar />
    <main class="main-content">
      <section class="blog-card-wrap">
        <div class="container">
          <h3>{{ formattedName }} Blogs</h3>
          <div class="toggle-edit-container" v-if="isAdmin">
            <span class="toggle-label">Toggle Editing Post</span>
            <label class="switch">
              <input type="checkbox" v-model="isEditing" />
              <span class="slider"></span>
            </label>
          </div>
          <div class="blog-cards">
            <BlogCard
                v-for="post in filteredPosts"
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
      </section>
    </main>
    <Footer />
  </div>
</template>

<style scoped lang="scss">
.page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  margin-top: 125px;
}

.main-content {
  flex: 1;
}

.blog-card-wrap {
  h3 {
    font-size: 36px;
    text-align: center;
    font-family: "Times New Roman", serif;
  }

  .blog-cards {
    display: grid;
    gap: 1.5rem;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    overflow-x: unset;
    align-items: start;
    margin-bottom: 64px;
  }
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

</style>