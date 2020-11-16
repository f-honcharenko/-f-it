import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueRouter from 'vue-router'

import AdminPanel from './components/AdminPanel'
import TimeTable from './components/TimeTable'
import Chooser from './components/Chooser'
import Lesson from './components/Lesson'
// import LessonEdit from './components/LessonEdit'
import Login from './components/Login'
import LK from './components/LK'
import DayEdit from './components/DayEdit'
import adminTimeTable from './components/adminTimeTable'
import blocks from './components/Blocks'
import test1 from './components/test1'

import fullCalendar from 'vue-fullcalendar'
adminTimeTable
Vue.prototype.$nodeLink = 'http://localhost:5000'; //DEV
// Vue.prototype.$nodeLink = 'https://fit-backend.ew.r.appspot.com'; //PRODUCTION
// Vue.prototype.$nodeLink = 'https://starlit-granite-295813.uc.r.appspot.com'; //DEV_PRODUCTION
// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.config.productionTip = false
Vue.use(VueRouter);
Vue.component('full-calendar', fullCalendar)
const routes = [
  { path: '/blockSort', component: test1 },
  { path: '/', component: Chooser },
  { path: '/timetable', component: TimeTable },
  { path: '/admin', component: AdminPanel },
  { path: '/login', component: Login },
  { path: '/lk', component: LK, name: 'LK' },
  { path: '/adminTimeTable', component: adminTimeTable, name: 'adminTimeTable' },
  { path: '/lesson', component: Lesson, name: 'Lesson', props: true },
  // { path: '/lessonEdit', component: LessonEdit, name: 'LessonEdit', props: true },
  { path: '/dayEdit', component: DayEdit, name: 'DayEdit', props: true },
  { path: '/blocks', component: blocks, name: 'blocks', props: true },
];

const router = new VueRouter({
  mode: 'history',
  routes
});


new Vue({
  el: '#app',
  router,
  render: h => {
    return h(App)
  }
});