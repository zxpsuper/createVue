<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      you can use this to develop your project.
      <a href="https://github.com/zxpsuper/createVue" target="_blank">Create Vue</a>.
    </p>
    <p class="link">
      <a href="https://juejin.im/user/5af17df4518825672a02e1f5">juejin</a>
      <a href="https://blog.csdn.net/weixin_38788347">CSDN</a>
      <a href="https://github.com/zxpsuper">github</a>
      <a href="https://zxpsuper.github.io/">Blog</a>
    </p>
    <h2>Welcome star!</h2>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      let arr = [0, 1 , 2]
      arr.push(3)
      console.log(arr)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.link a {
  display: inline-block;
  margin: 0 20px;
}
</style>
