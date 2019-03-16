module.exports = {
  "roots": [
    "<rootDir>/src/common",
    "<rootDir>/src/private",
    "<rootDir>/src/public"
  ],
  "transform": {
    "^.+\\.tsx?$": "ts-jest"
  },
  "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json"
  ],
}
