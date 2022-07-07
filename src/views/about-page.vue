<template>
  <section id="about-page" class="about-page">
    <navigation-bar-plain />
    <section class="main-section">
      <section class="section section-about-us">
        <div class="section-container">
          <div class="section-left">
            <div class="left-content">
              <h6 class="small-title">ABOUT THIS WEBSITE</h6>
              <h2 class="large-title">Curzr is a website which provides tools and resources that help you to create a fascinating, interesting, and animated cursor by just a ‘copy and paste’.</h2>
              <p class="paragraph">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos necessitatibus a ullam fugit recusandae similique nemo sapiente! Soluta possimus quasi atque, maiores ipsam veniam ea magni delectus blanditiis, exercitationem iste.</p>
            </div>
          </div>
          <div class="section-right">
            <img src="../assets/about-illustration.svg" alt="about this website illustration" width="500" height="500">
          </div>
        </div>
      </section>
      <section class="section section-contributor">
        <div class="section-container">
          <div class="section-left">
            <div class="left-content">
            </div>
          </div>
          <div class="section-right">
            <div class="right-content">
              <h6 class="small-title">CONTRIBUTOR</h6>
              <h2 class="large-title">We're really excited that you are interested in contributing to this project, and your help is very welcome.</h2>
              <p class="paragraph">When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change. Please note we have a code of conduct, please follow it in all your interactions with the project.</p>
            </div>
          </div>
        </div>
      </section>
    </section>
    <footer-content />
  </section>
</template>

<script>
  import NavigationBarPlain from '@/components/navigation-plain.vue'
  import FooterContent from '@/components/footer.vue'
  export default {
    name: 'AboutPage',
    components: {
      'navigation-bar-plain': NavigationBarPlain,
      'footer-content': FooterContent
    },
    computed: {
      
    },
    metaInfo: {
      title: 'About Curzr',
      titleTemplate: '%s | Curzr'
    }
  }
</script>

<style lang="scss">
@import '../style/main.scss';
.about-page {
  width: 100%;
  min-height: 100vh;

  .main-section {
    .section {
      .section-container {
        display: flex;
        align-items: center;
        max-width: 1440px;
        margin: 0 auto;
        padding: calc(3rem + $--nav-height) 3rem 3rem;

        .section-left {
          flex: 1;

          .left-content {
            padding: 1rem 6rem 0 0;

            .small-title {
              letter-spacing: 1px;
              color: darken($--theme-color, 10%);
            }

            .large-title {
              margin-top: 1rem;
              line-height: 1.2;
              font-weight: bold;
              word-spacing: 8px;
              font-variation-settings: 'wght' $--medium;
            }

            .paragraph {
              margin-top: 2rem;
              line-height: 1.75;
              font-size: 1rem;
              opacity: .5;
            }
          }
        }
      }
    }

    .section-about-us {
      .section-right {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 800px;
        border-radius: $--common-radius;
        background-color: #e5e5f7;
        opacity: 0.8;
        box-shadow: 0 0 100px 50px #fff inset;
        background-position: center;
        background-image:  linear-gradient(#83d5e1 1px, transparent 1px), linear-gradient(to right, #83d5e1 1px, #fff 1px);
        background-size: 20px 20px;

        img {
          width: 100%;
          height: auto;
          max-width: 500px;
          filter: saturate(120%);
        }
      }
    }

    .section-contributor {
      position: relative;
      background: darken(#34dcff, 10%);

      .section-container {
        position: relative;
        padding: 6rem 3rem;

        &::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          transform: translate(50%, -50%);
          width: 75px;
          height: 75px;
          border-radius: $--common-radius;
          background: linear-gradient(180deg, rgba(50,255,175,1) 50%, rgba(2,35,119,1) 50%);
        }
        .section-left {
          flex: 1;
        }

        .section-right {
          flex: 1;
          .right-content {
              .small-title {
                letter-spacing: 1px;
                color: #fffd;
              }

              .large-title {
                margin-top: 1rem;
                line-height: 1.2;
                font-weight: bold;
                word-spacing: 8px;
                font-variation-settings: 'wght' $--medium;
                color: #fffd;
              }

              .paragraph {
                margin-top: 2rem;
                line-height: 1.75;
                font-size: 1rem;
                color: #fff;
              }
            }
        }
      }
    }
  }
}

@media only screen and (max-width: 1440px) {
  .section-container {
    .large-title {
      font-size: 2.5rem;
    }
  }
}

@media only screen and (max-width: 1024px) {
  .section-container {
    flex-direction: column;
  }

  .about-page .main-section {
    .section {
      .section-left {
        .left-content.left-content {
          padding: 0;
        }
      }
    }
    .section-about-us {
      .section-right {
        width: 100%;
        min-height: initial;
        margin: 4rem;
      }
    }
  }
}

@media only screen and (max-width: 425px) {
  .about-page .main-section .section {
    .section-container {
      padding: calc(2rem + $--nav-height) 2rem 2rem;
      .large-title {
        font-size: 2rem;
      }
    }
  }
}
</style>