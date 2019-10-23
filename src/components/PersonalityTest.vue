<template>
  <div id="body">
    <div id="question">{{questions[this.questionNumbers].question}}</div>
    <div>
      <div
        id="alternatives"
        v-for="a in alternatives"
        @click="submit(a.value); qCounter();"
      >{{a.answer}}</div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    questions() {
      return this.$store.state.questions;
    },
    questionNumber() {
      return this.$store.state.questionNumber;
    },
    alternatives() {
      return this.$store.state.questions[this.questionNumber].alternatives;
    }
  },

  methods: {
    submit() {
      this.$store.commit("submitAnswer");
    },
    qCounter() {
      this.$store.commit("questionCounter");
    }
  }
};
</script>

<style scoped>
#body {
  padding: 3rem;
  background-color: #333;
}

#question {
  font-family: FjallaOne;
  margin-bottom: 2rem;
}

#alternatives {
  display: inline;
  padding: 2rem;
  font-family: NotoSans;
}
</style>