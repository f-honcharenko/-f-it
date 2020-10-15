<template>
  <div class="hello">
    <h1><center>AdminPanel</center></h1>
    <hr/>
    <h2>TIME</h2>

    Date:
    <i>dd.mm</i><br />
    <input type="text" size="40" v-model="txt" />
    <button @click="parser(txt)">PARSE</button>
    <div v-if="tags.length > 0">
      {{ tags }}
    </div><br/><br/>
    Time:<br/>
    <select name="select" size="4"  v-model="data.lessonTime">
      <option value="1" >9.00-10.20</option>
      <option value="2" >10.30-11.50</option>
      <option value="3" >12.10-13.30</option>
      <option value="4" >13.40-15.00</option>
    </select>
    <hr/>
    <h2>GROUP</h2>
    <select name="select" size="5" multiple='multiple' v-model="data.lessonGroup">
      <option :value="keyN.name" v-for="keyN in options.groups" :key="keyN.id">{{keyN.name}}</option>
    </select>
    <hr/>
    <h2>LESSON</h2>
    Name:<br/>
    <select name="select" :size="options.lessons.length"  v-model="data.lessonName">
      <option :value="keyN" v-for="keyN in options.lessons" :key="keyN">{{keyN}}</option>
    </select><br/>
    Teacher:<br/><br/>
    <select name="select" size="7"  v-model="data.lessonTeacher">
      <option :value="keyN" v-for="keyN in options.teachers" :key="keyN">{{keyN}}</option>
    </select><br/>
    Type:<br/><br/>
    <select name="select" size="3"  v-model="data.lessonType">
      <option :value="keyN" v-for="keyN in options.types" :key="keyN">{{keyN}}</option>
    </select>
    <hr/>
    Link:<br/><br/>
    <input type="input" placeholder="link" v-model="data.lessonLink">
    <hr/>

    <!-- Группы:<button @click="screen='createGroup'">+</button><br/> -->

    <!-- <form id="formCreateGroup" v-on:submit.prevent="submit()" v-show="screen=='createGroup'">
      <button value="back" @submit="console.log('1');" @click="screen='main'">back</button>

      <p><b>Курс:</b></p>
      <select name="select" size="5" v-model="createGroup.spec" v-show="screen=='main'">
        <option :value="keyN"  v-for="keyN in options.specs" :key="keyN">{{keyN}}</option>
      </select>
      <p><input type="input" v-model="createGroup.name" placeholder="1/1; 1/2; 2/1"></p>
      <p><input type="submit" value="Create" @submit="submit(els)"></p>
      </form> -->
  <button @click="create">CREATE</button>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      txt: "",
      tags: [],
      options: {},
      screen:'main',
      createGroup:{
        spec:'',
        name:'',
      },
      colores:{
        'АОП':'#fa982a ',
        'Дискретка':'#0d8511 ',
        'Англ':'#1490a8 ',
        'Линейка':'#e8e523 ',
        'МатАнал':'#d720e8 ',
        'ВДУС':'#cc044a ',
        'ТеорВер':'#13e8e1 ',
      },
      data:{
        lessonTeacher:'',
        lessonName:'',
        lessonType:'',
        lessonTime:'',
        lessonDate:'',
        lessonGroup:''
      },
    };
  },
  mounted(){
        document.title ='[F]it';
        //Получение данных
        axios.get('http://'+document.domain+':5000/options/get')
            .then((red)=>{
              this.options=red.data;
              // this.speсы=red.data.groups;
                console.log(red.data.groups);
            },(err)=>{
                console.log(err);
            });
    },
  methods: {
    create(){
      console.log(this.data);
      this.data["lessonColor"]=this.colores[this.data.lessonName];
      axios.post('http://'+document.domain+':5000/timetables/1/add',this.data)
            .then((res)=>{
                alert(res);

                // location.reload();
            },(err)=>{
                alert(err);
            });
    },
    testHTTP(){
      axios.post('http://'+document.domain+':5000', {"tes":"tes"}).then(res=>{
                    console.log(res);
                }, err=>{
                    console.log(err);
                })
    },
    submit(){
      axios.put('http://'+document.domain+':5000/options/group/addnew',{"groupName":this.createGroup.name, "groupSpec":this.createGroup.spec})
            .then(()=>{
                location.reload();
            },(err)=>{
                alert(err);
            });
    },
    parser(txt) {
      this.testHTTP();
      if (txt) {
        let tempDateString = '';
        if (txt.indexOf('[')>-1){
          console.log('[]');
          let start = +txt.indexOf('[')+1;
          let end = +txt.indexOf(']')+0;
           tempDateString = txt.slice(start,end);
        }else{
          tempDateString = txt.replace(/[^.,[]-\d]/g, "");
        }
        this.txt= tempDateString;
        let res = [];
        console.log(tempDateString);
        if (tempDateString.indexOf(",") > -1) {
          //Запятые есть
          let tempGlobalDateArray = tempDateString.split(",");
          console.log(tempGlobalDateArray);
          let tempGlobalDateArrayOfStrings = [];
          tempGlobalDateArray.forEach((element) => {
            if (element){
              if (element.indexOf("-") > -1) {
                let intervalStartDay = element.split("-")[0].split(".")[0];
                let intervalStartMonth = element.split("-")[0].split(".")[1];
                let intervalEndDay = element.split("-")[1].split(".")[0];
                let intervalEndMonth = element.split("-")[1].split(".")[1];
                let lessons = (new Date(2020, intervalEndMonth-1, intervalEndDay)-new Date(2020, intervalStartMonth-1, intervalStartDay))/(86400000);
                for (let i=0; i<=lessons; i++){
                  if (i%7==0){
                    // console.log(new Date(2020, intervalStartMonth-1, +intervalStartDay+i));
                    res.push(new Date(2020, intervalStartMonth-1, +intervalStartDay+i));
                  }
                }
              }else{
                element.split(".")[1];
                res.push(new Date(2020, element.split(".")[1]-1, +element.split(".")[0]));
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
          this.tags = tempGlobalDateArrayOfStrings;
        } else {
          let element = tempDateString;
          if (element){
              if (element.indexOf("-") > -1) {
                let intervalStartDay = element.split("-")[0].split(".")[0];
                let intervalStartMonth = element.split("-")[0].split(".")[1];
                let intervalEndDay = element.split("-")[1].split(".")[0];
                let intervalEndMonth = element.split("-")[1].split(".")[1];
                let lessons = (new Date(2020, intervalEndMonth-1, intervalEndDay)-new Date(2020, intervalStartMonth-1, intervalStartDay))/(86400000);
                for (let i=0; i<=lessons; i++){
                  if (i%7==0){
                    // console.log(new Date(2020, intervalStartMonth-1, +intervalStartDay+i));
                    res.push(new Date(2020, intervalStartMonth-1, +intervalStartDay+i));
                  }
                }
              }else{
                element.split(".")[1];
                res.push(new Date(2020, element.split(".")[1]-1, +element.split(".")[0]));
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
        console.log('RES2',res);
        this.data.lessonDate = res;
        this.tags = 'Добавлено '+res.length+' занятий';
        setTimeout(function(){ this.tags=''}.bind(this),2000)
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#formCreateGroup{
  border: 1px double #ffa133;
  width: 300px;
}
</style>
