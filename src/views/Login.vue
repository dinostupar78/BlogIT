<script >
import Navbar from '../components/Navbar.vue';
import Footer from '../components/Footer.vue';
import {auth, db} from '../firebase/firebaseConfig'
import { signInWithEmailAndPassword, GoogleAuthProvider, TwitterAuthProvider,signInWithPopup, browserLocalPersistence,
  browserSessionPersistence, setPersistence } from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'


export default {
  name: 'Login',
  components: {
    Navbar,
    Footer
  },
  data() {
    return {
      email: '',
      password: '',
      rememberMe: false,
      error: null,
      errorMsg: '',
    };
  },
  methods:{
     async signIn() {
      try {
        await signInWithEmailAndPassword(auth, this.email, this.password)
        this.$router.push({ name: 'Home' })
      } catch (err) {
        switch (err.code){
          case 'auth/user-not-found':
            this.error = true
            this.errorMsg = 'User not found'
            break;
          case 'auth/wrong-password':
            this.error = true
            this.errorMsg = 'Wrong password'
            break;
          case 'auth/invalid-email':
            this.error = true
            this.errorMsg = 'Invalid email'
            break;
          default:
            this.error = true
            this.errorMsg = err.message
        }
      }
    },
    async loginWithGoogle() {
      try {

        if (this.rememberMe) {
          await setPersistence(auth, browserLocalPersistence);
        } else {
          await setPersistence(auth, browserSessionPersistence);
        }

        const provider = new GoogleAuthProvider()
        const userCred = await signInWithPopup(auth, provider)

        const user = userCred.user
        const userDocRef = doc(db, 'users', user.uid);
        const userSnapshot = await getDoc(userDocRef);

        if(!userSnapshot.exists()) {

          const displayName = user.displayName || '';
          const [gFirstName, gLastName] = displayName.split(' ') || ['', ''];

          await setDoc(userDocRef, {
            firstName: gFirstName,
            lastName: gLastName,
            username: user.email.split('@')[0],
            email: user.email,
            bio: '',
            photoURL: user.photoURL || '',
            admin: false,
            createdAt: new Date(),
          });
        }

        this.$router.push({ name: 'Home' })
      } catch (error) {
        this.error = true
        this.errorMsg = error.message
      }
    },
    async loginWithX(){
       try{
         if (this.rememberMe) {
           await setPersistence(auth, browserLocalPersistence);
         } else {
           await setPersistence(auth, browserSessionPersistence);
         }

         const provider = new TwitterAuthProvider();
         const userCred = await signInWithPopup(auth, provider);

         const user = userCred.user;
         const userDocRef = doc(db, "users", user.uid);
         const userSnapshot = await getDoc(userDocRef);

         if (!userSnapshot.exists()) {
           const displayName = user.displayName || "";
           const [firstName, lastName] = displayName.split(" ") || ["", ""];

           const twitterData = user.providerData.find(
               (p) => p.providerId === "twitter.com"
           ) || {};
           const twitterHandle = twitterData.screenName || "";

           await setDoc(userDocRef, {
             firstName: firstName,
             lastName: lastName,
             username: twitterHandle || user.uid,
             email: user.email,
             bio: "",
             photoURL: user.photoURL || "",
             admin: false,
             createdAt: new Date(),
           });
         }

         this.$router.push({ name: "Home" });
       } catch (error) {
         this.error = true
         this.errorMsg = error.message
       }
    },
    togglePassword(elementId) {
      const el = document.getElementById(elementId);
      if (el) {
        el.type = el.type === 'password' ? 'text' : 'password';
      }
    }
  }
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
          <input type="text" placeholder="Email" v-model="email" required />
        </div>
        <div class="login-input">
          <input  placeholder="Password" id = "loginPass" v-model="password" required />
          <span class="toggle-pass" @click="togglePassword('loginPass')">👁️</span>
        </div>
        <div v-show="error" class="error">
          {{ this.errorMsg }}
        </div>
        <button @click.prevent="signIn" type="submit" class="login-button">SIGN IN</button>
        <div class="login-options">
          <label>
            <input type="checkbox"  v-model="rememberMe"/>
            Remember Me
          </label>
          <router-link to="/forgotPass">Forgot Password</router-link>
        </div>
        <div class="social-separator"><span>Or Create Acc In</span></div>
        <router-link to="/register" class="form-register-button">REGISTER</router-link>
        <div class="social-separator"><span>Or Sign In With</span></div>
        <div class="social-buttons">
          <button class="social-btn google" @click.prevent="loginWithGoogle">
            <img src="https://img.icons8.com/color/48/000000/google-logo.png"
                 alt="Google Logo" width="20" height="20" />
            <span>Sign in with Google</span>
          </button>
          <button class="social-btn x" @click.prevent="loginWithX">
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
$primary-bg: rgba(255, 255, 255, 0.2);
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
  background-image: url('https://images.unsplash.com/photo-1701672888190-b4cb6254a76a?q=80&w=2133&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;  position: relative;


  &::before {
    content: '';
    position: absolute;
    inset: 0;
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

    .login-subtitle-register a{
      color: $white;
      text-decoration: none;
      font-weight: 600;

      &:hover {
        text-decoration: underline;
      }
    }
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

  .form-register-button{
    width: 100%;
    padding: 14px;
    border: none;
    border-radius: 50px;
    background: $button-bg;
    color: $text-color;
    font-weight: bold;
    text-align: center;
    text-decoration: none;
    display: block;
    transition: background 0.2s;
    font-size: 18px;

    &:hover {
      background: $button-bg-hover;
    }
  }


}
</style>
