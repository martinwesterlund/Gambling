<template>
  <div id="app">
    <!-- <VideoPoker></VideoPoker> -->
    <scoretable></scoretable>
    <VideoPoker></VideoPoker>
  </div>
</template>

<script>
import "./assets/css/fonts.css";

// import HelloWorld from "./components/HelloWorld.vue";
import VideoPoker from "./components/VideoPoker.vue";
//import Component2 from "./components/Component2.vue";
import Scoretable from "./components/Scoretable.vue";
//import DealCards from "./components/DealCards.vue";

export default {
  name: "app",
  components: {
    // HelloWorld,
    // VideoPoker,
    VideoPoker,
    Scoretable
    //DealCards
  },
  created() {
    this.$store.commit("createDeck");
  }
};
</script>

<style>
#app {
  max-width: 900px;
  margin: 0 auto;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #c0cedd;
}

.classic {
  background-color: blue;
}
</style>
