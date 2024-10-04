import * as path from "jsr:@std/path"

const resp = await fetch("https://admin.smallweb.run/openapi.json")
if (!resp.ok) {
    throw new Error("Failed to fetch API manifest")
}

const manifest = await resp.json()
const content = `export default ${JSON.stringify(manifest, null, 2)} as const;`
await Deno.writeTextFile(path.join(import.meta.dirname!, "..", "mod.ts"), content)
