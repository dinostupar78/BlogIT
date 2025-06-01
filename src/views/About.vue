<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import Modal from "@/components/Modal.vue";
import Loading from "@/components/Loading.vue";
import emailjs from "emailjs-com";

export default {
  name: "About",
  components: {
    Navbar,
    Footer,
    Modal,
    Loading
  },
  data() {
    return {
      contactName: "",
      contactEmail: "",
      contactMessage: "",
      showModal: false,
      modalTitle: "",
      modalMessage: "",
      showLoading: false,


    };
  },
  methods: {
    async sendEmail() {
      emailjs.init("ncNWlazqc71c4Wzqx");
      this.showLoading = true;

      try {
        const result = await emailjs.send(
            "service_w105gbh",
            "template_r4tpedr",
            {
              from_name: this.contactName,
              from_email: this.contactEmail,
              message: this.contactMessage,
            }
        );

        if (result.status === 200) {
          this.contactName = "";
          this.contactEmail = "";
          this.contactMessage = "";
          this.modalTitle = "Message Sent!";
          this.modalMessage = "Your message was sent successfully.";
          this.showModal = true;
        } else {
          throw new Error(`EmailJS error status: ${result.status}`);
        }
      }  catch(error) {
        console.error("Failed to send email:", error);
        this.contactName = "";
        this.contactEmail = "";
        this.contactMessage = "";
        this.modalTitle = "Oops!";
        this.modalMessage =
            "Sorry, something went wrong when sending your message. Please try again later.";
        this.showModal = true;
      } finally {
        this.showLoading = false;
      }
    }
  },
};
</script>

<template>
  <Navbar />
  <div class="about-page">
    <section class="about-hero">
      <div class="container">
        <div class="row align-items-center">

          <div class="col-lg-6 mb-4 mb-lg-0">
            <h2 class="section-title">What We Do?</h2>
            <p class="section-text">
              BlogIT is our finishing project. It lets you craft and publish custom
              story posts in a few clicks.
            </p>

            <h2 class="section-title mt-5">When Were We Created?</h2>
            <p class="section-text">
              BlogIT launched in 2025, entirely for educational purposes—so you get
              to explore modern Vue + Firebase stacks in action.
            </p>

            <h2 class="section-title mt-5">Our Purpose?</h2>
            <p class="section-text">
              To connect more people together: writers, readers, and dreamers alike.
            </p>

            <h2 class="section-title mt-5">Any Questions?</h2>
            <p class="section-text">
              Drop us a line directly at
              <a href="mailto:blogit@gmail.com">blogit@gmail.com</a>.
            </p>
          </div>

          <div class="col-lg-6 text-center">
            <div class="image-wrapper mx-auto">
              <img
                  src="@/assets/images/blogitLogo.png"
                  alt="Light Splash"
                  class="img-fluid rounded-circle splash light-splash"
              />
              <img
                  src="@/assets/images/blogitLogoBlue.png"
                  alt="Blue Splash"
                  class="img-fluid rounded-circle splash blue-splash"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="contact-form-section">
      <div class="container">
        <h2 class="section-title text-center mb-4">Contact Us</h2>
        <p class="section-subtitle text-center mb-5">
          Want to get in touch? Just fill out the form and we’ll respond as soon as possible.
        </p>

        <div class="row justify-content-center">
          <div class="col-md-10 col-lg-8">
            <form @submit.prevent="sendEmail" class="contact-form">
              <div class="mb-4">
                <label for="contactName" class="form-label">Name</label>
                <input
                    v-model="contactName"
                    type="text"
                    id="contactName"
                    class="form-control"
                    placeholder="Your full name"
                    required
                />
              </div>

              <div class="mb-4">
                <label for="contactEmail" class="form-label">Email</label>
                <input
                    v-model="contactEmail"
                    type="email"
                    id="contactEmail"
                    class="form-control"
                    placeholder="Your email address"
                    required
                />
              </div>

              <div class="mb-4">
                <label for="contactMessage" class="form-label">Message</label>
                <textarea
                    v-model="contactMessage"
                    id="contactMessage"
                    class="form-control"
                    rows="5"
                    placeholder="What’s on your mind?"
                    required
                ></textarea>
              </div>

              <div class="text-center">
                <button type="submit" class="social-pill-link">
                  <font-awesome-icon icon="paper-plane" class="social-pill__icon" />
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
  <Footer />
  <Loading v-if="showLoading"/>
  <Modal
      v-if="showModal"
      :modalTitle="modalTitle"
      :modalMessage="modalMessage"
      @close-modal="showModal = false"
  />
</template>

<style scoped lang="scss">
.about-page {
  color: #333333;
  font-family: "Times New Roman", serif;
  padding-top: 100px;
}

.about-hero {
  padding: 60px 0;
}

.section-title {
  font-family: "Times New Roman", serif;
  font-size: 2rem;
  font-weight: 700;
  color: #222222;
  margin-bottom: 1rem;
}

.section-text {
  font-size: 1.1rem;
  line-height: 1.7;
  color: #555555;
}

a {
  color: #0d6efd;
  text-decoration: underline;
  &:hover {
    text-decoration: none;
  }
}

.image-wrapper {
  position: relative;
  width: 340px;
  height: 340px;
  margin: 0 auto;
  border-radius: 50%;
  background-color: #dfe3ea;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}
.image-wrapper:hover {
  transform: scale(1.05);
}

.splash {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  transition: opacity 0.5s ease;
}

.light-splash {
  opacity: 1;
}

.blue-splash {
  opacity: 0;
}

.image-wrapper:hover .light-splash {
  opacity: 0;
}
.image-wrapper:hover .blue-splash {
  opacity: 1;
}

.contact-form-section {
  padding: 80px 0;
}

.section-subtitle {
  font-size: 1.2rem;
  color: #666666;
}

.contact-form .form-label {
  font-weight: 600;
  color: #444444;
  margin-bottom: 0.3rem;
  display: block;
}

.contact-form .form-control {
  background-color: #ffffff;
  border: 1px solid #ddd;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  font-size: 1rem;
  color: #333333;
  transition: all 0.3s ease;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.contact-form .form-control:focus {
  border-color: #0d6efd;
  box-shadow: 0 0 0 3px rgba(13, 110, 253, 0.1);
  outline: none;
}

.contact-form .form-control::placeholder {
  color: #aaa;
}

.social-pill-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.65rem 1.8rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 999px;
  background-color: #0d6efd;
  color: #fff;
  border: none;
  transition: background-color 0.3s ease, transform 0.2s ease;
  box-shadow: 0 6px 14px rgba(13, 110, 253, 0.25);
}

.social-pill__icon {
  font-size: 1rem;
}

.social-pill-link:hover {
  background-color: #0056b3;
  transform: translateY(-1px);
  color: #fff;
}

@media (max-width: 992px) {
  .image-wrapper {
    width: 260px;
    height: 260px;
  }
}

@media (max-width: 768px) {
  .about-hero {
    padding-top: 30px;
    padding-bottom: 40px;
  }

  .image-wrapper {
    width: 200px;
    height: 200px;
  }

  .section-title {
    font-size: 1.75rem;
  }

  .section-text {
    font-size: 1rem;
  }
}

@media (max-width: 576px) {
  .about-hero {
    padding-top: 30px;
    padding-bottom: 30px;
  }

  .image-wrapper {
    width: 160px;
    height: 160px;
  }

  .section-title {
    font-size: 1.5rem;
  }

  .section-text {
    font-size: 0.95rem;
  }
}
</style>
