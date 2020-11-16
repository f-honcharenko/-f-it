<template>
  <div>
    <b-modal id="modal-lg" size="lg" :title="selectedLesson.title">
      <h4>
        Преподователь: <i>{{ selectedLesson.teacher }}</i>
      </h4>
      <h4 v-if="selectedLesson.link">
        <a :href="selectedLesson.link" target="_blank">Ссылка</a><i></i>
      </h4>
      <h4 v-else>Ссылка отсутствует</h4>
      <h4 v-show="selectedLesson.events">
        <hr />
        События:
      </h4>
      <b-list-group>
        <b-list-group-item
          button
          v-for="event in selectedLesson.events"
          :key="event.title"
          @click="
            selectedEvent = event;
            $bvModal.show('modal-lg2');
          "
        >
          <span>{{ event.title }}</span></b-list-group-item
        >
      </b-list-group>

      <div v-if="selectedLesson.note">
        <hr />
        <h4>Примечание:</h4>
        {{ selectedLesson.note }}
      </div>
    </b-modal>

    <b-modal id="modal-lg2" size="lg" :title="selectedEvent.title">
      <h4>
        Тема: <i>{{ selectedEvent.theme }}</i>
      </h4>
      <h4>
        Примечание: <span>{{ selectedEvent.theme }}</span>
      </h4>
    </b-modal>
    <center>
      <h1>{{ this.$route.query.group }}</h1>
    </center>
    <FullCalendar
      ref="fullCalendar"
      :key="claendarKey"
      :options="calendarOptions"
    />
  </div>
</template>
<script>
// import axios from "axios";
import FullCalendar from "@fullcalendar/vue";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import bootstrapPlugin from "@fullcalendar/bootstrap";

export default {
  name: "TimeTable",
  watch: {
    // эта функция запускается при любом изменении вопроса
    editPlatform: function (getPlatform) {
      console.log(getPlatform);
      this.claendarKey = 10;
    },
  },
  data() {
    return {
      selectedEvent: {
        title: "",
        theme: "",
        note: "",
      },
      selectedLesson: {
        title: "",
        teacher: "",
        link: "",
        dateS: "",
        dateE: "",
      },
      test: "",
      group: "ПП12/1",
      claendarKey: 0,
      calendarOptions: {
        timeZone: "UTC",
        contentHeight: 700,
        plugins: [
          dayGridPlugin,
          interactionPlugin,
          timeGridPlugin,
          listPlugin,
          bootstrapPlugin,
        ],

        // initialView: "",//see 'created'
        // initialView: "dayGridMonth",
        // initialView: 'dayGridWeek',
        // initialView: 'timeGridWeek',
        // initialView: 'listWeek',
        weekNumbers: true,
        selectable: false,
        headerToolbar: {
          start: "title", // will normally be on the left. if RTL, will be on the right
          center: "listWeek dayGridWeek dayGridMonth",
          end: "today prev,next", // will normally be on the right. if RTL, will be on the left,
          // dayGridPlugin,
          // dayGridWeek,
          // timeGridWeek,
          // listWeek
        },
        nowIndicator: true,
        eventClick: (info) => {
          info.jsEvent.preventDefault();
          console.log(info.event.title);
          if (info.event.extendedProps.type == "bday") {
            console.log("bday");
          } else {
            if (info.event.title != "") {
              this.selectedLesson.title = info.event.title;
              this.selectedLesson.teacher = info.event.extendedProps.teacher;
              this.selectedLesson.link = info.event.url;
              this.selectedLesson.dateS = info.event.start;
              this.selectedLesson.dateE = String(info.event.end).slice(16, 21);
              this.selectedLesson.note = info.event.extendedProps.note;
              this.selectedLesson.events = info.event.extendedProps.events;
              this.$bvModal.show("modal-lg");
            } else {
              this.selectedLesson.title = "";
            }
          }
        },
        dayMaxEventRows: false, // for all non-TimeGrid views
        views: {
          timeGrid: {
            dayMaxEventRows: 6, // adjust to 6 only for timeGridWeek/timeGridDay
          },
        },
        locale: "ru",
        firstDay: 1,
        dateClick: this.handleDateClick,
        themeSystem: "standart",
        navLinks: "true",
        eventTimeFormat: {
          hour: "2-digit",
          minute: "2-digit",
          meridiem: false,
        },
        displayEventEnd: true,
        eventSources: [
          {
            // url: "https://fit-backend.ew.r.appspot.com/timetables/1/getCal",
            url: this.$nodeLink + "/timetables/2/getCal",
            method: "POST",
            extraParams: {
              group: this.$route.query.group,
              spec: this.$route.query.spec,
              custom_param2: "somethingelse",
            },
            failure: function () {
              alert("there was an error while fetching events!");
            },
          },
        ],
      },
      data: {},
    };
  },
  components: {
    FullCalendar, // make the <FullCalendar> tag available
  },
  props: {
    msg: String,
    group1: String,
  },
  // computed: {
  //   // геттер вычисляемого значения
  //   getPlatform: {
  //     get: function(){
  //       if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
  //         return 'mobile'
  //       } else{
  //         return 'computer'
  //       }
  //     },
  //     set: function(value){
  //       this.group = value;
  //       console.log(value);
  //     }
  // `this` указывает на экземпляр vm

  // }
  // }
  beforeMount() {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      this.calendarOptions.initialView = "listWeek";
    } else {
      this.calendarOptions.initialView = "dayGridMonth";
    }
  },
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>