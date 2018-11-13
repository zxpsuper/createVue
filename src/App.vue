<template>
  <div id="app">
    <img src="./assets/logo.png" alt="">
    <div class="flex space-around router">
      <router-link to="/introduce">Introduce</router-link>
      <router-link to="/me">About me</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "app",
  data() {
    return {};
  },
  components: {
    HelloWorld
  },
  created() {
    console.log(process.env.NODE_ENV);
    setInterval(() => {
      this.$store.dispatch("countUp");
    }, 1000);
  },
  methods: {}
};
</script>

<style scoped lang="less">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  transform: rotate(0deg);
}
.name {
  color: #00aac5;
}
.age {
  color: red;
}
.test {
  width: 100px;
  height: 100px;
  background: url("./datepicker.png") no-repeat;
}
.flex {
  display: flex;
}
.space-around {
  justify-content: space-around;
}
.router {
  width: 300px;
  margin: 10px auto;
  color: #42b983;
  font-size: 20px;
  text-decoration: underline;
}
.router a {
  cursor: pointer;
  color: #42b983;
}
.router a:hover {
  color: #00aac5;
}
</style>
