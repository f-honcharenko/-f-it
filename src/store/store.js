import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        events: [ { title: 'event 222223333', date: '2020-10-06', groupId: 'AOP', color: '#ff5733' }]
    },
    getters: {
        EVENTS: state => state.events
    },
    mutations: {
        ADD_EVENT: (state, event) => {
            state.events.push(event)
        },
        UPDATE_EVENT: (state, {id, title, start, end}) => {
            let index = state.events.findIndex(_event => _event.id == id)
            
            state.events[index].title = title;
            state.events[index].start = start;
            state.events[index].end = end;
        }
    },
    actions: {}
})

export default store;