// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
module.exports = {
    // if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
    moduleDirectories: ["node_modules", "/src"],
    globals: {
        IS_REACT_ACT_ENVIRONMENT: true,
    },

    moduleNameMapper: {
        "\\.(css|scss|sass)$": "identity-obj-proxy",
    },

    setupFilesAfterEnv: ["<rootDir>/jest.setup.js", "@testing-library/jest-dom"],
    roots: ["<rootDir>/src"],
    testEnvironment: "jest-environment-jsdom",

    testRegex: "(/__tests__/.*|\\.tests?)\\.(ts|tsx)$",
    coverageReporters: process.env.CI ? ["text"] : ["lcov"],

    coverageDirectory: process.env.DEV_COVERAGE_DIR,
    transformIgnorePatterns: ["/node_modules/(?!react-dnd|dnd-core|@react-dnd)"],
    collectCoverageFrom: ["<rootDir>/src/**/*.{ts,tsx}", "!**/node_modules/**", "!**/*.stories.{ts,tsx}"],
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
