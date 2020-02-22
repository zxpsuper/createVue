<template>
  <div>
    <LoadMore style="color: red; height: 200px" @loadMore="loadMore" :finish="finish">
      <div>
        <div v-for="item in num" style="line-height: 80px">{{item}}</div>
      </div>
    </LoadMore>
  </div>
</template>

<script>
import LoadMore from '@/base/loadMore'
export default {
  components: {
    LoadMore
  },
  data() {
    return {
      num: 0,
      finish: false
    }
  },
  created() {
    setTimeout(() => {
      this.num = 10
    }, 2000);
  },
  methods: {
    loadMore() {
      console.log('触发loadmore')
      if (this.num > 40) {
        this.finish = true
        return
      }
      setTimeout(() => {
        this.num += 10
      }, 2000);
    }
  }
}
</script>

<style>

</style>