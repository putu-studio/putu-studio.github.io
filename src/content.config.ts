import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),              // short, plain-language line for the home page
    detail: z.string(),               // technical intro at the top of the project page
    description: z.string(),          // used for the <meta> description
    status: z.string(),               // short, plain words, e.g. "in progress"
    order: z.number(),
    featured: z.boolean().default(false),
    tags: z.array(z.string()),
    repo: z.string().optional(),      // link to the code; adds "code available" to the status
    hardware: z.string().optional(),  // link to the published KiCad files; adds "hardware available"
    cover: z.string().optional(),     // photo path under /public
    coverAlt: z.string().optional(),
    started: z.coerce.date(),
    updated: z.coerce.date(),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    project: z.string().optional(),
    cover: z.string().optional(),     // picture shown with the post; "photo coming soon" if missing
    coverAlt: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects, blog };
