<template>
  <div class='p-3' >
    <div v-if="auth">
      <div class="h1">Панель управления</div>
      <hr/>
      Тип учетной записи: <i>{{user.type}}</i><br/>
      Имеетеся доступ к:<i></i> <br/>
      
      <hr/>
      <ul>
        <li>Добавить блок уроков.</li>
        <li>Изменение расписания(календарь)</li>
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
      auth:false,
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
            this.user = res.data.decoded.data;
            console.log('CONGRATULATIONS!');
          }
        },(err)=>{
          console.log(err);
        })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
