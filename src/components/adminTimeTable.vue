<template>
  <div>
    <div v-if="auth">
      <!-- START modal3 -->
      <b-modal
        id="modal-prevent-closing2"
        ref="modal"
        title="Изменение пары"
        @show="resetModal"
        @hidden="resetModal"
        @ok="editLesson2"
      >
        <form ref="form" @submit.stop.prevent="handleSubmit">
          <b-form-group label="Предмет">
            <b-form-select
              :options="options.lessons"
              v-model="selectedLesson.title"
              required
            >
            </b-form-select>
            <b-form-select
              :options="options.types"
              v-model="selectedLesson.type"
              required
            ></b-form-select>
          </b-form-group>

          <b-form-group label="Преподаватель">
            <b-form-select
              :options="options.teachers"
              v-model="selectedLesson.teacher"
              required
            ></b-form-select>
          </b-form-group>

          <b-form-group label="Ссылка">
            <b-form-input
              required
              type="url"
              v-model="selectedLesson.url"
            ></b-form-input>
          </b-form-group>

          <!-- </b-form-group> -->
        </form>
      </b-modal>
      <!-- END modal3 -->
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
      options: {},
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
            console.log();
            //REWRITE THIS(TITLE AND )
            this.selectedLesson = {
              date: info.event.start.setUTCHours(0, 0),
              title: info.event.extendedProps.title,
              teacher: info.event.extendedProps.teacher,
              type: info.event.extendedProps.type,
              url: info.event.url,
              lessonNumber: info.event.extendedProps.lessonNumber,
              group: this.$route.query.group,
            };
            this.$bvModal.show("modal-prevent-closing2");
            // this.$router.push({
            //   name: "LessonEdit",
            //   params: {
            //     title: info.event.title,
            //     url: info.event.url,
            //     date: String(info.event.start).slice(0, 10),
            //     timeStart: String(info.event.start).slice(16, 21),
            //     timeEnd: String(info.event.end).slice(16, 21),
            //     teacher: info.event.extendedProps.teacher,
            //     lessonNumber: info.event.extendedProps.lessonNumber,
            //     group: this.$route.query.group,
            //     fullDate: info.event.extendedProps.date,
            //   },
            // });
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
        navLinkDayClick: (date) => {
          let date2 = new Date(date);
          date2.setDate(date.getDate() + 1);
          console.log(date2);
          this.$router.push({
            name: "DayEdit",
            params: {
              date: date2,
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
      selectedLesson: {
        title: "",
        teacher: "",
        type: "",
        url: "",
        lessonNumber: "",
        group: "",
      },
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
    axios
      .post(this.$nodeLink + "/get/options", { token: localStorage["token"] })
      .then(
        (res) => {
          if (res.status == 200) {
            console.log(res.data.file);
            this.options = res.data.file;
            this.options.lessons = this.options.lessons.sort();
            this.options.teachers = this.options.teachers.sort();
          }
        },
        (err) => {
          alert(err);
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
  methods: {
    resetModal() {
      this.newLesson = {};
    },

    editLesson2() {
      let errors = [];
      let date = new Date(this.selectedLesson.date);
      // date.setUTCDate(date.getUTCDate() - 1);
      date.setUTCHours(0, 0);
      console.log(123);

      const data = {
        lessonName: this.selectedLesson.title,
        lessonType: this.selectedLesson.type,
        lessonLink: this.selectedLesson.url,
        lessonTeacher: this.selectedLesson.teacher,
        lessonNumber: this.selectedLesson.lessonNumber,
        lessonDate: date,
      };
      console.log("=================");
      console.log("date: ", date);
      console.log("data: ", data);
      console.log("=================");
      for (let key in data) {
        if (!data[key] && key != "lessonLink") {
          errors.push(key);
        }
      }

      if (errors.length > 0) {
        alert("Заполните поля: " + errors.join(", "));
      } else {
        axios
          .post(this.$nodeLink + "/editLesson", {
            token: localStorage["token"],
            data,
            // lessonDate: date,
            group: this.group,
          })
          .then(
            (res) => {
              if (res.status == 200) {
                this.newLesson = {};
                alert("Success!");
                location.reload();
              }
            },
            (err) => {
              alert(err.response.data.msg);
            }
          );
      }
    },
  },
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style> 