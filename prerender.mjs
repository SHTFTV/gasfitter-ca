import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import sharp from 'sharp';
const dist=path.resolve('dist');
const template=fs.readFileSync(path.join(dist,'index.html'),'utf8');
const server=await import(pathToFileURL(path.join(dist,'server','entry-server.js')).href);
const routes=server.getRoutes();
const esc=value=>String(value).replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const plain=value=>value.replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').trim().replaceAll('&amp;','&').replaceAll('&#x27;',"'");
const wrap=(text,max)=>{const lines=[];let line='';for(const word of text.split(/\s+/)){if((line+' '+word).trim().length>max&&line){lines.push(line);line=word;}else line+=(line?' ':'')+word;}if(line)lines.push(line);return lines;};
fs.mkdirSync(path.join(dist,'share'),{recursive:true});
for(const route of routes){
 const html=server.render(route);const canonical=`https://www.gasfitter.ca${route}`;
 const heading=plain(html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1]||'Gas Fitter Canada');
 const title=`${heading} | Gas Fitter Canada`;
 const editorial=server.editorialPosts.find(p=>`/${p.slug}/`===route);
 const isCity=heading.startsWith('Gas Fitter ');
 const description=editorial?.description||plain(html.match(/<p class="lede">([\s\S]*?)<\/p>/)?.[1]||'Gas-project planning, independent guides and direct enquiry contacts. Confirm the scope and availability with the business accepting the work.');
 const key=route==='/'?'home':route.replace(/^\/+|\/+$/g,'').replaceAll('/','-');
 const share=`https://www.gasfitter.ca/share/${key}.jpg`;
 const byline=editorial?(editorial.date||'2026-09-29'):null;
 const points=server.planningPoints(heading);
 const lines=wrap(heading,36).slice(0,4);
 let art=`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="#102a43"/><rect x="0" width="16" height="630" fill="#ffbd7b"/><text x="58" y="64" fill="#ffbd7b" font-family="Arial,sans-serif" font-size="19" letter-spacing="3">GAS FITTER CANADA / ${editorial?'JOURNAL':isCity?'LOCAL PLANNING GUIDE':'PROJECT PLANNING'}</text>${lines.map((l,i)=>`<text x="58" y="${145+i*57}" fill="white" font-family="Arial,sans-serif" font-size="47" font-weight="700">${esc(l)}</text>`).join('')}${points.map((p,i)=>`<g transform="translate(${58+i*370},405)"><rect width="345" height="105" rx="12" fill="#193b50"/><circle cx="33" cy="34" r="17" fill="#ffbd7b"/><text x="33" y="40" text-anchor="middle" font-family="Arial,sans-serif" font-size="18" fill="#102a43">${i+1}</text><text x="20" y="80" font-family="Arial,sans-serif" font-size="21" fill="white">${esc(p)}</text></g>`).join('')}<text x="58" y="574" fill="#c9dfdf" font-family="Arial,sans-serif" font-size="19">${editorial?'A practical guide · Gasfitter.ca editorial':isCity?'Reference diagram · Not a local project photograph':'Plan the conversation. Confirm the work directly.'}</text></svg>`;
 if(editorial?.slug==='older-boiler-no-heat-burnaby-repair-assessment'){
  fs.copyFileSync('public/images/burnaby-boiler-service-share.jpg',path.join(dist,'share',key+'.jpg'));
 }else await sharp(Buffer.from(art)).jpeg({quality:88}).toFile(path.join(dist,'share',key+'.jpg'));
 const schema={'@context':'https://schema.org','@type':editorial?'Article':'WebPage',headline:heading,name:heading,description,url:canonical,inLanguage:'en-CA',...(editorial?{datePublished:byline,author:{'@type':'Organization',name:'Gasfitter.ca'},image:share,mainEntityOfPage:canonical}:{})};
 let page=template.replace('<!--app-html-->',html).replace(/<meta\s+(?:name="(?:description|twitter:[^"]+)"|property="og:[^"]+")[^>]*>/g,'').replace(/<title>[\s\S]*?<\/title>/,`<title>${esc(title)}</title>`)
 .replace('<!--app-head-->',`<link rel="canonical" href="${canonical}"/><meta name="description" content="${esc(description)}"/><meta property="og:url" content="${canonical}"/><meta property="og:site_name" content="Gas Fitter Canada"/><meta property="og:type" content="${editorial?'article':'website'}"/><meta property="og:title" content="${esc(heading)}"/><meta property="og:description" content="${esc(description)}"/><meta property="og:image" content="${share}"/><meta property="og:image:type" content="image/jpeg"/><meta property="og:image:width" content="1200"/><meta property="og:image:height" content="630"/><meta property="og:image:alt" content="${esc(heading)} — planning guide"/><meta name="twitter:card" content="summary_large_image"/><meta name="twitter:title" content="${esc(heading)}"/><meta name="twitter:description" content="${esc(description)}"/><meta name="twitter:image" content="${share}"/><meta name="twitter:image:alt" content="${esc(heading)} — planning guide"/><script type="application/ld+json">${JSON.stringify(schema).replaceAll('<','\\u003c')}</script>`);
 const target=path.join(dist,route==='/'?'':route);fs.mkdirSync(target,{recursive:true});fs.writeFileSync(path.join(target,'index.html'),page);
}
const sitemap=['<?xml version="1.0" encoding="UTF-8"?>','<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',...routes.map(route=>`<url><loc>https://www.gasfitter.ca${route}</loc></url>`),'</urlset>'].join('\n');
fs.writeFileSync(path.join(dist,'sitemap.xml'),sitemap);
const heroSource=JSON.parse(fs.readFileSync('markett/gasfitter-hero-v4.json','utf8'));fs.mkdirSync(path.join(dist,'images'),{recursive:true});fs.writeFileSync(path.join(dist,'images',heroSource.file),Buffer.from(heroSource.data,'base64'));
console.log(`prerendered ${routes.length} distinct routes and share images`);
