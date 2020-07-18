<template>
    <div class="music-player" :style="style">
        <img :src="cover" :alt="title" class="cover-img" v-if="cover" />
        <div class="control-block">
            <div class="music-time">
                {{ currentTime | handleTime }} / {{ duration | handleTime }}
            </div>
            <ControlSimple
                :status="status"
                @prev="prev"
                @next="next"
                @toggle-play="togglePlay"
            />
        </div>
        <div class="music-progress">
            <div class="music-info">
                <span class="no-wrap" :title="title + '-' + author"
                    >{{ title }} - {{ author }}</span
                >
                <span class="button-group">
                    <PlayType :typeIndex.sync="playTypeIndex" />
                    <Volume v-show="showVolume" />
                </span>
            </div>
            <MusicProgress
                :percent="musicPercent"
                @progress-update="progressUpdate"
            />
        </div>
    </div>
</template>

<script>
import ControlSimple from './ControlSimple'
import MusicProgress from './MusicProgress'
import Volume from './Volume'
import PlayType from './PlayType'
import Player from './utils/player'
import { PLAYTYPE, THEME } from './utils/const'

export default {
    name: 'music-player',
    components: {
        ControlSimple,
        MusicProgress,
        Volume,
        PlayType,
    },
    props: {
        playList: {
            type: Array,
            default: () => [],
        },
        theme: {
            type: String,
            default: 'metal',
            validator(value) {
                return Object.keys(THEME).indexOf(value) > -1
            },
        },
    },
    filters: {
        handleTime(time) {
            time = time | 0
            let minute = (time / 60) | 0
            minute = minute < 10 ? '0' + minute : minute
            let second = time % 60
            second = second < 10 ? '0' + second : second
            return minute + ':' + second
        },
    },
    data() {
        return {
            status: 'pause',
            player: null,
            currentTime: 0,
            duration: 0,
            index: 0,
            playOrder: 'asc', // 播放顺序  asc or desc
            playTypeIndex: 0,
            randomPlayList: [],
            showVolume: false,
        }
    },
    watch: {
        index: {
            handler() {
                this.player.setUrl(this.currentUrl)
                this.togglePlay(true)
            },
        },
    },
    computed: {
        style() {
            return {
                background: this.background || THEME[this.theme].background,
                fill: this.iconColor || THEME[this.theme].iconColor,
                color: this.textColor || THEME[this.theme].textColor,
            }
        },
        playType() {
            return PLAYTYPE[this.playTypeIndex] || ''
        },
        currentUrl() {
            if (this.index > this.playList.length - 1) return ''
            return this.playList[this.index].url || ''
        },
        cover() {
            if (this.index > this.playList.length - 1) return ''
            return this.playList[this.index].pic || ''
        },
        title() {
            if (this.index > this.playList.length - 1) return ''
            return this.playList[this.index].title || ''
        },
        author() {
            if (this.index > this.playList.length - 1) return ''
            return this.playList[this.index].author || ''
        },
        musicPercent() {
            return (this.currentTime / this.duration) * 100 || 0
        },
    },
    mounted() {
        this.player = new Player()
        this.player.on('timeupdate', () => {
            this.duration = this.player.audio.duration
            this.currentTime = this.player.audio.currentTime
        })
        this.player.on('error', () => {
            if (this.playOrder === 'asc') this.next()
            else this.prev()
        })
        this.player.on('ended', () => {
            console.log('end')
            this.next()
        })
        this.player.setUrl(this.playList[this.index].url)
        window.addEventListener('resize', () => {
            this.ifShowVolume()
        })
        this.ifShowVolume()
    },
    methods: {
        prev() {
            this.playOrder = 'desc'
            if (this.playType === 'single') {
                this.player.setCurrentTime(0)
                this.togglePlay(true)
            } else if (this.playType === 'random') {
                this.index = (Math.random() * this.playList.length) | 0
            } else {
                if (this.index - 1 >= 0) this.index--
                else {
                    if (this.playType === 'normal') {
                        // 列表播放
                        this.togglePlay(false)
                    } else if (this.playType === 'circle') {
                        this.index =
                            this.playList.length > 0
                                ? this.playList.length - 1
                                : 0
                    }
                }
            }
        },
        next() {
            this.playOrder = 'asc'
            if (this.playType === 'single') {
                this.player.setCurrentTime(0)
                this.togglePlay(true)
            } else if (this.playType === 'random') {
                this.index = (Math.random() * this.playList.length) | 0
            } else {
                if (this.index + 1 < this.playList.length) this.index++
                else {
                    if (this.playType === 'normal') {
                        // 列表播放
                        this.togglePlay(false)
                    } else if (this.playType === 'circle') {
                        this.index = 0
                    }
                }
            }
        },
        togglePlay(bool) {
            if (bool) {
                this.status = 'playing'
            } else {
                this.status = 'pause'
            }
            this.player.togglePlay(bool)
        },
        progressUpdate(scale) {
            this.currentTime = this.duration * scale
            this.player.setCurrentTime(this.currentTime)
        },
        ifShowVolume() {
            if (window.innerWidth >= 800) this.showVolume = true
            else this.showVolume = false
        },
    },
}
</script>

<style scoped lang="scss">
.music-player {
    padding: 8px;
    width: 500px;
    height: 60px;
    display: flex;
    align-items: center;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.5);
    font-size: 12px;
    cursor: pointer;
    cursor: url('data:image/png;base64,AAACAAEAICAAAAMAAwCoEAAAFgAAACgAAAAgAAAAQAAAAAEAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAQAAAAMAAAADAAAAAwAAAAIAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAABAAAAAsAAAARAAAAFgAAABgAAAAXAAAAEgAAAAwAAAAGAAAAAgAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAYAAAASAAAAIgAAADEAAAA7AAAAPwAAAD0AAAA1AAAAKAAAABkAAAALAAAABAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAADAAAABQAAAAcAAAAHAAAABQAAAAMAAAAEAAAAEAAAACoAAABJAAAAYQAAAG4AAABxAAAAbwAAAGYAAABVAAAAPAAAACIAAAAPAAAABAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAABgAAAA8AAAAZAAAAIAAAACAAAAAcAAAAFgAAABgAAAAoAAAASQAAAG8AAACdAAAApgAAAKgAAACZAAAAiwAAAH0AAABlAAAARAAAACUAAAAOAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAgAAAAVAAAAKwAAAD8AAABKAAAASwAAAEQAAAA7AAAAOwAAAEsAAADDAAAA/wAAAP8AAAD/AAAA/wAAAP8AAADiAAAAqQAAAIYAAABpAAAARAAAACEAAAALAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAEwAAAC8AAABRAAAAawAAAHgAAAB5AAAAdQAAAG4AAABtAAAAugAAAP8DAwP/MzMz/zMzM/8zMzP/EhIS/wAAAP8AAAD/AAAAsQAAAIUAAABkAAAAOwAAABkAAAAGAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAgAAAARwAAAJwAAADKAAAAyQAAALIAAACcAAAAkAAAAI8AAADjAAAA/729vf/////////////////w8PD/aWlp/wAAAP8AAAD/AAAArwAAAH0AAABVAAAAKgAAAA4AAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACwAAACgAAADfAAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD1AAAA7AAAAPsAAAD/BwcH/zMzM/9vb2//4eHh////////////eHh4/wAAAP8AAAD6AAAAnAAAAGoAAAA7AAAAFwAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALAAAApgAAAP85OTn/ioqK/35+fv9FRUX/EhIS/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8PDw//jY2N////////////XV1d/wAAAP8AAADfAAAAdwAAAEkAAAAfAAAABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAADXAAAA/9LS0v//////////////////////5OTk/+Tk5P/k5OT/5OTk//b29v/MzMz/Wlpa/wAAAP8AAAD/XV1d///////t7e3/EhIS/wAAAP8AAACUAAAAUAAAACMAAAAJAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAMIAAAD/vb29////////////////////////////////////////////////////////////rq6u/wwMDP8AAAD/q6ur//////9paWn/AAAA/wAAALEAAABOAAAAIgAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAhQAAAP8eHh7/2NjY////////////////////////////////////////////////////////////kJCQ/wAAAP9OTk7//////6Wlpf8AAAD/AAAAzQAAAEIAAAAbAAAABgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAIAAAAvQAAAP8AAAD/JCQk/2ZmZv/k5OT////////////8/Pz/9/f3//7+/v/////////////////t7e3/AAAA/xEREf//////jY2N/wAAAP8AAAC2AAAAMQAAABIAAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAABwAAABcAAAA3AAAAvwAAAOsAAAD/EhIS/+Hh4f//////+vr6/9nZ2f+tra3/7u7u//////////////////////+NjY3/AAAA/9vb2/9OTk7/AAAA/wAAAHsAAAAcAAAACAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAcAAAAWAAAAMgAAAFUAAADTAAAA/wMDA//AwMD///////39/f/b29v/dHR0/wAAAP/Nzc3//////////////////////+Tk5P8AAAD/QEBA/wAAAP8AAADrAAAAMQAAAAwAAAADAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAHAAAAFgAAADIAAABVAAAAzwAAAP8VFRX/sbGx////////////6urq/3x8fP8AAAD/ZGRk/9/f3//q6ur/6urq//z8/P//////6urq/wAAAP8AAAD/AAAA+QAAAE0AAAANAAAAAwAAAAEAAAAAAAAAAAAAAAAAAAABAAAABgAAABQAAAAxAAAAVQAAAMwAAAD/Dw8P/9LS0v/////////////////Nzc3/AAAA/2dnZ//Q0ND/3Nzc/3Jycv+Ghob/6urq///////k5OT/AAAA/wAAANIAAABWAAAAFwAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAAOAAAAKAAAAFAAAADLAAAA/wkJCf/AwMD///////////////////////X19f/MzMz/4uLi/+jo6P+NjY3/AAAA/4aGhv/v7+///////729vf8AAAD/AAAAkAAAACgAAAANAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAABkAAAA9AAAAxwAAAP8JCQn/w8PD//////////////////n5+f+urq7////////////4+Pj/r6+v/wAAAP9HR0f/zMzM//z8/P/q6ur/CQkJ/wAAAP8AAABPAAAAFwAAAAYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAAAIAAAAL0AAAD/CQkJ/7q6uv/////////////////5+fn/Tk5O/z8/P/////////////n5+f/Kysr/fn5+/8vLy//5+fn/9vb2/1FRUf8AAAD/AAAAwQAAAB0AAAAKAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcAAABhAAAA/wwMDP/Dw8P/////////////////8/Pz/0JCQv8AAAD/AAAA/4eHh//5+fn//v7+//f39//t7e3/+/v7/+fn5/82Njb/AAAA/wAAAOwAAAAxAAAACwAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAJIAAAD/h4eH/////////////////9jY2P8zMzP/AAAA/wAAAOEAAAD/AAAA/xsbG/9+fn7/tLS0/8zMzP+rq6v/Hh4e/wAAAP8AAADVAAAAOQAAAAkAAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAAAAkAAAAP+Kior///////////+urq7/DAwM/wAAAP8AAADTAAAANgAAAFMAAADAAAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAAvAAAACMAAAAHAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAABRAAAA/wAAAP9LS0v/XV1d/wMDA/8AAAD/AAAArwAAABkAAAAHAAAAAQAAAAEAAABDAAAAgQAAALcAAADOAAAAsAAAAHUAAAAHAAAAAwAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAABQAAAA4gAAAP8AAAD/AAAA/wAAAKEAAAAMAAAABQAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAATQAAAGAAAAAkAAAAAwAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////////////////////////Af///AA///gAH/wAAA/4AAAP8AAAB/AAAAPwAAAD8AAAA/AAAAPwAAAD8AAAA/AAAAPwAAAD4AAAA8AAAAeAAAAHAAAAHwAAAB8AAAA/AAAAPwAAAH8AAAD/AAAB/wAAA/+AH///4H////////8='),
        auto;
}
.cover-img {
    border-radius: 4px;
    width: 60px;
    margin-right: 10px;
    box-shadow: 0 0 0.1rem #c2c2c2;
}
.music-time {
    font-size: 14px;
    margin-bottom: 10px;
    user-select: none;
}
.music-progress {
    flex: 1;
    margin-left: 10px;
    padding-bottom: 4px;
}
.music-info {
    display: flex;
    font-size: 12px;
    text-align: left;
    margin-bottom: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.button-group {
    display: flex;
    align-items: center;
    flex-shrink: 0;
}
.no-wrap {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    flex: 1;
    max-width: 240px;
}
.control-block {
    flex-shrink: 0;
}
@media screen and (max-width: 800px) {
    .music-player {
        width: 100vw;
        box-sizing: border-box;
        padding: 0 8px 0 0;
    }
    .cover-img {
        border-radius: 0;
        margin-right: 4px;
    }
    .no-wrap {
        max-width: calc(100vw - 190px);
    }
}
</style>
