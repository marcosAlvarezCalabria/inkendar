import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { english } from "../src/i18n/landing.ts";

const projectRoot = new URL("../", import.meta.url);
const publicSurfacePaths = [
  "src/pages/index.astro",
  "src/i18n/landing.ts",
  "docs/design/landing-surface-brief.md",
];

const publicSurfaces = await Promise.all(
  publicSurfacePaths.map(async (path) => [path, await readFile(new URL(path, projectRoot), "utf8")]),
);

for (const [path, source] of publicSurfaces) {
  assert.doesNotMatch(source, /whatsapp/i, `${path} must not present WhatsApp as an Inkendar channel`);
}

const page = publicSurfaces.find(([path]) => path === "src/pages/index.astro")?.[1] ?? "";
assert.match(page, /<div class="source"><b>FB<\/b>/, "The hero mockup must include Facebook");
assert.match(
  page,
  /<div class="story__channels"[^>]*><span>WEB<\/span><span>INSTAGRAM<\/span><span>FACEBOOK<\/span><\/div>/,
  "The story must name web, Instagram and Facebook",
);
assert.match(
  page,
  /<select name="channel"[^>]*><option[^>]*>Selecciona uno<\/option><option[^>]*>Formulario web<\/option><option>Instagram<\/option><option>Facebook<\/option><\/select>/,
  "The pilot form must offer only the website, Instagram and Facebook",
);
assert.ok(!("modal.channel.inperson" in english), "Obsolete in-person/phone channel copy must be removed");
assert.match(
  page,
  /Instagram y Facebook se conectarán cuando sus sistemas oficiales lo permitan\./,
  "Spanish copy must keep future Meta integrations conditional",
);

assert.equal(english["story.channels.aria"], "Entry channels: website, Instagram and Facebook");
assert.equal(
  english["story.connected"],
  "This is how the final product will work. Instagram and Facebook will connect when their official systems allow it.",
);
assert.match(english["features.inbox.note"], /Instagram and Facebook will be added after .* validated\./);

console.log("Public channel check passed: website, Instagram and Facebook are consistent in Spanish and English.");
