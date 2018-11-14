<template>
  <div id="app">
    <a class="github-fork-ribbon right-top" href="https://github.com/zxpsuper/createVue" title="Fork me on GitHub">Fork me on GitHub</a>
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
  transform: rotate(0deg);
}
img {
  margin-top: 60px;
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
.github-fork-ribbon {
  width: 12.1em;
  height: 12.1em;
  position: absolute;
  overflow: hidden;
  top: 0;
  right: 0;
  z-index: 9999;
  pointer-events: none;
  font-size: 13px;
  text-decoration: none;
  text-indent: -999999px;
}
.github-fork-ribbon.fixed {
  position: fixed;
}
.github-fork-ribbon:before,
.github-fork-ribbon:after {
  position: absolute;
  display: block;
  width: 15.38em;
  height: 1.54em;
  top: 3.23em;
  right: -3.23em;
  -webkit-box-sizing: content-box;
  box-sizing: content-box;
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
}
.github-fork-ribbon:before {
  content: "";
  padding: 0.38em 0;
  background-color: #f06;
  background-image: -webkit-gradient(
    linear,
    left top,
    left bottom,
    from(rgba(0, 0, 0, 0)),
    to(rgba(0, 0, 0, 0.15))
  );
  background-image: -webkit-linear-gradient(
    top,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0.15)
  );
  background-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0.15)
  );
  /* Add a drop shadow */

  -webkit-box-shadow: 0 0.15em 0.23em 0 rgba(0, 0, 0, 0.5);
  box-shadow: 0 0.15em 0.23em 0 rgba(0, 0, 0, 0.5);
  pointer-events: auto;
}
.github-fork-ribbon:after {
  /* Set the text from the title attribute */

  content: attr(title);
  /* Set the text properties */

  color: #fff;
  font: 700 1em "Helvetica Neue", Helvetica, Arial, sans-serif;
  line-height: 1.54em;
  text-decoration: none;
  text-shadow: 0 -0.08em rgba(0, 0, 0, 0.5);
  text-align: center;
  text-indent: 0;
  /* Set the layout properties */

  padding: 0.15em 0;
  margin: 0.15em 0;
  /* Add "stitching" effect */

  border-width: 0.08em 0;
  border-style: dotted;
  border-color: #fff;
  border-color: rgba(255, 255, 255, 0.7);
}
.github-fork-ribbon.left-top:before,
.github-fork-ribbon.left-top:after {
  right: auto;
  left: -3.23em;
}
.github-fork-ribbon.left-top:before,
.github-fork-ribbon.left-top:after {
  -webkit-transform: rotate(-45deg);
  transform: rotate(-45deg);
}
</style>
