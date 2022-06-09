<template>
  <footer id="footer" class="footer">
    <div class="footer-content">
      <section class="logo">
        <img class="img" src="../assets/logo/curzr_logo-long.png" alt="curzr logo" width="150">
        <img class="img-shadow" src="../assets/logo/curzr_logo-long.png" alt="curzr logo" width="150">
        <small>Curzr | Custom Cursor Library</small>
      </section>
      <section class="route">
        <div class="product-page">
          <h6 class="link-title">Product</h6>
          <div class="link-container">
            <a href="#">Pointer Library</a>
            <a href="#">Cursor Builder</a>
            <a href="#">Package</a>
          </div>
        </div>
        <div class="website">
          <h6 class="link-title">Website</h6>
          <div class="link-container">
            <a href="#">About</a>
            <a href="#">Terms Of Service</a>
            <a href="#">Contribute</a>
            <a href="#">Contact Me</a>
            <a href="#">Privacy Policy</a>
          </div>
        </div>
        <div class="relavant-link">
          <h6 class="link-title">Relavant Link</h6>
          <div class="link-container">
            <a href="#">Github</a>
            <a href="#">Instagram</a>
            <a href="#">Codepen</a>
          </div>
        </div>
      </section>
    </div>
    <div class="copyright">
      <div class="copyright-left">
        <small>Website, name &#38; logo &copy; 2022-{{ thisYear }} | Curzr</small>
      </div>
      <div class="copyright-right">
        <small>licensed under <a href="https://github.com/TaylonChan/Curzr/blob/master/LICENSE.md" target="_blank" rel="noopener noreferrer">Apache License 2.0</a></small>
      </div>
    </div>
  </footer>
</template>

<script>
  export default {
    name: 'FooterContent',
    components: {
      
    },
    data() {
      return {
      }
    },
    computed: {
      thisYear() {
        return new Date().getFullYear()
      }
    }
  }
</script>

<style lang="scss">
@import '../style/main.scss';

.footer {
  min-height: 300px;
  padding: 2rem 5rem;
  background: darken($--background-sub-color, 2.5%);
  overflow: hidden;

  .footer-content {
    display: flex;
    justify-content: space-between;

    .logo {
      position: relative;
      display: flex;
      flex-direction: column;

      .img {
        width: 150px;
        z-index: 1;
      }

      .img-shadow {
        position: absolute;
        top: 0;
        left: 0;
        filter: grayscale(1);
        opacity: .05;
        transform: scale(4) rotate(-15deg) translate(5px, -5px);
      }

      small {
        padding-left: 1rem;
        margin-top: .5rem;
        opacity: .5;
      }
    }

    .route {
      display: flex;

      & > * {
        flex: 1;

        .link-container {
          display: flex;
          flex-direction: column;
          margin-top: 1rem;
          margin-right: 5rem;
          font-size: .875rem;

          a {
            margin-top: .5rem;
            white-space: nowrap;
            opacity: .5;
            transition: 250ms;

            &:hover {
              opacity: 1;
            }
          }
        }
      }
    }
  }

  .copyright {
    display: flex;
    justify-content: space-between;
    margin: 2rem 1rem 0 1rem;
    padding-top: 1.5rem;
    border-top: 1px solid darken($--section-line-color, 7.5%);

    a {
      color: blue;
    }
  }
}

@media only screen and (max-width: 1440px) {
  .footer {

    .footer-content {
      flex-direction: column;

      .route {
        padding-top: 2rem;
        padding-left: 1rem;
      }
    }
  }
}

@media only screen and (max-width: 768px) {
  .footer {
    .footer-content {
      .route {
        flex-direction: column;

        & > * {
          margin-top: 2rem;

          .link-container {
            margin-right: 0;
          }
        }
      }
    }

    .copyright {
      flex-direction: column;

      & > *:not(:first-child) {
        margin-top: 1rem;
      }
    }
  }
}

@media only screen and (max-width: 768px) {
  .footer {
    padding: 2rem;
  }
}
</style>