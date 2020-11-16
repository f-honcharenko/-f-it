<template>
  <div class="p-3">
    <!-- modal2 -->
    <b-modal
      id="modal2"
      ref="my-modal"
      hide-footer
      title="Изменение расписания(календарь)"
    >
      <div class="d-block text-center">
        <h4>Выберете группу!</h4>
      </div>
      <b-button
        v-for="item in user.groups"
        :key="item"
        class="mt-3"
        variant="outline-info"
        block
        :to="{
          path: 'adminTimetable',
          query: { spec: user.spec, group: item },
        }"
        >{{ item }}</b-button
      >
    </b-modal>

    <!-- /modal2 -->

    <!-- modal1 -->
    <b-modal
      id="modal1"
      ref="my-modal"
      hide-footer
      title="Изменение расписания(Блоки)"
    >
      <div class="d-block text-center">
        <h4>Выберете группу!</h4>
      </div>
      <b-button
        v-for="item in user.groups"
        :key="item"
        class="mt-3"
        variant="outline-info"
        block
        @click="
          blocks.choosedGroup = item;
          $bvModal.hide('modal1');
          $bvModal.show('modal12');
        "
        >{{ item }}</b-button
      >
    </b-modal>

    <!-- /modal1 -->

    <!-- modal1.2 -->
    <b-modal
      id="modal12"
      ref="my-modal"
      hide-footer
      title="Изменение расписания(Блоки)"
    >
      <div class="d-block text-center">
        <h4>Выберете день недели!</h4>
      </div>
      <b-button
        v-for="day in weekDays"
        :key="day.dayName"
        class="mt-3"
        variant="outline-info"
        block
        @click="blocks.choosedWeekDay = day.dayID"
        :to="{
          path: 'blocks',
          query: {
            spec: user.spec,
            group: blocks.choosedGroup,
            weekDay: day.dayID,
          },
        }"
        >{{ day.dayName }}</b-button
      >
    </b-modal>

    <!-- /modal1.2 -->

    <!-- modal3 -->
    <b-modal
      id="modal3"
      ref="my-modal"
      hide-footer
      title="Гереация расписания(блоками)"
    >
      <div class="d-block text-center">
        <h4>Выберете группу!</h4>
      </div>
      <b-button
        v-for="item in user.groups"
        :key="item"
        class="mt-3"
        variant="outline-info"
        block
        @click="
          generator.group = item;
          $bvModal.hide('modal3');
          $bvModal.show('modal32');
        "
        >{{ item }}</b-button
      >
    </b-modal>

    <!-- /modal3 -->
    <!-- modal3.2 -->
    <b-modal
      id="modal32"
      ref="my-modal"
      hide-footer
      title="Изменение расписания(Блоки)"
    >
      <div class="d-block text-center">
        <h4>Выберете день недели!</h4>
      </div>
      <b-button
        class="mt-3"
        variant="outline-info"
        block
        @click="
          generator.weekday = 'ALL';
          generateRoz();
        "
        >Выбрать всю неделю</b-button
      >
      <hr />
      <b-button
        v-for="day in weekDays"
        :key="day.dayName"
        class="mt-3"
        variant="outline-info"
        block
        @click="
          generator.weekday = day.dayID;
          generateRoz();
        "
        >{{ day.dayName }}</b-button
      >
    </b-modal>

    <!-- /modal3.2 -->

    <div v-if="auth">
      <div class="h1">Панель управления</div>
      <hr />
      Тип учетной записи: <i>{{ user.type }}</i
      ><br />
      Имеетеся доступ к: <i>{{ user.groups.join(", ") }}</i> <br />
      <hr />
      <ul>
        <li @click="$bvModal.show('modal1')" class="activeLi">
          Добавить пары блоками
        </li>
        <li @click="$bvModal.show('modal3')" class="activeLi">
          Сгенерировать расписание(используя блоки)
        </li>
        <li @click="$bvModal.show('modal2')" class="activeLi">
          Изменение расписания(календарь)
        </li>
        <li>Дни рождения</li>
        <li>Логи</li>
      </ul>
    </div>
    <div v-else>
      <div class="h1">У вас нет доступа к данной странице!</div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "LK",
  components: {},
  data() {
    return {
      generator: {
        group: null,
        weekday: null,
      },
      weekDays: [
        { dayName: "Понедельник", dayID: "Mon" },
        { dayName: "Вторник", dayID: "Tue" },
        { dayName: "Среда", dayID: "Wed" },
        { dayName: "Четверг", dayID: "Thu" },
        { dayName: "Пятница", dayID: "Fri" },
        { dayName: "Суббота", dayID: "Sat" },
        { dayName: "Воскресенье", dayID: "Sun" },
      ],
      blocks: {
        choosedGroup: "",
        choosedWeekDay: "",
      },
      auth: true,
      user: {},
    };
  },
  props: {},
  computed: {},
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
        alert(err.response.data.msg);
        console.log(err);
      }
    );
  },
  methods: {
    generateRoz() {
      axios
        .post(this.$nodeLink + "/generateByBlocks", {
          token: localStorage["token"],
          group: this.generator.group,
          weekday: this.generator.weekday,
        })
        .then(
          (res) => {
            if (res.status == 200) {
              alert("OK");
            }
          },
          (err) => {
            alert(err.response.data.msg);
          }
        );
    },
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
</style>
