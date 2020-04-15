<template>
    <transition>
        <div
            class="chatroom-face-popup"
            :class="{ 'to-right': current === 2 }"
            @click.stop
            v-show="show"
        >
            <div class="face-list-wrapper">
                <div class="face-list-wrapper-inner">
                    <ul class="face-list-emoji" v-if="isMacPlatform">
                        <li
                            class="face-item-emoji effect-transition-scale"
                            v-for="(item, index) in emojiFaceList"
                            :key="index"
                            @click="onSelectFace(item.tag)"
                            :title="`[${item.zh}]`"
                        >
                            <span class="emoji_png">{{ item.tag }}</span>
                        </li>
                    </ul>
                    <ul class="face-list-emoji" v-else>
                        <li
                            class="face-item-emoji"
                            v-for="(item, index) in emojiFaceList"
                            :key="index"
                            @click="onSelectFace(`[${item.zh}]`)"
                            :title="`[${item.zh}]`"
                        >
                            <span
                                class="emoji_png"
                                :style="{
                                    background: `url(${emojiPngUrl}) ${item.bp}`,
                                }"
                            ></span>
                        </li>
                    </ul>
                </div>
                <div class="face-list-wrapper-inner">
                    <ul class="face-list-text">
                        <li
                            class="face-item-text effect-hover-background"
                            @click="onSelectFace(item)"
                            v-for="(item, index) in textFaceList"
                            :key="index"
                        >
                            {{ item }}
                        </li>
                    </ul>
                </div>
            </div>
            <div class="face-switch">
                <div
                    class="switch-button"
                    :class="{ active: current === 1 }"
                    @click="onSwitchCurrent(1)"
                >
                    <span class="xiaoicon">emoji</span>
                </div>
                <div
                    class="switch-button"
                    :class="{ active: current === 2 }"
                    @click="onSwitchCurrent(2)"
                >
                    ╰(●’◡’●)╮
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import textFaceList from './face.json'
import emojiPngUrl from '@/assets/emoji.png'
import emojiFaceList from './emoji.js'

export default {
    props: {
        show: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            current: 1,
            textFaceList,
            emojiFaceList,
            emojiPngUrl,
            isMacPlatform: navigator.platform.indexOf('Mac') > -1,
        }
    },
    computed: {
        isKicked() {
            return this.$store.state.liveroom.isKicked
        },
    },
    methods: {
        onSelectFace(content) {
            console.log(content)
            if (!this.isKicked) {
                this.$emit('select-face', { content })
            }
            this.$emit('update:show', false)
        },
        onClickDocument() {
            this.$emit('update:show', false)
        },
        onSwitchCurrent(current) {
            this.current = current
        },
    },
    mounted() {
        this._onClickDocument_ = this.onClickDocument.bind(this)
        document.addEventListener('click', this._onClickDocument_, false)
    },
    beforeDestroy() {
        if (this._onClickDocument_) {
            document.removeEventListener('click', this._onClickDocument_, false)
        }
    },
}
</script>

<style lang="scss">
ul,
li {
    margin: 0;
    padding: 0;
}
.chatroom-face-popup {
    width: 394px;
    height: 236px;
    background: #282b3d;
    margin: 0 auto;
    box-shadow: 0 3px 12px 0 rgba(22, 25, 36, 0.96);
    border-radius: 2px;
    overflow: hidden;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    z-index: 32;
}
.face-list-wrapper {
    display: -webkit-flex;
    display: flex;
    width: 788px;
    transition: -webkit-transform ease-out 150ms;
    transition: transform ease-out 150ms;
    transition: transform ease-out 150ms, -webkit-transform ease-out 150ms;
}
.chatroom-face-popup.to-right .face-list-wrapper {
    -webkit-transform: translate3d(-394px, 0, 0);
    transform: translate3d(-394px, 0, 0);
}
.chatroom-face-popup .face-list-wrapper-inner {
    position: relative;
    -webkit-flex: 1;
    flex: 1;
    height: 198px;
    padding: 0;
    overflow-y: auto;
}
.chatroom-face-popup .face-list-wrapper ul,
.chatroom-face-popup .face-list-wrapper li {
    list-style-type: none;
}
.chatroom-face-popup .face-list-text,
.chatroom-face-popup .face-list-emoji {
    display: block;
    padding-top: 14px;
    padding-left: 22px;
    font-size: 12px;
    color: #fff;
}
.chatroom-face-popup .face-item-emoji {
    display: inline-block;
    width: 26px;
    height: 26px;
    line-height: 26px;
    margin-right: 10px;
    margin-bottom: 12px;
    text-align: center;
    cursor: pointer;
}
.chatroom-face-popup .emoji_png {
    height: 24px;
    width: 24px;
    display: inline-block;
    text-align: center;
    vertical-align: middle;
    overflow: hidden;
    font-size: 24px;
}
.chatroom-face-popup .face-switch {
    display: -webkit-flex;
    display: flex;
}
.chatroom-face-popup .switch-button {
    -webkit-flex: 1;
    flex: 1;
    height: 38px;
    font-size: 14px;
    color: #434861;
    line-height: 38px;
    text-align: center;
    cursor: pointer;
    background: #232637;
}
.chatroom-face-popup .face-item-text {
    display: inline-block;
    width: 80px;
    height: 40px;
    margin-right: 10px;
    margin-bottom: 6px;
    line-height: 40px;
    border-radius: 3px;
    text-align: center;
    font-size: 12px;
    color: #cdcdcd;
    cursor: pointer;
}
.chatroom-face-popup .switch-button.active {
    color: #fff;
    background: #282b3d;
    cursor: default;
}
::-webkit-scrollbar-track-piece {
    //滚动条凹槽的颜色，还可以设置边框属性
    background-color: #282b3d;
}
::-webkit-scrollbar {
    //滚动条的宽度
    width: 4px;
    height: 4px;
}
::-webkit-scrollbar-thumb {
    //滚动条的设置
    background-color: #dddddd;
    background-clip: padding-box;
    min-height: 28px;
    width: 4px;
    border-radius: 8px;
    background: #ccc;
}
::-webkit-scrollbar-thumb:hover {
    background-color: #bbb;
}
</style>
