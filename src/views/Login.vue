<script setup>
import Navbar from '../components/Navbar.vue';
import Footer from '../components/Footer.vue';

function togglePassword() {
  const p = document.getElementById('pass');
  p.type = p.type === 'password' ? 'text' : 'password';
}
</script>

<template>
  <Navbar />
  <div class="login-page">
    <div class="login-wrap">
      <div class="login-header">
        <img src="../assets//images/blogitLogo.png" alt="Logo" class="logo" />
        <div class="login-title">Login</div>
      </div>
      <div class="login-subtitle">Have an account?</div>
      <form>
        <div class="login-input">
          <input type="text" placeholder="Username" required />
        </div>
        <div class="login-input">
          <input type="password" placeholder="Password" id="pass" required />
          <span class="toggle-pass" @click="togglePassword">👁️</span>
        </div>
        <button type="submit" class="login-button">SIGN IN</button>
        <div class="login-options">
          <label>
            <input type="checkbox" />
            Remember Me
          </label>
          <a href="#">Forgot Password</a>
        </div>
        <div class="social-separator"><span>Or Sign In With</span></div>
        <div class="social-buttons">
          <button class="social-btn google">
            <img src="https://img.icons8.com/color/48/000000/google-logo.png"
                 alt="Google Logo" width="20" height="20" />
            <span>Sign in with Google</span>
          </button>
          <button class="social-btn x">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                 fill="currentColor" viewBox="0 0 16 16">
              <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"/>
            </svg>
            <span>Sign in with X</span>
          </button>
        </div>

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

.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url('https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg') no-repeat center center/cover;
  position: relative;

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

.login-wrap {
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

  .login-header {
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

    .login-title {
      font-size: 24px;
      font-weight: 700;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.7);
    }
  }

  .login-subtitle {
    font-size: 18px;
    margin-bottom: 30px;
    text-align: center;
    opacity: 0.9;
  }

  .login-input {
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

  .login-button {
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

  .login-options {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 15px;
    margin: 20px 0;
    opacity: 0.9;

    a {
      color: $white;
      text-decoration: none;

      &:visited {
        color: $white;
      }
    }

    label {
      display: flex;
      align-items: center;
      cursor: pointer;

      input[type='checkbox'] {
        margin-right: 8px;
      }
    }
  }

  .social-separator {
    position: relative;
    margin: 20px 0;
    font-size: 15px;
    opacity: 0.8;
    text-align: center;

    &::before,
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      width: 35%;
      height: 1px;
      background: $separator-line;
    }

    &::before {
      left: 0;
    }
    &::after {
      right: 0;
    }

    span {
      padding: 0 12px;
    }
  }

  .social-buttons {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;

    @media (max-width: 576px) {
      flex-direction: column;
    }

    .social-btn {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      padding: 0.75rem 1rem;
      border: none;
      border-radius: 50px;
      background: rgba(255, 255, 255, 0.9);
      color: $text-color;
      font-size: 0.9rem;
      font-weight: 500;
      white-space: nowrap;
      min-height: 48px;
      transition: background 0.2s, transform 0.2s;

      &:hover {
        background: rgba(255, 255, 255, 1);
        transform: translateY(-1px);
      }

      img, svg {
        flex-shrink: 0;
      }
    }
  }


}
</style>
