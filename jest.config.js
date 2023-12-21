// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
module.exports = {
    // Add more setup options before each test is run
    // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    // if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
    moduleDirectories: ["node_modules", "/src"],
    globals: {
        IS_REACT_ACT_ENVIRONMENT: true,
    },

    moduleNameMapper: {
        "\\.(css|scss|sass)$": "identity-obj-proxy",
    },
    //setupFiles: ["<rootDir>/jest.polyfills.ts"],
    setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
    roots: ["<rootDir>/src"],
    testEnvironment: "jest-environment-jsdom",

    testRegex: "(/__tests__/.*|\\.tests?)\\.(ts|tsx)$",
    coverageReporters: process.env.CI ? ["text"] : ["lcov"],
    collectCoverageFrom: ["<rootDir>/src/**/*.{ts,tsx}"],
    coverageDirectory: process.env.DEV_COVERAGE_DIR,
    transformIgnorePatterns: ["/node_modules/(?!react-dnd|dnd-core|@react-dnd)"],

    // transform: {
    //     "/node_modules/(react-dnd|dnd-core|react-dnd-html5-backend)/dist/(.+).js": "ts-jest",
    //     "/node_modules/@react-dnd/(invariant|asap|shallowequal)?/dist/(.+).js": "ts-jest",
    // },
    //transformIgnorePatterns: ["<rootDir>/node_modules/(?!@react-dnd|react-dnd|dnd-core|react-dnd-html5-backend)/"],
};

//  "jest": {
//    "collectCoverageFrom": [
//      "<rootDir>/src/**/*.{ts,tsx}",
//      "!**/node_modules/**",
//      "!**/*.stories.{ts,tsx}"
//    ],
//    "moduleNameMapper": {
//      "\\.(css|scss|sass)$": "identity-obj-proxy"
//    },
//    "testEnvironment": "jest-dom",
//    "roots": [
//      "<rootDir>/src"
//    ],
//    "setupFilesAfterEnv": [
//      "<rootDir>/src/setupTests.js"
//    ]
//  },
