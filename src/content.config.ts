import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

// Pages CMS may save an emptied optional field as "" or null; treat both as missing.
const blank = (v: unknown) => (v === '' || v === null ? undefined : v);
const opt = <T extends z.ZodType>(schema: T) => z.preprocess(blank, schema.optional());

const pair = z.object({ en: z.string(), id: z.string() });
const optPair = opt(
  z.preprocess(
    (v) => (v && typeof v === 'object' && !(v as any).en && !(v as any).id ? undefined : v),
    pair.optional(),
  ),
);

const products = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/products' }),
  schema: z.object({
    slug: z.string(),
    no: z.number().int(),
    name: z.string(),
    featured: z.boolean().default(false),
    status: z.enum(['live', 'in-progress']),
    version: opt(z.string()),
    platform: z.string(),
    price: z.literal('free').default('free'),
    summary: pair,
    highlights: opt(z.object({ en: z.array(z.string()), id: z.array(z.string()) })),
    image: opt(z.string()),
    cta: pair,
    url: z.url(),
    site: opt(z.url()),
    deskLabel: optPair,
    deskLine: optPair,
  }),
});

const work = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/work' }),
  schema: z.object({
    slug: z.string(),
    no: z.number().int(),
    title: z.string(),
    tags: z.array(z.enum(['landing', 'app', 'brand'])),
    concept: z.boolean().default(false),
    hasCase: z.boolean().default(false),
    liveUrl: opt(z.url()),
    frameUrl: z.string(),
    cover: z.string(),
    mobile: opt(z.string()),
    year: opt(z.number().int()),
    role: optPair,
    stack: opt(z.string()),
    languages: opt(z.string()),
    summary: pair,
    lede: optPair,
    problem: optPair,
    approach: optPair,
    result: optPair,
  }),
});

const notes = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/notes' }),
  schema: z.object({
    no: z.number().int(),
    image: z.string(),
    url: z.url(),
    text: pair,
  }),
});

const site = defineCollection({
  loader: async () => {
    const data = JSON.parse(await readFile(resolve('src/content/site.json'), 'utf8'));
    return [{ id: 'site', ...data }];
  },
  schema: z.object({
    tagline: pair,
    support: z.array(
      z.object({ name: z.string(), url: z.url(), qr: z.string(), note: opt(z.string()) }),
    ),
    links: z.object({ gumroad: z.url(), threads: z.url() }),
    timezone: z.string().default('Asia/Jakarta'),
    showCity: z.boolean().default(false),
  }),
});

export const collections = { products, work, notes, site };
