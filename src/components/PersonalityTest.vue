<template>
  <div id="body">
    <div
      v-show="startOn"
      id="startPage"
    >
      <div class="headline">
        Här kan du ta ett test om spelmissbruk
      </div>

      <div>
        <button
          class="button"
          @click="hideStart(); showQuiz();"
        >
          Starta testet
        </button>
      </div>
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
        @click="submit(a.value) "
      >
        {{ a.answer }}
      </div>
      <div class="button-row">

        <button
          v-show="questionNumber >= 1"
          class="button"
          @click="prevQuestion"
        >
          FÖREGÅENDE FRÅGA
        </button>
        <button
          class="button"
          @click="reset"
        >
          JAG VILL BÖRJA OM!
        </button>
      </div>
    </div>
    <!-- quiz -->

    <div
      v-show="resultOn"
      id="result"
    >
      <div class="buttonRow">
        <div class="headline"> {{ results }}</div>

        <button
          class="button"
          @click="reset"
        >
          Ta mig tillbaka till start!
        </button>
      </div>
    </div>

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
      resultOn() {
        return this.$store.state.resultDisplay
      },
      results() {
        return this.$store.state.yourType
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
      },
      prevQuestion() {
        this.$store.commit("previousQuestion")
      },
    }
  }
</script>

<style scoped>
  #body {
    padding: 3rem;
    background-color: #333;
    flex: 1;
  }

  .button-row {
    display: flex;
    justify-content: space-around;
    margin: 1.5rem 4vw 2rem;
  }

  .headline {
    font-family: FjallaOne;
    font-size: 2.3rem;
    margin-bottom: 1rem;
  }

  .button {
    background: #222;
    border: none;
    padding: 1rem 2rem;
    color: #ddd;
    font-family: NotoSans-Bold;
  }

  .button:hover {
    background: #000;
  }

  #alternatives {
    display: inline-block;
    padding: 0.5rem 2rem;
    font-family: NotoSans-Bold;
    font-size: 1rem;
    margin: 1rem 2rem;
    color: seashell;
    border: 3px dotted white;
  }

  #alternatives:hover {
    background-color: #666;
    color: #fff
  }
</style>
