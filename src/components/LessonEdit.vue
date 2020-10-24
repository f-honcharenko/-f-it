<template>
  <div class="p-3">
    <div v-if="auth">
      <!-- START modal1 -->
      <b-modal id="modal1" ref="my-modal" hide-footer title="Удаление пары">
        <div class="d-block text-center">
          <h4>Вы уверены что хотите удалить пару {{ title }}?</h4>
        </div>
        <b-button
          class="mt-3"
          variant="outline-danger"
          block
          @click="removeLesson"
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
      <b-modal id="modal2" ref="my-modal" hide-footer title="Предмет">
        <div class="d-block text-center">
          <h4>
            Изменить название <b>{{ title }}</b> на :
          </h4>

          <select name="select" v-model="newData.lessonName">
            <option :value="keyN" v-for="keyN in options.lessons" :key="keyN">
              {{ keyN }}
            </option></select
          ><select name="select" v-model="newData.lessonType">
            <option :value="keyN" v-for="keyN in options.types" :key="keyN">
              {{ keyN }}
            </option></select
          ><br />
        </div>
        <b-button class="mt-3" variant="outline-warning" block @click="editName"
          >Подтвердить</b-button
        >
        <b-button
          class="mt-3"
          variant="outline-info"
          block
          @click="$bvModal.hide('modal2')"
          >Отмена</b-button
        >
      </b-modal>

      <!-- END modal2 -->
      <!-- START modal3 -->
      <b-modal id="modal3" ref="my-modal" hide-footer title="Преподователь">
        <div class="d-block text-center">
          <h4>
            Сменить преподователя <b>"{{ teacher }}"</b> на:
          </h4>
          <select name="select" v-model="newData.lessonTeacher">
            <option :value="keyN" v-for="keyN in options.teachers" :key="keyN">
              {{ keyN }}
            </option></select
          ><br />
        </div>
        <b-button
          class="mt-3"
          variant="outline-warning"
          block
          @click="editTeacher"
          >Подтвердить</b-button
        >
        <b-button
          class="mt-3"
          variant="outline-info"
          block
          @click="$bvModal.hide('modal3')"
          >Отмена</b-button
        >
      </b-modal>

      <!-- END modal3 -->
      <!-- START modal4 -->
      <b-modal id="modal4" ref="my-modal" hide-footer title="Изменение ссылки">
        <div class="d-block text-center">
          <h4>Введите новую ссылку:</h4>
          <input
            type="text"
            placeholder="link"
            v-model="newData.lessonLink"
          /><br />
        </div>
        <b-button class="mt-3" variant="outline-warning" block @click="editLink"
          >Подтвердить</b-button
        >
        <b-button
          class="mt-3"
          variant="outline-info"
          block
          @click="$bvModal.hide('modal3')"
          >Отмена</b-button
        >
      </b-modal>

      <!-- END modal4 -->
      [Редактирование пары]
      <hr />
      <div class="h1">
        {{ title }}
        <div class="edit-link" @click="$bvModal.show('modal2')">(изменить)</div>
      </div>
      <small>Преподаватель: {{ teacher }}</small>
      <div class="edit-link" @click="$bvModal.show('modal3')">(изменить)</div>
      <br />
      <div v-if="url">
        <a v-bind:href="url" class="font-weight-bold h4" target="_blank "
          >Ссылка</a
        >
        <div class="edit-link" @click="$bvModal.show('modal4')">(изменить)</div>
      </div>

      <div v-else>
        <a class="font-weight-bold h4 text-danger">Ссылка отсутсвует</a>
        <div class="edit-link" @click="$bvModal.show('modal4')">(добавить)</div>
      </div>
      <!-- <hr/>
    ДЗ:

    <b-table striped hover :items="items" :fields="fields"></b-table>
    <hr/>
    События:
    <hr/> -->
      <hr />
      <div
        class="font-weight-bold h4 text-danger"
        @click="$bvModal.show('modal1')"
      >
        Удалить пару
      </div>
    </div>
    <div v-else>
      <div class="h1">У вас нет доступа к данной странице!</div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "lessonEdit",
  components: {},
  data() {
    return {
      options: {},
      newData: {
        lessonName: "",
        lessonType: "",
        lessonLink: "",
        lessonTeacher: "",
      },
      auth: "",
      // fields: ['Дата', 'Задание', 'Файлы'],
      //  items: [
      //       { age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
      //       { age: 21, first_name: 'Larsen', last_name: 'Shaw' },
      //       { age: 89, first_name: 'Geneva', last_name: 'Wilson' },
      //       { age: 38, first_name: 'Jami', last_name: 'Carney' }
      //     ]
    };
  },
  props: {
    title: String,
    url: String,
    timeStart: String,
    timeEnd: String,
    date: String,
    teacher: String,
    lessonNumber: Number,
    group: String,
    fullDate: String,
    spec: String,
  },
  methods: {
    editLink() {
      console.log(this.newData);
      axios
        .post(this.$nodeLink + "/editLesson", {
          token: localStorage["token"],
          newData: { lessonLink: this.newData.lessonLink },
          editType: "link",
          group: this.group,
          lessonNumber: this.lessonNumber,
          date: this.fullDate,
          spec: this.user.spec,
        })
        .then(
          (res) => {
            console.log(res);
            if (res.status == 200) {
              this.$router.push({
                path: "adminTimetable",
                query: { spec: this.spec, group: this.group },
              });
            }
          },
          (err) => {
            alert(err);
          }
        );
    },
    editName() {
      console.log(this.newData);
      axios
        .post(this.$nodeLink + "/editLesson", {
          token: localStorage["token"],
          newData: {
            lessonName: this.newData.lessonName,
            lessonType: this.newData.lessonType,
          },
          editType: "title",
          group: this.group,
          lessonNumber: this.lessonNumber,
          date: this.fullDate,
          spec: this.user.spec,
        })
        .then(
          (res) => {
            console.log(res);
            if (res.status == 200) {
              this.$router.push({
                path: "adminTimetable",
                query: { spec: this.spec, group: this.group },
              });
            }
          },
          (err) => {
            alert(err);
          }
        );
    },
    editTeacher() {
      console.log(this.newData);
      axios
        .post(this.$nodeLink + "/editLesson", {
          token: localStorage["token"],
          newData: { lessonTeacher: this.newData.lessonTeacher },
          editType: "teacher",
          group: this.group,
          lessonNumber: this.lessonNumber,
          date: this.fullDate,
          spec: this.user.spec,
        })
        .then(
          (res) => {
            console.log(res);
            if (res.status == 200) {
              this.$router.push({
                path: "adminTimetable",
                query: { spec: this.spec, group: this.group },
              });
            }
          },
          (err) => {
            alert(err);
          }
        );
    },
    removeLesson() {
      axios
        .post(this.$nodeLink + "/removeLesson", {
          token: localStorage["token"],
          group: this.group,
          lessonNumber: this.lessonNumber,
          date: this.fullDate,
          spec: this.spec,
        })
        .then(
          (res) => {
            console.log(res);
            if (res.status == 200) {
              this.$router.push({
                path: "adminTimetable",
                query: { spec: this.spec, group: this.group },
              });
            }
          },
          (err) => {
            alert(err);
          }
        );
    },
  },
  computed: {
    // DATE: function () {
    //   return this.date.reverse();
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
          }
        },
        (err) => {
          alert(err);
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
