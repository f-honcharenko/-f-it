<template>
  <div class='p-3' >
    <!-- modal -->
    <b-modal id="modal2" ref="my-modal" hide-footer title="Изменение расписания(календарь)">
      <div class="d-block text-center">
        <h4>Выберете группу!</h4>
      </div>
      <b-button v-for="item in user.groups" :key="item" class="mt-3" variant="outline-info" block :to="{ path: 'adminTimetable',query: {spec: user.spec, group: item, }}" >{{item}}</b-button>
    </b-modal>
    
    <!-- modal -->

    <div v-if="auth">
      <div class="h1">Панель управления</div>
      <hr/>
      Тип учетной записи: <i>{{user.type}}</i><br/>
      Имеетеся доступ к: <i>{{user.groups.join(', ')}}</i> <br/>
      <hr/>
      <ul>
        <li>Добавить пары блоками</li>
        <!-- to="/adminTimeTable" -->
        <li @click="$bvModal.show('modal2')" class="activeLi" >Изменение расписания(календарь)</li>
        <li>Изменение расписания(дата)</li>
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

import axios from 'axios';

export default {
  name: 'LK',
  components:{},
  data(){
    return{
      auth: true,
      user: {},
    }
  },
  props: {

  },
  computed: {

  },
  beforeCreate(){
  axios.post(this.$nodeLink+'/lk', {token: localStorage['token']})
        .then((res)=>{
          console.log(res);
          if (res.status == 200){
            this.auth=true;
            this.user = res.data.decoded;
            console.log(res.data.decoded);
          }
        },(err)=>{
          console.log(err);
        })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.activeLi{
  text-decoration: underline;
  color:blue;
  cursor: pointer;
}
</style>
