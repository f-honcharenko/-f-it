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

          <b-form-group label="События">
            <b-list-group>
              <b-list-group-item
                button
                v-for="(event, index) in selectedLesson.events"
                :key="event.title"
                ><span v-if="event.type"
                  >{{ event.prefix }}{{ event.title }}</span
                >
                <span v-else>{{ event.title }}</span>
                <b-button-toolbar style="float: right">
                  <b-button
                    title="remove lesson"
                    @click="removeEvent(index)"
                    v-bind:style="'background-color:transparent;border: none;padding: 0px 10px 0px 10px'"
                  >
                    <b-icon
                      icon="x-square-fill"
                      scale="1"
                      variant="danger"
                    ></b-icon>
                  </b-button>
                </b-button-toolbar>
              </b-list-group-item>
            </b-list-group>
          </b-form-group>
          <b-button
            variant="success"
            @click="
              eventDate = selectedLesson.date;
              eventNumber = selectedLesson.lessonNumber;
              $bvModal.show('modal-prevent-closing4');
            "
            >Добавить</b-button
          >
          <b-form-group label="Примечание">
            <b-form-textarea
              id="textarea"
              v-model="selectedLesson.note"
              placeholder="Enter something..."
              rows="3"
              max-rows="6"
            ></b-form-textarea>
          </b-form-group>

          <!-- </b-form-group> -->
        </form>
      </b-modal>
      <!-- END modal3 -->
      <!-- START modal4-->
      <b-modal
        id="modal-prevent-closing4"
        ref="modal"
        title="Новое событие"
        @show="resetModal2"
        @hidden="resetModal2"
        @ok="addEvent"
      >
        <form ref="form" @submit.stop.prevent="handleSubmit">
          <b-form-group label="Наименование*">
            <b-form-input
              required
              type="text"
              v-model="newEvent.title"
            ></b-form-input>
          </b-form-group>
          <b-form-group label="Тема">
            <b-form-input type="text" v-model="newEvent.theme"></b-form-input>
          </b-form-group>
          <b-form-group label="Примечание">
            <b-form-textarea
              id="textarea"
              v-model="newEvent.note"
              placeholder="Enter something..."
              rows="3"
              max-rows="6"
            ></b-form-textarea>
          </b-form-group>
          <hr />
          <!-- <center style="dsiplay: inline-block"> -->
          <!-- <span
              style="dsiplay: inline-block"
              :class="{ 'font-weight-bold': newEventType }"
            >
              Префикс
            </span>
            <label class="switch">
              <input type="checkbox" @click="newEventType = !newEventType" />
              <span class="slider round"></span>
            </label>

            <span
              style="dsiplay: inline-block"
              :class="{ 'font-weight-bold': !newEventType }"
            > -->
          <h4>Цвет</h4>
          <!-- </span> -->
          <!-- </center> -->
          <div v-if="newEventType">
            <!-- <b-form-select
              :options="prefixes"
              v-model="newEvent.prefix"
              required
            > -->
            <!-- </b-form-select> -->
          </div>
          <div v-else>
            <input type="color" @change="myColor($event)" value="#364f5e" />
          </div>
        </form>
      </b-modal>
      <!-- END modal4 -->
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
      eventDate: "",
      eventNumber: "",
      prefixes: ["🔴", "⚫️", "🔵", "⚪️"],
      newEventType: false,
      newEvent: {
        title: "",
        theme: "",
        note: "",
        prefix: "🔵",
        type: "",
        color: "#364f5e",
      },
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
          console.log("type", info.event.extendedProps.type);
          if (info.event.extendedProps.type == "bday") {
            console.log("bday");
          } else {
            console.log("number: ", info.event.extendedProps.lessonNumber);
            //REWRITE THIS(TITLE AND )
            this.selectedLesson = {
              date: info.event.start.setUTCHours(0, 0),
              title: info.event.extendedProps.title,
              teacher: info.event.extendedProps.teacher,
              type: info.event.extendedProps.type,
              url: info.event.url,
              note: info.event.extendedProps.note,
              events: info.event.extendedProps.events,

              lessonNumber: info.event.extendedProps.lessonNumber,
              group: this.$route.query.group,
            };
            this.$bvModal.show("modal-prevent-closing2");
            console.log(this.selectedLesson);
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
        note: "",
        title: "",
        teacher: "",
        type: "",
        url: "",
        lessonNumber: "",
        group: "",
        events: [],
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
          alert(err.response.data.msg);
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
    removeEvent(e) {
      console.log(e);
      let date = new Date(this.selectedLesson.date);
      date.setUTCHours(0, 0);
      axios
        .post(this.$nodeLink + "/removeEvent", {
          token: localStorage["token"],
          group: this.$route.query.group,
          lessonNumber: this.selectedLesson.lessonNumber,
          date: date,
          eventPosition: e,
        })
        .then(
          (res) => {
            if (res.status == 200) {
              alert("Success");
              location.reload();
            }
          },
          (err) => {
            alert(err);
          }
        );
    },
    myColor(e) {
      console.log(e.target.value);
      this.newEvent.color = e.target.value;
    },
    resetModal() {
      this.newLesson = {};
    },
    resetModal2() {
      this.selectedLesson = {};
    },
    addEvent() {
      let errors = [];
      let date = new Date(this.eventDate);
      // date.setUTCDate(date.getUTCDate() - 1);
      date.setUTCHours(0, 0);
      // newEvent: {
      //   title: "",
      //   theme: "",
      //   note: "",
      //   prefix: "🔵",
      //   type: "",
      //   color: "#364f5e",
      // },

      for (let key in this.newEvent) {
        if (
          !this.newEvent[key] &&
          key != "theme" &&
          key != "note" &&
          key != "color" &&
          key != "type" &&
          key != "prefix"
        ) {
          errors.push(key);
        }
      }
      this.newEvent.type = this.newEventType;
      if (errors.length > 0) {
        alert("Заполните поля: " + errors.join(", "));
      } else {
        axios
          .post(this.$nodeLink + "/addEvent", {
            token: localStorage["token"],
            data: this.newEvent,
            date: date,
            group: this.$route.query.group,
            number: this.eventNumber,
          })
          .then(
            (res) => {
              if (res.status == 200) {
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
    editLesson2() {
      let errors = [];
      let date = new Date(this.selectedLesson.date);
      // date.setUTCDate(date.getUTCDate() - 1);
      date.setUTCHours(0, 0);
      console.log(123);

      const data = {
        lessonName: this.selectedLesson.title,
        lessonNote: this.selectedLesson.note,
        lessonType: this.selectedLesson.type,
        lessonLink: this.selectedLesson.url,
        lessonTeacher: this.selectedLesson.teacher,
        lessonNumber: this.selectedLesson.lessonNumber,
        lessonDate: date,
      };
      for (let key in data) {
        if (!data[key] && key != "lessonLink" && key != "lessonNote") {
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
            group: this.$route.query.group,
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
/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

/* Hide default HTML checkbox */
.switch input {
  display: none;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #2196F3;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style> 