import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueRouter from 'vue-router'
import AdminPanel from './components/AdminPanel'
import TimeTable from './components/TimeTable'
import Chooser from './components/Chooser'
import Lesson from './components/Lesson'
import fullCalendar from 'vue-fullcalendar'
import store from "./store/store";


// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.config.productionTip = false
Vue.use(VueRouter);
Vue.component('full-calendar', fullCalendar)
const routes = [
  { path: '/', component: Chooser },
  { path: '/timetable', component: TimeTable },
  { path: '/admin', component: AdminPanel },
  { path: '/lesson', component: Lesson, name: 'Lesson', props: true },
];

const router = new VueRouter({
  mode:'history',
  routes
});


new Vue({
  el: '#app',
  router,
  store,
  render: h => {
    return h(App)
  }
});