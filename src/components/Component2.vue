<template>
  <div id="component-body">
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
<<<<<<< HEAD
    
    <div>Kombination: {{getCombination}}</div>
    
    <div id="betCoinBar">
      <span>Credits = {{ credits }}</span>
      <button v-if="round < 1" @click="shuffleCards()">Ge mig 5 kort!</button>
      <button v-if="round > 0" @click="getSomeCards()">Ge mig några kort till</button>
      <span @click="insertCoin()">⇧</span>
      <span>{{ bet }}</span>
      <span @click="removeCoin()">⇩</span>
    </div>
   
    
    <!-- <div>Osorterad lista: {{randomCards}}</div>
    <div>Sorterad lista:{{ finalCards }}</div> -->
=======
    <div id="button-field">
      <button @click="shuffleCards()">Ge mig 5 kort!</button>
      <button @click="getSomeCards()">Ge mig några kort till</button>
    </div>

    <!-- <div id="status-log">
      <div>Kombination: {{getCombination}}</div>
      <div>Osorterad lista: {{randomCards}}</div>
      <div>Sorterad lista:{{ finalCards }}</div>
    </div>-->
>>>>>>> 2985b06767765bff6eacbe8b6fa5f4dd22e88c63
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
<<<<<<< HEAD
      return this.$store.state.finalCards
    },

    credits(){
      return this.$store.state.credits
    },

    bet(){
      return this.$store.state.bet
    },

    round(){
      return this.$store.state.round
=======
      return this.$store.state.finalCards;
>>>>>>> 2985b06767765bff6eacbe8b6fa5f4dd22e88c63
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
<<<<<<< HEAD
    lockCard(id){
      this.$store.commit("toggleLock", id)
    },

    insertCoin(){
      this.$store.commit("insertCoin")
    },

    removeCoin(){
      this.$store.commit("removeCoin")
=======
    lockCard(id) {
      this.$store.commit("toggleLock", id);
>>>>>>> 2985b06767765bff6eacbe8b6fa5f4dd22e88c63
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
  background-color: gold;
  display: block;
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

<<<<<<< HEAD
.card {  
  cursor: pointer;
=======
.card {
>>>>>>> 2985b06767765bff6eacbe8b6fa5f4dd22e88c63
  border-radius: 5px;
  margin: 10px;
  width: 75px;
  height: 120px;
  border: 2px solid black;
  font-size: 24px;
<<<<<<< HEAD
  box-shadow: 10px 10px 5px #888888;
  transition: box-shadow 0.2s;
}

.locked {
  box-shadow: 0px 0px 0px;
  
  
}

#betCoinBar{
  width: 60%;
  margin: 0 auto;
  display: flex;
  justify-content:space-around;
  cursor: pointer;
  font-size: 36px;
}

#betCoinBar span{
  border: 1px solid black;
  padding: 10px;
=======
  box-shadow: 0px;
  transition: box-shadow 1s;
  background-color: white;
}

.locked {
  box-shadow: 10px 10px 5px #888888;
>>>>>>> 2985b06767765bff6eacbe8b6fa5f4dd22e88c63
}
</style>