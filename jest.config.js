module.exports = {
  preset: "ts-jest",
  testEnvironment: "screeps-jest",
  setupFilesAfterEnv: ["<rootDir>/test/jest-env.setup.ts"],
};
