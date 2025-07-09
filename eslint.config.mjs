// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  rules: {
    // Disable stylistic rules
    '@stylistic/comma-dangle': 'off',
    '@stylistic/semi': 'off',
    '@stylistic/brace-style': 'off',
    '@stylistic/quotes': 'off',

    // Disable TypeScript rules
    '@typescript-eslint/no-explicit-any': 'off',

    // Disable Vue stylistic rules
    'vue/html-indent': 'off',
    'vue/max-attributes-per-line': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/multiline-html-element-content-newline': 'off',
    'vue/html-self-closing': 'off',
    'vue/html-closing-bracket-newline': 'off'
  }
})
