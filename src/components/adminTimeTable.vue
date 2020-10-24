<template>
  <div>
    <div v-if="auth">
      <center>
        <h1>{{ this.$route.query.group }} [Редактирование]</h1>
      </center>
      <FullCalendar
        ref="fullCalendar"
        :key="claendarKey"
        :options="calendarOptions"
      />
    </div>
    <div v-else>
      <div class="h1">У вас нет доступа к данной странице!</div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import FullCalendar from "@fullcalendar/vue";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import bootstrapPlugin from "@fullcalendar/bootstrap";

export default {
  name: "adminTimeTable",
  watch: {
    // эта функция запускается при любом изменении вопроса
    editPlatform: function (getPlatform) {
      console.log(getPlatform);
      this.claendarKey = 10;
    },
  },
  data() {
    return {
      auth: "",
      user: {},
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
          if (info.event.extendedProps.type == "bday") {
            console.log("bday");
          } else {
            console.log(info.event.extendedProps);
            this.$router.push({
              name: "LessonEdit",
              params: {
                title: info.event.title,
                url: info.event.url,
                date: String(info.event.start).slice(0, 10),
                timeStart: String(info.event.start).slice(16, 21),
                timeEnd: String(info.event.end).slice(16, 21),
                teacher: info.event.extendedProps.teacher,
                lessonNumber: info.event.extendedProps.lessonNumber,
                group: this.$route.query.group,
                fullDate: info.event.extendedProps.date,
                spec: this.$route.query.spec,
              },
            });
          }
        },
        dayMaxEventRows: true, // for all non-TimeGrid views
        views: {
          timeGrid: {
            dayMaxEventRows: 6, // adjust to 6 only for timeGridWeek/timeGridDay
          },
        },
        locale: "ru",
        firstDay: 1,
        navLinkDayClick: (date) => {
          console.log(date);
          this.$router.push({
            name: "DayEdit",
            params: {
              date: date.toISOString(),
              spec: this.$route.query.spec,
              group: this.$route.query.group,
            },
          });
        },
        themeSystem: "standart",
        navLinks: true,
        eventTimeFormat: {
          hour: "2-digit",
          minute: "2-digit",
          meridiem: false,
        },
        displayEventEnd: true,
        eventSources: [
          {
            url: this.$nodeLink + "/timetables/1/getCal",
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

  beforeCreate() {
    axios.post(this.$nodeLink + "/lk", { token: localStorage["token"] }).then(
      (res) => {
        console.log(res);
        if (res.status == 200) {
          console.log(res);
          this.auth = true;
          this.user = res.data.decoded.data;
        }
      },
      (err) => {
        console.log(err);
      }
    );
  },
  created() {
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