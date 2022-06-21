<template>
  <section id="error-404" class="error-404">
    <navigation-bar-plain />
    <section class="main-section">
      <div class="section-container">
        <div class="section-content">
          <h6 class="title">PAGE NOT FOUND</h6>
          <img src="../assets/error-404-illustration.webp" alt="error 404 illustration" width="500" height="160">
          <tilted-button class="back-btn" @click.native="goBack()">Go Back</tilted-button>
        </div>
      </div>
    </section>
    <footer-content />
  </section>
</template>

<script>
  import NavigationBarPlain from '@/components/navigation-plain.vue'
  import FooterContent from '@/components/footer.vue'
  import TiltedButton from '@/components/elements/tilted-button.vue'
  export default {
    name: 'Error404Page',
    components: {
      'navigation-bar-plain': NavigationBarPlain,
      'footer-content': FooterContent,
      'tilted-button': TiltedButton
    },
    computed: {
      
    },
    methods: {
      /**
       * @event click
       */
      goBack() {
        window.location.replace("./#/")
      }
    },
    metaInfo: {
      title: 'Page Not Found',
      titleTemplate: '%s | Curzr'
    }
  }
</script>

<style lang="scss">
@import '../style/main.scss';
.error-404 {
  width: 100%;
  min-height: 100vh;
  background-color: #fcfcfc;
  background-image:  linear-gradient($--section-line-color 1px, transparent 1px), linear-gradient(to right, $--section-line-color 1px, #fff 1px);
  background-size: 40px 80px;
  background-position: center;

  .main-section {
    .section-container {
      display: flex;
      align-items: center;
      height: max(100vh, 600px);
      max-width: 1440px;
      margin: 0 auto;
      padding: calc(3rem + $--nav-height) 3rem 3rem;

      .section-content {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        img {
          width: min(500px, 100%);
          height: auto;
          margin: 4rem 0;
          filter: drop-shadow(30px 30px 0 #7771);
        }

        .title {
          font-size: 1rem;
          letter-spacing: 2px;
          color: $--theme-color;
        }

        .back-btn {
          margin: 2rem 0;
        }
      }
    }
  }
}
</style>