<template >
  <div class="p-3">
    <div v-if="auth">
      <!-- modal -->
      <b-modal id="modalCreate" ref="my-modal" title="Создание нового блока.">
        <form ref="form" @submit.stop.prevent="handleSubmit">
          <b-form-group label="Предмет">
            <b-form-select
              v-model="newBlockLesson.lessonName"
              :options="options.lessons"
              required
            ></b-form-select>
            <b-form-select
              v-model="newBlockLesson.lessonType"
              :options="options.types"
              required
            ></b-form-select>
          </b-form-group>

          <b-form-group label="Преподаватель">
            <b-form-select
              v-model="newBlockLesson.lessonTeacher"
              :options="options.teachers"
              required
            ></b-form-select>
          </b-form-group>

          <b-form-group label="Ссылка">
            <b-form-input
              v-model="newBlockLesson.lessonLink"
              required
              type="url"
            ></b-form-input>
          </b-form-group>

          <b-form-group label="dates">
            <b-form-input v-model="inputParseDate" required></b-form-input>
          </b-form-group>
          <b-button @click="parser">parse</b-button>
          {{ arrayParseDatesForm.join(" | ") }}
        </form>
      </b-modal>
      <!-- modal -->
      <center>
        <div class="h2">{{ group }}</div>
        <br />
        <div class="h2">{{ weekDay }}</div>
        <hr />
      </center>
      <div
        style="
          display: flex;
          flex-direction: column;
          height: 700px;
          border: 1px solid black;
        "
      >
        <div class="row">
          <div
            @click="$bvModal.show('modalCreate')"
            class="block-in-row border-secondary"
            style="height: 100%"
          >
            <center style="height: 100%">
              <b-icon
                icon="plus-square"
                scale="3"
                style="height: 100%"
              ></b-icon>
            </center>
          </div>
          <div class="block-in-row border-secondary">
            <center>
              <div h3>NAME</div>
              <hr class="border-secondary" />
              <div h5>TEACHER</div>
            </center>
          </div>
        </div>
        <div class="row">
          <div class="block-in-row border-secondary" style="height: 100%">
            <center style="height: 100%">
              <b-icon
                icon="plus-square"
                scale="3"
                style="height: 100%"
              ></b-icon>
            </center>
          </div>
          <div class="block-in-row"></div>
          <div class="block-in-row"></div>
          <div class="block-in-row"></div>
        </div>
        <div class="row">
          <div class="block-in-row border-secondary" style="height: 100%">
            <center style="height: 100%">
              <b-icon
                icon="plus-square"
                scale="3"
                style="height: 100%"
              ></b-icon>
            </center>
          </div>
          <div class="block-in-row"></div>
        </div>
        <div class="row">
          <div class="block-in-row border-secondary" style="height: 100%">
            <center style="height: 100%">
              <b-icon
                icon="plus-square"
                scale="3"
                style="height: 100%"
              ></b-icon>
            </center>
          </div>
          <div class="block-in-row"></div>
        </div>
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
  name: "blocks",
  components: {},
  data() {
    return {
      arrayParseDatesForm: [],
      inputParseDate: "",
      newBlockLesson: {
        lessonName: "",
        lessonType: "",
        lessonLink: "",
        lessonTeacher: "",
        lessonDates: "",
      },
      options: "",
      group: "GROUP",
      weekDay: "WEEKDAY",
      auth: "",
      user: {},
    };
  },
  methods: {
    parser() {
      console.log("123");
      let inputParseDate = this.inputParseDate;
      if (inputParseDate) {
        let tempDateString = "";
        if (inputParseDate.indexOf("[") > -1) {
          console.log("[]");
          let start = +inputParseDate.indexOf("[") + 1;
          let end = +inputParseDate.indexOf("]") + 0;
          tempDateString = inputParseDate.slice(start, end);
        } else {
          tempDateString = inputParseDate.replace(/[^.,[]-\d]/g, "");
        }
        this.inputParseDate = tempDateString;
        this.arrayParseDatesForm.push(tempDateString);
        let res = [];
        console.log(tempDateString);
        if (tempDateString.indexOf(",") > -1) {
          //Запятые есть
          let tempGlobalDateArray = tempDateString.split(",");
          console.log(tempGlobalDateArray);
          // let tempGlobalDateArrayOfStrings = [];
          tempGlobalDateArray.forEach((element) => {
            if (element) {
              if (element.indexOf("-") > -1) {
                let intervalStartDay = element.split("-")[0].split(".")[0];
                let intervalStartMonth = element.split("-")[0].split(".")[1];
                let intervalEndDay = element.split("-")[1].split(".")[0];
                let intervalEndMonth = element.split("-")[1].split(".")[1];
                let lessons =
                  (new Date(2020, intervalEndMonth - 1, intervalEndDay) -
                    new Date(2020, intervalStartMonth - 1, intervalStartDay)) /
                  86400000;
                for (let i = 0; i <= lessons; i++) {
                  if (i % 7 == 0) {
                    // console.log(new Date(2020, intervalStartMonth-1, +intervalStartDay+i));
                    res.push(
                      new Date(
                        2020,
                        intervalStartMonth - 1,
                        +intervalStartDay + i
                      )
                    );
                  }
                }
              } else {
                element.split(".")[1];
                res.push(
                  new Date(
                    2020,
                    element.split(".")[1] - 1,
                    +element.split(".")[0]
                  )
                );
              }
            } else {
              res.push(
                new Date(
                  2020,
                  parseInt(element.split(".")[1]) - 1,
                  +element.split(".")[0]
                )
              );
            }
          });
        } else {
          let element = tempDateString;
          if (element) {
            if (element.indexOf("-") > -1) {
              let intervalStartDay = element.split("-")[0].split(".")[0];
              let intervalStartMonth = element.split("-")[0].split(".")[1];
              let intervalEndDay = element.split("-")[1].split(".")[0];
              let intervalEndMonth = element.split("-")[1].split(".")[1];
              let lessons =
                (new Date(2020, intervalEndMonth - 1, intervalEndDay) -
                  new Date(2020, intervalStartMonth - 1, intervalStartDay)) /
                86400000;
              for (let i = 0; i <= lessons; i++) {
                if (i % 7 == 0) {
                  // console.log(new Date(2020, intervalStartMonth-1, +intervalStartDay+i));
                  res.push(
                    new Date(
                      2020,
                      intervalStartMonth - 1,
                      +intervalStartDay + i
                    )
                  );
                }
              }
            } else {
              element.split(".")[1];
              res.push(
                new Date(
                  2020,
                  element.split(".")[1] - 1,
                  +element.split(".")[0]
                )
              );
            }
          } else {
            res.push(
              new Date(
                2020,
                parseInt(element.split(".")[1]) - 1,
                +element.split(".")[0]
              )
            );
          }
        }
        console.log("RES2", res);
        this.newBlockLesson.lessonDates = res;
      }
    },
  },

  beforeCreate() {
    axios.post(this.$nodeLink + "/lk", { token: localStorage["token"] }).then(
      (res) => {
        console.log(res);
        if (res.status == 200) {
          this.auth = true;
          this.user = res.data.decoded;
          console.log(res.data.decoded);
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
.activeLi {
  text-decoration: underline;
  color: blue;
  cursor: pointer;
}
#table-wrapper {
  display: grid;
  grid-template-rows: 1fr 1fr 1fr 1fr;
}
.row {
  flex: 1;
  padding: 20px;
}
.block-in-row {
  border-radius: 5pt;
  margin: 0px 10px 0px 10px;
  width: calc(800px / 4 - 30px);
  height: 100%;
  border: 1px solid;
  cursor: pointer;
  /* background-color: red; */
}
</style>
