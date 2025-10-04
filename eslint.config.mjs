import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import jsdoc from "eslint-plugin-jsdoc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      jsdoc,
      'no-comments': {
        rules: {
          'no-comments': {
            create(context) {
              const sourceCode = context.getSourceCode();
              
              return {
                Program() {
                  const comments = sourceCode.getAllComments();
                  
                  comments.forEach(comment => {
                    context.report({
                      node: comment,
                      message: 'Comments are not allowed in this codebase'
                    });
                  });
                }
              };
            }
          }
        }
      }
    },
    rules: {
      "@typescript-eslint/no-unused-vars": ["error", {
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_",
        "ignoreRestSiblings": true
      }],
      "no-unused-vars": "off",
      
      // DISALLOW ALL COMMENTS
      "no-comments/no-comments": "error",
      "no-inline-comments": "error",
      "spaced-comment": "off",
      "capitalized-comments": "off",
      "multiline-comment-style": "off",
      "no-warning-comments": "off",
      
      // JSDoc rules for better documentation
      "jsdoc/check-alignment": "error",
      "jsdoc/check-indentation": "error",
      "jsdoc/check-param-names": "error",
      "jsdoc/check-syntax": "error",
      "jsdoc/check-tag-names": "error",
      "jsdoc/empty-tags": "error",
      "jsdoc/no-undefined-types": "error",
      "jsdoc/require-description": "warn",
      "jsdoc/require-param": "warn",
      "jsdoc/require-param-description": "warn",
      "jsdoc/require-param-name": "error",
      "jsdoc/require-returns": "warn",
      "jsdoc/require-returns-description": "warn"
    },
  },
];

export default eslintConfig;
