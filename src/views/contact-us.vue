<template>
  <section id="contact-us" class="contact-us">
    <div class="section-container">
      <div class="section-left">
        <navigation-bar-plain class="navigation-bar-plain" />
        <section class="main-content">
          <div class="form-content">
            <form action="">
              <h4 class="form-title">Contact Us</h4>
              <label>
                Content
                <textarea name="" id="" cols="20" rows="5" maxlength="150" placeholder="e.g. Bug finding or your suggestion for this project"></textarea>
                <small><span>0</span>/150</small>
              </label>
              <label>
                Your Name (Optional)
                <input type="text" placeholder="Optional">
              </label>
              <input type="submit" class="submit-button">
            </form>
          </div>
        </section>
      </div>
      <div class="section-right">
        <section class="main-content">
          <h1 class="title">We'd love to hear from you.</h1>
          <p class="description">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Atque vero delectus consectetur sed molestias quis est aperiam saepe modi fugit? Vitae quod dolor dolorum expedita error blanditiis temporibus corporis eum.
          </p>
          <div class="follow-us">
            <a href=""><img src="../assets/icon/github-brands.svg" alt="github icon" width="25" height="25"></a>
            <a href=""><img src="../assets/icon/instagram-brands.svg" alt="instagram icon" width="25" height="25"></a>
            <a href=""><img src="../assets/icon/codepen-brands.svg" alt="codepen icon" width="25" height="25"></a>
          </div>
        </section>
      </div>
    </div>
    <footer-content />
  </section>
</template>

<script>
  import NavigationBarPlain from '@/components/navigation-plain.vue'
  import FooterContent from '@/components/footer.vue'
  export default {
    name: 'ContactUs',
    components: {
      'navigation-bar-plain': NavigationBarPlain,
      'footer-content': FooterContent,
    },
    methods: {
      
    },
    metaInfo: {
      title: 'Contact Us',
      titleTemplate: '%s | Curzr'
    }
  }
</script>

<style lang="scss">
@import '../style/main.scss';
.contact-us {
  position: relative;
  width: 100%;
  min-height: 100vh;

  .section-container {
    display: flex;
    position: relative;
    min-height: 100vh;

    .section-left {
      flex: 1;
      .navigation-bar-plain {
        width: 50%;
      }

      .main-content {
        padding-top: $--nav-height;

        .form-content {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          padding: 1rem 2rem;

          form {
            display: flex;
            flex-direction: column;
            width: 100%;
            max-width: 600px;

            & > * {
              margin: 1rem 0;
            }

            .form-title {
              font-variation-settings: 'wght' $--bold;
            }

            label {
              display: flex;
              flex-direction: column;
              font-size: .875rem;
              color: #888;

              textarea, input {
                width: 100%;
                min-height: 50px;
                margin: .75rem 0;
                border: none;
                outline: 1px solid #fff0;
                border-radius: $--common-radius;
                background: #f8f8f8;
                resize: none;
                transition: 250ms;

                &:focus {
                  background: #fff;
                  outline: 1px solid transparentize($--theme-color, 0.5);
                  box-shadow: 0 0 0 4px transparentize($--theme-color, 0.75);
                }
              }

              textarea {
                padding: 1.5rem 2rem;
                line-height: 2rem;
              }

              input {
                padding: 1rem 2rem;
              }

              small {
                text-align: right;
                letter-spacing: 1px;
              }
            }

            .submit-button {
              width: 100px;
              padding: 1rem 0;
              border-radius: $--common-radius;
              background: $--theme-color;
              color: #fff;
              border: none;
              transition: 250ms;

              &:hover {
                background: darken($--theme-color, 10%);
                cursor: pointer;
              }
            }
          }
        }
      }
    }

    .section-right {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background: url('../assets/patterns.svg');
      background-repeat: no-repeat;
      background-size: cover;
      
      .main-content {
        padding: 1rem 5rem;

        .title {
          max-width: 800px;
          line-height: 1.15;
          font-size: 3rem;
          font-variation-settings: 'wght' $--bold;
          color: #fffc;
        }

        .description {
          max-width: 500px;
          margin-top: 2rem;
          font-size: .875rem;
          line-height: 1.75;
          color: #fff8;
        }

        .follow-us {
          margin-top: 2rem;

          a {
            position: relative;
            display: inline-block;
            width: 20px;
            height: 20px;
            margin-right: 2rem;

            img {
              position: absolute;
              top: 50%;
              transform: translateY(-50%);
              width: 20px;
              height: auto;
              opacity: .75;

              &:hover {
                opacity: 1;
              }
            }
          }
        }
      }
    }
  }
}

@media only screen and (max-width: 1024px) {
  .contact-us {
    .section-container {
      flex-direction: column;

      .section-left {
        .navigation-bar-plain {
          width: 100%;
        }
        .main-content {
          .form-content {
            min-height: initial;
            padding: 2rem 3rem;
          }
        }
      }

      .section-right {
        .main-content {
          padding: 3rem 3rem;
        }
      }
    }
  }
}

@media only screen and (max-width: 425px) {
.contact-us {
    .section-container {
      .section-left {
        .main-content {
          .form-content {
            padding: 2rem 2rem;
          }
        }
      }
      .section-right {
        .main-content {
          padding: 3rem 2rem;
        }
      }
    }
  }
}
</style>