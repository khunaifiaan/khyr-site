import { getCollection, getEntry } from 'astro:content';
import sharp from 'sharp';
import { resolve } from 'node:path';

const byNo = <T extends { data: { no: number } }>(a: T, b: T) => a.data.no - b.data.no;

export const getProducts = async () => (await getCollection('products')).sort(byNo);
export const getWork = async () => (await getCollection('work')).sort(byNo);
export const getNotes = async () => (await getCollection('notes')).sort(byNo);
export async function getSite() {
  const entry = await getEntry('site', 'site');
  if (!entry) throw new Error('src/content/site.json is missing');
  return entry.data;
}

const sizes = new Map<string, Promise<{ width: number; height: number }>>();
/** Intrinsic size of an image in public/, for width/height attributes (no layout shift). */
export function imgSize(src: string) {
  if (!sizes.has(src)) {
    sizes.set(
      src,
      sharp(resolve('public', src.replace(/^\//, '')))
        .metadata()
        .then((m) => ({ width: m.width ?? 0, height: m.height ?? 0 }))
        .catch(() => ({ width: 0, height: 0 })),
    );
  }
  return sizes.get(src)!;
}
