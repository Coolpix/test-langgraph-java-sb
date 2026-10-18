import tseslint from 'typescript-eslint'

export default [
  ...tseslint.configs.recommended,
  {
    files: ['src/**/*.ts'],
    rules: { 'no-debugger': 'error', 'no-constant-condition': 'error' },
  },
]
