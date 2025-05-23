<script>

export default{
  props: ["modalTitle", "modalMessage"],
  methods: {
    closeModal(){
      this.$emit("close-modal");

    },
  },

};

</script>

<template>
  <div class="modal-overlay" role="dialog" aria-modal="true">
    <div class="modal-box">
      <h2 class="modal-title">{{ modalTitle }}</h2>
      <p class="modal-message">{{ modalMessage }}</p>
      <button class="modal-btn" @click="closeModal">Close</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
$button-bg: #ffd1ad;
$button-hover: #ffb782;
$text-color: #333;

.modal-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.modal-box {
  backdrop-filter: blur(12px);
  background: linear-gradient(
          135deg,
          rgba(255, 255, 255, 0.25),
          rgba(255, 255, 255, 0.1)
  );
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 2rem;
  width: 90%;
  max-width: 400px;
  color: #fff;
  text-align: center;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);

  .modal-title {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 0.75rem;
    color: #fff;
  }

  .modal-message {
    font-size: 1rem;
    margin-bottom: 1.5rem;
    opacity: 0.95;
    color: #eee;
  }

  .modal-btn {
    width: 100%;
    padding: 0.75rem;
    border: none;
    border-radius: 50px;
    background-color: $button-bg;
    color: $text-color;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    transition: background 0.3s ease;

    &:hover {
      background-color: $button-hover;
    }
  }
}

</style>