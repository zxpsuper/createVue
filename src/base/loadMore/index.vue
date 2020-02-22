<template>
    <div class="load-more">
        <slot></slot>
    </div>
</template>
<script>
function debounce(event, time) {
    let timer = null;
    return function(...args) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            timer = null;
            event.apply(this, args);
        }, time);
    };
}

export default {
    props: {
        finish: {
            type: Boolean,
            default: false,
        }, // 是否加载完成
    },
    data() {
        return {
            loading: false, // 是否正在加载中
            domHeight: 0, // 内容可视区的高度
            container: null, // 绑定能被监听滚动的元素
        };
    },
    mounted() {
        this.container = this.$el;
        this.domHeight = this.$el.clientHeight;
        this.bindSrcoll();
        this.switchBottom();

    },
    // 视图数据更新，重新调用
    updated() {
        this.switchBottom();
    },
    // 如果有用到keep-alive，组件激活时调用
    activated() {
        this.switchBottom();
    },
    beforeDestroy() {
        this.unScroll();
    },
    methods: {
        scrollPage: debounce(function() {
            if (!this.$el) {
                return;
            }
            // 获取内容向上滚动了多少距离
            var domScrollTop = this.container.scrollTop;
            // 当内容滚动到距离底部<50时,且没有加载完成&&没有正在加载中
            // 内容距离底部多少距离 = 内容总高度-滚动高度-当前可视高度
            if (
                this.container.scrollHeight - domScrollTop - this.domHeight <
                    50 &&
                !this.loading &&
                !this.finish
            ) {
                // 设置为正在加载中
                this.loading = true;
                // 0.5秒后执行父组件接口方法

                setTimeout(() => {
                    this.$emit('loadMore');
                    console.log('滚动触发loadmore');
                }, 100);
            }
        }, 20),
        switchBottom() {
            this.$nextTick(() => {
                this.loading = false;
            });
        },
        bindSrcoll() {
            this.unScroll();
            if (this.container) {
                this.container.addEventListener('scroll', this.scrollPage);
            }
        },
        unScroll() {
            if (this.container) {
                this.container.removeEventListener('scroll', this.scrollPage);
            }
        },
    },
};
</script>
<style scoped>
.load-more {
    overflow: auto;
}
</style>
