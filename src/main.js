import Vue from 'vue'
import App from './App'
import 'bootstrap/dist/css/bootstrap.css'
import anime from "expose-loader?exposes=anime!animejs/lib/anime.js"

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
