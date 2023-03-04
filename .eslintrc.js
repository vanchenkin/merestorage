module.exports = {
    parserOptions: {
        project: ['./backend/tsconfig.json'],
    },
    plugins: ['@typescript-eslint/eslint-plugin'],
    extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
    ],
    root: true,
    env: {
        node: true,
        jest: true,
    },
    ignorePatterns: ['.eslintrc.js'],
    rules: {
        "@typescript-eslint/no-unused-vars": "error",
        "@typescript-eslint/no-explicit-any": "warn",
        "eqeqeq": "error",
    },
    overrides: [
        {
            files: ['**/__tests__/**'],
            plugins: ["jest"],
            extends: ["plugin:jest/recommended"],
        },
        {
            files: ['*.tsx', 'client/**'],
            parserOptions: {
                project: ['./client/tsconfig.json'],
            },
            extends: ["plugin:react/recommended"],
        },
        {
            files: ['backend/**'],
            parserOptions: {
                project: ['./backend/tsconfig.json'],
            },
        },
    ],
};
