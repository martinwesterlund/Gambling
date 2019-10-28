<template>
  <div
    id="component-body"
    :class="{modern: on, classic: !on}"
  >
    <Scoretable></Scoretable>
    <Settings v-show='showSettings'></Settings>
    <div
      id="combination"
      :style="[getCombination == 'COMBINATION' ? {visibility:'hidden'} : {visibility:'visible'}]"
    >{{getCombination}}</div>
    <div id="cards-display">
      <div id="game-info">{{gameInfo}}</div>
      <div
        v-for="card in randomCards"
        :key="card.id"
        class="card"
        :class="{locked: card.locked}"
        :style="[card.suit == '♥' || card.suit == '♦' ? {color:'#fa2a26'} : {color:'black'}]"
        @click="lockCard(card.id)"
      >
        <div class="value">{{card.value}}</div>
        <div class="suit">{{card.suit}}</div>
        <div class="value2">{{card.value}}</div>
      </div>
    </div>

    <div id="infoBar">
      <span :style="{visibility: win === 0 ? 'hidden' : 'visible'}">WIN {{ win }}</span>
      <span>CREDITS {{ credits }}</span>
    </div>
    <div id="betCoinBar">
      <span
        id="settings"
        @click="toggleSettings"
      >SETTINGS</span>
      <span
        :style="[round > 0 ? {pointerEvents: 'none'} : {pointerEvents: 'auto'}]"
        class="coin-arrow"
        @click="insertCoin()"
      >▲</span>
      <span
        id="bet"
        class="coin"
      >
        {{ bet }}</span>
      <span
        style="[round > 0 ? {pointerEvents: 'none'} : {pointerEvents: 'auto'}]"
        class="coin-arrow"
        @click="removeCoin()"
      >▼</span>
      <button
        v-if="round < 1"
        class="draw-button"
        @click="getCards()"
      >DRAW</button>
      <button
        v-if="round > 0"
        class="draw-button"
        @click="getMoreCards()"
      >DEAL</button>
    </div>
  </div>
</template>
<script>
  import Scoretable from '../components/Scoretable.vue'
  import Settings from '../components/Settings.vue'
  export default {
    components: {
      Scoretable,
      Settings
    },
    computed: {
      componentOn() {
        return this.$store.state.pokerDisplay
      },
      getCombination() {
        return this.$store.state.combination
      },

      randomCards() {
        return this.$store.state.fiveRandomCards
      },

      finalCards() {
        return this.$store.state.finalCards
      },

      credits() {
        return this.$store.state.credits
      },

      bet() {
        return this.$store.state.bet
      },

      round() {
        return this.$store.state.round
      },

      win() {
        return this.$store.state.win
      },

      on() {
        return this.$store.state.modern
      },

      gameInfo() {
        return this.$store.state.gameInfo
      },

      showSettings() {
        return this.$store.state.showSettings
      }
    },

    methods: {
      getCards() {
        this.$store.commit("getFiveRandomCards")
        // this.$store.commit("calculateValue");
      },
      getMoreCards() {
        this.$store.commit("getMoreCards")
      },

      calcValue() {
        this.$store.commit("calculateValue")
      },
      lockCard(id) {
        this.$store.commit("toggleLock", id)
      },

      insertCoin() {
        this.$store.commit("insertCoin");
      },

      removeCoin() {
        this.$store.commit("removeCoin");
      },

      toggleTheme() {
        this.$store.commit("toggleTheme");
      },

      toggleSettings() {
        this.$store.commit('toggleSettings')
      }
    }
  };
</script>


<style scoped>
  #component-body {
    margin: 0 auto;
    display: block;
    height: 100vh;
  }

  .classic {
    background-color: #0738b1;
    transition: all 300ms linear;
  }

  #cards-display {
    position: relative;
    display: flex;
    justify-content: space-evenly;
    height: 30vh;
  }

  .suit {
    display: flex;
    justify-content: center;
    align-items: center;
    grid-area: suit;
    font-size: 40px;
  }

  .value {
    margin-left: 2px;
    display: flex;
    justify-content: flex-start;
    grid-area: value;
  }

  .value2 {
    display: flex;
    align-items: flex-end;
    grid-area: value2;
    justify-content: flex-end;
    margin: 0;
  }

  .card {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    grid-template-areas: "value""suit""value2";
    cursor: pointer;
    border-radius: 5px;
    margin: 10px;
    width: 20%;
    min-height: 24vh;
    font-size: 24px;
    padding: 0.5rem 0.3rem;
    margin-bottom: 2rem;
  }

  #game-info {
    position: absolute;
    top: 45%;
    left: 50%;
    font-size: 3rem;
    transform: translate(-50%, -50%);
  }

  .classic #game-info {
    font-family: PressStart2P;
    color: #fa2a26;
    text-shadow: -4px 0 #ffff37, 0 4px #ffff37, 4px 0 #ffff37, 0 -4px #ffff37;
  }

  .modern #game-info {
    font-family: FjallaOne;
    color: deepskyblue;
    font-size: 4rem;
    letter-spacing: 0.9rem;
    -webkit-text-stroke: 2px white;
    line-height: 4.2rem;
  }

  .classic .card {
    background-color: #fff;
    font-family: PressStart2P;
    /* transition: all 0.3s; */
  }

  .classic .card:not(.locked) {
    border: 8px solid transparent;
  }

  .modern .card:not(.locked) {
    border: 2px solid transparent;
    transition: all 300ms linear;
  }

  .modern {
    background-color: #aaa;
    transition: all 300ms linear;
  }

  .modern .card {
    background-color: #eee;
    border: 4px solid transparent;
    font-family: Lovelo-Black;
  }

  .classic .locked {
    border: solid 8px #fa2a26;
  }

  .modern .locked {
    border: solid 2px #d3728c;
    transition: all 300ms linear;
  }

  #combination {
    padding-top: 20px;
    margin-bottom: 0.3rem;
    line-height: 2rem;
  }

  .classic #combination {
    font-size: 28px;
    font-family: PressStart2P;
    color: #fa2a26;
    text-shadow: -2px 0 #ffff37, 0 2px #ffff37, 2px 0 #ffff37, 0 -2px #ffff37;
  }

  .modern #combination {
    font-family: FjallaOne;
    font-size: 38px;
    color: #dce1e9;
  }

  #infoBar {
    display: flex;
    justify-content: space-around;
    padding: 10px;
  }

  .classic #infoBar {
    font-family: PressStart2P;
    font-size: 24px;
    color: #fa2a26;
    text-shadow: -2px 0 #ffff37, 0 2px #ffff37, 2px 0 #ffff37, 0 -2px #ffff37;
  }

  .modern #infoBar {
    font-family: FjallaOne;
    font-size: 24px;
    color: #53d8fb;
  }

  #betCoinBar {
    cursor: pointer;
    color: #000;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    cursor: pointer;
    font-size: 24px;
    padding: 10px;
  }

  #settings {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 250px;
    height: 100px;
    font-size: 50px;
  }

  #credits {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 200px;
    height: 100px;
  }

  .draw-button {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 250px;
    height: 100px;
    font-size: 50px;
  }

  .coin,
  .coin-arrow {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100px;
    height: 100px;
    font-size: 50px;
  }

  .classic .coin,
  .classic .coin-arrow,
  .classic .draw-button,
  .classic #credits,
  .classic #settings,
  .classic #resultText {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100px;
    height: 100px;
    margin: 10px;
    font-family: PressStart2P;
    font-size: 40px;
    background: none;
    border: none;
    color: #000;
    border: solid yellow 5px;
    background-color: gold;
    border-radius: 5px;
  }

  .classic .draw-button {
    width: 200px;
  }

  .classic #settings {
    width: 200px;
    font-size: 20px;

  }

  .modern .coin,
  .modern .coin-arrow,
  .modern .draw-button,
  .modern #credits,
  .modern #settings {
    font-family: FjallaOne;
  }

  .modern .draw-button {
    background-color: #666;
    color: seashell;
    border: none;
  }

  .classic #credits {
    color: greenyellow;
  }

  .classic .draw-button:active,
  .clasic .coin-arrow:active,
  .classic #settings:active {
    border: solid gold 5px;
    background-color: yellow;
  }

  .modern .draw-button:active,
  .modern .coin-arrow:active,
  .modern #settings:active {
    background-color: #53d8fb;
  }

  .classic #game-info {
    animation: blinker 1s linear infinite;
  }

  @keyframes blinker {
    0% {
      opacity: 1;
    }

    49% {
      opacity: 1;
    }

    50% {
      opacity: 0;
    }

    100% {
      opacity: 0;
    }
  }
</style>
