<template>
    <div class="player_progress" ref="player_progress__inner">
        <div class="player_progress__inner" :style="{ background: barBg }">
            <div
                class="player_progress__play"
                :style="{ width: percent + '%', backgroundColor: dotColor }"
            >
                <i
                    class="player_progress__dot"
                    id="spanprogress_op"
                    :style="{ backgroundColor: dotColor }"
                ></i>
            </div>
        </div>
    </div>
</template>

<script>
import { setRgbaByAlpha, isDom } from './utils/utils'
export default {
    name: 'MusicProgress',
    props: {
        percent: {
            type: Number,
            default: 0,
        },
    },
    computed: {
        dotColor() {
            return this.$parent.style.fill
        },
        barBg() {
            return this.setRgbaByAlpha(this.$parent.style.fill, 0.2)
        },
    },
    mounted() {
        isDom(this.$refs['player_progress__inner']) &&
            this.$refs['player_progress__inner'].addEventListener(
                'click',
                this.changeProgress,
                false
            )
    },
    beforeDestroy() {
        isDom(this.$refs['player_progress__inner']) &&
            this.$refs['player_progress__inner'].removeEventListener(
                'click',
                this.changeProgress,
                false
            )
    },
    methods: {
        changeProgress(e) {
            this.$emit(
                'progress-update',
                e.offsetX / this.$refs['player_progress__inner'].offsetWidth
            )
        },
        setRgbaByAlpha(rgba, opacity) {
            return setRgbaByAlpha(rgba, opacity)
        },
    },
}
</script>

<style scoped>
.player_progress {
    padding-top: 6px;
    height: 8px;
}
.player_progress__inner {
    position: relative;
    height: 2px;
}
.player_progress__play {
    position: absolute;
    top: 0;
    left: 0;
    height: 2px;
    transition: all 0.3;
}
.player_progress__dot {
    position: absolute;
    top: -4px;
    right: -4px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-position: 0 -170px;
    opacity: 1;
    filter: none;
    /* background-color: #fff; */
}
</style>
