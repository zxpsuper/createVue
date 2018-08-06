<template>
  <div id="app">
    <img src="./assets/logo.png" alt="">
    <HelloWorld msg="welcome to suporka vue"/>
    <img src="./datepicker.png" alt="">
    <div class="test"></div>
  </div>
</template>
<script>
import HelloWorld from '@/components/HelloWorld.vue'
export default {
  name: 'app',
  data() {
    return {}
  },
  components: {
    HelloWorld
  },
}
</script>

<style scoped lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.name {
  color: #00aac5;
}
.age {
  color: red
}
.test {
  width: 100px;
  height: 100px;
  background: url('./datepicker.png') no-repeat;
}
</style>
