<template>
  <div id="app">
    <VideoPoker></VideoPoker>
    <component2></component2>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import VideoPoker from './components/VideoPoker.vue'
import Component2 from './components/Component2.vue'

export default {
  name: 'app',
  components: {
    HelloWorld,
    VideoPoker,
    Component2
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
