<template>
  <div class='header-div-wrapper'>
    <div class="header-div-components" id='hdc1'>About [f]it</div>
    <div class="header-div-components" id='hdc2'>-</div>
    <div class="header-div-components" id='hdc3'>main</div>
    <div class="header-div-components" id='hdc4'> top</div>
    <div class="header-div-components" id='hdc5'>-</div>
    <div class="header-div-components" id='hdc6'>-</div>
  </div>
</template>

<script>
export default {
  name: 'header',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header-div-wrapper{
  display: flex;
}
#hdc2, #hdc3{
  text-align:right
  }
.header-div-components{
  flex:1;
  border: 1px solid #ffa133;
  height: 100px;
  font-size: 20pt;
  line-height: 100px;

}

</style>
