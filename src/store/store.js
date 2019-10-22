import Vue from 'vue'
import Vuex from 'vuex'
import UUID from 'uuid/v4'


Vue.use(Vuex)

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
        modern: false,
        gameInfo: 'JACKS OR BETTER',

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
            if(state.bet <= state.credits){
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
                // this.commit('calculateValue')
                state.combination = 'COMBINATION'
            }else{
                state.gameInfo = 'INSERT COIN'
            }
            
        },

        // Increases the bet
        insertCoin(state) {
            if (state.bet < 5 && state.bet <= state.credits ) {
                state.bet++}
            // }else if(state.bet  = state.credits){
            //     state.gameInfo = 'INSERT COIN'
            // }
        },

        // Decreases the bet
        removeCoin(state) {
            if (state.bet > 1) {
                state.bet--
            }
        },

        // Locks and unlocks a card that is clicked on
        toggleLock(state, id) {
            for (let i = 0; i < state.fiveRandomCards.length; i++) {
                if (state.fiveRandomCards[i].id == id) {
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


        // Replaces the unlocked cards with new cards from the deck
        getMoreCards(state) {
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
            state.gameInfo= 'GAME OVER'
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
            state.finalCards.sort(function (a, b) {
                return b.value < a.value ? 1 :
                    b.value > a.value ? -1 :
                        0
            })

            // Check if jacks or better
            if ((state.finalCards[0].value == state.finalCards[1].value && state.finalCards[0].value > 10) ||
                (state.finalCards[1].value == state.finalCards[2].value && state.finalCards[1].value > 10) ||
                (state.finalCards[2].value == state.finalCards[3].value && state.finalCards[2].value > 10) ||
                (state.finalCards[3].value == state.finalCards[4].value && state.finalCards[3].value > 10)) {
                    this.commit('updateResult', 8)
            }

            // Check Two pair
            if ((state.finalCards[0].value == state.finalCards[1].value && state.finalCards[2].value == state.finalCards[3].value) ||
                (state.finalCards[0].value == state.finalCards[1].value && state.finalCards[3].value == state.finalCards[4].value) ||
                (state.finalCards[1].value == state.finalCards[2].value && state.finalCards[3].value == state.finalCards[4].value)) {
                    this.commit('updateResult', 7)
            }

            // Check Three of a kind
            if ((state.finalCards[0].value == state.finalCards[1].value && state.finalCards[1].value == state.finalCards[2].value) ||
                (state.finalCards[1].value == state.finalCards[2].value && state.finalCards[2].value == state.finalCards[3].value) ||
                (state.finalCards[2].value == state.finalCards[3].value && state.finalCards[3].value == state.finalCards[4].value)) {
                    this.commit('updateResult', 6)
            }

            // Check straight
            if ((state.finalCards[0].value == state.finalCards[1].value - 1 &&
                state.finalCards[1].value == state.finalCards[2].value - 1 &&
                state.finalCards[2].value == state.finalCards[3].value - 1 &&
                state.finalCards[3].value == state.finalCards[4].value - 1) ||
                (state.finalCards[0].value == 2 &&
                    state.finalCards[0].value == 3 &&
                    state.finalCards[0].value == 4 &&
                    state.finalCards[0].value == 5 &&
                    state.finalCards[0].value == 14)) {
                        this.commit('updateResult', 5)
            }

            // Check Flush
            if (state.finalCards[0].suit == state.finalCards[1].suit &&
                state.finalCards[1].suit == state.finalCards[2].suit &&
                state.finalCards[2].suit == state.finalCards[3].suit &&
                state.finalCards[3].suit == state.finalCards[4].suit) {
                    this.commit('updateResult', 4)
            }

            // Check full house
            if ((state.finalCards[0].value == state.finalCards[1].value &&
                state.finalCards[1].value == state.finalCards[2].value &&
                state.finalCards[3].value == state.finalCards[4].value) ||
                (state.finalCards[0].value == state.finalCards[1].value &&
                    state.finalCards[2].value == state.finalCards[3].value &&
                    state.finalCards[3].value == state.finalCards[4].value)) {
                        this.commit('updateResult', 3)
            }

            // Check four of a kind
            if ((state.finalCards[0].value == state.finalCards[1].value && state.finalCards[1].value == state.finalCards[2].value && state.finalCards[2].value == state.finalCards[3].value) ||
                (state.finalCards[1].value == state.finalCards[2].value && state.finalCards[2].value == state.finalCards[3].value && state.finalCards[3].value == state.finalCards[4].value)) {
                    this.commit('updateResult', 2)
            }

            // Check Straight flush
            if (state.finalCards[0].value == state.finalCards[1].value - 1 &&
                state.finalCards[1].value == state.finalCards[2].value - 1 &&
                state.finalCards[2].value == state.finalCards[3].value - 1 &&
                state.finalCards[3].value == state.finalCards[4].value - 1 &&
                state.finalCards[0].suit == state.finalCards[1].suit &&
                state.finalCards[1].suit == state.finalCards[2].suit &&
                state.finalCards[2].suit == state.finalCards[3].suit &&
                state.finalCards[3].suit == state.finalCards[4].suit) {
                    this.commit('updateResult', 1)
            }

            // Check Royal flush
            if (state.finalCards[0].value == 10 &&
                state.finalCards[1].value == 11 &&
                state.finalCards[2].value == 12 &&
                state.finalCards[3].value == 13 &&
                state.finalCards[4].value == 14 &&
                state.finalCards[0].suit == state.finalCards[1].suit &&
                state.finalCards[1].suit == state.finalCards[2].suit &&
                state.finalCards[2].suit == state.finalCards[3].suit &&
                state.finalCards[3].suit == state.finalCards[4].suit) {
                    this.commit('updateResult', 0)
            }
  
        },

        updateResult(state, value){
            state.combination = state.combinations[value].type
            state.credits += state.combinations[value].value * state.bet
            state.win = state.combinations[value].value * state.bet
        }
    },


})
