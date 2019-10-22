module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
	env: {
		es6: true,
	},
	extends: [
		'eslint-config-alloy/react',
		'eslint-config-alloy/typescript'
	],
  parserOptions: {
		ecmaFeatures: {
			'jsx': true
		},
		ecmaVersion: 2019,
		sourceType: 'module'
	},
	plugins: [
		'react',
		'react-native',
		'typescript'
	],
	rules: {
		'react/static-property-placement': 'off',
		'complexity': 'off',
		'semi': ['error', 'never'],
		'no-implicit-coercion': 'off',
		'no-undefined': 'off',
		'indent': [
			'error',
			2,
			{
				SwitchCase: 1,
				flatTernaryExpressions: true
			}
		],
		'@typescript-eslint/indent': [
			'error',
			2,
			{
				SwitchCase: 1,
				flatTernaryExpressions: true
			}
		],
		'@typescript-eslint/explicit-member-accessibility': 'off',
		'@typescript-eslint/no-empty-interface': 'off',
		'@typescript-eslint/member-ordering': 'off',
		'@typescript-eslint/no-inferrable-types': 'off',
		'space-before-function-paren': ['error', 'always'],
		'eol-last': ['error', 'always'],
		'comma-dangle': ['error', 'always-multiline'],
		'jsx-quotes': ['error', 'prefer-single'],
		'react/jsx-uses-react': 'warn',
		'react/jsx-indent': ['error', 2],
		'react/jsx-indent-props': ['error', 2],
		'react/jsx-closing-bracket-location': 'off',
		'react/no-deprecated': 'off',
		'no-unused-vars': [2, { args: 'none' }],
		'@typescript-eslint/no-unused-vars': [2, { args: 'none' }]
	}
};