import Vue from 'vue'
import Vuex from 'vuex'
import UUID from 'uuid/v4'


Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {

        variable: 'Testing testing',
        round: 0,
        cards: [],
        fiveRandomCards: [],
        finalCards: [],
        combination: '',
        bet: 1,
        credits: 10,
        dealtCards: [],
        modern: false,

        combinations: [
            { type: 'Royal Flush', value: 800 },
            { type: 'Straight Flush', value: 50 },
            { type: 'Four of a Kind', value: 25 },
            { type: 'Full House', value: 8 },
            { type: 'Flush', value: 6 },
            { type: 'Straight', value: 4 },
            { type: 'Three of a Kind', value: 3 },
            { type: 'Two Pair', value: 2 },
            { type: 'Jacks or Better', value: 1 }
        ]

    },

    mutations: {

        // Creates deck automatically from start
        createDeck(state) {
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
            state.credits -= state.bet
            state.round = 1
            state.fiveRandomCards = []
            for (let i = 0; i < 5; i++) {
                let newCard = state.cards.splice((Math.floor(Math.random() * state.cards.length)), 1)
                state.fiveRandomCards.push(newCard[0])
                if (state.cards.length === 0) {
                    this.commit('createDeck')
                }
            }
            state.combination = ''
        },

        insertCoin(state) {
            if (state.bet < 5) {
                state.bet++
            }
        },

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


        toggleTheme(state) {
            state.modern = !state.modern

        },


        // Replaces the unlocked cards with new cards from the deck
        getMoreCards(state) {
            state.round = 0
            state.combination = ''
            for (let i = 0; i < 5; i++) {
                if (state.fiveRandomCards[i].locked == false) {
                    let newCard = state.cards.splice((Math.floor(Math.random() * state.cards.length)), 1)
                    state.fiveRandomCards[i].value = newCard[0].value
                    state.fiveRandomCards[i].suit = newCard[0].suit
                }
            }
            this.commit('calculateValue')
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

            // Check if jacks or better
            if ((state.finalCards[0].value == state.finalCards[1].value && state.finalCards[0].value > 10) ||
                (state.finalCards[1].value == state.finalCards[2].value && state.finalCards[1].value > 10) ||
                (state.finalCards[2].value == state.finalCards[3].value && state.finalCards[2].value > 10) ||
                (state.finalCards[3].value == state.finalCards[4].value && state.finalCards[3].value > 10)) {
                state.combination = 'Jacks or better'
                state.credits += 1 * state.bet
            }

            // Check Two pair
            if ((state.finalCards[0].value == state.finalCards[1].value && state.finalCards[2].value == state.finalCards[3].value) ||
                (state.finalCards[0].value == state.finalCards[1].value && state.finalCards[3].value == state.finalCards[4].value) ||
                (state.finalCards[1].value == state.finalCards[2].value && state.finalCards[3].value == state.finalCards[4].value)) {
                state.combination = 'tvåpar!'
                state.credits += 2 * state.bet
            }

            // Check Three of a kind
            if ((state.finalCards[0].value == state.finalCards[1].value && state.finalCards[1].value == state.finalCards[2].value) ||
                (state.finalCards[1].value == state.finalCards[2].value && state.finalCards[2].value == state.finalCards[3].value) ||
                (state.finalCards[2].value == state.finalCards[3].value && state.finalCards[3].value == state.finalCards[4].value)) {
                state.combination = 'Three of a kind'
                state.credits += 3 * state.bet
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
                state.combination = 'Straight!'
                state.credits += 4 * state.bet
            }

            // Check Flush
            if (state.finalCards[0].suit == state.finalCards[1].suit &&
                state.finalCards[1].suit == state.finalCards[2].suit &&
                state.finalCards[2].suit == state.finalCards[3].suit &&
                state.finalCards[3].suit == state.finalCards[4].suit) {
                state.combination = 'Flush'
                state.credits += 8 * state.bet
            }

            // Check full house
            if ((state.finalCards[0].value == state.finalCards[1].value &&
                    state.finalCards[1].value == state.finalCards[2].value &&
                    state.finalCards[3].value == state.finalCards[4].value) ||
                (state.finalCards[0].value == state.finalCards[1].value &&
                    state.finalCards[2].value == state.finalCards[3].value &&
                    state.finalCards[3].value == state.finalCards[4].value)) {
                state.combination = "Full house!"
                state.credits += 12 * state.bet
            }

            // Check four of a kind
            if ((state.finalCards[0].value == state.finalCards[1].value && state.finalCards[1].value == state.finalCards[2].value && state.finalCards[2].value == state.finalCards[3].value) ||
                (state.finalCards[1].value == state.finalCards[2].value && state.finalCards[2].value == state.finalCards[3].value && state.finalCards[3].value == state.finalCards[4].value)) {
                state.combination = "4 of a kind"
                state.credits += 25 * state.bet
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
                state.combination = 'Straight flush!'
                state.credits += 50 * state.bet
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
                state.combination = 'Royal Straight Flush'
                state.credits += 800 * state.bet
            }







        },











    },


})
