/* eslint-disable sort-keys */
import Vue from 'vue'
import Vuex from 'vuex'
import UUID from 'uuid/v4'


Vue.use(Vuex)

function playSound(sound) {
  if (store.state.soundOn) {
    new Audio(require('../../public/sounds/' + sound)).play()
  }
}



export const store = new Vuex.Store({
  state: {
    win: 0,
    variable: 'Testing testing',
    round: 0,
    cards: [],
    fiveRandomCards: [],
    finalCards: [],
    combination: 'COMBINATION',
    bet: 1,
    credits: 10,
    dealtCards: [],
    modern: true,
    soundOn: true,
    showSettings: false,
    startDisplay: true,
    resultDisplay: false,
    quizDisplay: false,
    answers: [],
    questionNumber: 0,
    gameInfo: 'WELCOME TO JACKS OR BETTER!',
    yourResult: {},


    combinations: [
      { type: 'ROYAL STRAIGHT FLUSH', value: 800 },
      { type: 'STRAIGHT FLUSH', value: 50 },
      { type: 'FOUR OF A KIND', value: 25 },
      { type: 'FULL HOUSE', value: 8 },
      { type: 'FLUSH', value: 6 },
      { type: 'STRAIGHT', value: 4 },
      { type: 'THREE OF A KIND', value: 3 },
      { type: 'TWO PAIR', value: 2 },
      { type: 'JACKS OR BETTER', value: 1 }
    ],

    quizResults: [{
      type: 'Du är spelberoende',
      symbol: require('../assets/2x/typeA.png'),
      description: 'Dina svar tyder på ett allvarligt spelberoende. Det visas tydliga tecken på att din koppling till spel har påverkat din omdömesförmåga samt dina livsval. Vi rekommenderar att du tar kontakt med en terapeut som vidare kan erbjuda dig lämplig hjälp.'
    },

    {
      type: 'Du visar måttliga symptom på ett spelberoende',
      symbol: require('../assets/2x/typeB.png'),
      description: 'Dina spelvanor tyder inte på något allvarligt spelberoende, men dina svar pekar på en etablerad förbindelse till spel i allmänhet. Det kan vara en bra idé att tänka till lite över hur mycket du ägnar dig åt spel, och om du inte möjligtvist behöver trappa ner på spelandet.'
    },

    {
      type: 'Du är inte spelberoende, men du är allt spelvan.',
      symbol: require('../assets/2x/typeC.png'),
      description: 'Ingenting pekar på att du är beroende av det du spelar. Dina svar pekar på att du har etablerade spelvanor, men de har ännu inte påverkat ditt omdöme till den mån att du hamnar i någon slags farozon. Det kan fortfarande vara en bra sak för dig att tänka över dina vanor i framtiden, då detta alltid kan förändras.'
    },

    {
      type: 'Du mår bra',
      symbol: require('../assets/2x/typeD.png'),
      description: 'Du mår helt okej! Du spelar verkligen inte för mycket från så långt som vi kan läs av dina svar. Ha en trevlig fortsättning och tack för att du tog vårt test.'
    },


    ],

    questions: [{
      question: 'Jag spelar ofta längre än jag har förutsatt mig',
      alternatives: [{ answer: 'Instämmer helt', value: 'A' },
        { answer: 'Till viss del', value: 'B' },
        { answer: 'Inte riktigt', value: 'C' },
        { answer: 'Det har aldrig hänt', value: 'D' }
      ]
    }, {

      question: 'Jag känner att jag måste vinna tillbaka allt när jag har förlorat',
      alternatives: [
        { answer: 'Förekommer ofta', value: 'A' },
        { answer: 'Förekommer då och då', value: 'B' },
        { answer: 'Det har hänt', value: 'C' },
        { answer: 'Har inte känt så', value: 'D' }
      ]
    }, {
      question: 'Jag har spelat för att fly undan oro, problem och/eller ensamhet',
      alternatives: [
        { answer: 'Jag känner ofta så', value: 'A' },
        { answer: 'Jag känner till viss del så', value: 'B' },
        { answer: 'Jag känner inte riktigt på detta sätt', value: 'C' },
        { answer: 'Jag kan inte alls relatera', value: 'D' }
      ]
    }, {
      question: 'Spelandet har gjort mitt liv tråkigt',
      alternatives: [
        { answer: 'Instämmer', value: 'A' },
        { answer: 'Instämmer till viss del', value: 'B' },
        { answer: 'Inte säker', value: 'C' },
        { answer: 'Håller inte alls med', value: 'D' }
      ]
    }, {
      question: 'Jag känner ånger eller skuld över mitt spelande',
      alternatives: [
        { answer: 'Ja', value: 'A' },
        { answer: 'Till viss del', value: 'B' },
        { answer: 'Lite grann', value: 'C' },
        { answer: 'Inte alls', value: 'D' }
      ]
    },

    ]
  },

  mutations: {

    // Creates deck automatically from start
    createDeck(state) {
      state.cards = []
      const suits = ['♥', '♠', '♦', '♣']
      const value = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K']

      for (let n = 0; n < suits.length; n++) {
        for (let m = 0; m < 13; m++) {

          state.cards.push({
            suit: suits[n],
            value: value[m],
            id: UUID(),
            locked: false

          })
        }
      }
    },

    // Creates five random cards that are displayed in the game
    getFiveRandomCards(state) {
      if (state.bet <= state.credits) {
        playSound('button.mp3')
        state.gameInfo = ''
        state.win = 0
        state.credits -= state.bet
        state.round = 1
        state.fiveRandomCards = []
        for (let i = 0; i < 5; i++) {
          let newCard = state.cards.splice((Math.floor(Math.random() * state.cards.length)), 1)
          state.fiveRandomCards.push(newCard[0])
          if (state.cards.length < 5) {
            this.commit('createDeck')
          }
        }
        state.combination = 'COMBINATION'
      } else {
        playSound('error.mp3')
        state.gameInfo = 'INSERT COIN'
      }

    },

    // Increases the bet
    insertCoin(state) {
      if (state.bet < 5 && state.bet < state.credits) {
        playSound('button.mp3')
        state.bet++
      } else {
        playSound('error.mp3')
      }
    },

    // Decreases the bet
    removeCoin(state) {
      if (state.bet > 1) {
        playSound('button.mp3')
        state.bet--
      } else {
        playSound('error.mp3')
      }
    },

    // Locks and unlocks a card that is clicked on
    toggleLock(state, id) {
      for (let i = 0; i < state.fiveRandomCards.length; i++) {
        if (state.fiveRandomCards[i].id == id) {
          playSound('click.mp3')
          state.fiveRandomCards[i].locked = !state.fiveRandomCards[i].locked
        }
      }
    },

    addCredits(state){
      state.credits += 10
    },

    //Toggles theme between modern and classic

    toggleTheme(state) {
      state.modern = !state.modern
      playSound('button.mp3')
    },

    //Toggles sound on and off
    toggleSound(state) {
      state.soundOn = !state.soundOn
      playSound('button.mp3')
    },

    toggleSettings(state) {
      state.showSettings = !state.showSettings
    },

    changeHighlight(state) {
      state.highlight = !state.highlight
    },

    submitAnswer(state, value) { //Returns the value associated with answer to each question
      if ((this.state.questionNumber + 1) == state.questions.length) {
        this.commit('calculateType')
        this.commit('displayResult')
      } else {

        state.answers.push(value)
        this.state.questionNumber++
        console.log(this.state.answers)
        console.log(this.state.questionNumber)
      }


    },

    previousQuestion(state) {
      this.state.questionNumber--
      state.answers.splice(-1, 1)
      console.log(this.state.answers)
    },

    //Calculates corresponding type by answers
    calculateType(state) {
      const quantities = {}
      let a = this.state.answers //e.g. ['A', 'B', 'A', 'C', 'D']
      a.forEach(char => {
        quantities[char] = a.filter(value => value === char).length
      })
      let newList = Object.entries(quantities)
      newList.sort((a, b) => a[1] < b[1] ? 1 : b[1] > a[1] ? -1 : 0)

      switch (newList[0][0]) {
        case 'A':
          state.yourResult = state.quizResults[0]
          break
        case 'B':
          state.yourResult = state.quizResults[1]
          break
        case 'C':
          state.yourResult = state.quizResults[2]
          break
        case 'D':
          state.yourResult = state.quizResults[3]
          break
      }


    },



    hideStart(state) {
      state.startDisplay = !state.startDisplay
    },

    showQuiz(state) {
      state.quizDisplay = !state.quizDisplay
    },

    displayResult(state) {
      state.quizDisplay = !state.quizDisplay
      state.resultDisplay = !state.resultDisplay
    },

    resetQuiz(state) {
      state.questionNumber = 0
      state.answers = []
      state.quizDisplay = false
      state.resultDisplay = false
      state.startDisplay = true
    },



    // Replaces the unlocked cards with new cards from the deck
    getMoreCards(state) {
      playSound('button.mp3')
      state.round = 0
      state.combination = 'COMBINATION'
      for (let i = 0; i < 5; i++) {
        if (state.fiveRandomCards[i].locked == false) {
          let newCard = state.cards.splice((Math.floor(Math.random() * state.cards.length)), 1)
          state.fiveRandomCards[i].value = newCard[0].value
          state.fiveRandomCards[i].suit = newCard[0].suit
        }
      }
      this.commit('calculateValue')
      state.gameInfo = 'GAME OVER'
    },

    // Calculates the final value of the final cards array, to see if you won or not
    calculateValue(state) {
      state.finalCards = []

      for (let i = 0; i < 5; i++) {
        switch (state.fiveRandomCards[i].value) {
          case 'A':
            state.finalCards.push({ suit: state.fiveRandomCards[i].suit, value: 14, locked: false })
            break
          case 'J':
            state.finalCards.push({ suit: state.fiveRandomCards[i].suit, value: 11, locked: false })
            break
          case 'Q':
            state.finalCards.push({ suit: state.fiveRandomCards[i].suit, value: 12, locked: false })
            break
          case 'K':
            state.finalCards.push({ suit: state.fiveRandomCards[i].suit, value: 13, locked: false })
            break
          default:
            state.finalCards.push({ suit: state.fiveRandomCards[i].suit, value: Number(state.fiveRandomCards[i].value), locked: false })
        }

      }



      //Sort final cards array
      state.finalCards.sort((a, b) => b.value < a.value ? 1 : b.value > a.value ? -1 : 0)

      switch (true) {

        // Check Royal flush
        case (state.finalCards[0].value == 10 &&
          state.finalCards[1].value == 11 &&
          state.finalCards[2].value == 12 &&
          state.finalCards[3].value == 13 &&
          state.finalCards[4].value == 14 &&
          state.finalCards[0].suit == state.finalCards[1].suit &&
          state.finalCards[1].suit == state.finalCards[2].suit &&
          state.finalCards[2].suit == state.finalCards[3].suit &&
          state.finalCards[3].suit == state.finalCards[4].suit):
          this.commit('updateResult', 0)
          break

          // Check Straight flush
        case (state.finalCards[0].value == state.finalCards[1].value - 1 &&
          state.finalCards[1].value == state.finalCards[2].value - 1 &&
          state.finalCards[2].value == state.finalCards[3].value - 1 &&
          state.finalCards[3].value == state.finalCards[4].value - 1 &&
          state.finalCards[0].suit == state.finalCards[1].suit &&
          state.finalCards[1].suit == state.finalCards[2].suit &&
          state.finalCards[2].suit == state.finalCards[3].suit &&
          state.finalCards[3].suit == state.finalCards[4].suit):
          this.commit('updateResult', 1)
          break

          // Check four of a kind
        case ((state.finalCards[0].value == state.finalCards[1].value && state.finalCards[1].value == state.finalCards[2].value && state.finalCards[2].value == state.finalCards[3].value) || (state.finalCards[1].value == state.finalCards[2].value && state.finalCards[2].value == state.finalCards[3].value && state.finalCards[3].value == state.finalCards[4].value)):
          this.commit('updateResult', 2)
          break

          // Check full house
        case ((state.finalCards[0].value == state.finalCards[1].value &&
            state.finalCards[1].value == state.finalCards[2].value &&
            state.finalCards[3].value == state.finalCards[4].value) ||
          (state.finalCards[0].value == state.finalCards[1].value &&
            state.finalCards[2].value == state.finalCards[3].value &&
            state.finalCards[3].value == state.finalCards[4].value)):
          this.commit('updateResult', 3)
          break

          // Check Flush
        case (state.finalCards[0].suit == state.finalCards[1].suit &&
          state.finalCards[1].suit == state.finalCards[2].suit &&
          state.finalCards[2].suit == state.finalCards[3].suit &&
          state.finalCards[3].suit == state.finalCards[4].suit):
          this.commit('updateResult', 4)
          break

          // Check straight
        case ((state.finalCards[0].value == state.finalCards[1].value - 1 &&
            state.finalCards[1].value == state.finalCards[2].value - 1 &&
            state.finalCards[2].value == state.finalCards[3].value - 1 &&
            state.finalCards[3].value == state.finalCards[4].value - 1) ||
          (state.finalCards[0].value == 2 &&
            state.finalCards[0].value == 3 &&
            state.finalCards[0].value == 4 &&
            state.finalCards[0].value == 5 &&
            state.finalCards[0].value == 14)):
          this.commit('updateResult', 5)
          break

          // Check Three of a kind
        case ((state.finalCards[0].value == state.finalCards[1].value && state.finalCards[1].value == state.finalCards[2].value) ||
          (state.finalCards[1].value == state.finalCards[2].value && state.finalCards[2].value == state.finalCards[3].value) ||
          (state.finalCards[2].value == state.finalCards[3].value && state.finalCards[3].value == state.finalCards[4].value)):
          this.commit('updateResult', 6)
          break
          // Check Two pair
        case ((state.finalCards[0].value == state.finalCards[1].value && state.finalCards[2].value == state.finalCards[3].value) ||
          (state.finalCards[0].value == state.finalCards[1].value && state.finalCards[3].value == state.finalCards[4].value) ||
          (state.finalCards[1].value == state.finalCards[2].value && state.finalCards[3].value == state.finalCards[4].value)):
          this.commit('updateResult', 7)
          break


          //JACKS OR BETTER
        case ((state.finalCards[0].value == state.finalCards[1].value && state.finalCards[0].value > 10) ||
          (state.finalCards[1].value == state.finalCards[2].value && state.finalCards[1].value > 10) ||
          (state.finalCards[2].value == state.finalCards[3].value && state.finalCards[2].value > 10) ||
          (state.finalCards[3].value == state.finalCards[4].value && state.finalCards[3].value > 10)):
          this.commit('updateResult', 8)
          break

        case (state.credits === 0):
          playSound('gameover.mp3')

      }




    },

    updateResult(state, value) {
      playSound('win.mp3')
      state.combination = state.combinations[value].type
      state.credits += state.combinations[value].value * state.bet
      state.win = state.combinations[value].value * state.bet
    },


  },



})
