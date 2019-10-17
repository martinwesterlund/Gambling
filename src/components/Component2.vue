<template>
  <div id="component-body">
    <div id="cards-display">
      <div
        class="card"
        v-for="card in randomCards"
        v-bind:key="card.id"
        v-on:click="lockCard(card.id)"
        v-bind:style="[card.suit == '♥' || card.suit == '♦' ? {color:'red'} : {color:'black'}]"
      >
        <div class="value">{{card.value}}</div>
        <div class="suit">{{card.suit}}</div>
        <div class="value2">{{card.value}}</div>
      </div>
    </div>
    <button @click="shuffleCards()">Ge mig 5 kort!</button>
    <button @click="getSomeCards()">Ge mig några kort till</button>
    <!-- <div>Kombination: {{getCombination}}</div>
    <div>Osorterad lista: {{randomCards}}</div>
    <div>Sorterad lista:{{ finalCards }}</div>-->
  </div>
</template>
<script>
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
    }
  }
};
</script>

<style scoped>
#component-body {
  background-color: seashell;
  width: 70vw;
}

#cards-display {
  display: inline-flex;
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
  border-radius: 5px;
  margin: 10px;
  width: 75px;
  height: 120px;
  border: 1px solid black;
  font-size: 24px;
}
</style>