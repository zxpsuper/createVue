<template>
  <div>
    <p><h1>Suporka</h1> </p>
    <p><h2> Front-End engineer</h2></p>
    <p><h3> Graduated from South China Agricultural University</h3></p>
    <p><h3> Expert in javascript react vue weapp and so on!</h3></p>
    <p><h3> The following are the details:</h3></p>
    <p class="link">
      <a href="https://juejin.im/user/5af17df4518825672a02e1f5">juejin</a>
      <a href="https://blog.csdn.net/weixin_38788347">CSDN</a>
      <a href="https://github.com/zxpsuper">github</a>
      <a href="https://zxpsuper.github.io/">Blog</a>
    </p>
    <p>You have stay here for {{count}} second</p>
  </div>
</template>
<script>
export default {
  name: "",
  data() {
    return {};
  },
  computed: {
    count() {
      return this.$store.state.count;
    }
  }
};
</script>
<style scoped>
a {
  color: #42b983;
}
.link a {
  display: inline-block;
  margin: 0 20px;
}
</style>
