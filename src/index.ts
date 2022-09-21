import type { Config } from "jest";
import type { TransformOptions } from "esbuild";

export const base: Config = {
  collectCoverageFrom: ["<rootDir>/src/**/!(*.spec|test)*.ts"],
  moduleDirectories: ["node_modules"],
  transform: {
    "^.+\\.tsx?$": "esbuild-jest",
  },
  testPathIgnorePatterns: ["node_modules", "jest-config"],
  passWithNoTests: true,
  testMatch: ["<rootDir>/src/**/*.@(spec|test).ts"],
};

/**
 * Create a standard Jest config.
 *
 * @param transformOptions `esbuild` Transform API options to pass to `esbuild-jest`
 * @param extra Additional jest config, will override defaults.
 */
export function standardConfig(
  transformOptions: TransformOptions = {},
  extra: Config = {},
): Config {
  const transform: NonNullable<Config["transform"]> = {
    "^.+\\.tsx?$": ["esbuild-jest", transformOptions as Record<string, unknown>],
  };
  return { ...base, transform, ...extra };
}

/**
 * Create a monorepo-specific Jest config.
 *
 * @param baseScope Scope name, e.g. `@stellaraf/cacheutil-` or `@chakra-ui/`
 * @param transformOptions `esbuild` Transform API options to pass to `esbuild-jest`
 * @param extra Additional jest config, will override defaults.
 */
export function monorepoConfig(
  baseScope: string,
  transformOptions: TransformOptions = {},
  extra: Config = {},
): Config {
  const scope = `^${baseScope}(.*)$`;
  const moduleNameMapper = { [scope]: "<rootDir>/../$1/src" };
  const transform: NonNullable<Config["transform"]> = {
    "^.+\\.tsx?$": ["esbuild-jest", transformOptions as Record<string, unknown>],
  };
  return { ...base, transform, moduleNameMapper, ...extra };
}
