<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import Modal from "@/components/Modal.vue";
import {auth, db} from '@/firebase/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';


export default {
  name: "Profile",
  components: {
    Navbar,
    Footer,
    Modal
  },
  mounted() {
    this.$store.dispatch("getCurrentUser");

    onAuthStateChanged(auth, async user => {
      if (user) {
        try {
          const userSnap = await getDoc(doc(db, "users", user.uid));
          if (userSnap.exists() && userSnap.data().admin === true) {
            this.isAdmin = true;
          } else {
            this.isAdmin = false;
          }
        } catch (err) {
          console.error("Error fetching admin flag:", err);
          this.isAdmin = false;
        }
      } else {
        this.isAdmin = false;
      }
    });
  },
  data() {
    return {
      isLoading: false,
      showModal: false,
      modalTitle: "Success",
      modalMessage: "Changes saved successfully!",
      modalActive: false,
      isAdmin: false,
    };
  },
  methods: {
    closeModal() {
      this.modalActive = false;
      this.showModal = false;
    },
    updateProfile() {
      this.$store.dispatch("updateUserSettings");
      this.modalActive = true;

    }
  },
  computed: {
    firstName: {
      get() {
        return this.$store.state.profileFirstName;
      },
      set(value) {
        this.$store.commit('changeFirstName', value);
      }
    },
    lastName: {
      get() {
        return this.$store.state.profileLastName;
      },
      set(value) {
        this.$store.commit('changeLastName', value);
      }
    },
    username: {
      get() {
        return this.$store.state.profileUsername;
      },
      set(value) {
        this.$store.commit('changeUsername', value);
      }
    },
    email() {
      return this.$store.state.profileEmail;
    }
  },

};


</script>

<template>
  <Navbar />
  <div class="login-page">
    <Modal
      v-if="modalActive"
      :modalTitle="modalTitle"
      :modalMessage="modalMessage"
      v-on:close-modal="closeModal"
      @close-modal="showModal = false" />
    <div class="login-wrap">
      <div class="login-header">
        <img src="../assets//images/blogitLogo.png" alt="Logo" class="logo" />
        <div class="login-title">Account Settings</div>
      </div>
      <div class="profile-avatar">
        <div class="initials">{{ $store.state.profileInitials }}</div>
        <div class="admin-badge" >
          <font-awesome-icon :icon="isAdmin ? 'user-shield' : 'user'" />
          <span>{{ isAdmin ? ' Admin' : ' User' }}</span>
        </div>
      </div>
      <form @submit.prevent="updateProfile">
        <div class="login-input">
          <input type="text" placeholder="First Name" v-model="firstName" required />
        </div>
        <div class="login-input">
          <input type="text" placeholder="Last Name" v-model="lastName" required />
        </div>
        <div class="login-input">
          <input type="text" placeholder="Username" v-model="username" required />
        </div>
        <div class="login-input">
          <input disabled type="text" placeholder="Email" v-model="email" required />
        </div>


        <button type="submit" class="login-button">SAVE CHANGES</button>

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
  padding-top: 90px;
  padding-bottom: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url('../assets/images/blogitImage1.jpg');
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

  .profile-subtitle {
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

      i {
        /* Ensure the icon is the correct size */
        font-size: 14px;
      }
    }
  }


}

</style>