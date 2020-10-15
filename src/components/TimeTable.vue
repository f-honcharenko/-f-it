<template>
  <div>
  <center><h1>{{this.$route.query.group}}</h1></center>
  <FullCalendar ref="fullCalendar" @events="calendarOptions.events" :key="claendarKey" :options="calendarOptions" :eventClick="test()"/>
  </div>
</template>
<script>
import axios from 'axios';
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
// import 'bootstrap/dist/css/bootstrap.css';
// import '@fortawesome/fontawesome-free/css/all.css'; // needs additional webpack config!
import bootstrapPlugin from '@fullcalendar/bootstrap';
import {mapGetters} from 'vuex'

export default {
  name: 'header',
  data(){
    return{
      group:'ПП12/1',
      claendarKey:0,
      calendarOptions: {
         timeZone: 'UTC',
        contentHeight: 700,
        plugins: [ dayGridPlugin, interactionPlugin, timeGridPlugin ,listPlugin, bootstrapPlugin ],
        initialView: 'dayGridMonth',
        // initialView: 'dayGridWeek',
        // initialView: 'timeGridWeek',
        // initialView: 'listWeek',
        weekNumbers:true,
        selectable:false,
        headerToolbar:{
          start: 'title', // will normally be on the left. if RTL, will be on the right
          center: 'listWeek dayGridWeek dayGridMonth',
          end: 'today prev,next', // will normally be on the right. if RTL, will be on the left,
          // dayGridPlugin,
          // dayGridWeek,
          // timeGridWeek,
          // listWeek
        },
        nowIndicator: true,
        eventClick: (info)=> {
          info.jsEvent.preventDefault();
          console.log(info.event.url);
        this.$router.push({ name: 'Lesson', params: { 
          title: info.event.title,
          url: info.event.url,
          date: String(info.event.start).slice(0,10),
          timeStart: String(info.event.start).slice(16,21),
          timeEnd: String(info.event.end).slice(16,21),
          teacher: info.event.extendedProps.teacher
          } })
          },
        dayMaxEventRows: true, // for all non-TimeGrid views
        views: {
          timeGrid: {
            dayMaxEventRows: 6 // adjust to 6 only for timeGridWeek/timeGridDay
          }
        },
        locale: 'ru', // the initial locale
        firstDay : 1,
        dateClick: this.handleDateClick,
        themeSystem: 'standart',
        navLinks:'true',
        eventTimeFormat: { // like '14:30:00'
    hour: '2-digit',
    minute: '2-digit',
    // second: '0-digit',
    meridiem: false
  },
  displayEventEnd:false,
        eventSources: [
            {
              url: 'https://fit-backend.ew.r.appspot.com/timetables/1/getCal',
              //url: 'http://localhost:5000/timetables/1/getCal',
              method: 'POST',
              extraParams: {
                group: this.$route.query.group,
                spec: this.$route.query.spec,
                custom_param2: 'somethingelse'
              },
              failure: function() {
                alert('there was an error while fetching events!');
              },
            }
          ]
      },
      data:{},
    }
  },
  components: {
    FullCalendar // make the <FullCalendar> tag available
  },
  props: {
    msg: String,
    group1: String
  },
  computed: {
  ...mapGetters(["EVENTS"]),
  now: function () {
    return Date.now()
  }
},
  methods:{
    test:  function(){
            // this.$router.push({ path: 'lesson', query: { plan: 'asd' } })
      // let calendarApi = this.$refs.fullCalendar.getApi()
      console.log('calendarApi.getEvents()');
      }
  },
  beforeCreate(){
    console.log('5000'+document.domain.substr(4));
        document.title ='[F]it';
        //Получение данных
        axios.get('http://'+document.domain+':50001/timetables/1/get')
            .then((res)=>{
                console.log(res.data);
                this.data=res.data;
                console.log("DATA:",res.data);
                for (let key in res.data){
                  console.log(key);
                  const event = {
                    title: key,
                    date: key,
                    color: '#ff5733',
                  };

                  console.log(event);

                }
                // this.data.forEach(element => {
                  //   console.log(element);
                  // this.calendarOptions.events.push(
                  //   { title: element[this.group][1].title, date: '2020-10-06', groupId: 'AOP', color: '#ff5733' },
                  // );
                // });
                console.log(this.calendarOptions.events);
            },(err)=>{
                console.log(err);
            });
    },
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* @import '~@fullcalendar/core/main.css'; */
/* @import '~@fullcalendar/timeline/main.css'; */
/* @import '~@fullcalendar/resource-timeline/main.css'; */
</style>