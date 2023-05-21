module.exports = {
    testEnvironment: 'node',
    modulePathIgnorePatterns: ['dist'],
    transform: {
        '^.+\\.(ts|tsx)$': [
            'ts-jest',
            {
                isolatedModules: true,
                diagnostics: false,
                tsconfig: 'backend/tsconfig.json',
            },
        ],
    },
    testPathIgnorePatterns: ['dist'],
};
