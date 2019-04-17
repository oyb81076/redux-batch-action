module.exports = {
  clearMocks: true,
  coverageDirectory: "coverage",
  coveragePathIgnorePatterns: ["/node_modules/", "/tests/"],
  globals: { "ts-jest": { "tsConfig": "tsconfig.json" } },
  moduleFileExtensions: ["ts", "tsx", "js"],
  testEnvironment: "node",
  testMatch: ["<rootDir>/tests/*.+(test|spec)\.(ts|tsx)"],
  testPathIgnorePatterns: ["/node_modules/"],
  testURL: "http://localhost",
  transform: { "^.+\\.(ts|tsx)$": "ts-jest" },
  transformIgnorePatterns: ["/node_modules/"],
};