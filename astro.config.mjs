// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';
import tailwindcss from '@tailwindcss/vite';

// ponytail: SITE can be overridden via env at build time; defaults to the planned domain.
const SITE = process.env.SITE_URL || 'https://yunpi.com';

// https://astro.build/config
export default defineConfig({
  site: SITE,
  // Static by default; dynamic routes opt in with `export const prerender = false`.
  output: 'static',
  adapter: cloudflare(),
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
