<template>
  <div class="p-3">
    <div v-if="auth">
      <!-- START modal1 -->
      <b-modal id="modal1" ref="my-modal" hide-footer title="Удаление пары">
        <div class="d-block text-center">
          <h4>
            Вы уверены что хотите удалить пару
            <b>№{{ selectedLessonNumber }}</b> ?
          </h4>
        </div>
        <b-button
          class="mt-3"
          variant="outline-danger"
          block
          @click="removeLesson(selectedLessonNumber)"
          >Удалить</b-button
        >
        <b-button
          class="mt-3"
          variant="outline-info"
          block
          @click="$bvModal.hide('modal1')"
          >Отмена</b-button
        >
      </b-modal>

      <!-- END modal1 -->
      <!-- START modal2 -->
      <b-modal
        id="modal-prevent-closing"
        ref="modal"
        title="Создание пары"
        @show="resetModal"
        @hidden="resetModal"
        @ok="addLesson"
      >
        <form ref="form" @submit.stop.prevent="handleSubmit">
          <b-form-group label="Предмет">
            <b-form-select
              v-model="newLesson.lessonName"
              :options="options.lessons"
              required
            ></b-form-select>
            <b-form-select
              v-model="newLesson.lessonType"
              :options="options.types"
              required
            ></b-form-select>
          </b-form-group>

          <b-form-group label="Преподаватель">
            <b-form-select
              v-model="newLesson.lessonTeacher"
              :options="options.teachers"
              required
            ></b-form-select>
          </b-form-group>

          <b-form-group label="Ссылка">
            <b-form-input
              v-model="newLesson.lessonLink"
              required
              type="url"
            ></b-form-input>
          </b-form-group>
          <!-- @ok="addLesson" -->

          <!-- </b-form-group> -->
        </form>
      </b-modal>
      <!-- END modal2 -->
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
              v-model="oneDayEdit[selectedLessonNumber].title"
              :options="options.lessons"
              required
            >
            </b-form-select>
            <b-form-select
              v-model="oneDayEdit[selectedLessonNumber].type"
              :options="options.types"
              required
            ></b-form-select>
          </b-form-group>

          <b-form-group label="Преподаватель">
            <b-form-select
              v-model="oneDayEdit[selectedLessonNumber].teacher"
              :options="options.teachers"
              required
            ></b-form-select>
          </b-form-group>

          <b-form-group label="Ссылка">
            <b-form-input
              v-model="oneDayEdit[selectedLessonNumber].link"
              required
              type="url"
            ></b-form-input>
          </b-form-group>

          <!-- </b-form-group> -->
        </form>
      </b-modal>
      <!-- END modal3 -->

      [Редактирование дня]
      <hr />

      <h2>{{ new Date(date).toDateString() }}</h2>
      <br />
      <b-list-group>
        <b-list-group-item
          v-bind:style="'background-color:transparent'"
          class="lessonTitle"
          v-if="oneDay[1].title != 'none'"
        >
          <b>1. {{ oneDay[1].title }}</b>
          <b-button-toolbar style="float: right">
            <b-button
              title="edit lesson"
              @click="
                (selectedLessonNumber = 1),
                  $bvModal.show('modal-prevent-closing2')
              "
              v-bind:style="'background-color:transparent; border: none;padding: 0px 10px 0px 10px'"
            >
              <b-icon icon="pencil-fill" scale="1" variant="warning "></b-icon>
            </b-button>
            <b-button
              title="remove lesson"
              @click="(selectedLessonNumber = 1), $bvModal.show('modal1')"
              v-bind:style="'background-color:transparent;border: none;padding: 0px 10px 0px 10px'"
            >
              <b-icon icon="x-square-fill" scale="1" variant="danger"></b-icon>
            </b-button>
          </b-button-toolbar>
        </b-list-group-item>
        <b-list-group-item v-else class="lessonTitle">
          <b>1. -</b>
          <b-button-toolbar style="float: right">
            <b-button
              title="add lesson"
              @click="
                (selectedLessonNumber = 1),
                  $bvModal.show('modal-prevent-closing')
              "
              v-bind:style="'background-color:transparent;border: none;padding: 0px 10px 0px 10px'"
            >
              <b-icon icon="plus-circle" scale="1" variant="success"></b-icon>
            </b-button>
          </b-button-toolbar>
        </b-list-group-item>

        <b-list-group-item
          v-bind:style="'background-color:transparent'"
          class="lessonTitle"
          v-if="oneDay[2].title != 'none'"
        >
          <b>2. {{ oneDay[2].title }}</b>
          <b-button-toolbar style="float: right">
            <b-button
              title="edit lesson"
              @click="
                (selectedLessonNumber = 2),
                  $bvModal.show('modal-prevent-closing2')
              "
              v-bind:style="'background-color:transparent ;border: none;padding: 0px 10px 0px 10px'"
            >
              <b-icon icon="pencil-fill" scale="1" variant="warning"></b-icon>
            </b-button>
            <b-button
              title="remove lesson"
              @click="(selectedLessonNumber = 2), $bvModal.show('modal1')"
              v-bind:style="'background-color:transparent;border: none;padding: 0px 10px 0px 10px'"
            >
              <b-icon icon="x-square-fill" scale="1" variant="danger"></b-icon>
            </b-button>
          </b-button-toolbar>
        </b-list-group-item>
        <b-list-group-item v-else class="lessonTitle">
          <b>2. -</b>
          <b-button-toolbar style="float: right">
            <b-button
              title="add lesson"
              @click="
                (selectedLessonNumber = 2),
                  $bvModal.show('modal-prevent-closing')
              "
              v-bind:style="'background-color:transparent ;border: none;padding: 0px 10px 0px 10px'"
            >
              <b-icon icon="plus-circle" scale="1" variant="success"></b-icon>
            </b-button>
          </b-button-toolbar>
        </b-list-group-item>

        <b-list-group-item
          v-bind:style="'background-color:transparent'"
          class="lessonTitle"
          v-if="oneDay[3].title != 'none'"
        >
          <b>3. {{ oneDay[3].title }}</b>
          <b-button-toolbar style="float: right">
            <b-button
              title="edit lesson"
              @click="
                (selectedLessonNumber = 3),
                  $bvModal.show('modal-prevent-closing2')
              "
              v-bind:style="'background-color:transparent; border: none;padding: 0px 10px 0px 10px'"
            >
              <b-icon icon="pencil-fill" scale="1" variant="warning"></b-icon>
            </b-button>
            <b-button
              title="remove lesson"
              @click="(selectedLessonNumber = 3), $bvModal.show('modal1')"
              v-bind:style="'background-color:transparent;border: none;padding: 0px 10px 0px 10px'"
            >
              <b-icon icon="x-square-fill" scale="1" variant="danger"></b-icon>
            </b-button>
          </b-button-toolbar>
        </b-list-group-item>
        <b-list-group-item v-else class="lessonTitle">
          <b>3. -</b>
          <b-button-toolbar style="float: right">
            <b-button
              title="add lesson"
              @click="
                (selectedLessonNumber = 3),
                  $bvModal.show('modal-prevent-closing')
              "
              v-bind:style="'background-color:transparent;border: none;padding: 0px 10px 0px 10px'"
            >
              <b-icon icon="plus-circle" scale="1" variant="success"></b-icon>
            </b-button>
          </b-button-toolbar>
        </b-list-group-item>

        <b-list-group-item
          v-bind:style="'background-color:transparent'"
          class="lessonTitle"
          v-if="oneDay[4].title != 'none'"
        >
          <b>4. {{ oneDay[4].title }}</b>
          <b-button-toolbar style="float: right">
            <b-button
              title="edit lesson"
              @click="
                (selectedLessonNumber = 4),
                  $bvModal.show('modal-prevent-closing2')
              "
              v-bind:style="'background-color: background-color:transparent; border: none;padding: 0px 10px 0px 10px'"
            >
              <b-icon icon="pencil-fill" scale="1" variant="warning"></b-icon>
            </b-button>
            <b-button
              title="remove lesson"
              @click="(selectedLessonNumber = 4), $bvModal.show('modal1')"
              v-bind:style="'background-color:transparent;border: none;padding: 0px 10px 0px 10px'"
            >
              <b-icon icon="x-square-fill" scale="1" variant="danger"></b-icon>
            </b-button>
          </b-button-toolbar>
        </b-list-group-item>
        <b-list-group-item v-else class="lessonTitle">
          <b>4. -</b>
          <b-button-toolbar style="float: right">
            <b-button
              title="add lesson"
              @click="
                (selectedLessonNumber = 4),
                  $bvModal.show('modal-prevent-closing')
              "
              v-bind:style="'background-color:transparent;border: none;padding: 0px 10px 0px 10px'"
            >
              <b-icon icon="plus-circle" scale="1" variant="success"></b-icon>
            </b-button>
          </b-button-toolbar>
        </b-list-group-item>
      </b-list-group>
      <!-- <hr/>
    ДЗ:

    <b-table striped hover :items="items" :fields="fields"></b-table>
    <hr/>
    События:
    <hr/> -->
    </div>
    <div v-else>
      <div class="h1">У вас нет доступа к данной странице!</div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "DayEdit",
  components: {},
  data() {
    return {
      oneDayEdit: [],
      user: {},
      selectedLessonNumber: 1,
      options: {},
      oneDay: {},
      newData: {
        lessonName: "",
        lessonType: "",
        lessonLink: "",
        lessonTeacher: "",
      },
      newLesson: {
        lessonName: "",
        lessonType: "",
        lessonLink: "",
        lessonTeacher: "",
      },
      auth: true,
    };
  },
  props: {
    date: Date,
    group: String,
    spec: String,
  },
  methods: {
    addLesson() {
      console.log("123");
      let errors = [];
      let date = new Date(this.date);
      date.setUTCDate(date.getUTCDate() - 1);
      date.setUTCHours(0, 0);
      console.log(date);
      const data = {
        lessonName: this.newLesson.lessonName,
        lessonType: this.newLesson.lessonType,
        lessonLink: this.newLesson.lessonLink,
        lessonTeacher: this.newLesson.lessonTeacher,
        lessonNumber: this.selectedLessonNumber,
        lessonDate: date,
      };
      for (let key in data) {
        if (!data[key] && key != "lessonLink") {
          errors.push(key);
        }
      }

      if (errors.length > 0) {
        alert("Заполните поля: " + errors.join(", "));
      } else {
        axios
          .post(this.$nodeLink + "/addLesson", {
            token: localStorage["token"],
            data,
            group: this.group,
            date: date,
          })
          .then(
            (res) => {
              if (res.status == 200) {
                this.$router.replace({
                  name: "DayEdit",
                  params: {
                    date: this.date,
                    group: this.group,
                    spec: this.spec,
                  },
                });
                axios
                  .post(this.$nodeLink + "/get/oneDay", {
                    spec: this.spec,
                    group: this.group,
                    date: date,
                  })
                  .then(
                    (res) => {
                      if (res.status == 200) {
                        this.oneDay = res.data.day;
                      }
                    },
                    (err) => {
                      console.log("ERR", err.response.data.msg);
                      alert(err.response.data.msg);
                    }
                  );
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
      let date = new Date(this.date);
      date.setUTCDate(date.getUTCDate() - 1);
      date.setUTCHours(0, 0);
      console.log(123);

      const data = {
        lessonName: this.oneDayEdit[this.selectedLessonNumber].title,
        lessonType: this.oneDayEdit[this.selectedLessonNumber].type,
        lessonLink: this.oneDayEdit[this.selectedLessonNumber].link,
        lessonTeacher: this.oneDayEdit[this.selectedLessonNumber].teacher,
        lessonNumber: this.selectedLessonNumber,
        lessonDate: date,
      };
      console.log(data);
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
            group: this.group,
          })
          .then(
            (res) => {
              if (res.status == 200) {
                this.$router.replace({
                  name: "DayEdit",
                  params: {
                    date: this.date,
                    group: this.group,
                    spec: this.spec,
                  },
                });
                axios
                  .post(this.$nodeLink + "/get/oneDay", {
                    spec: this.spec,
                    group: this.group,
                    date: date,
                  })
                  .then(
                    (res) => {
                      if (res.status == 200) {
                        this.oneDay = res.data.day;
                      }
                    },
                    (err) => {
                      console.log("ERR", err.response.data.msg);
                      alert(err.response.data.msg);
                    }
                  );
              }
            },
            (err) => {
              alert(err.response.data.msg);
            }
          );
      }
    },
    resetModal() {
      this.newLesson = {};
    },
    sendLesson() {
      console.log("SENDLESSON");
      let errors = [];
      let date = new Date(this.date);
      date.setUTCDate(date.getUTCDate() - 1);
      date.setUTCHours(0, 0);
      const data = {
        lessonName: this.oneDayEdit[this.selectedLessonNumber].title,
        lessonType: this.oneDayEdit[this.selectedLessonNumber].Type,
        lessonLink: this.oneDayEdit[this.selectedLessonNumber].Link,
        lessonTeacher: this.oneDayEdit[this.selectedLessonNumber].Teacher,
        lessonNumber: this.selectedLessonNumber,
        lessonDate: date,
      };
      console.log(data);
      for (let key in data) {
        if (!data[key] && key != "lessonLink") {
          errors.push(key);
        }
      }

      if (errors.length > 0) {
        alert("Заполните поля: " + errors.join(", "));
      } else {
        console.log("OK");
      }
    },

    removeLesson(el) {
      console.log(el);
      let date = new Date(this.date);
      date.setUTCDate(date.getUTCDate() - 1);
      date.setUTCHours(0, 0);
      axios
        .post(this.$nodeLink + "/removeLesson", {
          token: localStorage["token"],
          group: this.group,
          lessonNumber: this.selectedLessonNumber,
          date: date,
          spec: this.user.spec,
        })
        .then(
          (res) => {
            console.log(res);
            if (res.status == 200) {
              console.log({
                query: { spec: this.spec, group: this.group, date: date },
              });
              this.$bvModal.hide("modal1", "modal2", "modal3", "modal4");
              this.$router.replace({
                name: "DayEdit",
                params: { spec: this.spec, group: this.group, date: this.date },
              });
              // vm.$forceUpdate();
              // this.$forceUpdate();
              let date = new Date(this.date);
              date.setUTCDate(date.getUTCDate() - 1);
              date.setUTCHours(0, 0);
              console.log(date);
              axios
                .post(this.$nodeLink + "/get/oneDay", {
                  spec: this.spec,
                  group: this.group,
                  date: date,
                })
                .then(
                  (res) => {
                    if (res.status == 200) {
                      console.log("OneDAY: ", res.data.day);
                      this.oneDay = res.data.day;
                    }
                  },
                  (err) => {
                    console.log("ERR", err.response.data.msg);
                    alert(err.response.data.msg);
                  }
                );
            }
          },
          (err) => {
            alert(err);
          }
        );
    },
  },
  computed: {
    //   selesctedLesson: function () {
    //   return this.oneDay[this.selectedLessonNumber]
    // }
  },
  beforeCreate() {
    axios.post(this.$nodeLink + "/lk", { token: localStorage["token"] }).then(
      (res) => {
        if (res.status == 200) {
          this.auth = true;
          this.user = res.data.decoded;
        }
      },
      (err) => {
        console.log(err.response.data.msg);
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

  beforeMount() {
    if (this.date == undefined || this.group == undefined) {
      this.$router.go(-1);
    }
    console.log("SIMPLE", this.date, this.group);
    let date = new Date(this.date);
    date.setUTCDate(date.getUTCDate() - 1);
    date.setUTCHours(0, 0);
    console.log(date);
    axios
      .post(this.$nodeLink + "/get/oneDay", {
        spec: this.spec,
        group: this.group,
        date: date,
      })
      .then(
        (res) => {
          if (res.status == 200) {
            this.oneDay = res.data.day;
            this.oneDayEdit = res.data.day;
          }
        },
        (err) => {
          if (err.response.status == 404) {
            let result = confirm(
              "Вероятно, на эту дату не было запланировано ни одной пары. Желаете создать разметку под пары?"
            );
            if (result) {
              axios
                .post(this.$nodeLink + "/addLessonGrid", {
                  token: localStorage["token"],
                  date: date,
                  group: this.group,
                })
                .then(
                  (res) => {
                    this.$router.go(-1);
                    console.log(res);
                  },
                  (err) => {
                    alert(
                      "При создании разметки проиошла ошибка:\n" +
                        err.response.data.msg
                    );
                  }
                );
            } else {
              this.$router.go(-1);
            }
          }
          console.log("111ERR", err.response.data.msg);
          // alert(err.response.status);
        }
      );
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.edit-link {
  color: blue;
  text-decoration: underline;
  cursor: pointer;
}
</style>
