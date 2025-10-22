const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    ...tsJestTransformCfg,
  },
  moduleFileExtensions: ["ts", "js", "json"],
  roots: ["<rootDir>/test"],
  setupFilesAfterEnv: [],
  verbose: true,
  detectOpenHandles: true,
  forceExit: true,
};
