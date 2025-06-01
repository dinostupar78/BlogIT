<script>
export default {
  name: "BlogPost",

  props: {
    postId:     { type: String, required: true },
    title:      { type: String, required: true },
    date:       { type: [String, Number], default: null },
    tag:        { type: String, default: "" },
    image:      { type: String, required: true },
    authorName: { type: String, default: "Unknown" },
    blogHTML:       { type: String, default: "" },
    reverseLayout: { type: Boolean, default: false }
  },

  computed: {
    excerpt() {
      if (!this.blogHTML || !this.blogHTML.trim()) {
        return "<p>No preview available.</p>";
      }

      const tmp = document.createElement("div");
      tmp.innerHTML = this.blogHTML;
      const allText = tmp.textContent || tmp.innerText || "";

      if (!allText.trim()) {
        return "<p>No preview available.</p>";
      }

      if (allText.length <= 150) {
        const escaped = allText
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");
        return escaped;
      }

      const snippet = allText.slice(0, 150).trim();
      const escapedSnippet = snippet
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;");
      return escapedSnippet + "…";
    }
  }


};
</script>

<template>
  <section
      class="blog-wrapper"
      :class="{ reverse: reverseLayout }"
  >
    <!-- LEFT SIDE (or RIGHT if .reverse) -->
    <div class="blog-photo">
      <div class="green-slant"></div>
      <img class="tilted-image" :src="image" alt="Cover Photo" />
    </div>

    <!-- RIGHT SIDE (or LEFT if .reverse) -->
    <div class="blog-content">
      <div class="text-container">
        <h2 class="blog-title">{{ title }}</h2>
        <p class="blog-excerpt" v-html="excerpt"></p>
        <router-link
            :to="{ name: 'ViewBlog', params: { blogid: postId } }"
            class="read-more"
        >
          View the Post →
        </router-link>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
/* ────── 1) Wrapper: as a 600px‐tall section ────── */
.blog-wrapper {
  display: flex;
  width: 100%;
  height: 600px;
  margin: 2rem 0 4rem; /* <-- added top margin */
  overflow: hidden;
}

/* If reverseLayout === true, flip the two halves horizontally (desktop only) */
.blog-wrapper.reverse {
  flex-direction: row-reverse;
}

/* ────── 2) LEFT/RIGHT SIDE: Dark + green slant + tilted image ────── */
.blog-photo {
  position: relative;
  flex: 1;
  background-color: #2c3e50;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  .green-slant {
    position: absolute;
    top: 0;
    left: -20%;
    width: 140%;
    height: 100%;
    background-color: #26272b;
    transform: skewX(-10deg);
    transform-origin: top left;
    z-index: 1;
    pointer-events: none;
  }

  .tilted-image {
    position: relative;
    width: 90%;
    max-width: 800px;
    transform: rotate(-5deg);
    object-fit: cover;
    z-index: 2;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  }
}

/* ────── 3) RIGHT/LEFT SIDE: White background + text ────── */
.blog-content {
  flex: 1;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 2rem;
}

.text-container {
  max-width: 480px;
  text-align: left;
}

.blog-title {
  font-size: 2.75rem;
  font-weight: 300;
  text-transform: uppercase;
  margin-bottom: 1.25rem;
  line-height: 1.1;
  color: #333;
}

.blog-excerpt {
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1.75rem;
  color: #555;
}

.read-more {
  display: inline-block;
  font-size: 1rem;
  font-weight: 500;
  color: #007bff;
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: border-bottom-color 0.3s ease;

  &:hover {
    border-bottom-color: #007bff;
  }
}

/* ────── 4) Responsive stacking on medium screens (tablets) ────── */
@media (max-width: 1024px) {
  /* Override both normal and "reverse" layouts so they stack vertically */
  .blog-wrapper,
  .blog-wrapper.reverse {
    flex-direction: column;
    height: auto;
  }

  .blog-photo,
  .blog-content {
    flex: none;
    width: 100%;
  }

  .blog-photo {
    height: 300px;
    overflow: hidden;
  }

  /* Center the tilted image so it doesn’t hug one side */
  .blog-photo .tilted-image {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 120%;
    max-width: none;
    transform: translate(-50%, -50%) rotate(-3deg);
    object-fit: cover;
  }

  .blog-content {
    height: auto;
    padding: 2rem 1.5rem;
  }

  .blog-title {
    font-size: 2.25rem;
  }

  .blog-excerpt {
    font-size: 0.95rem;
  }
}

/* ────── 5) Further shrink for phones (extra small) ────── */
@media (max-width: 600px) {
  .blog-photo {
    height: 200px;
  }

  .blog-photo .tilted-image {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 140%;
    max-width: none;
    transform: translate(-50%, -50%) rotate(-2deg);
    object-fit: cover;
  }

  .blog-title {
    font-size: 1.85rem;
  }

  .blog-excerpt {
    font-size: 0.9rem;
  }

  .blog-content {
    padding: 1.5rem 1rem;
  }
}
</style>


