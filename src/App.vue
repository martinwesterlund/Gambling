<template>
  <div id="app">
    <ul>
      <li>
        <router-link to="/">Hem</router-link>
      </li>
      <li>
        <router-link to="/poker">Pokerspelet</router-link>
      </li>
      <li>
        <router-link to="/test">Testet</router-link>
      </li>
    </ul>
    <router-view></router-view>

    <!-- <LandingPage></LandingPage>
    <VideoPoker></VideoPoker>
    <PersonalityTest></PersonalityTest>-->
  </div>
</template>

<script>
import "./assets/css/fonts.css";

import LandingPage from "./components/LandingPage.vue";
import VideoPoker from "./components/VideoPoker.vue";
import PersonalityTest from "./components/PersonalityTest.vue";

export default {
  name: "app",
  components: {
    LandingPage,
    VideoPoker,
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
