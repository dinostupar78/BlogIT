<script>
import Navbar from '../components/Navbar.vue';
import Footer from '../components/Footer.vue';
import { auth, db } from '../firebase/firebaseConfig'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'




export default {
  name: 'Register',
  components: {
    Navbar,
    Footer
  },
  data() {
    return {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      bio: '',
      error: null,
      errorMsg: '',

    };
  },
  methods:{
    async register() {
      try {
        const userCred = await createUserWithEmailAndPassword(auth, this.email, this.password)
        await setDoc(doc(db, 'users', userCred.user.uid), {
          firstName: this.firstName,
          lastName: this.lastName,
          username: this.username,
          email: this.email,
          bio: this.bio,
          admin: false,
          createdAt: new Date(),
        })

        this.$router.push({ name: 'Login' })
      } catch (err) {
        this.error = true
        this.errorMsg = err.message
      }
    }

  }
};

function togglePassword() {
  const p = document.getElementById('pass');
  p.type = p.type === 'password' ? 'text' : 'password';
}
</script>

<template>
  <Navbar />
  <div class="form-page">
    <div class="form-wrap">
      <div class="form-header">
        <img src="../assets/images/blogitLogo.png" alt="Logo" class="logo" />
        <h2>Register</h2>
      </div>

      <form>
        <!-- two‐column row -->
        <div class="row">
          <div class="form-input col-sm-6">
            <input type="text" placeholder="First Name" v-model="firstName"/>
          </div>
          <div class="form-input col-sm-6">
            <input type="text" placeholder="Last Name" v-model="lastName"/>
          </div>
        </div>

        <!-- full‐width fields -->
        <div class="form-input">
          <input type="text" placeholder="Username" v-model="username" required />
        </div>
        <div class="form-input">
          <input type="email" placeholder="Email" v-model="email" required />
        </div>

        <!-- two‐column password fields -->
        <div class="row">
          <div class="form-input col-sm-6">
            <input type="password" placeholder="Password" id="pass" v-model="password" required />
            <span class="toggle-pass" @click="togglePassword">👁️</span>
          </div>
          <div class="form-input col-sm-6">
            <input type="password" placeholder="Confirm Password" v-model="confirmPassword" required />
          </div>
        </div>

        <!-- bio textarea -->
        <div class="form-input">
          <textarea placeholder="Bio (About you in a few sentences)" v-model="bio"></textarea>
        </div>



        <!-- error -->
        <div v-show="error" class="error">
          {{ this.errorMsg }}
        </div>

        <button @click.prevent="register" class="form-button" type="submit">CREATE ACC</button>

        <div class="form-options">
<!--          <label><input type="checkbox" /> Remember Me</label>-->
        </div>
        <div class="social-separator"><span>Or Create Acc With</span></div>
        <div class="social-buttons">
          <button class="social-btn google">
            <img src="https://img.icons8.com/color/48/000000/google-logo.png"
                 alt="Google Logo" width="20" height="20" />
            <span>Create with Google</span>
          </button>
          <button class="social-btn x">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                 fill="currentColor" viewBox="0 0 16 16">
              <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"/>
            </svg>
            <span>Create with X</span>
          </button>
        </div>


      </form>
    </div>
  </div>

  <Footer />

</template>

<style scoped lang="scss">
$form-bg: rgba(255,255,255,0.12);
$input-bg: rgba(255,255,255,0.2);
$btn-bg: #ffd1ad;
$btn-bg-hover: #ffb782;
$text-light: #fff;
$text-dark: #333;
$text-color: #333;
$separator-line: rgba(255,255,255,0.5);
$white: #fff;

.form-page {
  position: relative;
  min-height: 100vh;
  background: url('https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg')
  no-repeat center/cover;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 100px 2rem 2rem;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(0,0,0,0.6);
    z-index: 0;
  }
}

.form-wrap {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 480px;
  padding: 2rem;
  background: $form-bg;
  border-radius: 0.5rem;
  color: $text-light;
  overflow-y: auto;
  max-height: 90vh;

  @media (max-width: 576px) {
    padding: 1.5rem;
    max-height: 95vh;
  }

  .form-header {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2px;
    margin-bottom: 1rem;

    .logo {
      width: 32px;
      height: 32px;
    }
    h2 {
      margin: 0;
      font-size: 1.5rem;
      text-shadow: 0 2px 4px rgba(0,0,0,0.7);
    }
  }

  form {
    .row {
      display: flex;
      gap: 0rem;
      margin-bottom: 0.8rem;

      @media (max-width: 576px) {
        flex-direction: column;
      }

      .col-sm-6 {
        flex: 1;
      }
    }

    .form-input {
      position: relative;
      margin-bottom: 1rem;

      input, textarea {
        width: 100%;
        padding: 0.75rem 1rem;
        border: none;
        border-radius: 8px;
        background: $input-bg;
        color: $text-light;
        font-size: 0.95rem;
        outline: none;
        resize: none;


        &::placeholder {
          color: rgba(255, 255, 255, 0.6);
        }
      }

      textarea {
        resize: vertical;
      }

      .toggle-pass {
        position: absolute;
        top: 50%;
        right: 1rem;
        transform: translateY(-50%);
        cursor: pointer;
        opacity: 0.7;
      }
    }

    .form-button {
      width: 100%;
      padding: 0.75rem;
      margin: 0.5rem 0 1rem;
      border: none;
      border-radius: 8px;
      background: $btn-bg;
      color: $text-dark;
      font-weight: bold;
      cursor: pointer;
      transition: background 0.2s;

      &:hover {
        background: $btn-bg-hover;
      }
    }

    .form-options {
      display: flex;
      justify-content: space-between;
      font-size: 0.9rem;
      opacity: 0.9;
      margin-bottom: 1rem;

      a {
        color: $text-light;
        text-decoration: none;
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
    .error {
      color: red;
      font-size: 0.9rem;
      margin-bottom: 1rem;
      text-align: center;
    }
  }
}
</style>

