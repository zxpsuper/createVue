<template>
  <div class="ml-model dg-mask-layer" v-show="visible" :style="{ 'z-index': 1001 }">
    <template v-if="transition=='middle'">
      <transition name="dl-middle">
        <div class="dl-com dl-middle" v-show="value">
          <slot></slot>
        </div>
      </transition>
    </template>
    <template v-if="transition=='top'">
      <transition name="dl-top">
        <div class="dl-com dl-top" v-show="value">
          <slot></slot>
        </div>
      </transition>
    </template>
    <template v-if="transition=='right'">
      <transition name="dl-right">
        <div class="dl-com dl-right" v-show="value">
          <slot></slot>
        </div>
      </transition>
    </template>
    <template v-if="transition=='bottom'">
      <transition name="dl-bottom">
        <div class="dl-com dl-bottom" v-show="value">
          <slot></slot>
        </div>
      </transition>
    </template>
    <template v-if="transition=='left'">
      <transition name="dl-left">
        <div class="dl-com dl-left" v-show="value">
          <slot></slot>
        </div>
      </transition>
    </template>
    <template v-if="['middle','top','left','right','bottom'].indexOf(transition)==-1">
      <slot></slot>
    </template>
    <transition name="dl-opy">
      <div
        class="ml-mask-bg"
        :class="[maskClass,{'ml-mask-clarity':!mask}]"
        v-show="value"
        @click="doClickMask"
      ></div>
    </transition>
  </div>
</template>
<script>
/**
 * 添加class名称
 * @param $el
 * @param className
 */
function addClass($el, className) {
    if (Object.prototype.toString.apply(className) === '[object String]') {
        let classes = $el.className.split(' ');
        className.split(' ').forEach(cl => {
            if (classes.findIndex(al => al === cl) === -1) {
                classes.push(cl);
            }
        });
        $el.className = classes.join(' ');
    }
}
/**
 * 判断class名称是否存在
 * @param $el
 * @param className
 * @return {boolean}
 */
function checkClass($el, className) {
    let result = false;
    if (Object.prototype.toString.apply(className) === '[object String]') {
        let classes = $el.className.split(' ');
        className.split(' ').forEach(cl => {
            result = classes.findIndex(al => al === cl) > -1;
        });
    }
    return result;
}
export default {
    name: `model`,
    props: {
        value: Boolean,
        mask: {
            type: Boolean,
            default: true,
        },
        maskClass: String,
        prevent: Boolean,
        transition: {
            type: String,
            default: 'middle', // middle、top、right、bottom、left
        },
        speed: {
            type: Number,
            default: 300,
        },
        through: {
            type: Boolean,
            default: true,
        },
    },
    watch: {
        /**
         *监听v-model值变化
         */
        value() {
            if (!this.value) {
                this.doClose();
            } else {
                this.visible = true;
            }
            setTimeout(() => {
                this.finish = this.value;
            }, this.speed);
        },
    },
    data() {
        return {
            visible: this.value,
            finish: false,
        };
    },
    methods: {
        /**
         * 关闭事件
         */
        doClose() {
            setTimeout(() => {
                this.visible = false;
                this.$emit('on-close');
            }, this.speed);
        },
        /**
         * 遮罩层click事件
         */
        doClickMask() {
            console.log(222);
            if (this.finish && !this.prevent) this.$emit('input', false);
        },
    },
    mounted() {
        if (!checkClass(this.$el, 'dg-mask-layer')) {
            addClass(this.$el, 'dg-mask-layer');
        }
        this.through &&
            this.$el.addEventListener('touchmove', e => {
                e.preventDefault();
            });
        const fragment = document.createDocumentFragment();
        fragment.appendChild(this.$el);
        document.body.appendChild(fragment);
    },
};
</script>

<style lang="scss" scoped>
$scale-fade-transition: opacity 0.3s ease-out, transform 0.3s ease-out;
$fade-transition: opacity 0.3s cubic-bezier(0.23, 1, 0.32, 1);
$border-radius: 5px;

.ml-model {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: transparent;
    z-index: 1002;

    .dl-com {
        position: absolute;
        background-color: #fff;
        transition: $scale-fade-transition;
        transform: translateZ(0);
    }

    .dl-middle {
        width: 80%;
        top: 50%;
        left: 10%;
        transform: translate3d(0, -50%, 0);
        border-radius: $border-radius;
        overflow: hidden;
    }

    .dl-middle-enter,
    .dl-middle-leave-active {
        opacity: 0;
        transform: translate3d(0, -50%, 0) scale(0.7);
    }

    .dl-top {
        top: 0;
        left: 0;
        width: 100%;
    }

    .dl-top-enter,
    .dl-top-leave-active {
        opacity: 0;
        transform: translate3d(0, -100%, 0);
    }

    .dl-right {
        height: 100%;
        right: 0;
        top: 0;
    }

    .dl-right-enter,
    .dl-right-leave-active {
        transform: translate3d(101%, 0, 0);
    }

    .dl-bottom {
        bottom: 0;
        left: 0;
        width: 100%;
    }

    .dl-bottom-enter,
    .dl-bottom-leave-active {
        opacity: 0;
        transform: translate3d(0, 101%, 0);
    }

    .dl-left {
        height: 100%;
        left: 0;
    }

    .dl-left-enter,
    .dl-left-leave-active {
        opacity: 0;
        transform: translate3d(-100%, 0, 0);
    }

    .dl-opy,
    .dl-opy-leave-active {
        opacity: 0;
    }
}

.ml-mask-bg {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.34);
    z-index: -1;
    transition: $fade-transition;
}

.ast-model {
    .dl-com {
        background-color: transparent;
    }
}

.ml-mask-clarity {
    background-color: transparent;
}
</style>
