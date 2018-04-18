// const sortObject = require('sort-deep-object-arrays');
//
// const config = {
//   env: { browser: true, commonjs: true, es6: true, node: true },
//   extends: ['airbnb', 'prettier', 'prettier/react', 'react-app'],
//   parser: 'babel-eslint',
//   parserOptions: {
//     ecmaFeatures: { experimentalObjectRestSpread: true, jsx: true },
//     ecmaVersion: 7,
//     sourceType: 'module',
//   },
//   plugins: [
//     'import',
//     'import-order-autofix',
//     'prettier',
//     'react',
//     'sort-imports-es6-autofix',
//   ],
//   settings: {
//     'import/resolver': { 'babel-module': {}, 'babel-module-alias': {} },
//   },
//   rules: {
//     'array-bracket-spacing': [
//       2,
//       'always',
//       { arraysInArrays: false, objectsInArrays: false, singleValue: true },
//     ],
//     'arrow-parens': [2, 'as-needed', { requireForBlockBody: true }],
//     'brace-style': [2, '1tbs', { allowSingleLine: true }],
//     camelcase: 0,
//     'comma-dangle': [
//       1,
//       {
//         arrays: 'always-multiline',
//         exports: 'always-multiline',
//         functions: 'ignore',
//         imports: 'always-multiline',
//         objects: 'always-multiline',
//       },
//     ],
//     curly: 0,
//     'func-call-spacing': [2, 'never'],
//     'func-names': 0,
//     'handle-callback-err': 1,
//     'import-order-autofix/order': [
//       2,
//       {
//         groups: [
//           ['builtin', 'external'],
//           ['index', 'internal', 'parent', 'sibling'],
//         ],
//         'newlines-between': 'always',
//       },
//     ],
//     'import/no-extraneous-dependencies': [
//       0,
//       {
//         devDependencies: true,
//         optionalDependencies: false,
//         peerDependencies: false,
//       },
//     ],
//     'import/order': [
//       2,
//       {
//         groups: [
//           ['builtin', 'external'],
//           ['index', 'internal', 'parent', 'sibling'],
//         ],
//         'newlines-between': 'always',
//       },
//     ],
//     indent: [
//       2,
//       2,
//       {
//         FunctionDeclaration: { body: 1, parameters: 'first' },
//         FunctionExpression: { body: 1, parameters: 'first' },
//         MemberExpression: 1,
//         ObjectExpression: 'first',
//         VariableDeclarator: 0,
//       },
//     ],
//     'jsx-a11y/href-no-hash': 0,
//     'jsx-quotes': 1,
//     'key-spacing': [
//       2,
//       {
//         multiLine: { beforeColon: false, mode: 'minimum' },
//         singleLine: { afterColon: true, beforeColon: false, mode: 'minimum' },
//       },
//     ],
//     'line-comment-position': [2, { position: 'above' }],
//     'lines-around-comment': [
//       2,
//       {
//         afterBlockComment: false,
//         afterLineComment: false,
//         allowArrayEnd: true,
//         allowArrayStart: true,
//         allowBlockEnd: true,
//         allowBlockStart: true,
//         allowObjectEnd: true,
//         allowObjectStart: true,
//         beforeBlockComment: true,
//         beforeLineComment: true,
//       },
//     ],
//     'max-len': [2, 80],
//     'new-cap': 2,
//     'newline-per-chained-call': [2, { ignoreChainWithDepth: 3 }],
//     'no-alert': 0,
//     'no-confusing-arrow': 0,
//     'no-debugger': 1,
//     'no-dupe-keys': 2,
//     'no-empty': 1,
//     'no-empty-character-class': 2,
//     'no-fallthrough': 1,
//     'no-invalid-regexp': 1,
//     'no-mixed-requires': 0,
//     'no-mixed-spaces-and-tabs': 2,
//     'no-multi-spaces': [2, { exceptions: { Property: true } }],
//     'no-multiple-empty-lines': [2, { max: 1, maxEOF: 1 }],
//     'no-native-reassign': 1,
//     'no-new-require': 2,
//     'no-process-exit': 0,
//     'no-self-compare': 2,
//     'no-shadow-restricted-names': 2,
//     'no-trailing-spaces': [2, { skipBlankLines: true }],
//     'no-undef': 'off',
//     'no-underscore-dangle': 0,
//     'no-unused-expressions': 1,
//     'no-unused-vars': 2,
//     'no-warning-comments': 0,
//     'object-curly-newline': [
//       2,
//       {
//         ObjectExpression: { minProperties: 5, multiline: true },
//         ObjectPattern: { multiline: true },
//       },
//     ],
//     'object-curly-spacing': [
//       2,
//       'always',
//       { arraysInObjects: false, objectsInObjects: false },
//     ],
//     'padding-line-between-statements': [
//       2,
//       { blankLine: 'always', next: '*', prev: ['const', 'let', 'var'] },
//       {
//         blankLine: 'any',
//         next: ['const', 'let', 'var'],
//         prev: ['const', 'let', 'var'],
//       },
//     ],
//     'prettier/prettier': [
//       0,
//       {
//         bracketSpacing: false,
//         jsxBracketSameLine: true,
//         semi: true,
//         trailingComma: 'all',
//       },
//     ],
//     quotes: [2, 'single', { allowTemplateLiterals: true, avoidEscape: true }],
//     'react-app/no-undef': 0,
//     'react/jsx-equals-spacing': [2, 'never'],
//     'react/jsx-filename-extension': [0, { extensions: ['.js', '.jsx'] }],
//     'react/jsx-href-no-hash': 0,
//     'react/jsx-no-undef': 'off',
//     'react/jsx-uses-react': 1,
//     'react/jsx-uses-vars': 1,
//     'react/jsx-wrap-multilines': [
//       2,
//       { arrow: true, assignment: true, declaration: true, return: true },
//     ],
//     'react/no-did-mount-set-state': 1,
//     'react/no-did-update-set-state': 1,
//     'react/no-multi-comp': 1,
//     'react/prop-types': 0,
//     'react/react-in-jsx-scope': 1,
//     'react/self-closing-comp': 1,
//     'rest-spread-spacing': [2, 'never'],
//     'semi-spacing': 2,
//     'sort-imports': [
//       0,
//       {
//         ignoreCase: true,
//         ignoreMemberSort: false,
//         // memberSyntaxSortOrder: ['single', 'multiple', 'all', 'none'],
//       },
//     ],
//     'sort-imports-es6-autofix/sort-imports-es6': [
//       0,
//       {
//         ignoreCase: true,
//         ignoreMemberSort: false,
//         memberSyntaxSortOrder: ['single', 'multiple', 'all', 'none'],
//       },
//     ],
//     'space-before-function-paren': 0,
//     'space-infix-ops': 2,
//     strict: 1,
//     'valid-typeof': 2,
//   },
// };
const config = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
    'jest/globals': true,
  },
  extends: ['airbnb', 'plugin:react/recommended', 'prettier', 'prettier/react'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true,
    },
    ecmaVersion: 7,
    sourceType: 'module',
  },
  // )
  plugins: [
    'sort-imports-es6-autofix',
    'import',
    'import-order-autofix',
    'prettier',
    'react',
    'jest',
  ],
  settings: {
    'import/ignore': [/shared/],

    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules'],
      },
      'babel-module': {
        root: ['./src'],
        alias: {
          src: './',
          shared: './shared',
          utils: './shared/utils',
          components: './shared/components',
        },
      },
    },
  },
  rules: {
    'array-bracket-spacing': [
      2,
      'always',
      {
        arraysInArrays: false,
        objectsInArrays: false,
        singleValue: true,
      },
    ],
    'arrow-parens': [
      2,
      'as-needed',
      {
        requireForBlockBody: false,
      },
    ],
    'brace-style': [
      2,
      '1tbs',

      {
        allowSingleLine: true,
      },
    ],
    camelcase: 0,
    'comma-dangle': [
      1,
      {
        arrays: 'always-multiline',
        exports: 'always-multiline',
        functions: 'ignore',
        imports: 'always-multiline',
        objects: 'always-multiline',
      },
    ],
    curly: 0,
    'func-call-spacing': [2, 'never'],
    'func-names': 0,
    'handle-callback-err': 1,
    'import-order-autofix/order': [
      2,
      {
        groups: [
          ['builtin', 'external'],
          ['internal', 'index', 'parent', 'sibling'],
        ],
        'newlines-between': 'always',
      },
    ],
    'import/no-extraneous-dependencies': [
      0,
      {
        devDependencies: true,
        optionalDependencies: false,
        peerDependencies: false,
      },
    ],
    'import/no-unresolved': [2, { ignore: ['shared'] }],
    // "import/extensions": 0,

    'import/order': [
      2,
      {
        groups: [
          ['builtin', 'external'],
          ['internal', 'index', 'parent', 'sibling'],
        ],
        'newlines-between': 'always',
      },
    ],
    'import/prefer-default-export': 0,
    indent: [
      2,
      2,
      {
        FunctionDeclaration: {
          body: 1,
          parameters: 'first',
        },
        FunctionExpression: {
          body: 1,
          parameters: 'first',
        },
        MemberExpression: 1,
        ObjectExpression: 'first',
        VariableDeclarator: 0,
      },
    ],
    'jsx-a11y/href-no-hash': 0,
    'react/jsx-filename-extension': 0,
    'jsx-quotes': 1,
    'key-spacing': [
      2,
      {
        multiLine: {
          beforeColon: false,
          mode: 'minimum',
        },
        singleLine: {
          afterColon: true,
          beforeColon: false,
          mode: 'minimum',
        },
      },
    ],
    'line-comment-position': [
      2,
      {
        position: 'above',
      },
    ],
    'lines-around-comment': [
      2,
      {
        afterBlockComment: false,
        afterLineComment: false,
        allowArrayEnd: true,
        allowArrayStart: true,
        allowBlockEnd: true,
        allowBlockStart: true,
        allowObjectEnd: true,
        allowObjectStart: true,
        beforeBlockComment: true,
        beforeLineComment: true,
      },
    ],
    'max-len': [
      2,
      80,
      {
        ignoreComments: true,
        ignoreTrailingComments: true,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
      },
    ],
    'new-cap': 2,
    'newline-per-chained-call': [
      2,
      {
        ignoreChainWithDepth: 3,
      },
    ],
    'no-alert': 0,
    'no-confusing-arrow': 0,
    'no-debugger': 1,
    'no-dupe-keys': 2,
    'no-empty': 1,
    'no-empty-character-class': 2,
    'no-fallthrough': 1,
    'no-invalid-regexp': 1,
    'no-mixed-requires': 0,
    'no-mixed-spaces-and-tabs': 2,
    'no-multi-spaces': [
      2,
      {
        exceptions: {
          Property: false,
        },
      },
    ],
    'no-multiple-empty-lines': [
      2,
      {
        max: 1,
        maxEOF: 1,
        maxBOF: 1,
      },
    ],
    'no-native-reassign': 1,
    'no-new-require': 2,
    'no-process-exit': 0,
    'no-self-compare': 2,
    'no-shadow': [
      0,
      {
        hoist: 'never',
      },
    ],
    'no-shadow-restricted-names': 2,
    'no-trailing-spaces': [
      2,
      {
        skipBlankLines: false,
      },
    ],
    'no-undef': 2,
    'no-underscore-dangle': 0,
    'no-unused-expressions': 1,
    'no-unused-vars': 2,
    'no-warning-comments': 0,
    'object-curly-newline': [
      2,
      {
        ExportDeclaration: {
          consistent: true,
          minProperties: 5,
          multiline: true,
        },
        ImportDeclaration: {
          consistent: true,
          minProperties: 5,
          multiline: true,
        },
        ObjectExpression: {
          consistent: true,
          minProperties: 5,
          multiline: true,
        },
        ObjectPattern: {
          consistent: true,
          minProperties: 5,
          multiline: true,
        },
      },
    ],
    'object-curly-spacing': [
      2,
      'always',
      {
        arraysInObjects: false,
        objectsInObjects: false,
      },
    ],
    'object-property-newline': [
      2,
      {
        allowAllPropertiesOnSameLine: true,
      },
    ],
    'padded-blocks': [2, 'never'],
    'padding-line-between-statements': [
      2,
      {
        blankLine: 'always',
        next: '*',
        prev: ['const', 'export', 'let', 'var'],
      },
      {
        blankLine: 'always',
        next: ['const', 'export', 'let', 'var'],
        prev: ['const', 'export', 'let', 'var'],
      },
    ],
    'prettier/prettier': [
      0,
      {
        bracketSpacing: false,
        jsxBracketSameLine: false,
        semi: true,
        singleQuote: true,
        trailingComma: 'all',
      },
    ],
    quotes: [
      2,
      'backtick',

      {
        allowTemplateLiterals: true,
        avoidEscape: true,
      },
    ],
    'react-app/no-undef': 0,
    'react/jsx-child-element-spacing': 0,
    'react/jsx-no-undef': 'off',
    'react/jsx-sort-default-props': [
      1,
      {
        ignoreCase: true,
      },
    ],
    'react/jsx-uses-react': 2,
    'react/jsx-uses-vars': 2,
    'react/jsx-wrap-multilines': [
      2,
      {
        arrow: true,
        assignment: true,
        declaration: true,
        return: true,
      },
    ],
    'react/no-multi-comp': 0,
    'react/prop-types': 0,
    'react/self-closing-comp': [
      2,
      {
        component: true,
        html: true,
      },
    ],
    'rest-spread-spacing': [2, 'never'],
    semi: [2, 'always'],
    'semi-spacing': 2,
    'sort-imports': [
      0,
      {
        ignoreCase: true,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'single', 'all', 'multiple'],
      },
    ],
    'sort-imports-es6-autofix/sort-imports-es6': [
      2,
      {
        ignoreCase: true,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'single', 'all', 'multiple'],
      },
    ],
    'space-before-function-paren': 0,
    'space-infix-ops': 2,
    strict: 1,
    'valid-typeof': 2,
    'no-debugger': 0,
  },
};

module.exports = config;
