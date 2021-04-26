module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', [
      'build', 'chore', 'ci', 'feat', 'docs', 'fix', 'perf', 'revert', 'refactor', 'style', 'test', 'init', 'build', 'release', 'delete'
     ]],
  }
};
