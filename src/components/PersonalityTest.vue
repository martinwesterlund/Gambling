<template>
  <div id="body">
    <div id="startPage" v-show="startOn">
      <div class="headline">Välkommen till ett test om spelmissbruk!</div>
      <button @click="hideStart(); showQuiz();">Starta testet</button>
    </div>
    <!-- startpage -->

    <div id="quiz" v-show="quizOn">
      <div class="headline">{{questions[this.questionNumber].question}}</div>
      <div
        id="alternatives"
        v-for="a in alternatives"
        @click="submit(a.value); qCounter();"
        v-bind:key="a.answer + a.value"
      >{{a.answer}}</div>
      <div>
        <button @click="reset">JAG VILL BÖRJA OM!</button>
      </div>

      <div>
        <button>TILL VIDEOPOKER</button>
      </div>
    </div>
    <!-- quiz -->
  </div>
  <!-- body -->
</template>

<script>
export default {
  computed: {
    componentOn() {
      return this.$store.state.testDisplay;
    },
    startOn() {
      return this.$store.state.startDisplay;
    },
    quizOn() {
      return this.$store.state.quizDisplay;
    },
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
    submit(value) {
      this.$store.commit("submitAnswer", value);
    },
    qCounter() {
      this.$store.commit("questionCounter");
    },
    hideStart() {
      this.$store.commit("hideStart");
    },
    showQuiz() {
      this.$store.commit("showQuiz");
    },
    reset() {
      this.$store.commit("resetQuiz");
    }
  }
};
</script>

<style scoped>
#body {
  padding: 3rem;
  background-color: #333;
  height: 100vh;
}

.headline {
  font-family: FjallaOne;
  font-size: 2.3rem;
  margin-bottom: 2rem;
}

#alternatives {
  display: inline-block;
  padding: 2rem;
  font-family: NotoSans;
  font-size: 1.3rem;
  margin-bottom: 2rem;
}
</style>