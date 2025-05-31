<script >
import { quillEditor } from 'vue3-quill';
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import CoverPreview from "@/components/CoverPreview.vue";
import Loading from "@/components/Loading.vue";
import Modal from "@/components/Modal.vue";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '@/firebase/firebaseConfig';
import { db } from '../firebase/firebaseConfig'
import {collection, doc, setDoc, updateDoc} from 'firebase/firestore';

export default{
  name: 'EditBlog',
  data() {
    return {
      error: null,
      errorMessage: null,
      file: null,
      loading: false,
      routeID: null,
      currentBlog: null,
      showModal: false,
      modalTitle: '',
      modalMessage: '',
      categories: ['News', 'Tech', 'Health', 'Lifestyle', 'Finance', 'Relationships'],

      editorSettings: {
        theme: 'snow',
        modules: {
          resize: {},
          imageUploader: {
            upload: file => this.quillImageUpload(file)
          }
        },
      },
    };
  },
  computed: {
    profileId() {
      return this.$store.state.profileId;
    },
    blogPhotoName() {
      return this.$store.state.blogPhotoName;
    },
    blogTitle: {
      get() {
        return this.$store.state.blogTitle;
      },
      set(value) {
        this.$store.commit('updateBlogTitle', value);
      }
    },
    blogCategory: {
      get() {
        return this.$store.state.blogCategory;
      },
      set(value) {
        this.$store.commit('updateBlogCategory', value);
      }
    },
    blogHTML: {
      get() {
        return this.$store.state.blogHTML;
      },
      set(html) {
        this.$store.commit('newBlogPost', html);
      }
    },
    blogCoverURL() {
      return this.$store.state.blogPhotoURL;
    }
  },
  components: {
    CoverPreview,
    Navbar,
    Loading,
    Footer,
    QuillEditor: quillEditor,
    Modal
  },
  async mounted() {
    this.routeID = this.$route.params.blogid;
    await this.$store.dispatch('getPost');
    this.currentBlog = this.$store.state.blogPosts.filter(post => {
      return post.blogID === this.routeID;
    });
    this.$store.commit('setBlogState', this.currentBlog[0]);
  },
  methods: {
    async handleCoverFileChange(){
      const file = this.$refs.blogPhoto.files[0]
      this.file = file;
      const url  = await this.uploadToFirebase(file)
      this.$store.commit('updateBlogPhotoURL', url)
      this.$store.commit('fileNameChange', file.name)
    },
    async quillImageUpload(file) {
      return await this.uploadToFirebase(file)
    },
    async uploadToFirebase(file) {
      try {
        const storageRef = ref(storage, `documents/blogPhotos/${file.name}`)
        await uploadBytes(storageRef, file)
        return await getDownloadURL(storageRef)
      } catch (e) {
        console.error(e)
        this.error = true
        this.errorMessage = 'Upload failed'
      }
    },
    openPreview() {
      this.$store.commit('openPhotoPreview')
    },
    async updateBlog() {
      if (!this.blogTitle || !this.blogHTML) {
        this.error = true;
        this.errorMessage = 'Please fill in title and content!';
        setTimeout(() => this.error = false, 5000);
        return;
      }
      this.loading = true;

      try {
        const postRef = doc(db, 'blogPosts', this.routeID)

        const updatedData = {
          blogTitle: this.blogTitle,
          blogHTML: this.blogHTML,
          category: this.blogCategory,
          authorName: this.$store.state.profileUsername,
          date: Date.now()
        }

        if (this.file) {
          const storageRef = ref(storage, `documents/blogPhotos/${this.file.name}`)
          await uploadBytes(storageRef, this.file)
          const url = await getDownloadURL(storageRef)
          updatedData.blogCoverPhoto = url
          updatedData.blogPhotoName   = this.file.name
        }

        await updateDoc(postRef, updatedData)

        this.$store.commit('filterBlogPost', this.routeID)
        this.$store.commit('prependBlogPost', {
          blogID: postRef.id,
          authorName: updatedData.authorName,
          blogTitle: updatedData.blogTitle,
          blogHTML: updatedData.blogHTML,
          category: updatedData.category,
          blogCoverPhoto:  updatedData.blogCoverPhoto || this.$store.state.blogPhotoURL,
          blogPhotoName:   updatedData.blogPhotoName  || this.$store.state.blogPhotoName,
          blogDate: updatedData.date
        })

        this.loading = false;
        this.$router.push({ name: 'ViewBlog', params: { blogid: postRef.id } })
      } catch (error) {
        this.loading = false;
        this.error = true;
        this.errorMessage = 'Failed to save changes.';
        setTimeout(() => this.error = false, 5000);
      }
    },
    attemptPreview() {
      if (!this.blogTitle || !this.blogHTML || !this.blogCategory || !this.$store.state.blogPhotoURL) {
        this.modalTitle = "Missing Fields";
        this.modalMessage = "Please fill in all fields before previewing your post.";
        this.showModal = true;
        return;
      }
      this.$router.push({ name: 'BlogPreview' });
    },
    closeModal() {
      this.showModal = false;
    }
  },
}

</script>

<template>
  <Navbar />
  <Loading v-show="loading"/>
  <div class="create-post">
    <CoverPreview v-show="this.$store.state.blogPhotoPreview" :image="blogCoverURL"/>
    <Modal
        v-if="showModal"
        :modal-title="modalTitle"
        :modal-message="modalMessage"
        @close-modal="closeModal"/>
    <div class="container">
      <div :class="{invisible: !error}" class="error-message">
        <p><span>Error:</span>{{ this.errorMessage }}</p>
      </div>

      <!-- Title -->
      <input
          type="text"
          placeholder="Enter Blog Title"
          v-model="blogTitle"
          class="blog-title"
      />

      <!-- Upload Row -->
      <div class="upload-row">
        <label for="blog-photo" class="pill-button">Upload Cover Photo</label>
        <input
            type="file"
            ref="blogPhoto"
            id="blog-photo"
            @change="handleCoverFileChange"
            accept=".png, .jpg, .jpeg"
        />

        <button
            @click="openPreview"
            class="pill-button"
            :class="{ 'button-inactive': !$store.state.blogPhotoURL }">
          Preview Photo
        </button>
        <span class="file-name">
          File chosen: {{ $store.state.blogPhotoName }}
        </span>
      </div>

      <!-- Category Selection -->
      <div class="category-select">
        <label for="category">Category:</label>
        <select id="category" v-model="blogCategory">
          <option disabled value="">Select a category</option>
          <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
        </select>
      </div>

      <!-- Quill Editor -->
      <div class="editor">
        <QuillEditor
            contentType="html"
            :options="editorSettings"
            v-model:value="blogHTML"


        />
      </div>

      <!-- Actions -->
      <div class="blog-actions">
        <button @click="updateBlog">Save Changes</button>
        <button
            class="router-button"
            @click="attemptPreview">
          Preview Changes
        </button>
      </div>
    </div>
  </div>
  <Footer />
</template>


<style scoped lang="scss">
.create-post {
  position: relative;
  min-height: 100vh;
  padding: 3rem 4vw;
  font-family: 'Inter', sans-serif;
  background: url('https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg') no-repeat center center;
  background-size: cover;
  color: #f1f1f1;
  z-index: 0;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 0;
  }

  .container {
    position: relative;
    z-index: 1;
    max-width: 1000px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 2rem;

    .invisible {
      opacity: 0;
    }
  }

  .blog-title {
    font-size: 3.5rem;
    font-weight: 700;
    color: #fff;
    background: transparent;
    border: none;
    border-bottom: 2px solid rgba(255, 255, 255, 0.4);
    outline: none;
    width: 100%;
    max-width: 900px;
    line-height: 1.2;
    margin-top: 2rem;
    margin-bottom: 1rem;
    padding: 0.5rem 0;
    transition: border-color 0.3s ease;

    &::placeholder {
      color: rgba(255, 255, 255, 0.5);
      font-style: italic;
      font-weight: 400;
    }

    &:focus {
      border-color: rgba(255, 255, 255, 0.9);
    }

    &:focus::placeholder {
      color: rgba(255, 255, 255, 0.2);
    }
  }

  .upload-row {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    align-items: center;

    label,
    .pill-button {
      background: #26272b;
      color: #fff;
      padding: 0.7rem 1.5rem;
      border-radius: 999px;
      border: none;
      font-weight: 600;
      font-size: 0.9rem;
      cursor: pointer;
      text-decoration: none;
      transition: background 0.2s ease;

      &:hover {
        background: #565656;
      }

      &.button-inactive {
        background: #888;
        color: #eee;
        cursor: not-allowed;
      }
    }


    input[type='file'] {
      display: none;
    }

    .file-name {
      font-size: 0.85rem;
      color: #ccc;
    }
  }

  .category-select {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    color: #fff;

    select {
      padding: 0.6rem 1rem;
      border-radius: 8px;
      border: 1px solid #ccc;
      background: #fff;
      color: #000;
      font-size: 1rem;
      max-width: 300px;
    }
  }

  .editor {
    :deep(.ql-toolbar) {
      background: #f9f9f9;
      border: 1px solid #ccc;
      border-radius: 12px 12px 0 0;
      padding: 0.75rem 1rem;

      button {
        border-radius: 6px;
        transition: background 0.2s;
        &:hover {
          background: #eee;
        }
      }
    }

    :deep(.ql-container) {
      border: 1px solid #ccc;
      border-top: none;
      border-radius: 0 0 12px 12px;
      background: #fff;
      height: 400px;
      overflow-y: auto;
      font-size: 1.1rem;
      color: #000;
    }

    :deep(.ql-editor) {
      height: 100%;
      overflow-y: auto;
    }
  }


  .blog-actions {
    display: flex;
    justify-content: flex-end;
    flex-wrap: wrap;
    gap: 1rem;

    button,
    .router-button {
      background: #26272b;
      color: #fff;
      padding: 0.7rem 1.5rem;
      border-radius: 999px;
      border: none;
      font-weight: 600;
      font-size: 0.9rem;
      cursor: pointer;
      text-decoration: none;
      transition: background 0.2s;

      &:hover {
        background: #565656;
      }
    }
  }
}

</style>