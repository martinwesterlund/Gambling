<template>
  <div id="component-body" :class="{modern: on, classic: !on}">
    <div
      id="combination"
      v-bind:style="[getCombination == 'COMBINATION' ? {visibility:'hidden'} : {visibility:'visible'}]"
    >{{getCombination}}</div>
    <div id="cards-display">
      <div
        class="card"
        v-for="card in randomCards"
        v-bind:key="card.id"
        v-on:click="lockCard(card.id)"
        v-bind:class="{locked: card.locked}"
        v-bind:style="[card.suit == '♥' || card.suit == '♦' ? {color:'red'} : {color:'black'}]"
      >
        <div class="value">{{card.value}}</div>
        <div class="suit">{{card.suit}}</div>
        <div class="value2">{{card.value}}</div>
      </div>
    </div>

    <div id="betCoinBar">
      <span id="settings" @click="toggleTheme">⚙</span>
      <span id="credits">Credits: {{ credits }}</span>
      <button class="draw-button" v-if="round < 1" @click="shuffleCards()">DRAW</button>
      <button class="draw-button" v-if="round > 0" @click="getSomeCards()">DRAW</button>
      <span
        v-bind:style="[round > 0 ? {pointerEvents: 'none'} : {pointerEvents: 'auto'}]"
        class="coin"
        @click="insertCoin()"
      >⇧</span>
      <span id="bet" class="coin">{{ bet }}</span>
      <span
        v-bind:style="[round > 0 ? {pointerEvents: 'none'} : {pointerEvents: 'auto'}]"
        class="coin"
        @click="removeCoin()"
      >⇩</span>
    </div>
  </div>
</template>
<script>
// import myImage from '~/assets/my-image.png'
// <img :src="myImage">
export default {
  computed: {
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

    on() {
      return this.$store.state.modern;
    }
  },

  methods: {
    shuffleCards() {
      this.$store.commit("getFiveRandomCards");
      this.$store.commit("calculateValue");
    },
    getSomeCards() {
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
    }
  }
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

#component-body {
  margin: 0 auto;
  display: block;
  margin: 0 auto;
}

.classic {
  background-color: #0738b1;
  transition: background-color 300ms linear;
}

#cards-display {
  display: flex;
  justify-content: space-evenly;
}

.suit {
  grid-area: suit;
  min-height: 40%;
  font-size: 40px;
}

.value {
  grid-area: value;
  min-height: 30%;
  text-align: left;
  margin-left: 5px;
  margin-top: 2px;
}

.value2 {
  grid-area: value2;
  min-height: 30%;
  text-align: right;
  margin: 5px;
}

.card {
  cursor: pointer;
  border-radius: 5px;
  margin: 10px;
  width: 20%;
  min-height: 24vh;
  font-size: 24px;
  padding: 0.5rem 0.3rem;
  margin-bottom: 2rem;
}

.classic .card {
  background-color: #fff;
  font-family: PressStart2P;
  transition: all 0.3s;
}

.classic .card:not(.locked) {
  border: 8px solid transparent;
}

.modern .card:not(.locked) {
  border: 2px solid transparent;
}

.modern {
  background-color: #aaa;
}

.modern .card {
  background-color: #bbb;
  border: 2px solid #eee;
  font-family: Lovelo-Black;
}

.classic .locked {
  border: solid 8px #fa2a26;
}

.modern .locked {
  border: solid 2px lightcyan;
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
  font-family: Lovelo-LineBold;
  font-size: 38px;
  color: lightcyan;
}

#betCoinBar {
  cursor: pointer;
  color: #000;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  cursor: pointer;
  font-size: 24px;
  margin-bottom: 2rem;
}

#settings {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
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

.coin {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  font-size: 50px;
}

.classic .coin,
.classic .draw-button,
.classic #credits,
.classic #settings,
.classic #resultText {
  font-family: PressStart2P;
  background: none;
  border: none;
  color: #ccc;
}

.modern .coin,
.modern .draw-button,
.modern #credits,
.modern #settings {
  font-family: FjallaOne;
}

.classic .draw-button {
  border: solid yellow 5px;
  background-color: gold;
  color: seashell;
}

.modern .draw-button {
  background-color: #666;
  color: seashell;
  border: none;
}

.classic #credits {
  color: greenyellow;
}
</style>