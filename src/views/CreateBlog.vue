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
import { collection, doc, setDoc } from 'firebase/firestore';

export default{
  name: 'CreateBlog',
  data() {
    return {
      error: null,
      errorMessage: null,
      file: null,
      loading: false,
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
    async uploadBlog() {
      if (!this.blogTitle || !this.blogHTML) {
        this.error = true;
        this.errorMessage = 'Please fill in title and content!';
        setTimeout(() => this.error = false, 5000);
        return;
      }
      const coverUrl = this.$store.state.blogPhotoURL;
      if (!coverUrl) {
        this.error = true;
        this.errorMessage = 'Upload a cover photo first!';
        setTimeout(() => this.error = false, 5000);
        return;
      }

      try {
        const timestamp = Date.now();
        this.loading = true;
        const postsCol = collection(db, 'blogPosts');
        const newPostRef = doc(postsCol);
        console.log("Author username:", this.$store.state.profileUsername)
        await setDoc(newPostRef, {
          blogID: newPostRef.id,
          blogHTML: this.blogHTML,
          blogCoverPhoto: coverUrl,
          blogCoverPhotoName: this.blogPhotoName,
          blogTitle: this.blogTitle,
          category: this.blogCategory,
          profileId: this.profileId,
          date: timestamp,
          authorName: this.$store.state.profileUsername
        });

        const newPost = {
          blogID:          newPostRef.id,
          blogHTML:        this.blogHTML,
          blogTitle:       this.blogTitle,
          blogCoverPhoto:  coverUrl,
          blogPhotoName:   this.blogPhotoName,
          category:        this.blogCategory,
          profileId:       this.profileId,
          blogDate:        timestamp,
          authorName:      this.$store.state.profileUsername
        }

        this.$store.commit('prependBlogPost', newPost)

        this.$store.commit('updateBlogTitle', '');
        this.$store.commit('updateBlogCategory', '');
        this.$store.commit('newBlogPost', '');
        this.$store.commit('updateBlogPhotoURL', '');
        this.$store.commit('fileNameChange', '');
        this.file = null;

        this.$router.push({
          name: 'ViewBlog',
          params: { blogid: newPostRef.id }
        })

        this.loading = false;
        this.$router.push({ name: 'ViewBlog' });
      } catch (error) {
        this.loading = false;
        this.error = true;
        this.errorMessage = 'Error while saving the post.';
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
    <CoverPreview v-show="this.$store.state.blogPhotoPreview"/>
    <Modal
        v-if="showModal"
        :modal-title="modalTitle"
        :modal-message="modalMessage"
        @close-modal="closeModal"/>
    <div class="container">
      <div :class="{invisible: !error}" class="error-message">
        <p><span>Error:</span>{{ this.errorMessage }}</p>
      </div>

      <input
          type="text"
          placeholder="Enter Blog Title"
          v-model="blogTitle"
          class="blog-title"
      />

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
            :class="{ 'button-inactive': !$store.state.blogPhotoURL }"
        >
          Preview Photo
        </button>
        <span class="file-name">
          File chosen: {{ $store.state.blogPhotoName }}
        </span>
      </div>

      <div class="category-select">
        <label for="category">Category:</label>
        <select id="category" v-model="blogCategory">
          <option disabled value="">Select a category</option>
          <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
        </select>
      </div>

      <div class="editor">
        <QuillEditor
            contentType="html"
            :options="editorSettings"
            v-model:value="blogHTML"


        />
      </div>

      <div class="blog-actions">
        <button class="pill-button" @click="uploadBlog">Submit Post</button>
        <button
            class="pill-button"
            @click="attemptPreview">
          Post Preview
        </button>
      </div>
    </div>
  </div>
  <Footer />
</template>


<style scoped lang="scss">
.create-post {
  position: relative;
  background: url('../assets/images/blogitImageBg2.jpg') no-repeat center;
  background-size: cover;
  background-attachment: fixed;
  color: #333;
  min-height: 100vh;
  padding: 2rem 0;
  z-index: 0;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 0;

  }

  .container {
    position: relative;
    width: 90%;
    max-width: 1000px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    z-index: 1;


  }

  .error-message {
    color: #e74c3c;
    font-size: 0.9rem;
    font-weight: 500;
  }

  .blog-title {
    font-size: 1.8rem;
    font-weight: 500;
    color: #333;
    background: #fff;
    border: none;
    border-bottom: 1px solid #ccc;
    padding: 0.5rem 0 0.5rem 1rem;
    width: 100%;
    outline: none;
    transition: border-color 0.2s;

    &::placeholder {
      color: #aaa;
      font-style: italic;
    }
    &:focus {
      border-color: #888;
    }
  }

  .pill-button {
    background: #333;
    color: #fff;
    padding: 0.7rem 1.6rem;
    border-radius: 999px;
    font-size: 1rem;
    font-weight: 500;
    text-transform: uppercase;
    border: none;
    cursor: pointer;
    transition: background 0.2s, transform 0.1s;

    &:hover {
      background: #555;
    }
    &:active {
      transform: scale(0.97);
    }
  }

  .pill-button.button-inactive,
  .pill-button:disabled {
    background: #ccc;
    color: #666;
    cursor: not-allowed;
  }

  .outline {
    background: #fff;
    color: #333;
    border: 1px solid #333;

    &:hover {
      background: #333;
      color: #fff;
    }
  }


  .upload-row {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;

    input[type="file"] {
      display: none;
    }

    .file-name {
      font-size: 0.9rem;
      color: #fff;
      font-style: italic;
      white-space: normal;
      overflow: visible;
      text-overflow: unset;
      max-width: 100%;
    }
  }

  .category-select {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    label {
      color: #fff;
      font-size: 0.95rem;
      font-weight: 500;
    }

    select {
      padding: 0.4rem 0.8rem;
      border: 1px solid #ccc;
      border-radius: 4px;
      background: #fff;
      color: #333;
      font-size: 0.9rem;
      outline: none;
      transition: border-color 0.2s;

      &:focus {
        border-color: #888;
      }
    }
  }

  .editor {
    :deep(.ql-toolbar) {
      background: #f9f9f9;
      border: 1px solid #ccc;
      border-radius: 4px 4px 0 0;
      padding: 0.5rem;

      button {
        border-radius: 4px !important;
        transition: background 0.2s;
      }
      button:hover {
        background: #eee !important;
      }
    }

    :deep(.ql-container) {
      border: 1px solid #ccc;
      border-top: none;
      border-radius: 0 0 4px 4px;
      background: #fff;
      height: 400px;
      overflow-y: auto;
      font-size: 1rem;
      color: #333;
    }

    :deep(.ql-editor) {
      padding: 1rem;
      min-height: 300px;
      line-height: 1.6;
    }
  }

  .blog-actions {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;

  }

  @media (max-width: 600px) {
    .container {
      width: 95%;
      gap: 1rem;
    }

    .blog-title {
      font-size: 1.6rem;
      padding-left: 0.8rem;
    }

    .pill-button {
      padding: 0.6rem 1.2rem;
      font-size: 0.9rem;
    }

    .upload-row {
      gap: 0.5rem;
      flex-wrap: wrap;
    }
    .upload-row .file-name {
      max-width: 100%;
      margin-top: 0.5rem;
    }

    .blog-actions {
      flex-direction: column;
      gap: 0.75rem;
      align-items: stretch;
    }
  }
}
</style>



