const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    ...tsJestTransformCfg,
  },
  verbose: true,
  forceExit: true,
  clearMocks: true,
  testMatch: ["**/__tests__/**/*.test.ts"],
};
