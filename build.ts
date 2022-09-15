import esbuild from "esbuild";

import type { Format, BuildOptions } from "esbuild";

async function build(format: Exclude<Format, "iife">): Promise<void> {
    const extension = format === "cjs" ? "cjs" : "mjs";
    const outfile = `dist/index.${extension}`;
    const options: BuildOptions = {
        bundle: true,
        target: ["esnext"],
        format,
        entryPoints: ["src/index.ts"],
        outfile,
    };
    const result = await esbuild.build(options);
    for (const error of result.errors) {
        console.error(error.text);
    }
    for (const warning of result.warnings) {
        console.warn(warning.text);
    }
}

build("esm");
build("cjs");
