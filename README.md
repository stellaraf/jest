<div align="center">
  <br/>
  <img src="https://res.cloudinary.com/stellaraf/image/upload/v1604277355/stellar-logo-gradient.svg" width="300" />
  <br/>
  <h3>Stellar Jest Configuration</h3>
  <br/>
  <a href="https://github.com/stellaraf/jest/actions?query=workflow%3ATests">
    <img src="https://img.shields.io/github/workflow/status/stellaraf/jest/Tests?color=%239100fa&event=push&style=for-the-badge" />
  </a>
  <br/>
  <br/>
</div>

# Usage

## Basic

```ts
// jest.config.ts or jest.config.js
export { base as default } from "@stellaraf/jest";
```

## Override Configuration

```ts
import { standardConfig } from "@stellaraf/jest";

export default standardConfig(
  // Transform overrides passed to esbuild-jest
  { platform: "node" },
  // Jest configuration overrides
  { displayName: "Too cool for school" }
);
```

## Monorepo

```ts
import { monorepoConfig } from "@stellaraf/jest";

// Overrides from standardConfig() are also supported
export default monorepoConfig("@scope/");
```
