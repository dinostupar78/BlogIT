<script >
import Navbar from "@/components/Navbar.vue";
import Hero from "@/components/Hero.vue";
import Footer from "@/components/Footer.vue";
import BlogCard from "@/components/BlogCard.vue";
import BlogPost from "@/components/BlogPost.vue";
import {auth, db} from '@/firebase/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

export default {
  name: 'Home',
  components: {
    BlogCard,
    BlogPost,
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
      isAdmin: false,
      screenData: {
        title: "Welcome!",
        blogPost:
            "Weekly blog articles with all things programming including HTML, CSS, JavaScript and more. Register today to never miss a post!",
        photo: "welcome-image",
      },
    };
  },
  methods: {
  },
  computed: {
    blogPostsCards(){
      return this.$store.getters.blogPostsCards
    },
    blogPostsFeed(){
      return this.$store.getters.blogPostsFeed2
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
        <section id="home-icons" class="py-5">
          <div class="container">
            <div class="row mb-4 g-4">
              <!-- Card 1 -->
              <div class="col-md-4 col-sm-6 col-12">
                <div class="icon-card text-center">
                  <div class="card-body">
                    <img src="../assets/images/blogitImageIpad.png" alt="Easy to use icon" class="icon-img" />
                    <h5 class="card-title mt-3">Easy to use</h5>
                    <p class="card-text">
                      BlogIT is an easy site to write your stories
                    </p>
                  </div>
                </div>
              </div>

              <!-- Card 2 -->
              <div class="col-md-4 col-sm-6 col-12">
                <div class="icon-card text-center">
                  <div class="card-body">
                    <img src="../assets/images/blogitImageIphone.png" alt="For each device icon" class="icon-img" />
                    <h5 class="card-title mt-3">For each device</h5>
                    <p class="card-text">
                      You can write your stories anytime, anywhere
                    </p>
                  </div>
                </div>
              </div>

              <!-- Card 3 -->
              <div class="col-md-4 col-sm-6 col-12">
                <div class="icon-card text-center">
                  <div class="card-body">
                    <img src="../assets/images/blogitImageMac.png" alt="And it's free icon" class="icon-img" />
                    <h5 class="card-title mt-3">And it's free!</h5>
                    <p class="card-text">
                      Sign up and become a part of the blogging community
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <h3>Recent Blogs</h3>
        <BlogPost
            v-for="(post, index) in blogPostsCards"
            :key="post.blogID"
            :postId="post.blogID"
            :title="post.blogTitle"
            :date="post.blogDate"
            :tag="post.category"
            :image="post.blogCoverPhoto"
            :authorName="post.authorName"
            :blogHTML="post.blogHTML"
            :reverseLayout="index % 2 === 1"
        />

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
              v-for="post in blogPostsCards"
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
    gap: 2rem;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    justify-items: center;
    padding: 0 1rem;
    max-width: 1200px;
    margin: 0 auto 64px auto;
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

#home-icons .icon-card {
  background: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 0.75rem;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;
  padding: 1.5rem 1rem;
}

/* Hover effect */
#home-icons .icon-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.12);
  background-color: #f9f9f9;
}

/* Icon image sizing */
#home-icons .icon-img {
  max-width: 80px;
  width: 100%;
  height: auto;
  margin-bottom: 0.75rem;
  display: inline-block;
}

/* Title & text */
#home-icons .card-title {
  font-size: 1.25rem;
  font-weight: 500;
  color: #333333;
}

#home-icons .card-text {
  font-size: 0.95rem;
  color: #555555;
  margin-top: 0.5rem;
}

/* Optional: ensure equal‐height cards if some text is longer */
@media (min-width: 576px) {
  #home-icons .col-sm-6,
  #home-icons .col-md-4 {
    display: flex;
  }
  #home-icons .icon-card {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}

/* Media query tweaks (Bootstrap handles most, but you can adjust if needed) */
@media (max-width: 767.98px) {
  /* On small devices, reduce card padding a bit */
  #home-icons .icon-card {
    padding: 1.25rem 0.75rem;
  }
  #home-icons .card-title {
    font-size: 1.15rem;
  }
  #home-icons .card-text {
    font-size: 0.9rem; /* 0.9rem for smaller text */
  }
}

@media (max-width: 575.98px) {
  /* On extra‐small phones, shrink icons slightly */
  #home-icons .icon-img {
    max-width: 60px;
    margin-bottom: 0.5rem;
  }
}

</style>
