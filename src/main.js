import Vue from 'vue'
import App from './App'
import Element from 'element-ui'
import store from './store'

import 'element-ui/lib/theme-chalk/index.css';

Vue.use(Element)

Vue.config.productionTip = false

new Vue({
  el: "#app",
  store,
  render: h => h(App)
})