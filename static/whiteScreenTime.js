function WhiteScreenTime() {
    this.lastModifyTime = new Date().getTime()
}
WhiteScreenTime.prototype.updateLastModifyTime = function() {
    this.lastModifyTime = new Date().getTime()
    let that = this
    let imgs = document.getElementsByTagName('img')
    for (let item of imgs) {
        item.onload = function(params) {
            that.lastModifyTime = new Date().getTime()
        }
    }
}
WhiteScreenTime.prototype.showData = function() {
    let t = performance.timing
    console.log(
        'DNS查询耗时 ：' + (t.domainLookupEnd - t.domainLookupStart).toFixed(0) + 'ms'
    )
    console.log(
        'TCP链接耗时 ：' + (t.connectEnd - t.connectStart).toFixed(0) + 'ms'
    ) 
    console.log(
        'request请求耗时 ：' +
            (t.responseEnd - t.responseStart).toFixed(0) +
            'ms'
    )
    console.log(
        '解析dom树耗时 ：' +
            (t.domComplete - t.domInteractive).toFixed(0) +
            'ms'
    )
    
    console.log(
        'domready时间 ：' +
            (t.domContentLoadedEventEnd - t.navigationStart).toFixed(0) +
            'ms'
    )
    console.log(
        'onload时间 ：' + (t.loadEventEnd - t.navigationStart).toFixed(0) + 'ms'
    )
    console.log(
        '白屏时间 ：' +
            (t.responseStart - t.navigationStart).toFixed(0) +
            'ms（浏览器开始渲染 <body> 标签或者解析完 <head> 标签的时刻就是页面白屏结束的时间点）'
    )
    console.log(
        '首屏时间 ：' +
            (this.lastModifyTime - t.navigationStart).toFixed(0) +
            'ms（最后一张图片加载时间减浏览器处理当前网页的启动时间）'
    )
    if ((t = performance.memory)) {
        console.log(
            'js内存使用占比 ：' +
                ((t.usedJSHeapSize / t.totalJSHeapSize) * 100).toFixed(2) +
                '%'
        )
    }
}
window.whiteScreenTime = new WhiteScreenTime()
window.onload = function() {
    window.whiteScreenTime.updateLastModifyTime()
}
