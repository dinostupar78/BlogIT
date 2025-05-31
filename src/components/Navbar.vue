<script>
import {auth, db} from '@/firebase/firebaseConfig';
import {onAuthStateChanged, signOut} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import blogitLogo from '@/assets/images/blogitLogo.png';
import blogitLogoBlue from '@/assets/images/blogitLogoBlue.png';


export default {
  name: 'Navbar',
  data() {
    return {
      profileMenu: false,
      isScrolled: false,
      isAdmin: false,
      authUser: null,
      hoverLogo: false,
    };
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
    document.addEventListener('click', this.handleClickOutside);

    onAuthStateChanged(auth, async (u) => {
      this.authUser = u;

      if (u) {
        const snap = await getDoc(doc(db, "users", u.uid));
        this.isAdmin = snap.exists() && snap.data().admin === true;
      } else {
        this.isAdmin = false;
      }
    });

  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
    document.removeEventListener('click', this.handleClickOutside);
  },
  methods: {
    handleScroll() {
      this.isScrolled = window.scrollY > 0 || this.isAlwaysScrolled;
    },
    toggleProfileMenu() {
      this.profileMenu = !this.profileMenu;
    },
    handleClickOutside(e) {
      if (this.$refs.profile && !this.$refs.profile.contains(e.target)) {
        this.profileMenu = false;
      }
    },
    handleLogoClick() {
      if (this.$route.name === 'Home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    signOut() {
      signOut(auth)
          .then(() => {
            console.log('Signed out successfully');
            window.location.reload();
          })
          .catch((error) => {
            console.error('Sign out error:', error);
          });
    },
  },
  computed:{
    user(){
      return this.$store.state.user
    },
    admin(){
      return this.$store.state.profileAdmin
    },
    isAlwaysScrolled() {
      return this.$route.name === 'Blogs' ||
          this.$route.name === 'Category' ||
          this.$route.name === 'BlogPreview' ||
          this.$route.name === 'ViewBlog'
    },
    logoSrc() {
      return this.hoverLogo ? blogitLogoBlue : blogitLogo;
    },


  }
};
</script>



<template>
  <nav :class="['navbar navbar-expand-lg fixed-top', { 'navbar-scrolled': isScrolled || isAlwaysScrolled}]">
    <div class="container">
      <router-link class="navbar-brand d-flex align-items-center gap-2" :to="{ name: 'Home' }"
                   @click.native.prevent="handleLogoClick" @mouseenter="hoverLogo = true"
                   @mouseleave="hoverLogo = false">
        <img :src="logoSrc" class="logo-img" />
        <span :class="{ 'hovered-text': hoverLogo }">BLOGIT</span>
      </router-link>
      <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ms-auto align-items-center">
          <li class="nav-item">
            <router-link class="nav-link" :class="{ active: $route.name === 'Home' }" :to="{ name: 'Home' }">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :class="{ active: $route.name === 'Blogs' }" :to="{ name: 'Blogs' }">Blogs</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link " :class="{ active: $route.name === 'About' }" :to="{ name: 'About' }">About</router-link>
          </li>
          <li class="nav-item">
            <router-link v-if="user" class="nav-link " :class="{ active: $route.name === 'CreatePost' }" :to="{ name: 'CreatePost' }">Create Blog</router-link>
          </li>


          <li v-if="!user" class="nav-item ms-lg-3">
            <router-link to="/login" class="social-pill-link">
              <font-awesome-icon icon="right-to-bracket" class="social-pill__icon" />
              Sign In
            </router-link>
          </li>
          <li v-if="user" @click.stop="toggleProfileMenu" class="profile" ref="profile">
            <span>{{ $store.state.profileInitials }}</span>

            <div @click.stop v-show="profileMenu" class="profile-menu">
              <div class="info">
                <p class="initials">{{ $store.state.profileInitials }}</p>
                <div class="right">
                  <p>{{ $store.state.profileFirstName }} {{ $store.state.profileLastName }}</p>
                  <p>{{ $store.state.profileUsername }}</p>
                  <p>{{ $store.state.profileEmail }}</p>
                </div>
              </div>

              <div class="options">
                <div class="option">
                  <router-link class="nav-link" to="/profile">
                    <i class="fa-solid fa-user"></i>
                    <span>Profile</span>
                  </router-link>
                </div>
                <div class="option">
                  <router-link v-if="isAdmin" class="nav-link" to="/admin">
                    <i class="fa-solid fa-user-shield"></i>
                    <span>Admin</span>
                  </router-link>
                </div>
                <div @click="signOut" class="option">
                  <div class="nav-link" >
                    <i class="fa-solid fa-right-from-bracket"></i>
                    <span>Sign Out</span>
                  </div>
                </div>
              </div>
            </div>
          </li>

        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped lang="scss">
.navbar {
  background: transparent;
  transition: background-color 0.3s, box-shadow 0.3s;
  padding: 0.5rem 1rem;

  &.navbar-scrolled {
    background: #26272b;
    box-shadow: 0 2px 10px rgba(0,0,0,0.15);
  }
}

.navbar-brand {
  color: #fff;
  font-weight: bold;
  letter-spacing: 2px;
  text-decoration: none;

  &:hover,
  &:focus,
  &:active {
    color: #fff;
    text-decoration: none;
    opacity: 1;
    filter: none;
  }
}

.logo-img {
  height: 40px;
  width: auto;
  margin-right: -6px;
  transition: filter 0.3s;
}

.navbar-brand span {
  transition: color 0.3s;
}

.navbar-brand .hovered-text {
  color: #0d6efd;
}

.navbar-nav {
  .nav-item {
    & + .nav-item { margin-left: 0.5rem; }

    .nav-link {
      color: #fff;
      padding: 0.5rem 0.5rem;
      text-transform: uppercase;
      font-size: 1rem;
      transition: color 0.2s;

      &.active,
      &:hover {
        color: #0d6efd;
      }
    }
  }
  .profile {
    position: relative;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: #fff;
    color: #26272b;
    font-weight: bold;

    .profile-menu {
      position: absolute;
      top: 52px;
      right: 0;
      width: 260px;
      background-color: #26272b;
      color: #fff;
      border-radius: 8px;
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.25);
      z-index: 10;
      overflow: hidden;

      .info {
        display: flex;
        align-items: center;
        padding: 16px;
        border-bottom: 1px solid #444;

        .initials {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background-color: #fff;
          color: #26272b;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
        }

        .right {
          flex: 1;
          margin-left: 16px;

          p {
            margin: 0;
            line-height: 1.4;
          }

          p:nth-child(1) {
            font-size: 15px;
            font-weight: 600;
          }

          p:nth-child(2),
          p:nth-child(3) {
            font-size: 13px;
            color: #aaa;
          }
        }
      }

      .options {
        padding: 12px;

        .option {
          margin-bottom: 10px;

          .nav-link {
            display: flex;
            align-items: center;
            gap: 10px;
            color: #ddd;
            font-size: 14px;
            padding: 6px 0;
            text-decoration: none;

            i {
              width: 16px;
              text-align: center;
            }

            span {
              font-size: 14px;
            }

            &:hover {
              color: #0d6efd;
            }
          }
        }
      }
      @media (max-width: 576px) {
        left: 50%;
        right: auto;
        transform: translateX(-50%);
      }

    }


  }

}

.navbar-toggler {
  border: none;
}

.navbar-toggler-icon {
  filter: invert(1);
}

.social-pill-link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem 1rem;
  border-radius: 30px;
  background: #fff;
  color: #000;
  font-size: 0.9rem;
  font-weight: 500;
  text-decoration: none;
  transition: background 0.3s, color 0.3s;

  .social-pill__icon {
    width: 1rem;
    height: 1rem;
    transition: color 0.3s;
  }

  &:hover {
    background: #0d6efd;
    color: #fff;

    .social-pill__icon {
      color: #fff;
    }
  }
}


@media (max-width: 991px) {
  .navbar {
    background: #26272b;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
  }

  .navbar-nav {
    .nav-item.ms-lg-3 {
      width: 100%;
      text-align: center;

      .social-pill {
        width: 80%;
        max-width: 300px;
        justify-content: center;
        margin: 0 auto;
      }
    }
  }
}




</style>
