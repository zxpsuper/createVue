module.exports = {
    ciType: [
        {
            type: 'list',
            name: 'type',
            message: '请选择本次提交的类型:',
            choices: [
                {
                    name: '✨  引入新特性',
                    value: ':sparkles: 引入新特性 ',
                },
                {
                    name: '🎨  改进代码的结构格式',
                    value: ':art: 改进代码的结构/格式 ',
                },
                {
                    name: '🐛  修复 bug',
                    value: ':bug: 修复 bug ',
                },
                {
                    name: '⚡️  提升性能',
                    value: ':zap: 提升性能 ',
                },
                {
                    name: '🔥  删除代码或文件',
                    value: ':new: 删除代码或文件 ',
                },
                {
                    name: '💄  更新用户界面和样式文件',
                    value: ':lipstick: 更新用户界面和样式文件',
                },
                {
                    name: '🔧  更改配置文件',
                    value: ':wrench: 更改配置文件 ',
                },
                {
                    name: '🚧  工作进行中',
                    value: ':construction: 工作进行中 ',
                },
                {
                    name: '📝  撰写文档',
                    value: ':memo: 撰写文档 ',
                },
                {
                    name: '✅  增加测试',
                    value: ':white_check_mark: 增加测试 ',
                },
                {
                    name: '📦  更新打包文件',
                    value: ':package: 更新打包文件 ',
                },
                {
                    name: '🎉  初次提交',
                    value: ':tada: 初次提交 ',
                },
                {
                    name: '🔖  发布/版本标签',
                    value: ':bookmark: 发布/版本标签',
                },
                {
                    name: '🚀  部署功能',
                    value: ':rocket: 部署功能 ',
                },
                {
                    name: '👷  CI编译系统',
                    value: ':construction_worker: CI编译系统 ',
                },
                {
                    name: '🌐  国际化与本地化',
                    value: ':globe_with_meridians: 国际化与本地化 ',
                },
            ],
        },
    ],
    ciMsg: {
        type: 'input',
        name: 'msg',
        message: '请输入提交文本:',
        validate: function(value) {
            if (value) {
                return true
            }
            return '文本必须输入!'
        },
    },
    comptName: {
        type: 'input',
        name: 'name',
        message: '请输入组件名称:',
        validate: function(value) {
            if (/^[\-a-z]+$/.test(value)) {
                return true
            }
            return '组件名称只能包含小写字母和横杠(-)!'
        },
    },
    compConfig: [
        {
            type: 'confirm',
            name: 'needConfig',
            message: '是否需要组件配置文件(普通组件不需要)',
            default: false,
        },
    ],
}
