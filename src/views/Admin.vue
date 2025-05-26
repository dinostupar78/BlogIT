<script setup>
import Footer from "@/components/Footer.vue";
import Loading from "@/components/Loading.vue";
import Modal from "@/components/Modal.vue";
import Navbar from "@/components/Navbar.vue";
</script>

<template>
  <Navbar/>
  <div class="admin-page">
    <Modal v-if="modalActive" :modal-title="modalTitle" :modal-message="modalMessage" @close-modal="handleModalClose"/>
    <Loading v-if="loading"/>
    <div class="admin-wrap">
      <div class="admin-header">
        <img src="@/assets/images/blogitLogo.png" alt="Logo" class="logo"/>
        <div class="admin-title">Admin Settings</div>
      </div>
      <div class="admin-subtitle">Enter email to make them admin</div>

      <form @submit.prevent="resetPass">
        <div class="admin-input">
          <input
              type="email"
              v-model="email"
              placeholder="Email"
              required
          />
        </div>

        <div v-if="error" class="error">{{ errorMsg }}</div>

        <button type="submit" class="admin-button">SUBMIT</button>

      </form>
    </div>
  </div>
  <Footer/>

</template>

<style scoped lang="scss">
$primary-bg: rgba(255, 255, 255, 0.1);
$input-bg: rgba(255, 255, 255, 0.2);
$placeholder-color: rgba(255, 255, 255, 0.8);
$button-bg: #ffd1ad;
$button-bg-hover: #ffb782;
$text-color: #333;
$white: #fff;

.admin-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url('https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg')
  no-repeat center/cover;
  position: relative;
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(0,0,0,0.6);
    z-index: 0;
  }
}

.admin-wrap {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 450px;
  padding: 2rem;
  background: $primary-bg;
  border-radius: 8px;
  color: $white;
  margin: 0 auto;

  .admin-header {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
    .logo { width: 32px; height: 32px; }
    .admin-title {
      font-size: 1.5rem;
      font-weight: 700;
      text-shadow: 0 2px 4px rgba(0,0,0,0.7);
    }
  }

  .admin-subtitle {
    text-align: center;
    margin-bottom: 1.5rem;
    opacity: 0.9;
  }

  .admin-input {
    margin-bottom: 1rem;
    position: relative;
    input {
      width: 100%;
      padding: 0.75rem 1rem;
      border: none;
      border-radius: 50px;
      background: $input-bg;
      color: $white;
      font-size: 1rem;
      outline: none;
      &::placeholder { color: $placeholder-color; }
    }
  }

  .admin-button {
    width: 100%;
    padding: 0.75rem;
    border: none;
    border-radius: 50px;
    background: $button-bg;
    color: $text-color;
    font-size: 1rem;
    font-weight: 700;
    cursor: pointer;
    transition: background 0.3s;
    margin-bottom: 1rem;
    text-transform: uppercase;

    &:hover { background: $button-bg-hover; }
  }

  .error {
    color: #ffb3b3;
    margin-bottom: 1rem;
    text-align: center;
  }

}

</style>