import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'

import LandingPage from "./components/LandingPage.vue"
import VideoPoker from "./components/VideoPoker.vue"
import PersonalityTest from "./components/PersonalityTest.vue"


import { store } from './store/store';

Vue.config.productionTip = false



Vue.use(VueRouter)

const routes = [
    { path: '/', component: LandingPage },
    { path: '/poker', component: VideoPoker },
    { path: '/test', component: PersonalityTest }
];

const router = new VueRouter({
    routes
})

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
