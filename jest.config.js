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
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
        },
    },
    coveragePathIgnorePatterns: [
        'docs',
        'config',
        'coverage',
        'dist',
        'types',
        'health',
        'store',
        '.env.ts',
        '.module.ts',
        '.controller.ts',
        '.repository.ts',
        '.entity.ts',
        '.dto.ts',
        '/constants/',
    ],
};
