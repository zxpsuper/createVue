module.exports = {
  ciType: [
    {
      type: 'list',
      name: 'type',
      message: '请选择本次提交的类型:',
      choices: [
        {
          name: '引入新特性',
          value: 'feat(:sparkles:)',
        },
        {
          name: '改进代码的结构格式/样式',
          value: 'style(:art:)',
        },
        {
          name: '修复 bug',
          value: 'fix(:bug:)',
        },
        {
          name: '提升性能',
          value: 'perf(:zap:)',
        },
        {
          name: '删除代码或文件',
          value: 'delete(:new:)',
        },
        {
          name: '其他修改, 比如改变构建流程、或者增加依赖库、工具等',
          value: 'chore(:wrench:)',
        },
        {
          name: '重构',
          value: 'refactor(:construction:)',
        },
        {
          name: '撰写文档',
          value: 'docs(:memo:)',
        },
        {
          name: '增加测试',
          value: 'test(:white_check_mark:)',
        },
        {
          name: '更新打包文件',
          value: 'build(:package:)',
        },
        {
          name: '初次提交',
          value: 'init(:tada:)',
        },
        {
          name: '发布/版本标签',
          value: 'release(:bookmark:)',
        },
        {
          name: '部署功能',
          value: 'deploy(:rocket:)',
        },
        {
          name: '代码回滚',
          value: 'revert',
        },
        {
          name: 'CI持续集成修改',
          value: 'ci(:construction_worker:)',
        },
      ],
    },
  ],
  ciMsg: {
    type: 'input',
    name: 'msg',
    message: '请输入提交文本:',
    validate: function (value) {
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
    validate: function (value) {
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
