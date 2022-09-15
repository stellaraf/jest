import type { Config } from "jest";

export const jestConfig: Config = {
  collectCoverageFrom: ["<rootDir>/src/**/!(*.spec|test)*.ts"],
  moduleDirectories: ["node_modules"],
  transform: {
    "^.+\\.tsx?$": "jest-esbuild",
  },
  testPathIgnorePatterns: [
    "node_modules",
    "legacy",
    "jest-config",
    "eslint-config-custom",
    "packages/types",
  ],
  passWithNoTests: true,
  testMatch: ["<rootDir>/src/**/*.@(spec|test).ts"],
};

/**
 * Create a Jest Project Configuration.
 *
 * @param name Project name
 * @param testEnvironment Test environment
 * @param overrides Optional configuration overrides
 */
export function createProject(
  name: string,
  testEnvironment: "node" | "miniflare",
  overrides: Config = {},
): Config {
  const { projects, ...rest } = jestConfig;
  const project = {
    ...rest,
    displayName: name,
    testEnvironment,
    ...overrides,
  } as Config;
  if (testEnvironment === "miniflare") {
    project.testEnvironmentOptions = { scriptPath: "src/index.ts", module: true };
  }
  return { ...rest, displayName: name, testEnvironment, ...overrides };
}

export default jestConfig;
