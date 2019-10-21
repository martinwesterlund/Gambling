<template>
  <div id="component-body" class="modern" v-bind:class="{ modern: modern, classic: !modern }">
    <div id="cards-display" class="modern" v-bind:class="{ modern: modern, classic: !modern }">
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

    <div id="resultText">Kombination: {{getCombination}}</div>

    <div id="betCoinBar">
      <span id="settings" @click="toggleTheme">⚙</span>
      <span id="credits">Credits: {{ credits }}</span>
      <button class="draw-button" v-if="round < 1" @click="shuffleCards()">DRAW</button>
      <button class="draw-button" v-if="round > 0" @click="getSomeCards()">DRAW</button>
      <span class="coin" @click="insertCoin()">⇧</span>
      <span id="bet" class="coin">{{ bet }}</span>
      <span class="coin" @click="removeCoin()">⇩</span>
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
  display: block;
  margin: 0 auto;
}

.classic {
  background-color: blue;
}

#cards-display {
  display: inline-flex;
  max-width: 900px;
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
  width: 15vw;
  min-height: 24vh;
  border-color: transparent;
  font-size: 24px;
  padding: 0.3rem 0.1rem 0.1rem;
  transition: all 0.3s;
}

.classic .card {
  background-color: #fff;
  border: 2px solid black;
  font-family: PressStart2P;
  border: solid orangered 5px;
}

.locked {
  border-color: transparent;
}

#betCoinBar {
  margin: 0 auto;
  display: flex;
  justify-content: center;
  cursor: pointer;
  font-size: 24px;
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
.classic #settings {
  font-family: PressStart2P;
  background: none;
  border: none;
  color: #ccc;
}

.classic .draw-button {
  border: solid yellow 5px;
  background-color: gold;
  color: seashell;
}

.classic #credits {
  color: greenyellow;
}

.classic #resultText {
  font-family: PressStart2P;
}
</style>