<script >
import { quillEditor } from 'vue3-quill';
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";



export default{
  name: 'CreatePost',
  data() {
    return {
      error: null,
      errorMessage: null,
      blogHTML: '',
      editorSettings: {
        modules: {
          imageResize: {

          },
        },
      },
    };
  },
  components: {
    Navbar,
    Footer,
    QuillEditor: quillEditor,
  },
  methods: {

  },
}

</script>

<template>
  <Navbar />
  <div class="create-post">
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
            accept=".png, .jpg, .jpeg"
        />
        <button
            class="pill-button"
            :class="{ 'button-inactive': !$store.state.blogPhotoURL }"
        >
          Preview Photo
        </button>
        <span class="file-name">
          File chosen: {{ $store.state.blogPhotoName }}
        </span>
      </div>

      <!-- Quill Editor -->
      <div class="editor">
        <QuillEditor
            v-model:content="blogHTML"
            contentType="html"
            :modules="{
            toolbar: [['bold', 'italic'], ['link'], [{ list: 'ordered' }, { list: 'bullet' }]]
          }"
        />
      </div>

      <!-- Actions -->
      <div class="blog-actions">
        <button>Submit Post</button>
        <router-link to="#" class="router-button">Post Preview</router-link>
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
    background: rgba(0, 0, 0, 0.5); // subtle dark overlay
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
      min-height: 400px;
      padding: 1rem;
      font-size: 1.1rem;
      color: #000;
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