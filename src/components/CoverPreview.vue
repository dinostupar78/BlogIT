<script>

export default{
  name: 'CoverPreview',
  methods: {
    closePreview() {
      this.$store.commit('openPhotoPreview');
    }
  },
  computed: {
    blogCoverPhoto() {
      return this.$store.state.blogPhotoURL
    }
  }
}

</script>

<template>
  <div class="modal" ref="modal">
    <div class="modal-content">
      <button @click="closePreview" class="close-icon">&times;</button>
      <h2>Cover Preview</h2>
      <img :src="blogCoverPhoto" alt="Cover Image" class="cover-image" />
    </div>
  </div>
</template>


<style scoped lang="scss">
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  position: relative;
  background-color: #fff;
  padding: 2rem;
  border-radius: 12px;
  max-width: 700px;
  width: 90%;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  text-align: center;
}

.cover-image {
  width: 100%;
  height: auto;
  border-radius: 10px;
  margin-top: 1rem;
}

.close-icon {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: transparent;
  border: none;
  font-size: 2rem;
  line-height: 1;
  color: #333;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: #000;
  }
}

</style>