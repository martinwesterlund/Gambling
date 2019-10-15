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
                        id: UUID()

                    })
                }


            }
        },




        getFiveRandomCards(state) {
            // state.cards = [
            //     { suit: '♥', value: 'A' },
            //     { suit: '♥', value: '2' },
            //     { suit: '♥', value: '3' },
            //     { suit: '♥', value: '4' },
            //     { suit: '♥', value: '5' },
            //     { suit: '♥', value: '6' },
            //     { suit: '♥', value: '7' },
            //     { suit: '♥', value: '8' },
            //     { suit: '♥', value: '9' },
            //     { suit: '♥', value: '10' },
            //     { suit: '♥', value: 'J' },
            //     { suit: '♥', value: 'Q' },
            //     { suit: '♥', value: 'K' },

            //     { suit: '♠', value: 'A' },
            //     { suit: '♠', value: '2' },
            //     { suit: '♠', value: '3' },
            //     { suit: '♠', value: '4' },
            //     { suit: '♠', value: '5' },
            //     { suit: '♠', value: '6' },
            //     { suit: '♠', value: '7' },
            //     { suit: '♠', value: '8' },
            //     { suit: '♠', value: '9' },
            //     { suit: '♠', value: '10' },
            //     { suit: '♠', value: 'J' },
            //     { suit: '♠', value: 'Q' },
            //     { suit: '♠', value: 'K' },

            //     { suit: '♦', value: 'A' },
            //     { suit: '♦', value: '2' },
            //     { suit: '♦', value: '3' },
            //     { suit: '♦', value: '4' },
            //     { suit: '♦', value: '5' },
            //     { suit: '♦', value: '6' },
            //     { suit: '♦', value: '7' },
            //     { suit: '♦', value: '8' },
            //     { suit: '♦', value: '9' },
            //     { suit: '♦', value: '10' },
            //     { suit: '♦', value: 'J' },
            //     { suit: '♦', value: 'Q' },
            //     { suit: '♦', value: 'K' },

            //     { suit: '♣', value: 'A' },
            //     { suit: '♣', value: '2' },
            //     { suit: '♣', value: '3' },
            //     { suit: '♣', value: '4' },
            //     { suit: '♣', value: '5' },
            //     { suit: '♣', value: '6' },
            //     { suit: '♣', value: '7' },
            //     { suit: '♣', value: '8' },
            //     { suit: '♣', value: '9' },
            //     { suit: '♣', value: '10' },
            //     { suit: '♣', value: 'J' },
            //     { suit: '♣', value: 'Q' },
            //     { suit: '♣', value: 'K' },
            // ]
            state.fiveRandomCards = []
            for (let i = 0; i < 5; i++) {
                let newCard = state.cards.splice((Math.floor(Math.random() * state.cards.length)), 1)
                state.fiveRandomCards.push(newCard[0])
                if (state.cards.length === 0) {
                    this.commit('createDeck')
                }
            }
        }






    }

})
