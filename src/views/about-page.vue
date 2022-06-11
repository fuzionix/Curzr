<template>
  <section id="about-page" class="about-page">
    <navigation-bar-plain />
    <section class="main-section">
      <section class="section-about-us">
        <div class="about-us-left">
          <div class="left-content">
            <h6 class="small-title">ABOUT THIS WEBSITE</h6>
            <h2 class="large-title">Curzr is a website which provides tools and resources that help you to create a fascinating, interesting, and animated cursor by just a ‘copy and paste’.</h2>
            <p class="paragraph">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos necessitatibus a ullam fugit recusandae similique nemo sapiente! Soluta possimus quasi atque, maiores ipsam veniam ea magni delectus blanditiis, exercitationem iste.</p>
          </div>
        </div>
        <div class="about-us-right">
          <img src="../assets/about-illustration.svg" alt="about this website illustration" width="500">
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

    .section-about-us {
      display: flex;
      align-items: center;
      max-width: 1440px;
      margin: 0 auto;
      padding: calc(2rem + $--nav-height) 3rem 2rem;

      .about-us-left {
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

      .about-us-right {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 800px;
        border-radius: $--common-radius;
        background-color: #e5e5f7;
        opacity: 0.8;
        box-shadow: 0 0 100px #fff inset;
        background-position: center;
        background-image:  linear-gradient(#83d5e1 1px, transparent 1px), linear-gradient(to right, #83d5e1 1px, #fff 1px);
        background-size: 20px 20px;

        img {
          width: 100%;
          max-width: 500px;
          filter: saturate(120%);
        }
      }
    }
  }
}
</style>