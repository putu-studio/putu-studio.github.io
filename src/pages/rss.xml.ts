// A small hand-written RSS feed, so the blog can be followed without extra packages.
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SITE } from '../site.config';

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const GET: APIRoute = async ({ site }) => {
  const posts = (await getCollection('blog', (p) => !p.data.draft))
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
  const items = posts.map((p) => {
    const link = new URL(`/blog/${p.id}/`, site).toString();
    return `<item><title>${esc(p.data.title)}</title><link>${link}</link><guid>${link}</guid><pubDate>${p.data.date.toUTCString()}</pubDate><description>${esc(p.data.description)}</description></item>`;
  }).join('');
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${esc(SITE.title)}</title><link>${site}</link><description>${esc(SITE.description)}</description><language>en</language>${items}</channel></rss>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
};
