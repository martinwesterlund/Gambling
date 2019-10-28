<template>
  <div id="app">
    <ul id="navbar">
      <li>
        <router-link to="/">
          Hem
        </router-link>
      </li>
      <li>
        <router-link to="/poker">
          Pokerspelet
        </router-link>
      </li>
      <li>
        <router-link to="/test">
          Testet
        </router-link>
      </li>
    </ul>

    <router-view></router-view>

    <!-- <LandingPage></LandingPage>
    <VideoPoker></VideoPoker>
    <PersonalityTest></PersonalityTest>-->
  </div>
</template>

<script>
  import './assets/css/fonts.css'

  import LandingPage from './components/LandingPage.vue'
  import VideoPoker from './components/VideoPoker.vue'
  import PersonalityTest from './components/PersonalityTest.vue'


  export default {
    components: {
      LandingPage,
      PersonalityTest,
      VideoPoker
    },
    created() {
      this.$store.commit('createDeck')
    },
    name: 'App',
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
    max-width: 900px;
    height: 100vh;
    margin: 0 auto;
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #c0cedd;
  }

  ul {
    display: flex;
    justify-content: center;
    text-decoration: none;
    list-style-type: none;
    background-color: gray;
    padding: 0;
  }

  li {
    align-content: center;
    margin: 1.3rem 3rem;
  }

  a {
    text-decoration: none;
    color: seashell;
  }

  a {
    font-family: FjallaOne;
  }


  .classic {
    background-color: blue;
  }
</style>
