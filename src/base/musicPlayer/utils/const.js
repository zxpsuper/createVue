/**几种播放模式 */
export const PLAYTYPE = ['normal', 'circle', 'single', 'random']

/**播放器主题 */
export const THEME = {
    metal: {
        background: 'linear-gradient(200deg, #7f7280, #000000)',
        textColor: 'rgba(225, 225, 225, 1)',
        iconColor: '#fff',
    },
    blue: {
        background: 'linear-gradient(91deg,#f1eefc,#9dc6ff 70%,#a5bcff)',
        textColor: '#856d72',
        iconColor: '#856d72',
    },
    black: {
        background: '#2C3E50',
        textColor: 'rgba(225, 225, 225, 1)',
        iconColor: '#fff',
    },
    orange: {
        background: 'linear-gradient(to right, #f83600 0%, #f9d423 100%)',
        textColor: 'rgba(225, 225, 225, 1)',
        iconColor: '#fff',
    },
}

/**rgba正则表达式 */
export const RGBA_REG = /^rgba?\((\d+),\s*(\d+),\s*(\d+),?\s*(0\.\d+)\)$|1\)$/

/**16进制颜色正则表达式 */
export const HEXCOLOR_REG = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/
