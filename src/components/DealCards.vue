<template>
  <div>
    <div id="cards-display">
      <div
        class="card"
        v-for="card in randomCards"
        v-bind:key="card.id"
        v-bind:style="[card.suit === '♥' || card.suit === '♦' ? {color: 'red'} : {color: 'black'}]"
      >
        <div class="value">{{card.value}}</div>
        <div class="suit">{{card.suit}}</div>
        <div class="value2">{{card.value}}</div>
      </div>
    </div>
    <button @click="shuffleCards()">Klicka för att spela!</button>
  </div>
</template>


<script>
export default {
  computed: {
    randomCards() {
      return this.$store.state.fiveRandomCards;
    }
  },

  methods: {
    shuffleCards() {
      this.$store.commit("getFiveRandomCards");
    }
  }
};
</script>

<style scoped>
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