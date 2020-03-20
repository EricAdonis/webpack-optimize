module.exports = {
	root: true,
	env: {
		browser: true,
		es6: true,
		es2017: true,
		es2020: true,
		worker: true,
	},
	extends: [
		'plugin:react/recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:jest/recommended',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		sourceType: 'module',
		tsconfigRootDir: './tsconfig.json',
	},
	plugins: ['react', 'react-hooks', '@typescript-eslint', 'jest'],
	rules: {
		semi: ['error', 'never'],
		'comma-dangle': [
			'error',
			{
				arrays: 'always-multiline',
				objects: 'always-multiline',
				imports: 'always-multiline',
				exports: 'always-multiline',
				functions: 'never',
			},
		],
		quotes: ['error', 'single'],
		// Plugin Fix
		'@typescript-eslint/explicit-function-return-type': 0,
		'@typescript-eslint/no-empty-interface': 0,
		'react/prop-types': 0,
		'@typescript-eslint/interface-name-prefix': 0,
		'@typescript-eslint/member-delimiter-style': 0,
	},
	overrides: [
		{
			files: ['**/*.test.tsx', '**/*.test.ts'],
			env: {
				jest: true,
			},
			globals: {
				page: true,
				browser: true,
				context: true,
			},
		},
	],
	settings: {
		react: {
			version: 'latest',
		},
	},
}
