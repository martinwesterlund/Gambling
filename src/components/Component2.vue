<template>
  <div>
    <div id="cards-display">
      <div class="card" 
      v-for="card in randomCards" 
      v-bind:key="card.id" 
      v-on:click="lockCard(card.id)"
      v-bind:class="{locked: card.locked}"
      v-bind:style="[card.suit == '♥' || card.suit == '♦' ? {color:'red'} : {color:'black'}]">
        <div class="value">{{card.value}}</div>
        <div class="suit">{{card.suit}}</div>
        <div class="value2">{{card.value}}</div>
      </div>
    </div>
    
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
  </div>
</template>
<script>
export default {
  computed: {
    getCombination() {
      return this.$store.state.combination
    },

    randomCards() {
      return this.$store.state.fiveRandomCards
    },

    finalCards() {
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
    }
  },

  methods: {
    shuffleCards() {
      this.$store.commit("getFiveRandomCards")
      this.$store.commit("calculateValue")
    },
    getSomeCards(){
      this.$store.commit("getMoreCards")
    },

    calcValue(){
      this.$store.commit("calculateValue")
    },
    lockCard(id){
      this.$store.commit("toggleLock", id)
    },

    insertCoin(){
      this.$store.commit("insertCoin")
    },

    removeCoin(){
      this.$store.commit("removeCoin")
    }
  }
};
</script>

<style scoped>
#cards-display {
  display: inline-flex;
}

.suit{
    grid-area: suit;
    min-height: 40%;
    font-size: 40px;
}

.value{
    grid-area: value;
    
    min-height: 30%;
    text-align: left;
    margin-left: 5px;
    margin-top: 2px;
}

.value2{
    grid-area: value2;
    min-height: 30%;
    text-align: right;
    margin: 5px;


}

.card {  
  cursor: pointer;
  border-radius: 5px;
  margin: 10px;
  width: 75px;
  height: 120px;
  border: 2px solid black;
  font-size: 24px;
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
}
</style>