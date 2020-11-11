<template >
  <div class="p-3">
    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="Random count"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          :state="nameState"
          label="Count:"
          label-for="name-input"
          invalid-feedback="Name is required"
        >
          <b-form-input
            id="name-input"
            v-model="randomCount"
            :state="nameState"
            required
          ></b-form-input>
        </b-form-group>
      </form>
    </b-modal>

    <b-modal
      id="modal-prevent-closing2"
      ref="moda2l"
      title="Random count"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk2"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          :state="nameState"
          label="Count:"
          label-for="name-input"
          invalid-feedback="Name is required"
        >
          <b-form-input
            id="name-input"
            v-model="randomCount2"
            :state="nameState"
            required
          ></b-form-input>
        </b-form-group>
      </form>
    </b-modal>

    <div id="block-sort-0-999">
      <center><h1>Сортировка блоками(разрядами)</h1></center>
      <b-form-group label="Массив знаечний [0;+999], через запятную">
        <b-form-input v-model="inputString" required></b-form-input>
        <b-button class="mt-2" @click="sort">SORT</b-button>
        <b-button class="mt-2 ml-2" v-b-modal.modal-prevent-closing
          >random</b-button
        ><br />
        Array: {{ inputArray }}
      </b-form-group>
      <table v-show="showTable" style="border: 1px double black; margin: 10px">
        <tr>
          <td colspan="2">
            <center><b>Сотни</b></center>
          </td>
        </tr>
        <tr style="border: 1px double black">
          <td style="border: 1px double black">Контейнер</td>
          <td style="border: 1px double black">Массив значений</td>
        </tr>

        <tr
          style="border: 1px double black"
          v-for="key in bukets"
          :key="key.number + 'KEY'"
        >
          <td style="border: 1px double black">{{ key.number }}</td>
          <td style="border: 1px double black">{{ key.array.join(", ") }}</td>
        </tr>
      </table>
      <div style="display: flex; flex-wrap: wrap; margin: 10px">
        <table
          class="mr-1 mt-1"
          style="border: 1px double black"
          v-for="key in buketsTen"
          :key="key.number + 'KEY'"
        >
          <tr>
            <td colspan="2">
              <center>
                <b>{{ key.number }}</b>
              </center>
            </td>
          </tr>
          <tr style="border: 1px double black">
            <td style="border: 1px double black">Контейнер</td>
            <td style="border: 1px double black">Массив значений</td>
          </tr>

          <tr
            style="border: 1px double black"
            v-for="key2 in key"
            :key="key2.number + 'KEY'"
          >
            <td style="border: 1px double black">{{ key2.number }}</td>
            <td style="border: 1px double black">
              {{ [key2.array].join() }}
            </td>
          </tr>
        </table>
      </div>
    </div>
    {{ sortedArray.join() }}
    <div id="block-sort-auto">
      <center><h1>Сортировка блоками(Авто)</h1></center>
      <b-form-group label="Массив знаечний [-∞;+∞], через запятную">
        <b-form-input v-model="inputString2" required></b-form-input>
        <b-form-input
          v-model="inputString21"
          required
          placeholder="Количество контейнеров"
        ></b-form-input>
        <b-button class="mt-2" @click="sort2">SORT</b-button>
        <b-button
          class="mt-2 ml-2"
          @click="$bvModal.show('modal-prevent-closing2')"
          >random</b-button
        ><br /><br />
        Array: {{ inputArray2 }}
      </b-form-group>
    </div>
    <table v-show="showTable2" style="border: 1px double black; margin: 10px">
      <tr style="border: 1px double black">
        <td style="border: 1px double black">Контейнер</td>
        <td style="border: 1px double black">Массив значений</td>
      </tr>

      <tr
        style="border: 1px double black"
        v-for="key in inputObject2"
        :key="key.number + 'KEY'"
      >
        <td style="border: 1px double black">{{ key.number }}</td>
        <td style="border: 1px double black">
          {{
            key.array
              .sort((a, b) => {
                return a - b;
              })
              .join(", ")
          }}
        </td>
      </tr>
    </table>
    {{ sortedArray2 }}
  </div>
</template>

<script>
export default {
  name: "test1",
  components: {},
  data() {
    return {
      showTable: false,
      showTable2: false,
      randomCount: "",
      inputString: "",
      bukets: {},
      buketsTen: {},
      buketsTenSorted: {},
      blockCount: "",
      inputString2: "",
      inputString21: "",
      inputObject2: {},
      inputArray: [],
      inputArray2: [],
      sortedArray: [],
      sortedArray2: [],
    };
  },
  props: {},
  methods: {
    sort2() {
      let array = this.inputString2.split(", ");
      let normalArray = [];
      let errors = 0;
      // console.log(array);
      array.forEach((el) => {
        // console.log(el);
        if (!isNaN(Number(el)) && el != "" && el != " ") {
          normalArray.push(Number(el));
        } else {
          errors++;
        }
      });
      // console.log(errors);
      // console.log(normalArray);
      if (errors > 0) {
        alert(
          "Некоторые елементы(" +
            errors +
            ") не являются цифровыми значениями, или не удовлетворяющие заданные параметры, и были удалены."
        );
        this.inputArray2 = normalArray;
      } else {
        this.inputArray2 = normalArray;
      }
      if (this.inputArray2.length <= this.blockCount) {
        alert(
          "Количество блоков не может быть больше/равно уоличеству елементов"
        );
      } else {
        // for (let i = 0; i <= this.inputArray2.length; i++) {
        //   this.inputArray2[i] = Number(this.inputArray2[i]);
        // }
        let max = Math.max.apply(null, this.inputArray2);
        let min = Math.min.apply(null, this.inputArray2);
        let widthNumbers = max - min;
        let devider;
        if (min == 0) {
          devider = widthNumbers / this.inputString21 + 1;
        } else {
          devider = widthNumbers / this.inputString21;
        }
        this.inputArray2.forEach((el) => {
          let buket = Math.trunc(el / devider);
          console.log(el, "->", buket);
          if (this.inputObject2[buket]) {
            this.inputObject2[buket].array.push(el);
          } else {
            this.inputObject2[buket] = {};
            this.inputObject2[buket].number = buket;
            this.inputObject2[buket].array = [];
            this.inputObject2[buket].array.push(el);
          }
        });
        // for (let key in this.inputObject2) {
        //   console.log(key);
        // }
        let maxObj = Math.max.apply(null, Object.keys(this.inputObject2));
        let minObj = Math.min.apply(null, Object.keys(this.inputObject2));
        console.log("min: ", minObj);
        console.log("max: ", maxObj);
        while (minObj <= maxObj) {
          console.log("while: ", minObj);
          this.sortedArray2.push(this.inputObject2[minObj].array);

          minObj++;
        }

        this.showTable2 = true;
      }
    },
    resetModal() {
      this.name = "";
      this.nameState = null;
    },
    handleOk() {
      let min = Math.ceil(0);
      let max = Math.floor(1000);
      for (let i = 0; i <= Number(this.randomCount); i++) {
        console.log("ok");
        let rand = Math.floor(Math.random() * (max - min)) + min;
        this.inputString += rand + ", ";
      }
    },
    handleOk2() {
      let min = Math.ceil(-1000);
      let max = Math.floor(1000);
      for (let i = 0; i <= Number(this.randomCount2); i++) {
        console.log("ok");
        let rand = Math.floor(Math.random() * (max - min)) + min;
        this.inputString2 += rand + ", ";
      }
    },
    sort() {
      this.showTable = true;
      this.bukets = {};
      this.buketsTen = {};
      let array = this.inputString.split(",");
      let normalArray = [];
      let errors = 0;
      // console.log(array);
      array.forEach((el) => {
        // console.log(el);
        if (!isNaN(Number(el)) && el != "" && el != " ") {
          if (el >= 0 && el <= 999) {
            normalArray.push(el);
          } else {
            errors++;
          }
        } else {
          errors++;
        }
      });

      // console.log(errors);
      // console.log(normalArray);
      if (errors > 0) {
        alert(
          "Некоторые елементы(" +
            errors +
            ") не являются цифровыми значениями, или не удовлетворяют заданным параметрам, были удалены."
        );
        this.inputArray = normalArray;
      } else {
        this.inputArray = normalArray;
      }

      let buket;
      this.inputArray.forEach((el) => {
        buket = Math.trunc(el / 100);
        if (this.bukets[buket]) {
          this.bukets[buket].array.push(el);
        } else {
          this.bukets[buket] = {};
          this.bukets[buket].number = buket;
          this.bukets[buket].array = [];
          this.bukets[buket].array.push(el);
        }
        // console.log(buket);
      });
      buket = 0;
      for (let key in this.bukets) {
        if (this.bukets[key].array.length >= 2) {
          this.buketsTen[this.bukets[key].number] = {};
          this.buketsTen[this.bukets[key].number].number = this.bukets[
            key
          ].number;
          this.bukets[key].array.forEach((element) => {
            buket = Math.trunc((element - key * 100) / 10);
            if (this.buketsTen[this.bukets[key].number][buket]) {
              this.buketsTen[this.bukets[key].number][buket].array.push(
                element
              );
            } else {
              this.buketsTen[this.bukets[key].number][buket] = {};
              this.buketsTen[this.bukets[key].number][buket].array = [];
              this.buketsTen[this.bukets[key].number][buket].number = buket;
              this.buketsTen[this.bukets[key].number][buket].array.push(
                element
              );
            }
          });
        }
      }
    },
  },
  computed: {
    //   selesctedLesson: function () {
    //   return this.oneDay[this.selectedLessonNumber]
    // }
  },
  beforeCreate() {},
  beforeMount() {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
