<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <left-bar></left-bar>
  </div>
</template>

<script>
import leftBar from 'components/leftBar.vue'

export default {
  name: 'App',
  components: {
    leftBar
  }
}
</script>

<style>
@font-face {
  font-family: 'Tencent';
  src: url("assets/Tencent.ttf")
}
</style>
