import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        variable: 'Testing testing',

        cards: [],
        fiveRandomCards: []
    },

    mutations: {
        getFiveRandomCards(state){
            state.cards = [
            {suit: '♥', value : 'A'},
            {suit: '♥', value : '2'},
            {suit: '♥', value : '3'},
            {suit: '♥', value : '4'},
            {suit: '♥', value : '5'},
            {suit: '♥', value : '6'},
            {suit: '♥', value : '7'},
            {suit: '♥', value : '8'},
            {suit: '♥', value : '9'},
            {suit: '♥', value : '10'},
            {suit: '♥', value : 'J'},
            {suit: '♥', value : 'Q'},
            {suit: '♥', value : 'K'},

            {suit: '♠', value : 'A'},
            {suit: '♠', value : '2'},
            {suit: '♠', value : '3'},
            {suit: '♠', value : '4'},
            {suit: '♠', value : '5'},
            {suit: '♠', value : '6'},
            {suit: '♠', value : '7'},
            {suit: '♠', value : '8'},
            {suit: '♠', value : '9'},
            {suit: '♠', value : '10'},
            {suit: '♠', value : 'J'},
            {suit: '♠', value : 'Q'},
            {suit: '♠', value : 'K'},

            {suit: '♦', value : 'A'},
            {suit: '♦', value : '2'},
            {suit: '♦', value : '3'},
            {suit: '♦', value : '4'},
            {suit: '♦', value : '5'},
            {suit: '♦', value : '6'},
            {suit: '♦', value : '7'},
            {suit: '♦', value : '8'},
            {suit: '♦', value : '9'},
            {suit: '♦', value : '10'},
            {suit: '♦', value : 'J'},
            {suit: '♦', value : 'Q'},
            {suit: '♦', value : 'K'},

            {suit: '♣', value : 'A'},
            {suit: '♣', value : '2'},
            {suit: '♣', value : '3'},
            {suit: '♣', value : '4'},
            {suit: '♣', value : '5'},
            {suit: '♣', value : '6'},
            {suit: '♣', value : '7'},
            {suit: '♣', value : '8'},
            {suit: '♣', value : '9'},
            {suit: '♣', value : '10'},
            {suit: '♣', value : 'J'},
            {suit: '♣', value : 'Q'},
            {suit: '♣', value : 'K'},
            ]
            // state.fiveRandomCards = []
            for(let i = 0; i < 5; i++){
                let newCard = state.cards.splice((Math.floor(Math.random() * state.cards.length)), 1)
                state.fiveRandomCards.push(newCard[0])
            }
        }
    }
})