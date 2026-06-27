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
  // passthrough image service: no Cloudflare Images (IMAGES) binding required,
  // so a standard "Edit Workers" API token can deploy in CI.
  adapter: cloudflare({ imageService: 'passthrough' }),
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
