<template>
  <div>
    <div>{{ credits }}</div>
    <div
      v-for="card in deck"
      v-bind:key="card.value+card.suit"
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

    deck() {
      return this.$store.state.cards;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>