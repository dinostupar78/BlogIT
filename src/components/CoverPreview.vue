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
      <img :src="blogCoverPhoto" alt="Cover Image" class="cover-image" />
    </div>
  </div>
</template>


<style scoped lang="scss">
.modal {
  position: fixed;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  background: rgba(0,0,0,0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  overflow: auto;
  border: none;
}

.modal-content {
  position: relative;
  background: transparent;
  box-shadow: none;
  border: none;
  padding: 0;
  max-width: 90vw;
  max-height: 90vh;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: visible;
}

.cover-image {
  width: auto;
  max-width: 100%;
  max-height: 70vh;
  border-radius: 10px;
  margin-top: 1rem;
  object-fit: contain;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.modal-content {
  position: relative;
  background: transparent;
  box-shadow: none;
  padding: 0;
  max-width: 90vw;
  max-height: 90vh;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: visible;
}

.cover-image {
  width: auto;
  max-width: 95vw;
  max-height: 85vh;
  border-radius: 12px;
  margin-top: 1rem;
  object-fit: contain;
  display: block;
  margin-left: auto;
  margin-right: auto;
  box-shadow: 0 8px 32px rgba(0,0,0,0.6);
}

.close-icon {
  position: absolute;
  top: 1.5rem;
  right: 2rem;
  background: transparent;
  border: none;
  font-size: 2.6rem;
  color: #fff;
  text-shadow: 0 0 8px #222;
  cursor: pointer;
  z-index: 10;
  transition: color 0.15s, transform 0.1s;

  &:hover {
    color: #ff4c4c;
    transform: scale(1.14) rotate(6deg);
  }
}

@media (max-width: 600px) {
  .close-icon {
    top: 0.7rem;
    right: 1rem;
    font-size: 2rem;
  }
  .cover-image {
    max-height: 60vh;
  }
}


@media (max-width: 700px) {
  .close-icon {
    top: 16px;
    right: 16px;
    font-size: 2rem;
  }
}

@media (max-width: 600px) {
  .modal-content {
    padding: 1rem;
    max-width: 98vw;
    max-height: 95vh;
  }
  .cover-image {
    max-height: 55vh;
  }
}
</style>