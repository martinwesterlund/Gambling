<template>
  <div id="body">
    <div
      v-show="startOn"
      id="startPage"
    >
      <div class="headline">
        Här kan du ta ett test om spelmissbruk
      </div>
<div class="description"> Testet tar bara ett par minuter. <br> Tänk gärna till en kort stund och tugga lite på frågan innan du väljer att svara. Detta för att resultatet ska bli så korrekt som möjligt. </div>
      <div class="button-row">
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
      <div id="choices">
      <div
        v-for="a in alternatives"
        id="alternatives"
        :key="a.answer + a.value"
        @click="submit(a.value) "
      >
        {{ a.answer }}
      </div>
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

      <div class="headline"> {{ results.type }}</div>
      <div class="symbol">
        <img
          :src="results.symbol"
          alt="Bild på symbol"
        >
      </div>
      <div class="description"> {{ results.description }} </div>
      <div class="button-row">
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
        return this.$store.state.yourResult
      },
      startOn() {
        return this.$store.state.startDisplay
      },
    },

    methods: {
      hideStart() {
        this.$store.commit('hideStart')
      },
      prevQuestion() {
        this.$store.commit('previousQuestion')
      },
      reset() {
        this.$store.commit('resetQuiz')
      },
      showQuiz() {
        this.$store.commit('showQuiz')
      },
      submit(value) {
        this.$store.commit('submitAnswer', value)
      },
     
    }
  }
</script>

<style scoped>
  #body {
    padding: 3rem;
    background-color: #333;
    flex: 1;
    margin: 0 auto;
    color: #ddd;
    font-family: NotoSans;
    font-size: 1rem;
  }

  .button-row {
    display: flex;
    justify-content: space-between;

  }

  .headline {
    font-family: FjallaOne;
    font-size: 2rem;
    margin-bottom: 0rem;
  }

  .button {
    font-size: 1rem;
    background: #222;
    border: none;
    padding: 1rem 1.5rem;
    margin: 0 1rem 0;
    color: #ddd;
    font-family: NotoSans-Bold;
  }

  .button:hover {
    background: #000;
  }

  img {
    height: 15vh;
    margin-top: 1.5rem;

  }

  #choices{
    margin-top: 1rem;
  }

  #alternatives {
    display: inline-block;
    padding: 0.5rem 1rem;
    font-family: NotoSans-Bold;
    font-size: 0.8rem;
 margin: 0.5rem 2rem;
    color: #ccc;
    border: 3px dotted #ddd;
    width: 40vw;
  }

  #alternatives:hover {
    background-color: #666;
    color: #fff
  }

  #alternatives:nth-child(1){
    color: rgb(248, 108, 93);
  }

    #alternatives:nth-child(2){
    color: rgb(240, 228, 96);
  }

   #alternatives:nth-child(3){
    color: rgb(182, 247, 84);
  }

    #alternatives:nth-child(4){
    color: #53d8fb;
  }



#startPage, #quiz, #result{
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

}

#quiz .headline {
  font-size: 1.3rem;
}

#result .headline{
  font-size: 1.7rem;
}

#result .description {
  font-size: 0.9rem;
}

#quiz .button {
  margin-top: 1rem;
  font-size: 0.7rem;
  padding: 0.8rem 1rem;
}

  .description {
    margin-top: 0.5rem;
    margin-bottom: 1.5rem;
  }


  @media only screen and (min-width: 481px) {

#quiz .headline {
  font-size: 1.5rem;
}

#alternatives {
  font-size: 1rem;
}

#result .headline{
  font-size: 1.7rem;
}

img {
  height: 17.5vh;
}

#result .description {
  font-size: 0.9rem;
}

#quiz .button {
  margin-top: 1rem;
  font-size: 0.9rem;
  padding: 0.8rem 1rem;
}

  .description {
    margin-top: 0.5rem;
    margin-bottom: 1.5rem;
  }


  }

  @media only screen and (min-width: 769px) {

#quiz .headline {
  font-size: 1.9rem;
}

#alternatives {
  padding: 1rem 1.5rem;
}

img {
  height: 20vh;
}

#result .headline{
  font-size: 1.9rem;
}

#result .description {
  font-size: 1rem;
}

#quiz .button {
  margin-top: 1rem;
  font-size: 0.9rem;
  padding: 1rem 2rem;
}

  .description {
    margin: 0.5rem 10vw 1.5rem;
  }

  }
</style>
