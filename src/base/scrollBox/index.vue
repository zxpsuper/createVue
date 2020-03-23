<template>
    <div
        ref="scrollBoxContainer"
        class="scrollbox-container"
        @mouseover.stop="setItemHeight"
    >
        <div class="scrollbox-wrapper">
            <div ref="scrollBoxView" @wheel.capture.stop="handlerWheel">
                <slot></slot>
            </div>
        </div>
        <ScrollBar
            :itemHeight="itemHeight"
            :scrollY="translateYPersent"
            ref="scrollbar"
        />
    </div>
</template>

<script>
import ScrollBar from './scrollBar.vue'
export default {
    name: 'ScrollBox',
    components: { ScrollBar },
    data() {
        return {
            itemHeight: 0,
            scrollY: 0, // 偏移量
            transformPersent: '',
            deltaY: 0, // 每次步进
            scrollBoxContainer: {
                offsetHeight: 0,
            },
            scrollBoxView: {
                offsetHeight: 0,
            },
        }
    },
    computed: {
        translateYPersent() {
            let result =
                ((this.scrollBoxContainer.offsetHeight - this.itemHeight) /
                    this.itemHeight) *
                +(this.scrollY / this.scrollBoxView.offsetHeight).toFixed(4) *
                100
            return result >= 0 ? 0 : result
        },
    },
    methods: {
        // 鼠标滚轮滚动事件
        handlerWheel(event) {
            if (
                (this.scrollY > 0 && event.wheelDeltaY > 0) ||
                (this.scrollY >= this.scrollBoxView.offsetHeight &&
                    event.wheelDeltaY < 0)
            )
                return

            this.deltaY = Math.abs(event.wheelDeltaY)
            if (
                this.scrollY +
                    event.wheelDeltaY +
                    this.scrollBoxView.offsetHeight -
                    this.scrollBoxContainer.offsetHeight <
                0
            ) {
                this.scrollY = -this.scrollBoxView.offsetHeight
            } else {
                this.scrollY = event.deltaY
                    ? this.scrollY + event.wheelDeltaY
                    : this.scrollY
            }
        },
        setItemHeight() {
            this.scrollBoxContainer.offsetHeight = this.$refs.scrollBoxContainer.offsetHeight
            this.scrollBoxView.offsetHeight = this.$refs.scrollBoxView.offsetHeight
            this.itemHeight = (
                (this.scrollBoxContainer.offsetHeight *
                    this.scrollBoxContainer.offsetHeight) /
                this.scrollBoxView.offsetHeight
            ).toFixed(2)
        },
    },

    mounted() {},
    updated() {},
}
</script>

<style scoped>
.scrollbox-container {
    position: relative;
}
.scrollbox-wrapper {
    height: 100%;
    margin-bottom: -17px;
    margin-right: -17px;
    overflow: auto;
    box-sizing: border-box;
}
</style>
