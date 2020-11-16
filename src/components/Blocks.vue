<template >
  <div class="p-3">
    <div v-if="auth">
      <!-- modal1 -->
      <b-modal
        id="modalCreate"
        ref="my-modal"
        title="Создание нового блока."
        @ok="addBlock()"
      >
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

          <b-form-group label="Даты">
            <b-form-input v-model="inputParseDate" required></b-form-input>
          </b-form-group>
          <b-button @click="parser">parse</b-button>
          <div v-for="date in newBlockLesson.lessonDates" :key="date">
            <!-- {{ date.toDateString() }} -->
            {{ date.toDateString().toString().substr(4, 11) }}
          </div>
        </form>
      </b-modal>
      <!-- /modal1 -->
      <!-- modal2 -->
      <b-modal
        id="modalShowInfo"
        ref="my-modal"
        title="Просмотр/Изменение  блока."
        @ok="editBlock()"
      >
        <form ref="form" @submit.stop.prevent="handleSubmit">
          <b-form-group label="Предмет">
            <b-form-select
              v-model="selectedBlock.lessonName"
              :options="options.lessons"
              required
            ></b-form-select>
            <b-form-select
              v-model="selectedBlock.lessonType"
              :options="options.types"
              required
            ></b-form-select>
          </b-form-group>

          <b-form-group label="Преподаватель">
            <b-form-select
              v-model="selectedBlock.lessonTeacher"
              :options="options.teachers"
              required
            ></b-form-select>
          </b-form-group>

          <b-form-group label="Ссылка">
            <b-form-input
              v-model="selectedBlock.lessonLink"
              required
              type="url"
            ></b-form-input>
          </b-form-group>

          <b-form-group label="Даты:">
            <div v-for="date in selectedBlock.lessonDates" :key="date">
              {{ date.substr(0, 10) }}
            </div>
            <hr />
            <b-button variant="danger" @click="removeEvent"
              >Удалить блок</b-button
            >
          </b-form-group>
        </form>
      </b-modal>
      <!-- /modal2 -->
      <center>
        <div class="h2">{{ this.$route.query.group }}</div>
        <br />
        <div class="h2">{{ this.$route.query.weekDay }}</div>
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
            @click="
              $bvModal.show('modalCreate');
              newBlockLesson.lessonNumber = 1;
            "
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
          <div
            class="block-in-row"
            v-for="(block, index) in blocksData['1']"
            :key="block.lessonName"
          >
            <center
              @click="
                selectedBlock = block;
                selectedNumber = 1;
                selectedArrayEl = index;
                $bvModal.show('modalShowInfo');
              "
            >
              <div h3>{{ block.lessonName }} ({{ block.lessonType }})</div>
              <div h5>{{ block.lessonTeacher }}</div>
              <hr class="border-secondary" />
              <div h5 v-if="block.lessonDates.length > 1">
                {{ block.lessonDates[0].substr(5, 5).replace("-", ".") }} -
                {{
                  block.lessonDates[block.lessonDates.length - 1]
                    .substr(5, 5)
                    .replace("-", ".")
                }}
              </div>
              <div h5 v-else>
                {{ block.lessonDates[0].substr(5, 5).replace("-", ".") }}
              </div>
            </center>
          </div>
        </div>
        <div class="row">
          <div
            @click="
              $bvModal.show('modalCreate');
              newBlockLesson.lessonNumber = 2;
            "
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
          <div
            class="block-in-row"
            v-for="(block, index) in blocksData['2']"
            :key="block.lessonName"
          >
            <center
              @click="
                selectedBlock = block;
                selectedNumber = 2;
                selectedArrayEl = index;
                $bvModal.show('modalShowInfo');
              "
            >
              <div h3>{{ block.lessonName }} ({{ block.lessonType }})</div>
              <div h5>{{ block.lessonTeacher }}</div>
              <hr class="border-secondary" />
              <div h5 v-if="block.lessonDates.length > 1">
                {{ block.lessonDates[0].substr(5, 5).replace("-", ".") }} -
                {{
                  block.lessonDates[block.lessonDates.length - 1]
                    .substr(5, 5)
                    .replace("-", ".")
                }}
              </div>
              <div h5 v-else>
                {{ block.lessonDates[0].substr(5, 5).replace("-", ".") }}
              </div>
            </center>
          </div>
        </div>
        <div class="row">
          <div
            class="block-in-row border-secondary"
            style="height: 100%"
            @click="
              $bvModal.show('modalCreate');
              newBlockLesson.lessonNumber = 3;
            "
          >
            <center style="height: 100%">
              <b-icon
                icon="plus-square"
                scale="3"
                style="height: 100%"
              ></b-icon>
            </center>
          </div>
          <div
            class="block-in-row"
            v-for="(block, index) in blocksData['3']"
            :key="block.lessonName"
          >
            <center
              @click="
                selectedBlock = block;
                selectedNumber = 3;
                selectedArrayEl = index;
                $bvModal.show('modalShowInfo');
              "
            >
              <div h3>{{ block.lessonName }} ({{ block.lessonType }})</div>
              <div h5>{{ block.lessonTeacher }}</div>
              <hr class="border-secondary" />
              <div h5 v-if="block.lessonDates.length > 1">
                {{ block.lessonDates[0].substr(5, 5).replace("-", ".") }} -
                {{
                  block.lessonDates[block.lessonDates.length - 1]
                    .substr(5, 5)
                    .replace("-", ".")
                }}
              </div>
              <div h5 v-else>
                {{ block.lessonDates[0].substr(5, 5).replace("-", ".") }}
              </div>
            </center>
          </div>
        </div>
        <div class="row">
          <div
            class="block-in-row border-secondary"
            style="height: 100%"
            @click="
              $bvModal.show('modalCreate');
              newBlockLesson.lessonNumber = 4;
            "
          >
            <center style="height: 100%">
              <b-icon
                icon="plus-square"
                scale="3"
                style="height: 100%"
              ></b-icon>
            </center>
          </div>
          <div
            class="block-in-row"
            v-for="(block, index) in blocksData['4']"
            :key="block.lessonName"
          >
            <center
              @click="
                selectedBlock = block;
                selectedNumber = 4;
                selectedArrayEl = index;
                $bvModal.show('modalShowInfo');
              "
            >
              <div h3>{{ block.lessonName }} ({{ block.lessonType }})</div>
              <div h5>{{ block.lessonTeacher }}</div>
              <hr class="border-secondary" />
              <div h5 v-if="block.lessonDates.length > 1">
                {{ block.lessonDates[0].substr(5, 5).replace("-", ".") }} -
                {{
                  block.lessonDates[block.lessonDates.length - 1]
                    .substr(5, 5)
                    .replace("-", ".")
                }}
              </div>
              <div h5 v-else>
                {{ block.lessonDates[0].substr(5, 5).replace("-", ".") }}
              </div>
            </center>
          </div>
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
      selectedNumber: null,
      selectedArrayEl: null,
      selectedBlock: {},
      blocksData: {},
      arrayParseDatesForm: [],
      inputParseDate: "",
      newBlockLesson: {
        lessonNumber: "",
        lessonName: "",
        lessonType: "",
        lessonLink: "",
        lessonTeacher: "",
        lessonDates: [],
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
        res.forEach((el) => {
          el.setUTCDate(el.getUTCDate() + 1);
          el.setUTCHours(0, 0);
        });
        this.newBlockLesson.lessonDates = res;
      }
    },
    removeEvent() {
      console.log("editBlock");

      axios
        .post(this.$nodeLink + "/removeBlock", {
          token: localStorage["token"],
          group: this.$route.query.group,
          weekDay: this.$route.query.weekDay,
          selectedArrayEl: this.selectedArrayEl,
          selectedNumber: this.selectedNumber,
        })
        .then(
          (res) => {
            if (res.status == 200) {
              alert("Success");
              location.reload();
            }
          },
          (err) => {
            alert(err.response.data.msg);
          }
        );
    },

    addBlock() {
      console.log("addBlock");
      let errors = [];
      for (let key in this.newBlockLesson) {
        if (!this.newBlockLesson[key] && key != "lessonLink") {
          errors.push(key);
        }
      }
      if (this.newBlockLesson.lessonDates.length == 0) {
        errors.push("lessonDates");
      }
      console.log(errors);
      if (errors.length > 0) {
        alert("Заполните поля: " + errors.join(", "));
      } else {
        axios
          .post(this.$nodeLink + "/addBlock", {
            token: localStorage["token"],
            group: this.$route.query.group,
            weekDay: this.$route.query.weekDay,
            data: this.newBlockLesson,
          })
          .then(
            (res) => {
              if (res.status == 200) {
                alert("Success");
                location.reload();
              }
            },
            (err) => {
              alert(err.response.data.msg);
            }
          );
      }
    },
    editBlock() {
      console.log("editBlock");
      let errors = [];
      for (let key in this.selectedBlock) {
        if (!this.selectedBlock[key] && key != "lessonLink") {
          errors.push(key);
        }
      }

      console.log(errors);
      if (errors.length > 0) {
        alert("Заполните поля: " + errors.join(", "));
      } else {
        axios
          .post(this.$nodeLink + "/editBlock", {
            token: localStorage["token"],
            group: this.$route.query.group,
            weekDay: this.$route.query.weekDay,
            data: this.selectedBlock,
            selectedArrayEl: this.selectedArrayEl,
            selectedNumber: this.selectedNumber,
          })
          .then(
            (res) => {
              if (res.status == 200) {
                alert("Success");
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

  beforeCreate() {
    axios.post(this.$nodeLink + "/lk", { token: localStorage["token"] }).then(
      (res) => {
        if (res.status == 200) {
          this.auth = true;
          this.user = res.data.decoded;
        }
      },
      (err) => {
        alert(err.response.data.msg);
      }
    );
    axios
      .post(this.$nodeLink + "/get/options", { token: localStorage["token"] })
      .then(
        (res) => {
          if (res.status == 200) {
            this.options = res.data.file;
            this.options.teachers = res.data.file.teachers.sort();
            this.options.lessons = res.data.file.lessons.sort();
            console.log(res.data.file);
          }
        },
        (err) => {
          alert(err.response.data.msg);
        }
      );

    axios
      .post(this.$nodeLink + "/getBlocks", {
        token: localStorage["token"],
        group: this.$route.query.group,
        weekday: this.$route.query.weekDay,
      })
      .then(
        (res) => {
          if (res.status == 200) {
            this.blocksData = res.data.data;
          }
        },
        (err) => {
          console.log(err.response.data.msg);
          alert(err.response.data.msg);
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
