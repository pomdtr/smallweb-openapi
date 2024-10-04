// ex. scripts/build_npm.ts
import { build, emptyDir } from "jsr:@deno/dnt";
import manifest from "../deno.json" with { type: "json" };

await emptyDir("./npm");

await build({
    entryPoints: ["./mod.ts"],
    outDir: "./npm",
    shims: {
        // see JS docs for overview and more options
        deno: true,
    },
    package: {
        // package.json properties
        name: "smallweb",
        version: manifest.version,
        description: "Types for smallweb",
        license: "MIT",
        repository: {
            type: "git",
            url: "git+https://github.com/pomdtr/smallweb",
        },
        bugs: {
            url: "https://github.com/pomdtr/smallweb/issues",
        },
    },
    postBuild() {
        // steps to run after building and before running the tests
        Deno.copyFileSync("LICENSE", "npm/LICENSE");
        Deno.copyFileSync("README.md", "npm/README.md");
    },
});
