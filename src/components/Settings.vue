<template>
  <div class="modal-container">
    <div
      class="modal-content"
      :class="{modern: on, classic: !on}"
    >
      <div id="close">
        <span @click="closeSettings">X</span>
      </div>
      <div
        id="theme"
        @click="toggleTheme"
      >
        Theme:
        <span :class="{selected: currentTheme}">Modern</span>
        <span :class="{selected: !currentTheme}">Classic</span>
      </div>
      <div
        id="sound"
        @click="toggleSound"
      >
        Sound:
        <span :class="{selected: soundOn}">On</span>
        <span :class="{selected: !soundOn}">Off</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      toggleTheme() {
        this.$store.commit("toggleTheme");
      },
      toggleSound() {
        this.$store.commit("toggleSound");
      },
      closeSettings() {
        this.$store.commit("toggleSettings");
      },
      on() {
        return this.$store.state.modern;
      }
    },

    computed: {
      currentTheme() {
        return this.$store.state.modern;
      },
      soundOn() {
        return this.$store.state.soundOn;
      }
    }
  };
</script>

<style scoped>
  * {
    cursor: pointer;
  }

  .modal-container {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 1;
  }

  .modal-content {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    margin: 10vh auto;
    height: 50%;
    width: 90vw;
  }

  #theme,
  #sound {
    margin: 0 auto;
  }

  .modern .modal-container {
    font-family: FjallaOne;
    font-size: 2rem;
    color: seashell;
  }

  .modern .modal-content {
    background-color: #333;
    color: seashell;
    transition: background-color 300ms linear;
  }

  .classic .modal-container {
    font-family: PressStart2P;

  }

  .classic .modal-content {
    background-color: #0738b1;
    color: yellow;
    transition: background-color 300ms linear;
    font-size: 0.7rem;
  }

  .classic .selected {
    color: cyan;
    border: none;
    background-color: navy;
    border: solid 4px navy;
  }

  .modern .selected {
    color: #53d8fb;
    border-color: #53d8fb;
    background: none;
    border: solid 4px seashell;
  }

  .modern #close {
    color: cyan;
    /* For some reason this rule changes*/
  }

  .classic #close {
    color: yellow;
  }

  #close {
    font-size: 30px;
    display: flex;
    justify-content: flex-end;
    margin: 20px;
  }

  div span {
    padding: 10px;
  }

  .selected {
    border: 4px solid white;
  }

  @media only screen and (min-width: 481px) {
    .classic .modal-content {

      font-size: 1.2rem;
    }
  }

  @media only screen and (min-width: 769px) {
    .classic .modal-content {

      font-size: 1.5rem;
    }

    .modal-content {
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: 1fr 1fr 1fr;
      margin: 10vh auto;
      height: 50%;
      width: 750px;
    }

  }
</style>
