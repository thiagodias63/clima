import { defineConfig, globalIgnores } from 'eslint/config';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import angularEslint from '@angular-eslint/eslint-plugin';
import angularTemplateEslint from '@angular-eslint/eslint-plugin-template';
import angularTemplateParser from '@angular-eslint/template-parser';
import tsParser from '@typescript-eslint/parser';
import jsdoc from 'eslint-plugin-jsdoc';

export default defineConfig([
	globalIgnores([
		'**/karma.conf.js',
		'**/package-lock.json',
		'**/*.yml',
		'**/*.yaml',
		'environments/*.ts',
		'**/wepback.config.js',
		'**/.gitignore',
		'src/primeng-error-suppressor.js',
		'src/ng0100-error-suppressor.js',
		'src/setup-tests.ts',
		'.storybook/',
		'.reversa/',
	]),
	{
		files: ['**/*.ts'],
		...jsdoc.configs['flat/recommended'],
		plugins: {
			'@typescript-eslint': typescriptEslint,
			'@angular-eslint': angularEslint,
			'@angular-eslint/template': angularTemplateEslint,
			jsdoc: jsdoc,
		},

		languageOptions: {
			parser: tsParser,
			ecmaVersion: 5,
			sourceType: 'script',

			parserOptions: {
				project: ['**/tsconfig.json'],
			},
		},

		processor: '@angular-eslint/template/extract-inline-html',

		rules: {
			'no-tabs': ['off'],
			'no-prototype-builtins': ['off'],
			indent: ['off'],
			'linebreak-style': ['off'],
			eqeqeq: ['error', 'always'],

			'max-len': [
				'error',
				{
					code: 140,
					ignorePattern: '^import .*',
				},
			],

			semi: ['error', 'always'],
			'no-unused-expressions': ['error'],
			'no-unused-vars': 'off',
			'@typescript-eslint/no-unused-vars': 2,
			'@typescript-eslint/prefer-readonly': 2,
			'no-console': ['error'],
			'@typescript-eslint/no-non-null-assertion': ['off'],
			'@typescript-eslint/explicit-function-return-type': 2,
			'@typescript-eslint/no-explicit-any': 2,
			'@angular-eslint/component-selector': 2,
			'@angular-eslint/prefer-standalone': 'off',
			'@typescript-eslint/no-explicit-any': 'warn',
			'new-cap': [
				'error',
				{
					capIsNew: true,

					capIsNewExceptions: [
						'Directive',
						'HostBinding',
						'HostListener',
						'Injectable',
						'Input',
						'NgModule',
						'Output',
						'Pipe',
						'ViewChild',
						'ViewChildren',
						'Component',
						'AllIcons',
						'UntilDestroy',
						'Optional',
						'SkipSelf',
						'Inject',
						'ContentChildren',
						'TrackAction',
						'TrackFilterAction',
						'TrackSortAction',
						'TrackClickAction',
						'TrackTimeRangeAction',
						'TrackTabAction',
						'BaseDatadogTracking',
						'TrackOpenAction',
					],

					newIsCap: true,
					properties: true,
				},
			],
		},
	},
	{
		files: ['**/*.html'],
		languageOptions: {
			parser: angularTemplateParser,
		},
		plugins: {
			'@angular-eslint/template': angularTemplateEslint,
		},
		rules: {
			'@angular-eslint/template/prefer-control-flow': 'error',
			'@angular-eslint/template/no-inline-styles': 'error',
		},
	},
]);
