module.exports = {
  clearMocks: true,
  coverageDirectory: "coverage",
  coveragePathIgnorePatterns: ["/node_modules/"],
  globals: { "ts-jest": { "tsConfig": "tsconfig.json" } },
  moduleFileExtensions: ["ts", "tsx", "js"],
  testEnvironment: "node",
  testMatch: ["**/__tests__/*.+(test|spec)\.(ts|tsx)"],
  testPathIgnorePatterns: ["/node_modules/"],
  testURL: "http://localhost",
  transform: { "^.+\\.(ts|tsx)$": "ts-jest" },
  transformIgnorePatterns: ["/node_modules/"],
};