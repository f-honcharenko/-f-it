<template>
  <div id="app">
    <router-view ></router-view>

    <div id="footer"><center>©F. Honcharenko 2020</center></div>
  </div>
  
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

export default {
  name: "App",
  components: {
    // HelloWorld
  },
};
</script>

<style>
html {
  position: relative;
  min-height: 100%;
}
body {
  /* Margin bottom by footer height */
  margin-bottom: 60px;
}
#footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  /* Set the fixed height of the footer here */
  height: 30px;
  background-color: #f5f5f5;
}
</style>
