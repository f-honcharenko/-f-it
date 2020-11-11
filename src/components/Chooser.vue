<template>
  <div class="header-div-wrapper">
    <!-- <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"> -->
    <div class="container5">
      <center>
        <h1>
          <div class="d-flex justify-content-center mt-5 ppchose">
            <router-link
              class="ppchose"
              :to="{
                path: 'timetable',
                query: { spec: 'AP1', group: 'ПП11/1' },
              }"
              ><button type="button" class="btn btn-secondary ml-3 mr-3">
                ПП11/1
              </button></router-link
            >
            <router-link
              class="ppchose"
              :to="{
                path: 'timetable',
                query: { spec: 'AP1', group: 'ПП11/2' },
              }"
              ><button type="button" class="btn btn-secondary ml-3 mr-3">
                ПП11/2
              </button></router-link
            >
            <router-link
              class="ppchose"
              :to="{
                path: 'timetable',
                query: { spec: 'AP1', group: 'ПП12/1' },
              }"
              ><button type="button" class="btn btn-secondary ml-3 mr-3">
                ПП12/1
              </button></router-link
            >
            <router-link
              class="ppchose"
              :to="{
                path: 'timetable',
                query: { spec: 'AP1', group: 'ПП12/2' },
              }"
              ><button type="button" class="btn btn-secondary ml-3 mr-3">
                ПП12/2
              </button></router-link
            >
          </div>

          <div class="d-flex justify-content-center mt-5 ppchose">
            <router-link
              class="ppchose"
              :to="{
                path: 'timetable',
                query: { spec: 'SoftEng3', group: 'ИПЗ-31/1' },
              }"
              ><button type="button" class="btn btn-secondary ml-3 mr-3">
                ИПЗ-31/1
              </button></router-link
            >
            <router-link
              class="ppchose"
              :to="{
                path: 'timetable',
                query: { spec: 'SoftEng3', group: 'ИПЗ-31/2' },
              }"
              ><button type="button" class="btn btn-secondary ml-3 mr-3">
                ИПЗ-31/2
              </button></router-link
            >
          </div>
        </h1>
      </center>
    </div>
  </div>
</template>

<script>
export default {
  name: "header",
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
html body {
  line-height: 100%;
}
.ppchose {
  /* font-weight: 900; */
  color: black;
}
</style>
