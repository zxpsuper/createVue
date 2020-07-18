import { RGBA_REG, HEXCOLOR_REG } from './const'
/**
 * 十六进制颜色转rgba
 * @param {String} hexColor
 */
export function hexColorToRgba(hexColor) {
    // 16进制颜色值的正则
    if (!isHexColor(hexColor)) {
        throw new Error('[mplayer error] color is wrong')
    } else {
        // 把颜色值变成小写
        var color = hexColor.toLowerCase()
        if (color.length === 4) {
            var colorNew = '#'
            for (var i = 1; i < 4; i += 1) {
                colorNew += color.slice(i, i + 1).concat(color.slice(i, i + 1))
            }
            color = colorNew
        }
        // 处理六位的颜色值，转为RGB
        var colorChange = []
        for (let i = 1; i < 7; i += 2) {
            colorChange.push(parseInt('0x' + color.slice(i, i + 2)))
        }
        return 'rgba(' + colorChange.join(',') + ',1)'
    }
}

/**
 * 将颜色转化为带 alpha值的 rgba 颜色
 * @param {String} color rgba颜色 或 16进制颜色
 * @param {Number} Alpha Alpha值 0 - 1
 */
export function setRgbaByAlpha(color, Alpha) {
    if (!isHexColor(color) && isColorRgba(color)) {
        throw new Error('[mplayer error] color is wrong!!')
    }
    if (isHexColor(color)) color = hexColorToRgba(color)
    let arr = color.match(/(\d+),\s*(\d+),\s*(\d+),?\s*(\d+)?/).slice(1)
    arr[3] = Alpha
    return 'rgba(' + arr.join(',') + ')'
}

/**
 * 判断是否为十六进制颜色
 * @param {String} color
 */
export function isHexColor(color) {
    if (typeof color !== 'string') {
        throw new Error('[mplayer error] color should be string type')
    }
    return HEXCOLOR_REG.test(color)
}

/**
 * 判断是否为rgba颜色
 * @param {String} color
 */
export function isColorRgba(color) {
    if (typeof color !== 'string') {
        throw new Error('[mplayer error] color should be string type')
    }
    return RGBA_REG.test(color)
}

/**
 * 判断是否为 dom 元素
 * @param {HTMLElement} node
 */
export function isDom(node) {
    if (typeof HTMLElement === 'object') {
        return node instanceof HTMLElement
    } else {
        return (
            node &&
            typeof node === 'object' &&
            node.nodeType === 1 &&
            typeof node.nodeName === 'string'
        )
    }
}
/**
 * 获取 uuid
 */
export function getUUID() {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
    }
    return (
        S4() +
        S4() +
        '-' +
        S4() +
        '-' +
        S4() +
        '-' +
        S4() +
        '-' +
        S4() +
        S4() +
        S4()
    )
}
