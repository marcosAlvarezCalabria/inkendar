import { readFile } from "node:fs/promises";
import { english } from "../src/i18n/landing.ts";

const source = await readFile(new URL("../src/pages/index.astro", import.meta.url), "utf8");
const staticKeys = [...source.matchAll(/data-i18n(?:-aria|-placeholder|-alt)?="([^"]+)"/g)].map((match) => match[1]);
const dynamicPrefixes = ["features.", "plans."];
const missing = [...new Set(staticKeys.filter((key) => !(key in english)))];
const orphaned = Object.keys(english).filter((key) => !staticKeys.includes(key) && !dynamicPrefixes.some((prefix) => key.startsWith(prefix)) && !["meta.title", "meta.description", "modal.loading"].includes(key));

if (missing.length) {
  console.error(`Missing English translations:\n${missing.join("\n")}`);
  process.exitCode = 1;
} else {
  console.log(`i18n check passed: ${new Set(staticKeys).size} static keys covered.`);
}

if (orphaned.length) console.warn(`Unused translations:\n${orphaned.join("\n")}`);
