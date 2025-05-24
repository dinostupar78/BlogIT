<script setup>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";


</script>

<template>
  <Navbar />
  <div class="profile-page">
    <div class="profile-wrap">
      <div class="profile-header">
        <img src="../assets//images/blogitLogo.png" alt="Logo" class="logo" />
        <div class="profile-title">Account Settings</div>
      </div>
      <div class="profile-avatar">
        <div class="initials">{{ $store.state.profileInitials }}</div>
        <div class="admin-badge">
          <i class="fa fa-user-shield"></i>
          <span>Admin</span>
        </div>
      </div>
      <form>
        <div class="profile-input">
          <input type="text" placeholder="First Name"  required />
        </div>
        <div class="profile-input">
          <input type="text" placeholder="Last Name"  required />
        </div>
        <div class="profile-input">
          <input type="text" placeholder="Username"  required />
        </div>
        <div class="profile-input">
          <input type="text" placeholder="Email"  required />
        </div>


        <button type="submit" class="profile-button">SAVE CHANGES</button>

      </form>
    </div>
  </div>
  <Footer />
</template>

<style scoped lang="scss">
$primary-bg: rgba(255, 255, 255, 0.1);
$input-bg: rgba(255, 255, 255, 0.2);
$placeholder-color: rgba(255, 255, 255, 0.8);
$button-bg: #ffd1ad;
$button-bg-hover: #ffb782;
$text-color: #333;
$separator-line: rgba(255, 255, 255, 0.5);
$white: #fff;

.profile-page {
  min-height: 100vh;
  padding-top: 90px;
  padding-bottom: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url('https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg');
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    z-index: 0;
  }
}

.profile-wrap {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 450px;
  padding: 2rem;
  background: $primary-bg;
  border-radius: 8px;
  color: $white;
  margin: 0 auto;

  @media (max-width: 576px) {
    padding: 1.5rem;
    max-width: 90%;
  }

  .profile-header {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2px;
    margin-bottom: 1rem;

    .logo {
      width: 32px;
      height: 32px;
      object-fit: contain;
    }

    .profile-title {
      font-size: 24px;
      font-weight: 700;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.7);
    }
  }

  .profile-subtitle {
    font-size: 18px;
    margin-bottom: 30px;
    text-align: center;
    opacity: 0.9;
  }

  .profile-input {
    position: relative;
    margin-bottom: 20px;

    input {
      width: 100%;
      padding: 14px 50px 14px 20px;
      border: none;
      border-radius: 50px;
      background: $input-bg;
      color: $white;
      font-size: 16px;
      outline: none;

      &::placeholder {
        color: $placeholder-color;
      }
    }

    .toggle-pass {
      position: absolute;
      right: 20px;
      top: 50%;
      transform: translateY(-50%);
      cursor: pointer;
      opacity: 0.8;
      font-size: 18px;
    }
  }

  .profile-button {
    width: 100%;
    padding: 14px;
    border: none;
    border-radius: 50px;
    background: $button-bg;
    color: $text-color;
    font-size: 18px;
    font-weight: 700;
    cursor: pointer;
    transition: background 0.3s;
    margin-top: 10px;

    &:hover {
      background: $button-bg-hover;
    }

  }

  .profile-avatar {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 24px;

    .initials {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      background-color: #fff;
      color: #26272b;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 8px;
    }

    .admin-badge {
      background: rgba(255, 255, 255, 0.2);
      color: rgba(255, 255, 255, 0.9);
      font-size: 14px;
      padding: 6px 16px;
      border-radius: 50px;
      text-align: center;
      text-transform: capitalize;
      border: 1px rgba(255, 255, 255, 0.4);
      backdrop-filter: blur(4px);
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    }
  }


}

</style>