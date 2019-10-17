import Vue from 'vue'
import Vuex from 'vuex'


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
            state.combination = ''
        },

        calculateValue(state){
            state.finalCards = []

            for(let i = 0; i < 5; i++){
                switch(state.fiveRandomCards[i].value){
                    case 'A' : state.finalCards.push({suit : state.fiveRandomCards[i].suit, value : 14})
                    break
                    case 'J' : state.finalCards.push({suit : state.fiveRandomCards[i].suit, value : 11})
                    break
                    case 'Q' : state.finalCards.push({suit : state.fiveRandomCards[i].suit, value : 12})
                    break
                    case 'K' : state.finalCards.push({suit : state.fiveRandomCards[i].suit, value : 13})
                    break
                    default: state.finalCards.push({suit : state.fiveRandomCards[i].suit, value : Number(state.fiveRandomCards[i].value)})
                }
                
            }
            state.finalCards.sort(function(a, b){
                return b.value < a.value ? 1
                       : b.value > a.value ? -1
                       : 0
            })

            // jacks or better
            if((state.finalCards[0].value == state.finalCards[1].value && state.finalCards[0].value > 10)
                || (state.finalCards[1].value == state.finalCards[2].value && state.finalCards[1].value > 10)
                || (state.finalCards[2].value == state.finalCards[3].value && state.finalCards[2].value > 10)
                || (state.finalCards[3].value == state.finalCards[4].value && state.finalCards[3].value > 10)){   
                    state.combination = 'Jacks or better'
                }
            
            // Two pair
            if((state.finalCards[0].value == state.finalCards[1].value && state.finalCards[2].value == state.finalCards[3].value)
                || (state.finalCards[0].value == state.finalCards[1].value && state.finalCards[3].value == state.finalCards[4].value)
                || (state.finalCards[1].value == state.finalCards[2].value && state.finalCards[3].value == state.finalCards[4].value)){
                state.combination = 'tvåpar!'
            }

            // Three of a kind
            if((state.finalCards[0].value == state.finalCards[1].value && state.finalCards[1].value == state.finalCards[2].value)
                || (state.finalCards[1].value == state.finalCards[2].value && state.finalCards[2].value == state.finalCards[3].value)
                || (state.finalCards[2].value == state.finalCards[3].value && state.finalCards[3].value == state.finalCards[4].value)){
                state.combination = 'Three of a kind'
                } 
            // straight
            if(state.finalCards[0].value == state.finalCards[1].value - 1 
                && state.finalCards[1].value == state.finalCards[2].value - 1
                && state.finalCards[2].value == state.finalCards[3].value - 1
                && state.finalCards[3].value == state.finalCards[4].value - 1){
                    state.combination = 'Straight!'
                }
            // Flush
            if(state.finalCards[0].suit == state.finalCards[1].suit
                && state.finalCards[1].suit == state.finalCards[2].suit
                && state.finalCards[2].suit == state.finalCards[3].suit
                && state.finalCards[3].suit == state.finalCards[4].suit){
                    state.combination = 'Flush'
                }
            // Check full house
            // if((state.finalCards[0].value == state.finalCards[1].value 
            //     && state.finalCards[1].value == state.finalCards[2].value) 
            //     && state.finalCards[3].value == state.finalCards[4].value)
            //     || 
                
            //         (state.finalCards[0].value == state.finalCards[1].value
            //     && (state.finalCards[2].value == state.finalCards[3].value
            //     && state.finalCards[3].value == state.finalCards[4].value)){
            //         state.combination = "Full house!"
            //     }
            // Check four of a kind
            if((state.finalCards[0].value == state.finalCards[1].value && state.finalCards[1].value == state.finalCards[2].value && state.finalCards[2].value == state.finalCards[3].value)
            ||(state.finalCards[1].value == state.finalCards[2].value && state.finalCards[2].value == state.finalCards[3].value && state.finalCards[3].value == state.finalCards[4].value)){
                state.combination = "4 of a kind"
            }
            // Check Straight flush
            if(state.finalCards[0].value == state.finalCards[1].value - 1 
                && state.finalCards[1].value == state.finalCards[2].value - 1
                && state.finalCards[2].value == state.finalCards[3].value - 1
                && state.finalCards[3].value == state.finalCards[4].value - 1
                && state.finalCards[0].suit == state.finalCards[1].suit
                && state.finalCards[1].suit == state.finalCards[2].suit
                && state.finalCards[2].suit == state.finalCards[3].suit
                && state.finalCards[3].suit == state.finalCards[4].suit){
                state.combination = 'Straight flush!'
            }

            // Check Royal flush
            else if(state.finalCards[0].value == 10 
                && state.finalCards[1].value == 11 
                && state.finalCards[2].value == 12 
                && state.finalCards[3].value == 13 
                && state.finalCards[4].value == 14
                && state.finalCards[0].suit == state.finalCards[1].suit
                && state.finalCards[1].suit == state.finalCards[2].suit 
                && state.finalCards[2].suit == state.finalCards[3].suit 
                && state.finalCards[3].suit == state.finalCards[4].suit 
                ){state.combination = 'Royal Straight Flush'}

            

            

            

            

            

            

            

            
            




            // state.finalCards.sort(function(a, b){return a-b})
            
            if(state.finalCards[0] == state.finalCards[1]){
                state.combination = 'Par!'
            }
            // switch(state.finalCards){
            //     case state.finalCards[0] == state.finalCards[1] : 
            //         state.combination = 'Par!'
            //         break
                
            // }


        },

        

        







    },


})
