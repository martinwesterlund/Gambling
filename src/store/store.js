import Vue from 'vue'
import Vuex from 'vuex'
import UUID from 'uuid/v4'


Vue.use(Vuex)
function playSound(sound) {
    new Audio(require('../../public/sounds/' + sound)).play()
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
        startDisplay: true,
        quizDisplay: false,
        answers: [],
        questionNumber: 0,
        gameInfo: 'WELCOME TO JACKS OR BETTER!',


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

        personalities: [
            { type: 'Scorpio', symbol: 'scorpio.png', description: 'You are a scorpio! You are a very human being! You are interested in things! You also have opinions!"' },
            { type: 'Aries', symbol: 'aries.png', description: 'text here' },

        ],

        questions: [{
                question: 'Vad tycker du om måndagar?',
                alternatives: [{ answer: 'Kul', value: 'C' },
                    { answer: 'Trist', value: 'A' },
                    { answer: 'Illa', value: 'B' },
                    { answer: 'Bästa jag vet', value: 'D' }
                ]
            }, {

                question: 'Har du någonsin varit i Skåne?',
                alternatives: [
                    { answer: 'Ja', value: 'A' },
                    { answer: 'Nej', value: 'B' },
                    { answer: 'Är där varje dag', value: 'D' },
                    { answer: 'Vart?', value: 'C' }
                ]
            }, {
                question: 'Vem tycker du om i ABBA?',
                alternatives: [
                    { answer: 'Bengt', value: 'C' },
                    { answer: 'Minns ej namnen', value: 'A' },
                    { answer: 'Lotta?', value: 'B' },
                    { answer: 'A-teens är bättre', value: 'D' }
                ]
            }, {
                question: 'Vill du gå på bio imorgon?',
                alternatives: [
                    { answer: 'Vem är du?', value: 'B' },
                    { answer: 'Finns ingen bra film', value: 'C' },
                    { answer: 'Joker (2019) var bra', value: 'A' },
                    { answer: 'Jag väntar på CSN', value: 'D' }
                ]
            }, {
                question: 'Hur gammal är kungen?',
                alternatives: [
                    { answer: 'Gammal', value: 'A' },
                    { answer: 'Ja', value: 'B' },
                    { answer: 'Nej', value: 'C' },
                    { answer: 'Kanske', value: 'D' }
                ]
            },

        ]
    },

    mutations: {

        // Creates deck automatically from start
        createDeck(state) {
            state.cards = []
            const suits = ["♥", "♠", "♦", "♣"]
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
            } else{
                playSound('error.mp3')
            }
        },

        // Decreases the bet
        removeCoin(state) {
            if (state.bet > 1) {
                playSound('button.mp3')
                state.bet--
            } else{
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

        //Toggles theme between modern and classic

        toggleTheme(state) {
            state.modern = !state.modern

        },

        changeHighlight(state) {
            state.highlight = !state.highlight
        },

        submitAnswer(state, value) { //Returns the value associated with answer to each question
            if ((this.state.questionNumber + 2) > state.questions.length) {
                this.commit("resetQuiz")
            } else {
                console.log(this.state.questionNumber)
                state.answers.push(value)
            }
            console.log(this.state.questions.length)


        },

        //Moves on to next question and answers
        questionCounter(state) {
            state.questionNumber++
            // console.log(this.state.questionNumber)
        },

        hideStart(state) {
            state.startDisplay = !state.startDisplay
        },

        showQuiz(state) {
            state.quizDisplay = !state.quizDisplay
        },

        resetQuiz(state) {
            state.questionNumber = 0;
            state.answers = [];
            state.quizDisplay = false;
            state.startDisplay = true;
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
            state.finalCards.sort(function(a, b) {
                return b.value < a.value ? 1 :
                    b.value > a.value ? -1 :
                    0
            })

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
