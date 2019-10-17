import Vue from 'vue'
import Vuex from 'vuex'
import UUID from 'uuid/v4'

console.log(UUID())

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {

        variable: 'Testing testing',

        cards: [],
        fiveRandomCards: [],
        finalCards: [],
        combination: '',

        credits: 100,
        dealtCards: [],

    },

    mutations: {
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

        getFiveRandomCards(state) {
            
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

        toggleLock(state, id){
            for(let i = 0; i < state.fiveRandomCards.length; i++){
                if(state.fiveRandomCards[i].id == id){
                    state.fiveRandomCards[i].locked = !state.fiveRandomCards[i].locked
                }
            }
        },

        getMoreCards(state){
            for(let i = 0; i < 5; i++){
                if(state.fiveRandomCards[i].locked == false){
                    let newCard = state.cards.splice((Math.floor(Math.random() * state.cards.length)), 1)
                    state.fiveRandomCards[i].value = newCard[0].value
                    state.fiveRandomCards[i].suit = newCard[0].suit
                }
            }
            this.commit('calculateValue')
        },

        calculateValue(state) {
            state.finalCards = []

            for (let i = 0; i < 5; i++) {
                switch (state.fiveRandomCards[i].value) {
                    case 'A':
                        state.finalCards.push({ suit: state.fiveRandomCards[i].suit, value: 14, locked : false })
                        break
                    case 'J':
                        state.finalCards.push({ suit: state.fiveRandomCards[i].suit, value: 11, locked : false })
                        break
                    case 'Q':
                        state.finalCards.push({ suit: state.fiveRandomCards[i].suit, value: 12, locked : false })
                        break
                    case 'K':
                        state.finalCards.push({ suit: state.fiveRandomCards[i].suit, value: 13, locked : false })
                        break
                    default:
                        state.finalCards.push({ suit: state.fiveRandomCards[i].suit, value: Number(state.fiveRandomCards[i].value), locked : false })
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
            }

            // Check Two pair
            if ((state.finalCards[0].value == state.finalCards[1].value && state.finalCards[2].value == state.finalCards[3].value) ||
                (state.finalCards[0].value == state.finalCards[1].value && state.finalCards[3].value == state.finalCards[4].value) ||
                (state.finalCards[1].value == state.finalCards[2].value && state.finalCards[3].value == state.finalCards[4].value)) {
                state.combination = 'tvåpar!'
            }

            // Check Three of a kind
            if ((state.finalCards[0].value == state.finalCards[1].value && state.finalCards[1].value == state.finalCards[2].value) ||
                (state.finalCards[1].value == state.finalCards[2].value && state.finalCards[2].value == state.finalCards[3].value) ||
                (state.finalCards[2].value == state.finalCards[3].value && state.finalCards[3].value == state.finalCards[4].value)) {
                state.combination = 'Three of a kind'
            }

            // Check straight
            if (state.finalCards[0].value == state.finalCards[1].value - 1 &&
                state.finalCards[1].value == state.finalCards[2].value - 1 &&
                state.finalCards[2].value == state.finalCards[3].value - 1 &&
                state.finalCards[3].value == state.finalCards[4].value - 1) {
                state.combination = 'Straight!'
            }

            // Check Flush
            if (state.finalCards[0].suit == state.finalCards[1].suit &&
                state.finalCards[1].suit == state.finalCards[2].suit &&
                state.finalCards[2].suit == state.finalCards[3].suit &&
                state.finalCards[3].suit == state.finalCards[4].suit) {
                state.combination = 'Flush'
            }

            // Check full house
            if((state.finalCards[0].value == state.finalCards[1].value && 
                state.finalCards[1].value == state.finalCards[2].value && 
                state.finalCards[3].value == state.finalCards[4].value)
            || (state.finalCards[0].value == state.finalCards[1].value && 
                state.finalCards[2].value == state.finalCards[3].value && 
                state.finalCards[3].value == state.finalCards[4].value)){
                state.combination = "Full house!"
            }

            // Check four of a kind
            if ((state.finalCards[0].value == state.finalCards[1].value && state.finalCards[1].value == state.finalCards[2].value && state.finalCards[2].value == state.finalCards[3].value) ||
                (state.finalCards[1].value == state.finalCards[2].value && state.finalCards[2].value == state.finalCards[3].value && state.finalCards[3].value == state.finalCards[4].value)) {
                state.combination = "4 of a kind"
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
            }

            // Check Royal flush
            else if (state.finalCards[0].value == 10 &&
                state.finalCards[1].value == 11 &&
                state.finalCards[2].value == 12 &&
                state.finalCards[3].value == 13 &&
                state.finalCards[4].value == 14 &&
                state.finalCards[0].suit == state.finalCards[1].suit &&
                state.finalCards[1].suit == state.finalCards[2].suit &&
                state.finalCards[2].suit == state.finalCards[3].suit &&
                state.finalCards[3].suit == state.finalCards[4].suit
            ) { state.combination = 'Royal Straight Flush' }





















            // state.finalCards.sort(function(a, b){return a-b})

            // if (state.finalCards[0] == state.finalCards[1]) {
            //     state.combination = 'Par!'
            // }
            // switch(state.finalCards){
            //     case state.finalCards[0] == state.finalCards[1] : 
            //         state.combination = 'Par!'
            //         break

            // }


        },











    },


})
