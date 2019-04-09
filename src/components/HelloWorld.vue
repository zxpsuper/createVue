<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      You can use this to develop your project.
      <a
        href="https://github.com/zxpsuper/createVue"
        target="_blank"
      >Create Vue</a>.
    </p>
    <p>This project will help you create a vue project step by step.</p>
    <p>You can learn webpack, vue, vue-router, vuex, proxy and so on.</p>
    <p>I hope that can be helpful for you!! And finally,</p>
    <h2>Welcome star!</h2>
    <p>You have stay here for {{count}} second</p>
    <Throttle :time="1000" events="click">
      <button @click="onClick($event, 1)" isDebounce>click</button>
    </Throttle>
  </div>
</template>

<script>
export default {
    name: 'HelloWorld',
    props: {
        msg: {
            type: String,
            default: 'Welcome to suporka vue',
        },
    },
    data() {
        return {
            val: 0,
        };
    },
    computed: {
        count() {
            return this.$store.state.count;
        },
    },
    created() {
        this.$eventBus.$on(
            'home-on',
            (...args) => {
                console.log('home $on====>>>', ...args);
            },
            this
        );
    },
    mounted() {
        setTimeout(() => {
            this.$eventBus.$emit('home-on', '这是home $emit参数', 'ee');
        }, 1000);
    },
    methods: {
        onClick($ev, val) {
            this.val += val;
            console.log(this.val, new Date());
        },
    },
};
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
