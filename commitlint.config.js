module.exports = {
  extends: ['@commitlint/config-conventional', 'cz'],
  rules: {
    'type-enum': [
      2,
      'always',
      ['Update', 'Fix', 'Remove', 'Refactor', 'Chore', 'Test', 'Doc', 'Style']
    ],
    'type-case': [2, 'always', ['pascal-case']],
    'scope-empty': [2, 'always']
  }
};
