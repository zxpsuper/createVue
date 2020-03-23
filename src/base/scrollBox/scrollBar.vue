<template>
    <div class="scrollbar">
        <div
            class="scrollbar__thumb"
            :style="{
                height: itemHeight + 'px',
                transform: `translateY(${-scrollY}px)`,
            }"
        ></div>
    </div>
</template>

<script>
export default {
    name: 'ScrollBar',
    props: {
        itemHeight: {
            type: Number,
            default: 0,
        },
        scrollY: {
            type: Number,
            default: 0,
        },
    },
}
</script>

<style scoped>
.scrollbar {
    position: absolute;
    right: 2px;
    bottom: 2px;
    z-index: 1050;
    border-radius: 4px;
    transition: opacity 0.12s ease-out;
    width: 6px;
    top: 2px;
}
.scrollbar__thumb {
    position: relative;
    display: block;

    cursor: pointer;
    border-radius: inherit;
    background-color: rgba(144, 147, 153, 0.9);
    transition: all 0.3s;
    width: 100%;
}
.scrollbar__thumb:hover {
    background-color: rgba(144, 147, 153, 0.5);
}
</style>
