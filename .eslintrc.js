// extends: ['react-app', 'airbnb', 'prettier',  'prettier/react' ],

module.exports = {
  extends: ['react-app', 'airbnb', 'prettier', 'prettier/react'],
  settings: {
    'import/resolver': {
      'babel-module': {},
      'babel-module-alias': {},
    },
  },
  env: {
    node: true,
    browser: true,
    commonjs: true,
    es6: true,
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 7,
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true,
    },
    sourceType: 'module',
  },
  plugins: ['react', 'jsx-a11y', 'import', 'prettier'],
  rules: {
    // Ignore Rules
    'space-infix-ops': 2,
    strict: 1,
    'space-before-function-paren': 0,
    'no-underscore-dangle': 0,
    'no-mixed-requires': 0,
    'no-process-exit': 0,
    'no-warning-comments': 0,
    curly: 0,
    'no-confusing-arrow': 0,
    'arrow-parens': [2, 'as-needed', { requireForBlockBody: true }],
    'no-alert': 0,
    // Warnings
    'no-debugger': 1,
    'no-empty': 1,
    'no-invalid-regexp': 1,
    'no-unused-expressions': 1,
    'no-native-reassign': 1,
    'no-fallthrough': 1,
    'handle-callback-err': 1,
    camelcase: 0,
    'max-len': [2, 80],
    'newline-per-chained-call': ['error', { ignoreChainWithDepth: 3 }],
    // Errors
    'func-call-spacing': ['error', 'never'],
    'no-undef': 2,
    'no-dupe-keys': 2,
    'no-empty-character-class': 2,
    'no-self-compare': 2,
    'valid-typeof': 2,
    'no-unused-vars': 1,
    'no-multi-spaces': [
      2,
      {
        exceptions: { Property: true },
      },
    ],
    //  "handle-callback-err": 2,
    'no-shadow-restricted-names': 2,
    'no-new-require': 2,
    'no-mixed-spaces-and-tabs': 2,
    // stylistic errors
    'new-cap': 2,
    'semi-spacing': 2,
    'array-bracket-spacing': [
      'error',
      'always',
      {
        singleValue: true,
        objectsInArrays: false,
        arraysInArrays: false,
      },
    ],
    indent: [
      'error',
      2,
      {
        FunctionDeclaration: { body: 1, parameters: 'first' },
        FunctionExpression: { body: 1, parameters: 'first' },
        MemberExpression: 1,
        ObjectExpression: 'first',
        VariableDeclarator: 0,
      },
    ],
    quotes: [
      2,
      'single',
      {
        avoidEscape: true,
        allowTemplateLiterals: true,
      },
    ],
    'key-spacing': [
      2,
      {
        singleLine: {
          beforeColon: false,
          afterColon: true,
          mode: 'minimum',
        },
        multiLine: {
          beforeColon: false,
          // afterColon: true,
          mode: 'minimum',
          // align: 'value',
        },
      },
    ],
    'lines-around-comment': [
      'error',
      {
        beforeBlockComment: true,
        afterBlockComment: false,
        beforeLineComment: true,
        afterLineComment: false,
        allowBlockStart: true,
        allowBlockEnd: true,
        allowObjectStart: true,
        allowObjectEnd: true,
        allowArrayStart: true,
        allowArrayEnd: true,
      },
    ],
    'object-curly-spacing': [
      'error',
      'always',
      {
        arraysInObjects: false,
        objectsInObjects: false,
      },
    ],
    'object-curly-newline': [
      'error',
      {
        ObjectExpression: { multiline: true, minProperties: 5 },
        ObjectPattern: { multiline: true },
      },
    ],
    'newline-after-var': ['error', 'always'],
    // 'object-property-newline': ['error', { allowMultiplePropertiesPerLine: true }],
    'line-comment-position': ['error', { position: 'above' }],
    'brace-style': [
      'error',
      '1tbs',
      {
        allowSingleLine: true,
      },
    ],

    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'ignore',
      },
    ],
    'no-trailing-spaces': ['error', { skipBlankLines: true }],
    'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1 }],
    'rest-spread-spacing': ['error', 'never'],
    'sort-imports': [
      'error',
      {
        ignoreCase: true,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'single', 'all', 'multiple'],
      },
    ],

    //  Plugin rules
    'jsx-quotes': 1,
    'jsx-a11y/href-no-hash': 0,
    'react/jsx-href-no-hash': 0,
    'react/jsx-no-undef': 'off',
    'react/jsx-uses-react': 1,
    'react/jsx-uses-vars': 1,
    'react/no-did-mount-set-state': 1,
    'react/no-did-update-set-state': 1,
    'react/no-multi-comp': 1,
    'react/prop-types': 1,
    'react/react-in-jsx-scope': 1,
    'react/self-closing-comp': 1,
    'react/jsx-wrap-multilines': 1,
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/jsx-equals-spacing': [2, 'never'],

    // prettier
    // 'prettier/prettier': 'off',
    'prettier/prettier': [
      'off',
      {
        trailingComma: 'all',
        bracketSpacing: false,
        jsxBracketSameLine: true,
        // parser: 'babylon',
      },
    ],
    // imports-plugins
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
        groups: [
          ['builtin', 'external'],
          ['internal', 'index'],
          ['parent', 'sibling'],
        ],
      },
    ],

    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
        optionalDependencies: false,
        peerDependencies: false,
      },
    ],
  },
};
