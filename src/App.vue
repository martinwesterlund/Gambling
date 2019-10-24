<template>
  <div id="app">
    <scoretable></scoretable>
    <VideoPoker></VideoPoker>
    <PersonalityTest></PersonalityTest>
  </div>
</template>

<script>
import "./assets/css/fonts.css";

import VideoPoker from "./components/VideoPoker.vue";
import Scoretable from "./components/Scoretable.vue";
import PersonalityTest from "./components/PersonalityTest.vue";

export default {
  name: "app",
  components: {
    VideoPoker,
    Scoretable,
    PersonalityTest
  },
  created() {
    this.$store.commit("createDeck");
  }
};
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
}

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
