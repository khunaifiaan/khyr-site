import en from '../i18n/en.json';
import id from '../i18n/id.json';

export type Lang = 'en' | 'id';
export const LANGS: Lang[] = ['en', 'id'];
const STRINGS = { en, id } as const;
export type Key = keyof typeof en;

export function t(lang: Lang, key: Key, vars: Record<string, string> = {}): string {
  let s: string = STRINGS[lang][key] ?? STRINGS.en[key];
  for (const [k, v] of Object.entries(vars)) s = s.replace(`{${k}}`, v);
  return s;
}

/** Path for a page in a locale. `path` is the English path, e.g. "/work/". */
export function localePath(lang: Lang, path = '/'): string {
  return lang === 'en' ? path : `/id${path}`;
}

export const pad = (n: number, width = 3) => String(n).padStart(width, '0');
export const catalogNo = (n: number) => `No.${pad(n, 3)}`;
export const workNo = (n: number) => `Work No.${pad(n, 2)}`;
