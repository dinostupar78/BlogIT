<script>
import Navbar  from "@/components/Navbar.vue";
import Loading from "@/components/Loading.vue";
import Footer  from "@/components/Footer.vue";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  setDoc,
  serverTimestamp,
  updateDoc
} from "firebase/firestore";

const auth = getAuth();
const db   = getFirestore();

export default {
  name: "Admin",
  components: { Navbar, Loading, Footer },

  data() {
    return {
      adminEmail: "",
      loading: false,
      error: "",
      success: "",
      loadingAuth: true,
      isSuperAdmin: false,
    };
  },

  mounted() {

    const auth = getAuth();
    const db   = getFirestore();

    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const snap = await getDoc(doc(db, "users", user.uid));
        this.isSuperAdmin = snap.exists() && snap.data().admin === true;
      }
      this.loadingAuth = false;
    });
  },

  methods: {
    async addAdmin() {
      this.error   = "";
      this.success = "";
      this.loading = true;

      const email = this.adminEmail.trim();
      if (!email || !/\S+@\S+\.\S+/.test(email)) {
        this.error   = "Please enter a valid email.";
        this.loading = false;
        return;
      }

      const currentEmail = auth.currentUser?.email;
      if (email === currentEmail) {
        this.error   = "You cannot add yourself.";
        this.loading = false;
        return;
      }

      try {
        const db = getFirestore();

        const usersSnap = await getDocs(
            query(
                collection(db, "users"),
                where("email", "==", email)
            )
        );

        if (usersSnap.empty) {
          throw new Error("No user found with that email.");
        }

        const uid = usersSnap.docs[0].id;

        // 2️⃣ write an admin doc at /admins/{uid}
        await updateDoc(doc(db, "users", uid), {
          admin: true
        });

        this.success    = `${email} is now an admin!`;
        this.adminEmail = "";
      } catch (e) {
        console.error(e);
        this.error = e.message;
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<template>
  <Navbar/>

  <div class="admin-page">
    <!-- loading spinner while auth check or submit -->
    <Loading v-if="loadingAuth || loading"/>

    <div class="admin-wrap" v-else>
      <!-- only super-admin sees the form -->
      <div v-if="isSuperAdmin">
        <div class="admin-header">
          <img src="@/assets/images/blogitLogo.png" class="logo" alt="Logo"/>
          <div class="admin-title">Admin Settings</div>
        </div>
        <p class="admin-subtitle">Enter email to make them admin</p>

        <form @submit.prevent="addAdmin">
          <div class="admin-input">
            <input
                type="email"
                v-model="adminEmail"
                placeholder="Email"
                required
            />
          </div>

          <div v-if="error"   class="error">{{ error }}</div>
          <div v-else-if="success" class="success">{{ success }}</div>

          <button
              type="submit"
              class="admin-button"
              :disabled="loading"
          >
            {{ loading ? "Working…" : "SUBMIT" }}
          </button>
        </form>
      </div>

      <!-- if not a super-admin -->
      <div v-else>
        <p>You do not have permission to access this page.</p>
      </div>
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
  background: url('https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg') no-repeat center/cover;
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

  .admin-header {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    margin-bottom: 1rem;

    .logo {
      width: 32px; height: 32px;
    }
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

    input {
      width: 100%;
      padding: 0.75rem 1rem;
      border: none;
      border-radius: 50px;
      background: $input-bg;
      color: $white;
      font-size: 1rem;
      outline: none;

      &::placeholder {
        color: $placeholder-color;
      }
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
    text-transform: uppercase;
    margin-top: 1rem;

    &:hover {
      background: $button-bg-hover;
    }
    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }

  .error {
    color: #ffb3b3;
    margin-bottom: 1rem;
    text-align: center;
  }

  .success {
    color: #b3ffb3;
    margin-bottom: 1rem;
    text-align: center;
  }
}
</style>
