<template>
  <div >
    <div class='p-3 h1'>LOGIN</div>
<div id="wrapper">
<div class='void'></div>
    <div id="form1" >
      <form v-on:submit.prevent="submitForm">
      <div class="form-group">
        <label for="exampleInputEmail1">Login</label>
        <input type="text" class="form-control" id="exampleInputEmail1" v-model="formData.login" aria-describedby="emailHelp" placeholder="Enter login">
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input type="password" class="form-control" v-model="formData.password" id="exampleInputPassword1" placeholder="Password">
      </div>
      <button class="btn btn-primary">Enter</button>
    </form>
    <b-alert variant="danger" class='m-3' v-show='alerts.error' show>
      {{err}}
    </b-alert>
    <b-alert variant="success" class='m-3' v-show='alerts.succses' show>
      {{suc}}
    </b-alert>
  </div>
<div class='void'></div>

</div>
  </div>
</template>

<script>

import axios from 'axios';

export default {
  name: 'Login',
  components:{},
  data(){
    return{
      formData :{
        login: '',
        password: '', 
      },
      alerts :{
        succses:false,
        error:false,
      },
      err:'',
      suc:'',
    }
  },
  props: {

  },
  computed: {

  },
  methods: {
    submitForm(){
      axios.post(this.$nodeLink+'/authAdmin', this.formData)
      .then((res)=>{
        localStorage['token']= res.data.JWT;
        this.suc = res.data.msg;
        this.alerts.succses = true;
        setTimeout(()=>{this.alerts.succses = false; 
          this.$router.push({name:'LK'});
        },1500)
      },(err)=>{
        this.err = err.response.data.msg;
        this.alerts.error = true;
        setTimeout(()=>{this.alerts.error = false},1500)

      })
      
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#wrapper{
  display: flex;
}
#form1{
  flex:1
}
.void{
  flex:2
}

</style>
