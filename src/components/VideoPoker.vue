<template>
  <div
    id="component-body"
    :class="{modern: on, classic: !on}"
  >
    <Scoretable></Scoretable>
    <Settings v-show="showSettings"></Settings>
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
      >{{ bet }}</span>
      <span
        :style="[round > 0 ? {pointerEvents: 'none'} : {pointerEvents: 'auto'}]"
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
  import Scoretable from "../components/Scoretable.vue";
  import Settings from "../components/Settings.vue";
  export default {
    components: {
      Scoretable,
      Settings
    },
    computed: {
      componentOn() {
        return this.$store.state.pokerDisplay;
      },
      getCombination() {
        return this.$store.state.combination;
      },

      randomCards() {
        return this.$store.state.fiveRandomCards;
      },

      finalCards() {
        return this.$store.state.finalCards;
      },

      credits() {
        return this.$store.state.credits;
      },

      bet() {
        return this.$store.state.bet;
      },

      round() {
        return this.$store.state.round;
      },

      win() {
        return this.$store.state.win;
      },

      on() {
        return this.$store.state.modern;
      },

      gameInfo() {
        return this.$store.state.gameInfo;
      },
      showSettings() {
        return this.$store.state.showSettings;
      }
    },
    methods: {
      getCards() {
        if (this.credits === 0) {
          alert("STOPP OCH BELÄGG! ÄR DU INTE SPELBEROENDE?");
          let answer = prompt(
            'OM DU VILL SPELA MER SÅ BEKRÄFTA ATT DU INTE HAR PROBLEM! SKRIV "JAG ÄR INTE SPELBEROENDE"'
          );

          if (answer === "JAG ÄR INTE SPELBEROENDE") {
            alert("OKEJ. DU FÅR 10 CREDITS TILL. SPELA HÄLSOSAMT KÄRA BARN.")
            this.$store.commit("addCredits");
            // this.$store.commit("getFiveRandomCards")
          }
        }

        this.$store.commit("getFiveRandomCards");
      },

      getMoreCards() {
        this.$store.commit("getMoreCards");
      },

      calcValue() {
        this.$store.commit("calculateValue");
      },
      lockCard(id) {
        this.$store.commit("toggleLock", id);
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
        this.$store.commit("toggleSettings");
      }

    },

  };
</script>


<style scoped>



  #combination {
    text-align: center;
    margin-top: 3vh;
    font-size: 1.3rem;
  }

  #cards-display {
    position: relative;
    display: flex;
    justify-content: space-evenly;
    height: 27vh;
    margin-top: 3vh;
  }

  #game-info {
    text-align: center;
    position: absolute;
    top: 27%;
    left: 50%;
    font-size: 3rem;
    transform: translate(-50%, -50%);
    width: 80vw;
  }

  .card {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    grid-template-areas: "value""suit""value2";
    cursor: pointer;
    border-radius: 5px;
    margin: 3px;
    width: 20%;
    max-height: 18vh;
    font-size: 1.3rem;
    margin-bottom: 2rem;
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

  #infoBar {
    display: flex;
    justify-content: space-around;

    font-size: 2rem;
  }

  #betCoinBar {
    cursor: pointer;
    color: #000;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    cursor: pointer;
    font-size: 2rem;
    align-items: center;
    height: 15vh;
  }

  #settings {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 250px;
    height: 100px;
    font-size: 0.8rem;
  }

     .modern #settings{
      font-size: 1rem;
        color: #222;
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
    height: 5rem;
  }

  .coin,
  .coin-arrow {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100px;
    height: 100px;
  }

  .modern {
    font-family: FjallaOne;
    background-color: #aaa;
  }

  .modern #game-info {
    color: deepskyblue;
    font-size: 3.6rem;
    letter-spacing: 0.7rem;
    -webkit-text-stroke: 2px white;
    line-height: 4rem;
  }

  .modern .card {
    background-color: #eee;
    border: 2px solid #d3728c;
    font-family: Lovelo-Black;
    transition: all 300ms linear;
  }

  .modern .card:not(.locked) {
    border: 2px solid transparent;
    transition: all 300ms linear;
  }

  .modern .draw-button:active,
  .modern .coin-arrow:active,
  .modern #settings:active {
    background-color: #53d8fb;
  }

  .modern .draw-button {
    background-color: #666;
    color: seashell;
    border: none;
    font-family: FjallaOne;
    font-size: 2rem;
  }

  .classic {
    font-family: PressStart2P;
    background-color: #0738b1;
  }

  .classic #combination {
    color: #fa2a26;
    text-shadow: -2px 0 #ffff37, 0 2px #ffff37, 2px 0 #ffff37, 0 -2px #ffff37;
  }

  .classic #game-info {
    color: #fa2a26;
    text-shadow: -4px 0 #ffff37, 0 4px #ffff37, 4px 0 #ffff37, 0 -4px #ffff37;
    animation: blinker 1s linear infinite;
    max-width: 850px;
  }

  .classic .card {
    background-color: #fff;
    border: 4px solid red;
  }

  .classic .card:not(.locked) {
    border: 4px solid transparent;
  }

  .classic #infoBar {
    font-size: 1.5rem;
    color: #fa2a26;
    text-shadow: -2px 0 #ffff37, 0 2px #ffff37, 2px 0 #ffff37, 0 -2px #ffff37;
  }

  .classic #betCoinBar {
    font-size: 1rem;
  }

  .classic .draw-button {
    background-color: #666;
    color: seashell;
    border: none;
    font-family: PressStart2P;
    font-size: 2rem;
    height: 5rem;
  }

  .classic .coin,
  .classic .coin-arrow,
  .classic .draw-button,
  .classic #credits,
  .classic #settings {
    margin: 2px;
    color: #000;
    border: solid yellow 5px;
    background-color: gold;
    border-radius: 5px;
    cursor: pointer;
    height: 5rem;
  }

  .classic .draw-button:active,
  .classic .coin-arrow:active,
  .classic #settings:active {
    border: solid gold 5px;
    background-color: yellow;
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

  @media only screen and (min-width: 481px) {
    .card {
      max-height: 22vh;
      font-size: 2.5rem;
    }

    .classic .card {
      background-color: #fff;
      border: 6px solid red;
    }

    .classic .card:not(.locked) {
      border: 6px solid transparent;
    }

    .classic #betCoinBar {
      font-size: 1rem;
    }

    .classic .draw-button {
      font-size: 2rem;
    }

    .classic #settings {
      font-size: 1rem;
    }

    .modern .card {
      border: 4px solid #d3728c;
    }

    .modern .card:not(.locked) {
      border: 4px solid transparent;
    }

    .modern #betCoinBar {
      font-size: 2rem;
    }

       .modern #settings{
      font-size: 1.5rem;
    }
  }

  @media only screen and (min-width: 769px) {
    #component-body {
      max-width: 900px;
    }

    .card {
      max-height: 30vh;
    }

    .classic .card {
      border: 8px solid red;
    }

    .classic .card:not(.locked) {
      border: 8px solid transparent;
    }

    .classic #betCoinBar {
      font-size: 2.2rem;
    }

     .classic #settings {
      font-size: 1.4rem;
    }

    .modern #cards-display {
      margin-top: 2.5vh;
    }

    .modern .card {
      border: 6px solid #d3728c;
    }

    .modern .card:not(.locked) {
      border: 6px solid transparent;
    }

    .modern #betCoinBar {
      font-size: 2.2rem;
    }

    .modern #settings{
      font-size: 2rem;
    }
  }
</style>
