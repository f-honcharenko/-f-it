<template>
  <div class='p-3'>
    
    <div class='h1'>{{title}}</div>
    <small>{{date}} {{timeStart}}-{{timeEnd}}</small><br/>
    <small>Преподаватель: {{teacher}}</small><br/>
    <a v-bind:href="url" class="font-weight-bold h4" target="_blank " v-if="url">Ссылка</a>
    <a v-else  class="font-weight-bold h4 text-danger">Ссылка отсутсвует</a>
    <hr/>
    ДЗ:

    <b-table striped hover :items="items" :fields="fields"></b-table>
    <hr/>
    События:
    <hr/>
  </div>
</template>

<script>

// import axios from 'axios';

export default {
  name: 'lesson',
  components:{},
  data(){
    return{
    tet:'',
    fields: ['Дата', 'Задание', 'Файлы'],
     items: [
          { age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
          { age: 21, first_name: 'Larsen', last_name: 'Shaw' },
          { age: 89, first_name: 'Geneva', last_name: 'Wilson' },
          { age: 38, first_name: 'Jami', last_name: 'Carney' }
        ]
    }
  },
  props: {
    title: String,
    url: String,
    timeStart: String,
    timeEnd: String,
    date: String,
    teacher: String,
  },
  computed: {
  // DATE: function () {
  //   return this.date.reverse();
  // }
}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
