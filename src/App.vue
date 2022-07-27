<template>
  <div 
    id="app"
    class="app"
  >
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  metaInfo: {
    meta: [
      {
        name: 'description',
        content: 'Curzr is a website which provides tools and resources that help you to create a fascinating, interesting, and animated cursor by just a ‘copy and paste’.'
      },
      {
        name: 'keywords',
        content: 'custom cursor,cursor,mouse cursor,mouse pointer,css cursor,front end developer,frontend,javascript'
      }
    ]
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Overpass+Mono:wght@300&family=Plus+Jakarta+Sans:wght@200;500;800&display=swap');
</style>
