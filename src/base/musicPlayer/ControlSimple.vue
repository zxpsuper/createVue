<template>
    <div class="container">
        <span @click="$emit('prev')">
            <svg
                t="1594726285293"
                class="icon prev"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="8600"
                width="200"
                height="200"
            >
                <path
                    d="M0 872V152c0-13.2 10.8-24 24-24h80c13.2 0 24 10.8 24 24v303.8L471 142.8C512.2 108.6 576 137.2 576 192v263.8L919 142.8C960.2 108.6 1024 137.2 1024 192v640c0 54.8-63.8 83.4-105 49.2L576 570.6V832c0 54.8-63.8 83.4-105 49.2L128 570.6V872c0 13.2-10.8 24-24 24H24c-13.2 0-24-10.8-24-24z"
                    p-id="8601"
                ></path>
            </svg>
        </span>
        <span v-if="status === 'playing'" @click="$emit('toggle-play', false)">
            <svg
                t="1594726644301"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="9624"
                width="200"
                height="200"
            >
                <path
                    d="M352 958H160c-53 0-96-43-96-96V158c0-53 43-96 96-96h192c53 0 96 43 96 96v704c0 53-43 96-96 96z m608-96V158c0-53-43-96-96-96h-192c-53 0-96 43-96 96v704c0 53 43 96 96 96h192c53 0 96-43 96-96z"
                    p-id="9625"
                ></path>
            </svg>
        </span>

        <span v-else @click="$emit('toggle-play', true)">
            <svg
                t="1594726615962"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="9446"
                width="200"
                height="200"
            >
                <path
                    d="M912.724884 429.355681L208.797545 13.198638C151.603449-20.597874 64.01249 12.198741 64.01249 95.790112V927.904219c0 74.992259 81.391599 120.187594 144.785055 82.591475l703.927339-415.957064c62.793518-36.996181 62.993498-128.186768 0-165.182949z"
                    p-id="9447"
                ></path>
            </svg>
        </span>
        <span @click="$emit('next')">
            <svg
                t="1594726299178"
                class="icon next"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="8778"
                width="200"
                height="200"
            >
                <path
                    d="M1024 152v720c0 13.2-10.8 24-24 24h-80c-13.2 0-24-10.8-24-24V568.2L553 881.2c-41.2 34.4-105 5.6-105-49.2V568.2L105 881.2C63.8 915.6 0 886.8 0 832V192c0-54.8 63.8-83.4 105-49.2L448 453.6V192c0-54.8 63.8-83.4 105-49.2L896 453.6V152c0-13.2 10.8-24 24-24h80c13.2 0 24 10.8 24 24z"
                    p-id="8779"
                ></path>
            </svg>
        </span>
    </div>
</template>

}
<script>
export default {
    name: 'controlSimple',
    props: {
        status: {
            type: String,
            default: 'pause',
        },
    },
}
</script>

<style lang="scss" scoped>
.container {
    font-size: 16px;
    user-select: none;
    span {
        margin: 0 4px;
        svg {
            width: 18px;
            height: 18px;
            vertical-align: middle;
        }
    }
}
</style>
