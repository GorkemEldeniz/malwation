module.exports = {
  overrides: [
    {
      files: ["*.ts", "*.tsx", "*.js"],
      parser: "@typescript-eslint/parser",
    },
    {
      files: ["*.js", "*.jsx", "*.ts", "*.tsx"],
      rules: {
        "simple-import-sort/imports": [
          "error",
          {
            groups: [
              // Packages `react` related packages come first.
              ["^react", "^@?\\w"],
              // Internal packages.
              ["^(@|components)(/.*|$)"],
              // Side effect imports.
              ["^\\u0000"],
              // Parent imports. Put `..` last.
              ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
              // Other relative imports. Put same-folder imports and `.` last.
              ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
              // Style imports.
              ["^.+\\.?(css)$"],
            ],
          },
        ],
      },
    },
  ],
  root: true,
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "airbnb",
    "airbnb-typescript",
    "airbnb/hooks",
    "plugin:prettier/recommended",
    "plugin:tailwindcss/recommended",
  ],
  ignorePatterns: ["tailwind.config.js", "postcss.config.js"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    tsconfigRootDir: __dirname,
    project: "./tsconfig.json",
  },
  plugins: ["react", "@typescript-eslint", "prettier", "simple-import-sort"],
  rules: {
    "@typescript-eslint/no-unused-vars": "warn",
    "react/jsx-props-no-spreading": 0,
    "react/react-in-jsx-scope": 0,
    "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
  },
};
