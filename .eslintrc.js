module.exports = {
    'env': {
        'browser': true,
        'es2021': true,
        'node': true,
    },
    'extends': [
        'plugin:vue/essential',
        'google',
    ],
    'parserOptions': {
        'ecmaVersion': 'latest',
        'sourceType': 'module',
    },
    'plugins': [
        'vue',
    ],
    'rules': {
        'linebreak-style': ['error', 'windows'],
        'indent': ['error', 2],
        'space-before-function-paren': ['error', 'never'],
        'arrow-spacing': ['error', { 'before': true, 'after': true }],
        'space-infix-ops': ['error', { 'int32Hint': true }],
        'prefer-template': ['error'],
        'template-curly-spacing': ['error', 'never'],
        'space-in-parens': ['error', 'never'],
        'new-cap': 'off',
    },
};
