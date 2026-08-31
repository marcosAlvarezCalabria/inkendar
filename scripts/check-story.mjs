import { access, readFile } from "node:fs/promises";

const projectRoot = new URL("../", import.meta.url);
const page = await readFile(new URL("src/pages/index.astro", projectRoot), "utf8");
const assets = [
  "/story/01-client-enquiry.webp",
  "/story/02-unified-job-sheet.webp",
  "/story/03-artist-action.webp",
  "/story/04-channel-response.webp",
];

const missingMarkup = [
  'id="recorrido"',
  'aria-labelledby="story-title"',
  "data-story-prev",
  "data-story-next",
  "data-story-current",
  ...assets.map((asset) => `src="${asset}"`),
].filter((fragment) => !page.includes(fragment));

const sceneCount = (page.match(/class="story-scene"/g) ?? []).length;
const subtitleCount = (page.match(/<figcaption data-i18n="story\.scene[1-4]\.subtitle">/g) ?? []).length;
const missingAssets = [];

for (const asset of assets) {
  try {
    await access(new URL(`public${asset}`, projectRoot));
  } catch {
    missingAssets.push(asset);
  }
}

if (missingMarkup.length || missingAssets.length || sceneCount !== 4 || subtitleCount !== 4) {
  if (missingMarkup.length) console.error(`Missing story markup:\n${missingMarkup.join("\n")}`);
  if (missingAssets.length) console.error(`Missing story assets:\n${missingAssets.join("\n")}`);
  if (sceneCount !== 4) console.error(`Expected 4 story scenes, found ${sceneCount}.`);
  if (subtitleCount !== 4) console.error(`Expected 4 bilingual story subtitles, found ${subtitleCount}.`);
  process.exitCode = 1;
} else {
  console.log("Story check passed: 4 scenes, 4 bilingual subtitles and 4 local assets present.");
}
