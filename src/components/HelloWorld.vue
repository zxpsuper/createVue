<template>
    <div class="hello">
        <div style="margin: 10px auto; width: 200px;">
            <ScrollBox style="width: 200px; height: 200px; overflow: hidden;">
                <img
                    :src="item"
                    alt
                    v-for="item in imgArr"
                    :key="item"
                    style="width: 100%;"
                />
            </ScrollBox>
        </div>
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
        <p>You have stay here for {{ count }} second</p>
        <Throttle :time="5000" events="click">
            <button @click="onClick($event, 1)" isDebounce v-once>click</button>
        </Throttle>

        <Throttle :time="2000" events="click">
            <button @click="haha" isDebounce>open Mask</button>
        </Throttle>

        <div>{{ suporka }}</div>

        <div>
            <button @click="suporka += 1">click</button>
        </div>
        <date-picker style="margin: 10px auto;"></date-picker>
        <mask-model v-model="ifShowMask">
            <div style="padding: 20px;">Welcome to suporka vue</div>
        </mask-model>
        <h2>以下用于测试首屏时间：</h2>
        <h3>在控制台输入：whiteScreenTime.showData() 即可查看</h3>
        <img
            :src="item"
            alt
            v-for="item in imgArr"
            class="test-img"
            :key="item"
        />
    </div>
</template>

<script>
import DatePicker from '@/base/datePicker/index.vue'
import MaskModel from '@/base/maskModel'
import ScrollBox from '@/base/scrollBox/index.vue'
export default {
    name: 'HelloWorld',
    components: { DatePicker, MaskModel, ScrollBox },
    props: {
        msg: {
            type: String,
            default: 'Welcome to suporka vue',
        },
    },
    data() {
        return {
            val: 0,
            ifShowMask: false,
            suporka: 1,
            imgArr: [],
        }
    },
    computed: {
        count() {
            return this.$store.state.count
        },
    },
    created() {
        this.$eventBus.$on(
            'home-on',
            (...args) => {
                console.log('home $on====>>>', ...args)
            },
            this
        )
    },
    mounted() {
        setTimeout(() => {
            this.$eventBus.$emit('home-on', '这是home $emit参数', 'ee')
        }, 1000)
        setTimeout(() => {
            this.imgArr = [
                'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1583740305880&di=50de536ed7fc65ba81908d62a8c9b602&imgtype=0&src=http%3A%2F%2F7776175.s21i.faiusr.com%2F2%2Fabuiabacgaagy_n_tguo2ilwnjcgbziaba.jpg',
                'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1583740305880&di=bedeb548d576b3824275076e559ba394&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20171108%2F3fe473acfc39476db58fadd7fbaf97ff.jpeg',
                'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1583740305880&di=afa12cdf2eb1f62339476af47d1f02d2&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20180703%2F4669d3d7dec3494ebcd87f342ba9dc1b.jpeg',
                'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1583740305879&di=d745fa20c5ef525e0f1c265566cacdf5&imgtype=0&src=http%3A%2F%2Fi1.hdslb.com%2Fbfs%2Farchive%2Ff47d9b1af8b8c790a6a1ebdde3f0c0943d726869.jpg',
            ]
            this.$nextTick(() => {
                window.whiteScreenTime.updateLastModifyTime()
            })
        }, 1500)
    },
    methods: {
        haha() {
            this.ifShowMask = true
        },
        onClick($ev, val) {
            this.val += val
            console.log(this.val, new Date())
        },
    },
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
.test-img {
    width: 100px;
}
</style>
