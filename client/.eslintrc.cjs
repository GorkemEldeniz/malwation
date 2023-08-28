module.exports = {
  overrides: [
    {
      files: ["*.ts", "*.tsx", "*.js"],
      parser: "@typescript-eslint/parser",
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
  plugins: ["react", "@typescript-eslint", "prettier", "simple-import-sort"],
  ignorePatterns: [
    "tailwind.config.js",
    "postcss.config.js",
    "__generated__/globalTypes.ts",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    tsconfigRootDir: __dirname,
    project: "./tsconfig.json",
  },
  rules: {
    "@typescript-eslint/no-unused-vars": "warn",
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "react/jsx-props-no-spreading": 0,
    "react/react-in-jsx-scope": 0,
    "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
  },
};
