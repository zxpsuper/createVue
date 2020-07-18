import { isDom, getUUID } from './utils'
let musicPlayerMap = {}
export default class Player {
    constructor() {
        this.audio = null
        this.volume = 0.6
        this.uuid = getUUID()
        this.initPlayer()
    }
    on(event, callback) {
        isDom(this.audio) && this.audio.addEventListener(event, callback, false)
    }
    initPlayer() {
        window.audio = this.audio = document.createElement('audio')
        this.audio.preload = true
        this.audio.volume = this.volume
        musicPlayerMap[this.uuid] = this.audio
    }
    togglePlay(bool) {
        if (bool) {
            this.audio && this.audio.play && this.audio.play()
        } else {
            this.audio && this.audio.pause && this.audio.pause()
        }
    }
    setUrl(url) {
        this.audio.src = url
    }
    setCurrentTime(time) {
        this.audio.currentTime = time
    }
    setVolume(volume) {
        this.audio.volume = volume
    }
    destroy() {
        this.audio.pause()
        this.audio = null
    }
}
