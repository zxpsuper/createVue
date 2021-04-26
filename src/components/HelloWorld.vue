<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      You can use this to develop your project.
      <a href="https://github.com/zxpsuper/createVue" target="_blank"
        >Create Vue</a
      >.
    </p>
    <p>This project will help you create a vue project step by step.</p>
    <p>You can learn webpack, vue, vue-router, vuex, proxy and so on.</p>
    <p>I hope that can be helpful for you!! And finally,</p>
    <h2>Welcome star!</h2>
    <p>You have stay here for {{ count }} second, click time: {{ suporka }}</p>
    <button @click="suporka += 1">click</button>
    <h3>Test first screen load time：</h3>
    <h4>input the code on console ：whiteScreenTime.showData()</h4>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, computed } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'HelloWorld',
  props: {
    msg: {
      type: String,
      default: 'Welcome to suporka vue',
    },
  },
  setup() {
    const store = useStore()
    const count = computed(() => store.state.count)
    const data = reactive({
      val: 0,
      ifShowMask: false,
      suporka: 1,
      testArray: Array.from([]),
    })
    return { ...toRefs(data), count }
  },
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
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
.test-img {
  display: flex;
  width: 100px;
}
</style>
