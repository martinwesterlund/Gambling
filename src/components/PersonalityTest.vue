<template>
  <div id="body">
    <div
      v-show="startOn"
      id="startPage"
    >
      <div class="headline">
        Välkommen till ett test om spelmissbruk!
      </div>
      <button
        class="button"
        @click="hideStart(); showQuiz();"
      >
        Starta testet
      </button>
    </div>
    <!-- startpage -->

    <div
      v-show="quizOn"
      id="quiz"
    >
      <div class="headline">{{ questions[questionNumber].question }}</div>
      <div
        v-for="a in alternatives"
        id="alternatives"
        :key="a.answer + a.value"
        @click="submit(a.value); qCounter();"
      >
        {{ a.answer }}
      </div>
      <div>
        <button
          class="button"
          @click="reset"
        >
          JAG VILL BÖRJA OM!
        </button>
      </div>
    </div>
    <!-- quiz -->
  </div>
  <!-- body -->
</template>

<script>
  export default {
    computed: {
      alternatives() {
        return this.$store.state.questions[this.questionNumber].alternatives
      },
      componentOn() {
        return this.$store.state.testDisplay
      },
      questionNumber() {
        return this.$store.state.questionNumber
      },
      questions() {
        return this.$store.state.questions
      },
      quizOn() {
        return this.$store.state.quizDisplay
      },
      startOn() {
        return this.$store.state.startDisplay
      },
    },

    methods: {
      submit(value) {
        this.$store.commit("submitAnswer", value)
      },
      qCounter() {
        this.$store.commit("questionCounter")
      },
      hideStart() {
        this.$store.commit("hideStart")
      },
      showQuiz() {
        this.$store.commit("showQuiz")
      },
      reset() {
        this.$store.commit("resetQuiz")
      }
    }
  }
</script>

<style scoped>
  #body {
    padding: 3rem;
    background-color: #333;
    height: 70vh;
  }

  .headline {
    font-family: FjallaOne;
    font-size: 2.3rem;
    margin-bottom: 2rem;
  }

  .button {
    background: #222;
    border: none;
    padding: 1rem 2rem;
    color: #ddd;
    font-family: NotoSans-Bold;
    margin-top: 1.5rem;
  }

  .button:hover {
    background: #000;
  }

  #alternatives {
    display: inline-block;
    padding: 0.5rem 2rem;
    font-family: NotoSans-Bold;
    font-size: 1.3rem;
    margin: 1rem 2rem;
    color: seashell;
    border: 3px dotted white;
  }

  #alternatives:hover {
    background-color: #666;
    color: #fff
  }
</style>
