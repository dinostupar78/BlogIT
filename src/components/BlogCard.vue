<script>
export default {
  name: 'BlogCard',
  data() {
    return {
      isMobileActive: false,
      hoverActive: false,
      windowWidth: window.innerWidth
    };
  },
  computed: {
    showActions() {
      return this.editing && (this.isMobileActive || this.windowWidth > 768);
    }
  },
  props: {
    title:       { type: String, required: true },
    date:        { type: [String, Number], required: true },
    tag:         { type: String, required: true },
    image:       { type: String, required: true },
    postId:      { type: String, required: true },
    authorName: { type: String, default: 'Unknown' },
    editing:     { type: Boolean, default: false }
  },
  mounted() {
    window.addEventListener('resize', this.updateWindowWidth);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.updateWindowWidth);
  },
  methods: {
    fmtDate(ms) {
      return new Date(ms).toLocaleDateString("en-us", {dateStyle: "long"})
    },
    goToPost(id) {
      this.$router.push({ name: 'ViewBlog', params: { blogid: id } });
    },
    deletePost() {
      this.$store.dispatch('deletePost', this.postId)
    },
    editPost(){
      this.$router.push({ name: 'EditBlog', params: { blogid: this.postId } });
    },
    updateWindowWidth() {
      this.windowWidth = window.innerWidth;
      if (this.windowWidth > 768) {
        this.isMobileActive = false;
      }
    },
    handleClick() {
      if (!this.editing) {
        this.goToPost(this.postId);
      } else if (this.windowWidth <= 768) {
        this.isMobileActive = !this.isMobileActive;
      }
    }

  }

};

</script>

<template>

  <div class="card blog-card" @click="handleClick" :class="{ 'active-mobile': isMobileActive }">
    <div class="card-actions" v-if="showActions">
      <button @click.stop="editPost" class="icon-btn" title="Edit">✏️</button>
      <button @click.stop="deletePost" class="icon-btn" title="Delete">🗑️</button>
    </div>

    <div
        class="card-img"
        :style="{ backgroundImage: `url('${image}')` }"
    ></div>
    <div
        class="card-img-hovered"
        :style="{
        backgroundImage: `var(--card-img-hovered-overlay), url('${image}')`
      }"
    ></div>

    <div class="card-info">
      <div class="card-about">
        <span class="card-tag" :class="`tag-${tag.toLowerCase()}`">{{ tag }}</span>
        <div class="card-time">{{ fmtDate(date) }}</div>
      </div>
      <h1 class="card-title">{{ title }}</h1>
      <div class="card-creator">By: {{ authorName }}</div>
    </div>
  </div>
</template>

<style lang="scss">
:root {
  font-size: 16px;
  --card-img-height: 200px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background: #ebecf0;
  font-family: "Open Sans", sans-serif;
  min-height: 100vh;

  a {
    text-decoration: none;
    color: #172b4d;
  }

  h1 {
    font-family: "Song Myung", serif;
  }
}

.card-container {
  width: 100%;
  height: auto;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  transition: all 200ms ease-in-out;
}

.card{
  align-self: flex-start;
  position: relative;
  width: 325px;
  min-width: 275px;
  margin: 1.25rem 0.75rem;
  background: white;
  transition: all 300ms ease-in-out;

  .card-actions {
    position: absolute;
    top: 8px;
    right: 8px;
    display: flex;
    gap: 8px;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 10;

    .icon-btn {
      background: rgba(255, 255, 255, 0.9);
      border: 1px solid #ccc;
      border-radius: 6px;
      padding: 4px 6px;
      font-size: 14px;
      cursor: pointer;
      transition: background 0.2s;

      &:hover {
        background: #f5f5f5;
      }
    }
  }

  &:hover .card-actions {
    opacity: 1;
  }

  .card-img{
    visibility: hidden;
    width: 100%;
    height: var(--card-img-height);
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
  }

  .card-img-hovered {
    --card-img-hovered-overlay: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0),
            rgba(0, 0, 0, 0)
    );
    transition: all 350ms ease-in-out;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    width: 100%;
    position: absolute;
    height: var(--card-img-height);
    top: 0;
  }

  .card-info{
    position: relative;
    padding: 0.75rem 1.25rem;
    transition: all 200ms ease-in-out;

    .card-about{
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.75rem 0;
      transition: all 200ms ease-in-out;

      .card-tag {
        display: inline-block;
        padding: 0.25rem 0.75rem;
        font-size: 0.75rem;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        border-radius: 4px;
        color: #fff;
        white-space: nowrap;
        margin-right: 0.5rem;

        &.tag-news {
          background: #007acc;
        }

        &.tag-tech {
          background: #6c63ff;
        }

        &.tag-health {
          background: #e63946;
        }

        &.tag-lifestyle {
          background: #f4a261;
        }

        &.tag-finance {
          background: #264653;
        }

        &.tag-relationships {
          background: #c2185b;
        }
      }

    }
    .card-title {
      z-index: 10;
      font-size: 1.5rem;
      padding-bottom: 0.75rem;
      transition: all 350ms ease-in-out;
    }

    .card-creator {
      padding-bottom: 0.75rem;
      transition: all 250ms ease-in-out;
    }
  }
  &:hover {
    cursor: pointer;
    box-shadow: 0px 15px 35px rgba(227, 252, 239, 0.1), 0px 5px 15px rgba(0, 0, 0, 0.07);
    transform: scale(1.025);

    .card-img-hovered {
      --card-img-hovered-overlay: linear-gradient(
              to bottom,
              rgba(0, 0, 0, 0),
              rgba(0, 0, 0, 0.65)
      );
      height: 100%;
    }

    .card-about,
    .card-creator {
      opacity: 0;
    }

    .card-info {
      background-color: transparent;
    }

    .card-title {
      color: #ebecf0;
      transform: translate(0, 40px);
    }
  }
}

.blog-card {
  .card-img,
  .card-img-hovered {
    background-image: var(--card-img-hovered-overlay),
    url("https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg");
  }
}

@media (max-width: 768px) {
  .card.blog-card.active-mobile {
    transform: scale(1.05);
    z-index: 1;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);

    .card-img-hovered {
      --card-img-hovered-overlay: linear-gradient(
              to bottom,
              rgba(0, 0, 0, 0),
              rgba(0, 0, 0, 0.65)
      );
      height: 100%;
    }

    .card-about,
    .card-creator {
      opacity: 0;
    }

    .card-title {
      color: #ebecf0;
      transform: translate(0, 40px);
    }

    .card-actions {
      opacity: 1 !important;
    }
  }
}



</style>