import type { Lang } from "./translations";

const MYMEMORY_URL = "https://api.mymemory.translated.net/get";

/**
 * Translate a short string (≤ 450 chars) from Bulgarian to the target language.
 * Returns original text on any failure.
 */
async function translateShort(
  text: string,
  targetLang: "en" | "tr"
): Promise<string> {
  if (!text.trim()) return "";

  const url = `${MYMEMORY_URL}?${new URLSearchParams({
    q: text,
    langpair: `bg|${targetLang}`,
  })}`;

  try {
    const res = await fetch(url);
    if (!res.ok) return text;
    const data = await res.json();
    return data.responseData?.translatedText || text;
  } catch {
    return text;
  }
}

/**
 * Translate text of any length by chunking into ≤ 450-char segments.
 */
async function translateText(
  text: string,
  targetLang: "en" | "tr"
): Promise<string> {
  if (!text.trim()) return "";
  if (text.length <= 450) return translateShort(text, targetLang);

  // Split by sentence boundaries
  const sentences = text.match(/[^.!?\n]+[.!?\n]?/g) || [text];
  const chunks: string[] = [];
  let current = "";

  for (const sentence of sentences) {
    if ((current + sentence).length > 450) {
      if (current) chunks.push(current.trim());
      current = sentence;
    } else {
      current += sentence;
    }
  }
  if (current.trim()) chunks.push(current.trim());

  const translated = await Promise.all(
    chunks.map((chunk) => translateShort(chunk, targetLang))
  );
  return translated.join(" ");
}

/**
 * Translate a Record<Lang, string> field — takes the BG value and fills EN + TR.
 * Set `overwrite` to replace existing non-empty translations.
 */
export async function translateField(
  field: Record<Lang, string>,
  overwrite = false
): Promise<Record<Lang, string>> {
  const bgText = field.bg;
  if (!bgText.trim()) return field;

  const [en, tr] = await Promise.all([
    !field.en.trim() || overwrite
      ? translateText(bgText, "en")
      : Promise.resolve(field.en),
    !field.tr.trim() || overwrite
      ? translateText(bgText, "tr")
      : Promise.resolve(field.tr),
  ]);

  return { bg: bgText, en, tr };
}
