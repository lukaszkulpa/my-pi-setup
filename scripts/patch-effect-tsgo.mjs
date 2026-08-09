import { spawnSync } from "node:child_process";
import { createRequire } from "node:module";

const require = createRequire(new URL("../package.json", import.meta.url));
let cliPath;

try {
  cliPath = require.resolve("@effect/tsgo/dist/effect-tsgo.js");
} catch (error) {
  if (error?.code !== "MODULE_NOT_FOUND") throw error;
  console.log("Skipping Effect TS-Go patch (development dependency omitted).");
  process.exit(0);
}

const result = spawnSync(process.execPath, [cliPath, "patch"], {
  stdio: "inherit",
});
if (result.error) throw result.error;
process.exit(result.status ?? 1);
