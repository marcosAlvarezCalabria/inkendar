import { english, type TranslationKey } from "../i18n/landing";

export type Locale = "es" | "en";

const STORAGE_KEY = "inkendar:language";
const textNodes = [...document.querySelectorAll<HTMLElement>("[data-i18n]")];
const ariaNodes = [...document.querySelectorAll<HTMLElement>("[data-i18n-aria]")];
const placeholderNodes = [...document.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>("[data-i18n-placeholder]")];
const altNodes = [...document.querySelectorAll<HTMLImageElement>("[data-i18n-alt]")];
const originalText = new Map(textNodes.map((node) => [node, node.textContent ?? ""]));
const originalAria = new Map(ariaNodes.map((node) => [node, node.getAttribute("aria-label") ?? ""]));
const originalPlaceholders = new Map(placeholderNodes.map((node) => [node, node.placeholder]));
const originalAlt = new Map(altNodes.map((node) => [node, node.alt]));
const originalTitle = document.title;
const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
const originalDescription = description?.content ?? "";
const languageButtons = [...document.querySelectorAll<HTMLButtonElement>("[data-language]")];
const languageStatus = document.querySelector<HTMLElement>("[data-language-status]");

let locale: Locale = readStoredLocale();

function readStoredLocale(): Locale {
  try {
    return localStorage.getItem(STORAGE_KEY) === "en" ? "en" : "es";
  } catch {
    return "es";
  }
}

function translatedValue(key: string, fallback: string): string {
  return locale === "en" ? english[key as TranslationKey] ?? fallback : fallback;
}

function applyLocale(nextLocale: Locale, announce = false): void {
  locale = nextLocale;
  document.documentElement.lang = locale;

  textNodes.forEach((node) => {
    const key = node.dataset.i18n ?? "";
    node.textContent = translatedValue(key, originalText.get(node) ?? "");
  });

  ariaNodes.forEach((node) => {
    const key = node.dataset.i18nAria ?? "";
    node.setAttribute("aria-label", translatedValue(key, originalAria.get(node) ?? ""));
  });

  placeholderNodes.forEach((node) => {
    const key = node.dataset.i18nPlaceholder ?? "";
    node.placeholder = translatedValue(key, originalPlaceholders.get(node) ?? "");
  });

  altNodes.forEach((node) => {
    const key = node.dataset.i18nAlt ?? "";
    node.alt = translatedValue(key, originalAlt.get(node) ?? "");
  });

  document.title = translatedValue("meta.title", originalTitle);
  if (description) description.content = translatedValue("meta.description", originalDescription);

  languageButtons.forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.language === locale));
  });

  try {
    localStorage.setItem(STORAGE_KEY, locale);
  } catch {
    // The selector still works when browser storage is unavailable.
  }

  if (announce && languageStatus) {
    languageStatus.textContent = locale === "en" ? "Language changed to English." : "Idioma cambiado a español.";
  }

  document.dispatchEvent(new CustomEvent("inkendar:languagechange", { detail: { locale } }));
}

languageButtons.forEach((button) => {
  button.addEventListener("click", () => applyLocale(button.dataset.language === "en" ? "en" : "es", true));
});

window.addEventListener("storage", (event) => {
  if (event.key === STORAGE_KEY && (event.newValue === "es" || event.newValue === "en")) {
    applyLocale(event.newValue);
  }
});

applyLocale(locale);

export function getLocale(): Locale {
  return locale;
}

export function translate(key: TranslationKey, spanishFallback: string): string {
  return translatedValue(key, spanishFallback);
}
