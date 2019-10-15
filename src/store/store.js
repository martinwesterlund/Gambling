import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {

        variable: 'Testing testing',

        cards: [],
        fiveRandomCards: [],

        credits: 100,
        dealtCards: [],
        deck: [ //DEN HÄR VILL VI KANSKE GÖRA TILL EN FUNKTION? MEN VART LÄGGER VI DEN?
            { suit: 'HEARTS', value: 1 },
            { suit: 'HEARTS', value: 2 },
            { suit: 'HEARTS', value: 3 },
            { suit: 'HEARTS', value: 4 },
            { suit: 'HEARTS', value: 5 },
            { suit: 'HEARTS', value: 6 },
            { suit: 'HEARTS', value: 7 },
            { suit: 'HEARTS', value: 8 },
            { suit: 'HEARTS', value: 9 },
            { suit: 'HEARTS', value: 10 },
            { suit: 'HEARTS', value: 11 },
            { suit: 'HEARTS', value: 12 },
            { suit: 'HEARTS', value: 13 },
            { suit: 'SPADES', value: 1 },
            { suit: 'SPADES', value: 2 },
            { suit: 'SPADES', value: 3 },
            { suit: 'SPADES', value: 4 },
            { suit: 'SPADES', value: 5 },
            { suit: 'SPADES', value: 6 },
            { suit: 'SPADES', value: 7 },
            { suit: 'SPADES', value: 8 },
            { suit: 'SPADES', value: 9 },
            { suit: 'SPADES', value: 10 },
            { suit: 'SPADES', value: 11 },
            { suit: 'SPADES', value: 12 },
            { suit: 'SPADES', value: 13 },
            { suit: 'DIAMONDS', value: 1 },
            { suit: 'DIAMONDS', value: 2 },
            { suit: 'DIAMONDS', value: 3 },
            { suit: 'DIAMONDS', value: 4 },
            { suit: 'DIAMONDS', value: 5 },
            { suit: 'DIAMONDS', value: 6 },
            { suit: 'DIAMONDS', value: 7 },
            { suit: 'DIAMONDS', value: 8 },
            { suit: 'DIAMONDS', value: 9 },
            { suit: 'DIAMONDS', value: 10 },
            { suit: 'DIAMONDS', value: 11 },
            { suit: 'DIAMONDS', value: 12 },
            { suit: 'DIAMONDS', value: 13 },
            { suit: 'CLUBS', value: 1 },
            { suit: 'CLUBS', value: 2 },
            { suit: 'CLUBS', value: 3 },
            { suit: 'CLUBS', value: 4 },
            { suit: 'CLUBS', value: 5 },
            { suit: 'CLUBS', value: 6 },
            { suit: 'CLUBS', value: 7 },
            { suit: 'CLUBS', value: 8 },
            { suit: 'CLUBS', value: 9 },
            { suit: 'CLUBS', value: 10 },
            { suit: 'CLUBS', value: 11 },
            { suit: 'CLUBS', value: 12 },
            { suit: 'CLUBS', value: 13 }
        ]

    },

    mutations: {
        getFiveRandomCards(state) {
            state.cards = [
                { suit: '♥', value: 'A' },
                { suit: '♥', value: '2' },
                { suit: '♥', value: '3' },
                { suit: '♥', value: '4' },
                { suit: '♥', value: '5' },
                { suit: '♥', value: '6' },
                { suit: '♥', value: '7' },
                { suit: '♥', value: '8' },
                { suit: '♥', value: '9' },
                { suit: '♥', value: '10' },
                { suit: '♥', value: 'J' },
                { suit: '♥', value: 'Q' },
                { suit: '♥', value: 'K' },

                { suit: '♠', value: 'A' },
                { suit: '♠', value: '2' },
                { suit: '♠', value: '3' },
                { suit: '♠', value: '4' },
                { suit: '♠', value: '5' },
                { suit: '♠', value: '6' },
                { suit: '♠', value: '7' },
                { suit: '♠', value: '8' },
                { suit: '♠', value: '9' },
                { suit: '♠', value: '10' },
                { suit: '♠', value: 'J' },
                { suit: '♠', value: 'Q' },
                { suit: '♠', value: 'K' },

                { suit: '♦', value: 'A' },
                { suit: '♦', value: '2' },
                { suit: '♦', value: '3' },
                { suit: '♦', value: '4' },
                { suit: '♦', value: '5' },
                { suit: '♦', value: '6' },
                { suit: '♦', value: '7' },
                { suit: '♦', value: '8' },
                { suit: '♦', value: '9' },
                { suit: '♦', value: '10' },
                { suit: '♦', value: 'J' },
                { suit: '♦', value: 'Q' },
                { suit: '♦', value: 'K' },

                { suit: '♣', value: 'A' },
                { suit: '♣', value: '2' },
                { suit: '♣', value: '3' },
                { suit: '♣', value: '4' },
                { suit: '♣', value: '5' },
                { suit: '♣', value: '6' },
                { suit: '♣', value: '7' },
                { suit: '♣', value: '8' },
                { suit: '♣', value: '9' },
                { suit: '♣', value: '10' },
                { suit: '♣', value: 'J' },
                { suit: '♣', value: 'Q' },
                { suit: '♣', value: 'K' },
            ]
            state.fiveRandomCards = []
            for (let i = 0; i < 5; i++) {
                let newCard = state.cards.splice((Math.floor(Math.random() * state.cards.length)), 1)
                state.fiveRandomCards.push(newCard[0])
            }
        }








    }

})
