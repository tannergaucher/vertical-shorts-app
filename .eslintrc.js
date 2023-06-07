/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: ["@remix-run/eslint-config", "@remix-run/eslint-config/node"],
  plugins: ["simple-import-sort"],
  rules: {
    "simple-import-sort/imports": "error",
  },
};
