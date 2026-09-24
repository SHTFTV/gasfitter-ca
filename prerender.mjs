import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const dist = path.resolve('dist');
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
const server = await import(pathToFileURL(path.join(dist, 'server', 'entry-server.js')).href);
const routes = server.getRoutes();
for (const route of routes) {
  const html = server.render(route);
  const page = template.replace('<!--app-html-->', html).replace('<!--app-head-->', '');
  const target = path.join(dist, route === '/' ? '' : route);
  fs.mkdirSync(target, { recursive: true });
  fs.writeFileSync(path.join(target, 'index.html'), page);
}
const today = new Date().toISOString().slice(0,10);
const sitemap = ['<?xml version="1.0" encoding="UTF-8"?>','<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',...routes.map(route=>`  <url><loc>https://gasfitter.ca${route}</loc><lastmod>${today}</lastmod></url>`),'</urlset>'].join('\n');
fs.writeFileSync(path.join(dist,'sitemap.xml'),sitemap);
console.log(`prerendered ${routes.length} routes`);
