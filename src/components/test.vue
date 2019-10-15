<template>
  <div>
    <div>{{ credits }}</div>
    <!-- <div v-for="card in cards">{{card.suit}} {{card.value}}</div> -->
    <div
      v-for="card in deck"
      v-bind:key="card.id"
      v-bind:style="[card.suit === 'HEARTS' || card.suit === 'DIAMONDS' ? {color: 'red'} : {color: 'black'}]"
    >{{card.suit}} {{card.value}}</div>
  </div>
</template>

<script>
export default {
  computed: {
    credits() {
      return this.$store.state.credits;
    },
    cards() {
      return this.$store.state.cards;
    },
    deck() {
      return this.$store.state.deck;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>