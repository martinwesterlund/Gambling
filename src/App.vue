<template>
  <div id="app">
    <ul id="navbar">
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
  </div>
</template>

<script>
  import "./assets/css/fonts.css";

  import LandingPage from "./components/LandingPage.vue";
  import VideoPoker from "./components/VideoPoker.vue";
  import PersonalityTest from "./components/PersonalityTest.vue";

  export default {
    components: {
      LandingPage,
      PersonalityTest,
      VideoPoker
    },
    created() {
      this.$store.commit("createDeck");
    },
    name: "App"
  };
</script>

<style>
  * {
    box-sizing: border-box;
    margin: 0;

  }

  #app {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }

  body {
    background-color: #222;
  }

  #navbar {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    list-style-type: none;
    background-color: gray;
    padding: 0;
    margin: 0;
    height: 10vh;
  }

  #navbar li a {
    text-decoration: none;
    color: seashell;
    font-family: FjallaOne;
    cursor: pointer;
  }

  @media only screen and (min-width: 769px) {
    #app {
      max-width: 900px;
      margin: 0 auto;
    }
  }
</style>
